import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The entry: exactly one word describing the boss. "Hoverer" — the boss
// who hovers over your shoulder while you work. Funny on its own, true of
// a habit every worker has met, fresh (not the first word anyone reaches
// for), and it travels to any kitchen, warehouse or office.
const word = "Hoverer";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, word, "utf8");
process.stdout.write(word + "\n");
