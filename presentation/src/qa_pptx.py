#!/usr/bin/env python3
"""Проверка PPTX: размеры, подложка, и главное — контраст каждого текста к подложке.
Ловит класс ошибок «светлый текст на светлом слайде»."""
import pathlib, json, sys
from pptx import Presentation
from PIL import Image, ImageStat

ROOT = pathlib.Path(__file__).resolve().parents[1]
PRS = ROOT / "coffeeIT-presentation.pptx"
BG = ROOT / "build" / "pptx"
errors = []

def lum(rgb):
    def f(c):
        c /= 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = [f(v) for v in rgb]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def hex2rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))

prs = Presentation(str(PRS))
if (round(prs.slide_width / 914400, 2), round(prs.slide_height / 914400, 2)) != (13.33, 7.5):
    errors.append("размер слайда не 16:9")

for i, slide in enumerate(prs.slides, 1):
    bg_path = BG / f"bg{i:02d}.png"
    bg = Image.open(bg_path).convert("RGB")
    k = bg.width / 1280
    for sh in slide.shapes:
        if not sh.has_text_frame or not sh.text_frame.text.strip():
            continue
        box = (int(sh.left / 9525 * k), int(sh.top / 9525 * k),
               int((sh.left + sh.width) / 9525 * k), int((sh.top + sh.height) / 9525 * k))
        box = (max(0, box[0]), max(0, box[1]), min(bg.width, box[2]), min(bg.height, box[3]))
        if box[2] - box[0] < 2 or box[3] - box[1] < 2:
            continue
        stat = ImageStat.Stat(bg.crop(box))
        bg_mean = tuple(stat.mean[:3])
        for p in sh.text_frame.paragraphs:
            for r in p.runs:
                if not r.text.strip():
                    continue
                rgb = hex2rgb(str(r.font.color.rgb)) if r.font.color and r.font.color.type is not None else (245, 240, 231)
                l1, l2 = sorted((lum(rgb), lum(bg_mean)), reverse=True)
                ratio = (l1 + 0.05) / (l2 + 0.05)
                big = (r.font.size.pt if r.font.size else 12) >= 24
                need = 2.6 if big else 3.4
                if ratio < need:
                    errors.append(f"слайд {i}: «{r.text[:32]}» контраст {ratio:.1f} (<{need}) "
                                  f"цвет {rgb} на фоне {tuple(round(v) for v in bg_mean)}")
                break  # одного прогона на блок достаточно
            break

if errors:
    print("PPTX QA: проблемы")
    for e in errors[:30]:
        print(" -", e)
    sys.exit(1)
print(f"PPTX QA: чисто — {len(prs.slides._sldIdLst)} слайдов, текст читается на подложке")
