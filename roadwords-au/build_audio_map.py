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
session.headers["User-Agent"] = "RoadWordsAU/1.0 educational app (GitHub build)"

def get_json(params, attempts=10):
    delay = 2
    for _ in range(attempts):
        r = session.get(API, params=params, timeout=60)
        if r.status_code == 429:
            wait = int(r.headers.get("Retry-After") or delay)
            print(f"429; sleeping {wait}s", flush=True)
            time.sleep(wait)
            delay = min(delay * 2, 30)
            continue
        r.raise_for_status()
        return r.json()
    raise RuntimeError("Commons rate limit did not clear")

def filename_to_word(title):
    name = title.split(":", 1)[-1]
    mm = re.match(r"(?i)^en-au-(.+?)\.(ogg|oga|wav|mp3)$", name)
    if not mm:
        return None
    return mm.group(1).replace("_", " ").strip().lower()

def plain(value):
    return re.sub(r"<[^>]+>", "", value or "").strip()

def choose_audio(info):
    for d in info.get("derivatives") or []:
        t = str(d.get("type") or "").lower()
        src = d.get("src") or d.get("url")
        if src and ("mpeg" in t or "mp3" in t or src.lower().endswith(".mp3")):
            return src
    return info.get("url")

# Phase 1: scan category TITLES only. This is cheap and avoids thousands of videoinfo calls.
matched_titles = {}
cmcontinue = None
scanned = 0
while True:
    params = {
        "action":"query",
        "format":"json",
        "list":"categorymembers",
        "cmtitle":CATEGORY,
        "cmtype":"file",
        "cmlimit":"500",
    }
    if cmcontinue:
        params["cmcontinue"] = cmcontinue
    data = get_json(params)
    members = data.get("query",{}).get("categorymembers",[])
    scanned += len(members)
    for item in members:
        title = item.get("title","")
        key = filename_to_word(title)
        if key and key in wanted and key not in matched_titles:
            matched_titles[key] = title
    print(f"category scanned={scanned}; vocabulary filename matches={len(matched_titles)}", flush=True)
    cont = data.get("continue")
    if not cont:
        break
    cmcontinue = cont.get("cmcontinue")
    time.sleep(0.35)

print(f"Resolving metadata for {len(matched_titles)} matched files", flush=True)

# Phase 2: resolve only matching vocabulary files.
title_to_key = {title:key for key,title in matched_titles.items()}
titles = list(title_to_key.keys())
resolved = {}
for start in range(0, len(titles), 40):
    chunk = titles[start:start+40]
    params = {
        "action":"query",
        "format":"json",
        "redirects":"1",
        "prop":"videoinfo",
        "viprop":"url|derivatives|extmetadata",
        "titles":"|".join(chunk),
    }
    data = get_json(params)
    pages = data.get("query",{}).get("pages",{})
    for p in pages.values():
        title = p.get("title","")
        key = title_to_key.get(title)
        if not key:
            # Redirect/canonical title can differ in case; recover by filename.
            key = filename_to_word(title)
        if not key or key not in wanted:
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
            "id":w["id"],
            "rank":w["rank"],
            "en":w["en"],
            "fr":w["fr"],
            "audio":audio,
            "source":info.get("descriptionurl") or ("https://commons.wikimedia.org/wiki/" + title.replace(" ","_")),
            "author":plain(meta.get("Artist",{}).get("value") or meta.get("Credit",{}).get("value")) or "Wikimedia Commons",
            "license":plain(meta.get("LicenseShortName",{}).get("value")) or "Wikimedia Commons",
        }
    print(f"metadata {min(start+40,len(titles))}/{len(titles)}; resolved={len(resolved)}", flush=True)
    time.sleep(0.5)

records = sorted(resolved.values(), key=lambda x:x["rank"])
OUT.write_text(json.dumps(records, ensure_ascii=False, separators=(",",":")), encoding="utf-8")
print(f"WROTE {len(records)} VERIFIED AUSTRALIAN HUMAN RECORDINGS", flush=True)
if len(records) < 100:
    raise SystemExit(f"Too few verified recordings: {len(records)}")
