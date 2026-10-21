# RoadWords AU

[← Main portfolio](../README.md) · [Français](./README_FR.md)

> **A mobile vocabulary trainer designed around hearing a real Australian pronunciation, then recalling the meaning.**

## Understand it in 20 seconds

\`\`\`mermaid
flowchart LR
    A[Show a due/new word] --> B[Play Australian recording]
    B --> C[Wait]
    C --> D[Reveal English + French]
    D --> E[Replay]
    E --> F[Known / not known]
    F --> G[Schedule the next review]
\`\`\`

## Why I built it

The goal is to make vocabulary practice closer to **real listening** instead of reading a list of translations.

The app tries to use a real Australian-English recording for the target word. If no suitable recording can be resolved, the card is skipped rather than pretending the pronunciation is available.

## What it does

- spaced repetition;
- Australian-pronunciation lookup;
- audio-first learning;
- English + French reveal;
- repeated listening;
- simple known / not-known answer;
- local progress on the device.

<details>
<summary><strong>Technical details</strong></summary>

RoadWords AU is an adaptation of the open-source **Motamot** project and keeps its mobile/PWA + Leitner foundation. It uses Wikimedia Commons / Wiktionary sources to resolve Australian-tagged recordings when available, caches lookups locally and stores learning progress in IndexedDB.

See [UPSTREAM.md](./UPSTREAM.md) for the original project and licence information.

</details>
