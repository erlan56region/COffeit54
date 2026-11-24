/* ============================================================
   coffeeIT · мобильные исправления (общая часть для всех обликов)

   Здесь то, что нельзя выразить в CSS без дублей и что нужно
   всем восьми вариантам одинаково:

     1) «мостик» получает размеры вьюпорта и высоту пульта оболочки,
        чтобы поднимать корзину, меню и тосты над пультом;
     2) если облик открыт отдельной страницей (без оболочки),
        оформление берётся из системных настроек устройства.
   ============================================================ */
(function () {
  if (window.__ciMobileFix) return;
  window.__ciMobileFix = true;

  var inShell = false;
  try { inShell = window.parent && window.parent !== window; } catch (e) { inShell = false; }

  function announceSize() {
    var h = window.innerHeight || 0;
    try {
      parent.postMessage({
        __ci: 1, type: 'size', variant: document.documentElement.getAttribute('data-variant') || 'page',
        vw: window.innerWidth || 0, vh: h,
        safe: 0
      }, '*');
    } catch (e) {}
  }

  var t = null;
  function onResize() {
    clearTimeout(t);
    t = setTimeout(announceSize, 180);
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);
  announceSize();

  window.addEventListener('message', function (e) {
    var d = e.data || {};
    if (!d.__ciShell) return;
    /* оболочка сообщает, сколько занимает нижний пульт — сдвигаем свои элементы */
    var pad = Math.max(0, Math.min(260, Number(d.chrome) || 0));
    document.documentElement.style.setProperty('--ci-shell-bottom', pad + 'px');
    if (typeof d.vh === 'number' && d.vh > 0) {
      document.documentElement.style.setProperty('--ci-vh', d.vh + 'px');
    }
  });

  /* отдельная страница: уважаем системную тёмную тему */
  if (!inShell && window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    try { document.documentElement.setAttribute('data-ci-scheme', mq.matches ? 'dark' : 'light'); } catch (e) {}
  }
})();
