#!/usr/bin/env python3
"""Собирает презентацию coffeeIT: PDF (главный артефакт) + превью-растр для проверки."""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from theme import register, BG, W, H
import model as M
from canvasx import Inker
import slides as S

OUT = pathlib.Path(__file__).resolve().parents[1] / "coffeeIT-presentation.pdf"
LOG = pathlib.Path(__file__).resolve().parents[1] / "build" / "textlog.json"
TEXTS = []

def save_log(page, log):
    TEXTS.append(dict(page=page, items=log))


def dump_log():
    LOG.parent.mkdir(exist_ok=True)
    import json
    LOG.write_text(json.dumps(TEXTS, ensure_ascii=False, indent=1), encoding="utf-8")

def main():
    M.check()
    register()
    c = canvas.Canvas(str(OUT), pagesize=(W, H))
    c.setTitle("coffeeIT — презентация компании")
    c.setAuthor("coffeeIT")
    c.setSubject("Продающая презентация: кофейня, пространство, IT-студия")
    c.setKeywords("coffeeIT, кофейня, коворкинг, IT-интегратор, презентация, инвестор")
    ink = Inker(c)
    total = len(S.SLIDES)
    problems = {}
    for i, fn in enumerate(S.SLIDES, 1):
        ink.reset(i)
        fn(c, ink, i, total)
        bad = ink.check()
        if bad:
            problems[i] = bad
        save_log(i, ink.log)
        c.showPage()
    c.save()
    dump_log()
    print("saved", OUT)
    if problems:
        print("⚠ выход за поля:")
        for page, bad in problems.items():
            print("  стр.", page, bad[:6])
    else:
        print("вёрстка: все блоки в безопасных полях")

if __name__ == "__main__":
    main()
