/* eslint-disable no-console */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { buildSeedIdeas } from "../src/lib/seed.ts";

const csvEscape = (value: string) => {
  const normalized = value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  if (/[",\n]/.test(normalized)) {
    return `"${normalized.replace(/"/g, '""')}"`;
  }
  return normalized;
};

const tsvEscape = (value: string) =>
  value
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\t/g, " ")
    .trim();

const main = async () => {
  const ideas = buildSeedIdeas().filter((idea) => idea.source === "seed");

  const outDir = path.resolve(process.cwd(), "tmp");
  await mkdir(outDir, { recursive: true });

  const tsvLines: string[] = [];
  tsvLines.push(["id", "category", "title", "summary_en", "details_en"].join("\t"));
  ideas.forEach((idea) => {
    tsvLines.push(
      [
        tsvEscape(idea.id),
        tsvEscape(idea.category),
        tsvEscape(idea.title),
        tsvEscape(idea.summary),
        tsvEscape(idea.details),
      ].join("\t"),
    );
  });

  const csvLines: string[] = [];
  csvLines.push(["id", "category", "title", "summary_en", "details_en"].map(csvEscape).join(","));
  ideas.forEach((idea) => {
    csvLines.push(
      [idea.id, idea.category, idea.title, idea.summary, idea.details].map(csvEscape).join(","),
    );
  });

  const tsvPath = path.join(outDir, "seed_descriptions_en.tsv");
  const csvPath = path.join(outDir, "seed_descriptions_en.csv");
  await writeFile(tsvPath, tsvLines.join("\n"), "utf8");
  await writeFile(csvPath, csvLines.join("\n"), "utf8");

  console.log(`Wrote:\n- ${tsvPath}\n- ${csvPath}\nRows: ${ideas.length}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
