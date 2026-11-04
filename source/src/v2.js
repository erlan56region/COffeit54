/* ===== VARIANT 2 — «СМЕНА» · хай-тек графит + лайм ===== */
(function () {
  window.CI_CONFIG = Object.assign({}, window.CI_DATA, {
    id: 'v2',
    tokens: {
      '--bg': '#0b0d0c', '--fg': '#eef3ee', '--card': '#141816', '--line': 'rgba(238,243,238,.11)',
      '--accent': '#c6f24e', '--accent-fg': '#0b0d0c', '--tile': 'rgba(198,242,78,.14)', '--tile-fg': '#c6f24e',
      '--btn-bg': '#c6f24e', '--btn-fg': '#0b0d0c', '--input-bg': 'rgba(0,0,0,.25)',
      '--art-fg': 'rgba(255,255,255,.92)', '--tag-bg': 'rgba(11,13,12,.8)', '--tag-fg': '#c6f24e',
      '--r-btn': '12px', '--r-card': '20px', '--r-input': '12px', '--maxw': '1240px', '--gap': '14px'
    },
    art: { mode: 'mesh', base: '#0d1512', palette: ['#c6f24e', '#2f6b4f', '#7ce0b3', '#14261d'] }
  });

  var LOGO = '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">' +
    '<path d="M9 16h20v11a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8V16Z" stroke="currentColor" stroke-width="2.4"/>' +
    '<path d="M29 19h4a4.6 4.6 0 0 1 0 9h-4" stroke="currentColor" stroke-width="2.4"/>' +
    '<path d="M16 9v4M22 8v5M28 9v4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';

  var NAVP = [['home', 'Главная'], ['services', 'Услуги'], ['cases', 'Кейсы'], ['vendors', 'Вендоры'],
    ['space', 'Пространство'], ['shop', 'Мерч'], ['contacts', 'Контакты']];
  function links() {
    return NAVP.map(function (n) { return '<a href="#' + n[0] + '" data-nav="' + n[0] + '">' + n[1] + '</a>'; }).join('');
  }

  var HEAD = function () {
    return '<header class="v2-head"><div class="wrap">' +
      '<a class="v2-logo" href="#home" data-nav="home"><span class="mark">{{ic:cup}}</span><b>coffee<i>IT</i></b></a>' +
      '<nav class="v2-pill">' + links() + '</nav>' +
      '<div class="v2-head-r">' +
      '<button class="v2-cart" data-cart-open aria-label="Корзина">{{ic:cart}}<span class="badge" id="cartBadge">0</span></button>' +
      '<a class="btn" href="#contacts" data-cta="project">Обсудить задачу</a>' +
      '<button class="burger" id="burger" aria-label="Меню" aria-expanded="false"><i></i><i></i><i></i></button>' +
      '</div></div></header><nav class="mobile-menu">' + links() + '</nav>';
  };

  window.CI_CONFIG.layout = function () {
    return HEAD() + '<main>' +

    /* HOME */
    '<section class="page" id="page-home">' +
      '<div class="v2-hero"><div class="wrap">' +
      '<div class="v2-hero-grid">' +
        '<div class="v2-cell v2-hero-main rv">' +
          '<span class="v2-chip">Кофейня · разработка · железо</span>' +
          '<h1>Место, где код<br>варят <span>как кофе</span></h1>' +
          '<p class="lead">coffeeIT — кофейня для разработчиков и IT-интегратор в одном лице. Пишите код за нашим столом, заказывайте серверы через нашего инженера, уходите с работающим контуром и свежей обжаркой.</p>' +
          '<div class="v2-hero-cta">' +
            '<a class="btn" href="#contacts" data-cta="project">Обсудить задачу {{ic:arrow}}</a>' +
            '<a class="btn btn-ghost" href="#space" data-nav="space">Забронировать место</a>' +
          '</div>' +
        '</div>' +
        '<div class="v2-side">' +
          '<div class="v2-cell v2-stats">' +
            '<div class="v2-stat"><b data-count="9" data-suffix=" лет">9 лет</b><span>в разработке и инфраструктуре</span></div>' +
            '<div class="v2-stat"><b data-count="120" data-suffix="+">120+</b><span>проектов и поставок</span></div>' +
            '<div class="v2-stat"><b data-count="24" data-suffix="/7">24/7</b><span>поддержка и кофе</span></div>' +
            '<div class="v2-stat"><b data-count="4" data-suffix=" мин">4 мин</b><span>от метро Дмитровская</span></div>' +
          '</div>' +
          '<div class="v2-photo rv" style="background-image:url({{heroArt}})"><span class="tag"><i class="dotpulse"></i> Открыто · 08:00–23:00</span></div>' +
        '</div>' +
        '<div class="v2-quick">' +
          '<a href="#services" data-nav="services">{{ic:code}}<b>Разработка</b><span>Веб-сервисы, магазины, внутренние системы</span><span class="arr">{{ic:arrowUp}}</span></a>' +
          '<a href="#vendors" data-nav="vendors">{{ic:server}}<b>Серверы и СХД</b><span>Подбор, поставка, ввод в эксплуатацию</span><span class="arr">{{ic:arrowUp}}</span></a>' +
          '<a href="#services" data-nav="services">{{ic:shield}}<b>Безопасность</b><span>Аудит, pentest, мониторинг, 152-ФЗ</span><span class="arr">{{ic:arrowUp}}</span></a>' +
          '<a href="#space" data-nav="space">{{ic:chat}}<b>Пространство</b><span>Места, переговорки, митапы</span><span class="arr">{{ic:arrowUp}}</span></a>' +
        '</div>' +
      '</div>' +
      '<div class="v2-tick"><div class="t"><span>Разработка</span><span>Поставка железа</span><span>ИБ</span><span>Интеграции</span><span>Облака</span><span>Мерч</span><span>Обжарка на месте</span><span>Разработка</span><span>Поставка железа</span><span>ИБ</span><span>Интеграции</span><span>Облака</span><span>Мерч</span><span>Обжарка на месте</span></div></div>' +
      '</div></div>' +

      '<section class="v2-sec"><div class="wrap">' +
        '<div class="v2-shead"><div><span class="v2-chip">Услуги</span><h2>Пять направлений<br>в одном контуре</h2></div>' +
        '<p>Листайте вправо: каждая карточка — отдельная услуга с ценовым ориентиром и сроком. Можно взять по отдельности, можно весь пакет.</p></div>' +
        '<div class="v2-rail">{{servicesHtml}}</div>' +
      '</div></section>' +

      '<section class="v2-sec"><div class="wrap">' +
        '<div class="v2-shead"><div><span class="v2-chip">Как работаем</span><h2>От первого эспрессо<br>до продакшена</h2></div>' +
        '<p>Прозрачный процесс без «созвонов ради созвонов». Каждую пятницу — демо и дегустация нового зерна.</p></div>' +
        '<div class="v2-steps">' +
          '<div class="v2-step rv"><h4>Диагностика</h4><p>30 минут за чашкой: смотрим задачу, инфраструктуру и риски. Бесплатно.</p></div>' +
          '<div class="v2-step rv"><h4>Смета</h4><p>Фиксируем объём, сроки и бюджет. Без «уточним по ходу».</p></div>' +
          '<div class="v2-step rv"><h4>Спринты</h4><p>Демо каждые две недели, доступ к задачам и чату, живой прогресс.</p></div>' +
          '<div class="v2-step rv"><h4>Передача</h4><p>Документация, обучение, гарантия и поддержка по SLA.</p></div>' +
        '</div>' +
      '</div></section>' +

      '<section class="v2-sec"><div class="wrap">' +
        '<div class="v2-shead"><div><span class="v2-chip">Кейсы</span><h2>Цифры, которые<br>можно проверить</h2></div>' +
        '<a class="btn btn-ghost" href="#cases" data-nav="cases">Все шесть кейсов {{ic:arrow}}</a></div>' +
        '<div class="v2-case-grid">{{casesHome}}</div>' +
      '</div></section>' +

      '<section class="v2-sec"><div class="wrap">' +
        '<div class="v2-split">' +
          '<div class="v2-panel accent rv"><h3>Пространство, где хочется работать</h3>' +
            '<p>24 рабочих места с мониторами и Wi-Fi 6, три переговорки, зал на 60 человек для митапов и витрина серверного железа. Кофе — включён в рабочий процесс.</p>' +
            '<div class="v2-zone-list">{{zonesHtml}}</div>' +
            '<div style="margin-top:18px"><a class="btn" href="#space" data-nav="space">Бронирование {{ic:arrow}}</a></div>' +
          '</div>' +
          '<div class="v2-panel rv"><h3>Кофейное меню</h3><p>Своя обжарка: зерно меняем каждые две недели, эспрессо настраиваем по утрам.</p>' +
            '<div class="v2-menu">{{menuHtml}}</div>' +
          '</div>' +
        '</div>' +
      '</div></section>' +

      '<section class="v2-sec"><div class="wrap">' +
        '<div class="v2-shead"><div><span class="v2-chip">Мерч</span><h2>Кружки, худи<br>и стикеры</h2></div>' +
        '<button class="btn btn-ghost" data-cart-open>Открыть корзину {{ic:cart}}</button></div>' +
        '{{shopPreview}}' +
        '<div style="margin-top:20px"><a class="btn btn-ghost" href="#shop" data-nav="shop">Весь мерч · 23 позиции {{ic:arrow}}</a></div>' +
      '</div></section>' +

      '<section class="v2-sec"><div class="wrap">' +
        '<div class="v2-shead"><div><span class="v2-chip">Вендоры</span><h2>Железо и софт,<br>которым доверяем</h2></div>' +
        '<p>Прямые контракты, партнёрские цены и сервисные центры в России. Подбираем под задачу.</p></div>' +
        '<div class="v2-wall">{{vendorsHtml}}</div>' +
      '</div></section>' +

      '<section class="v2-sec"><div class="wrap">' +
        '<div class="v2-cta rv"><div><h2>Начнём с созвона<br>за чашкой кофе</h2>' +
          '<p>30 минут, чтобы понять задачу и честно сказать, чем поможем. Диагностика — бесплатно.</p>' +
          '<div style="margin-top:18px"><a class="btn" href="#contacts" data-cta="project">Оставить заявку {{ic:arrow}}</a></div></div>' +
          '<form class="v2-sub js-news"><b style="font-size:14px">Письмо месяца</b>' +
            '<p style="margin:0 0 6px;font-size:12.5px;opacity:.65">Новое оборудование, кофейные лоты и анонсы митапов.</p>' +
            '<div class="row2"><input type="email" required placeholder="e-mail" aria-label="e-mail"><button class="btn" type="submit">OK</button></div></form>' +
        '</div>' +
      '</div></section>' +
    '</section>' +

    /* SERVICES */
    '<section class="page" id="page-services">' +
      '<div class="v2-page-hero"><div class="wrap"><span class="v2-chip">Услуги</span>' +
        '<h1 style="margin-top:14px">IT-контур<br>под ключ</h1>' +
        '<p>Разработка, железо, безопасность, интеграции и поддержка. Начинаем с диагностики — заканчиваем работающей системой и документацией.</p></div></div>' +
      '<section class="v2-sec" style="border-top:0;padding-top:0"><div class="wrap">' +
        '<div class="v2-rail" style="grid-auto-flow:row;grid-template-columns:repeat(3,1fr);grid-auto-columns:auto;overflow:visible">{{servicesHtml}}</div>' +
      '</div></section>' +
      '<section class="v2-sec"><div class="wrap"><div class="v2-split">' +
        '<div class="v2-formcard"><h3>Заявка на расчёт</h3><p>Опишите задачу — пришлём оценку, сроки и план работ.</p>' +
          '<form class="lead-form js-lead">' +
          '<div class="row"><input name="name" required placeholder="Имя"><input name="contact" required placeholder="Телефон или e-mail"></div>' +
          '<select name="topic"><option>Разработка ПО и сайтов</option><option>Закупка серверов и лицензий</option><option>Информационная безопасность</option><option>Интеграции и автоматизация</option><option>Инфраструктура и поддержка</option></select>' +
          '<textarea name="message" rows="4" placeholder="Что есть сейчас и что нужно получить"></textarea>' +
          '<button class="btn" type="submit">Отправить заявку</button>' +
          '<p class="form-note">Откроется почтовое приложение с готовым письмом. <span class="form-ok" hidden>Письмо сформировано.</span></p></form></div>' +
        '<div class="v2-panel"><h3>Что входит в работу</h3>' +
          '<div class="v2-faq">' +
          '<details open><summary>Фиксированная смета</summary><p>Стоимость и объём согласуем до старта. Изменения — только через согласованный change request.</p></details>' +
          '<details><summary>Доступ к прогрессу</summary><p>Доска задач, чат в Telegram и демо раз в две недели. Видно, что сделано и что дальше.</p></details>' +
          '<details><summary>Гарантия</summary><p>12 месяцев на разработку, гарантия вендора на железо, SLA на поддержку — от 4 часов реакции.</p></details>' +
          '<details><summary>Документация</summary><p>Схема контура, регламенты, инструкции и доступы — в одном месте. Не «у нас в голове».</p></details>' +
          '</div></div>' +
      '</div></div></section>' +
    '</section>' +

    /* CASES */
    '<section class="page" id="page-cases">' +
      '<div class="v2-page-hero"><div class="wrap"><span class="v2-chip">Кейсы</span>' +
        '<h1 style="margin-top:14px">Что мы сделали</h1>' +
        '<p>Шесть проектов из разных направлений: разработка, безопасность, поставка железа и автоматизация. В каждом — задача, решение и проверяемые цифры.</p></div></div>' +
      '<section class="v2-sec" style="border-top:0;padding-top:0"><div class="wrap"><div class="v2-case-grid">{{casesHtml}}</div></div></section>' +
      '<section class="v2-sec"><div class="wrap"><div class="v2-cta"><div><h2>Ваш проект<br>будет следующим</h2>' +
        '<p>Расскажите задачу — предложим решение и честную смету за 3 дня.</p></div>' +
        '<div><a class="btn" href="#contacts" data-cta="project">Обсудить проект {{ic:arrow}}</a></div></div></div></section>' +
    '</section>' +

    /* VENDORS */
    '<section class="page" id="page-vendors">' +
      '<div class="v2-page-hero"><div class="wrap"><span class="v2-chip">Вендоры</span>' +
        '<h1 style="margin-top:14px">Железо, софт<br>и лицензии</h1>' +
        '<p>Прямые контракты и партнёрские условия с вендорами. Подбираем стек под задачу и бюджет, а не под размер бонуса.</p></div></div>' +
      '<section class="v2-sec" style="border-top:0;padding-top:0"><div class="wrap"><div class="v2-wall">{{vendorsHtml}}</div>' +
        '<div class="v2-split" style="margin-top:34px">' +
        '<div class="v2-panel"><h3>Как выбираем вендора</h3><div class="v2-faq">' +
          '<details open><summary>Совместимость</summary><p>Проверяем, как решение встанет в текущий контур и выдержит план роста на 3 года.</p></details>' +
          '<details><summary>Сроки и сервис</summary><p>Смотрим наличие, сроки поставки и сервисные центры в России, а не только цену.</p></details>' +
          '<details><summary>Стоимость владения</summary><p>Считаем TCO: лицензии, поддержка, электричество, ФОТ обслуживания.</p></details>' +
          '</div></div>' +
        '<div class="v2-formcard"><h3>Подбор оборудования</h3><p>Пришлите конфигурацию или задачу — дадим 2–3 варианта по бюджету.</p>' +
          '<form class="lead-form js-lead"><div class="row"><input name="name" required placeholder="Имя"><input name="contact" required placeholder="Контакт"></div>' +
          '<input type="hidden" name="topic" value="Подбор оборудования и вендоров">' +
          '<textarea name="message" rows="3" placeholder="Серверы, СХД, сеть, лицензии — что нужно"></textarea>' +
          '<button class="btn" type="submit">Получить спецификацию</button>' +
          '<p class="form-note">Ответим в рабочее время. <span class="form-ok" hidden>Письмо сформировано.</span></p></form></div>' +
        '</div>' +
      '</div></section>' +
    '</section>' +

    /* SPACE */
    '<section class="page" id="page-space">' +
      '<div class="v2-page-hero"><div class="wrap"><span class="v2-chip">Пространство</span>' +
        '<h1 style="margin-top:14px">Кофейня,<br>где работают</h1>' +
        '<p>Тихие рабочие места, переговорки и площадка для митапов. Бронь — за пару минут, кофе — сразу.</p></div></div>' +
      '<section class="v2-sec" style="border-top:0;padding-top:0"><div class="wrap">' +
        '<div class="v2-zone-list" style="grid-template-columns:repeat(2,1fr);gap:14px">{{zonesHtml}}</div>' +
        '<div class="v2-split" style="margin-top:34px">' +
          '<div class="v2-panel"><h3>Меню</h3><p>Обжарка своя, зерно меняем каждые две недели.</p><div class="v2-menu">{{menuHtml}}</div></div>' +
          '<div class="v2-formcard"><h3>Бронирование</h3><p>Стол, переговорка или место на митап — подтвердим в течение часа.</p>' +
            '<form class="lead-form js-book">' +
            '<div class="row"><input name="name" required placeholder="Имя"><input name="contact" required placeholder="Телефон или @telegram"></div>' +
            '<div class="row"><input type="date" name="date" required aria-label="Дата"><select name="time"><option>09:00–12:00</option><option>12:00–16:00</option><option>16:00–20:00</option><option>20:00–23:00</option></select></div>' +
            '<div class="row"><select name="zone"><option>Рабочее место</option><option>Переговорка</option><option>Митап / событие</option><option>Стол у бара</option></select><input name="people" placeholder="Сколько человек" inputmode="numeric"></div>' +
            '<button class="btn" type="submit">Забронировать</button>' +
            '<p class="form-note">Бронь подтверждаем сообщением. <span class="form-ok" hidden>Заявка сформирована.</span></p></form></div>' +
        '</div>' +
      '</div></section>' +
    '</section>' +

    /* SHOP */
    '<section class="page" id="page-shop">' +
      '<div class="v2-page-hero"><div class="wrap"><span class="v2-chip">Мерч</span>' +
        '<h1 style="margin-top:14px">Кружки, худи,<br>стикеры</h1>' +
        '<p>Фирменные вещи coffeeIT: кружки для деплоя в пятницу, футболки, худи, кепки, шопперы и термокружки. Забрать можно у бара.</p></div></div>' +
      '<section class="v2-sec" style="border-top:0;padding-top:0"><div class="wrap">' +
        '<div class="v2-shopbar"><span class="mono" style="font-size:12px;opacity:.55">23 POSITIONS / IN STOCK</span>' +
        '<button class="btn btn-ghost btn-sm" data-cart-open>Корзина {{ic:cart}}</button></div>' +
        '{{shopHtml}}' +
      '</div></section>' +
    '</section>' +

    /* CONTACTS */
    '<section class="page" id="page-contacts">' +
      '<div class="v2-page-hero"><div class="wrap"><span class="v2-chip">Контакты</span>' +
        '<h1 style="margin-top:14px">Приходите<br>или пишите</h1>' +
        '<p>Мы на «Флаконе», вход 3, первый этаж. Срочные задачи — в Telegram, отвечаем быстрее.</p></div></div>' +
      '<section class="v2-sec" style="border-top:0;padding-top:0"><div class="wrap"><div class="v2-contacts">' +
        '<div><ul class="v2-crows">{{contactsHtml}}</ul>' +
        '<div class="v2-map">Схема: «Флакон», вход 3 · 5 минут от м. Дмитровская</div></div>' +
        '<div class="v2-formcard"><h3>Оставить заявку</h3><p>Задача, бюджет, сроки — в свободной форме.</p>' +
          '<form class="lead-form js-lead">' +
          '<div class="row"><input name="name" required placeholder="Имя"><input name="contact" required placeholder="Телефон или e-mail"></div>' +
          '<select name="topic"><option>Разработка и сайты</option><option>Серверы и лицензии</option><option>Информационная безопасность</option><option>Бронирование пространства</option><option>Мерч и корпоративные подарки</option></select>' +
          '<textarea name="message" rows="4" placeholder="Опишите задачу"></textarea>' +
          '<button class="btn" type="submit">Отправить</button>' +
          '<p class="form-note">Или напрямую: hello@coffeeit.studio · @coffeeit. <span class="form-ok" hidden>Письмо сформировано.</span></p></form></div>' +
      '</div></div></section>' +
    '</section>' +

    '</main>' + '{{cart}}';
  };
})();
