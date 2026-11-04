#!/usr/bin/env python3
"""Собирает автономные HTML-файлы coffeeIT: base.css + data.js + engine.js + vN.css + vN.js."""
import pathlib, re, sys, json, base64

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"
OUT = ROOT / "coffeeit"

TITLES = {
    "v1": ("coffeeIT — Код и зерно", "Одна команда: разработка, серверы и кофе. Редакционный премиум-стиль."),
    "v2": ("coffeeIT — Смена", "Кофейня-интегратор для разработчиков. Хай-тек: тёмный перламутр и лайм."),
    "v3": ("coffeeIT — Coffee First, Code Second", "Нео-брутализм: молочный фон, брутальный шрифт, оранжевый акцент."),
    "v4": ("coffeeIT — Terminal", "Терминальная эстетика: кофейный моно, зелёный prompt и YAML-документы."),
    "v5": ("coffeeIT — Build & Brew", "Корпоративный кейс-сайт: серо-стальной, двухколоночный, с таблицами и пакетами."),
    "v6": ("coffeeIT — Agency Editorial", "Светлый премиум-минимализм диджитал-агентства: крупная типографика, фото, воздух."),
    "v7": ("coffeeIT — Noir Premium", "Тёмный премиум-брутализм: почти чёрный фон, кремовая типографика, огромные заголовки."),
}


def build(vid):
    base = (SRC / "base.css").read_text(encoding="utf-8")
    data = (SRC / "data.js").read_text(encoding="utf-8")
    engine = (SRC / "engine.js").read_text(encoding="utf-8")
    skin_css = (SRC / f"{vid}.css").read_text(encoding="utf-8")
    skin_js = (SRC / f"{vid}.js").read_text(encoding="utf-8")
    photos = (ROOT / "photos.json").read_text(encoding="utf-8")
    photos = json.loads(photos)
    hero_files = {"v1": "cafe-one.jpg", "v2": "cafe-two.jpg", "v3": "cafe-three.jpg"}
    if vid in hero_files:
        image = (ROOT / "images" / hero_files[vid]).read_bytes()
        photos["hero"] = "data:image/jpeg;base64," + base64.b64encode(image).decode("ascii")
    elif vid == "v4":
        photos["hero"] = photos["coffee_bar"]
    photos = json.dumps(photos, ensure_ascii=False)
    mobile_css = (SRC / "mobile.css").read_text(encoding="utf-8")
    title, desc = TITLES[vid]

    html = f"""<!DOCTYPE html>
<html lang="ru" data-variant="{vid}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#16130f">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='10' fill='%2316130f'/%3E%3Cpath d='M14 18h16v10a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V18Z' fill='none' stroke='%23f4efe4' stroke-width='2'/%3E%3Cpath d='M30 21h3a3.5 3.5 0 0 1 0 7h-3' fill='none' stroke='%23f4efe4' stroke-width='2'/%3E%3C/svg%3E">
<style>
{base}
{skin_css}
{mobile_css}
</style>
</head>
<body data-variant="{vid}">
<div id="app"></div>
<script>
window.CI_PHOTOS = {photos};
</script>
<script>
{data}
</script>
<script>
{skin_js}
</script>
<script>
{engine}
</script>
</body>
</html>
"""
    OUT.mkdir(exist_ok=True)
    path = OUT / f"coffeeit-{vid}.html"
    path.write_text(html, encoding="utf-8")
    return path, len(html)


if __name__ == "__main__":
    targets = sys.argv[1:] or ["v1", "v2", "v3", "v4", "v5"]
    for v in targets:
        if v not in TITLES or not (SRC / f"{v}.css").exists() or not (SRC / f"{v}.js").exists():
            sys.exit(f"Нет исходников для варианта {v}. Доступны: v1–v5.")
        p, size = build(v)
        print(f"{p}  {size/1024:.0f} KB")
