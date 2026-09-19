#!/usr/bin/env python3
import json, re, time, sys
from pathlib import Path
import requests

HTML = Path("roadwords-au/index.html")
OUT = Path("roadwords-au/audio-map.json")
API = "https://commons.wikimedia.org/w/api.php"

html = HTML.read_text(encoding="utf-8")
m = re.search(r'window\.__ROADWORDS_WORDS__=(\[[\s\S]*?\]);</script>', html)
if not m:
    raise SystemExit("word list not found")
words = json.loads(m.group(1))

session = requests.Session()
session.headers["User-Agent"] = "RoadWordsAU/1.0 (GitHub QA build)"

def choose_mp3(info):
    for d in info.get("derivatives") or []:
        t = (d.get("type") or "").lower()
        src = d.get("src") or d.get("url")
        if src and ("mpeg" in t or "mp3" in t or src.lower().endswith(".mp3")):
            return src
    return None

resolved = []
batch_size = 25
for start in range(0, len(words), batch_size):
    batch = words[start:start+batch_size]
    titles = [f"File:En-au-{w['en'].replace('_',' ')}.ogg" for w in batch]
    params = {
        "action":"query",
        "format":"json",
        "redirects":"1",
        "prop":"videoinfo",
        "viprop":"url|derivatives|extmetadata",
        "titles":"|".join(titles),
    }
    r = session.get(API, params=params, timeout=40)
    r.raise_for_status()
    data = r.json()
    pages = data.get("query",{}).get("pages",{})
    by_title = {p.get("title","").lower(): p for p in pages.values()}
    for w,title in zip(batch,titles):
        p = by_title.get(title.lower())
        if not p or "missing" in p:
            continue
        vi = (p.get("videoinfo") or [None])[0]
        if not vi:
            continue
        mp3 = choose_mp3(vi)
        if not mp3:
            continue
        meta = vi.get("extmetadata") or {}
        def val(k):
            v = meta.get(k,{}).get("value","")
            return re.sub(r"<[^>]+>","",v).strip()
        resolved.append({
            "id": w["id"],
            "rank": w["rank"],
            "en": w["en"],
            "fr": w["fr"],
            "audio": mp3,
            "source": vi.get("descriptionurl") or ("https://commons.wikimedia.org/wiki/" + title.replace(" ","_")),
            "author": val("Artist") or val("Credit") or "Wikimedia Commons",
            "license": val("LicenseShortName") or "Wikimedia Commons"
        })
    print(f"{min(start+batch_size,len(words))}/{len(words)} -> {len(resolved)} audios", flush=True)
    time.sleep(0.08)

OUT.write_text(json.dumps(resolved, ensure_ascii=False, separators=(",",":")), encoding="utf-8")
print(f"WROTE {len(resolved)} verified Australian audio records to {OUT}")
if len(resolved) < 1000:
    raise SystemExit(f"Too few verified recordings: {len(resolved)}")
