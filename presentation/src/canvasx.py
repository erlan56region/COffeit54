"""Мини-движок вёрстки поверх reportlab: текстовые блоки, линии, карточки, изображения."""
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.lib.utils import ImageReader
from theme import W, H, M

class Inker:
    def __init__(self, c):
        self.c = c
        self.boxes = []          # (x0, y_top, x1, y_bottom) для проверки вёрстки
        self.errors = []
        self.page = 0
        self.log = []            # элементы текста для нативного PPTX
        self.draw_text = True    # False → рисуем только графику (для подложек)

    def reset(self, page):
        self.boxes = []
        self.errors = []
        self.log = []
        self.page = page

    def check(self, allow_bleed=False):
        """Проверка безопасных полей: ничего не вылезает за 1280×720 и под футер."""
        bad = []
        for x0, y0, x1, y1 in self.boxes:
            if x0 < 24 or x1 > 1256 or y0 < 16 or y1 > 712:
                bad.append((round(x0), round(y0), round(x1), round(y1)))
        if bad and not allow_bleed:
            self.errors.extend(bad)
        return bad

    # ---------- измерение ----------
    @staticmethod
    def wrap(text, font, size, width, track=0.0):
        out = []
        for para in str(text).split("\n"):
            out.extend(Inker._wrap_para(para, font, size, width, track))
        return out

    @staticmethod
    def _wrap_para(text, font, size, width, track=0.0):
        words = text.split(" ")
        lines, cur = [], ""
        for w in words:
            probe = (cur + " " + w).strip()
            if Inker.measure(probe, font, size, track) <= width or not cur:
                cur = probe
            else:
                lines.append(cur)
                cur = w
        if cur:
            lines.append(cur)
        return lines

    @staticmethod
    def measure(text, font, size, track=0.0):
        return stringWidth(text, font, size) + max(0, len(text) - 1) * track

    # ---------- текст ----------
    def text(self, x, y, s, font="Golos", size=16, color="#fff", leading=None,
             width=None, track=0.0, align="left", top=True, dry=False):
        """y — верх строки (top=True) или базовая линия. Возвращает высоту блока."""
        leading = leading or size * 1.35
        lines = self.wrap(s, font, size, width, track) if width else [s]
        hgt = leading * len(lines)
        if dry:
            return hgt, lines
        c = self.c
        c.setFont(font, size)
        c.setFillColor(color)
        baseline = (H - y - size * 0.86) if top else (H - y)
        wmax = max(self.measure(l, font, size, track) for l in lines)
        if width:
            x0, x1 = x, x + width
        elif align == "right":
            x0, x1 = x - wmax, x
        elif align == "center":
            x0, x1 = x - wmax / 2, x + wmax / 2
        else:
            x0, x1 = x, x + wmax
        self.boxes.append((x0, y, x1, y + (leading * (len(lines) - 1) + size * 1.05)))
        if size >= 9:
            bbox = (x0, y, x1, y + leading * (len(lines) - 1) + size * 0.98)
            self.log.append(dict(x=x0, y=y, w=max(x1 - x0, 24), text="\n".join(lines), size=size,
                                 leading=leading, color=color, bbox=bbox,
                                 bold=font not in ("Golos", "Golos-Med"),
                                 align=("right" if align == "right" else "left")))
        if not self.draw_text:
            return hgt, lines
        for i, ln in enumerate(lines):
            w = self.measure(ln, font, size, track)
            dx = x
            if align == "center":
                dx = x + (width - w) / 2
            elif align == "right":
                dx = x + width - w
            c.drawString(dx, baseline - i * leading, ln, charSpace=track)
        return hgt, lines

    def num(self, x, y, s, size=64, color="#fff", font="Golos-Black", track=-1.2, align="left", width=0):
        c = self.c
        w = self.measure(s, font, size, track)
        dx = x
        if align == "center":
            dx = x + (width - w) / 2
        elif align == "right":
            dx = x + width - w
        if size >= 9:
            self.log.append(dict(x=dx, y=y, w=max(w, 24), text=s, size=size, leading=size * 1.1,
                                 color=color, bold=True, align="left",
                                 bbox=(dx, y, dx + w, y + size * 0.98)))
        if not self.draw_text:
            return w
        c.setFont(font, size)
        c.setFillColor(color)
        c.drawString(dx, H - y - size * 0.82, s, charSpace=track)
        return w

    # ---------- графика ----------
    def rect(self, x, y, w, h, fill=None, stroke=None, lw=1, r=0, alpha=None):
        c = self.c
        if alpha is not None:
            c.saveState()
            c.setFillAlpha(alpha)
            c.setStrokeAlpha(alpha)
        if fill:
            c.setFillColor(fill)
        if stroke:
            c.setStrokeColor(stroke)
            c.setLineWidth(lw)
        if r:
            c.roundRect(x, H - y - h, w, h, r, stroke=1 if stroke else 0, fill=1 if fill else 0)
        else:
            c.rect(x, H - y - h, w, h, stroke=1 if stroke else 0, fill=1 if fill else 0)
        if alpha is not None:
            c.restoreState()
        c.setLineWidth(1)

    def hline(self, x, y, w, color="#333", lw=1, alpha=None):
        c = self.c
        c.saveState()
        if alpha is not None:
            c.setStrokeAlpha(alpha)
        c.setStrokeColor(color)
        c.setLineWidth(lw)
        c.line(x, H - y, x + w, H - y)
        c.restoreState()
        c.setStrokeAlpha(1)
        c.setFillAlpha(1)

    def vline(self, x, y, h, color="#333", lw=1, alpha=None, dash=None):
        c = self.c
        c.saveState()
        if alpha is not None:
            c.setStrokeAlpha(alpha)
        c.setStrokeColor(color)
        c.setLineWidth(lw)
        if dash:
            c.setDash(*dash)
        c.line(x, H - y, x, H - y - h)
        c.restoreState()

    def image(self, path, x, y, w, h):
        c = self.c
        c.saveState()
        p = c.beginPath()
        p.rect(x, H - y - h, w, h)
        c.clipPath(p, stroke=0, fill=0)
        c.drawImage(ImageReader(path), x, H - y - h, w, h,
                    preserveAspectRatio=False, mask="auto", anchor="c")
        c.restoreState()
