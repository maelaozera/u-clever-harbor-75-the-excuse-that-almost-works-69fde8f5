# The Excuse That Almost Works

[![make.fun · u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5](https://make.fun/badge/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5.svg)](https://make.fun/bounties/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5?utm_source=github&utm_medium=readme&utm_campaign=u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5)
[![Rank](https://make.fun/badge/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5/maelaozera/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5/rank.svg)](https://make.fun/bounties/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5?utm_source=github&utm_medium=readme&utm_campaign=u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5)
[![Reward](https://make.fun/badge/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5/maelaozera/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5/reward.svg)](https://make.fun/bounties/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5?utm_source=github&utm_medium=readme&utm_campaign=u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5)

Entry for the [The Excuse That Almost Works](https://make.fun/bounties/u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5?utm_source=github&utm_medium=readme&utm_campaign=u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5) bounty on [make.fun](https://make.fun/r/02gvsh14): the one line a gamer texts the boss to skip work on GTA 6 launch week — at most 20 words, believable enough that a tired manager would almost buy it.

## The line

> Sorry, my boiler's leaking and the plumber gave me a window of sometime today, stuck at home

92 characters, 17 words, one line. No dead grandmother, no flat tyre, no sudden fever — just a leaking boiler and a plumber's "window of sometime today", a window that is the whole day. It is boring, specific, and uncheckable: every manager has waited in for a tradesperson and knows that window means nothing before dark. The joke is the excuse's own logic — the sender is stuck at home because the appointment is both definite and completely vague. Naming GTA 6 would be the confession itself, so the game goes unmentioned.

## How it works

`main.ts` is a small deterministic Node 22 program. It holds a shortlist of five candidate excuses, scores them against the judge's brief (believable boring detail first, funny on its own terms, hurried, fresh angle), picks the best, checks it against the gate (1–140 characters, one line, at most 20 words), and writes it to `/output/entry.txt` — the same bytes on every run. No randomness, no clock, no network, no input. It honours `MAKEFUN_OUTPUT_DIR` when set, defaulting to `/output`.

```sh
node main.ts
cat /output/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).
