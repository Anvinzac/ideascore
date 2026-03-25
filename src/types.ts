export type Rating = 0 | 1 | 2 | 3;

export type IdeaSource = "seed" | "custom";

export interface Idea {
  id: string;
  title: string;
  category: string;
  summary: string;
  details: string;
  rating: Rating;
  note: string;
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
  source: IdeaSource;
  sortIndex?: number;
}
