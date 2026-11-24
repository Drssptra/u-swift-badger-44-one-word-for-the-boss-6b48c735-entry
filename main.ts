import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The entry: exactly one word describing the boss. "Hoverer" — the boss
// who hovers over your shoulder while you work. Funny on its own, true of
// a habit every worker has met, fresh (not the first word anyone reaches
// for), and it travels to any kitchen, warehouse or office.
const word = "Hoverer";

// Guard: the entry must be a real, non-empty word — never write an empty
// or whitespace-only entry file, which would read as a missing submission.
if (!word.trim()) {
  console.error("entry word is empty");
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, word, "utf8");
process.stdout.write(word + "\n");
