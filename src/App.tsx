import { useEffect, useMemo, useRef, useState } from "react";
import type { ClipboardEvent, CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  BadgePlus,
  CircleAlert,
  Edit3,
  ChevronDown,
  Layers3,
  NotebookPen,
  Plus,
  Search,
  Shuffle,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { buildSeedIdeas, categoryOrder, isSeedCategory, normalizeCategoryOrder } from "./lib/seed";
import { loadIdeas, saveIdea } from "./lib/persistence";
import type { AiAnswer, AiThreads, Idea, IdeaPhase, Rating } from "./types";
import { getDisplayIdea, getDraftDetails, getDraftSummary, getUiCopy, translateCategory, type Locale } from "./lib/i18n";
import { PHASES, getPhaseDef, isImplementationPhase } from "./lib/phases";

type RatingFilter = "all" | 2 | 3;
type TabKey = "review" | "build";

type IdeaDraft = {
  id?: string;
  title: string;
  category: string;
  summary: string;
  details: string;
  note: string;
  rating: Rating;
  phase: IdeaPhase;
  repoLink: string;
  demoLink: string;
};

const normalizeDisplayTitle = (value: string) => value.toLowerCase().replace(/\s+/g, " ").trim();

type CategoryTheme = {
  cardBg: string;
  cardBorder: string;
  badgeBg: string;
  badgeBorder: string;
  badgeGlow: string;
  badgeText: string;
};

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  Education: {
    cardBg: "rgba(77, 143, 255, 0.1)",
    cardBorder: "rgba(77, 143, 255, 0.22)",
    badgeBg: "rgba(77, 143, 255, 0.3)",
    badgeBorder: "rgba(77, 143, 255, 0.62)",
    badgeGlow: "rgba(77, 143, 255, 0.22)",
    badgeText: "#f2f7ff",
  },
  Healthcare: {
    cardBg: "rgba(71, 224, 162, 0.1)",
    cardBorder: "rgba(71, 224, 162, 0.22)",
    badgeBg: "rgba(71, 224, 162, 0.28)",
    badgeBorder: "rgba(71, 224, 162, 0.6)",
    badgeGlow: "rgba(71, 224, 162, 0.2)",
    badgeText: "#effff7",
  },
  Restaurants: {
    cardBg: "rgba(245, 177, 76, 0.1)",
    cardBorder: "rgba(245, 177, 76, 0.22)",
    badgeBg: "rgba(245, 177, 76, 0.28)",
    badgeBorder: "rgba(245, 177, 76, 0.58)",
    badgeGlow: "rgba(245, 177, 76, 0.2)",
    badgeText: "#fff6e7",
  },
  Retail: {
    cardBg: "rgba(255, 109, 127, 0.1)",
    cardBorder: "rgba(255, 109, 127, 0.22)",
    badgeBg: "rgba(255, 109, 127, 0.28)",
    badgeBorder: "rgba(255, 109, 127, 0.58)",
    badgeGlow: "rgba(255, 109, 127, 0.2)",
    badgeText: "#fff0f2",
  },
  Logistics: {
    cardBg: "rgba(99, 209, 255, 0.1)",
    cardBorder: "rgba(99, 209, 255, 0.22)",
    badgeBg: "rgba(99, 209, 255, 0.28)",
    badgeBorder: "rgba(99, 209, 255, 0.58)",
    badgeGlow: "rgba(99, 209, 255, 0.2)",
    badgeText: "#eefbff",
  },
  "Real Estate": {
    cardBg: "rgba(34, 197, 184, 0.1)",
    cardBorder: "rgba(34, 197, 184, 0.22)",
    badgeBg: "rgba(34, 197, 184, 0.28)",
    badgeBorder: "rgba(34, 197, 184, 0.6)",
    badgeGlow: "rgba(34, 197, 184, 0.2)",
    badgeText: "#eafffd",
  },
  Manufacturing: {
    cardBg: "rgba(248, 113, 113, 0.1)",
    cardBorder: "rgba(248, 113, 113, 0.22)",
    badgeBg: "rgba(248, 113, 113, 0.28)",
    badgeBorder: "rgba(248, 113, 113, 0.58)",
    badgeGlow: "rgba(248, 113, 113, 0.2)",
    badgeText: "#fff0f0",
  },
  Construction: {
    cardBg: "rgba(234, 179, 8, 0.1)",
    cardBorder: "rgba(234, 179, 8, 0.22)",
    badgeBg: "rgba(234, 179, 8, 0.26)",
    badgeBorder: "rgba(234, 179, 8, 0.56)",
    badgeGlow: "rgba(234, 179, 8, 0.18)",
    badgeText: "#fff8e4",
  },
  Nonprofits: {
    cardBg: "rgba(168, 85, 247, 0.1)",
    cardBorder: "rgba(168, 85, 247, 0.22)",
    badgeBg: "rgba(168, 85, 247, 0.26)",
    badgeBorder: "rgba(168, 85, 247, 0.56)",
    badgeGlow: "rgba(168, 85, 247, 0.2)",
    badgeText: "#f8f0ff",
  },
  Finance: {
    cardBg: "rgba(16, 185, 129, 0.1)",
    cardBorder: "rgba(16, 185, 129, 0.22)",
    badgeBg: "rgba(16, 185, 129, 0.26)",
    badgeBorder: "rgba(16, 185, 129, 0.56)",
    badgeGlow: "rgba(16, 185, 129, 0.18)",
    badgeText: "#eafff7",
  },
  Marketing: {
    cardBg: "rgba(217, 70, 239, 0.1)",
    cardBorder: "rgba(217, 70, 239, 0.22)",
    badgeBg: "rgba(217, 70, 239, 0.26)",
    badgeBorder: "rgba(217, 70, 239, 0.56)",
    badgeGlow: "rgba(217, 70, 239, 0.18)",
    badgeText: "#ffeefe",
  },
  "Fitness & Wellness": {
    cardBg: "rgba(163, 230, 53, 0.09)",
    cardBorder: "rgba(163, 230, 53, 0.2)",
    badgeBg: "rgba(163, 230, 53, 0.22)",
    badgeBorder: "rgba(163, 230, 53, 0.5)",
    badgeGlow: "rgba(163, 230, 53, 0.16)",
    badgeText: "#f6ffe6",
  },
  "SaaS/Software Products": {
    cardBg: "rgba(99, 102, 241, 0.1)",
    cardBorder: "rgba(99, 102, 241, 0.22)",
    badgeBg: "rgba(99, 102, 241, 0.26)",
    badgeBorder: "rgba(99, 102, 241, 0.56)",
    badgeGlow: "rgba(99, 102, 241, 0.18)",
    badgeText: "#f0f0ff",
  },
  "Travel & Hospitality": {
    cardBg: "rgba(20, 184, 166, 0.1)",
    cardBorder: "rgba(20, 184, 166, 0.22)",
    badgeBg: "rgba(20, 184, 166, 0.26)",
    badgeBorder: "rgba(20, 184, 166, 0.56)",
    badgeGlow: "rgba(20, 184, 166, 0.18)",
    badgeText: "#eafffb",
  },
  "Media & Content": {
    cardBg: "rgba(129, 140, 248, 0.1)",
    cardBorder: "rgba(129, 140, 248, 0.22)",
    badgeBg: "rgba(129, 140, 248, 0.26)",
    badgeBorder: "rgba(129, 140, 248, 0.56)",
    badgeGlow: "rgba(129, 140, 248, 0.18)",
    badgeText: "#f2f3ff",
  },
  "Fintech/Financial Services": {
    cardBg: "rgba(14, 165, 233, 0.1)",
    cardBorder: "rgba(14, 165, 233, 0.22)",
    badgeBg: "rgba(14, 165, 233, 0.26)",
    badgeBorder: "rgba(14, 165, 233, 0.56)",
    badgeGlow: "rgba(14, 165, 233, 0.18)",
    badgeText: "#eef9ff",
  },
  "Professional Services": {
    cardBg: "rgba(148, 163, 184, 0.08)",
    cardBorder: "rgba(148, 163, 184, 0.18)",
    badgeBg: "rgba(148, 163, 184, 0.2)",
    badgeBorder: "rgba(148, 163, 184, 0.42)",
    badgeGlow: "rgba(148, 163, 184, 0.14)",
    badgeText: "#f5f7ff",
  },
  "Professional Services (Consulting, Legal, Accounting, etc.)": {
    cardBg: "rgba(148, 163, 184, 0.08)",
    cardBorder: "rgba(148, 163, 184, 0.18)",
    badgeBg: "rgba(148, 163, 184, 0.2)",
    badgeBorder: "rgba(148, 163, 184, 0.42)",
    badgeGlow: "rgba(148, 163, 184, 0.14)",
    badgeText: "#f5f7ff",
  },
  Insurance: {
    cardBg: "rgba(59, 130, 246, 0.1)",
    cardBorder: "rgba(59, 130, 246, 0.22)",
    badgeBg: "rgba(59, 130, 246, 0.28)",
    badgeBorder: "rgba(59, 130, 246, 0.58)",
    badgeGlow: "rgba(59, 130, 246, 0.2)",
    badgeText: "#eef4ff",
  },
};

const FALLBACK_THEMES: CategoryTheme[] = [
  {
    cardBg: "rgba(99, 209, 255, 0.09)",
    cardBorder: "rgba(99, 209, 255, 0.2)",
    badgeBg: "rgba(99, 209, 255, 0.24)",
    badgeBorder: "rgba(99, 209, 255, 0.52)",
    badgeGlow: "rgba(99, 209, 255, 0.18)",
    badgeText: "#eefbff",
  },
  {
    cardBg: "rgba(245, 177, 76, 0.09)",
    cardBorder: "rgba(245, 177, 76, 0.2)",
    badgeBg: "rgba(245, 177, 76, 0.24)",
    badgeBorder: "rgba(245, 177, 76, 0.52)",
    badgeGlow: "rgba(245, 177, 76, 0.18)",
    badgeText: "#fff6e7",
  },
  {
    cardBg: "rgba(255, 109, 127, 0.09)",
    cardBorder: "rgba(255, 109, 127, 0.2)",
    badgeBg: "rgba(255, 109, 127, 0.24)",
    badgeBorder: "rgba(255, 109, 127, 0.52)",
    badgeGlow: "rgba(255, 109, 127, 0.18)",
    badgeText: "#fff0f2",
  },
  {
    cardBg: "rgba(71, 224, 162, 0.09)",
    cardBorder: "rgba(71, 224, 162, 0.2)",
    badgeBg: "rgba(71, 224, 162, 0.24)",
    badgeBorder: "rgba(71, 224, 162, 0.52)",
    badgeGlow: "rgba(71, 224, 162, 0.18)",
    badgeText: "#effff7",
  },
  {
    cardBg: "rgba(168, 85, 247, 0.09)",
    cardBorder: "rgba(168, 85, 247, 0.2)",
    badgeBg: "rgba(168, 85, 247, 0.24)",
    badgeBorder: "rgba(168, 85, 247, 0.52)",
    badgeGlow: "rgba(168, 85, 247, 0.18)",
    badgeText: "#f8f0ff",
  },
  {
    cardBg: "rgba(99, 102, 241, 0.09)",
    cardBorder: "rgba(99, 102, 241, 0.2)",
    badgeBg: "rgba(99, 102, 241, 0.24)",
    badgeBorder: "rgba(99, 102, 241, 0.52)",
    badgeGlow: "rgba(99, 102, 241, 0.18)",
    badgeText: "#f0f0ff",
  },
];

const hashString = (value: string) => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
};

const categoryThemeStyle = (category: string): CSSProperties => {
  const theme = CATEGORY_THEMES[category] ?? FALLBACK_THEMES[hashString(category) % FALLBACK_THEMES.length];
  return {
    ["--cat-card-bg" as any]: theme.cardBg,
    ["--cat-card-border" as any]: theme.cardBorder,
    ["--cat-badge-bg" as any]: theme.badgeBg,
    ["--cat-badge-border" as any]: theme.badgeBorder,
    ["--cat-badge-glow" as any]: theme.badgeGlow,
    ["--cat-badge-text" as any]: theme.badgeText,
  };
};

const initialDraft = (category = categoryOrder[0] ?? "General"): IdeaDraft => ({
  title: "",
  category,
  summary: "",
  details: "",
  note: "",
  rating: 0,
  phase: 1,
  repoLink: "",
  demoLink: "",
});

type AiProviderDef = { id: string; label: string };

const CORE_AI_PROVIDERS: AiProviderDef[] = [
  { id: "chatgpt", label: "ChatGPT" },
  { id: "claude", label: "Claude" },
  { id: "perplexity", label: "Perplexity" },
  { id: "gemini", label: "Gemini" },
  { id: "meta", label: "Meta" },
];

const EXTRA_AI_PROVIDERS: AiProviderDef[] = [
  { id: "qwen", label: "Qwen" },
  { id: "kimi", label: "Kimi" },
  { id: "minimax", label: "Minimax" },
  { id: "manus", label: "Manus" },
];

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizePastedHtml = (rawHtml: string) => {
  if (typeof window === "undefined") return rawHtml;
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, "text/html");
    const allowedTags = new Set([
      "p",
      "br",
      "div",
      "span",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "code",
      "pre",
      "blockquote",
      "ul",
      "ol",
      "li",
      "h1",
      "h2",
      "h3",
      "h4",
      "a",
      "table",
      "thead",
      "tbody",
      "tr",
      "td",
      "th",
    ]);

    const walk = (node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tag = el.tagName.toLowerCase();
        if (!allowedTags.has(tag)) {
          const parent = el.parentNode;
          if (parent) {
            while (el.firstChild) parent.insertBefore(el.firstChild, el);
            parent.removeChild(el);
          }
          return;
        }

        // Keep only a small, safe attribute set.
        [...el.attributes].forEach((attr) => {
          const name = attr.name.toLowerCase();
          const keep =
            (tag === "a" && (name === "href" || name === "title")) ||
            (name === "colspan" || name === "rowspan");
          if (!keep) el.removeAttribute(attr.name);
        });

        if (tag === "a") {
          const href = el.getAttribute("href") ?? "";
          if (!/^https?:\/\//i.test(href) && !href.startsWith("mailto:")) {
            el.removeAttribute("href");
          } else {
            el.setAttribute("rel", "nofollow noopener noreferrer");
            el.setAttribute("target", "_blank");
          }
        }
      }

      Array.from(node.childNodes).forEach(walk);
    };

    walk(doc.body);
    const html = doc.body.innerHTML.trim();
    return html;
  } catch {
    return rawHtml;
  }
};

const App = () => {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem("micro-tool-lab:locale");
    if (stored === "vi" || stored === "en") return stored;
    return "en";
  });
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("review");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("all");
  const [phaseFilter, setPhaseFilter] = useState<IdeaPhase | "all">("all");
  const [search, setSearch] = useState("");
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [editorDraft, setEditorDraft] = useState<IdeaDraft | null>(null);
  const [randomOpen, setRandomOpen] = useState(false);
  const [randomQueue, setRandomQueue] = useState<string[]>([]);
  const [randomIndex, setRandomIndex] = useState(0);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [syncError, setSyncError] = useState<string | null>(null);
  const [aiProviderToAdd, setAiProviderToAdd] = useState<string>("");
  const categoryMenuRef = useRef<HTMLDivElement | null>(null);
  const ui = getUiCopy(locale);

  useEffect(() => {
    let cancelled = false;
    loadIdeas()
      .then((records) => {
        if (cancelled) return;
        setIdeas(records.length ? records : buildSeedIdeas());
        setLoading(false);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setIdeas(buildSeedIdeas());
        setSyncError(error instanceof Error ? error.message : ui.loadError);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("micro-tool-lab:locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (loading) return;
    window.localStorage.setItem("micro-tool-lab:last-state", JSON.stringify(ideas));
  }, [ideas, loading]);

  useEffect(() => {
    if (!categoryMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (categoryMenuRef.current?.contains(target)) return;
      setCategoryMenuOpen(false);
    };

    const autoHideTimer = window.setTimeout(() => setCategoryMenuOpen(false), 4500);
    const handleScroll = () => setCategoryMenuOpen(false);
    const handleResize = () => setCategoryMenuOpen(false);

    document.addEventListener("pointerdown", handlePointerDown, true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.clearTimeout(autoHideTimer);
      document.removeEventListener("pointerdown", handlePointerDown, true);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [categoryMenuOpen]);

  const categories = useMemo(
    () => normalizeCategoryOrder(Array.from(new Set(ideas.map((idea) => idea.category)))),
    [ideas],
  );

  const visibleIdeas = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    const filtered = ideas
      .filter((idea) => idea.rating !== 1)
      .filter((idea) => (activeCategory === "All" ? true : idea.category === activeCategory))
      .filter((idea) => (ratingFilter === "all" ? true : idea.rating === ratingFilter))
      .filter((idea) => {
        if (!searchTerm) return true;
        const display = getDisplayIdea(idea, locale);
        return (
          display.title.toLowerCase().includes(searchTerm) ||
          display.category.toLowerCase().includes(searchTerm) ||
          display.summary.toLowerCase().includes(searchTerm) ||
          display.details.toLowerCase().includes(searchTerm) ||
          idea.note.toLowerCase().includes(searchTerm)
        );
      })
      .sort((left, right) => left.sortIndex - right.sortIndex || left.title.localeCompare(right.title));
    const seen = new Set<string>();
    return filtered.filter((idea) => {
      const display = getDisplayIdea(idea, locale);
      const key = normalizeDisplayTitle(display.title);
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }, [ideas, activeCategory, ratingFilter, search, locale]);

  const implementationTotal = useMemo(
    () => ideas.filter((idea) => idea.rating !== 1 && isImplementationPhase(idea.phase)).length,
    [ideas],
  );

  const implementationIdeas = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    const filtered = ideas
      .filter((idea) => idea.rating !== 1)
      .filter((idea) => isImplementationPhase(idea.phase))
      .filter((idea) => (activeCategory === "All" ? true : idea.category === activeCategory))
      .filter((idea) => (phaseFilter === "all" ? true : idea.phase === phaseFilter))
      .filter((idea) => {
        if (!searchTerm) return true;
        const display = getDisplayIdea(idea, locale);
        return (
          display.title.toLowerCase().includes(searchTerm) ||
          display.category.toLowerCase().includes(searchTerm) ||
          display.summary.toLowerCase().includes(searchTerm) ||
          display.details.toLowerCase().includes(searchTerm) ||
          idea.note.toLowerCase().includes(searchTerm)
        );
      })
      .sort((left, right) => left.sortIndex - right.sortIndex || left.title.localeCompare(right.title));
    const seen = new Set<string>();
    return filtered.filter((idea) => {
      const display = getDisplayIdea(idea, locale);
      const key = normalizeDisplayTitle(display.title);
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }, [ideas, activeCategory, phaseFilter, search, locale]);

  const hiddenCount = ideas.filter((idea) => idea.rating === 1).length;
  const twoStarCount = ideas.filter((idea) => idea.rating === 2).length;
  const threeStarCount = ideas.filter((idea) => idea.rating === 3).length;
  const activeCategoryLabel = activeCategory === "All" ? ui.allCategories : translateCategory(activeCategory, locale);

  const tabVisibleCount = activeTab === "review" ? visibleIdeas.length : implementationIdeas.length;

  const detailIdea = detailId ? ideas.find((idea) => idea.id === detailId) ?? null : null;
  const detailView = detailIdea ? getDisplayIdea(detailIdea, locale) : null;
  const detailAiProviders = useMemo(() => {
    if (!detailIdea) return CORE_AI_PROVIDERS;
    const existing = Object.values(detailIdea.aiThreads ?? {}).map((thread) => ({
      id: thread.providerId,
      label: thread.providerLabel,
    }));
    const merged = new Map<string, AiProviderDef>();
    CORE_AI_PROVIDERS.forEach((provider) => merged.set(provider.id, provider));
    existing.forEach((provider) => merged.set(provider.id, provider));
    return Array.from(merged.values());
  }, [detailIdea]);

  const currentRandomIdea = randomOpen ? ideas.find((idea) => idea.id === randomQueue[randomIndex]) ?? null : null;
  const currentRandomView = currentRandomIdea ? getDisplayIdea(currentRandomIdea, locale) : null;

  useEffect(() => {
    if (!randomOpen) return;
    if (randomIndex >= randomQueue.length && randomQueue.length > 0) {
      setRandomOpen(false);
      setDetailId(null);
    }
  }, [randomIndex, randomQueue.length, randomOpen]);

  const updateIdea = async (id: string, patch: Partial<Idea>) => {
    const next = ideas.map((idea) =>
      idea.id === id
        ? {
            ...idea,
            ...patch,
            repoLink: patch.repoLink ?? idea.repoLink ?? "",
            demoLink: patch.demoLink ?? idea.demoLink ?? "",
            updatedAt: new Date().toISOString(),
          }
        : idea,
    );

    setIdeas(next);
    const updated = next.find((idea) => idea.id === id);
    if (updated) {
      try {
        await saveIdea(updated);
        setSyncError(null);
      } catch (error) {
        setSyncError(error instanceof Error ? error.message : ui.saveError);
      }
    }
  };

  const ensureThread = (threads: AiThreads, provider: AiProviderDef): AiThreads => {
    if (threads[provider.id]) return threads;
    return {
      ...threads,
      [provider.id]: {
        providerId: provider.id,
        providerLabel: provider.label,
        answers: [],
      },
    };
  };

  const addAiAnswer = async (idea: Idea, provider: AiProviderDef, rawHtml: string) => {
    const cleaned = sanitizePastedHtml(rawHtml);
    if (!cleaned.trim()) return;

    const now = new Date().toISOString();
    const answer: AiAnswer = {
      id: `ans-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`,
      html: cleaned,
      createdAt: now,
    };

    const currentThreads = idea.aiThreads ?? {};
    const withThread = ensureThread(currentThreads, provider);
    const thread = withThread[provider.id]!;
    const nextThreads: AiThreads = {
      ...withThread,
      [provider.id]: {
        ...thread,
        providerLabel: provider.label,
        answers: [...(thread.answers ?? []), answer],
      },
    };

    await updateIdea(idea.id, { aiThreads: nextThreads });
  };

  const startRandomMode = () => {
    setActiveTab("review");
    if (visibleIdeas.length === 0) {
      setSyncError(ui.noMatch);
      return;
    }
    setRandomQueue(shuffle(visibleIdeas.map((idea) => idea.id)));
    setRandomIndex(0);
    setRandomOpen(true);
    setDetailId(null);
    setEditorDraft(null);
  };

  const advanceRandom = () => {
    setRandomIndex((current) => current + 1);
  };

  const handleRandomRating = async (rating: Rating) => {
    if (!currentRandomIdea) return;
    await updateIdea(currentRandomIdea.id, { rating });
    advanceRandom();
  };

  const beginAdd = () => {
    setEditorDraft(initialDraft(activeCategory === "All" ? categoryOrder[0] ?? "General" : activeCategory));
  };

  const beginEdit = (idea: Idea) => {
    setEditorDraft({
      id: idea.id,
      title: idea.title,
      category: idea.category,
      summary: idea.summary,
      details: idea.details,
      note: idea.note,
      rating: idea.rating,
      phase: idea.phase,
      repoLink: idea.repoLink ?? "",
      demoLink: idea.demoLink ?? "",
    });
  };

  const closeEditor = () => setEditorDraft(null);

  const saveDraft = async () => {
    if (!editorDraft || editorDraft.title.trim().length === 0) return;
    const now = new Date().toISOString();
    const existing = editorDraft.id ? ideas.find((idea) => idea.id === editorDraft.id) : null;
    const nextIdea: Idea = {
      id:
        editorDraft.id ??
        `custom-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`,
      title: editorDraft.title.trim(),
      category: editorDraft.category.trim() || "General",
      summary: editorDraft.summary.trim() || getDraftSummary(locale, editorDraft.category.trim() || "General", editorDraft.title.trim()),
      details:
        editorDraft.details.trim() ||
        getDraftDetails(locale, editorDraft.category.trim() || "General", editorDraft.title.trim()),
      rating: editorDraft.rating,
      note: editorDraft.note.trim(),
      phase: existing?.phase ?? editorDraft.phase ?? 1,
      aiThreads: existing?.aiThreads ?? {},
      repoLink: editorDraft.repoLink.trim(),
      demoLink: editorDraft.demoLink.trim(),
      source: existing?.source ?? "custom",
      sortIndex: existing?.sortIndex ?? ideas.length + 1,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };

    const next = existing
      ? ideas.map((idea) => (idea.id === nextIdea.id ? nextIdea : idea))
      : [...ideas, nextIdea];

    setIdeas(next);
    setEditorDraft(null);

    try {
      await saveIdea(nextIdea);
      setSyncError(null);
    } catch (error) {
      setSyncError(error instanceof Error ? error.message : ui.saveError);
    }
  };

  const sections = useMemo(
    () =>
      categories
        .map((category) => ({
          category,
          ideas: visibleIdeas.filter((idea) => idea.category === category),
        }))
        .filter((entry) => entry.ideas.length > 0),
    [categories, visibleIdeas],
  );

  const implementationSections = useMemo(
    () =>
      categories
        .map((category) => ({
          category,
          ideas: implementationIdeas.filter((idea) => idea.category === category),
        }))
        .filter((entry) => entry.ideas.length > 0),
    [categories, implementationIdeas],
  );

  useEffect(() => {
    setCollapsedCategories((current) => {
      const next: Record<string, boolean> = {};
      let changed = false;

      categories.forEach((category) => {
        if (category in current) {
          next[category] = current[category];
        } else {
          next[category] = false;
          changed = true;
        }
      });

      Object.keys(current).forEach((category) => {
        if (!(category in next)) {
          changed = true;
        }
      });

      return changed ? next : current;
    });
  }, [categories]);

  const toggleCategory = (category: string) => {
    setCollapsedCategories((current) => ({
      ...current,
      [category]: !current[category],
    }));
  };

  const setLanguage = (nextLocale: Locale) => {
    setLocale(nextLocale);
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      <header className="topbar">
        <div className="topbar-copy">
          <div className="topbar-title-row">
            <span className="eyebrow">{ui.appName}</span>
            <div className="language-switcher" role="group" aria-label={ui.language}>
              <button
                type="button"
                className={`language-flag ${locale === "vi" ? "active" : ""}`}
                onClick={() => setLanguage("vi")}
                aria-pressed={locale === "vi"}
                aria-label={ui.vietnamese}
                title={ui.vietnamese}
              >
                <span aria-hidden="true">🇻🇳</span>
              </button>
              <button
                type="button"
                className={`language-flag ${locale === "en" ? "active" : ""}`}
                onClick={() => setLanguage("en")}
                aria-pressed={locale === "en"}
                aria-label={ui.english}
                title={ui.english}
              >
                <span aria-hidden="true">🇺🇸</span>
              </button>
            </div>
          </div>
          <h1>{ui.headline}</h1>
          <p>
            {ui.subheadline}
          </p>
        </div>

        <div className="stat-row">
          <Stat label={ui.visible} value={tabVisibleCount} />
          <Stat label={ui.twoStar} value={twoStarCount} />
          <Stat label={ui.threeStar} value={threeStarCount} />
          <Stat label={ui.hidden} value={hiddenCount} />
        </div>

        <div className="tab-strip" role="tablist" aria-label="Mode">
          <button
            type="button"
            role="tab"
            className={`tab-chip ${activeTab === "review" ? "active" : ""}`}
            aria-selected={activeTab === "review"}
            onClick={() => setActiveTab("review")}
          >
            <span>{ui.tabReview}</span>
            <strong>{visibleIdeas.length}</strong>
          </button>
          <button
            type="button"
            role="tab"
            className={`tab-chip ${activeTab === "build" ? "active" : ""}`}
            aria-selected={activeTab === "build"}
            onClick={() => setActiveTab("build")}
          >
            <span>{ui.tabBuild}</span>
            <strong>{implementationTotal}</strong>
          </button>
        </div>

        {syncError ? (
          <div className="notice error">
            <CircleAlert size={16} />
            <span>{syncError}</span>
          </div>
        ) : null}

        <div className="toolbar">
          <label className="search-box">
            <Search size={16} />
            <input
              type="search"
              placeholder={ui.searchPlaceholder}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <button type="button" className="primary-button" onClick={startRandomMode}>
            <Shuffle size={16} />
            {ui.randomOne}
          </button>

          <button type="button" className="ghost-button" onClick={beginAdd}>
            <BadgePlus size={16} />
            {ui.addIdea}
          </button>
        </div>

        <div className="category-dock" ref={categoryMenuRef}>
          <button
            type="button"
            className={`category-launcher ${categoryMenuOpen ? "open" : ""}`}
            onClick={() => setCategoryMenuOpen((open) => !open)}
            aria-expanded={categoryMenuOpen}
            aria-controls="category-switcher-panel"
          >
            <span className="category-launcher-label">{ui.category}</span>
            <strong>{activeCategoryLabel}</strong>
            <ChevronDown size={16} className="category-launcher-chevron" />
          </button>

          <div id="category-switcher-panel" className={`category-panel ${categoryMenuOpen ? "open" : ""}`}>
            <div className="category-panel-head">
              <span>{ui.category}</span>
            </div>
            <div className="category-panel-grid">
              <FilterChip
                active={activeCategory === "All"}
                onClick={() => {
                  setActiveCategory("All");
                  setCategoryMenuOpen(false);
                }}
              >
                {ui.allCategories}
              </FilterChip>
                  {categories.map((category) => (
                    <FilterChip
                      key={category}
                      active={activeCategory === category}
                      onClick={() => {
                        setActiveCategory(category);
                        setCategoryMenuOpen(false);
                      }}
                    >
                      {translateCategory(category, locale)}
                    </FilterChip>
                  ))}
            </div>
          </div>
        </div>

        {activeTab === "review" ? (
          <div className="chip-strip">
            <FilterChip active={ratingFilter === "all"} onClick={() => setRatingFilter("all")}>
              {ui.allRatings}
            </FilterChip>
            <FilterChip active={ratingFilter === 2} onClick={() => setRatingFilter(2)}>
              {ui.twoStarOnly}
            </FilterChip>
            <FilterChip active={ratingFilter === 3} onClick={() => setRatingFilter(3)}>
              {ui.threeStarOnly}
            </FilterChip>
          </div>
        ) : (
          <div className="chip-strip">
            <FilterChip active={phaseFilter === "all"} onClick={() => setPhaseFilter("all")}>
              {ui.allPhases}
            </FilterChip>
            {PHASES.filter((phase) => phase.id >= 3).map((phase) => {
              const copy = locale === "vi" ? phase.vi : phase.en;
              return (
                <FilterChip
                  key={phase.id}
                  active={phaseFilter === phase.id}
                  onClick={() => setPhaseFilter(phase.id)}
                >
                  {phase.id} {copy.short}
                </FilterChip>
              );
            })}
          </div>
        )}
      </header>

      <main className="content">
        {loading ? (
          <LoadingGrid />
        ) : activeTab === "review" ? (
          sections.length > 0 ? (
            sections.map((section) => (
              <section key={section.category} className="section">
                <button
                  type="button"
                  className="section-head section-toggle"
                  aria-expanded={!collapsedCategories[section.category]}
                  onClick={() => toggleCategory(section.category)}
                >
                  <div className="section-title-row">
                    <h2>{translateCategory(section.category, locale)}</h2>
                    <span className="section-count">
                      {section.ideas.length} {ui.ideasInView}
                    </span>
                  </div>
                  <ChevronDown size={16} className="section-chevron" />
                </button>

                <div className={`section-body ${collapsedCategories[section.category] ? "collapsed" : "expanded"}`}>
                  <div className="cards">
                    {section.ideas.map((idea) => {
                      const display = getDisplayIdea(idea, locale);
                      return (
                        <IdeaCard
                          key={idea.id}
                          idea={idea}
                          display={display}
                          ui={ui}
                          onOpen={() => setDetailId(idea.id)}
                          onEdit={() => beginEdit(idea)}
                          onRate={(rating) => updateIdea(idea.id, { rating })}
                          onToggleImplementation={() =>
                            updateIdea(idea.id, { phase: isImplementationPhase(idea.phase) ? 1 : 3 })
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              </section>
            ))
          ) : (
            <EmptyState
              ui={ui}
              onReset={() => {
                setActiveCategory("All");
                setRatingFilter("all");
                setSearch("");
              }}
            />
          )
        ) : (
          <>
            <PhaseLegend locale={locale} />
            {implementationSections.length > 0 ? (
              implementationSections.map((section) => (
                <section key={section.category} className="section">
                  <button
                    type="button"
                    className="section-head section-toggle"
                    aria-expanded={!collapsedCategories[section.category]}
                    onClick={() => toggleCategory(section.category)}
                  >
                    <div className="section-title-row">
                      <h2>{translateCategory(section.category, locale)}</h2>
                      <span className="section-count">
                        {section.ideas.length} {ui.ideasInView}
                      </span>
                    </div>
                    <ChevronDown size={16} className="section-chevron" />
                  </button>

                  <div className={`section-body ${collapsedCategories[section.category] ? "collapsed" : "expanded"}`}>
                    <div className="cards">
                      {section.ideas.map((idea) => {
                        const display = getDisplayIdea(idea, locale);
                        return (
                          <ImplementationCard
                            key={idea.id}
                            idea={idea}
                            display={display}
                            locale={locale}
                            ui={ui}
                            onOpen={() => setDetailId(idea.id)}
                            onEdit={() => beginEdit(idea)}
                            onPhase={(phase) => updateIdea(idea.id, { phase })}
                            onBack={() => updateIdea(idea.id, { phase: 1 })}
                          />
                        );
                      })}
                    </div>
                  </div>
                </section>
              ))
            ) : (
              <EmptyImplementationState ui={ui} onGoReview={() => setActiveTab("review")} />
            )}
          </>
        )}
      </main>

      <button type="button" className="fab" onClick={beginAdd} aria-label={ui.addIdea}>
        <Plus size={22} />
      </button>

      {detailIdea ? (
        <IdeaSheet
          kind="detail"
          title={detailView?.title ?? detailIdea.title}
          subtitle={detailView?.category ?? detailIdea.category}
          onClose={() => setDetailId(null)}
          footer={
            <div className="sheet-actions">
              <button type="button" className="ghost-button" onClick={() => beginEdit(detailIdea)}>
                <Edit3 size={16} />
                {ui.editIdea}
              </button>
              <button type="button" className="primary-button" onClick={() => setDetailId(null)}>
                {ui.close}
              </button>
            </div>
          }
        >
          <div className="detail-body">
            <p className="detail-summary">{detailView?.summary ?? detailIdea.summary}</p>
            <p className="detail-text">{detailView?.details ?? detailIdea.details}</p>

            <div className="meta-row">
              <span className="meta-pill">
                {ui.category}: {detailView?.category ?? detailIdea.category}
              </span>
              <span className="meta-pill">
                {ui.phase}: {(locale === "vi" ? getPhaseDef(detailIdea.phase).vi.label : getPhaseDef(detailIdea.phase).en.label)}
              </span>
            </div>

            <div className="phase-block">
              <div className="phase-controls">
                <select
                  className="phase-select"
                  value={detailIdea.phase}
                  onChange={(event) => updateIdea(detailIdea.id, { phase: Number(event.target.value) as IdeaPhase })}
                  aria-label={ui.phase}
                >
                  {PHASES.map((phase) => {
                    const copy = locale === "vi" ? phase.vi : phase.en;
                    return (
                      <option key={phase.id} value={phase.id}>
                        {phase.id}. {copy.label}
                      </option>
                    );
                  })}
                </select>

                {detailIdea.phase < 3 ? (
                  <button
                    type="button"
                    className="ghost-button phase-start"
                    onClick={() => updateIdea(detailIdea.id, { phase: 3 })}
                  >
                    <Layers3 size={16} />
                    {ui.startImplementation}
                  </button>
                ) : null}

                {detailIdea.phase !== 1 ? (
                  <button
                    type="button"
                    className="ghost-button phase-back"
                    onClick={() => updateIdea(detailIdea.id, { phase: 1 })}
                  >
                    {ui.backToIdea}
                  </button>
                ) : null}
              </div>
            </div>

            {detailIdea.phase >= 2 ? (
              <div className="ai-block">
                <div className="ai-head">
                  <h3>AI</h3>
                  <div className="ai-add">
                    <select
                      value={aiProviderToAdd}
                      onChange={(event) => {
                        const value = event.target.value;
                        setAiProviderToAdd(value);
                        const provider = EXTRA_AI_PROVIDERS.find((entry) => entry.id === value);
                        if (!provider || !detailIdea) return;
                        updateIdea(detailIdea.id, { aiThreads: { ...detailIdea.aiThreads, [provider.id]: { providerId: provider.id, providerLabel: provider.label, answers: [] } } });
                        setAiProviderToAdd("");
                      }}
                      aria-label="Add AI service"
                    >
                      <option value="">Add AI</option>
                      {EXTRA_AI_PROVIDERS.filter((provider) => !(provider.id in (detailIdea.aiThreads ?? {}))).map((provider) => (
                        <option key={provider.id} value={provider.id}>
                          {provider.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="ai-grid">
                  {detailAiProviders.map((provider) => (
                    <AiProviderPanel
                      key={provider.id}
                      provider={provider}
                      thread={(detailIdea.aiThreads ?? {})[provider.id]}
                      onAdd={(rawHtml) => addAiAnswer(detailIdea, provider, rawHtml)}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {detailIdea.phase >= 5 ? (
              <div className="links-block">
                <div className="links-head">
                  <h3>{ui.links}</h3>
                </div>

                <div className="links-grid">
                  <label className="link-field">
                    <span>{ui.repoLink}</span>
                    <input
                      defaultValue={detailIdea.repoLink}
                      placeholder="https://github.com/..."
                      onBlur={(event) => updateIdea(detailIdea.id, { repoLink: event.target.value.trim() })}
                      inputMode="url"
                    />
                    {detailIdea.repoLink ? (
                      <a className="link-open" href={detailIdea.repoLink} target="_blank" rel="noreferrer">
                        {ui.openLink}
                      </a>
                    ) : null}
                  </label>

                  <label className="link-field">
                    <span>{ui.demoLink}</span>
                    <input
                      defaultValue={detailIdea.demoLink}
                      placeholder="https://your-demo.vercel.app"
                      onBlur={(event) => updateIdea(detailIdea.id, { demoLink: event.target.value.trim() })}
                      inputMode="url"
                    />
                    {detailIdea.demoLink ? (
                      <a className="link-open" href={detailIdea.demoLink} target="_blank" rel="noreferrer">
                        {ui.openLink}
                      </a>
                    ) : null}
                  </label>
                </div>
              </div>
            ) : null}

            <div className="rating-block">
              <label>{ui.rateThisIdea}</label>
              <StarRating
                value={detailIdea.rating}
                onChange={(rating) => updateIdea(detailIdea.id, { rating })}
              />
              <small>{ui.oneStarHidden}</small>
            </div>

            <div className="note-block">
              <label htmlFor="idea-note">{ui.note}</label>
              <textarea
                id="idea-note"
                rows={5}
                defaultValue={detailIdea.note}
                onBlur={(event) => updateIdea(detailIdea.id, { note: event.target.value.trim() })}
                placeholder={ui.addQuickThought}
              />
            </div>
          </div>
        </IdeaSheet>
      ) : null}

      {editorDraft ? (
        <IdeaSheet
          kind="editor"
          title={editorDraft.id ? ui.editIdea : ui.addIdea}
          subtitle={ui.saveToDatabase}
          onClose={closeEditor}
          footer={
            <div className="sheet-actions">
              <button type="button" className="ghost-button" onClick={closeEditor}>
                {ui.cancel}
              </button>
              <button type="button" className="primary-button" onClick={saveDraft}>
                {ui.saveIdea}
              </button>
            </div>
          }
        >
          <div className="form-grid">
            <Field label={ui.title}>
              <input
                value={editorDraft.title}
                onChange={(event) => setEditorDraft({ ...editorDraft, title: event.target.value })}
                placeholder={ui.titlePlaceholder}
              />
            </Field>
            <Field label={ui.category}>
              <select
                value={editorDraft.category}
                onChange={(event) => setEditorDraft({ ...editorDraft, category: event.target.value })}
              >
                {normalizeCategoryOrder([...categoryOrder, editorDraft.category]).map((category) => (
                  <option key={category} value={category}>
                    {translateCategory(category, locale)}
                  </option>
                ))}
                {!categoryOrder.includes(editorDraft.category) ? (
                  <option value={editorDraft.category}>{translateCategory(editorDraft.category, locale)}</option>
                ) : null}
              </select>
            </Field>
            <Field label={ui.summary}>
              <input
                value={editorDraft.summary}
                onChange={(event) => setEditorDraft({ ...editorDraft, summary: event.target.value })}
                placeholder={ui.defaultDraftSummary}
              />
            </Field>
            <Field label={ui.details} full>
              <textarea
                rows={5}
                value={editorDraft.details}
                onChange={(event) => setEditorDraft({ ...editorDraft, details: event.target.value })}
                placeholder={ui.defaultDraftDetails}
              />
            </Field>
            <Field label={ui.note} full>
              <textarea
                rows={4}
                value={editorDraft.note}
                onChange={(event) => setEditorDraft({ ...editorDraft, note: event.target.value })}
                placeholder={ui.addQuickThought}
              />
            </Field>
            <Field label={ui.initialRating}>
              <div className="rating-inline">
                {[0, 1, 2, 3].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`rating-toggle ${editorDraft.rating === value ? "active" : ""}`}
                    onClick={() => setEditorDraft({ ...editorDraft, rating: value as Rating })}
                  >
                    {value === 0 ? ui.unset : `${value}★`}
                  </button>
                ))}
              </div>
            </Field>
            <Field label={ui.phase}>
              <select
                value={editorDraft.phase}
                onChange={(event) => setEditorDraft({ ...editorDraft, phase: Number(event.target.value) as IdeaPhase })}
              >
                {PHASES.map((phase) => {
                  const copy = locale === "vi" ? phase.vi : phase.en;
                  return (
                    <option key={phase.id} value={phase.id}>
                      {phase.id}. {copy.label}
                    </option>
                  );
                })}
              </select>
            </Field>
            {editorDraft.phase >= 5 ? (
              <>
                <Field label={ui.repoLink} full>
                  <input
                    value={editorDraft.repoLink}
                    onChange={(event) => setEditorDraft({ ...editorDraft, repoLink: event.target.value })}
                    placeholder="https://github.com/..."
                    inputMode="url"
                  />
                </Field>
                <Field label={ui.demoLink} full>
                  <input
                    value={editorDraft.demoLink}
                    onChange={(event) => setEditorDraft({ ...editorDraft, demoLink: event.target.value })}
                    placeholder="https://your-demo.vercel.app"
                    inputMode="url"
                  />
                </Field>
              </>
            ) : null}
          </div>
        </IdeaSheet>
      ) : null}

      {randomOpen ? (
        <IdeaSheet
          kind="random"
          title={ui.randomReview}
          subtitle={`${randomIndex + 1} / ${Math.max(randomQueue.length, 1)}`}
          onClose={() => setRandomOpen(false)}
          footer={
            <div className="sheet-actions">
              <button
                type="button"
                className="ghost-button"
                onClick={() => setRandomIndex((index) => Math.max(index - 1, 0))}
              >
                {ui.previous}
              </button>
              <button
                type="button"
                className="ghost-button"
                onClick={() => {
                  setRandomQueue(shuffle(visibleIdeas.map((idea) => idea.id)));
                  setRandomIndex(0);
                }}
              >
                {ui.reshuffle}
              </button>
            </div>
          }
        >
          {currentRandomIdea && currentRandomView ? (
            <div className="random-card">
              <div className="random-head">
                <span
                  className="section-badge category-badge"
                  style={categoryThemeStyle(currentRandomIdea.category)}
                >
                  {currentRandomView.category}
                </span>
                <span className="random-progress">{randomIndex + 1} of {randomQueue.length}</span>
              </div>
              <h3>{currentRandomView.title}</h3>
              <p>{currentRandomView.summary}</p>
              <div className="random-details">{currentRandomView.details}</div>
              <div className="rating-inline random-rating">
                {[1, 2, 3].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className="rating-toggle large"
                    onClick={() => handleRandomRating(rating as Rating)}
                  >
                    {rating}★
                  </button>
                ))}
              </div>
              <div className="sheet-actions">
                <button type="button" className="ghost-button" onClick={() => handleRandomRating(0)}>
                  {ui.skip}
                </button>
                <button type="button" className="primary-button" onClick={() => setDetailId(currentRandomIdea.id)}>
                  {ui.openDetails}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="empty random-empty">
              <Sparkles size={26} />
              <h3>{ui.allDone}</h3>
              <p>{ui.noMoreVisibleIdeas}</p>
              <button type="button" className="primary-button" onClick={() => setRandomOpen(false)}>
                {ui.closeRandomMode}
              </button>
            </div>
          )}
        </IdeaSheet>
      ) : null}
    </div>
  );
};

function IdeaCard({
  idea,
  display,
  ui,
  onOpen,
  onEdit,
  onRate,
  onToggleImplementation,
}: {
  idea: Idea;
  display: ReturnType<typeof getDisplayIdea>;
  ui: ReturnType<typeof getUiCopy>;
  onOpen: () => void;
  onEdit: () => void;
  onRate: (rating: Rating) => void;
  onToggleImplementation: () => void;
}) {
  const implementing = isImplementationPhase(idea.phase);
  return (
    <article className="idea-card" style={categoryThemeStyle(idea.category)}>
      <button type="button" className="idea-main" onClick={onOpen}>
          <div className="idea-heading">
          <div>
            <span className="section-badge category-badge" style={categoryThemeStyle(idea.category)}>
              {display.category}
            </span>
            <h3>{display.title}</h3>
          </div>
        </div>

        <p>{display.summary}</p>

        <div className="note-preview">
          <NotebookPen size={14} />
          <span>{idea.note ? idea.note : ui.noNoteYet}</span>
        </div>
      </button>

      <div className="card-footer">
        <StarRating value={idea.rating} onChange={onRate} compact />
        <div className="card-actions">
          <button
            type="button"
            className={`icon-button phase-toggle ${implementing ? "active" : ""}`}
            onClick={onToggleImplementation}
            aria-label={implementing ? ui.backToIdea : ui.startImplementation}
            title={implementing ? ui.backToIdea : ui.startImplementation}
          >
            <Layers3 size={16} />
          </button>
          <button type="button" className="mini-button" onClick={onEdit}>
            {ui.editIdea}
          </button>
        </div>
      </div>
    </article>
  );
}

function ImplementationCard({
  idea,
  display,
  locale,
  ui,
  onOpen,
  onEdit,
  onPhase,
  onBack,
}: {
  idea: Idea;
  display: ReturnType<typeof getDisplayIdea>;
  locale: Locale;
  ui: ReturnType<typeof getUiCopy>;
  onOpen: () => void;
  onEdit: () => void;
  onPhase: (phase: IdeaPhase) => void;
  onBack: () => void;
}) {
  const def = getPhaseDef(idea.phase);
  const copy = locale === "vi" ? def.vi : def.en;
  return (
    <article className="idea-card implementation-card" style={categoryThemeStyle(idea.category)}>
      <button type="button" className="idea-main" onClick={onOpen}>
        <div className="idea-heading">
          <div>
            <div className="badge-row">
              <span className="section-badge category-badge" style={categoryThemeStyle(idea.category)}>
                {display.category}
              </span>
              <span className="section-badge phase-badge">
                {idea.phase} {copy.short}
              </span>
            </div>
            <h3>{display.title}</h3>
          </div>
        </div>
        <p>{display.summary}</p>
      </button>

      <div className="card-footer">
        <select
          className="phase-select"
          value={idea.phase}
          onChange={(event) => onPhase(Number(event.target.value) as IdeaPhase)}
          aria-label={ui.phase}
        >
          {PHASES.map((phase) => {
            const optionCopy = locale === "vi" ? phase.vi : phase.en;
            return (
              <option key={phase.id} value={phase.id}>
                {phase.id}. {optionCopy.label}
              </option>
            );
          })}
        </select>
        <div className="card-actions">
          <button type="button" className="mini-button" onClick={onEdit}>
            {ui.editIdea}
          </button>
          <button type="button" className="mini-button" onClick={onBack}>
            {ui.backToIdea}
          </button>
        </div>
      </div>
    </article>
  );
}

function PhaseLegend({ locale }: { locale: Locale }) {
  return (
    <details className="phase-legend">
      <summary>{locale === "vi" ? "Các giai đoạn" : "Phases"}</summary>
      <div className="phase-legend-grid">
        {PHASES.map((phase) => {
          const copy = locale === "vi" ? phase.vi : phase.en;
          return (
            <div key={phase.id} className="phase-legend-row">
              <strong>{phase.id}</strong>
              <div>
                <div className="phase-legend-title">{copy.label}</div>
                <div className="phase-legend-hint">{copy.hint}</div>
              </div>
            </div>
          );
        })}
      </div>
    </details>
  );
}

function AiProviderPanel({
  provider,
  thread,
  onAdd,
}: {
  provider: { id: string; label: string };
  thread: { answers: AiAnswer[] } | undefined;
  onAdd: (rawHtml: string) => Promise<void>;
}) {
  const pasteRef = useRef<HTMLDivElement | null>(null);
  const [saving, setSaving] = useState(false);
  const answers = thread?.answers ?? [];

  const handlePaste = async (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const html = event.clipboardData.getData("text/html");
    const text = event.clipboardData.getData("text/plain");
    const raw = html && html.trim().length > 0 ? html : `<pre>${escapeHtml(text)}</pre>`;
    if (!raw.trim()) return;

    setSaving(true);
    try {
      await onAdd(raw);
      if (pasteRef.current) {
        pasteRef.current.innerHTML = "";
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="ai-panel">
      <div className="ai-panel-head">
        <strong>{provider.label}</strong>
        <span className="ai-count">{answers.length}</span>
      </div>

      <div className="ai-answers">
        {answers.length > 0 ? (
          answers.map((answer, index) => (
            <details
              key={answer.id}
              className="ai-answer"
              open={index === answers.length - 1}
            >
              <summary>Answer {index + 1}</summary>
              <div className="ai-html" dangerouslySetInnerHTML={{ __html: answer.html }} />
            </details>
          ))
        ) : (
          <div className="ai-empty">Paste a response to start.</div>
        )}
      </div>

      <div className={`ai-paste ${saving ? "saving" : ""}`}>
        <div
          ref={pasteRef}
          className="ai-paste-box"
          contentEditable
          suppressContentEditableWarning
          onPaste={handlePaste}
          data-placeholder="Paste rich text here. Each paste becomes a new answer."
          aria-label={`Paste ${provider.label} answer`}
        />
      </div>
    </section>
  );
}

function EmptyImplementationState({ ui, onGoReview }: { ui: ReturnType<typeof getUiCopy>; onGoReview: () => void }) {
  return (
    <div className="empty">
      <Layers3 size={30} />
      <h3>{ui.noImplementationIdeas}</h3>
      <p>{ui.noVisibleIdeasBody}</p>
      <button type="button" className="primary-button" onClick={onGoReview}>
        {ui.tabReview}
      </button>
    </div>
  );
}

function StarRating({
  value,
  onChange,
  compact = false,
}: {
  value: Rating;
  onChange: (rating: Rating) => void;
  compact?: boolean;
}) {
  return (
    <div className={`star-row ${compact ? "compact" : ""}`}>
      {[1, 2, 3].map((rating) => {
        const active = value >= rating;
        return (
          <button
            key={rating}
            type="button"
            className={`star-button ${active ? "active" : ""}`}
            onClick={() => onChange(rating as Rating)}
            aria-label={`${rating} star rating`}
          >
            <Star size={compact ? 14 : 18} fill={active ? "currentColor" : "none"} />
          </button>
        );
      })}
    </div>
  );
}

function IdeaSheet({
  kind,
  title,
  subtitle,
  onClose,
  children,
  footer,
}: {
  kind: "detail" | "editor" | "random";
  title: string;
  subtitle: string;
  onClose: () => void;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className={`sheet-overlay ${kind}`}>
      <button type="button" className="sheet-backdrop" onClick={onClose} aria-label="Close sheet" />
      <section className="sheet-panel" role="dialog" aria-modal="true" aria-label={title}>
        <div className="sheet-handle" />
        <div className="sheet-top">
          <div>
            <span className="eyebrow">{subtitle}</span>
            <h2>{title}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="sheet-content">{children}</div>

        <div className="sheet-footer">{footer}</div>
      </section>
    </div>
  );
}

function Field({
  label,
  children,
  full = false,
}: {
  label: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`field ${full ? "full" : ""}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat-pill">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button type="button" className={`filter-chip ${active ? "active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

function LoadingGrid() {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="skeleton-card" />
      ))}
    </div>
  );
}

function EmptyState({ onReset, ui }: { onReset: () => void; ui: ReturnType<typeof getUiCopy> }) {
  return (
    <div className="empty">
      <Layers3 size={30} />
      <h3>{ui.noVisibleIdeas}</h3>
      <p>{ui.noVisibleIdeasBody}</p>
      <button type="button" className="primary-button" onClick={onReset}>
        {ui.resetFilters}
      </button>
    </div>
  );
}

function shuffle(items: string[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

export default App;
