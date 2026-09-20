# Upstream / attribution

RoadWords AU is a specialised adaptation inspired by and partially derived from:

**Motamot** — JulianGama/Motamot  
https://github.com/JulianGama/Motamot  
MIT License — Copyright (c) 2026 JulianGama

The following architectural ideas and code patterns were adapted from Motamot:

- Vite + React + TypeScript PWA structure
- offline-first mobile application model
- IndexedDB persistence
- Leitner box transitions
- due/new/filler session ordering
- session preparation that skips cards whose required media cannot be resolved
- iPhone/PWA update strategy

RoadWords AU replaces Motamot's image/Pixabay learning loop with an audio-first
English/French loop. English target audio is resolved from Australian-accent
recordings referenced by Wiktionary and hosted on Wikimedia Commons.

Audio files are not bundled as RoadWords source code. Each recording remains
subject to the licence shown on its Wikimedia Commons file page; the app keeps
and displays the original source URL and licence metadata.
