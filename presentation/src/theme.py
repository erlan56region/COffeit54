"""Палитра и типографика coffeeIT."""
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import pathlib

FONTS = pathlib.Path(__file__).resolve().parents[1] / "fonts"

def register():
    for name, file in {
        "Golos": "GolosText-Regular.ttf",
        "Golos-Med": "GolosText-Medium.ttf",
        "Golos-Semi": "GolosText-SemiBold.ttf",
        "Golos-Bold": "GolosText-Bold.ttf",
        "Golos-Black": "GolosText-Black.ttf",
    }.items():
        pdfmetrics.registerFont(TTFont(name, str(FONTS / file)))
    pdfmetrics.registerFontFamily("Golos", normal="Golos", bold="Golos-Bold",
                                  italic="Golos", boldItalic="Golos-Bold")

BG      = "#100D0B"
BG2     = "#17130F"
PANEL   = "#1C1712"
LINE    = "#2E2721"
CREAM   = "#F5F0E7"
MUTED   = "#A79C8D"
DIM     = "#7C7264"
COPPER  = "#C98A4B"
GOLD    = "#DDA968"
GREEN   = "#79A87E"
RED     = "#C4735C"
LIGHT   = "#F6F1E8"
LIGHT2  = "#EDE4D6"
INK     = "#14110D"
INK2    = "#4A423A"

W, H = 1280, 720
M = 72            # поле
COL = (W - 2 * M - 11 * 16) / 12   # ширина колонки при 16pt желобах
