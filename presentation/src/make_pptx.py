#!/usr/bin/env python3
"""PPTX: подложка (графика без текста) + нативные редактируемые текстовые блоки."""
import sys, json, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from reportlab.pdfgen import canvas as rl_canvas
from reportlab.lib.units import inch
from pptx import Presentation
from pptx.util import Emu, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

from theme import register, W, H, BG
from canvasx import Inker
import slides as S

ROOT = pathlib.Path(__file__).resolve().parents[1]
TMP = ROOT / "build" / "pptx"
OUT = ROOT / "coffeeIT-presentation.pptx"
PX = 914400 / 96

def emu(v): return Emu(int(v * PX))

def hexrgb(c):
    c = c.lstrip("#")
    return RGBColor(int(c[0:2], 16), int(c[2:4], 16), int(c[4:6], 16))

def build():
    TMP.mkdir(parents=True, exist_ok=True)
    register()
    prs = Presentation()
    prs.slide_width = emu(W)
    prs.slide_height = emu(H)
    blank = prs.slide_layouts[6]
    total = len(S.SLIDES)

    for i, fn in enumerate(S.SLIDES, 1):
        # --- подложка: графика без текста ---
        pdf_path = TMP / f"bg{i:02d}.pdf"
        png_path = TMP / f"bg{i:02d}.png"
        c = rl_canvas.Canvas(str(pdf_path), pagesize=(W, H))
        ink = Inker(c)
        ink.reset(i)
        ink.draw_text = False
        fn(c, ink, i, total)
        c.showPage(); c.save()
        import pypdfium2 as pdfium
        pdfium.PdfDocument(str(pdf_path))[0].render(scale=1.5).to_pil().save(png_path)

        s = prs.slides.add_slide(blank)
        s.shapes.add_picture(str(png_path), 0, 0, width=emu(W), height=emu(H))
        for it in ink.log:
            size = max(7.5, it["size"] * 0.75)
            lead = max(size * 1.02, it.get("leading", it["size"] * 1.35) * 0.75)
            lines = str(it["text"]).split("\n")
            box = s.shapes.add_textbox(emu(it["x"] - 2), emu(it["y"] - 2),
                                       emu(it["w"] + 16), emu(len(lines) * it.get("leading", it["size"] * 1.35) + 6))
            tf = box.text_frame
            tf.word_wrap = False  # строки уже разбиты как в PDF — не даём PowerPoint их переразбить
            for attr in ("margin_left", "margin_right", "margin_top", "margin_bottom"):
                setattr(tf, attr, 0)
            tf.vertical_anchor = MSO_ANCHOR.TOP
            for k, line in enumerate(lines):
                p = tf.paragraphs[0] if k == 0 else tf.add_paragraph()
                p.alignment = PP_ALIGN.RIGHT if it.get("align") == "right" else PP_ALIGN.LEFT
                p.line_spacing = Pt(round(lead, 1))
                p.space_before = Pt(0)
                p.space_after = Pt(0)
                r = p.add_run(); r.text = line
                r.font.size = Pt(round(size, 1))
                r.font.name = "Golos Text"
                r.font.bold = bool(it.get("bold"))
                r.font.color.rgb = hexrgb(str(it.get("color") or "#F5F0E7"))
        s.notes_slide.notes_text_frame.text = f"coffeeIT · слайд {i} из {total}"
    prs.save(str(OUT))
    print("saved", OUT, "слайдов:", total)

if __name__ == "__main__":
    build()
