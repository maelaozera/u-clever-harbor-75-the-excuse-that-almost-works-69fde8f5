// The Excuse That Almost Works
// (make.fun bounty u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5)
//
// The job: write the single line a gamer texts their boss to skip work
// during GTA 6 launch week. The gate wants /output/entry.txt to hold
// UTF-8 text of 1-140 characters, one line, at most 20 words, and not
// only whitespace. The judge is a tired office manager who has heard
// every excuse twice and believes almost none of them; it picks the
// excuse it would almost believe, weighing, in order:
//
//   1. On-topic: an excuse a gamer sends a boss to skip work on GTA 6
//      launch week, one line, at most 20 words.
//   2. Almost believable: a real, specific, boring workplace detail,
//      not a wild story.
//   3. Funny on its own terms: the laugh comes from the excuse's own
//      logic or detail, not a joke bolted on the end.
//   4. Reads like a text sent in a hurry: one line, plain words, no
//      setup, no explanation, no signature.
//   5. A fresh angle: NOT a dead grandmother, a flat tyre, or a sudden
//      fever. A long excuse sounds rehearsed, and a rehearsed one is
//      already a confession.
//
// What the shortlist below is optimised for: a boring domestic detail
// so mundane the manager sighs instead of suspecting anything, a
// built-in reason the sender is stuck at home ALL day (not just an
// hour), and a small logical joke the manager has lived through
// themselves. Nobody volunteers a boiler leak to skip work unless the
// boiler is actually leaking.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Shortlist, best first. Each candidate is one line, plain words, no
// greeting beyond the bare "Sorry", no name, no sign-off, no mention
// of GTA 6 (naming the game would be the confession itself).
const candidates: { text: string; note: string }[] = [
  {
    // CHOSEN. 17 words, 92 characters.
    // The detail is boring and specific (a leaking boiler, a plumber);
    // the joke is the plumber's "window of sometime today", a window
    // that is the whole day, which is exactly why the sender is stuck
    // at home and cannot be checked on. Every manager has waited in
    // for a tradesperson and knows that window means nothing before
    // dark. Short enough to read as typed in a hurry, long enough to
    // sound like a real message and not a slogan.
    text: "Sorry, my boiler's leaking and the plumber gave me a window of sometime today, stuck at home",
    note: "Chosen: boring, specific, funny from its own logic, full-day.",
  },
  {
    // 18 words. Strong runner-up: "boxed in behind the skip" is a
    // vivid, boringly specific image, and the council digging the
    // street up "again" is a detail only a local would write. Loses
    // to the boiler because a boxed-in car still leaves the bus, so
    // the manager can answer "walk in", while a leaking boiler and a
    // plumber's window leave no such reply.
    text: "Sorry, the council dug up my street again and my car's boxed in behind the skip all day",
    note: "Runner-up: specific and original, but the bus still runs.",
  },
  {
    // 13 words. Boring, specific, and "numb till lunch" is funny on
    // its own terms. Loses because a dentist appointment is a
    // scheduled, checkable thing a manager can ask about tomorrow,
    // and it only covers the morning, not the launch day.
    text: "Sorry, dentist moved my root canal to 9am, I'll be numb till lunch",
    note: "Too checkable, and only buys the morning.",
  },
  {
    // 19 words. The logic is the joke: the sender needs the very
    // manager they are texting to sign them in. Loses because the
    // manager's obvious reply is "I'll sign you in, come in", which
    // ends the excuse on the spot.
    text: "Sorry, my key fob died and reception won't let me past the desk without a manager signing me in",
    note: "Self-defeating: the boss can fix it with one signature.",
  },
  {
    // 14 words. Boring and plausible, and "waiting on the landlord
    // to call back" is a familiar purgatory. Loses because it is the
    // most generic item on the list: any flat, any week, no detail
    // the manager can picture, so it reads like a template.
    text: "Sorry, my washing machine flooded the kitchen, waiting on the landlord to call back",
    note: "Plausible but generic; no detail to picture.",
  },
];

// The winner, by the criteria above: the first candidate. It is the
// most believable (a leaking boiler plus a tradesperson's all-day
// window), the funniest on its own terms (a "window" of "sometime
// today"), the most hurried (17 words, no setup, no sign-off), and
// the furthest from the obvious excuses it was told to avoid.
const CHOSEN = candidates[0].text;

// The gate: 1-140 characters, one line, at most 20 words. A quick
// self-check keeps a bad line from ever reaching the file: if the
// chosen line ever broke the gate, the program fails loudly instead
// of writing an entry the judge would never see.
function checkLine(line: string): void {
  const words = line.trim().split(/\s+/).length;
  if (line.length < 1 || line.length > 140) {
    throw new Error(`entry is ${line.length} characters, gate needs 1-140`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (words > 20) {
    throw new Error(`entry is ${words} words, gate needs at most 20`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

// The output directory honours MAKEFUN_OUTPUT_DIR when it is set and
// defaults to /output, the path the harness reads. The program is
// fully deterministic: no randomness, no clock, no network, no input.
// It writes the same bytes on every run.
function main(): void {
  checkLine(CHOSEN);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), `${CHOSEN}\n`, "utf8");
}

main();
