/* ===== VARIANT 3 — «COFFEE FIRST, CODE SECOND» · нео-брутализм ===== */
(function () {
  window.CI_CONFIG = Object.assign({}, window.CI_DATA, {
    id: 'v3',
    tokens: {
      '--bg': '#f3ece0', '--fg': '#1b1410', '--card': '#ffffff', '--line': '#1b1410',
      '--accent': '#ff7a29', '--accent-fg': '#1b1410', '--tile': '#ff7a29', '--tile-fg': '#1b1410',
      '--btn-bg': '#1b1410', '--btn-fg': '#f3ece0', '--input-bg': '#ffffff',
      '--art-fg': '#ffffff', '--tag-bg': '#ff7a29', '--tag-fg': '#1b1410',
      '--r-btn': '0px', '--r-card': '0px', '--r-input': '0px', '--maxw': '1240px', '--gap': '18px'
    },
    art: { mode: 'blocks', base: '#2a1d16', palette: ['#ff7a29', '#ffd166', '#a8402a', '#3f2b21', '#f3ece0'], ink: 'rgba(0,0,0,.55)' }
  });

  var LOGO = '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">' +
    '<path d="M8 14h24v14a9 9 0 0 1-9 9h-6a9 9 0 0 1-9-9V14Z" fill="#fff" stroke="#1b1410" stroke-width="3"/>' +
    '<path d="M32 18h5a5.5 5.5 0 0 1 0 11h-5" stroke="#1b1410" stroke-width="3"/>' +
    '<path d="M15 4 10 10M24 3l-5 7M33 4l-5 6" stroke="#1b1410" stroke-width="3" stroke-linecap="round"/>' +
    '</svg>';

  var NAVP = [['home', 'Главная'], ['services', 'Услуги'], ['cases', 'Кейсы'], ['vendors', 'Вендоры'],
    ['space', 'Пространство'], ['shop', 'Мерч'], ['contacts', 'Контакты']];
  function links() {
    return NAVP.map(function (n) { return '<a href="#' + n[0] + '" data-nav="' + n[0] + '">' + n[1] + '</a>'; }).join('');
  }
  var HEAD = '<header class="v3-head"><div class="wrap">' +
    '<a class="v3-logo" href="#home" data-nav="home"><span class="box">{{ic:cup}}</span><b>coffee<em>IT</em></b></a>' +
    '<nav class="v3-nav">' + links() + '</nav>' +
    '<div class="v3-actions"><button class="v3-cart" data-cart-open aria-label="Корзина">{{ic:cart}}<span class="badge" id="cartBadge">0</span></button>' +
    '<a class="btn" href="#contacts" data-cta="project">Хочу кофе</a>' +
    '<button class="burger" id="burger" aria-label="Меню" aria-expanded="false"><i></i><i></i><i></i></button></div>' +
    '</div></header><nav class="mobile-menu">' + links() + '</nav>';

  window.CI_CONFIG.layout = function () {
    return HEAD + '<main>' +

    '<section class="page" id="page-home">' +
      '<div class="v3-hero"><div class="wrap">' +
        '<div>' +
          '<span class="v3-sticker">☕ кофейня + IT-интегратор = coffeeIT</span>' +
          '<h1>Coffee<br>first,<br><mark>code</mark><br>second</h1>' +
          '<p class="lead">Сначала кофе — потом код. У нас можно писать код, обсуждать закупку серверов, заказывать разработку и уходить с мерчем в руках.</p>' +
          '<div class="v3-hero-cta">' +
            '<a class="btn" href="#contacts" data-cta="project">Обсудить задачу →</a>' +
            '<a class="btn btn-ghost" href="#space" data-nav="space">Забронировать стол</a>' +
          '</div>' +
        '</div>' +
        '<div class="v3-art"><div class="frame"><div class="ph" style="background-image:url({{heroArt}})"></div></div>' +
          '<div class="cup-big">{{ic:cup}}</div></div>' +
      '</div></div>' +

      '<div class="v3-marq"><div class="t"><span>разработка</span><span>серверы</span><span>безопасность</span><span>интеграции</span><span>мерч</span><span>свежая обжарка</span><span>митапы</span><span>разработка</span><span>серверы</span><span>безопасность</span><span>интеграции</span><span>мерч</span><span>свежая обжарка</span><span>митапы</span></div></div>' +

      '<section class="v3-sec"><div class="wrap">' +
        '<div class="v3-shead"><h2>Что мы <span class="hl">делаем</span></h2>' +
        '<p>Пять услуг, которые решают 90% задач: код, железо, безопасность, интеграции и поддержка.</p></div>' +
        '<div class="v3-grid3 v3-card-wrap">{{servicesHtml}}</div>' +
      '</div></section>' +

      '<div class="v3-squig"></div>' +

      '<section class="v3-sec"><div class="wrap">' +
        '<div class="v3-shead"><h2>Как всё <span class="hl">устроено</span></h2>' +
        '<p>Четыре шага. Каждый — с понятным результатом, а не «мы работаем».</p></div>' +
        '<div class="v3-steps">' +
          '<div class="v3-step"><b>01</b><h4>Кофе и разговор</h4><p>30 минут за чашкой: что есть, что болит, чего хотите.</p></div>' +
          '<div class="v3-step"><b>02</b><h4>Смета и план</h4><p>Объём, сроки, цена. Фиксируем и подписываем.</p></div>' +
          '<div class="v3-step"><b>03</b><h4>Работа</h4><p>Демо раз в две недели. Прогресс видно, кофе не кончается.</p></div>' +
          '<div class="v3-step"><b>04</b><h4>Запуск</h4><p>Документация, обучение, гарантия и поддержка.</p></div>' +
        '</div>' +
      '</div></section>' +

      '<section class="v3-sec" style="padding-top:0"><div class="wrap">' +
        '<div class="v3-shead"><h2>Кейсы <span class="hl">с цифрами</span></h2>' +
        '<a class="btn btn-ghost" href="#cases" data-nav="cases" style="border:3px solid var(--fg);box-shadow:4px 4px 0 var(--fg);background:#fff;color:var(--fg)">Все кейсы →</a></div>' +
        '{{casesHome}}' +
      '</div></section>' +

      '<section class="v3-sec" style="padding-top:0"><div class="wrap v3-space">' +
        '<div class="v3-panel"><h3>Пространство для работы</h3>' +
          '<div class="zone-grid">{{zonesHtml}}</div>' +
          '<div style="margin-top:16px"><a class="btn" href="#space" data-nav="space" style="border:3px solid var(--fg);box-shadow:4px 4px 0 var(--fg)">Забронировать</a></div></div>' +
        '<div class="v3-panel dark"><h3>Меню</h3><div class="menu-grid">{{menuHtml}}</div></div>' +
      '</div></section>' +

      '<section class="v3-sec" style="padding-top:0"><div class="wrap">' +
        '<div class="v3-shead"><h2>Мерч <span class="hl">coffeeIT</span></h2>' +
        '<button class="btn" data-cart-open style="border:3px solid var(--fg);box-shadow:4px 4px 0 var(--fg)">Корзина {{ic:cart}}</button></div>' +
        '{{shopPreview}}' +
        '<div style="margin-top:18px"><a class="btn btn-ghost" href="#shop" data-nav="shop" style="border:3px solid var(--fg);box-shadow:4px 4px 0 var(--fg);background:#fff;color:var(--fg)">Весь мерч →</a></div>' +
      '</div></section>' +

      '<section class="v3-sec" style="padding-top:0"><div class="wrap">' +
        '<div class="v3-shead"><h2>Вендоры, <span class="hl">которым верим</span></h2>' +
        '<p>Прямые контракты и партнёрские цены. Подбираем под задачу.</p></div>' +
        '<div class="v3-vendors">{{vendorsHtml}}</div>' +
      '</div></section>' +

      '<section class="v3-cta"><div class="wrap">' +
        '<div><h2>Поговорим?<br>Кофе за нами</h2><p>Расскажите задачу — вернёмся с решением и сметой. Первый эспрессо бесплатно.</p>' +
        '<div style="margin-top:18px"><a class="btn" href="#contacts" data-cta="project">Оставить заявку →</a></div></div>' +
        '<form class="v3-sub js-news"><b style="font-family:Arial Black,sans-serif;font-size:16px">Письмо месяца</b>' +
          '<span style="font-size:12.5px;font-weight:600;opacity:.8">Железо, кофейные лоты и анонсы митапов.</span>' +
          '<input type="email" required placeholder="e-mail" aria-label="e-mail">' +
          '<button class="btn" type="submit">Подписаться</button></form>' +
      '</div></section>' +
    '</section>' +

    /* SERVICES */
    '<section class="page" id="page-services">' +
      '<div class="v3-page-hero"><div class="wrap"><span class="v3-sticker">услуги</span>' +
      '<h1>IT-контур<br>под ключ</h1><p>Разработка, железо, безопасность, интеграции и поддержка — в одной команде. Начинаем с бесплатной диагностики.</p></div></div>' +
      '<section class="v3-sec" style="padding-top:0"><div class="wrap"><div class="v3-grid3">{{servicesHtml}}</div></div></section>' +
      '<section class="v3-sec" style="padding-top:0"><div class="wrap v3-space">' +
        '<div class="v3-formcard"><h3>Заявка на расчёт</h3><p>Опишите задачу — пришлём оценку и план.</p>' +
          '<form class="lead-form js-lead"><div class="row"><input name="name" required placeholder="Имя"><input name="contact" required placeholder="Телефон или e-mail"></div>' +
          '<select name="topic"><option>Разработка ПО и сайтов</option><option>Закупка серверов и лицензий</option><option>Информационная безопасность</option><option>Интеграции и автоматизация</option><option>Инфраструктура и поддержка</option></select>' +
          '<textarea name="message" rows="4" placeholder="Что есть сейчас и что нужно получить"></textarea>' +
          '<button class="btn" type="submit">Отправить заявку</button>' +
          '<p class="form-note">Откроется почта с готовым письмом. <span class="form-ok" hidden>Письмо сформировано.</span></p></form></div>' +
        '<div class="v3-panel"><h3>Почему с нами удобно</h3>' +
          '<ul class="ticks v3-ticks" style="margin-top:10px">' +
          '<li>Один подрядчик на код, железо и безопасность</li>' +
          '<li>Фиксированная смета и сроки до старта</li>' +
          '<li>Демо каждые две недели — видно прогресс</li>' +
          '<li>Гарантия 12 месяцев на разработку</li>' +
          '<li>SLA на поддержку — от 4 часов реакции</li>' +
          '<li>Скидка на мерч и кофе для клиентов 🙂</li>' +
          '</ul></div>' +
      '</div></section>' +
    '</section>' +

    /* CASES */
    '<section class="page" id="page-cases">' +
      '<div class="v3-page-hero"><div class="wrap"><span class="v3-sticker">кейсы</span>' +
      '<h1>Сделали<br>вот это</h1><p>Шесть проектов: разработка, безопасность, поставка железа и автоматизация. С цифрами, которые можно проверить.</p></div></div>' +
      '<section class="v3-sec" style="padding-top:0"><div class="wrap">{{casesHtml}}</div></section>' +
      '<section class="v3-cta"><div class="wrap"><div><h2>Хотите так же?</h2><p>Расскажите задачу — предложим решение.</p></div>' +
      '<div><a class="btn" href="#contacts" data-cta="project">Обсудить проект →</a></div></div></section>' +
    '</section>' +

    /* VENDORS */
    '<section class="page" id="page-vendors">' +
      '<div class="v3-page-hero"><div class="wrap"><span class="v3-sticker">вендоры</span>' +
      '<h1>Железо<br>и софт</h1><p>Прямые контракты, партнёрские цены и сервисные центры в России. Подбираем вендора под задачу и бюджет.</p></div></div>' +
      '<section class="v3-sec" style="padding-top:0"><div class="wrap"><div class="v3-vendors">{{vendorsHtml}}</div>' +
      '<div class="v3-space" style="margin-top:26px">' +
        '<div class="v3-formcard"><h3>Подбор оборудования</h3><p>Дадим 2–3 варианта по бюджету.</p>' +
          '<form class="lead-form js-lead"><div class="row"><input name="name" required placeholder="Имя"><input name="contact" required placeholder="Контакт"></div>' +
          '<input type="hidden" name="topic" value="Подбор оборудования и вендоров">' +
          '<textarea name="message" rows="3" placeholder="Серверы, СХД, сеть, лицензии — что нужно"></textarea>' +
          '<button class="btn" type="submit">Получить спецификацию</button>' +
          '<p class="form-note">Ответим в рабочее время. <span class="form-ok" hidden>Письмо сформировано.</span></p></form></div>' +
        '<div class="v3-panel"><h3>Как выбираем</h3><ul class="ticks v3-ticks" style="margin-top:10px">' +
          '<li>Совместимость с текущим контуром</li><li>Сроки поставки и наличие на складе</li>' +
          '<li>Стоимость владения на 3 года</li><li>Запчасти и квалифицированные инженеры</li>' +
          '<li>Честный тест перед покупкой на витрине</li></ul></div>' +
      '</div></div></section>' +
    '</section>' +

    /* SPACE */
    '<section class="page" id="page-space">' +
      '<div class="v3-page-hero"><div class="wrap"><span class="v3-sticker">пространство</span>' +
      '<h1>Приходи<br>работать</h1><p>24 места с розетками и Wi-Fi 6, три переговорки, зал на 60 человек и витрина серверов. Кофе — часть процесса.</p></div></div>' +
      '<section class="v3-sec" style="padding-top:0"><div class="wrap">' +
        '<div class="v3-zones" style="margin-bottom:26px">{{zonesHtml}}</div>' +
        '<div class="v3-space">' +
          '<div class="v3-panel dark"><h3>Меню</h3><div class="menu-grid">{{menuHtml}}</div></div>' +
          '<div class="v3-formcard"><h3>Бронирование</h3><p>Подтвердим в течение часа.</p>' +
            '<form class="lead-form js-book"><div class="row"><input name="name" required placeholder="Имя"><input name="contact" required placeholder="Телефон или @telegram"></div>' +
            '<div class="row"><input type="date" name="date" required aria-label="Дата"><select name="time"><option>09:00–12:00</option><option>12:00–16:00</option><option>16:00–20:00</option><option>20:00–23:00</option></select></div>' +
            '<div class="row"><select name="zone"><option>Рабочее место</option><option>Переговорка</option><option>Митап / событие</option><option>Стол у бара</option></select><input name="people" placeholder="Сколько человек" inputmode="numeric"></div>' +
            '<button class="btn" type="submit">Забронировать</button>' +
            '<p class="form-note">Бронь подтверждаем сообщением. <span class="form-ok" hidden>Заявка сформирована.</span></p></form>' +
            '<ul class="ticks v3-ticks" style="margin-top:16px">' +
            '<li>Дневной тариф 1 200 ₽ — кофе и вода без лимита</li>' +
            '<li>Две звонковые кабины для созвонов</li>' +
            '<li>Монитор, клавиатура и переходники — по запросу</li>' +
            '<li>Печать и сканирование на ресепшене</li></ul>' +
            '</div>' +
        '</div>' +
      '</div></section>' +
    '</section>' +

    /* SHOP */
    '<section class="page" id="page-shop">' +
      '<div class="v3-page-hero"><div class="wrap"><span class="v3-sticker">мерч</span>' +
      '<h1>Кружки,<br>худи, стикеры</h1><p>Кружки «Deploy on Friday», футболки, худи, кепки, шопперы, блокноты и стикеры. Всё в наличии у бара.</p></div></div>' +
      '<section class="v3-sec" style="padding-top:0"><div class="wrap">' +
        '<div class="v3-shopbar"><span style="font-weight:700">23 позиции · своё производство печати</span>' +
        '<button class="btn btn-ghost" data-cart-open style="border:3px solid var(--fg);box-shadow:4px 4px 0 var(--fg);background:#fff;color:var(--fg)">Корзина {{ic:cart}}</button></div>' +
        '{{shopHtml}}' +
      '</div></section>' +
    '</section>' +

    /* CONTACTS */
    '<section class="page" id="page-contacts">' +
      '<div class="v3-page-hero"><div class="wrap"><span class="v3-sticker">контакты</span>' +
      '<h1>Приходи<br>или пиши</h1><p>«Флакон», вход 3, первый этаж. Срочные задачи — в Telegram.</p></div></div>' +
      '<section class="v3-sec" style="padding-top:0"><div class="wrap"><div class="v3-contacts">' +
        '<div><ul class="v3-crows">{{contactsHtml}}</ul><div class="v3-map">Схема: «Флакон», вход 3<br>5 минут от м. Дмитровская</div></div>' +
        '<div class="v3-formcard"><h3>Оставить заявку</h3><p>Задача, бюджет, сроки — в свободной форме.</p>' +
          '<form class="lead-form js-lead"><div class="row"><input name="name" required placeholder="Имя"><input name="contact" required placeholder="Телефон или e-mail"></div>' +
          '<select name="topic"><option>Разработка и сайты</option><option>Серверы и лицензии</option><option>Информационная безопасность</option><option>Бронирование пространства</option><option>Мерч и корпоративные подарки</option></select>' +
          '<textarea name="message" rows="4" placeholder="Опишите задачу"></textarea>' +
          '<button class="btn" type="submit">Отправить</button>' +
          '<p class="form-note">Или напрямую: hello@coffeeit.studio · @coffeeit. <span class="form-ok" hidden>Письмо сформировано.</span></p></form></div>' +
      '</div></div></section>' +
    '</section>' +

    '</main>' + '{{cart}}';
  };
})();
