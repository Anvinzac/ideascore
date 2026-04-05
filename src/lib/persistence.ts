import { createClient } from "@supabase/supabase-js";
import type { Idea } from "../types";
import { buildSeedIdeas } from "./seed.ts";
import { shouldAutoUpgradeSeedText } from "./descriptionComposer.ts";

const STORAGE_KEY = "micro-tool-lab:ideas";
const TABLE_NAME = "micro_tool_ideas";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const hasRemoteConfig = Boolean(supabaseUrl && supabaseAnonKey);

const supabase = hasRemoteConfig
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
  : null;

const capitalizeFirstLetter = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

type IdeaRow = {
  id: string;
  title: string;
  category: string;
  summary: string;
  details: string;
  rating: number | null;
  note: string | null;
  phase?: number | null;
  ai_threads?: unknown | null;
  repo_link?: string | null;
  demo_link?: string | null;
  is_custom: boolean | null;
  sort_index: number | null;
  created_at: string | null;
  updated_at: string | null;
};

const normalizePhase = (value: unknown): Idea["phase"] => {
  if (typeof value !== "number" || Number.isNaN(value)) return 1;
  const rounded = Math.round(value);
  if (rounded < 1) return 1;
  if (rounded > 10) return 10;
  return rounded as Idea["phase"];
};

const normalizeAiThreads = (value: unknown): Idea["aiThreads"] => {
  if (!value || typeof value !== "object") return {};
  try {
    const raw = value as Record<string, unknown>;
    const out: Idea["aiThreads"] = {};
    Object.entries(raw).forEach(([providerId, thread]) => {
      if (!thread || typeof thread !== "object") return;
      const typed = thread as Record<string, unknown>;
      const providerLabel = typeof typed.providerLabel === "string" ? typed.providerLabel : providerId;
      const answersRaw = Array.isArray(typed.answers) ? typed.answers : [];
      const answers = answersRaw
        .map((entry) => {
          if (!entry || typeof entry !== "object") return null;
          const ans = entry as Record<string, unknown>;
          const html = typeof ans.html === "string" ? ans.html : "";
          if (!html.trim()) return null;
          const id = typeof ans.id === "string" ? ans.id : `ans-${Math.random().toString(36).slice(2)}`;
          const createdAt = typeof ans.createdAt === "string" ? ans.createdAt : new Date().toISOString();
          return { id, html, createdAt };
        })
        .filter(Boolean) as Idea["aiThreads"][string]["answers"];

      out[providerId] = { providerId, providerLabel, answers };
    });
    return out;
  } catch {
    return {};
  }
};

const normalizeLink = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const toIdea = (row: IdeaRow): Idea => ({
  id: row.id,
  title: row.is_custom ? row.title : capitalizeFirstLetter(row.title),
  category: row.category,
  summary: row.summary,
  details: row.details,
  rating: (row.rating ?? 0) as Idea["rating"],
  note: row.note ?? "",
  phase: normalizePhase(row.phase),
  aiThreads: normalizeAiThreads(row.ai_threads),
  repoLink: normalizeLink(row.repo_link),
  demoLink: normalizeLink(row.demo_link),
  source: row.is_custom ? "custom" : "seed",
  sortIndex: row.sort_index ?? 0,
  createdAt: row.created_at ?? new Date().toISOString(),
  updatedAt: row.updated_at ?? row.created_at ?? new Date().toISOString(),
});

const fromIdea = (idea: Idea) => ({
  id: idea.id,
  title: idea.title,
  category: idea.category,
  summary: idea.summary,
  details: idea.details,
  rating: idea.rating,
  note: idea.note,
  phase: idea.phase,
  ai_threads: idea.aiThreads,
  repo_link: idea.repoLink,
  demo_link: idea.demoLink,
  is_custom: idea.source === "custom",
  sort_index: idea.sortIndex,
  created_at: idea.createdAt,
  updated_at: new Date().toISOString(),
});

const omitKeys = <T extends Record<string, unknown>>(row: T, keys: Set<string>) => {
  if (keys.size === 0) return row;
  const out: Record<string, unknown> = {};
  Object.entries(row).forEach(([key, value]) => {
    if (keys.has(key)) return;
    out[key] = value;
  });
  return out as T;
};

const extractMissingColumn = (error: unknown): string | null => {
  const message = (error as { message?: unknown } | null)?.message;
  if (typeof message !== "string") return null;
  const match = message.match(/column\s+"([^"]+)"\s+does not exist/i);
  return match?.[1] ?? null;
};

const remoteUnsupportedColumns = new Set<string>();

const readCachedIdeas = (): Idea[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Idea[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((idea) => ({
      ...idea,
      phase: normalizePhase((idea as unknown as { phase?: unknown }).phase),
      aiThreads: normalizeAiThreads((idea as unknown as { aiThreads?: unknown }).aiThreads),
      repoLink: normalizeLink((idea as unknown as { repoLink?: unknown }).repoLink),
      demoLink: normalizeLink((idea as unknown as { demoLink?: unknown }).demoLink),
    }));
  } catch {
    return [];
  }
};

const cacheIdeas = (ideas: Idea[]) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
  } catch {
    // Ignore local storage failures.
  }
};

const remoteReady = () => Boolean(supabase);

const upsertRemote = async (rows: Array<ReturnType<typeof fromIdea>>) => {
  if (!remoteReady()) return;

  const client = supabase!;
  const attempt = async () => {
    const payload = remoteUnsupportedColumns.size === 0 ? rows : rows.map((row) => omitKeys(row, remoteUnsupportedColumns));
    return client.from(TABLE_NAME).upsert(payload, { onConflict: "id" });
  };

  for (let tries = 0; tries < 3; tries += 1) {
    const result = await attempt();
    if (!result.error) return;

    const missing = extractMissingColumn(result.error);
    if (missing) {
      remoteUnsupportedColumns.add(missing);
      continue;
    }

    throw result.error;
  }
};

export const loadIdeas = async (): Promise<Idea[]> => {
  const seedIdeas = buildSeedIdeas();
  const seedById = new Map(seedIdeas.map((idea) => [idea.id, idea] as const));

  const upgradeSeedText = (idea: Idea): Idea => {
    if (idea.source !== "seed") return idea;
    const canonical = seedById.get(idea.id);
    if (!canonical) return idea;
    if (!shouldAutoUpgradeSeedText(idea.summary, idea.details)) return idea;
    return {
      ...idea,
      title: canonical.title,
      category: canonical.category,
      summary: canonical.summary,
      details: canonical.details,
      sortIndex: canonical.sortIndex,
      updatedAt: new Date().toISOString(),
    };
  };

  if (!remoteReady()) {
    const cached = readCachedIdeas();
    const merged = mergeIdeas(seedIdeas, cached).map(upgradeSeedText);
    cacheIdeas(merged);
    return merged;
  }

  const client = supabase!;
  const { data, error } = await client
    .from(TABLE_NAME)
    .select("*")
    .order("sort_index", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error) {
    const cached = readCachedIdeas();
    const merged = mergeIdeas(seedIdeas, cached);
    cacheIdeas(merged);
    return merged;
  }

  const remoteIdeas = (data as IdeaRow[]).map(toIdea);
  const normalizedRemoteIdeas = remoteIdeas.map((idea) =>
    idea.source === "seed" ? { ...idea, title: capitalizeFirstLetter(idea.title) } : idea,
  );
  const changedRemoteIdeas = normalizedRemoteIdeas.filter(
    (idea, index) => idea.title !== remoteIdeas[index].title,
  );
  if (changedRemoteIdeas.length > 0) {
    await upsertRemote(changedRemoteIdeas.map(fromIdea));
  }
  const upgradedRemoteIdeas = normalizedRemoteIdeas.map(upgradeSeedText);
  const changedDescriptionIdeas = upgradedRemoteIdeas.filter((idea, index) => {
    const previous = normalizedRemoteIdeas[index];
    return (
      idea.summary !== previous?.summary ||
      idea.details !== previous?.details ||
      idea.category !== previous?.category ||
      idea.sortIndex !== previous?.sortIndex ||
      idea.phase !== previous?.phase
    );
  });
  if (changedDescriptionIdeas.length > 0) {
    await upsertRemote(changedDescriptionIdeas.map(fromIdea));
  }
  const remoteIds = new Set(remoteIdeas.map((idea) => idea.id));
  const missingSeedIdeas = seedIdeas.filter((idea) => !remoteIds.has(idea.id));

  if (missingSeedIdeas.length > 0) {
    await upsertRemote(missingSeedIdeas.map(fromIdea));
  }

  if (!data || data.length === 0) {
    const merged = mergeIdeas(seedIdeas, readCachedIdeas()).map(upgradeSeedText);
    cacheIdeas(merged);
    return merged;
  }

  const merged = mergeIdeas(seedIdeas, upgradedRemoteIdeas).map(upgradeSeedText);
  const finalIdeas = mergeIdeas(merged, readCachedIdeas()).map(upgradeSeedText);
  cacheIdeas(finalIdeas);
  return finalIdeas;
};

export const saveIdea = async (idea: Idea) => {
  cacheIdeas(upsertCachedIdea(idea));

  if (!remoteReady()) {
    return;
  }

  await upsertRemote([fromIdea(idea)]);
};

export const saveIdeas = async (ideas: Idea[]) => {
  cacheIdeas(ideas);

  if (!remoteReady()) {
    return;
  }

  await upsertRemote(ideas.map(fromIdea));
};

const mergeIdeas = (primary: Idea[], secondary: Idea[]) => {
  const map = new Map<string, Idea>();
  [...primary, ...secondary].forEach((idea) => {
    const existing = map.get(idea.id);
    if (!existing || new Date(idea.updatedAt).getTime() >= new Date(existing.updatedAt).getTime()) {
      map.set(idea.id, idea);
    }
  });
  return Array.from(map.values()).sort((left, right) => left.sortIndex - right.sortIndex || left.title.localeCompare(right.title));
};

const upsertCachedIdea = (idea: Idea) => {
  const current = readCachedIdeas();
  return mergeIdeas(
    current.filter((entry) => entry.id !== idea.id),
    [idea],
  );
};

export { hasRemoteConfig };
