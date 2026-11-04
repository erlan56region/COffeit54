/* ===== VARIANT 4 — «TERMINAL» · моно-эстетика, YAML-документы ===== */
(function () {
  window.CI_CONFIG = Object.assign({}, window.CI_DATA, {
    id: 'v4',
    tokens: {
      '--bg': '#0a0c0a', '--fg': '#e9ece9', '--card': '#0f1310', '--line': 'rgba(233,236,233,.14)',
      '--accent': '#7ae78f', '--accent-fg': '#0a0c0a', '--tile': 'rgba(122,231,143,.12)', '--tile-fg': '#7ae78f',
      '--btn-bg': '#7ae78f', '--btn-fg': '#0a0c0a', '--input-bg': 'rgba(0,0,0,.35)',
      '--art-fg': 'rgba(255,255,255,.85)', '--tag-bg': 'rgba(122,231,143,.14)', '--tag-fg': '#7ae78f',
      '--r-btn': '0px', '--r-card': '0px', '--r-input': '0px', '--maxw': '1180px', '--gap': '12px'
    },
    art: { mode: 'terminal', base: '#080b09', palette: ['#7ae78f', '#3f7d52', '#8fd0ff', '#2a3d2f'] }
  });

  var NAVP = [['home', 'главная'], ['services', 'услуги'], ['cases', 'кейсы'], ['vendors', 'вендоры'],
    ['space', 'пространство'], ['shop', 'мерч'], ['contacts', 'контакты']];
  function links() {
    return NAVP.map(function (n) { return '<a href="#' + n[0] + '" data-nav="' + n[0] + '">' + n[1] + '</a>'; }).join('');
  }
  var HEAD = '<header class="v4-head"><div class="wrap">' +
    '<a class="v4-logo" href="#home" data-nav="home"><span class="pr">coffee@it</span>:<span class="dim">~</span>$</a>' +
    '<nav class="v4-nav">' + links() + '</nav>' +
    '<div class="v4-head-r">' +
    '<button class="v4-cart" data-cart-open aria-label="Корзина">{{ic:cart}}<span class="dim">cart</span><span class="badge" id="cartBadge">0</span></button>' +
    '<a class="btn" href="#contacts" data-cta="project">./contact</a>' +
    '<button class="burger" id="burger" aria-label="Меню" aria-expanded="false"><i></i><i></i><i></i></button>' +
    '</div></div></header><nav class="mobile-menu">' + links() + '</nav>';

  var YAML = '<div class="v4-yaml"><div><span class="k">name</span>: <span class="s">coffeeIT</span></div>' +
    '<div><span class="k">type</span>: <span class="s">[кофейня, coworking, it-integrator]</span></div>' +
    '<div><span class="k">location</span>: <span class="s">Москва, «Флакон»</span></div>' +
    '<div><span class="k">hours</span>: <span class="n">08:00–23:00</span></div>' +
    '<div><span class="k">services</span>:</div>' +
    '<div>&nbsp;&nbsp;- <span class="s">development</span></div>' +
    '<div>&nbsp;&nbsp;- <span class="s">hardware-procurement</span></div>' +
    '<div>&nbsp;&nbsp;- <span class="s">infosec</span></div>' +
    '<div>&nbsp;&nbsp;- <span class="s">integrations</span></div>' +
    '<div>&nbsp;&nbsp;- <span class="s">support</span></div>' +
    '<div><span class="k">coffee</span>: <span class="s">own-roast</span> <span class="cm"># свежая обжарка</span></div>' +
    '<div><span class="k">merch</span>: <span class="n">23</span> <span class="cm"># позиции в наличии</span></div>' +
    '<div><span class="k">status</span>: <span class="s">open</span></div></div>';

  window.CI_CONFIG.layout = function () {
    return HEAD + '<main>' +

    /* HOME */
    '<section class="page" id="page-home">' +
      '<div class="v4-hero"><div class="wrap"><div class="v4-win">' +
        '<div class="v4-winbar"><span class="dots"><i></i><i></i><i></i></span><span>coffeeit://init</span><span class="path">~/coffeeit — bash</span></div>' +
        '<div class="v4-term">' +
          '<div>' +
            '<div class="v4-lines"><span>last login: today on ttys001</span><span>loading coffeeit.config… done</span></div>' +
            '<div class="v4-cmd">coffeeit --init</div>' +
            '<h1>Сначала кофе.<br><span class="c">Потом код.</span><br>Потом продакшен.<span class="v4-caret"></span></h1>' +
            '<p class="lead">coffeeIT — это кофейня, из которой удобно писать код, и IT-интегратор, который подбирает серверы, строит интеграции и закрывает безопасность. Одна команда на весь контур.</p>' +
            '<div class="v4-hero-cta">' +
              '<a class="btn" href="#contacts" data-cta="project">Обсудить задачу →</a>' +
              '<a class="btn btn-ghost" href="#space" data-nav="space">Забронировать место</a>' +
            '</div>' +
          '</div>' +
          '<div class="v4-aside">' +
            YAML +
            '<div class="v4-status"><div><span class="dim">build</span><span class="ok">passed</span></div>' +
            '<div><span class="dim">uptime</span><span class="ok">99.98%</span></div>' +
            '<div><span class="dim">coffee.level</span><span class="ok">full</span></div>' +
            '<div><span class="dim">support</span><span class="ok">24/7</span></div></div>' +
            '<div class="v4-photo" style="background-image:url({{heroArt}})"></div>' +
          '</div>' +
        '</div>' +
      '</div></div></div>' +

      '<section class="v4-sec"><div class="wrap">' +
        '<div class="v4-shead"><span class="idx">[01] services</span><h2>Пять сервисов в одном контуре</h2>' +
        '<p>Каждый блок — отдельная услуга: от разработки и закупки серверов до аудита безопасности. Можно вызвать один сервис, можно собрать весь стек.</p></div>' +
        '{{v4tabs}}' +
      '</div></section>' +

      '<section class="v4-sec"><div class="wrap">' +
        '<div class="v4-shead"><span class="idx">[02] cases</span><h2>Логи выполненных задач</h2>' +
        '<p>Шесть проектов с измеримым результатом. Полные разборы открываются по клику.</p></div>' +
        '{{casesHome}}' +
        '<div style="margin-top:14px"><a class="btn btn-ghost" href="#cases" data-nav="cases">cat все_кейсы.log →</a></div>' +
      '</div></section>' +

      '<section class="v4-sec"><div class="wrap"><div class="v4-split">' +
        '<div class="v4-block"><h3>space.yaml</h3>' +
          '<table class="v4-zone-table"><tbody>' +
          '<tr><td><b>Рабочие места</b><span>24 места, розетки, Wi-Fi 6</span></td><td>350 ₽/час</td></tr>' +
          '<tr><td><b>Переговорки</b><span>3 комнаты, 4–10 человек, ТВ</span></td><td>1 200 ₽/час</td></tr>' +
          '<tr><td><b>События</b><span>зал на 60 человек, звук, стрим</span></td><td>от 25 000 ₽</td></tr>' +
          '<tr><td><b>Витрина железа</b><span>серверы и сеть — потрогать до закупки</span></td><td>free</td></tr>' +
          '</tbody></table>' +
          '<div style="margin-top:14px"><a class="btn btn-ghost" href="#space" data-nav="space">./book →</a></div></div>' +
        '<div class="v4-block"><h3>menu.yaml</h3><div class="menu-grid">{{menuHtml}}</div></div>' +
      '</div></div></section>' +

      '<section class="v4-sec"><div class="wrap">' +
        '<div class="v4-shead"><span class="idx">[03] shop</span><h2>Мерч coffeeIT</h2>' +
        '<p>Кружки, футболки, худи, кепки, шопперы, термокружки и стикеры. Заказ собирается в корзину и уходит письмом.</p></div>' +
        '{{shopPreview}}' +
        '<div style="margin-top:14px"><a class="btn btn-ghost" href="#shop" data-nav="shop">ls merch/ →</a></div>' +
      '</div></section>' +

      '<section class="v4-sec"><div class="wrap">' +
        '<div class="v4-shead"><span class="idx">[04] vendors</span><h2>Стек вендоров</h2>' +
        '<p>Прямые контракты и партнёрские условия. Подбираем под задачу, нагрузку и бюджет.</p></div>' +
        '{{vendorsTable}}' +
      '</div></section>' +

      '<section class="v4-sec"><div class="wrap"><div class="v4-cta">' +
        '<div><h2>./начать_проект --diagnostics free</h2>' +
        '<p>30 минут за чашкой кофе: разбираем задачу и говорим, чем можем помочь. Без презентаций на 60 слайдов.</p>' +
        '<div style="margin-top:16px"><a class="btn" href="#contacts" data-cta="project">Оставить заявку →</a></div></div>' +
        '<form class="v4-sub js-news"><span class="dim" style="font-size:11px">subscribe: digest.monthly</span>' +
        '<input type="email" required placeholder="you@company.ru" aria-label="e-mail">' +
        '<button class="btn" type="submit">subscribe</button></form>' +
      '</div></div></section>' +
    '</section>' +

    /* SERVICES */
    '<section class="page" id="page-services">' +
      '<div class="v4-page-hero"><div class="wrap"><span class="idx">[services]</span>' +
      '<h1>IT-контур под ключ</h1><p>Разработка, железо, безопасность, интеграции и поддержка. Начинаем с бесплатной диагностики, заканчиваем документацией и гарантией.</p></div></div>' +
      '<section class="v4-sec" style="padding-top:0"><div class="wrap">{{v4tabs}}</div></section>' +
      '<section class="v4-sec"><div class="wrap"><div class="v4-split">' +
        '<div class="v4-form"><h3>request.yml</h3><p>Опишите задачу — пришлём оценку, сроки и план работ.</p>' +
          '<form class="lead-form js-lead"><div class="row"><input name="name" required placeholder="name"><input name="contact" required placeholder="contact"></div>' +
          '<select name="topic"><option>Разработка ПО и сайтов</option><option>Закупка серверов и лицензий</option><option>Информационная безопасность</option><option>Интеграции и автоматизация</option><option>Инфраструктура и поддержка</option></select>' +
          '<textarea name="message" rows="4" placeholder="task: опишите задачу"></textarea>' +
          '<button class="btn" type="submit">./send</button>' +
          '<p class="form-note">Откроется почтовое приложение с готовым письмом. <span class="form-ok" hidden>Письмо сформировано.</span></p></form></div>' +
        '<div class="v4-block"><h3>faq.md</h3><div class="v4-faq">' +
          '<details open><summary>Смета фиксированная?</summary><p>Да, объём и стоимость согласуем до старта. Изменения — только через change request.</p></details>' +
          '<details><summary>Как видно прогресс?</summary><p>Доска задач, чат в Telegram и демо раз в две недели.</p></details>' +
          '<details><summary>Что с гарантией?</summary><p>12 месяцев на разработку, гарантия вендоров на железо, SLA на поддержку от 4 часов реакции.</p></details>' +
          '<details><summary>Можно только железо?</summary><p>Да. Привезём, смонтируем, настроим и передадим с документацией.</p></details>' +
        '</div></div>' +
      '</div></div></section>' +
    '</section>' +

    /* CASES */
    '<section class="page" id="page-cases">' +
      '<div class="v4-page-hero"><div class="wrap"><span class="idx">[cases]</span>' +
      '<h1>cat cases.log</h1><p>Шесть проектов: разработка, безопасность, поставка железа и автоматизация. С цифрами, которые можно проверить.</p></div></div>' +
      '<section class="v4-sec" style="padding-top:0"><div class="wrap">{{casesHtml}}</div></section>' +
      '<section class="v4-sec"><div class="wrap"><div class="v4-cta"><div><h2>./next --project yours</h2><p>Расскажите задачу — предложим решение и смету за 3 дня.</p></div>' +
      '<div><a class="btn" href="#contacts" data-cta="project">Обсудить проект →</a></div></div></div></section>' +
    '</section>' +

    /* VENDORS */
    '<section class="page" id="page-vendors">' +
      '<div class="v4-page-hero"><div class="wrap"><span class="idx">[vendors]</span>' +
      '<h1>cat vendors.db</h1><p>Прямые контракты и партнёрские условия. Подбираем вендора под задачу, нагрузку и стоимость владения.</p></div></div>' +
      '<section class="v4-sec" style="padding-top:0"><div class="wrap">{{vendorsTable}}' +
      '<div class="v4-split" style="margin-top:20px">' +
        '<div class="v4-form"><h3>spec.yml</h3><p>Пришлите задачу — дадим 2–3 варианта конфигурации по бюджету.</p>' +
          '<form class="lead-form js-lead"><div class="row"><input name="name" required placeholder="name"><input name="contact" required placeholder="contact"></div>' +
          '<input type="hidden" name="topic" value="Подбор оборудования и вендоров">' +
          '<textarea name="message" rows="3" placeholder="servers / storage / network / licenses"></textarea>' +
          '<button class="btn" type="submit">./send</button>' +
          '<p class="form-note">Ответим в рабочее время. <span class="form-ok" hidden>Письмо сформировано.</span></p></form></div>' +
        '<div class="v4-block"><h3>selection.md</h3><div class="v4-faq">' +
          '<details open><summary>Совместимость</summary><p>Проверяем, как решение встанет в текущий контур и выдержит план роста на три года.</p></details>' +
          '<details><summary>Сроки и сервис</summary><p>Смотрим наличие, сроки поставки и сервисные центры в России.</p></details>' +
          '<details><summary>TCO</summary><p>Считаем стоимость владения: лицензии, поддержка, электричество, обслуживание.</p></details>' +
        '</div></div>' +
      '</div></div></section>' +
    '</section>' +

    /* SPACE */
    '<section class="page" id="page-space">' +
      '<div class="v4-page-hero"><div class="wrap"><span class="idx">[space]</span>' +
      '<h1>Пространство для работы</h1><p>24 места с розетками и Wi-Fi 6, три переговорки, зал на 60 человек и витрина серверного железа.</p></div></div>' +
      '<section class="v4-sec" style="padding-top:0"><div class="wrap"><div class="v4-split">' +
        '<div class="v4-block"><h3>zones.yml</h3><table class="v4-zone-table"><tbody>' +
          '<tr><td><b>Рабочие места</b><span>24 места, розетки, мониторы по запросу</span></td><td>350 ₽/час</td></tr>' +
          '<tr><td><b>Переговорки</b><span>3 комнаты на 4–10 человек, ТВ и доска</span></td><td>1 200 ₽/час</td></tr>' +
          '<tr><td><b>События</b><span>зал на 60 человек, проектор, звук, стрим</span></td><td>от 25 000 ₽</td></tr>' +
          '<tr><td><b>Витрина железа</b><span>серверы, СХД и сеть до закупки</span></td><td>free</td></tr>' +
          '</tbody></table></div>' +
        '<div class="v4-form"><h3>book.yml</h3><p>Подтвердим бронь в течение часа.</p>' +
          '<form class="lead-form js-book"><div class="row"><input name="name" required placeholder="name"><input name="contact" required placeholder="contact"></div>' +
          '<div class="row"><input type="date" name="date" required aria-label="Дата"><select name="time"><option>09:00–12:00</option><option>12:00–16:00</option><option>16:00–20:00</option><option>20:00–23:00</option></select></div>' +
          '<div class="row"><select name="zone"><option>Рабочее место</option><option>Переговорка</option><option>Митап / событие</option><option>Стол у бара</option></select><input name="people" placeholder="people" inputmode="numeric"></div>' +
          '<button class="btn" type="submit">./book</button>' +
          '<p class="form-note">Бронь подтверждаем сообщением. <span class="form-ok" hidden>Заявка сформирована.</span></p></form></div>' +
      '</div>' +
      '<div class="v4-block" style="margin-top:14px"><h3>menu.yaml</h3><div class="menu-grid">{{menuHtml}}</div></div>' +
      '</div></section>' +
    '</section>' +

    /* SHOP */
    '<section class="page" id="page-shop">' +
      '<div class="v4-page-hero"><div class="wrap"><span class="idx">[shop]</span>' +
      '<h1>ls merch/</h1><p>23 позиции: кружки, футболки, худи, кепки, шопперы, термокружки, блокноты и стикеры. Печать и вышивка собственные.</p></div></div>' +
      '<section class="v4-sec" style="padding-top:0"><div class="wrap">' +
        '<div class="v4-shopbar"><span>total: 23 items · in stock · доставка по Москве</span>' +
        '<button class="btn btn-ghost" data-cart-open>cart ({{cartCount}}) →</button></div>' +
        '{{shopHtml}}' +
      '</div></section>' +
    '</section>' +

    /* CONTACTS */
    '<section class="page" id="page-contacts">' +
      '<div class="v4-page-hero"><div class="wrap"><span class="idx">[contacts]</span>' +
      '<h1>./contacts --all</h1><p>«Флакон», вход 3, первый этаж. Срочные задачи — в Telegram, отвечаем быстрее всего.</p></div></div>' +
      '<section class="v4-sec" style="padding-top:0"><div class="wrap"><div class="v4-contacts">' +
        '<div><ul class="v4-crows">{{contactsHtml}}</ul><div class="v4-map">map: «Флакон», вход 3 · 5 мин от м. Дмитровская</div></div>' +
        '<div class="v4-form"><h3>contact.yml</h3><p>Задача, бюджет, сроки — в свободной форме.</p>' +
          '<form class="lead-form js-lead"><div class="row"><input name="name" required placeholder="name"><input name="contact" required placeholder="phone / email"></div>' +
          '<select name="topic"><option>Разработка и сайты</option><option>Серверы и лицензии</option><option>Информационная безопасность</option><option>Бронирование пространства</option><option>Мерч и корпоративные подарки</option></select>' +
          '<textarea name="message" rows="4" placeholder="message"></textarea>' +
          '<button class="btn" type="submit">./send</button>' +
          '<p class="form-note">Или напрямую: hello@coffeeit.studio · @coffeeit. <span class="form-ok" hidden>Письмо сформировано.</span></p></form></div>' +
      '</div></div></section>' +
    '</section>' +

    '</main>' + '{{cart}}';
  };
})();
