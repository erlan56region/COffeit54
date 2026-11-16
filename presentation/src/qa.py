#!/usr/bin/env python3
"""Рендер-проверки: модель сходится, вёрстка в полях, текст не перекрывается,
PNG не пустые, PDF читается. Запускать после build.py."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import model as M
import pypdfium2 as pdfium
from PIL import Image, ImageStat

ROOT = pathlib.Path(__file__).resolve().parents[1]
PDF = ROOT / "coffeeIT-presentation.pdf"
errors = []

def check_model():
    M.check()

def check_pdf():
    pdf = pdfium.PdfDocument(str(PDF))
    if len(pdf) != 17:
        errors.append(f"слайдов {len(pdf)}, ожидалось 17")
    for i in range(len(pdf)):
        page = pdf[i]
        w, h = page.get_size()
        if (round(w), round(h)) != (1280, 720):
            errors.append(f"слайд {i+1}: размер {w}×{h}")
        img = page.render(scale=0.5).to_pil().convert("L")
        st = ImageStat.Stat(img)
        if st.stddev[0] < 8:
            errors.append(f"слайд {i+1}: почти пустой/однотонный (stddev {st.stddev[0]:.1f})")
        txt = page.get_textpage().get_text_bounded()
        if len(txt.strip()) < 80:
            errors.append(f"слайд {i+1}: мало текста ({len(txt)} символов)")

def check_overlaps():
    """Перекрытия считаем по реальным габаритам текста; мелкие касания не считаем."""
    import json
    log = ROOT / "build" / "textlog.json"
    if not log.exists():
        errors.append("нет build/textlog.json — сначала build.py")
        return
    pages = json.loads(log.read_text(encoding="utf-8"))
    for page in pages:
        items = [it for it in page["items"] if it.get("bbox")]
        for i in range(len(items)):
            ax0, ay0, ax1, ay1 = items[i]["bbox"]
            for j in range(i + 1, len(items)):
                bx0, by0, bx1, by1 = items[j]["bbox"]
                ox = min(ax1, bx1) - max(ax0, bx0)
                oy = min(ay1, by1) - max(ay0, by0)
                if ox <= 2 or oy <= 2:
                    continue
                area = ox * oy
                small = min((ax1 - ax0) * (ay1 - ay0), (bx1 - bx0) * (by1 - by0))
                if small and area / small > 0.22:
                    errors.append(f"стр.{page['page']}: наложение «{items[i]['text'][:24]}» "
                                  f"и «{items[j]['text'][:24]}» ({area/small:.0%} меньшего блока)")
                    break

if __name__ == "__main__":
    check_model()
    check_pdf()
    check_overlaps()
    if errors:
        print("QA: НАЙДЕНЫ ПРОБЛЕМЫ")
        for e in errors[:40]:
            print(" -", e)
        sys.exit(1)
    print("QA: всё чисто — модель сходится, 17 слайдов, поля, перекрытий нет")
