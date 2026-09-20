# RoadWords AU

Audio-first English vocabulary trainer for iPhone, rebuilt as an adaptation of
the open-source **Motamot** project rather than as a custom one-off prototype.

## What changed

The previous RoadWords implementation was removed completely. This version keeps
Motamot's proven mobile/PWA + Leitner architecture and adapts the learning loop:

1. Build a due/new-card pool using Leitner spaced repetition.
2. Resolve only a **real Australian pronunciation recording** for each English word.
3. Skip cards that do not have a resolvable Australian recording.
4. User taps once to start the first audio on iPhone.
5. Play the English word.
6. Wait 5 seconds by default.
7. Reveal English + French.
8. Replay the exact same human recording 3 times.
9. Ask for **Oui / Non** by voice when browser speech recognition is available,
   with large touch buttons as fallback.
10. Save progress locally in IndexedDB.

## Australian human audio

No English browser TTS is used for the target words.

RoadWords first looks for the conventional Wikimedia Commons title
`En-au-<word>.ogg`. If that title does not exist, it asks Simple Wiktionary and
English Wiktionary for an English audio template explicitly tagged AU/Australia,
then resolves the actual audio/transcode through the Wikimedia Commons API.

Successful and missing lookups are cached locally. Audio files already played can
also be cached by the PWA service worker.

## Vocabulary

`public/words-3000.json` contains the 3000 English/French study entries. The
session engine introduces only cards for which a real Australian recording can
be resolved.

## Development

```bash
npm install
npm test
npm run dev
npm run build
```

The production build is written to `dist/`.

## Upstream

RoadWords AU is based on **JulianGama/Motamot**, MIT licensed.
See [UPSTREAM.md](./UPSTREAM.md) and [LICENSE](./LICENSE).
