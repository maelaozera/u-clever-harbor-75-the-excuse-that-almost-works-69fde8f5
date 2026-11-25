// The Excuse That Almost Works — entry writer, restructured.
//
// One line a gamer texts their boss to skip work during GTA 6 launch
// week. The harness gate: /output/entry.txt, UTF-8, a single line of
// 1-140 characters and at most 20 words, not blank. The judge is a
// weary office manager picking the excuse it would almost believe:
// on-topic, almost believable thanks to a dull specific detail, funny
// through its own logic, and reading like a hurried text.
//
// Picked line: a leaking boiler plus a plumber's all-day "window of
// sometime today". The window is the whole day, so the sender is
// stuck at home with no reply the manager can give — every manager
// has waited in for a tradesperson and knows that window means
// nothing before dark. Seventeen words, ninety-two characters, no
// greeting beyond "Sorry", no name, no sign-off, no mention of the
// game: naming it would be the confession itself.

import fs from "node:fs";

// Gate limits from the competition harness.
const GATE = {
  minChars: 1,
  maxChars: 140,
  maxWords: 20,
} as const;

// The chosen line, assembled from phrases so each phrase stands on
// its own. Joined with single spaces it reads exactly:
// "Sorry, my boiler's leaking and the plumber gave me a window of
// sometime today, stuck at home"
const ENTRY_PHRASES = [
  "Sorry,",
  "my boiler's leaking",
  "and the plumber gave me",
  "a window of sometime today,",
  "stuck at home",
] as const;

function buildEntryLine(phrases: readonly string[]): string {
  return phrases.join(" ");
}

const CHOSEN_LINE = buildEntryLine(ENTRY_PHRASES);

// --- Gate checks, one small check per helper. ---

function checkLength(line: string): void {
  if (line.length < GATE.minChars || line.length > GATE.maxChars) {
    throw new Error(
      `entry is ${line.length} characters, gate needs ${GATE.minChars}-${GATE.maxChars}`,
    );
  }
}

function checkSingleLine(line: string): void {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function countWords(line: string): number {
  const trimmed = line.trim();
  if (trimmed.length === 0) return 0;
  return trimmed.split(/\s+/).length;
}

function checkWordCount(line: string): void {
  const words = countWords(line);
  if (words > GATE.maxWords) {
    throw new Error(
      `entry is ${words} words, gate needs at most ${GATE.maxWords}`,
    );
  }
}

function checkNotBlank(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

function checkEntryLine(line: string): void {
  checkLength(line);
  checkSingleLine(line);
  checkWordCount(line);
  checkNotBlank(line);
}

// --- Output. ---

function resolveOutputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function writeEntry(line: string): void {
  checkEntryLine(line);
  const outDir = resolveOutputDir();
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(`${outDir}/entry.txt`, `${line}\n`, "utf8");
}

// Fully deterministic: no randomness, no clock, no network, no input.
// It writes the same bytes on every run.
function main(): void {
  writeEntry(CHOSEN_LINE);
}

main();
