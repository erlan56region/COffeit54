#!/usr/bin/env python3
"""Встраивает activity-bridge (source/bridge.js) в готовые автономные HTML-файлы.

Скрипт идемпотентен: повторный запуск заменяет ранее вставленный блок,
а не добавляет новый. Запуск из любой директории:

    python3 source/inject_bridge.py

Что получается: каждый вариант (v1…v7 и live) умеет сообщать оболочке
coffeeit-show.html о действиях посетителя и о текущем разделе.
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
BRIDGE = pathlib.Path(__file__).resolve().parent / "bridge.js"
FILES = [
    "coffeeit-live.html",
    "coffeeit-v1.html",
    "coffeeit-v2.html",
    "coffeeit-v3.html",
    "coffeeit-v4.html",
    "coffeeit-v5.html",
    "coffeeit-v6.html",
    "coffeeit-v7.html",
]
START = "<!-- ci-bridge:start -->"
END = "<!-- ci-bridge:end -->"


def block() -> str:
    js = BRIDGE.read_text(encoding="utf-8").strip()
    return f"{START}\n<script>\n{js}\n</script>\n{END}"


def patch(path: pathlib.Path) -> str:
    html = path.read_text(encoding="utf-8")
    marker = re.compile(re.escape(START) + r".*?" + re.escape(END), re.S)
    payload = block()
    if marker.search(html):
        html = marker.sub(lambda _m: payload, html, count=1)
        action = "обновлён"
    else:
        idx = html.rfind("</body>")
        if idx < 0:
            return f"{path.name}: пропущен — нет </body>"
        html = html[:idx] + payload + "\n" + html[idx:]
        action = "добавлен"
    path.write_text(html, encoding="utf-8")
    return f"{path.name}: мост {action}"


def main() -> None:
    if not BRIDGE.exists():
        sys.exit("Нет source/bridge.js")
    failed = 0
    for name in FILES:
        path = ROOT / name
        if not path.exists():
            print(f"{name}: пропущен — файла нет")
            failed += 1
            continue
        print(patch(path))
    if failed:
        print(f"\nГотово с замечаниями: {failed} файл(ов) не найдено.")


if __name__ == "__main__":
    main()
