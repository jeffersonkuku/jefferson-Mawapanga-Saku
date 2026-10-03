import asyncio, json, pathlib, hashlib, os, sys, subprocess, tempfile
import edge_tts

ROOT = pathlib.Path(__file__).resolve().parents[1]
CORPUS = ROOT / "corpus.json"
IRREGULAR = ROOT / "irregular-verbs.json"
AUDIO = ROOT / "audio"
INDEX = ROOT / "audio-index.json"
IRREGULAR_COURSE = ROOT / "irregular-course-mobile.m4a"
IRREGULAR_CUES = ROOT / "irregular-course-cues.json"

VOICES_GENERAL = [
    "en-US-AvaNeural",
    "en-US-AndrewNeural",
    "en-GB-SoniaNeural",
    "en-AU-NatashaNeural",
    "en-US-EmmaMultilingualNeural",
    "en-GB-RyanNeural",
    "en-AU-WilliamNeural",
]
VOICES_AU = ["en-AU-NatashaNeural", "en-AU-WilliamNeural"]
VOICES_FR = ["fr-FR-DeniseNeural", "fr-FR-HenriNeural"]

def voice_for(item, idx):
    if item.get("source") in {"au", "irregular-au"} or item.get("category") in {"australia", "irregular"}:
        return VOICES_AU[idx % len(VOICES_AU)]
    return VOICES_GENERAL[idx % len(VOICES_GENERAL)]

async def synth(text, voice, out, rate="+0%"):
    out.parent.mkdir(parents=True, exist_ok=True)
    for attempt in range(4):
        try:
            await edge_tts.Communicate(text=text, voice=voice, rate=rate, volume="+0%", pitch="+0Hz").save(str(out))
            if out.exists() and out.stat().st_size > 1000:
                return
        except Exception as e:
            if attempt == 3:
                raise
            await asyncio.sleep(2 + attempt * 2)

def media_duration(path):
    out = subprocess.check_output([
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        str(path)
    ], text=True).strip()
    return float(out)

def build_irregular_course(irregular_items):
    if not irregular_items:
        return

    ordered = sorted(irregular_items, key=lambda x: (int(x.get("verbNumber", 0)), x["id"]))
    silence = AUDIO / "_silence-2s.mp3"
    if not silence.exists():
        subprocess.run([
            "ffmpeg", "-y", "-v", "error",
            "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono",
            "-t", "2",
            "-c:a", "libmp3lame", "-b:a", "48k",
            str(silence)
        ], check=True)

    silence_dur = media_duration(silence)
    parts = []
    cards = []
    t = 0.0

    for item in ordered:
        term = AUDIO / f"{item['id']}-term.mp3"
        french = AUDIO / f"{item['id']}-fr.mp3"
        example = AUDIO / f"{item['id']}-example.mp3"
        term_dur = media_duration(term)
        french_dur = media_duration(french)
        example_dur = media_duration(example)

        card_start = t
        phases = []

        def add(path, phase, duration, repetition=None):
            nonlocal t
            start = t
            parts.append(path)
            t += duration
            phase_obj = {
                "phase": phase,
                "start": round(start, 3),
                "end": round(t, 3)
            }
            if repetition is not None:
                phase_obj["repetition"] = repetition
            phases.append(phase_obj)

        add(term, "word", term_dur)
        add(silence, "think", silence_dur)
        add(french, "french", french_dur)
        add(term, "repeat", term_dur, 1)
        add(term, "repeat", term_dur, 2)
        add(term, "repeat", term_dur, 3)
        add(example, "example", example_dur)

        cards.append({
            "id": item["id"],
            "verbNumber": item.get("verbNumber"),
            "baseVerb": item.get("baseVerb"),
            "formRole": item.get("formRole"),
            "term": item.get("term"),
            "french": item.get("french"),
            "ipa": item.get("ipa"),
            "example": item.get("example"),
            "exampleIpa": item.get("exampleIpa"),
            "start": round(card_start, 3),
            "end": round(t, 3),
            "phases": phases
        })

    concat_file = ROOT / "_irregular-course-concat.txt"
    concat_file.write_text(
        "\n".join("file '" + str(p.resolve()).replace("'", "'\\''") + "'" for p in parts) + "\n",
        encoding="utf-8"
    )

    # IMPORTANT MOBILE/iPHONE:
    # Do NOT stream-copy concatenated MP3 files. Desktop browsers tolerate the
    # discontinuous MP3 headers/timestamps, but Safari/iOS can stop playback
    # at an early concat boundary (typically right after the French cue).
    # Decode every segment and encode ONE continuous AAC timeline instead.
    subprocess.run([
        "ffmpeg", "-y", "-v", "error",
        "-f", "concat", "-safe", "0", "-i", str(concat_file),
        "-vn",
        "-ac", "1",
        "-ar", "24000",
        "-c:a", "aac",
        "-profile:a", "aac_low",
        "-b:a", "80k",
        "-movflags", "+faststart",
        str(IRREGULAR_COURSE)
    ], check=True)

    actual_duration = media_duration(IRREGULAR_COURSE)
    IRREGULAR_CUES.write_text(json.dumps({
        "version": 2,
        "sequence": "word -> 2s -> french -> word x3 -> example -> next",
        "cards": cards,
        "expectedDuration": round(t, 3),
        "actualDuration": round(actual_duration, 3)
    }, ensure_ascii=False, indent=2), encoding="utf-8")
    concat_file.unlink(missing_ok=True)
    silence.unlink(missing_ok=True)
    print(f"Built irregular course: {len(cards)} cards, {actual_duration/60:.1f} minutes, {IRREGULAR_COURSE.stat().st_size/1024/1024:.1f} MB")

async def main():
    items = json.loads(CORPUS.read_text(encoding="utf-8"))
    irregular_items = []
    if IRREGULAR.exists():
        irregular_items = json.loads(IRREGULAR.read_text(encoding="utf-8"))
        items += irregular_items
    AUDIO.mkdir(exist_ok=True)
    index = {}
    sem = asyncio.Semaphore(4)

    async def one(item, idx):
        voice = voice_for(item, idx)
        french_voice = VOICES_FR[idx % len(VOICES_FR)]
        term = AUDIO / f"{item['id']}-term.mp3"
        example = AUDIO / f"{item['id']}-example.mp3"
        drill = AUDIO / f"{item['id']}-drill.mp3"
        french = AUDIO / f"{item['id']}-fr.mp3"
        async with sem:
            if not term.exists():
                await synth(item["term"], voice, term, rate="-6%")
            if not example.exists():
                await synth(item["example"], voice, example, rate="+0%")
            if not drill.exists():
                drill_text = f"{item['term']}. {item['term']}. {item['term']}."
                await synth(drill_text, voice, drill, rate="-3%")
            if not french.exists():
                await synth(item["french"], french_voice, french, rate="-4%")
        index[item["id"]] = {
            "voice": voice,
            "frenchVoice": french_voice,
            "term": f"./audio/{term.name}",
            "example": f"./audio/{example.name}",
            "drill": f"./audio/{drill.name}",
            "french": f"./audio/{french.name}",
            "locale": voice[:5],
            "frenchLocale": "fr-FR"
        }
        print(f"{idx+1}/{len(items)} {item['id']} {voice}", flush=True)

    await asyncio.gather(*(one(item, idx) for idx, item in enumerate(items)))
    INDEX.write_text(json.dumps(index, indent=2, ensure_ascii=False), encoding="utf-8")
    build_irregular_course(irregular_items)
    print(f"Generated {len(index)} items / {len(index)*4} MP3 files")

if __name__ == "__main__":
    asyncio.run(main())
