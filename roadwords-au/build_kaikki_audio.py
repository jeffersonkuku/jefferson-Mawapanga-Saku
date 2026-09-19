#!/usr/bin/env python3
import json, re, time
from pathlib import Path
from urllib.parse import quote
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests

APP=Path("roadwords-au/index.html")
OUT=Path("roadwords-au/audio-map.json")
html=APP.read_text(encoding="utf-8")
m=re.search(r'window\.__ROADWORDS_WORDS__=(\[[\s\S]*?\]);</script>',html)
if not m: raise SystemExit("word list missing")
words=json.loads(m.group(1))

UA={"User-Agent":"RoadWordsAU/1.0 educational app"}

def page_url(word):
    w=word.lower()
    a=quote(w[0],safe="")
    b=quote(w[:2],safe="")
    return f"https://kaikki.org/dictionary/English/meaning/{a}/{b}/{quote(w,safe='')}.html"

PATTERNS=[
    re.compile(r'"audio"\s*:\s*"([^"]+)"\s*,\s*"mp3_url"\s*:\s*"([^"]+)"[\s\S]{0,500}?"tags"\s*:\s*\[([\s\S]{0,250}?)\]',re.I),
    re.compile(r'"mp3_url"\s*:\s*"([^"]+)"[\s\S]{0,500}?"tags"\s*:\s*\[([\s\S]{0,250}?)\]',re.I)
]

def fetch_one(w):
    url=page_url(w["en"])
    for attempt in range(3):
        try:
            r=requests.get(url,headers=UA,timeout=20)
            if r.status_code==404: return None
            if r.status_code==429:
                time.sleep(2+attempt*3); continue
            r.raise_for_status()
            t=r.text
            # Prefer pattern preserving audio filename.
            for mm in PATTERNS[0].finditer(t):
                tags=mm.group(3)
                if "Australia" in tags or "Australian" in tags:
                    return {**w,"audio":mm.group(2).replace("\\/","/"),"source":url,
                            "author":"Wiktionary / Wikimedia Commons","license":"See source"}
            for mm in PATTERNS[1].finditer(t):
                tags=mm.group(2)
                if "Australia" in tags or "Australian" in tags:
                    return {**w,"audio":mm.group(1).replace("\\/","/"),"source":url,
                            "author":"Wiktionary / Wikimedia Commons","license":"See source"}
            return None
        except Exception:
            if attempt==2: return None
            time.sleep(1+attempt)
    return None

resolved=[]
with ThreadPoolExecutor(max_workers=12) as ex:
    futs={ex.submit(fetch_one,w):w for w in words}
    done=0
    for fut in as_completed(futs):
        done+=1
        item=fut.result()
        if item: resolved.append(item)
        if done%100==0:
            print(f"checked={done}/{len(words)} australian_audio={len(resolved)}",flush=True)

resolved.sort(key=lambda x:x["rank"])
OUT.write_text(json.dumps(resolved,ensure_ascii=False,separators=(",",":")),encoding="utf-8")
print("VERIFIED_AU_AUDIO_COUNT="+str(len(resolved)))
print("FIRST="+",".join(x["en"] for x in resolved[:40]))
if len(resolved)<100:
    raise SystemExit(f"Coverage too low: {len(resolved)}")
