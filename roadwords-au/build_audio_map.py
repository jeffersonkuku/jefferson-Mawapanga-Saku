#!/usr/bin/env python3
import json, re
from pathlib import Path

APP = Path("roadwords-au/index.html")
VT = Path("/tmp/vowel_trowel")
OUT = Path("roadwords-au/audio-map.json")

html = APP.read_text(encoding="utf-8")
m = re.search(r'window\.__ROADWORDS_WORDS__=(\[[\s\S]*?\]);</script>', html)
if not m:
    raise SystemExit("Embedded 3000-word list not found")
words = json.loads(m.group(1))
by_word = {str(w["en"]).strip().lower(): w for w in words}

base = VT / "public/audio/en-gb/approved"
if not base.exists():
    raise SystemExit("vowel_trowel approved audio directory missing")

records = []
for key, w in by_word.items():
    folder = base / key
    if not folder.is_dir():
        continue

    candidates = []
    for meta_path in folder.glob("En-au-*.ogg.metadata.json"):
        try:
            meta = json.loads(meta_path.read_text(encoding="utf-8"))
        except Exception:
            continue
        # Metadata schema varies slightly; flatten searchable text.
        blob = json.dumps(meta, ensure_ascii=False).lower()
        if "australian accent" not in blob and "australian" not in blob:
            continue
        audio_name = meta_path.name[:-len(".metadata.json")]
        audio_path = folder / audio_name
        if not audio_path.exists() or audio_path.stat().st_size < 1000:
            continue
        # Prefer the original En-au-word.ogg over cleaned derivatives.
        score = 0 if audio_name.lower() == f"en-au-{key}.ogg" else 1
        candidates.append((score, audio_path, meta))

    if not candidates:
        continue
    candidates.sort(key=lambda x: x[0])
    _, audio_path, meta = candidates[0]
    rel = audio_path.relative_to(VT).as_posix()
    raw = "https://raw.githubusercontent.com/bovine3dom/vowel_trowel/master/" + rel
    source = "https://github.com/bovine3dom/vowel_trowel/blob/master/" + rel

    # Best-effort human attribution from metadata.
    def deep_find(obj, wanted):
        if isinstance(obj, dict):
            for k,v in obj.items():
                if k.lower() in wanted and isinstance(v,(str,int,float)):
                    return str(v)
                found = deep_find(v, wanted)
                if found: return found
        elif isinstance(obj, list):
            for v in obj:
                found = deep_find(v, wanted)
                if found: return found
        return ""

    author = deep_find(meta, {"artist","speaker","user","username","credit"}) or "Australian speaker"
    license_name = deep_find(meta, {"license","licence","licenseshortname"}) or "See source"

    records.append({
        "id":w["id"],"rank":w["rank"],"en":w["en"],"fr":w["fr"],
        "audio":raw,"source":source,"author":author,"license":license_name
    })

records.sort(key=lambda x:x["rank"])
OUT.write_text(json.dumps(records, ensure_ascii=False, separators=(",",":")), encoding="utf-8")
print(f"VERIFIED_AU_AUDIO_COUNT={len(records)}")
print("FIRST_20=" + ",".join(x["en"] for x in records[:20]))
if len(records) < 100:
    raise SystemExit(f"Only {len(records)} verified Australian recordings; expected >=100")
