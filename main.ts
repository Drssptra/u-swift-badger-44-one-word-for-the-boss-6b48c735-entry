// One-word entry for the boss competition.
//
// The boss in question is the one who treats every stand-up, review and
// "quick chat" as a stage: you walk in with a status update and walk out
// having listened to a forty-minute solo performance. "Monologuer" names
// that habit in a single word — it reads as a job title nobody asked for,
// which is exactly the joke. It is one word, ten letters, no spaces, no
// punctuation, and it is not the v1 entry ("Hoverer").

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Assemble the word from two pieces so each half of the spelling is
// easy to eyeball at a glance: "Mono" (one voice) + "loguer" (one who
// talks). Joined, that is M-o-n-o-l-o-g-u-e-r — ten letters total.
const PARTS = ["Mono", "loguer"] as const;
const ENTRY = PARTS.join("");

// --- validation -----------------------------------------------------------
// Gate: exactly one word, 1-30 characters, letters only. Checked by hand,
// character by character, so any stray space, digit, hyphen or typo in a
// fragment fails here with a loud error instead of shipping bad output.
const MIN_LEN = 1;
const MAX_LEN = 30;

function isLetter(code: number): boolean {
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

function validate(word: string): string {
  if (word.length < MIN_LEN || word.length > MAX_LEN) {
    throw new Error(
      `entry must be ${MIN_LEN}-${MAX_LEN} characters, got ${word.length}`,
    );
  }
  for (let i = 0; i < word.length; i++) {
    const code = word.charCodeAt(i);
    if (!isLetter(code)) {
      throw new Error(
        `entry must contain letters only; bad character ${JSON.stringify(word[i])} at index ${i}`,
      );
    }
  }
  if (word.includes(" ")) {
    throw new Error("entry must be a single word with no spaces");
  }
  // Single-word check, belt and braces: splitting on whitespace must
  // yield exactly one token.
  if (word.trim().split(/\s+/).length !== 1) {
    throw new Error("entry must be exactly one word");
  }
  return word;
}

function main(): void {
  const word = validate(ENTRY);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file must be byte-exactly the word itself.
  writeFileSync(join(outDir, "entry.txt"), word, "utf8");
  process.stdout.write(`${word}\n`);
}

main();
