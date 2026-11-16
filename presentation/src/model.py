"""coffeeIT: финансовая модель (план) — единственный источник цифр для презентации.
Все значения — расчётные допущения на плановую мощность 12-го месяца, не факт."""
from dataclasses import dataclass

# ---------- CAPEX ----------
CAPEX = [
    ("Ремонт, инженерия, вентиляция · 240 м²", 4_200_000, "17 500 ₽/м²: чистовая отделка, вентиляция, электрика"),
    ("Кофейное и кухонное оборудование", 2_000_000, "эспрессо-машина, 2 кофемолки, холодильники, витрина"),
    ("Мебель, рабочие места, сеть, шоурум", 1_400_000, "24 места, 3 переговорки, Wi-Fi 6, витрина железа"),
    ("Первый тираж мерча и посуда", 300_000, "6 SKU, 150 единиц, брендинг"),
    ("Открытие: юрлицо, касса, ПО, старт-маркетинг", 600_000, "юридическое лицо, касса, сайт, фотосессия"),
    ("Оборотный капитал до выхода в плюс", 4_500_000, "покрывает накопленный минус месяцев 1–6 с запасом"),
]
CAPEX_TOTAL = sum(c[1] for c in CAPEX)

# ---------- продуктовые строки: (ключ, название, единица, цена, перем. доля, штук в месяц) ----------
UNITS = [
    ("coffee",  "Напиток и еда",        "чек",        450,   0.31, 220 * 30),
    ("member",  "Резидентство",         "абонемент",  22_000, 0.08, 12),
    ("daypass", "Рабочий день",          "день",      1_400,  0.08, 10 * 30),
    ("room",    "Переговорка",           "час",       1_500,  0.08, 3 * 3 * 30),
    ("event",   "Митап / событие",       "событие",   60_000, 0.08, 2),
    ("project", "IT-проект",             "проект",    500_000, 0.45, 3),
    ("retainer","Поддержка (SLA)",       "месяц",     120_000, 0.45, 3),
    ("merch",   "Мерч",                  "единица",   2_000,  0.50, 125),
]

# ---------- постоянные расходы, ₽/мес ----------
RENT = 520_000
UTILITIES = 130_000
PAYROLL = 1_750_000          # 12 человек: 1,31 млн ₽ gross + страховые взносы
MARKETING = 150_000
OTHER = 120_000
FIXED = RENT + UTILITIES + PAYROLL + MARKETING + OTHER
ACQUIRING = 0.02             # эквайринг и комиссии

RAMP = [0.30, 0.38, 0.45, 0.52, 0.58, 0.64, 0.70, 0.76, 0.82, 0.88, 0.94, 1.00]

HEADCOUNT = [
    ("Управляющий", 1, 140_000),
    ("Бариста", 4, 75_000),
    ("Повар-кондитер", 1, 90_000),
    ("Инженер (full-stack / DevOps)", 2, 220_000),
    ("Дизайнер продукта", 1, 140_000),
    ("Менеджер проектов и продаж", 1, 120_000),
    ("SMM и контент", 1, 45_000),
    ("Хозчасть и уборка", 1, 35_000),
]

def pnl(scale=1.0):
    rows, rev, cogs = [], 0.0, 0.0
    for key, name, unit, price, var, qty in UNITS:
        q = qty * scale
        r = q * price
        c = r * var
        rows.append(dict(key=key, name=name, unit=unit, price=price, var=var, qty=q,
                         rev=r, cogs=c, contribution=r - c,
                         margin=(1 - var)))
        rev += r
        cogs += c
    contribution = rev - cogs
    acq = rev * ACQUIRING
    ebitda = contribution - FIXED - acq
    return dict(rows=rows, rev=rev, cogs=cogs, contribution=contribution,
                acq=acq, fixed=FIXED, ebitda=ebitda,
                margin=ebitda / rev if rev else 0,
                cm=contribution / rev if rev else 0)

FULL = pnl(1.0)
PLAN = [pnl(s) for s in RAMP]
YEAR1_REV = sum(p["rev"] for p in PLAN)
YEAR1_EBITDA = sum(p["ebitda"] for p in PLAN)
YEAR2_REV = FULL["rev"] * 12
YEAR2_EBITDA = FULL["ebitda"] * 12

BREAKEVEN_REV = FIXED / (FULL["cm"] - ACQUIRING)
BREAKEVEN_MONTH = next(i + 1 for i, p in enumerate(PLAN) if p["ebitda"] > 0)
SAFETY = 1 - BREAKEVEN_REV / FULL["rev"]

def payback(growth=0.006):
    cum = sum(p["ebitda"] for p in PLAN)
    if cum >= CAPEX_TOTAL:
        return 12
    m = 12
    while m < 96:
        m += 1
        cum += FULL["ebitda"] * (1 + growth) ** (m - 12)
        if cum >= CAPEX_TOTAL:
            return m
    return None

PAYBACK_MONTH = payback()

def payback_for(scale):
    """Месяц возврата вложений для сценария (ramp масштабируется вместе с планом)."""
    plan = [pnl(min(1.25, scale * r)) for r in RAMP]
    cum = 0.0
    for i, q in enumerate(plan, 1):
        cum += q["ebitda"]
        if cum >= CAPEX_TOTAL:
            return i
    full = pnl(scale)
    m = 12
    while m < 120:
        m += 1
        cum += full["ebitda"] * (1.006 ** (m - 12))
        if cum >= CAPEX_TOTAL:
            return m
    return None

def monthly_ebitda_after(m):
    """EBITDA месяца m>12 при плановой мощности и росте 0,6%/мес."""
    return FULL["ebitda"] * (1.006 ** (m - 12))

# сценарии: доля от плановой выручки
SCENARIOS = []
for label, s in (("Осторожный −20%", 0.8), ("План", 1.0), ("Оптимистичный +15%", 1.15)):
    p = pnl(s)
    SCENARIOS.append(dict(label=label, rev=p["rev"], ebitda=p["ebitda"], margin=p["margin"],
                          payback=payback_for(s)))

# цены и вклад по направлениям для слайда «четыре потока»
STREAM_MIX = []
for grp, keys in (("Кофейня", ["coffee"]), ("Пространство", ["member", "daypass", "room", "event"]),
                  ("IT-студия", ["project", "retainer"]), ("Мерч", ["merch"])):
    share = sum(r["rev"] for r in FULL["rows"] if r["key"] in keys) / FULL["rev"]
    STREAM_MIX.append(dict(name=grp, rev=sum(r["rev"] for r in FULL["rows"] if r["key"] in keys),
                           share=share))

REV_PER_M2 = FULL["rev"] / 240
COFFEE_PER_M2 = next(r["rev"] for r in FULL["rows"] if r["key"] == "coffee") / 240

# ---------- форматирование ----------
def rub(x, d=0):
    s = f"{x:,.{d}f}".replace(",", "\u00a0")
    return s + "\u00a0₽"

def num(x, d=0):
    return f"{x:,.{d}f}".replace(",", "\u00a0").replace(".", ",")

def mln(x, d=1):
    return f"{x/1_000_000:.{d}f}".replace(".", ",") + "\u00a0млн"

def pct(x, d=0):
    return f"{x*100:.{d}f}".replace(".", ",") + "%"

# ---------- контроль сходимости: хватает ли оборотного капитала до выхода в плюс ----------
def cash_check():
    """Кумулятивный EBITDA до первого плюсового месяца — минимум, который должен покрыть запас."""
    cum, trough, trough_month = 0.0, 0.0, 0
    for i, p in enumerate(PLAN, 1):
        cum += p["ebitda"]
        if cum < trough:
            trough, trough_month = cum, i
    reserve = next(v for name, v, note in CAPEX if name.startswith("Оборотный"))
    return dict(trough=trough, month=trough_month, reserve=reserve,
                covered=reserve >= abs(trough), headroom=reserve - abs(trough))

CASH = cash_check()

def check():
    """Ассерты сходимости модели. Сборка падает, если цифры перестали сходиться."""
    errs = []
    if abs(CAPEX_TOTAL - 13_000_000) > 0:
        errs.append(f"CAPEX изменился: {CAPEX_TOTAL}")
    if not CASH["covered"]:
        errs.append("оборотного капитала не хватает до выхода в плюс")
    if FULL["ebitda"] <= 0:
        errs.append("EBITDA на плановой мощности не положительна")
    if FULL["margin"] < 0.12:
        errs.append("маржа ниже 12% — не похоже на устойчивую точку")
    if not (0.15 <= SAFETY <= 0.5):
        errs.append(f"запас прочности вне 15–50%: {SAFETY:.0%}")
    if BREAKEVEN_MONTH is None or BREAKEVEN_MONTH > 9:
        errs.append("безубыточность позже 9-го месяца")
    if PAYBACK_MONTH is None or not (12 <= PAYBACK_MONTH <= 30):
        errs.append(f"окупаемость вне 12–30 месяцев: {PAYBACK_MONTH}")
    if any(s["ebitda"] <= 0 for s in SCENARIOS):
        errs.append("в осторожном сценарии точка убыточна")
    mix = sum(s["share"] for s in STREAM_MIX)
    if abs(mix - 1) > 1e-9:
        errs.append("доли потоков не дают 100%")
    rev_rows = sum(r["rev"] for r in FULL["rows"])
    if abs(rev_rows - FULL["rev"]) > 1:
        errs.append("сумма строк не равна выручке")
    if errs:
        raise SystemExit("МОДЕЛЬ НЕ СХОДИТСЯ: " + "; ".join(errs))
    return True

if __name__ == "__main__":
    print("checks passed:", check())
    print("CAPEX", rub(CAPEX_TOTAL), "fixed", rub(FIXED))
    print("full rev", rub(FULL["rev"]), "ebitda", rub(FULL["ebitda"]), pct(FULL["margin"], 1), "cm", pct(FULL["cm"], 1))
    print("mix", [(s["name"], pct(s["share"]), rub(s["rev"])) for s in STREAM_MIX])
    print("breakeven", rub(BREAKEVEN_REV), "month", BREAKEVEN_MONTH, "safety", pct(SAFETY))
    print("year1", rub(YEAR1_REV), rub(YEAR1_EBITDA), "year2", rub(YEAR2_REV), rub(YEAR2_EBITDA))
    print("payback", PAYBACK_MONTH, "rev/m2", rub(REV_PER_M2), "coffee/m2", rub(COFFEE_PER_M2))
    for p in PLAN:
        print(f"  rev {rub(p['rev']):>16} ebitda {rub(p['ebitda']):>16} {pct(p['margin'],1):>7}")
    for s in SCENARIOS:
        print(" scen", s["label"], rub(s["rev"]), rub(s["ebitda"]), pct(s["margin"], 1))
    print("payroll gross", rub(sum(h[1]*h[2] for h in HEADCOUNT)), "with taxes", rub(sum(h[1]*h[2] for h in HEADCOUNT)*1.3))
    print("cash", {k: (round(v) if isinstance(v, float) else v) for k, v in CASH.items()})
