import type { IdeaPhase } from "../types";

export type PhaseDef = {
  id: IdeaPhase;
  en: { label: string; hint: string; short: string };
  vi: { label: string; hint: string; short: string };
};

export const PHASES: PhaseDef[] = [
  {
    id: 1,
    en: { label: "Plain idea", short: "Idea", hint: "Just a raw concept with no execution plan yet." },
    vi: { label: "Ý tưởng thô", short: "Ý tưởng", hint: "Mới là ý tưởng, chưa có kế hoạch triển khai." },
  },
  {
    id: 2,
    en: { label: "Idea with AI touch", short: "AI", hint: "The idea includes an AI-assisted angle or workflow." },
    vi: { label: "Ý tưởng có AI", short: "AI", hint: "Ý tưởng có yếu tố AI hoặc trợ lý." },
  },
  {
    id: 3,
    en: {
      label: "General requirement and DB schema",
      short: "Schema",
      hint: "High-level requirements plus core entities and relationships.",
    },
    vi: { label: "Yêu cầu + DB", short: "DB", hint: "Yêu cầu tổng quan và các bảng/quan hệ chính." },
  },
  {
    id: 4,
    en: { label: "Specific app prompt", short: "Prompt", hint: "A concrete build prompt ready for a generator/agent." },
    vi: { label: "Prompt ứng dụng", short: "Prompt", hint: "Prompt cụ thể để bắt đầu xây dựng." },
  },
  {
    id: 5,
    en: { label: "Prototype built", short: "Proto", hint: "A working prototype exists and can be tried." },
    vi: { label: "Có prototype", short: "Proto", hint: "Đã có bản prototype chạy được." },
  },
  {
    id: 6,
    en: { label: "Endless enhancing", short: "Enhance", hint: "Iteration phase: polish UX, edge cases, stability." },
    vi: { label: "Cải tiến", short: "Cải tiến", hint: "Lặp cải tiến: UX, edge case, ổn định." },
  },
  {
    id: 7,
    en: { label: "Alpha version", short: "Alpha", hint: "Usable internally; still rough and incomplete." },
    vi: { label: "Alpha", short: "Alpha", hint: "Dùng nội bộ được; còn thô và thiếu." },
  },
  {
    id: 8,
    en: { label: "Beta version", short: "Beta", hint: "Feature-complete-ish; ready for limited external users." },
    vi: { label: "Beta", short: "Beta", hint: "Gần hoàn thiện; cho nhóm người dùng nhỏ." },
  },
  {
    id: 9,
    en: { label: "First release", short: "v1", hint: "Initial public launch." },
    vi: { label: "Phát hành 1", short: "v1", hint: "Ra mắt bản đầu tiên." },
  },
  {
    id: 10,
    en: { label: "Customer-based updates", short: "Updates", hint: "Ongoing improvements driven by real users." },
    vi: { label: "Cập nhật theo khách", short: "Cập nhật", hint: "Cải tiến theo phản hồi người dùng." },
  },
] as const;

export const isImplementationPhase = (phase: IdeaPhase) => phase >= 3;

export const getPhaseDef = (phase: IdeaPhase) => PHASES.find((entry) => entry.id === phase) ?? PHASES[0];

