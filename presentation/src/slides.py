# -*- coding: utf-8 -*-
"""17 слайдов coffeeIT. Вся вёрстка — в координатах 1280×720."""
import pathlib
import model as M
from theme import (W, H, M as MG, BG, BG2, PANEL, LINE, CREAM, MUTED, DIM,
                   COPPER, GOLD, GREEN, RED, LIGHT, LIGHT2, INK, INK2)
from canvasx import Inker

IMG = pathlib.Path(__file__).resolve().parents[1] / "img"
SRC_NOTE = "Источники: РБК Исследования рынков, INFOLine, TAdviser / Б1, Forbes, CORE.XP, «БестЪ», mos.ru"

# ---------------------------------------------------------------- каркас
def chrome(c, ink, idx, total, kicker, dark=True, note=None, pad=MG):
    fg = CREAM if dark else INK
    dim = MUTED if dark else INK2
    ink.text(pad, 38, "coffeeIT", size=13.5, color=fg, font="Golos-Bold", track=0.4)
    ink.text(pad + 66, 39.5, "кофейня · пространство · IT-студия", size=9.5, color=dim, font="Golos")
    ink.text(W - pad, 39, kicker.upper(), size=9.5, color=COPPER if dark else "#8A5B2C",
             font="Golos-Semi", track=1.7, align="right", width=0)
    ink.hline(pad, 60, W - 2 * pad, color=LINE if dark else "#D8CEBE", lw=0.7)
    ink.hline(pad, 664, W - 2 * pad, color=LINE if dark else "#D8CEBE", lw=0.7)
    ink.text(pad, 678, note or "coffeeIT · презентация компании · ноябрь 2026 · план и допущения, не факт",
             size=8.8, color=DIM if dark else "#6F6555", font="Golos")
    n = f"{idx:02d} — {total:02d}"
    ink.text(W - pad - 120, 678, n, size=9, color=dim, font="Golos-Semi", track=1.2, align="right", width=120)

def h1(ink, x, y, lines, size=54, color=CREAM, width=1000, leading=None, track=-1.4):
    leading = leading or size * 1.02
    ink.text(x, y, lines, size=size, color=color, font="Golos-Black", track=track,
             width=width, leading=leading)

def kicker(ink, x, y, s, color=COPPER):
    ink.text(x, y, s.upper(), size=10, color=color, font="Golos-Semi", track=1.9)

def body(ink, x, y, s, size=14.5, color=CREAM, width=520, leading=None, font="Golos"):
    ink.text(x, y, s, size=size, color=color, font=font, width=width, leading=leading or size * 1.5)

def label(ink, x, y, s, color=DIM, size=9.5, track=1.5):
    ink.text(x, y, s.upper(), size=size, color=color, font="Golos-Semi", track=track)

def card(ink, x, y, w, h, fill=PANEL, stroke=LINE, r=14):
    ink.rect(x, y, w, h, fill=fill, stroke=stroke, lw=0.8, r=r)

def pill(ink, x, y, s, color=COPPER, fg=None, size=8.6, padx=10, h=21):
    fg = fg or BG
    w = Inker.measure(s.upper(), "Golos-Bold", size, 1.2) + padx * 2
    ink.rect(x, y, w, h, fill=color, r=h / 2)
    ink.text(x + padx, y + h / 2 - size * 0.52, s.upper(), size=size, color=fg, font="Golos-Bold", track=1.2)
    return w

# ---------------------------------------------------------------- 01 обложка
def s01(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=BG)
    ink.image(str(IMG / "cover.jpg"), 612, 0, 668, H)
    # левая часть
    ink.text(72, 84, "ПРЕЗЕНТАЦИЯ КОМПАНИИ · ДЛЯ ИНВЕСТОРА, ПАРТНЁРА И КЛИЕНТА",
             size=10, color=COPPER, font="Golos-Semi", track=2.0)
    ink.text(72, 132, "КОФЕ.", size=92, color=CREAM, font="Golos-Black", track=-3.4)
    ink.text(72, 224, "КОД.", size=92, color=GOLD, font="Golos-Black", track=-3.4)
    ink.text(72, 316, "СТУДИЯ.", size=92, color=CREAM, font="Golos-Black", track=-3.4)
    ink.hline(72, 442, 96, color=COPPER, lw=2)
    body(ink, 72, 466,
         "Кофейня, пространство для работы и IT-студия в одном адресе на «Флаконе». "
         "Один метр приносит три чека: чашку, рабочий день и проект.", size=17.5, width=520, leading=27)
    # три факта
    facts = [("4", "бизнеса\nна 240 м²"), ("13", "млн ₽\nна запуск"), ("20", "месяцев\nдо окупаемости")]
    x = 72
    for k, (v, t) in enumerate(facts):
        ink.text(x, 580, v, size=40, color=CREAM, font="Golos-Black", track=-1.2)
        ink.text(x + Inker.measure(v, "Golos-Black", 40, -1.2) + 10, 606,
                 t.replace("\n", " · "), size=9.5, color=MUTED, font="Golos-Semi", track=0.6)
        x += 168
    ink.text(72, 660, "Москва · дизайн-завод «Флакон» · ноябрь 2026", size=9.5, color=DIM, font="Golos")
    ink.text(72, 678, "Все финансовые цифры — план и допущения, а не факт. Методика — на слайде 15.",
             size=9.5, color=DIM, font="Golos")
    ink.text(1200, 636, "01", size=30, color=CREAM, font="Golos-Black", track=-0.4, align="right", width=0)

# ---------------------------------------------------------------- 02 что уже есть (сайт)
def s02(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=BG)
    chrome(c, ink, i, n, "02 · что уже сделано")
    kicker(ink, 72, 104, "актив №1 — сайт")
    h1(ink, 72, 126, "Сайт — уже готовый продукт,\nа не картинка на будущее", size=44, width=760)
    body(ink, 72, 244,
         "Семь версий дизайна, восемь разделов, живые формы, корзина и бронь. Открывается одним файлом и работает без сервера.",
         size=13, color=MUTED, width=660, leading=20)

    items = [
        ("Бренд и язык", "7 версий дизайна: от редакционного премиума до терминала. Один тон: инженерный, без «инноваций и решений».",
         "готово к показу", GREEN),
        ("Воронка", "Услуги → кейс → заявка. Пять форм: расчёт, бронь, подбор железа, мерч, спонсорство.",
         "готово к заявкам", GREEN),
        ("Доказательство", "Кейсы с метриками, 16 вендоров, 23 SKU мерча, 5 собственных проектов-спутников.",
         "цифры заменить", RED),
    ]
    x = 72
    for k, (t, tx, st, col) in enumerate(items):
        card(ink, x, 292, 356, 208)
        ink.text(x + 24, 314, f"0{k+1}", size=11, color=COPPER, font="Golos-Bold", track=1.4)
        ink.text(x + 24, 338, t, size=19, color=CREAM, font="Golos-Bold")
        body(ink, x + 24, 374, tx, size=12.5, color=MUTED, width=308, leading=19)
        ink.hline(x + 24, 452, 308, color=LINE, lw=0.7)
        ink.text(x + 24, 464, st.upper(), size=9.5, color=col, font="Golos-Semi", track=1.3)
        x += 380

    ink.rect(72, 528, 1136, 104, fill=BG2, stroke=LINE, lw=0.8, r=12)
    ink.rect(72, 528, 4, 104, fill=RED, r=2)
    ink.text(100, 548, "Честно о демо-контенте", size=13, color=CREAM, font="Golos-Bold")
    body(ink, 100, 572,
         "На сайте сейчас заглушки: «120+ проектов», «9 лет опыта», вымышленные кейсы и цены. "
         "До первых продаж мы заменяем их на факты, а до этого не отправляем сайт клиенту. "
         "Показываем его как доказательство скорости и качества исполнения.", size=12.5, color=MUTED, width=1060, leading=19)

# ---------------------------------------------------------------- 03 проблема
def s03(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=LIGHT)
    chrome(c, ink, i, n, "03 · проблема", dark=False)
    kicker(ink, 72, 104, "что не сходится у рынка", color="#8A5B2C")
    h1(ink, 72, 126, "По отдельности не выживают.\nВместе — работают", size=44, color=INK, width=760)
    body(ink, 72, 232, "Боль клиента — не «нет кофе» или «нет сервера». Боль в том, что каждый "
         "из трёх бизнесов в одиночку упирается в потолок.", size=14, color=INK2, width=560, leading=22)

    pains = [
        ("Кофейня", "рост числа точек в РФ замедлился до +2% в год, в Москве — минус 3%. Аренда и ФОТ — 40–50% выручки, средний чек 463 ₽.",
         "за гостя надо бороться каждый день"),
        ("Пространство", "загрузка коворкингов в Москве 90–95%, свободных площадей в офисах меньше 4%. Новых объектов в 2025 — минимум за пять лет.",
         "гибридным командам негде сесть"),
        ("IT-подрядчик", "с 2026 года НДС 22%, порог УСН для НДС падает с 60 до 20 млн ₽, к 2028 — до 10 млн. Дробление подрядчиков заканчивается.",
         "малому бизнесу некому отвечать за контур"),
    ]
    y = 316
    for k, (t, tx, punch) in enumerate(pains):
        ink.vline(72, y + 4, 64, color="#D8CEBE", lw=0.8)
        ink.text(92, y, t, size=17, color=INK, font="Golos-Bold")
        body(ink, 92, y + 28, tx, size=12, color=INK2, width=520, leading=17)
        ink.text(632, y + 6, punch, size=11, color="#8A5B2C", font="Golos-Semi", width=180, leading=16)
        ink.hline(72, y + 88, 760, color="#DED5C6", lw=0.7)
        y += 104

    # правая панель: цена бездействия
    ink.rect(872, 96, 336, 540, fill="#EDE4D6", r=16)
    ink.text(900, 120, "Цена бездействия", size=17, color=INK, font="Golos-Bold")
    body(ink, 900, 150, "Считаем на нашей точке 240 м² — без гостей, заказов и выручки:",
         size=11.5, color=INK2, width=282, leading=17)
    ink.text(900, 200, M.rub(M.FIXED), size=34, color=INK, font="Golos-Black", track=-0.8)
    ink.text(900, 244, "постоянных расходов в месяц", size=11.5, color=INK2, font="Golos")
    ink.hline(900, 272, 280, color="#D5C9B7", lw=0.7)
    rows = [("Аренда и коммуналка", M.rub(M.RENT + M.UTILITIES)),
            ("ФОТ со взносами", M.rub(M.PAYROLL)),
            ("Маркетинг", M.rub(M.MARKETING)),
            ("Прочее", M.rub(M.OTHER))]
    y = 290
    for k, v in rows:
        ink.text(900, y, k, size=11.5, color=INK2, font="Golos")
        ink.text(1180, y, v, size=11.5, color=INK, font="Golos-Semi", align="right", width=0)
        y += 26
    ink.hline(900, y + 4, 280, color="#D5C9B7", lw=0.7)
    ink.hline(900, y + 16, 280, color="#D5C9B7", lw=0.7)
    ink.text(900, y + 30, "Вывод", size=9.5, color="#8A5B2C", font="Golos-Bold", track=1.4)
    body(ink, 900, y + 48, "Нужен один адрес, который кормит, даёт рабочие места и продаёт IT — "
         "тогда постоянные расходы делятся на четыре выручки.", size=11, color=INK, width=282, leading=16)
    ink.text(872, 650, "Источники: «Чек Индекс» / ОФД, РБК, CORE.XP, «БестЪ», Forbes",
             size=8.2, color="#6F6555", font="Golos")

# ---------------------------------------------------------------- 04 решение
def s04(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=BG)
    ink.image(str(IMG / "solution.jpg"), 612, 64, 668, H - 128)
    chrome(c, ink, i, n, "04 · решение")
    kicker(ink, 72, 104, "что такое coffeeIT")
    h1(ink, 72, 126, "Один адрес, четыре потока,\nкаждый кормит другой", size=42, width=600)
    body(ink, 72, 232, "coffeeIT — это не кофейня и не агентство. Это место, где IT-команда "
         "работает рядом с клиентом, а клиент возвращается за чашкой и остаётся за проектом.",
         size=14, color=MUTED, width=520, leading=22)

    flows = [
        ("Кофейня", "220 чеков в день · 450 ₽", "47% выручки", COPPER),
        ("Пространство", "12 резидентов · 3 переговорки · митапы", "19% выручки", GOLD),
        ("IT-студия", "3 проекта · 3 контракта SLA", "30% выручки", GREEN),
        ("Мерч и спонсорство", "125 единиц в месяц · 5 партнёров", "4% выручки", "#8FA4C7"),
    ]
    y = 330
    for t, meta, share, col in flows:
        ink.rect(72, y + 4, 8, 8, fill=col, r=4)
        ink.text(94, y, t, size=17, color=CREAM, font="Golos-Bold")
        ink.text(94, y + 24, meta, size=11, color=MUTED, font="Golos")
        ink.text(560, y + 6, share, size=11, color=col, font="Golos-Semi", align="right", width=0)
        ink.hline(72, y + 48, 500, color=LINE, lw=0.6)
        y += 62
    ink.text(72, 596, "Выручка на плановой мощности 12-го месяца — 6,3 млн ₽/мес. Детали — слайды 09 и 11.",
             size=10, color=DIM, font="Golos")


# ---------------------------------------------------------------- 05 инсайт
def s05(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=BG2)
    chrome(c, ink, i, n, "05 · инсайт")
    ink.image(str(IMG / "insight.jpg"), 0, 64, 430, H - 128)

    kicker(ink, 470, 112, "главная мысль")
    ink.text(470, 134, "«Мы не открываем кофейню.", size=34, color=MUTED, font="Golos-Bold", track=-0.8)
    ink.text(470, 182, "Мы покупаем поток,", size=34, color=MUTED, font="Golos-Bold", track=-0.8)
    ink.text(470, 230, "который платит четыре раза».", size=34, color=CREAM, font="Golos-Bold", track=-0.8)

    body(ink, 470, 302, "Обычная кофейня зарабатывает один раз — на чашке. Пространство погибает "
         "от низкой загрузки. IT-подрядчик без офиса теряет длинные проекты. "
         "coffeeIT считает иначе: одно место работы даёт четыре независимых потока, и если один "
         "просядет, остальные удержат точку.", size=13.5, color=MUTED, width=680, leading=21)

    rows = [
        ("Один раз", "на чашке", "гость, который заходит каждое утро"),
        ("Второй", "на рабочем месте", "резидент, который платит за месяц вперёд"),
        ("Третий", "на проекте", "компания, которой нужен IT-контур"),
        ("Четвёртый", "на мерче и партнёрах", "тот, кто платит за бренд и аудиторию"),
    ]
    y = 430
    for k, (num, what, who) in enumerate(rows):
        ink.text(470, y, num, size=15, color=COPPER, font="Golos-Black", track=-0.3)
        ink.text(660, y, what, size=15, color=CREAM, font="Golos-Semi")
        ink.text(880, y + 2, who, size=11.5, color=DIM, font="Golos")
        ink.hline(470, y + 30, 738, color=LINE, lw=0.6)
        y += 46
    ink.text(470, 640, "Инсайт: клиент приходит за одной услугой, остаётся за тремя — и приводимый гость "
             "не стоит нам ничего.", size=11, color=GOLD, font="Golos-Semi")

# ---------------------------------------------------------------- 06 почему сейчас
def s06(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=BG)
    chrome(c, ink, i, n, "06 · почему сейчас")
    kicker(ink, 72, 104, "окно открыто в 2026 году")
    h1(ink, 72, 126, "Три рынка одновременно\nподняли планку", size=44, width=900)
    ink.text(940, 126, "И одновременно освободили место\nдля маленького игрока: «ещё одна\nкофейня» и дробление подрядчиков\nбольше не работают.",
             size=12.5, color=MUTED, font="Golos", leading=20, width=280)

    items = [
        ("01", "IT-услуги — 1,05 трлн ₽", "IT-услуги и заказная разработка выросли на 14% за год; кибербезопасность — на 52%, облака — на 38%.",
         "TAdviser, Б1, 2025"),
        ("02", "Кофейни растут, но медленнее", "на июль 2024 в РФ 12 970 кофеен (+924 за год); в Москве число точек сократилось на 3%, ниша «открыть ещё одну кофейню» отработана.",
         "РБК Исследования рынков, «Чек Индекс»"),
        ("03", "Рабочим местам нужен формат", "заполняемость коворкингов в Москве 90–95%, в офисах свободно меньше 4% площадей, новых объектов в 2025 — минимум за пять лет.",
         "CORE.XP, «БестЪ»"),
        ("04", "Налоговая реформа", "НДС 22% с 2026 года; порог УСН для НДС: 20 млн ₽ в 2026, 15 млн в 2027, 10 млн в 2028. Дробление схем больше не работает.",
         "Forbes / Госдума, ноябрь 2025"),
    ]
    y = 238
    for num, t, tx, src in items:
        ink.text(72, y, num, size=13, color=COPPER, font="Golos-Black", track=0.4)
        ink.text(126, y - 3, t, size=17.5, color=CREAM, font="Golos-Bold")
        body(ink, 126, y + 28, tx, size=12, color=MUTED, width=520, leading=18)
        ink.text(760, y - 1, src, size=8.8, color=DIM, font="Golos", width=376)
        ink.hline(72, y + 80, 1136, color=LINE, lw=0.6)
        y += 96

    ink.text(72, 636, "Вывод: рынки растут, но «просто кофейня» и «просто подрядчик» больше не растут. "
             "Формат, который соединяет спрос на рабочее место, кофе и IT, — ещё мало кто занял.",
             size=12, color=GOLD, font="Golos-Semi", width=1080)

# ---------------------------------------------------------------- 07 рынок
def s07(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=LIGHT)
    chrome(c, ink, i, n, "07 · рынок", dark=False)
    kicker(ink, 72, 104, "сколько это в деньгах", color="#8A5B2C")
    h1(ink, 72, 126, "Четыре рынка — 6 трлн ₽", size=44, color=INK, width=700)
    body(ink, 72, 186, "Каждый поток продаётся отдельно, но на одном адресе экономика общая: "
         "аренда, ФОТ и маркетинг делятся на четыре выручки, а не на одну.", size=13, color=INK2, width=640, leading=20)

    rows = [
        ("Кофейни и кафе-кондитерские", "248", "млрд ₽ · 2025, оценка", "216,3 млрд в 2024 · РБК"),
        ("IT-услуги и заказная разработка", "1,05", "трлн ₽ · 2025 (+14%)", "TAdviser / Б1"),
        ("IT-рынок, всего", "4,9", "трлн ₽ · 2025 (+13%)", "IT-Stat, Минцифры"),
        ("Коворкинги и гибкие офисы", "91", "тыс. рабочих мест · 865 объектов", "«БестЪ», 2025"),
    ]
    y = 250
    for t, v, meta, src in rows:
        ink.text(72, y + 6, t, size=14, color=INK, font="Golos-Bold")
        ink.text(560, y - 8, v, size=30, color=INK, font="Golos-Black", track=-0.8, align="right", width=90)
        ink.text(672, y + 2, meta, size=11, color=INK2, font="Golos")
        ink.text(672, y + 20, src, size=9.5, color="#6F6555", font="Golos")
        ink.hline(72, y + 44, 720, color="#DED5C6", lw=0.7)
        y += 76

    # правая панель — воронка рынка
    ink.rect(880, 240, 328, 340, fill="#FFFFFF", stroke="#DFD6C7", lw=0.8, r=14)
    ink.text(908, 260, "Наш адрес в рынке", size=13, color=INK, font="Golos-Bold")
    body(ink, 908, 288, "Не «вся Москва», а 14 тыс. занятых на «Флаконе» и в радиусе"
         " 800 метров: дизайн-завод, офисы, резиденты.", size=10.5, color=INK2, width=272, leading=16)
    fun = [("TAM", "≈ 6 трлн ₽", "четыре рынка РФ"),
           ("SAM", "≈ 120 млрд ₽", "креативные кластеры Москвы"),
           ("SOM", "75–95 млн ₽", "один адрес, год 2")]
    y2 = 350
    for k, v, d in fun:
        ink.text(908, y2, k, size=10, color="#8A5B2C", font="Golos-Bold", track=1.4)
        ink.text(908, y2 + 16, v, size=20, color=INK, font="Golos-Black", track=-0.6)
        ink.text(1090, y2 + 22, d, size=9.5, color=INK2, font="Golos")
        ink.hline(908, y2 + 50, 272, color="#E8E0D2", lw=0.6)
        y2 += 66
    ink.text(72, 618, "SOM считан снизу: 240 м² · 26 тыс. ₽ выручки на м² · 12 месяцев плановой мощности. "
             "Оценки рынка — внешние; диапазоны источников: кофейни 216–308 млрд ₽, IT-услуги 1,05–1,4 трлн ₽.",
             size=9, color="#6F6555", font="Golos", width=1136, leading=13)

# ---------------------------------------------------------------- 08 продукт: 240 м²
def s08(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=BG)
    chrome(c, ink, i, n, "08 · продукт")
    kicker(ink, 72, 104, "240 м² на «Флаконе»")
    h1(ink, 72, 126, "Кофейня спереди,\nстудия и тишина сзади", size=42, width=620)
    body(ink, 72, 232, "Гость видит бар. Резидент — своё место. Клиент студии приходит на встречу "
         "и остаётся за чашкой. Одна дверь обслуживает всех трёх.", size=13.5, color=MUTED, width=560, leading=21)

    zones = [
        ("Бар и обжарка", "60 м² · 2 бариста · 220 чеков", "Кофейня", COPPER, 0.47),
        ("Рабочая зона", "60 м² · 24 места · Wi-Fi 6", "Пространство", GOLD, 0.19),
        ("Переговорки", "3 комнаты на 4–10 человек", "Пространство", GOLD, 0.0),
        ("Зал событий", "60 человек · проектор · стрим", "Митапы и партнёры", "#8FA4C7", 0.04),
        ("Шоурум", "серверы и сеть до закупки", "IT-студия", GREEN, 0.30),
    ]
    y = 300
    for t, meta, tag_, col, share in zones:
        ink.rect(72, y + 2, 6, 34, fill=col, r=3)
        ink.text(92, y, t, size=15.5, color=CREAM, font="Golos-Semi")
        ink.text(92, y + 20, meta, size=10.5, color=MUTED, font="Golos")
        ink.text(560, y + 8, tag_, size=9.5, color=col, font="Golos-Semi", align="right", width=0)
        ink.hline(72, y + 50, 500, color=LINE, lw=0.6)
        y += 62

    # план помещения — схема
    ink.rect(650, 226, 558, 320, fill=BG2, stroke=LINE, lw=0.9, r=12)
    px, py, pw, ph = 678, 256, 502, 260
    ink.rect(px, py, pw, ph, fill="#151110", stroke="#3A322A", lw=1, r=3)
    zones = [
        (px + 8,   py + 8,   168, 106, "Бар",          "60 м² · 220 чеков", COPPER, 0.26),
        (px + 8,   py + 122, 168, 130, "Рабочая зона", "24 места · Wi-Fi 6", GOLD, 0.22),
        (px + 184, py + 8,   150, 244, "Студия",       "9 человек, 3 переговорки", GREEN, 0.18),
        (px + 342, py + 8,   152, 112, "Зал событий",  "60 человек · стрим", "#8FA4C7", 0.22),
        (px + 342, py + 128, 152, 124, "Шоурум",       "серверы, сеть", "#9C8B76", 0.34),
    ]
    for zx, zy, zw, zh, name, meta, col, a in zones:
        ink.rect(zx, zy, zw, zh, fill=col, alpha=a, r=5)
        ink.rect(zx, zy, zw, zh, stroke=col, lw=0.6, r=5)
        ink.text(zx + 12, zy + 10, name, size=12.5, color=INK, font="Golos-Bold")
        ink.text(zx + 12, zy + 30, meta, size=9, color="#3B332B", font="Golos", width=zw - 20, leading=12)
    ink.text(px + 8, py + ph + 6, "вход с «Флакона»", size=8.5, color=DIM, font="Golos")
    ink.text(px + pw - 4, py + ph + 6, "240 м², 1 этаж", size=8.5, color=DIM, font="Golos", align="right", width=0)

    # цифры под схемой
    stats = [("26,2 тыс. ₽", "выручки на м² в месяц"),
             ("4", "потока с одной аренды"),
             ("58%", "выручки — не кофе")]
    x = 650
    for v, t in stats:
        ink.text(x, 574, v, size=26, color=CREAM, font="Golos-Black", track=-0.8)
        ink.text(x, 612, t, size=10, color=MUTED, font="Golos")
        x += 200

# ---------------------------------------------------------------- 09 бизнес-модель
def s09(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=BG)
    chrome(c, ink, i, n, "09 · бизнес-модель")
    kicker(ink, 72, 104, "как зарабатываем")
    h1(ink, 72, 126, "Четыре потока, восемь источников\nи один договор", size=40, width=760)
    body(ink, 72, 224, "Цены — из сайта и рынка Москвы. Маржинальность — расчётная, "
         "по каждой строке отдельно: кофе не дотирует IT, а IT не дотирует кофе.",
         size=12.5, color=MUTED, width=640, leading=20)

    cols = ["Поток", "Продукт", "Цена", "Переменные", "Вклад", "В месяц"]
    xs = [72, 250, 470, 610, 760, 900]
    ink.text(72, 272, cols[0].upper(), size=9, color=DIM, font="Golos-Semi", track=1.4)
    for j, cname in enumerate(cols[1:], 1):
        ink.text(xs[j], 272, cname.upper(), size=9, color=DIM, font="Golos-Semi", track=1.4)
    ink.hline(72, 292, 1136, color=LINE, lw=0.8)

    y = 302
    for r in M.FULL["rows"]:
        stream = {"coffee": "Кофейня", "member": "Пространство", "daypass": "Пространство",
                  "room": "Пространство", "event": "События", "project": "IT-студия",
                  "retainer": "IT-студия", "merch": "Мерч"}[r["key"]]
        ink.text(72, y + 3, r["name"], size=11.5, color=CREAM, font="Golos-Med")
        ink.text(72, y + 18, stream, size=8.6, color=DIM, font="Golos")
        ink.text(xs[2], y + 3, M.rub(r["price"]), size=11.5, color=CREAM, font="Golos")
        ink.text(xs[3], y + 3, f"−{int(round(r['var']*100))}%", size=11.5, color=MUTED, font="Golos")
        ink.text(xs[4], y + 3, M.pct(r["margin"]), size=11.5, color=GOLD, font="Golos-Semi")
        ink.text(xs[5], y + 3, f"{M.num(r['qty'])} ×", size=11.5, color=MUTED, font="Golos")
        ink.text(1180, y + 3, M.rub(r["rev"]), size=11.5, color=CREAM, font="Golos-Semi", align="right", width=0)
        ink.hline(72, y + 29, 1136, color=LINE, lw=0.5)
        y += 33

    ink.hline(72, y + 4, 1136, color=MUTED, lw=1)
    ink.text(72, y + 14, "Итого выручка в месяц", size=12.5, color=CREAM, font="Golos-Bold")
    ink.text(1180, y + 10, M.rub(M.FULL["rev"]), size=16, color=CREAM, font="Golos-Black", align="right", width=0)

    ink.rect(72, 616, 1136, 36, fill=BG2, stroke=LINE, lw=0.6, r=8)
    ink.text(88, 628, f"Валовая маржа 68,5%  ·  постоянные расходы {M.rub(M.FIXED)}/мес  ·  "
             f"EBITDA {M.rub(M.FULL['ebitda'])} ({M.pct(M.FULL['margin'],1)})  ·  "
             f"порог безубыточности {M.rub(M.BREAKEVEN_REV)}/мес  ·  запас {M.pct(M.SAFETY)}",
             size=9.2, color=GOLD, font="Golos-Med")

# ---------------------------------------------------------------- 10 запуск: 13 млн ₽
def s10(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=BG)
    chrome(c, ink, i, n, "10 · смета запуска")
    kicker(ink, 72, 104, "сколько нужно на старт")
    ink.text(72, 126, M.mln(M.CAPEX_TOTAL, 0), size=68, color=CREAM, font="Golos-Black", track=-2.2)
    ink.text(72 + Inker.measure(M.mln(M.CAPEX_TOTAL, 0), "Golos-Black", 68, -2.2) + 16, 150,
             "на запуск точки 240 м²", size=15, color=MUTED, font="Golos")
    body(ink, 72, 210, "Это не «деньги на идею»: каждая строка — конкретное оборудование и работа. "
         "Оборотный капитал рассчитан на выход в плюс: 4,5 млн ₽ покрывают накопленный минус "
         "месяцев 1–6 (" + M.mln(abs(M.CASH["trough"])) + " ₽) с запасом " + M.mln(M.CASH["headroom"]) + ".", size=12, color=MUTED, width=560, leading=19)

    y = 300
    for name, value, note in M.CAPEX:
        pct_ = value / M.CAPEX_TOTAL
        cap_note = note
        ink.text(72, y, name, size=12.5, color=CREAM, font="Golos-Med")
        ink.text(72, y + 18, cap_note, size=9.5, color=DIM, font="Golos")
        ink.text(600, y + 2, M.rub(value), size=12.5, color=CREAM, font="Golos-Semi", align="right", width=0)
        bar = 180 * pct_
        ink.rect(620, y + 4, 180, 8, fill="#241D17", r=4)
        ink.rect(620, y + 4, max(6, bar), 8, fill=COPPER, r=4)
        ink.hline(72, y + 38, 728, color=LINE, lw=0.5)
        y += 46
    ink.hline(72, y + 2, 728, color=MUTED, lw=1)
    ink.text(72, y + 14, "Итого", size=13, color=CREAM, font="Golos-Bold")
    ink.text(600, y + 12, M.rub(M.CAPEX_TOTAL), size=15, color=GOLD, font="Golos-Black", align="right", width=0)

    # правая колонка
    ink.rect(856, 240, 352, 300, fill=PANEL, stroke=LINE, lw=0.8, r=14)
    ink.text(880, 260, "Что покупает инвестор", size=13, color=CREAM, font="Golos-Bold")
    bullets = [
        ("Точку", "готовый адрес с баром, студией и залом на 60 человек"),
        ("Команду", "12 человек, включая двух инженеров и управляющего"),
        ("Товар", "сайт, бренд, мерч, меню и упаковка уже готовы"),
        ("Запас", "оборотный капитал на путь к нулю: минус месяцев 1–6 покрыт"),
    ]
    y2 = 292
    for k, v in bullets:
        ink.text(880, y2, k, size=11.5, color=COPPER, font="Golos-Bold")
        body(ink, 880, y2 + 18, v, size=10.5, color=MUTED, width=300, leading=15)
        y2 += 60
    ink.text(72, 646, "План, а не факт: смета уточняется после выбора помещения и КП подрядчиков.",
             size=9.5, color=DIM, font="Golos")

# ---------------------------------------------------------------- 11 экономика месяца
def s11(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=BG2)
    chrome(c, ink, i, n, "11 · экономика месяца")
    kicker(ink, 72, 104, "что происходит на 12-й месяц")
    h1(ink, 72, 124, "6,3 млн выручки →\n1,5 млн EBITDA", size=38, width=560)
    body(ink, 72, 226, "Плановая мощность: 220 чеков в день, 12 резидентов,\n3 переговорки, 2 события, 3 IT-проекта, 3 контракта SLA.",
         size=12, color=MUTED, width=540, leading=19)

    # столбики выручки по потокам
    streams = [
        ("Кофейня", 2_970_000, COPPER),
        ("Пространство", 1_209_000, GOLD),
        ("IT-студия", 1_860_000, GREEN),
        ("Мерч", 250_000, "#8FA4C7"),
    ]
    base_y = 508
    maxv = max(s[1] for s in streams)
    x = 72
    for name, v, col in streams:
        hgt = 180 * v / maxv
        ink.rect(x, base_y - hgt, 96, hgt, fill=col, alpha=0.9, r=4)
        ink.text(x, base_y - hgt - 24, M.mln(v), size=13, color=CREAM, font="Golos-Bold")
        ink.text(x, base_y + 10, name, size=10.5, color=CREAM, font="Golos-Med")
        ink.text(x, base_y + 26, M.pct(v / M.FULL["rev"]), size=9.5, color=MUTED, font="Golos")
        x += 122
    ink.hline(72, base_y, 560, color=MUTED, lw=0.9)
    ink.text(72, base_y + 56, "Выручка по потокам, ₽/мес", size=9.5, color=DIM, font="Golos")

    # P&L справа
    ink.rect(664, 96, 544, 528, fill=PANEL, stroke=LINE, lw=0.8, r=14)
    ink.text(692, 116, "P&L месяца, плановая мощность", size=12, color=MUTED, font="Golos-Semi")
    rows = [
        ("Выручка", M.rub(M.FULL["rev"]), CREAM, True),
        ("Переменные (сырьё, подряд, закупка)", "−" + M.rub(M.FULL["cogs"]), MUTED, False),
        ("Валовая маржа", M.rub(M.FULL["contribution"]), GOLD, True),
        ("Постоянные расходы", "−" + M.rub(M.FIXED), MUTED, False),
        ("Эквайринг и комиссии", "−" + M.rub(M.FULL["acq"]), MUTED, False),
    ]
    y = 152
    for name, val, col, strong in rows:
        ink.text(692, y, name, size=11.5, color=CREAM if strong else MUTED,
                 font="Golos-Semi" if strong else "Golos")
        ink.text(1180, y, val, size=12.5 if strong else 11.5, color=col,
                 font="Golos-Bold" if strong else "Golos", align="right", width=0)
        ink.hline(692, y + 22, 488, color=LINE, lw=0.6)
        y += 40
    ink.rect(680, y + 2, 512, 74, fill=BG, r=10)
    ink.text(700, y + 18, "EBITDA", size=12, color=MUTED, font="Golos-Semi")
    ink.text(1180, y + 8, M.rub(M.FULL["ebitda"]), size=26, color=CREAM, font="Golos-Black",
             align="right", width=0)
    ink.text(700, y + 44, f"{M.pct(M.FULL['margin'],1)} выручки · окупаемость вложений на {M.PAYBACK_MONTH}-м месяце",
             size=10, color=GOLD, font="Golos")
    # мини-спарклайн 12 месяцев
    ink.text(692, 512, "EBITDA по месяцам, ₽ · от −1,4 млн к +1,5 млн", size=9.2, color=DIM, font="Golos")
    xs, ys = 692, 540
    w, hgt = 488, 62
    vals = [p["ebitda"] for p in M.PLAN]
    vmax, vmin = max(vals), min(vals)
    zero_f = (0 - vmin) / (vmax - vmin)
    ink.hline(xs, ys + hgt * (1 - zero_f), w, color="#4A3E33", lw=0.7)
    pts = []
    for k, v in enumerate(vals):
        px = xs + k * w / (len(vals) - 1)
        py = ys + hgt * (1 - (v - vmin) / (vmax - vmin))
        pts.append((px, py))
    c.saveState(); c.setStrokeColor(Hexc(COPPER)); c.setLineWidth(1.5)
    pth = c.beginPath(); pth.moveTo(pts[0][0], H - pts[0][1])
    for px, py in pts[1:]:
        pth.lineTo(px, H - py)
    c.drawPath(pth)
    c.setFillColor(Hexc(COPPER))
    for px, py in pts[::3] + [pts[-1]]:
        c.circle(px, H - py, 2.2, stroke=0, fill=1)
    c.restoreState()
    for k in (0, 5, 11):
        ink.text(pts[k][0] - 6, ys + hgt + 8, f"{k+1}-й", size=8.5, color=DIM, font="Golos")
    ink.text(692, ys + hgt + 22, "безубыточность с 6-го месяца, дальше — рост", size=8.5, color=DIM, font="Golos")

def Hexc(s):
    from reportlab.lib.colors import HexColor
    return HexColor(s)

# ---------------------------------------------------------------- 12 сценарии
def s12(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=LIGHT)
    chrome(c, ink, i, n, "12 · сценарии", dark=False)
    kicker(ink, 72, 104, "что если не по плану", color="#8A5B2C")
    h1(ink, 72, 126, "Даже осторожный сценарий\nприносит прибыль", size=42, color=INK, width=700)
    body(ink, 72, 226, "Три расчёта при разной загрузке. Переменные расходы двигаются вместе с выручкой, "
         "постоянные — нет: именно это даёт точке запас прочности.", size=12.5, color=INK2, width=620, leading=20)

    cards = M.SCENARIOS
    x = 72
    for k, s in enumerate(cards):
        highlight = s["label"] == "План"
        fill = "#FFFFFF" if highlight else "#EFE7D9"
        card(ink, x, 300, 350, 262, fill=fill, stroke="#D9CFBF" if not highlight else "#C98A4B", r=14)
        if highlight:
            ink.rect(x, 300, 350, 4, fill=COPPER, r=2)
        ink.text(x + 24, 320, s["label"], size=13, color=INK, font="Golos-Bold")
        ink.text(x + 24, 350, M.rub(s["rev"]), size=26, color=INK, font="Golos-Black", track=-0.8)
        ink.text(x + 24, 388, "выручка в месяц", size=10, color=INK2, font="Golos")
        ink.hline(x + 24, 412, 302, color="#DED5C6", lw=0.7)
        ink.text(x + 24, 428, M.rub(s["ebitda"]), size=22, color=INK, font="Golos-Black", track=-0.6)
        ink.text(x + 24, 462, f"EBITDA · {M.pct(s['margin'],1)}", size=10, color=INK2, font="Golos")
        ink.text(x + 24, 496, "Возврат вложений: " + str(s["payback"]).replace("None", "—") + " мес",
                 size=10, color="#8A5B2C" if highlight else INK2, font="Golos-Med")
        x += 378

    # чувствительность
    ink.text(72, 600, "Чувствительность: та же точка, три удара по спросу", size=11, color=INK2, font="Golos-Semi")
    cards2 = [
        ("Выручка −10%", M.FULL["ebitda"] + 0.10 * M.FULL["rev"] * (M.FULL["cm"] - M.ACQUIRING)),
        ("План", M.FULL["ebitda"]),
        ("Чек −10% (кофе)", M.FULL["ebitda"] - 0.10 * 0.47 * M.FULL["rev"] * (M.FULL["cm"] - M.ACQUIRING)),
    ]
    x = 72
    for name, val in cards2:
        ink.rect(x, 620, 330, 30, fill="#EFE7D9", stroke="#DFD5C5", lw=0.6, r=6)
        ink.text(x + 12, 627, name, size=10, color=INK2, font="Golos")
        ink.text(x + 318, 625, M.rub(val), size=11, color=INK, font="Golos-Bold", align="right", width=0)
        x += 348
    ink.text(72, 662, "Порог безубыточности — 4,0 млн ₽ выручки в месяц, это 64% плана: "
             "падение спроса на треть не уводит точку в минус.", size=9.6, color="#8A5B2C", font="Golos-Semi")

# ---------------------------------------------------------------- 13 конкуренты
def s13(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=BG)
    chrome(c, ink, i, n, "13 · конкуренты")
    kicker(ink, 72, 104, "с кем сравнивают")
    h1(ink, 72, 126, "Все делают одну вещь хорошо.\nМы — четыре сразу", size=40, width=760)
    body(ink, 72, 220, "В Москве 5 960 точек с кофе, 900 коворкингов и сотни студий. "
         "Никто не соединяет их в один адрес с общей арендой и общей аудиторией.",
         size=12.5, color=MUTED, width=700, leading=20)

    cols = [("", 72, 250), ("Кофейня\nна районе", 322, 160), ("Коворкинг", 502, 160),
            ("IT-студия", 682, 160), ("coffeeIT", 862, 200)]
    for name, x, w in cols:
        if name:
            ink.text(x, 306, name, size=11, color=MUTED if name != "coffeeIT" else COPPER,
                     font="Golos-Semi", width=w, leading=15)
    ink.hline(72, 356, 1040, color=LINE, lw=0.8)

    features = [
        ("Кофе и обжарка", "да", "иногда", "нет", "да"),
        ("Регулярный поток гостей", "да", "слабый", "нет", "да"),
        ("Рабочие места и переговорки", "нет", "да", "нет", "да"),
        ("IT-компетенция in-house", "нет", "нет", "да", "да"),
        ("Одна аренда на четыре выручки", "нет", "нет", "нет", "да"),
        ("Сообщество: митапы, турниры, мерч", "редко", "редко", "нет", "да"),
    ]
    y = 376
    for name, a, b, d, e in features:
        ink.text(72, y, name, size=12, color=CREAM, font="Golos-Med")
        for val, x in ((a, 322), (b, 502), (d, 682)):
            col = MUTED if val in ("да",) else DIM
            ink.text(x, y, val, size=11.5, color=col, font="Golos")
        ink.text(862, y, e, size=11.5, color=GOLD, font="Golos-Bold")
        ink.hline(72, y + 24, 1040, color=LINE, lw=0.5)
        y += 40
    ink.text(72, 620, "Мы не выигрываем у Coffee Like в скорости выдачи и у коворкингов — в цене метра. "
             "Мы выигрываем там, где клиенту нужны сразу все четыре вещи и один ответственный.",
             size=11, color=GOLD, font="Golos-Semi", width=1040)

# ---------------------------------------------------------------- 14 дорожная карта + команда
def s14(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=BG)
    chrome(c, ink, i, n, "14 · план и команда")
    kicker(ink, 72, 104, "что и когда")
    h1(ink, 72, 126, "18 месяцев: от ремонта\nдо второго адреса", size=38, width=620)
    body(ink, 72, 214, "Порядок работ: сначала капитал, затем адрес, затем команда. "
         "Открытие — в мае 2027, операционный ноль — в ноябре 2027.", size=12, color=MUTED, width=600, leading=19)

    steps = [
        ("0–3 мес", "Сборка капитала и площадки", "Закрытие раунда, юрлицо, выбор помещения, договор аренды с каникулами на ремонт.", COPPER),
        ("3–8 мес", "Ремонт и закупка", "240 м², вентиляция, оборудование, мебель, сети, шоурум. Найм управляющего и бариста.", COPPER),
        ("8–12 мес", "Открытие и 220 чеков", "Запуск бара и рабочих мест, митапы, первые резиденты. Выход на 64% плана — ноль в ноябре 2027.", GOLD),
        ("12–24 мес", "Плановая мощность", "6,3 млн ₽/мес, EBITDA 1,5 млн ₽, возврат вложений на 20-м месяце.", GOLD),
        ("24–36 мес", "Второй адрес", "Тираж формата: вторая точка в другом кластере и продажа франшизы по модели «кофейня + студия».", GREEN),
    ]
    y = 268
    for k, (when, what, tx, col) in enumerate(steps):
        ink.rect(72, y + 3, 10, 10, fill=col, r=5)
        ink.text(96, y, when, size=10.5, color=col, font="Golos-Bold", track=0.6)
        ink.text(96, y + 20, what, size=14, color=CREAM, font="Golos-Semi")
        ink.text(330, y + 2, tx, size=10.5, color=MUTED, font="Golos", width=330, leading=15)
        ink.hline(72, y + 44, 588, color=LINE, lw=0.5)
        y += 56

    # команда
    ink.image(str(IMG / "team.jpg"), 664, 228, 544, 280)
    ink.rect(664, 228, 4, 280, fill=GOLD)
    ink.text(664, 206, "За стойкой и за кодом", size=10, color=GOLD, font="Golos-Semi", track=1.4)
    card(ink, 664, 520, 544, 100, fill=PANEL, r=12)
    ink.text(688, 538, "Кто работает", size=12, color=CREAM, font="Golos-Bold")
    cols = [("5", "кофейня\nи кухня"), ("5", "студия\nи продажи"), ("2", "управление\nи хозчасть")]
    x = 688
    for v, t in cols:
        ink.text(x, 558, v, size=26, color=GOLD, font="Golos-Black", track=-0.8)
        ink.text(x + Inker.measure(v, "Golos-Black", 26, -0.8) + 8, 564, t.replace("\n", " "),
                 size=9.5, color=MUTED, font="Golos")
        x += 180
    body(ink, 72, 594, "Четыре бариста и повар держат бар и кухню; два инженера, дизайнер, менеджер проектов и SMM — студию; "
         "управляющий и хозчасть закрывают остальное. ФОТ 1,75 млн ₽ со взносами — 28% выручки планового месяца.",
         size=10, color=MUTED, width=560, leading=15)

# ---------------------------------------------------------------- 15 методология и честность
def s15(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=BG2)
    chrome(c, ink, i, n, "15 · честность цифр")
    kicker(ink, 72, 104, "как читать эту деку")
    h1(ink, 72, 126, "У нас нет оборота.\nПоэтому цифры — план", size=40, width=700)
    body(ink, 72, 226, "Мы только запускаемся: нет выручки, нет клиентов, нет истории. Всё, что ниже, — "
         "расчёт по рыночным допущениям и открытым источникам. Мы намеренно не выдаём его за факт: "
         "инвестор, который проверит цифры, должен увидеть, что они проверяемы.", size=12.5, color=MUTED, width=680, leading=20)

    blocks = [
        ("Что реально есть", ["Сайт: 7 версий, 8 разделов, формы, корзина", "Бренд, меню, мерч, 5 проектов-спутников",
                              "Финансовая модель с открытыми допущениями", "Выбранный формат и пул локаций («Флакон»)"]),
        ("Чего ещё нет", ["Юрлица, счёта и договора аренды", "Команды в найме и поставщиков", "Выручки, гостей, кейсов",
                          "Лицензий и согласий по 152-ФЗ"]),
        ("Что нужно сделать до сделки", ["Убрать демо-цифры с сайта и поставить реальные", "Проверить экономику на пилотной точке",
                                         "Собрать письма о намерениях от 3–5 компаний", "Получить КП по оборудованию и ремонту"]),
    ]
    x = 72
    for k, (t, items) in enumerate(blocks):
        col = [GREEN, RED, GOLD][k]
        card(ink, x, 330, 360, 250, fill=PANEL, r=12)
        ink.rect(x, 330, 360, 3, fill=col, r=2)
        ink.text(x + 22, 348, t, size=13, color=CREAM, font="Golos-Bold")
        yy = 378
        for it in items:
            ink.rect(x + 22, yy + 5, 4, 4, fill=col, r=2)
            ink.text(x + 34, yy, it, size=10.5, color=MUTED, font="Golos", width=300, leading=14)
            yy += 34
        x += 380
    ink.text(72, 606, "Методика: выручка = количество × цена по каждому из 8 источников; переменные расходы — 31% в кофе, "
             "8% в пространстве, 45% в IT, 50% в мерче; постоянные — 2,67 млн ₽/мес; эквайринг 2%. "
             "Источники — РБК, TAdviser/Б1, CORE.XP, «БестЪ», Forbes, mos.ru. Проверки: запас покрывает кассовый минимум "
             "(−" + M.mln(abs(M.CASH["trough"])) + " ₽ на 5-м месяце), безубыточность — 64% плана.", size=9, color=DIM, font="Golos", width=1080, leading=13)

# ---------------------------------------------------------------- 16 следующий шаг
def s16(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=BG)
    ink.image(str(IMG / "brand.jpg"), 812, 64, 468, H - 128)
    chrome(c, ink, i, n, "16 · следующий шаг")
    kicker(ink, 72, 120, "что нужно от вас")
    ink.text(72, 148, "Один разговор", size=64, color=CREAM, font="Golos-Black", track=-2.0)
    ink.text(72, 222, "и один месяц на пилот", size=64, color=GOLD, font="Golos-Black", track=-2.0)
    body(ink, 72, 320, "Предлагаем не «поверить в идею», а проверить её: 30 минут — разбор модели и допущений, "
         "месяц — пилотный запуск на площадке «Флакона» без капитальных вложений. "
         "Если цифры сойдутся — обсуждаем раунд 13 млн ₽ на полноценную точку.", size=13.5, color=MUTED, width=680, leading=22)

    steps = [("01", "30 минут", "разбор модели, ответы на вопросы, доступ к финмодели"),
             ("02", "2 недели", "due diligence: КП подрядчиков, договор аренды, письма о намерениях"),
             ("03", "1 месяц", "пилот: кофе-точка и рабочие места на площадке партнёра"),
             ("04", "Решение", "вход в раунд 13 млн ₽ и запуск точки на 240 м²")]
    x = 72
    for k, (n_, t, tx) in enumerate(steps):
        ink.text(x, 436, n_, size=10.5, color=COPPER, font="Golos-Bold", track=1.2)
        ink.text(x, 458, t, size=15, color=CREAM, font="Golos-Bold")
        body(ink, x, 482, tx, size=9.2, color=MUTED, width=168, leading=13)
        x += 180

    ink.hline(72, 596, 700, color=LINE, lw=0.8)
    ink.text(72, 612, "coffeeIT", size=15, color=CREAM, font="Golos-Bold")
    ink.text(72, 634, "hello@coffeeit.studio  ·  @coffeeit  ·  Москва, «Флакон»", size=9.6, color=MUTED, font="Golos")
    ink.text(72, 652, "Контакты — демонстрационные, как и на сайте; заменяются на реальные к первой встрече.",
             size=8.2, color=DIM, font="Golos")
    ink.text(72, 574, "13 млн ₽ · одна точка · возврат на 20-м месяце", size=10, color=GOLD, font="Golos-Semi")

# ---------------------------------------------------------------- 17 приложение: источники
def s17(c, ink, i, n):
    ink.rect(0, 0, W, H, fill=BG)
    chrome(c, ink, i, n, "приложение · источники и допущения")
    kicker(ink, 72, 104, "что мы читали и что допустили")
    h1(ink, 72, 126, "Источники и допущения", size=40, width=760)

    groups = [
        ("Рынок", [
            "РБК Исследования рынков: 12 970 кофеен и кафе-кондитерских (июль 2024, +924 за год); рынок 216,3 млрд ₽ в 2024.",
            "ОФД «Чек Индекс»: +2% точек в РФ и −3% в Москве в 2024; средний чек в кофейнях — 463 ₽ в 2025.",
            "TAdviser / Б1: IT-услуги и заказная разработка — 1,05 трлн ₽ (+14%), ИБ +52%, облака +38%.",
            "IT-Stat / Минцифры: IT-рынок 4,9 трлн ₽ в 2025; «чистые» ПО и услуги — около 2,4 трлн ₽.",
            "CORE.XP: 10 новых коворкингов в Москве в 2025 (минимум за 5 лет); свободных офисов < 4%.",
            "«БестЪ» / PAGE: 865 коворкингов и 91 тыс. рабочих мест в РФ; загрузка в Москве 90–95%.",
        ]),
        ("Регулирование и команда", [
            "Forbes / Госдума, ноябрь 2025: НДС 22% с 2026; порог УСН для НДС 20 → 15 → 10 млн ₽ к 2028.",
            "152-ФЗ: с 1 сентября 2025 согласие — отдельный документ; штраф за обработку без согласия 300–700 тыс. ₽.",
            "Хабр Карьера: медианная зарплата разработчика в Москве — 225–230 тыс. ₽ (2025).",
            "Авито / консультанты по недвижимости: ставки аренды street retail в Москве 1,4–2,8 тыс. ₽/м² в месяц.",
        ]),
        ("Наши допущения", [
            "240 м²: 60 бар, 60 рабочая зона, 3 переговорки, зал на 60 человек, шоурум.",
            "Плановая мощность 12-го месяца: 220 чеков в день, 12 резидентов, 3 проекта, 3 SLA, 125 SKU мерча.",
            "Переменные расходы: 31% в кофе, 8% в пространстве, 45% в IT, 50% в мерче; эквайринг 2%.",
            "Постоянные 2,67 млн ₽/мес; ФОТ 1,75 млн ₽ со взносами на 12 человек.",
            "CAPEX 13 млн ₽, включая 4,5 млн ₽ оборотного капитала. Рост после 12-го месяца — +0,6%/мес.",
        ]),
    ]
    colx = [72, 462, 852]
    for k, (name, items) in enumerate(groups):
        x = colx[k]
        w = 348
        ink.text(x, 196, name, size=11.5, color=COPPER, font="Golos-Bold", track=1.4)
        yy = 220
        for it in items:
            h, _ = ink.text(x + 14, yy, it, size=9.4, color=MUTED, font="Golos", width=w - 14,
                            leading=13.4, dry=True)
            ink.rect(x, yy + 4, 2.5, max(8, h - 4), fill=LINE)
            ink.text(x + 14, yy, it, size=9.4, color=MUTED, font="Golos", width=w - 14, leading=13.4)
            yy += h + 11

    # проверки, которые проходит модель, — доказательство, что цифры не нарисованы
    inks = [("Выручка", "8 потоков сходятся с P&L"),
            ("Доли", "47 / 19 / 30 / 4 = 100%"),
            ("Касса", "оборотка покрывает минимум"),
            ("Сценарии", "окупаемость 38 / 20 / 16 мес")]
    bx, by, bw, bh = 72, 486, 1136, 84
    ink.hline(bx, by, bw, color=LINE, lw=0.8)
    ink.text(bx, by + 14, "ЧТО ПРОВЕРЯЕТ СБОРКА", size=8.6, color=DIM, font="Golos-Semi", track=1.6)
    for k, (t, d) in enumerate(inks):
        x = bx + k * 286
        ink.text(x, by + 38, t, size=13.5, color=GREEN if k < 3 else GOLD, font="Golos-Bold")
        ink.text(x, by + 60, d, size=10, color=MUTED, font="Golos")
    ink.text(72, 646, "Все цифры — расчёт по этим допущениям, а не факт. Модель целиком — coffeeIT-finmodel.csv, "
             "исходники деки — папка presentation/src.", size=8.8, color=DIM, font="Golos", width=1136, leading=12)

SLIDES = [s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, s11, s12, s13, s14, s15, s16, s17]
