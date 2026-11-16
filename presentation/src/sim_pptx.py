#!/usr/bin/env python3
"""Приблизительная визуализация PPTX без LibreOffice: берём подложку и рисуем
текст тем же шрифтом Golos в тех же координатах/кеглях, что записаны в pptx.
Это не рендер PowerPoint, но ловит съехавшие блоки и обрезанный текст."""
import sys, json, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parents[1]
SC = 1.5
FONTS = {
    (False, "Golos"): "GolosText-Regular.ttf",
    (True, "Golos"): "GolosText-Bold.ttf",
}

def build(page_idx):
    log = json.loads((ROOT / "build" / "textlog.json").read_text(encoding="utf-8"))
    items = log[page_idx]["items"]
    bg = Image.open(ROOT / "build" / "pptx" / f"bg{page_idx+1:02d}.png").convert("RGB")
    bg = bg.resize((int(1280 * SC), int(720 * SC)), Image.LANCZOS)
    d = ImageDraw.Draw(bg)
    for it in items:
        col = it.get("color") or "#F5F0E7"
        fname = "GolosText-Bold.ttf" if it.get("bold") else "GolosText-Regular.ttf"
        f = ImageFont.truetype(str(ROOT / "fonts" / fname), int(round(it["size"] * 0.75 * 1.333 * SC)))
        x, y = it["x"] * SC, it["y"] * SC
        for k, line in enumerate(str(it["text"]).split("\n")):
            # выравнивание как в pptx: right → по правому краю бокса
            xx = x
            if it.get("align") == "right":
                w = d.textlength(line, font=f)
                xx = (it["x"] + it["w"]) * SC - w
            d.text((xx, y + k * it["leading"] * SC), line, font=f, fill=col)
    out = ROOT / "preview" / f"sim{page_idx+1:02d}.jpg"
    bg.save(out, quality=86, optimize=True)
    return out

if __name__ == "__main__":
    for i in (0, 1, 2, 6, 7, 11, 15, 16):
        print(build(i))
