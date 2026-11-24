#!/usr/bin/env python3
"""Встраивает мобильные исправления (source/bridge.js + source/mobile-fix.js)
в готовые автономные HTML-файлы coffeeIT.

Идемпотентен: повторный запуск заменяет ранее вставленный блок, а не
добавляет новый. Запуск из любой директории:

    python3 source/inject_bridge.py

Что получается:
  • каждый облик умеет сообщать оболочке о действиях, разделе, прокрутке,
    размере вьюпорта и принимает команды state/scroll/hash/enter/sleep/wake;
  • корзина, мобильное меню и тосты поднимаются над пультом оболочки;
  • на телефоне поля ввода не вызывают автоматический зум iOS, кнопки
    не меньше 44 px, «залипающий» hover отключён;
  • высота считается через 100dvh с фолбэком для старых Android.
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = pathlib.Path(__file__).resolve().parent
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

MOBILE_CSS = """
/* ================= coffeeIT · мобильные исправления ================= */
:root{ --ci-shell-bottom: 0px; }

/* 1. iOS Safari и Android Chrome прячут адресную строку — 100vh «прыгает».
      Берём dvh там, где он есть, иначе оставляем прежнее поведение. */
@supports (height: 100dvh){
  .mobile-menu, .cart-drawer, .v5-snow{ max-height: 100dvh; }
}

/* 2. Сенсорный экран: hover «залипает» после тапа — отключаем подъёмы,
      а кнопки доводим до комфортных 44 px (Apple HIG / Material). */
@media (hover: none), (pointer: coarse){
  .btn:hover, .chip:hover, .card:hover, .product:hover, .case:hover,
  .sp-tier:hover, .v1-row:hover, .v6-proj:hover, .v7-proj:hover,
  .cart-fab:hover, .icon-btn:hover, .tier:hover{ transform: none; }
  .cart-fab{ width: 56px; height: 56px; }
  .icon-btn{ min-width: 44px; min-height: 44px; }
  .burger{ min-width: 44px; min-height: 44px; }
  .qty button{ min-width: 40px; min-height: 40px; }
  .chip, .tab, .seg button, .v4-tabs button{ min-height: 40px; }
  .mobile-menu a{ padding: 12px 4px; }
  .close-btn, [data-cart-close]{ min-width: 44px; min-height: 44px; }
}

/* 3. Поля ввода 16 px: иначе iOS зумит страницу при фокусе. */
@media (hover: none), (pointer: coarse){
  .cart-form input, .cart-form textarea, .cart-form select,
  .lead-form input, .lead-form textarea, .lead-form select,
  .v6-form input, .v6-form textarea, .v6-form select,
  .v6-cta input, .v7-form input, .v7-form textarea,
  .v5-form input, .v5-form textarea, .v5-form select,
  .v1-form input, .v1-form textarea, .v1-form select,
  .v4-form input, .v4-form textarea,
  .booking input, .booking select, .booking textarea,
  input, textarea, select{ font-size: 16px; }
}

/* 4. Вырезы экрана и «желоба»: ничего не прячем под чёлкой и полосой жестов. */
@supports (padding: env(safe-area-inset-bottom)){
  .cart-drawer{ padding-bottom: env(safe-area-inset-bottom); }
  .mobile-menu{ padding-bottom: max(24px, calc(24px + env(safe-area-inset-bottom))); }
  .toast{ bottom: max(26px, calc(26px + env(safe-area-inset-bottom))); }
  .cart-fab{ right: max(16px, calc(16px + env(safe-area-inset-right)));
             bottom: max(16px, calc(16px + env(safe-area-inset-bottom))); }
}

/* 5. Оболочка сообщает свою высоту — поднимаем плавающие элементы.
      В отдельной странице переменная = 0, и ничего не меняется. */
.cart-fab{ bottom: calc(max(16px, 16px + env(safe-area-inset-bottom)) + var(--ci-shell-bottom, 0px)); }
.toast{ bottom: calc(max(26px, 26px + env(safe-area-inset-bottom)) + var(--ci-shell-bottom, 0px)); }
@media (max-width: 860px){
  .toast{ bottom: calc(max(88px, 88px + env(safe-area-inset-bottom)) + var(--ci-shell-bottom, 0px)); }
}

/* 6. Очень узкие экраны (iPhone SE 320 px, старые Android). */
@media (max-width: 380px){
  .wrap{ padding-left: 14px; padding-right: 14px; }
  .cart-drawer{ width: 100%; }
  .btn{ padding-left: 14px; padding-right: 14px; }
  .product-grid, .case-grid, .service-grid, .v1-cases, .v1-vendors,
  .v5-vendors, .v5-zones, .sp-tiers{ grid-template-columns: minmax(0, 1fr); }
  h1{ font-size: clamp(26px, 8.4vw, 40px); }
}

/* 7. Ландшафт на телефоне: не отдаём пол-экрана шапке. */
@media (max-height: 520px) and (orientation: landscape){
  .cart-drawer{ width: min(420px, 78vw); }
  .mobile-menu{ padding-top: 12px; }
  .hero, .v1-hero, .v6-hero, .v7-hero{ min-height: auto; }
}

/* 8. Уважение к системным настройкам движения. */
@media (prefers-reduced-motion: reduce){
  .mq-inner{ animation: none !important; }
  .cart-drawer, .mobile-menu{ transition-duration: .01ms !important; }
}
/* ================= /мобильные исправления ================= */
"""


def scripts() -> str:
    bridge = (SRC / "bridge.js").read_text(encoding="utf-8").strip()
    mobile = (SRC / "mobile-fix.js").read_text(encoding="utf-8").strip()
    return f"<script>\n{bridge}\n</script>\n<script>\n{mobile}\n</script>"


def block() -> str:
    return (
        f"{START}\n"
        f"<style id=\"ci-mobile-css\">{MOBILE_CSS}</style>\n"
        f"{scripts()}\n"
        f"{END}"
    )


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
    return f"{path.name}: блок {action}"


def main() -> None:
    for need in ("bridge.js", "mobile-fix.js"):
        if not (SRC / need).exists():
            sys.exit(f"Нет source/{need}")
    missing = 0
    for name in FILES:
        path = ROOT / name
        if not path.exists():
            print(f"{name}: пропущен — файла нет")
            missing += 1
            continue
        print(patch(path))
    if missing:
        print(f"\nГотово с замечаниями: {missing} файл(ов) не найдено.")
    else:
        print("\nГотово: все облики получили мост и мобильные исправления.")


if __name__ == "__main__":
    main()
