/* ===== VARIANT 1 — «КОД И ЗЕРНО» · редакционный премиум ===== */
(function () {
  window.CI_CONFIG = Object.assign({}, window.CI_DATA, {
    id: 'v1',
    cartSlot: true,
    tokens: {
      '--bg': '#f4efe4', '--fg': '#16130f', '--card': '#fffaf0', '--line': 'rgba(22,19,15,.16)',
      '--accent': '#1e4d3a', '--accent-fg': '#f4efe4', '--tile': '#e6dfcd', '--tile-fg': '#1e4d3a',
      '--btn-bg': '#16130f', '--btn-fg': '#f4efe4', '--input-bg': 'rgba(255,255,255,.55)',
      '--art-fg': '#f4efe4', '--tag-bg': 'rgba(255,250,240,.92)', '--tag-fg': '#16130f',
      '--r-btn': '0px', '--r-card': '0px', '--r-input': '0px', '--maxw': '1240px', '--gap': '28px'
    },
    art: { base: '#241b14', palette: ['#1e4d3a', '#c56a3d', '#e8c489', '#6b4a33'], heroSeed: 7, sceneSeed: 21 }
  });

  /* CSS подключается из v1.css при сборке */


  var LOGO = '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">' +
    '<circle cx="24" cy="24" r="22.5" stroke="#16130f" stroke-width="1.4"/>' +
    '<path d="M14 19h15v8.5a6 6 0 0 1-6 6h-3a6 6 0 0 1-6-6V19Z" stroke="#16130f" stroke-width="1.6"/>' +
    '<path d="M29 21.5h3a3.4 3.4 0 0 1 0 6.8h-3" stroke="#16130f" stroke-width="1.6"/>' +
    '<path d="M20 8.5 26 16l-9.5 6" stroke="#1e4d3a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  function page(id) { return '<section class="page" id="page-' + id + '">'; }

  window.CI_CONFIG.layout = function (D) {
    var c = D.contacts;
    var NAVP = [['home','Главная'],['services','Услуги'],['cases','Кейсы'],['vendors','Вендоры'],['space','Пространство'],['shop','Мерч'],['contacts','Контакты']];
    var navLinks = NAVP.map(function (n) { return '<a href="#' + n[0] + '" data-nav="' + n[0] + '">' + n[1] + '</a>'; }).join('');
    c.rows = [[ 'pin','Адрес','Москва, Б. Новодмитровская, 36, «Флакон», вход 3'],
      ['clock','Часы работы','Пн–Пт 08:00–23:00 · Сб–Вс 10:00–23:00'],
      ['chat','Почта и Telegram','hello@coffeeit.studio · @coffeeit'],
      ['cam','Мероприятия','Лекции, митапы и воркшопы — по брони']];
    return `
    <div class="v1-top"><div class="wrap"><span>${c.address}</span><span>${c.hours}</span><span>${c.phone}</span></div></div>
    <header class="v1-head"><div class="wrap">
      <a class="v1-logo" href="#home" data-nav="home">${LOGO}<b>coffee<i>IT</i></b></a>
      <nav class="v1-nav">${navLinks}</nav>
      <div class="v1-actions">
        <a class="btn" href="#contacts" data-cta="project">Обсудить задачу {{ic:arrow}}</a>
        <button class="v1-cartbtn" data-cart-open aria-label="Корзина">{{ic:cart}}<span class="badge" id="cartBadge">0</span></button>
        <button class="burger" id="burger" aria-label="Меню" aria-expanded="false"><i></i><i></i><i></i></button>
      </div>
    </div></header>
    <nav class="mobile-menu">${navLinks}</nav>

    <main id="app-main">
      ${page('home')}
        <div class="v1-hero"><div class="wrap">
          <div>
            <div class="v1-kicker">Кофейня · Пространство · IT-интегратор</div>
            <h1>Код пишется<br>лучше <em>за</em><br>хорошим кофе</h1>
            <p class="lead">coffeeIT — место, где разрабатывают, подбирают серверы и пьют эспрессо. Один подрядчик на весь IT-контур и одна кофемашина на все дедлайны.</p>
            <div class="v1-hero-cta">
              <a class="btn" href="#contacts" data-cta="project">Обсудить задачу {{ic:arrow}}</a>
              <a class="btn btn-ghost" href="#space" data-nav="space">Забронировать стол</a>
            </div>
            <div class="v1-hero-stats">
              <div><b data-count="9" data-suffix=" лет">9 лет</b><span>в разработке<br>и инфраструктуре</span></div>
              <div><b data-count="120" data-suffix="+">120+</b><span>проектов<br>запущено</span></div>
              <div><b data-count="24" data-suffix="/7">24/7</b><span>кофе, поддержка<br>и рабочие места</span></div>
            </div>
          </div>
          <div class="v1-hero-art">
            <div class="ph" style="background-image:url({{heroArt}})"></div>
            <div class="rot">Open<br>08:00</div>
            <div class="ticket"><b>Сегодня в 19:00</b><span>Митап «Как выбрать сервер и не пожалеть». Вход свободный, кофе включён.</span></div>
          </div>
        </div></div>

        <div class="v1-marq"><div class="track"><span>Разработка</span><span>Серверы и СХД</span><span>Безопасность</span><span>Интеграции</span><span>Облака</span><span>Мерч</span><span>Свежая обжарка</span><span>Разработка</span><span>Серверы и СХД</span><span>Безопасность</span><span>Интеграции</span><span>Облака</span><span>Мерч</span><span>Свежая обжарка</span></div></div>

        <section class="v1-sec"><div class="wrap">
          <div class="v1-sec-head"><span class="v1-num">01 / Услуги</span>
            <div><h2>Пять направлений,<br>одна команда</h2>
            <p>Мы не продаём «часы разработки». Мы собираем работающий контур: от идеи и кода до железа в стойке и защиты периметра.</p></div>
          </div>
          <div class="v1-rows">
            {{servicesRows}}
          </div>
        </div></section>

        <section class="v1-sec"><div class="wrap">
          <div class="v1-split">
            <div>
              <div class="v1-kicker" style="margin-bottom:16px">01.1 — Закупка</div>
              <h2 class="h-lg serif">Серверы, СХД и лицензии — без беготни по поставщикам</h2>
              <p class="lead" style="margin-top:16px;opacity:.8">Считаем конфигурацию под ваши нагрузки, проверяем совместимость, согласуем поставку и вводим в эксплуатацию. Если железо уже есть — проведём аудит и скажем, что менять, а что оставить.</p>
              <ul class="v1-list">
                <li>{{ic:check}}<span>Подбор серверов, СХД и сетевого оборудования под бюджет</span></li>
                <li>{{ic:check}}<span>Лицензии, подписки и продление контрактов вендоров</span></li>
                <li>{{ic:check}}<span>Логистика, монтаж, настройка и гарантийное сопровождение</span></li>
              </ul>
              <div style="margin-top:26px"><a class="btn" href="#contacts" data-cta="server" data-topic="Закупка серверов и оборудования">Рассчитать конфигурацию {{ic:arrow}}</a></div>
            </div>
            <div>
              <div class="ph" style="background-image:url({{sceneArt}});aspect-ratio:5/4;background-size:cover"></div>
              <p class="v1-note" style="margin-top:22px">«Приходите с задачей — уйдёте со спецификацией и сметой. И с кофе.»</p>
            </div>
          </div>
        </div></section>

        <section class="v1-sec"><div class="wrap">
          <div class="v1-sec-head"><span class="v1-num">02 / Кейсы</span>
            <div><h2>Цифры вместо обещаний</h2>
            <p>Три из шести проектов — ниже. Полные разборы с технологиями, сроками и бюджетами открываются на странице кейсов.</p></div>
          </div>
          {{casesHome}}
          <div style="margin-top:28px"><a class="btn btn-ghost" href="#cases" data-nav="cases">Все кейсы {{ic:arrow}}</a></div>
        </div></section>

        <section class="v1-sec"><div class="wrap">
          <div class="v1-split">
            <div class="ph" style="background-image:url({{sceneArt}})"></div>
            <div>
              <div class="v1-kicker" style="margin-bottom:16px">03 / Пространство</div>
              <h2 class="h-lg serif">Приходите работать.<br>Здесь для этого всё есть</h2>
              <p class="lead" style="margin-top:16px;opacity:.8">24 рабочих места, три переговорки, площадка на 60 человек и витрина серверного железа. Кофе — часть рабочего процесса, а не бонус.</p>
              {{zonesHtml}}
              <div style="margin-top:26px"><a class="btn btn-ghost" href="#space" data-nav="space">Бронирование и меню {{ic:arrow}}</a></div>
            </div>
          </div>
        </div></section>

        <section class="v1-sec"><div class="wrap">
          <div class="v1-sec-head"><span class="v1-num">04 / Мерч</span>
            <div><h2>Кружки, худи<br>и немного иронии</h2>
            <p>Фирменный мерч coffeeIT: кружки «Deploy on Friday», футболки, худи, кепки, шопперы, блокноты и стикеры. Всё в наличии на витрине у бара.</p></div>
          </div>
          {{shopPreview}}
        </div></section>

        <section class="v1-sec"><div class="wrap">
          <div class="v1-sec-head"><span class="v1-num">05 / Вендоры</span>
            <div><h2>Работаем с теми,<br>кто держит нагрузку</h2>
            <p>Прямые контракты и партнёрские условия. Подбираем вендора под задачу, а не по размеру скидки.</p></div>
          </div>
          <div class="v1-vendors">{{brands}}</div>
        </div></section>

        <section class="v1-sec"><div class="wrap">
          <div class="v1-split">
            <div class="v1-quote">
              <p>«Мы пришли за частным облаком и остались ещё и за кофе. Теперь наши разработчики проводят здесь спринты — а мы не ищем отдельного подрядчика на безопасность».</p>
              <footer>Анна Кравец — CTO, сеть обжарок «Petrichor»</footer>
            </div>
            <div>
              <h2 class="h-md serif">Что входит в первый месяц</h2>
              <ul class="v1-list">
                <li>{{ic:check}}<span>Бесплатный аудит текущего IT-контура и карта рисков</span></li>
                <li>{{ic:check}}<span>Спецификация и смета по вашей задаче — в течение 3 дней</span></li>
                <li>{{ic:check}}<span>План работ с этапами, сроками и ответственными</span></li>
                <li>{{ic:check}}<span>Кофе в подарок — потому что первый созвон у нас у бара</span></li>
              </ul>
            </div>
          </div>
        </div></section>

        <section class="v1-cta"><div class="wrap">
          <div>
            <h2>Начнём с короткого<br>созвона за кофе</h2>
            <p>30 минут, чтобы понять задачу и честно сказать, чем мы можем помочь. Без презентации на 60 слайдов.</p>
            <div style="margin-top:20px"><a class="btn" href="#contacts" data-cta="project">Оставить заявку {{ic:arrow}}</a></div>
          </div>
          <form class="js-news" style="display:grid;gap:10px">
            <label style="font-size:13px;opacity:.8">Письмо месяца: новое оборудование, кофейные лоты и митапы</label>
            <div class="form-row"><input type="email" required placeholder="e-mail" aria-label="e-mail"><button class="btn" type="submit">Подписаться</button></div>
            <p class="form-note">Одно письмо в месяц. Отписка — в один клик.</p>
          </form>
        </div></section>
      </section>

      ${page('services')}
        <section class="v1-sec" style="border-top:0"><div class="wrap">
          <div class="v1-sec-head"><span class="v1-num">Услуги</span>
            <div><h1 class="h-xl serif">IT-контур<br>под ключ</h1>
            <p class="lead" style="margin-top:18px">Разработка, железо, безопасность, интеграции и поддержка. Начинаем с диагностики, заканчиваем работающей системой и понятной документацией.</p></div>
          </div>
          <div class="v1-rows">{{serviceRowsAll}}</div>
        </div></section>
        <section class="v1-sec"><div class="wrap">
          <div class="v1-split">
            <div class="v1-booking">
              <h3 class="serif">Заявка на расчёт</h3>
              <p>Опишите задачу — вернёмся с оценкой, сроками и планом работ.</p>
              <form class="lead-form js-lead">
                <div class="row"><input name="name" required placeholder="Имя" autocomplete="name"><input name="contact" required placeholder="Телефон или e-mail" autocomplete="tel"></div>
                <select name="topic" aria-label="Что интересует">
                  <option>Разработка ПО и сайтов</option><option>Закупка серверов и лицензий</option>
                  <option>Информационная безопасность</option><option>Интеграции и автоматизация</option><option>Инфраструктура и поддержка</option>
                </select>
                <textarea name="message" rows="4" placeholder="Коротко о задаче: что есть сейчас, что нужно получить"></textarea>
                <button class="btn" type="submit">Отправить заявку</button>
                <p class="form-note">Форма открывает почтовое приложение с готовым письмом. <span class="form-ok" hidden>Письмо сформировано.</span></p>
              </form>
            </div>
            <div>
              <h2 class="h-md serif">Как проходит работа</h2>
              <ul class="v1-list" style="gap:18px;margin-top:20px">
                <li><span class="v1-num" style="padding:0;font-size:11px">01</span><span><b>Диагностика.</b> Смотрим инфраструктуру, код и процессы. Бесплатно, 30 минут + отчёт.</span></li>
                <li><span class="v1-num" style="padding:0;font-size:11px">02</span><span><b>Смета и план.</b> Фиксируем объём, сроки и стоимость. Без «уточним в процессе».</span></li>
                <li><span class="v1-num" style="padding:0;font-size:11px">03</span><span><b>Работа спринтами.</b> Демо раз в две недели, доступ к задачам и чату.</span></li>
                <li><span class="v1-num" style="padding:0;font-size:11px">04</span><span><b>Передача.</b> Документация, обучение команды, гарантия и поддержка.</span></li>
              </ul>
            </div>
          </div>
        </div></section>
      </section>

      ${page('cases')}
        <section class="v1-sec" style="border-top:0"><div class="wrap">
          <div class="v1-sec-head"><span class="v1-num">Кейсы</span>
            <div><h1 class="h-xl serif">Что мы<br>сделали</h1>
            <p class="lead" style="margin-top:18px">Шесть проектов из разных направлений. В каждом — задача, решение и цифры, которые можно проверить.</p></div>
          </div>
          {{casesHtml}}
        </div></section>
        <section class="v1-cta"><div class="wrap">
          <div><h2>Ваш проект<br>будет следующим</h2><p>Расскажите задачу — предложим решение и честную смету.</p></div>
          <div><a class="btn" href="#contacts" data-cta="project">Обсудить проект {{ic:arrow}}</a></div>
        </div></section>
      </section>

      ${page('vendors')}
        <section class="v1-sec" style="border-top:0"><div class="wrap">
          <div class="v1-sec-head"><span class="v1-num">Вендоры</span>
            <div><h1 class="h-xl serif">Железо<br>и софт</h1>
            <p class="lead" style="margin-top:18px">Прямые контракты с вендорами и партнёрские цены. Подбираем стек под задачу, а не под размер бонуса.</p></div>
          </div>
          <div class="v1-vendors">{{vendorsHtml}}</div>
          <div class="v1-split" style="margin-top:56px">
            <div><h2 class="h-md serif">Как мы выбираем вендора</h2>
            <ul class="v1-list" style="margin-top:18px">
              <li>{{ic:check}}<span>Совместимость с текущим контуром и планом роста</span></li>
              <li>{{ic:check}}<span>Сроки поставки и наличие сервисных центров в РФ</span></li>
              <li>{{ic:check}}<span>Стоимость владения на 3 года, а не только цена закупки</span></li>
              <li>{{ic:check}}<span>Доступность запчастей и квалифицированных инженеров</span></li>
            </ul></div>
            <div class="v1-booking">
              <h3 class="serif">Подбор оборудования</h3>
              <p>Пришлите текущую конфигурацию или задачу — подготовим спецификацию с двумя-тремя вариантами по бюджету.</p>
              <form class="lead-form js-lead">
                <div class="row"><input name="name" required placeholder="Имя"><input name="contact" required placeholder="Контакт"></div>
                <input type="hidden" name="topic" value="Подбор оборудования и вендоров">
                <textarea name="message" rows="3" placeholder="Что нужно: серверы, СХД, сеть, лицензии?"></textarea>
                <button class="btn" type="submit">Получить спецификацию</button>
                <p class="form-note">Ответим в рабочее время. <span class="form-ok" hidden>Письмо сформировано.</span></p>
              </form>
            </div>
          </div>
        </div></section>
      </section>

      ${page('space')}
        <section class="v1-sec" style="border-top:0"><div class="wrap">
          <div class="v1-sec-head"><span class="v1-num">Пространство</span>
            <div><h1 class="h-xl serif">Кофейня,<br>где работают</h1>
            <p class="lead" style="margin-top:18px">Тихие рабочие места, переговорки и площадка для митапов. Бронь — за пару минут, кофе — сразу.</p></div>
          </div>
          {{zonesHtml}}
          <div class="v1-split" style="margin-top:56px">
            <div>
              <h2 class="h-md serif">Меню</h2>
              <p style="font-size:14px;opacity:.7;margin:8px 0 12px">Обжарка своя, зерно меняем каждые две недели.</p>
              {{menuHtml}}
            </div>
            <div class="v1-booking">
              <h3 class="serif">Бронирование</h3>
              <p>Стол, переговорка или место на митап — оставьте заявку, подтвердим в течение часа.</p>
              <form class="lead-form js-book">
                <div class="row"><input name="name" required placeholder="Имя"><input name="contact" required placeholder="Телефон или @telegram"></div>
                <div class="row"><input type="date" name="date" required aria-label="Дата"><select name="time" aria-label="Время"><option>09:00–12:00</option><option>12:00–16:00</option><option>16:00–20:00</option><option>20:00–23:00</option></select></div>
                <div class="row"><select name="zone" aria-label="Зона"><option>Рабочее место</option><option>Переговорка</option><option>Митап / событие</option><option>Стол у бара</option></select><input name="people" placeholder="Сколько человек" inputmode="numeric"></div>
                <button class="btn" type="submit">Забронировать</button>
                <p class="form-note">Бронь подтверждаем звонком или сообщением. <span class="form-ok" hidden>Заявка сформирована.</span></p>
              </form>
            </div>
          </div>
        </div></section>
      </section>

      ${page('shop')}
        <section class="v1-sec" style="border-top:0"><div class="wrap">
          <div class="v1-sec-head"><span class="v1-num">Мерч</span>
            <div><h1 class="h-xl serif">Кружки,<br>худи, стикеры</h1>
            <p class="lead" style="margin-top:18px">Фирменные вещи coffeeIT. Забрать можно у бара или заказать доставку по Москве.</p></div>
          </div>
          <div class="v1-shop-note"><span>23 позиции · печать и вышивка собственного производства</span>
            <button class="btn btn-ghost btn-sm" data-cart-open>Открыть корзину {{ic:cart}}</button></div>
          {{shopHtml}}
        </div></section>
      </section>

      ${page('contacts')}
        <section class="v1-sec" style="border-top:0"><div class="wrap">
          <div class="v1-sec-head"><span class="v1-num">Контакты</span>
            <div><h1 class="h-xl serif">Приходите<br>или пишите</h1>
            <p class="lead" style="margin-top:18px">Мы на «Флаконе», вход 3, первый этаж. Если задача срочная — напишите в Telegram, ответим быстрее.</p></div>
          </div>
          <div class="v1-contacts">
            <div>
              <ul class="v1-crows">{{contactsHtml}}</ul>
              <div class="v1-map">Схема проезда — «Флакон», вход 3<br><span style="opacity:.6">5 минут от м. Дмитровская</span></div>
            </div>
            <div class="v1-booking">
              <h3 class="serif">Оставить заявку</h3>
              <p>Задача, бюджет, сроки — в свободной форме. Ответим в рабочее время.</p>
              <form class="lead-form js-lead">
                <div class="row"><input name="name" required placeholder="Имя"><input name="contact" required placeholder="Телефон или e-mail"></div>
                <select name="topic" aria-label="Тема"><option>Разработка и сайты</option><option>Серверы и лицензии</option><option>Информационная безопасность</option><option>Бронирование пространства</option><option>Мерч и корпоративные подарки</option></select>
                <textarea name="message" rows="4" placeholder="Опишите задачу"></textarea>
                <button class="btn" type="submit">Отправить</button>
                <p class="form-note">Или напишите напрямую: ${c.mail} · ${c.tg}. <span class="form-ok" hidden>Письмо сформировано.</span></p>
              </form>
            </div>
          </div>
        </div></section>
      </section>
    </main>
    <div id="cartSlot"></div>`;
  };
})();
