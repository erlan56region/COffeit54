/* Настройки оформления сохраняются только в браузере посетителя. */
(function () {
  'use strict';
  var palettes = {
    blue:   { label:'Классика', color:'#1f4fd8', bg:'#f6f7f8', card:'#ffffff', fg:'#101828', muted:'#526072', line:'#d8e0e9', tile:'#eaf0ff' },
    forest: { label:'Лес', color:'#176044', bg:'#edf4ef', card:'#f9fcf9', fg:'#142b20', muted:'#496052', line:'#cbded1', tile:'#e0eee5' },
    coffee: { label:'Кофе', color:'#83421e', bg:'#f7eee5', card:'#fffaf4', fg:'#342116', muted:'#6a5040', line:'#e3cdb9', tile:'#f4e5d7' },
    berry:  { label:'Ягода', color:'#923551', bg:'#f9eef1', card:'#fff9fa', fg:'#371d28', muted:'#6c4c58', line:'#e8cfd7', tile:'#f5e1e8' },
    violet: { label:'Лаванда', color:'#63449a', bg:'#f2eef9', card:'#fcfaff', fg:'#292038', muted:'#5f536d', line:'#dcd1e9', tile:'#ebe2f8' }
  };
  var key = 'coffeeit-v5-appearance', saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch (e) {}
  var selected = Object.prototype.hasOwnProperty.call(palettes, saved.palette) ? saved.palette : 'blue';
  var winter = typeof saved.winter === 'boolean' ? saved.winter : true;
  var night = saved.night === true;
  var automatic = saved.automatic === true;
  var paletteIds = Object.keys(palettes);
  var animationFrame = null;
  var reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var nightColors = {blue:'#b5cbff',forest:'#9cdbba',coffee:'#f0c09a',berry:'#f1b6c8',violet:'#d0bcff'};
  function boot() {
    var head = document.querySelector('.v5-head');
    if (!head) return;
    var panel = document.createElement('section'); panel.className = 'v5-appearance'; panel.setAttribute('aria-label','Оформление сайта');
    panel.innerHTML = '<div class="wrap v5-appearance-wrap"><div class="v5-appearance-intro"><span class="v5-appearance-spark" aria-hidden="true">✳</span><span><b>Сайт под настроение</b><small>Выберите свою атмосферу</small></span></div><details class="v5-theme-menu"><summary><span class="v5-current-swatch" aria-hidden="true"></span><span class="v5-current-label">Классика</span><span class="v5-chevron" aria-hidden="true">⌄</span></summary><div class="v5-theme-popover"><div class="v5-popover-heading"><span>ВАША ПАЛИТРА</span><b>Какой будет ваш coffeeIT?</b><small>Цвет меняется на всех страницах</small></div><div class="v5-style-switch" role="group" aria-label="Стиль смены палитры"><button type="button" data-style="manual">Вручную</button><button type="button" data-style="auto"><span aria-hidden="true">✦</span> Автоматически</button></div><p class="v5-auto-description">Палитра плавно меняется сама</p><div class="v5-palettes" role="group" aria-label="Цветовая схема"></div><div class="v5-season-control"><div><b>Новогоднее настроение</b><small>Праздничный дизайн и снег</small></div><button type="button" class="v5-winter-toggle" aria-label="Новогоднее оформление"><span class="v5-toggle-track" aria-hidden="true"><span></span></span><span class="v5-toggle-text"></span></button></div><p class="v5-appearance-note">✦ Выбор сохранится на этом устройстве</p></div></details></div>';
    head.insertAdjacentElement('afterend', panel);
    var dayNight = head.querySelector('.v5-day-night');
    if (dayNight) dayNight.addEventListener('click', function () { night = !night; apply(); save(); });
    var styleButtons = panel.querySelectorAll('[data-style]');
    var group = panel.querySelector('.v5-palettes');
    styleButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        automatic = button.dataset.style === 'auto';
        apply(); save();
      });
    });
    Object.keys(palettes).forEach(function (id) {
      var b = document.createElement('button'); b.type = 'button'; b.dataset.palette = id;
      b.innerHTML = '<span class="v5-swatch" aria-hidden="true" style="--swatch:' + palettes[id].color + ';--swatch-bg:' + palettes[id].bg + '"><i></i><i></i></span><span>' + palettes[id].label + '</span><span class="v5-palette-check" aria-hidden="true">✓</span>'; 
      b.addEventListener('click', function () { selected = id; automatic = false; apply(); save(); }); group.appendChild(b);
    });
    var toggle = panel.querySelector('.v5-winter-toggle');
    toggle.addEventListener('click', function () { winter = !winter; apply(); save(); });
    var banner = document.createElement('div'); banner.className = 'v5-winter-banner'; banner.innerHTML = '<span aria-hidden="true">✳ &nbsp; ✦ &nbsp; ✳</span> СЕЗОН ТЁПЛЫХ ИДЕЙ <span class="v5-banner-divider">/</span> Кофе горячий, идеи свежие <span aria-hidden="true">✳ &nbsp; ✦ &nbsp; ✳</span>';  panel.insertAdjacentElement('afterend', banner);
    var copy = document.querySelector('.v5-hero-copy');
    if (copy) {
      var greeting = document.createElement('div'); greeting.className = 'v5-festive-note';
      greeting.innerHTML = '<span class="v5-festive-icon" aria-hidden="true">✳</span><span><small>ОТ COFFEEIT С ТЕПЛОМ</small><b>Пусть всё задуманное сбудется.</b><em>С Новым годом и новыми идеями!</em></span><span class="v5-festive-star" aria-hidden="true">✦</span>';
      var cta = copy.querySelector('.v5-hero-cta'); if (cta) cta.insertAdjacentElement('afterend', greeting);
    }
    var heroCard = document.querySelector('.v5-hero-card');
    if (heroCard) { var seal = document.createElement('div'); seal.className = 'v5-festive-seal'; seal.setAttribute('aria-hidden','true'); seal.innerHTML = '<span>ЗИМНЯЯ</span><b>✳</b><span>ИСТОРИЯ</span>'; heroCard.appendChild(seal); }
    var snow = document.createElement('div'); snow.className = 'v5-snow'; snow.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 24; i++) { var flake = document.createElement('span'); flake.textContent = '❄'; flake.style.left = ((i * 37) % 100) + '%'; flake.style.fontSize = (10 + i % 4 * 4) + 'px'; flake.style.animationDuration = (8 + i % 7) + 's'; flake.style.animationDelay = (-i * 0.7) + 's'; snow.appendChild(flake); }
    document.body.appendChild(snow);
    var photos = Array.prototype.slice.call(document.querySelectorAll('.v5-hero-photo, .v5-space-photo'));
    photos.forEach(function (el) { el.dataset.originalBackground = el.style.backgroundImage; });
    function colorMix(a, b, amount) {
      var result = '#';
      for (var i = 1; i < 7; i += 2) {
        var from = parseInt(a.slice(i, i + 2), 16), to = parseInt(b.slice(i, i + 2), 16);
        result += Math.round(from + (to - from) * amount).toString(16).padStart(2, '0');
      }
      return result;
    }
    function paint(fromId, toId, amount) {
      var a = palettes[fromId], b = palettes[toId], style = document.body.style;
      function mix(prop) { return colorMix(a[prop], b[prop], amount); }
      var accent = mix('color'), card = mix('card'), fg = mix('fg'), tile = mix('tile');
      var vars = {'--bg':mix('bg'),'--card':card,'--fg':fg,'--muted':mix('muted'),'--line':mix('line'),
        '--accent':accent,'--btn-bg':accent,'--btn-fg':'#ffffff','--accent-fg':'#ffffff',
        '--tile':tile,'--tile-fg':accent,'--input-bg':card,'--tag-bg':tile,'--tag-fg':fg};
      if (night) {
        var nightAccent = colorMix(nightColors[fromId], nightColors[toId], amount);
        vars['--bg'] = '#101722'; vars['--card'] = '#1c2634'; vars['--fg'] = '#f1f4f8';
        vars['--muted'] = '#b8c5d4'; vars['--line'] = '#435165'; vars['--accent'] = nightAccent;
        vars['--tile'] = '#303e50'; vars['--tile-fg'] = nightAccent; vars['--input-bg'] = '#222f3e';
        vars['--tag-bg'] = '#303e50'; vars['--tag-fg'] = '#f1f4f8';
      }
      Object.keys(vars).forEach(function (name) { style.setProperty(name, vars[name]); });
      panel.querySelector('.v5-current-swatch').style.background = accent;
    }
    function startAnimation() {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      animationFrame = null;
      if (!automatic || (reduceMotion && reduceMotion.matches)) { paint(selected, selected, 0); return; }
      var start = null, initial = paletteIds.indexOf(selected), duration = 12000;
      function tick(timestamp) {
        if (start === null) start = timestamp;
        var progress = (timestamp - start) / duration;
        var index = (initial + Math.floor(progress)) % paletteIds.length;
        var fraction = progress % 1;
        // Плавное начало и окончание каждого перехода без резких скачков.
        var eased = fraction * fraction * (3 - 2 * fraction);
        paint(paletteIds[index], paletteIds[(index + 1) % paletteIds.length], eased);
        animationFrame = requestAnimationFrame(tick);
      }
      paint(selected, selected, 0);
      animationFrame = requestAnimationFrame(tick);
    }
    function apply() {
      document.body.classList.toggle('v5-night', night);
      if (dayNight) {
        dayNight.setAttribute('aria-pressed', String(night));
        dayNight.setAttribute('aria-label', night ? 'Включить дневной режим' : 'Включить ночной режим');
        dayNight.querySelector('.v5-day-night-icon').textContent = night ? '☀' : '☾';
        dayNight.querySelector('.v5-day-night-label').textContent = night ? 'День' : 'Ночь';
      }
      styleButtons.forEach(function (button) { button.setAttribute('aria-pressed', String((button.dataset.style === 'auto') === automatic)); });
      group.querySelectorAll('button').forEach(function (button) { button.setAttribute('aria-pressed', String(!automatic && button.dataset.palette === selected)); });
      toggle.setAttribute('aria-pressed', String(winter));
      toggle.querySelector('.v5-toggle-text').textContent = winter ? 'Вкл.' : 'Выкл.';
      panel.querySelector('.v5-current-label').textContent = automatic ? 'Автоматически' : palettes[selected].label;
      panel.querySelector('.v5-auto-description').textContent = automatic && reduceMotion && reduceMotion.matches
        ? 'Анимация отключена настройками устройства' : 'Палитра плавно меняется сама';
      document.body.classList.toggle('v5-winter', winter);
      photos.forEach(function (el, index) { var image = el.classList.contains('v5-hero-photo') ? window.CI_WINTER_PHOTOS.hero : (index === 1 ? window.CI_WINTER_PHOTOS.bar : null); el.style.backgroundImage = winter && image ? 'url("' + image + '")' : el.dataset.originalBackground; });
      startAnimation();
    }
    function save() { try { localStorage.setItem(key, JSON.stringify({palette:selected,winter:winter,night:night,automatic:automatic})); } catch (e) {} }
    if (reduceMotion) {
      if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', apply);
      else if (reduceMotion.addListener) reduceMotion.addListener(apply);
    }
    apply();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
