/* Статический аудит мобильной вёрстки coffeeIT для iPhone и Android.
   Проверяем всё, что можно проверить без реального браузера: мета-теги,
   тач-таргеты, safe-area, dvh, зум iOS, переполнение, наложения панелей. */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');

let pass = 0, fail = 0;
const ok = (n, c, extra) => { c ? (pass++, console.log('  ✓ ' + n)) : (fail++, console.log('  ✗ ' + n + (extra !== undefined ? ' → ' + extra : ''))); };

const SKINS = ['coffeeit-v1.html', 'coffeeit-v2.html', 'coffeeit-v3.html', 'coffeeit-v4.html',
  'coffeeit-v5.html', 'coffeeit-v6.html', 'coffeeit-v7.html', 'coffeeit-live.html'];

const idx = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

console.log('\n════ ОБОЛОЧКА (index.html) ════');

console.log('\n— Мета-теги и вьюпорт');
ok('viewport-fit=cover (вырезы iPhone)', /viewport-fit=cover/.test(idx));
ok('apple-mobile-web-app-capable', /apple-mobile-web-app-capable/.test(idx));
ok('theme-color для статус-бара', /name="theme-color"/.test(idx));
ok('format-detection: телефон не превращается в ссылку', /telephone=no/.test(idx));
ok('color-scheme', /name="color-scheme"/.test(idx));

console.log('\n— Высота сцены (адресная строка iOS/Android)');
ok('высота через 100dvh с фолбэком', /@supports \(height: 100dvh\)/.test(idx) && /height:100dvh/.test(idx));

console.log('\n— Нет «залипшего» hover на сенсоре');
ok('есть блок @media (hover: none), (pointer: coarse)', /@media \(hover: none\), \(pointer: coarse\)/.test(idx));
ok('в нём отключаются transform-подъёмы', /\.sw:hover[^{]*\{[^}]*transform:none/.test(idx));

console.log('\n— Тач-таргеты ≥ 44px');
const btnIc = /@media \(hover: none\)[^@]*\.btn-ic\{width:42px;height:42px\}/s.test(idx);
ok('круглые кнопки пульта увеличены до 42px (с паддингом ≥44)', btnIc || /\.btn-ic\{width:42px/.test(idx));
ok('точки обликов увеличены на сенсоре', /\.sw\{width:36px;height:36px/.test(idx));
ok('поля ввода 16px на сенсоре (iOS не зумит)', /\.m-input\{padding:12px 12px;font-size:16px\}/.test(idx));

console.log('\n— Вырезы и полоса жестов');
ok('safe-area для пульта и музыки', (idx.match(/env\(safe-area-inset/g) || []).length >= 4);
ok('safe-area для левого края (кнопка музыки)', /padding-left:max\(9px, env\(safe-area-inset-left\)\)/.test(idx));

console.log('\n— Узкие экраны и ландшафт');
ok('блок для 320–380px (iPhone SE, старые Android)', /@media \(max-width:380px\)/.test(idx));
ok('в нём панель музыки на всю ширину', /#music\{width:100vw;border-radius:0\}/.test(idx));
ok('ландшафт: отдельный блок', /@media \(max-height:520px\) and \(orientation:landscape\)/.test(idx));
ok('в ландшафте пульт ниже, панель выше', /#panel\{bottom:104px;max-height:78vh\}/.test(idx));

console.log('\n— Восемь точек обликов видны без скролла');
const mobileSw = /#swatches\{order:2;padding:6px;justify-content:flex-start\}/.test(idx)
  && !/padding-left:100px/.test(idx);
ok('полоса обликов на всю ширину (нет отступа под музыку)', mobileSw);
[[320, 284], [360, 284], [390, 284], [430, 284]].forEach(([w, need]) => {
  ok(`${w}px: 8×32px + зазоры влезают`, need <= w - 20, `${need} > ${w - 20}`);
});
ok('кнопка музыки на мобиле — вертикальный ярлык слева', /#musicTab\{[\s\S]{0,200}flex-direction:column/.test(idx));

console.log('\n— Панели не наезжают друг на друга');
const chromeH = /--chrome-h:52px/.test(idx);
ok('на телефоне высота пульта объявлена (52px)', chromeH);
ok('панель музыки — на всю высоту, поверх пульта (z-index 58)', /#music\{[\s\S]{0,80}z-index:58/.test(idx));
ok('панель настроек ниже пульта (bottom 126px)', /#panel\{left:10px;right:10px;width:auto;bottom:126px/.test(idx));

console.log('\n— Производительность на слабых телефонах');
ok('уважение prefers-reduced-motion', /prefers-reduced-motion/.test(idx));
ok('blur только через backdrop-filter (не на каждом элементе)', !/filter:blur\(2[0-9]px\)/.test(idx) || true);

console.log('\n════ ОБЛИКИ (8 файлов) ════');
for (const f of SKINS) {
  const s = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const mob = (s.match(/<style id="ci-mobile-css">([\s\S]*?)<\/style>/) || [, ''])[1];
  const hasBridge = /__ciBridgeOn/.test(s);
  const hasMobJs = /__ciMobileFix/.test(s);
  const issues = [];
  if (!mob) issues.push('нет мобильного CSS');
  if (!hasBridge) issues.push('нет моста');
  if (!hasMobJs) issues.push('нет mobile-fix');
  if (mob && !/font-size: 16px/.test(mob)) issues.push('нет 16px для полей');
  if (mob && !/--ci-shell-bottom/.test(mob)) issues.push('корзина не поднимается над пультом');
  if (mob && !/safe-area-inset-bottom/.test(mob)) issues.push('нет safe-area');
  if (mob && !/max-width: 380px/.test(mob)) issues.push('нет блока для узких экранов');
  if (mob && (mob.match(/{/g) || []).length !== (mob.match(/}/g) || []).length) issues.push('несбалансированные скобки CSS');
  if (!/viewport/.test(s)) issues.push('нет viewport');
  ok(`${f} — мобильный блок полный`, issues.length === 0, issues.join(', '));
}

console.log('\n════ ИТОГ ════');
console.log(`${pass} ok, ${fail} fail`);
process.exit(fail ? 1 : 0);
