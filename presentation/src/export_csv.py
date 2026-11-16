#!/usr/bin/env python3
"""Выгружает финансовую модель в coffeeIT-finmodel.csv (UTF-8 BOM, ; — для Excel)."""
import pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import model as M

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "coffeeIT-finmodel.csv"
out = []
add = out.append

add("coffeeIT — финансовая модель;точка 240 м², Москва, «Флакон»;все цифры — расчёт по допущениям, не факт")
add("")
add("ПОМЕСЯЧНЫЙ ПЛАН, ₽;месяц;выручка;переменные;валовая_маржа;постоянные;эквайринг;EBITDA;накопленный_EBITDA")
cum = 0.0
for i, p in enumerate(M.PLAN, 1):
    cum += p["ebitda"]
    add(f";{i};{p['rev']:.0f};{p['cogs']:.0f};{p['contribution']:.0f};{p['fixed']:.0f};"
        f"{p['acq']:.0f};{p['ebitda']:.0f};{cum:.0f}")
add("")
add("ИТОГИ;показатель;значение")
add(f"ИТОГИ;выручка года 1, ₽;{M.YEAR1_REV:.0f}")
add(f"ИТОГИ;EBITDA года 1, ₽;{M.YEAR1_EBITDA:.0f}")
add(f"ИТОГИ;выручка года 2, ₽;{M.YEAR2_REV:.0f}")
add(f"ИТОГИ;EBITDA года 2, ₽;{M.YEAR2_EBITDA:.0f}")
add(f"ИТОГИ;окупаемость, мес;{M.PAYBACK_MONTH}")
add(f"ИТОГИ;безубыточность, ₽ выручки/мес;{M.BREAKEVEN_REV:.0f}")
add(f"ИТОГИ;запас прочности;{M.SAFETY:.3f}")
add(f"ИТОГИ;кассовый минимум, ₽;{M.CASH['trough']:.0f}")
add(f"ИТОГИ;месяц кассового минимума;{M.CASH['month']}")
add(f"ИТОГИ;оборотный капитал, ₽;{M.CASH['reserve']:.0f}")
add(f"ИТОГИ;запас к минимуму, ₽;{M.CASH['headroom']:.0f}")
add(f"ИТОГИ;минимум покрыт обороткой;{'да' if M.CASH['covered'] else 'нет'}")
add("")
add("ВЫРУЧКА ПЛАНОВОЙ МОЩНОСТИ;ключ;продукт;единица;цена;переменные %;кол-во/мес;выручка/мес;вклад;доля")
for r in M.FULL["rows"]:
    add(f";{r['key']};{r['name']};{r['unit']};{r['price']};{round(r['var']*100)};{r['qty']:g};"
        f"{r['rev']:.0f};{r['contribution']:.0f};{r['rev']/M.FULL['rev']:.3f}")
add(f";;;;ИТОГО;;;{M.FULL['rev']:.0f};{M.FULL['contribution']:.0f};1.000")
add("")
add("ПОСТОЯННЫЕ РАСХОДЫ, ₽/мес;статья;сумма")
for name, val in M.__dict__.items():
    if name in ("RENT", "UTILITIES", "PAYROLL", "MARKETING", "OTHER"):
        add(f";{name};{val:.0f}")
add(f";ИТОГО;{M.FULL['fixed']:.0f}")
add("")
add("CAPEX, ₽;статья;сумма;комментарий")
for name, val, note in M.CAPEX:
    add(f";{name};{val};{note}")
add(f";ИТОГО CAPEX;{M.CAPEX_TOTAL};")
add("")
add("СЦЕНАРИИ;сценарий;выручка/мес;EBITDA/мес;маржа;окупаемость, мес")
for s in M.SCENARIOS:
    add(f";{s['label']};{s['rev']:.0f};{s['ebitda']:.0f};{s['margin']:.3f};{s['payback']}")
add("")
add("КОМАНДА;роль;человек;оклад gross, ₽/мес")
for role, n, pay in M.HEADCOUNT:
    add(f";{role};{n};{pay}")
add(f";ИТОГО;{sum(n for _, n, _ in M.HEADCOUNT)};{sum(n*p for _, n, p in M.HEADCOUNT):.0f}")

OUT.write_text("\ufeff" + "\r\n".join(out) + "\r\n", encoding="utf-8")
print("saved", OUT, "строк:", len(out))
