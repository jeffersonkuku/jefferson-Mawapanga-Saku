#!/usr/bin/env python3
"""Correct only the visual labels in the ticketing portfolio PNG screenshots.

Idempotent SHA guards ensure we do not overwrite updated or unexpected images.
Keep native image dimensions and do not modify other projects or application code.
"""
from __future__ import annotations

import hashlib
import io
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ASSETS = Path(__file__).resolve().parents[1] / "assets"
EXPECTED = {
    "01-home_4K.png": "b775713cee91d80249684a5e2b6db8bd137f26b5",
    "02-profile_4K.png": "75a447e8eb19eb85a11d74b19a746598b9e8150a",
    "03-statistics_4K.png": "6f00d755c01b7993269b76a894fbc42c6ff8679c",
    "04-my-tickets_4K.png": "f445240b88003cd6957975781ebc7494971aa517",
    "05-service-tickets_4K.png": "4f3db30ace67f664e30435798624da726401c3e5",
    "06-create-ticket_4K.png": "d225a2f4cbf5f3e0a9148bd77b40bbbf6e064031",
    "07-team-management_4K.png": "63e2c93b6e8683337ce4761f226a51a3c3a44fec",
    "08-settings_4K.png": "258594cfaaf0692bfaad072d740cb08075e4e3cf",
    "09-access-management_4K.png": "1c989c245f4339deac41db9d39d200c308b4309c",
    "10-delegations_4K.png": "4c6c80221ca955b6d19e375331c176d2ca38b7a5",
    "11-admin-journal_4K.png": "bda7b375dcc60616e32be05c26533436289d1370",
    "12-ticket-detail_4K.png": "250fd68862b8252ad14c329836ad62ad9f724e58",
    "13-outlook-archive_4K.png": "6f119738c9ab9e4774be35c0c0e1bddd06d78b66",
}
REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
NAME = "JEFFERSON MAWAPANGA SAKU"
ROLE = "Administrateur principal"


def git_sha(data: bytes) -> str:
    return hashlib.sha1(("blob %d\\0" % len(data)).encode("ascii") + data).hexdigest()


def has_sidebar(image: Image.Image) -> bool:
    w, h = image.size
    if w < 1200 or h < 600:
        return False
    return all(max(image.getpixel((x, h - 21))[:3]) < 65 for x in (210, 245, 266))


def correct(image: Image.Image, filename: str) -> Image.Image:
    w, h = image.size
    edited = image.copy()
    d = ImageDraw.Draw(edited)
    # The left footer is 286px wide. Keep the avatar at x < 61.
    d.rectangle((61, h - 82, 278, h - 9), fill=(23, 23, 23))
    name_font = ImageFont.truetype(REG, 13)
    assert d.textlength(NAME, font=name_font) < 207, "The name must fit on one line"
    d.text((66, h - 55), NAME, font=name_font,
           fill=(255, 255, 255), anchor="lt")
    d.text((66, h - 33), ROLE, font=ImageFont.truetype(REG, 12),
           fill=(221, 227, 236), anchor="lt")
    if filename == "01-home_4K.png":
        # The subtitle beneath the heading begins below this exact region.
        d.rectangle((315, 25, 770, 76), fill=(245, 247, 250))
        d.text((323, 29), "Bonjour Jefferson",
               font=ImageFont.truetype(BOLD, 37),
               fill=(23, 23, 23), anchor="lt")
    return edited


def main() -> None:
    fixed = []
    skipped = []
    for filename, expected in EXPECTED.items():
        path = ASSETS / filename
        data = path.read_bytes()
        sha = git_sha(data)
        if sha != expected:
            print(f"SKIP changed or already corrected: {filename} SHA={sha}")
            skipped.append(filename)
            continue
        with Image.open(io.BytesIO(data)) as image:
            image.load()
            if not has_sidebar(image):
                print(f"NO SIDEBAR: {filename} (preserved)")
                skipped.append(filename)
                continue
            revised = correct(image, filename)
            assert revised.size == image.size
            assert revised.mode == image.mode
            revised.save(path, format="PNG", optimize=True)
            fixed.append(filename)
            print(f"FIXED {filename} {image.width}x{image.height}")
    print(f"SUMMARY: corrected={len(fixed)} skipped={len(skipped)}")
    assert fixed or skipped, "No screenshot checked"


if __name__ == "__main__":
    main()
