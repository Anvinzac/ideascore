import { createClient } from "@supabase/supabase-js";
import type { Idea } from "../types";
import { buildSeedIdeas } from "./seed";

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

type IdeaRow = {
  id: string;
  title: string;
  category: string;
  summary: string;
  details: string;
  rating: number | null;
  note: string | null;
  is_custom: boolean | null;
  sort_index: number | null;
  created_at: string | null;
  updated_at: string | null;
};

const toIdea = (row: IdeaRow): Idea => ({
  id: row.id,
  title: row.title,
  category: row.category,
  summary: row.summary,
  details: row.details,
  rating: (row.rating ?? 0) as Idea["rating"],
  note: row.note ?? "",
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
  is_custom: idea.source === "custom",
  sort_index: idea.sortIndex,
  created_at: idea.createdAt,
  updated_at: new Date().toISOString(),
});

const readCachedIdeas = (): Idea[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Idea[];
    return Array.isArray(parsed) ? parsed : [];
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

export const loadIdeas = async (): Promise<Idea[]> => {
  const seedIdeas = buildSeedIdeas();

  if (!remoteReady()) {
    const cached = readCachedIdeas();
    const merged = mergeIdeas(seedIdeas, cached);
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

  if (!data || data.length === 0) {
    await client.from(TABLE_NAME).upsert(seedIdeas.map(fromIdea), { onConflict: "id" });
    const merged = mergeIdeas(seedIdeas, readCachedIdeas());
    cacheIdeas(merged);
    return merged;
  }

  const remoteIdeas = (data as IdeaRow[]).map(toIdea);
  const merged = mergeIdeas(remoteIdeas, readCachedIdeas());
  cacheIdeas(merged);
  return merged;
};

export const saveIdea = async (idea: Idea) => {
  cacheIdeas(upsertCachedIdea(idea));

  if (!remoteReady()) {
    return;
  }

  const { error } = await supabase!
    .from(TABLE_NAME)
    .upsert(fromIdea(idea), { onConflict: "id" });

  if (error) {
    throw error;
  }
};

export const saveIdeas = async (ideas: Idea[]) => {
  cacheIdeas(ideas);

  if (!remoteReady()) {
    return;
  }

  const { error } = await supabase!
    .from(TABLE_NAME)
    .upsert(ideas.map(fromIdea), { onConflict: "id" });

  if (error) {
    throw error;
  }
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
