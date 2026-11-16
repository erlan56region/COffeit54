from PIL import Image, ImageEnhance
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2] / "source"
SRC = ROOT / "photos"
SRC2 = ROOT / "images"
OUT = pathlib.Path(__file__).resolve().parents[1] / "img"
OUT.mkdir(exist_ok=True)

BG_DARK = (16, 14, 12)
BG_LIGHT = (246, 241, 233)

def cover(im, w, h):
    s = max(w / im.width, h / im.height)
    im2 = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x = (im2.width - w) // 2
    y = (im2.height - h) // 2
    return im2.crop((x, y, x + w, y + h))

def fade(im, color, side, frac=0.35, max_alpha=255):
    w, h = im.size
    mask = Image.new("L", (w, h), 0)
    px = mask.load()
    span = int(w * frac)
    for x in range(span):
        v = int(max_alpha * (1 - x / span) ** 1.5)
        for y in range(h):
            px[x, y] = v
    solid = Image.new("RGB", (w, h), color)
    im = im.convert("RGB")
    if side == "left":
        return Image.composite(solid, im, mask)
    mask = mask.transpose(Image.FLIP_LEFT_RIGHT)
    return Image.composite(solid, im, mask)

def make(src, name, w, h, dark=0.0, sat=1.0, fade_side=None, fade_color=BG_DARK, fade_frac=0.3, sharp=1.05, src2=False):
    base = SRC2 if src2 else SRC
    im = Image.open(base / src).convert("RGB")
    im = cover(im, w, h)
    if sat != 1.0:
        im = ImageEnhance.Color(im).enhance(sat)
    if dark:
        im = ImageEnhance.Brightness(im).enhance(1 - dark)
    if sharp != 1.0:
        im = ImageEnhance.Sharpness(im).enhance(sharp)
    if fade_side:
        im = fade(im, fade_color, fade_side, fade_frac)
    im.save(OUT / name, "JPEG", quality=88, optimize=True, progressive=True)
    print(name, im.size)

make("hero.jpg", "cover.jpg", 700, 1220, dark=0.18, fade_side="left", fade_frac=0.20)
make("coffee_bar.jpg", "band.jpg", 2240, 360, dark=0.18, sat=0.92)
make("space.jpg", "solution.jpg", 900, 620, dark=0.20)
make("merch.jpg", "merch.jpg", 1240, 720, dark=0.06)
make("cafe-one.jpg", "team.jpg", 1120, 620, dark=0.42, src2=True)
make("merch_detail.jpg", "brand.jpg", 640, 820, dark=0.40)
make("hero.jpg", "insight.jpg", 620, 820, dark=0.28, fade_side="right", fade_frac=0.22)
make("proj_gaming.jpg", "proj1.jpg", 600, 400, dark=0.18)
make("proj_music.jpg", "proj2.jpg", 600, 400, dark=0.18)
make("proj_console.jpg", "proj3.jpg", 600, 400, dark=0.18)
