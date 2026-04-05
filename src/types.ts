export type Rating = 0 | 1 | 2 | 3;

export type IdeaSource = "seed" | "custom";

export const IDEA_PHASES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type IdeaPhase = (typeof IDEA_PHASES)[number];

export type AiAnswer = {
  id: string;
  html: string;
  createdAt: string;
};

export type AiThread = {
  providerId: string;
  providerLabel: string;
  answers: AiAnswer[];
};

export type AiThreads = Record<string, AiThread>;

export interface Idea {
  id: string;
  title: string;
  category: string;
  summary: string;
  details: string;
  rating: Rating;
  note: string;
  phase: IdeaPhase;
  aiThreads: AiThreads;
  repoLink: string;
  demoLink: string;
  source: IdeaSource;
  sortIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface IdeaInput {
  id?: string;
  title: string;
  category: string;
  summary: string;
  details: string;
  rating: Rating;
  note: string;
  phase: IdeaPhase;
  aiThreads: AiThreads;
  repoLink: string;
  demoLink: string;
  source: IdeaSource;
  sortIndex?: number;
}
