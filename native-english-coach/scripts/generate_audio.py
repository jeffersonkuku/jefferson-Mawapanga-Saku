import asyncio, json, pathlib, hashlib, os, sys
import edge_tts

ROOT = pathlib.Path(__file__).resolve().parents[1]
CORPUS = ROOT / "corpus.json"
AUDIO = ROOT / "audio"
INDEX = ROOT / "audio-index.json"

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

def voice_for(item, idx):
    if item.get("source") == "au" or item.get("category") == "australia":
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

async def main():
    items = json.loads(CORPUS.read_text(encoding="utf-8"))
    AUDIO.mkdir(exist_ok=True)
    index = {}
    sem = asyncio.Semaphore(4)

    async def one(item, idx):
        voice = voice_for(item, idx)
        term = AUDIO / f"{item['id']}-term.mp3"
        example = AUDIO / f"{item['id']}-example.mp3"
        async with sem:
            if not term.exists():
                await synth(item["term"], voice, term, rate="-6%")
            if not example.exists():
                await synth(item["example"], voice, example, rate="+0%")
        index[item["id"]] = {
            "voice": voice,
            "term": f"./audio/{term.name}",
            "example": f"./audio/{example.name}",
            "locale": voice[:5]
        }
        print(f"{idx+1}/{len(items)} {item['id']} {voice}", flush=True)

    await asyncio.gather(*(one(item, idx) for idx, item in enumerate(items)))
    INDEX.write_text(json.dumps(index, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Generated {len(index)} items / {len(index)*2} MP3 files")

if __name__ == "__main__":
    asyncio.run(main())
