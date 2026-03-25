import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
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
import type { Idea, Rating } from "./types";
import { getDisplayIdea, getDraftDetails, getDraftSummary, getUiCopy, translateCategory, type Locale } from "./lib/i18n";

type RatingFilter = "all" | 2 | 3;

type IdeaDraft = {
  id?: string;
  title: string;
  category: string;
  summary: string;
  details: string;
  note: string;
  rating: Rating;
};

const initialDraft = (category = categoryOrder[0] ?? "General"): IdeaDraft => ({
  title: "",
  category,
  summary: "",
  details: "",
  note: "",
  rating: 0,
});

const App = () => {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "vi";
    const stored = window.localStorage.getItem("micro-tool-lab:locale");
    return stored === "en" ? "en" : "vi";
  });
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("all");
  const [search, setSearch] = useState("");
  const [detailId, setDetailId] = useState<string | null>(null);
  const [editorDraft, setEditorDraft] = useState<IdeaDraft | null>(null);
  const [randomOpen, setRandomOpen] = useState(false);
  const [randomQueue, setRandomQueue] = useState<string[]>([]);
  const [randomIndex, setRandomIndex] = useState(0);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [syncError, setSyncError] = useState<string | null>(null);
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

  const categories = useMemo(
    () => normalizeCategoryOrder(Array.from(new Set(ideas.map((idea) => idea.category)))),
    [ideas],
  );

  const visibleIdeas = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    return ideas
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
  }, [ideas, activeCategory, ratingFilter, search, locale]);

  const hiddenCount = ideas.filter((idea) => idea.rating === 1).length;
  const twoStarCount = ideas.filter((idea) => idea.rating === 2).length;
  const threeStarCount = ideas.filter((idea) => idea.rating === 3).length;

  const detailIdea = detailId ? ideas.find((idea) => idea.id === detailId) ?? null : null;
  const detailView = detailIdea ? getDisplayIdea(detailIdea, locale) : null;

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

  const startRandomMode = () => {
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
            <div className="language-switcher" role="tablist" aria-label={ui.language}>
              <button
                type="button"
                className={`language-chip ${locale === "vi" ? "active" : ""}`}
                onClick={() => setLanguage("vi")}
              >
                {ui.vietnamese}
              </button>
              <button
                type="button"
                className={`language-chip ${locale === "en" ? "active" : ""}`}
                onClick={() => setLanguage("en")}
              >
                {ui.english}
              </button>
            </div>
          </div>
          <h1>{ui.headline}</h1>
          <p>
            {ui.subheadline}
          </p>
        </div>

        <div className="stat-row">
          <Stat label={ui.visible} value={visibleIdeas.length} />
          <Stat label={ui.twoStar} value={twoStarCount} />
          <Stat label={ui.threeStar} value={threeStarCount} />
          <Stat label={ui.hidden} value={hiddenCount} />
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

        <div className="chip-strip">
          <FilterChip active={activeCategory === "All"} onClick={() => setActiveCategory("All")}>
            {ui.allCategories}
          </FilterChip>
          {categories.map((category) => (
            <FilterChip key={category} active={activeCategory === category} onClick={() => setActiveCategory(category)}>
              {translateCategory(category, locale)}
            </FilterChip>
          ))}
        </div>

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
      </header>

      <main className="content">
        {loading ? (
          <LoadingGrid />
        ) : sections.length > 0 ? (
          sections.map((section) => (
            <section key={section.category} className="section">
              <button
                type="button"
                className="section-head section-toggle"
                aria-expanded={!collapsedCategories[section.category]}
                onClick={() => toggleCategory(section.category)}
              >
                <div>
                  <h2>{translateCategory(section.category, locale)}</h2>
                  <p>
                    {section.ideas.length} {ui.ideasInView}
                  </p>
                </div>
                <div className="section-actions">
                  <span className="section-badge">
                    {isSeedCategory(section.category) ? ui.imported : ui.custom}
                  </span>
                  <span className="section-badge">{collapsedCategories[section.category] ? ui.show : ui.hide}</span>
                  <ChevronDown size={16} className="section-chevron" />
                </div>
              </button>

              <div className={`section-body ${collapsedCategories[section.category] ? "collapsed" : "expanded"}`}>
                <div className="cards">
                  {section.ideas.map((idea) => (
                    (() => {
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
                        />
                      );
                    })()
                  ))}
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
                {ui.source}: {detailView?.sourceLabel ?? detailIdea.source}
              </span>
              <span className="meta-pill">
                {ui.category}: {detailView?.category ?? detailIdea.category}
              </span>
            </div>

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
                <span className="section-badge">{currentRandomView.category}</span>
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
}: {
  idea: Idea;
  display: ReturnType<typeof getDisplayIdea>;
  ui: ReturnType<typeof getUiCopy>;
  onOpen: () => void;
  onEdit: () => void;
  onRate: (rating: Rating) => void;
}) {
  return (
    <article className="idea-card">
      <button type="button" className="idea-main" onClick={onOpen}>
        <div className="idea-heading">
          <div>
            <span className="section-badge">{display.category}</span>
            <h3>{display.title}</h3>
          </div>
          <span className="idea-source">{display.sourceLabel}</span>
        </div>

        <p>{display.summary}</p>

        <div className="note-preview">
          <NotebookPen size={14} />
          <span>{idea.note ? idea.note : ui.noNoteYet}</span>
        </div>
      </button>

      <div className="card-footer">
        <StarRating value={idea.rating} onChange={onRate} compact />
        <button type="button" className="mini-button" onClick={onEdit}>
          {ui.editIdea}
        </button>
      </div>
    </article>
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
