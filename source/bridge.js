/* ============================================================
   coffeeIT · activity bridge
   Связывает автономный вариант сайта (coffeeit-v1…v7, -live)
   со страницей-оболочкой coffeeit-show.html.

   Зачем: оболочка показывает вариант в iframe. Ей нужно знать,
   что посетитель что-то делает (движение, скролл, клик, ввод), —
   чтобы не менять облик под руками, — а также в каком разделе он
   находится и какова позиция прокрутки.

   А в обратную сторону оболочка умеет:
     state  — прислать текущее состояние
     scroll — перевести страницу к нужной доле прокрутки
     hash   — открыть раздел (например, #home)
     enter  — проиграть каскадное появление блоков после смены облика
     sleep / wake — заморозить анимации скрытого варианта (экономия CPU)

   Работает по postMessage, поэтому не требует same-origin:
   достаточно, чтобы файлы лежали рядом (в том числе при открытии
   с диска, через file://).
   ============================================================ */
(function () {
  if (window.__ciBridgeOn) return;
  window.__ciBridgeOn = true;

  var V = document.documentElement.getAttribute('data-variant') || 'page';
  var lastSent = 0;
  var styleReady = false;
  var enterCleanup = null;

  function overlayOpen() {
    var b = document.body;
    if (!b) return false;
    if (b.classList.contains('menu-open')) return true;
    return !!document.querySelector('.cart-drawer.is-open, .scrim.is-open, dialog[open], .mobile-menu.is-open');
  }

  function snapshot() {
    var de = document.documentElement;
    return {
      hash: location.hash || '#home',
      y: Math.round(window.scrollY || window.pageYOffset || 0),
      max: Math.max(1, Math.round((de.scrollHeight || 0) - window.innerHeight)),
      overlay: overlayOpen()
    };
  }

  function send(type, extra) {
    var payload = { __ci: 1, type: type, variant: V, t: Date.now() };
    var s = snapshot(), k;
    for (k in s) payload[k] = s[k];
    if (extra) for (k in extra) payload[k] = extra[k];
    try { parent.postMessage(payload, '*'); } catch (e) {}
  }

  function activity() {
    var n = Date.now();
    if (n - lastSent < 350) return;
    lastSent = n;
    send('activity');
  }

  ['pointerdown', 'keydown', 'wheel', 'touchstart', 'input', 'focusin', 'mousemove'].forEach(function (t) {
    window.addEventListener(t, activity, { passive: true, capture: true });
  });

  window.addEventListener('scroll', function () {
    var n = Date.now();
    if (n - lastSent < 350) return;
    lastSent = n;
    send('scroll');
  }, { passive: true });

  window.addEventListener('hashchange', function () { send('route'); });

  /* ---------- каскадное появление блоков ---------- */
  function ensureStyle() {
    if (styleReady || !document.head) return;
    styleReady = true;
    var s = document.createElement('style');
    s.id = 'ci-enter-style';
    s.textContent =
      'html.ci-enter [data-ci-enter]{animation:ciEnterIn .52s cubic-bezier(.22,.8,.24,1) both}' +
      '@keyframes ciEnterIn{from{opacity:0}to{opacity:1}}' +
      'html.ci-sleep *,html.ci-sleep *::before,html.ci-sleep *::after{animation-play-state:paused !important}' +
      '@media (prefers-reduced-motion: reduce){html.ci-enter [data-ci-enter]{animation:none}}';
    document.head.appendChild(s);
  }

  function pickBlocks() {
    var main = document.querySelector('main') || document.body;
    var list = Array.prototype.slice.call(main.children).filter(function (el) {
      return !/^(SCRIPT|STYLE|TEMPLATE)$/.test(el.tagName);
    });
    if (list.length < 4) {
      list = [];
      Array.prototype.forEach.call(main.children, function (el) {
        list = list.concat(Array.prototype.slice.call(el.children));
      });
    }
    var vh = window.innerHeight || 800;
    return list.filter(function (el) {
      var r = el.getBoundingClientRect();
      return r.height > 8 && r.top < vh * 1.6;
    }).slice(0, 9);
  }

  function enter() {
    ensureStyle();
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (enterCleanup) enterCleanup();
    var blocks = pickBlocks();
    blocks.forEach(function (el, i) {
      el.setAttribute('data-ci-enter', '');
      el.style.animationDelay = (i * 55) + 'ms';
    });
    document.documentElement.classList.add('ci-enter');
    var timer = setTimeout(function () {
      blocks.forEach(function (el) {
        el.removeAttribute('data-ci-enter');
        el.style.animationDelay = '';
      });
      document.documentElement.classList.remove('ci-enter');
      enterCleanup = null;
    }, 700 + blocks.length * 55);
    enterCleanup = function () {
      clearTimeout(timer);
      blocks.forEach(function (el) {
        el.removeAttribute('data-ci-enter');
        el.style.animationDelay = '';
      });
      document.documentElement.classList.remove('ci-enter');
      enterCleanup = null;
    };
  }

  window.addEventListener('message', function (e) {
    var d = e.data || {};
    if (d.__ciCmd === 'state') return send('state');
    if (d.__ciCmd === 'ping') return send('pong');
    if (d.__ciCmd === 'scroll') {
      var ratio = Math.max(0, Math.min(1, Number(d.ratio) || 0));
      var max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      window.scrollTo(0, Math.round(max * ratio));
      return;
    }
    if (d.__ciCmd === 'hash' && typeof d.hash === 'string') {
      if (location.hash !== d.hash) location.hash = d.hash;
      return;
    }
    if (d.__ciCmd === 'enter') return enter();
    if (d.__ciCmd === 'sleep') {
      document.documentElement.classList.add('ci-sleep');
      return;
    }
    if (d.__ciCmd === 'wake') {
      document.documentElement.classList.remove('ci-sleep');
      return;
    }
  });

  send('ready');
  document.addEventListener('DOMContentLoaded', function () { send('ready'); });
  window.addEventListener('load', function () { send('ready'); });
})();
