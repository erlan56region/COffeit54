/* Тесты музыкальной панели: открытие, нормализация ссылок, плеер, профиль. */
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '..', '..', 'index.html'), 'utf8');
let pass = 0, fail = 0;
const ok = (n, c, extra) => { if (c) { pass++; console.log('  ✓', n); } else { fail++; console.log('  ✗', n, extra !== undefined ? '→ ' + extra : ''); } };
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function boot() {
  const vc = new VirtualConsole();
  const errs = [];
  vc.on('jsdomError', e => errs.push(String(e).slice(0, 160)));
  const dom = new JSDOM(html, {
    url: 'http://localhost/index.html?skin=v6&interval=60',
    runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(win) {
      win.matchMedia = q => ({ matches: false, media: q, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
      win.Element.prototype.animate = () => ({ finished: Promise.resolve(), cancel() {} });
      win.Element.prototype.scrollIntoView = () => {};
      win.scrollTo = () => {};
      win.open = () => null;
      win.fetch = () => Promise.reject(new Error('offline'));
    }
  });
  const win = dom.window, doc = win.document;
  setInterval(() => Array.from(doc.querySelectorAll('.frame iframe')).forEach(f => {
    if (!f.__l) { f.__l = 1; f.dispatchEvent(new win.Event('load')); }
  }), 100);
  await sleep(700);
  return { dom, win, doc, errs };
}

(async () => {
  const { win, doc, errs } = await boot();

  console.log('\n— Наличие на странице');
  ok('кнопка «музыка» слева', !!doc.getElementById('musicTab'));
  ok('панель музыки', !!doc.getElementById('music'));
  ok('кнопка входа через Яндекс', !!doc.getElementById('mLogin'));
  ok('поле ссылки на плеер', !!doc.getElementById('mUrl'));
  ok('панель по умолчанию закрыта', !doc.getElementById('music').classList.contains('is-open'));

  console.log('\n— Открытие и закрытие');
  doc.getElementById('musicTab').click();
  ok('клик открывает панель', doc.getElementById('music').classList.contains('is-open'));
  ok('aria-expanded=true', doc.getElementById('musicTab').getAttribute('aria-expanded') === 'true');
  doc.getElementById('musicClose').click();
  ok('крестик закрывает', !doc.getElementById('music').classList.contains('is-open'));
  doc.dispatchEvent(new win.KeyboardEvent('keydown', { key: 'm', bubbles: true }));
  await sleep(50);
  ok('клавиша M открывает', doc.getElementById('music').classList.contains('is-open'));
  doc.dispatchEvent(new win.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await sleep(50);
  ok('Esc закрывает', !doc.getElementById('music').classList.contains('is-open'));

  console.log('\n— Разбор ссылок Яндекс Музыки');
  const norm = v => win.eval('ymNormalize(' + JSON.stringify(v) + ')');
  const cases = [
    ['https://music.yandex.ru/album/42895752', 'https://music.yandex.ru/iframe/album/42895752'],
    ['https://music.yandex.ru/album/42895752/track/123456', 'https://music.yandex.ru/iframe/album/42895752/track/123456'],
    ['https://music.yandex.ru/track/18992685', 'https://music.yandex.ru/iframe/track/18992685'],
    ['https://music.yandex.ru/users/erlan/playlists/1004', 'https://music.yandex.ru/iframe/playlist/erlan/1004'],
    ['https://music.yandex.com/iframe/#track/71263/419460', 'https://music.yandex.ru/iframe/#track/71263/419460'],
    ['<iframe frameborder="0" src="https://music.yandex.ru/iframe/#playlist/yandexmusic/1624" width="100%"></iframe>',
      'https://music.yandex.ru/iframe/#playlist/yandexmusic/1624']
  ];
  cases.forEach(([inp, want]) => {
    const got = norm(inp);
    ok('ссылка → iframe: ' + inp.slice(0, 46), got === want, got);
  });
  ok('чужой домен отклонён', norm('https://evil.example.com/album/1') === '');
  ok('мусор отклонён', norm('не ссылка') === '');

  console.log('\n— Плеер');
  const url = doc.getElementById('mUrl');
  url.value = 'https://music.yandex.ru/album/42895752/track/123456';
  doc.getElementById('mPlay').click();
  await sleep(120);
  const ifr = doc.querySelector('#mPlayer iframe');
  ok('iframe плеера создан', !!ifr);
  ok('src указывает на Яндекс', ifr && ifr.src.indexOf('music.yandex.ru/iframe/album/42895752/track/123456') >= 0, ifr && ifr.src);
  ok('заглушка скрыта', doc.getElementById('mEmpty').hidden === true);
  ok('кнопка пульсирует «играет»', doc.getElementById('musicTab').classList.contains('is-playing'));
  ok('ссылка сохранена', JSON.parse(win.localStorage.getItem('ci_music_v1')).src.indexOf('album/42895752') > 0);
  doc.getElementById('mPause').click();
  await sleep(60);
  ok('«Стоп» убирает плеер', !doc.querySelector('#mPlayer iframe'));
  ok('заглушка вернулась', doc.getElementById('mEmpty').hidden === false);

  console.log('\n— Пресеты');
  doc.querySelector('[data-ym-preset]').click();
  await sleep(120);
  ok('пресет включает плеер', !!doc.querySelector('#mPlayer iframe'));

  console.log('\n— Профиль без client_id');
  doc.getElementById('mLogin').click();
  await sleep(80);
  const setup = doc.getElementById('mSetup');
  ok('инструкция по client_id показана', setup && !setup.hidden && /client_id/.test(setup.textContent));
  ok('подсказка появилась', /client_id/.test(doc.getElementById('hintText').textContent), doc.getElementById('hintText').textContent);
  ok('гость видит вход, а не «вы вошли»', doc.getElementById('mGuest').hidden === false);

  console.log('\n— Выход');
  win.eval("setLoggedIn({login:'erlan',name:'Ерлан',email:'e@yandex.ru',id:1,avatar:''})");
  ok('имя подставлено', doc.getElementById('mName').textContent === 'Ерлан');
  doc.getElementById('mLogout').click();
  await sleep(60);
  ok('после выхода — снова вход', doc.getElementById('mGuest').hidden === false);

  console.log('\n— Ошибки');
  const real = errs.filter(e => !/canvas|getContext/i.test(e));
  ok('нет ошибок скрипта', real.length === 0, real.join(' | '));

  console.log('\nИтог: ' + pass + ' ok, ' + fail + ' fail');
  process.exit(fail ? 1 : 0);
})();
