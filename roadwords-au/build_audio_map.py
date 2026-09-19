#!/usr/bin/env python3
import json, re, time
from pathlib import Path
import requests

HTML = Path("roadwords-au/index.html")
OUT = Path("roadwords-au/audio-map.json")
API = "https://commons.wikimedia.org/w/api.php"
CATEGORY = "Category:Australian English pronunciation"

html = HTML.read_text(encoding="utf-8")
m = re.search(r'window\.__ROADWORDS_WORDS__=(\[[\s\S]*?\]);</script>', html)
if not m:
    raise SystemExit("word list not found")
words = json.loads(m.group(1))
wanted = {str(w["en"]).lower(): w for w in words}

session = requests.Session()
session.headers["User-Agent"] = "RoadWordsAU/1.0 (educational vocabulary app; GitHub build)"

def get_json(params, attempts=8):
    delay = 2
    for attempt in range(attempts):
        r = session.get(API, params=params, timeout=60)
        if r.status_code == 429:
            wait = int(r.headers.get("Retry-After") or delay)
            print(f"429 from Commons; sleeping {wait}s", flush=True)
            time.sleep(wait)
            delay = min(delay * 2, 30)
            continue
        r.raise_for_status()
        return r.json()
    raise RuntimeError("Commons rate limit did not clear")

def plain(value):
    return re.sub(r"<[^>]+>", "", value or "").strip()

def filename_to_word(title):
    # Category files are commonly File:En-au-word.ogg
    name = title.split(":", 1)[-1]
    mm = re.match(r"(?i)^en-au-(.+?)\.(ogg|oga|wav|mp3)$", name)
    if not mm:
        return None
    return mm.group(1).replace("_", " ").strip().lower()

def choose_audio(info):
    derivatives = info.get("derivatives") or []
    for d in derivatives:
        t = str(d.get("type") or "").lower()
        src = d.get("src") or d.get("url")
        if src and ("mpeg" in t or "mp3" in t or src.lower().endswith(".mp3")):
            return src
    # Keep original as a fallback only when Commons has no MP3 transcode.
    return info.get("url")

resolved = {}
cont = {}
page_count = 0
request_count = 0

while True:
    params = {
        "action": "query",
        "format": "json",
        "generator": "categorymembers",
        "gcmtitle": CATEGORY,
        "gcmtype": "file",
        "gcmlimit": "200",
        "prop": "videoinfo",
        "viprop": "url|derivatives|extmetadata",
    }
    params.update(cont)
    data = get_json(params)
    request_count += 1
    pages = data.get("query", {}).get("pages", {})
    page_count += len(pages)

    for p in pages.values():
        title = p.get("title", "")
        key = filename_to_word(title)
        if not key or key not in wanted or key in resolved:
            continue
        info = (p.get("videoinfo") or [None])[0]
        if not info:
            continue
        audio = choose_audio(info)
        if not audio:
            continue
        meta = info.get("extmetadata") or {}
        w = wanted[key]
        resolved[key] = {
            "id": w["id"],
            "rank": w["rank"],
            "en": w["en"],
            "fr": w["fr"],
            "audio": audio,
            "source": info.get("descriptionurl") or ("https://commons.wikimedia.org/wiki/" + title.replace(" ", "_")),
            "author": plain(meta.get("Artist", {}).get("value") or meta.get("Credit", {}).get("value")) or "Wikimedia Commons",
            "license": plain(meta.get("LicenseShortName", {}).get("value")) or "Wikimedia Commons",
        }

    print(f"Commons files scanned: {page_count}; matched vocabulary: {len(resolved)}", flush=True)

    if "continue" not in data:
        break
    cont = data["continue"]
    time.sleep(1.0)

records = sorted(resolved.values(), key=lambda x: x["rank"])
OUT.write_text(json.dumps(records, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
print(f"WROTE {len(records)} VERIFIED HUMAN AUSTRALIAN RECORDINGS", flush=True)

# We can launch the rebuilt app with a smaller verified corpus and expand later.
# Failing under 100 means the category matching approach is not viable.
if len(records) < 100:
    raise SystemExit(f"Too few verified recordings: {len(records)}")
