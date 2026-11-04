/* coffeeIT engine — shared page engine, cart, filters, forms. Skins provide layout + CSS. */
(function () {
  'use strict';
  var CFG = window.CI_CONFIG;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  document.documentElement.setAttribute('data-variant', CFG.id);
  if (document.body) document.body.setAttribute('data-variant', CFG.id);
  if (CFG.tokens) Object.keys(CFG.tokens).forEach(function (k) { document.documentElement.style.setProperty(k, CFG.tokens[k]); });

  /* ---------- icons ---------- */
  var I = {
    cup: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 16h22v11a9 9 0 0 1-9 9h-4a9 9 0 0 1-9-9V16Z"/><path d="M32 19h4a5 5 0 0 1 0 10h-4"/><path d="M17 9c0 2-2 2.5-2 4.5M23 8c0 2-2 2.5-2 4.5M29 9c0 2-2 2.5-2 4.5"/></svg>',
    code: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15 8 24l10 9M30 15l10 9-10 9M27 11l-6 26"/></svg>',
    shield: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6 10 12v11c0 9 6 15 14 19 8-4 14-10 14-19V12L24 6Z"/><path d="m17 24 5 5 9-10"/></svg>',
    server: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="32" height="13" rx="3"/><rect x="8" y="27" width="32" height="13" rx="3"/><path d="M14 14.5h.01M14 33.5h.01M20 14.5h10M20 33.5h10"/></svg>',
    cart: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 9h5l4 22h22l4-16H14"/><circle cx="19" cy="39" r="3"/><circle cx="35" cy="39" r="3"/></svg>',
    chat: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M40 26c0 6-7 11-16 11a20 20 0 0 1-6-1L8 40l2.5-7A10 10 0 0 1 8 26c0-6 7-11 16-11s16 5 16 11Z"/></svg>',
    gear: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="6"/><path d="M24 6v5M24 37v5M6 24h5M37 24h5M11 11l4 4M33 33l4 4M37 11l-4 4M15 33l-4 4"/></svg>',
    arrow: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 24h26M26 14l10 10-10 10"/></svg>',
    arrowUp: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 40V12M14 22l10-10 10 10"/></svg>',
    plus: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M24 12v24M12 24h24"/></svg>',
    minus: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 24h24"/></svg>',
    close: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M14 14l20 20M34 14 14 34"/></svg>',
    pin: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 42s13-12 13-22a13 13 0 1 0-26 0c0 10 13 22 13 22Z"/><circle cx="24" cy="20" r="5"/></svg>',
    clock: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="16"/><path d="M24 14v10l7 5"/></svg>',
    wifi: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M8 20a24 24 0 0 1 32 0M14 27a16 16 0 0 1 20 0M20 34a8 8 0 0 1 8 0"/><circle cx="24" cy="40" r="1.8" fill="currentColor"/></svg>',
    cam: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="16" width="26" height="18" rx="4"/><path d="m31 24 12-7v18l-12-7"/></svg>',
    bolt: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M27 5 12 27h10l-3 16 17-23H25l2-15Z"/></svg>',
    bean: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><ellipse cx="24" cy="24" rx="13" ry="18" transform="rotate(35 24 24)"/><path d="M15 33c6-2 8-6 8-11S22 12 28 11"/></svg>',
    check: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m12 25 8 8 16-18"/></svg>',
    mug: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="13" width="23" height="24" rx="4"/><path d="M32 19h5a5 5 0 0 1 0 11h-5"/><path d="M15 22h11"/></svg>',
    shirt: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8 8 15l4 8 5-3v20h22V20l5 3 4-8-10-7-5 4h-6l-5-4Z"/></svg>',
    hoodie: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10 8 17l4 8 4-2v17h16V23l4 2 4-8-10-7"/><path d="M18 10c0 5 3 7 6 7s6-2 6-7"/><path d="M21 30h6"/></svg>',
    sticker: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6 30 17l12 2-9 9 2 12-11-6-11 6 2-12-9-9 12-2 6-11Z"/></svg>',
    bottle: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6h8v7l4 6v23H16V19l4-6V6Z"/><path d="M16 26h16"/></svg>',
    bag: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 16h28l-2 24H12L10 16Z"/><path d="M18 16a6 6 0 0 1 12 0"/></svg>',
    cap: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 32a16 16 0 0 1 32 0"/><path d="M8 32h32c0 4-3 6-8 6H16c-5 0-8-2-8-6Z"/><path d="M24 16v-4"/></svg>',
    book: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 10h12a6 6 0 0 1 6 6v24a5 5 0 0 0-5-5H8V10Z"/><path d="M40 10H28a6 6 0 0 0-6 6v24a5 5 0 0 1 5-5h13V10Z"/></svg>',
    key: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="17" cy="24" r="8"/><path d="M25 24h17M36 24v6M31 24v5"/></svg>',
    star: '<svg viewBox="0 0 48 48" fill="currentColor"><path d="M24 5 30 18l14 2-10 10 2 14-12-6-12 6 2-14L4 20l14-2 6-13Z"/></svg>',
    mail: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="11" width="34" height="26" rx="3"/><path d="m8 13 16 13 16-13"/></svg>',
    users: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="19" cy="18" r="6"/><path d="M7 38a12 12 0 0 1 24 0"/><path d="M32 13a6 6 0 0 1 0 11M36 38a11 11 0 0 0-5-9"/></svg>',
    layers: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m24 7 17 9-17 9-17-9 17-9Z"/><path d="m7 25 17 9 17-9"/><path d="m7 33 17 9 17-9"/></svg>'
  };
  function ic(n, cls) { return '<span class="ic ' + (cls || '') + '">' + (I[n] || I.bean) + '</span>'; }
  window.CI_ICON = ic;

  /* ---------- contacts ---------- */
  var C = CFG.contacts || {};
  var mail = C.mail || 'hello@coffeeit.studio';
  function mailto(subject, body) {
    return 'mailto:' + mail + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  /* ---------- raster art (canvas) ---------- */
  function raster(seed, w, h, mode) {
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    var x = c.getContext('2d');
    var s = seed || 7;
    function rnd() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    var art = CFG.art || {};
    var pal = art.palette || ['#888'];
    var M = mode || art.mode || 'mesh';
    x.fillStyle = art.base || '#141210';
    x.fillRect(0, 0, w, h);
    var i, cx, cy, r, g, col;

    if (M === 'mesh') {
      x.filter = 'blur(' + Math.round(Math.max(w, h) * 0.035) + 'px)';
      for (i = 0; i < 9; i++) {
        cx = rnd() * w; cy = rnd() * h; r = (0.25 + rnd() * 0.5) * Math.max(w, h);
        g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
        col = pal[Math.floor(rnd() * pal.length)];
        g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)');
        x.globalAlpha = 0.6 + rnd() * 0.4;
        x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill();
      }
      x.globalAlpha = 1; x.filter = 'none';
      // crisp accents
      x.strokeStyle = 'rgba(255,255,255,.16)';
      x.lineWidth = Math.max(1, w / 600);
      for (i = 0; i < 3; i++) { x.beginPath(); x.arc(rnd() * w, rnd() * h, (0.12 + rnd() * 0.3) * w, 0, Math.PI * 2); x.stroke(); }
    } else if (M === 'scan') {
      x.filter = 'blur(' + Math.round(Math.max(w, h) * 0.01) + 'px)';
      for (i = 0; i < 26; i++) {
        col = pal[Math.floor(rnd() * pal.length)];
        x.fillStyle = col; x.globalAlpha = 0.18 + rnd() * 0.5;
        var bh = (0.01 + rnd() * 0.09) * h;
        x.fillRect(0, rnd() * h, w, bh);
      }
      x.globalAlpha = 1; x.filter = 'none';
      for (i = 0; i < 7; i++) {
        col = pal[Math.floor(rnd() * pal.length)];
        x.fillStyle = col; x.globalAlpha = 0.85;
        x.fillRect(rnd() * w * 0.8, rnd() * h, (0.05 + rnd() * 0.4) * w, Math.max(2, h * 0.004));
      }
      x.globalAlpha = 1;
      x.strokeStyle = 'rgba(255,255,255,.2)'; x.lineWidth = 1;
      for (i = 0; i < 14; i++) { var yy = rnd() * h; x.beginPath(); x.moveTo(0, yy); x.lineTo(w, yy); x.stroke(); }
    } else if (M === 'blocks') {
      for (i = 0; i < 12; i++) {
        col = pal[Math.floor(rnd() * pal.length)];
        x.fillStyle = col; x.globalAlpha = 0.9;
        var bw = (0.15 + rnd() * 0.55) * w, bh2 = (0.1 + rnd() * 0.5) * h;
        x.beginPath();
        if (rnd() > 0.5) x.arc(rnd() * w, rnd() * h, bw / 2, 0, Math.PI * 2);
        else x.rect(rnd() * w - bw / 2, rnd() * h - bh2 / 2, bw, bh2);
        x.fill();
      }
      x.globalAlpha = 1;
      x.strokeStyle = art.ink || 'rgba(0,0,0,.5)';
      x.lineWidth = Math.max(2, w / 240);
      for (i = 0; i < 4; i++) {
        x.beginPath(); x.moveTo(0, rnd() * h);
        x.bezierCurveTo(w * 0.3, rnd() * h, w * 0.7, rnd() * h, w, rnd() * h); x.stroke();
      }
    } else if (M === 'terminal') {
      x.fillStyle = art.base || '#0d100e';
      x.fillRect(0, 0, w, h);
      x.strokeStyle = pal[0]; x.globalAlpha = 0.16; x.lineWidth = 1;
      var step = Math.max(12, w / 40);
      for (i = 0; i <= w; i += step) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, h); x.stroke(); }
      for (i = 0; i <= h; i += step) { x.beginPath(); x.moveTo(0, i); x.lineTo(w, i); x.stroke(); }
      x.globalAlpha = 1;
      var cols = ['0', '1', '/', '>', '#', '{', '}', ';', '=', '+', '*', '.'];
      x.font = Math.round(Math.max(9, w / 46)) + 'px ui-monospace, monospace';
      for (i = 0; i < 620; i++) {
        x.fillStyle = pal[Math.floor(rnd() * pal.length)];
        x.globalAlpha = 0.1 + rnd() * 0.55;
        x.fillText(cols[Math.floor(rnd() * cols.length)], rnd() * w, rnd() * h);
      }
      x.globalAlpha = 1;
      x.fillStyle = pal[0]; x.globalAlpha = 0.5;
      x.fillRect(0, h * 0.46, w, Math.max(2, h * 0.006));
      x.globalAlpha = 1;
    } else { /* corp */
      x.filter = 'blur(' + Math.round(Math.max(w, h) * 0.02) + 'px)';
      for (i = 0; i < 6; i++) {
        cx = rnd() * w; cy = rnd() * h; r = (0.4 + rnd() * 0.6) * w;
        g = x.createLinearGradient(cx - r, cy, cx + r, cy);
        col = pal[Math.floor(rnd() * pal.length)];
        g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)');
        x.fillStyle = g; x.globalAlpha = 0.7;
        x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill();
      }
      x.globalAlpha = 1; x.filter = 'none';
      x.strokeStyle = 'rgba(255,255,255,.22)'; x.lineWidth = 1;
      for (i = 0; i < 12; i++) {
        x.beginPath(); x.moveTo(rnd() * w, 0); x.lineTo(rnd() * w, h); x.stroke();
      }
    }
    // grain
    if (art.grain !== false) {
      for (var p = 0; p < Math.round(w * h / 700); p++) {
        x.fillStyle = 'rgba(255,255,255,' + (rnd() * 0.07) + ')';
        x.fillRect(rnd() * w, rnd() * h, 1.3, 1.3);
      }
    }
    return c.toDataURL('image/png');
  }

  /* ---------- product data ---------- */
  var CATNAMES = CFG.shopCats || { mug: 'Кружки', shirt: 'Футболки', hoodie: 'Худи', acc: 'Аксессуары', sticker: 'Стикеры' };
  var products = CFG.products.map(function (p, i) {
    return { id: 'p' + i, title: p[0], price: p[1], cat: p[2], icon: p[3], note: p[4] || '', seed: 900 + i * 53, img: null };
  });
  function productImg(p, size) {
    if (!p.imgs) p.imgs = {};
    var k = size || 480;
    if (!p.imgs[k]) p.imgs[k] = raster(p.seed, k, k);
    return p.imgs[k];
  }

  /* ---------- renderers ---------- */
  var NAV = [['home', 'Главная'], ['services', 'Услуги'], ['cases', 'Кейсы'], ['vendors', 'Вендоры'],
    ['space', 'Пространство'], ['sponsorship', 'Спонсорство'], ['shop', 'Мерч'], ['contacts', 'Контакты']];

  function navList() {
    return NAV.filter(function (n) { return n[0] !== 'sponsorship' || CFG.hasSponsorship; });
  }
  function navHtml() {
    return navList().map(function (n) { return '<a href="#' + n[0] + '" data-nav="' + n[0] + '">' + n[1] + '</a>'; }).join('');
  }

  function servicesCards() {
    return CFG.services.map(function (s) {
      return '<article class="service-card rv"><div class="service-ico">' + ic(s.icon) + '</div>' +
        '<h3>' + s.title + '</h3><p>' + s.text + '</p>' +
        '<ul class="ticks">' + s.list.map(function (l) { return '<li>' + l + '</li>'; }).join('') + '</ul>' +
        '<div class="service-meta"><span>' + s.price + '</span><span>' + s.time + '</span></div>' +
        '<a class="link-arrow" href="#contacts" data-cta="service" data-topic="' + s.title + '">' + CFG.labels.discuss + ic('arrow') + '</a></article>';
    }).join('');
  }

  function casesGrid(opt) {
    opt = opt || {};
    var list = opt.limit ? CFG.cases.slice(0, opt.limit) : CFG.cases;
    var chips = '';
    if (!opt.noChips) {
      var tags = ['Все'];
      CFG.cases.forEach(function (c) { if (tags.indexOf(c.tag) < 0) tags.push(c.tag); });
      chips = '<div class="chips" data-cases-filter>' + tags.map(function (t, i) {
        return '<button class="chip' + (i === 0 ? ' is-on' : '') + '" data-tag="' + t + '">' + t + '</button>';
      }).join('') + '</div>';
    }
    var cards = list.map(function (c, i) {
      return '<article class="case rv" data-tag="' + c.tag + '">' +
        '<div class="case-media" style="background-image:url(' + raster(101 + i * 37, 640, 460) + ')">' +
        '<span class="case-tag">' + c.tag + '</span><span class="case-idx">0' + (i + 1) + '</span></div>' +
        '<div class="case-body"><h3>' + c.title + '</h3><p>' + c.text + '</p>' +
        '<div class="case-metrics">' + c.metrics.map(function (m) {
          return '<div class="metric"><b>' + m[0] + '</b><span>' + m[1] + '</span></div>';
        }).join('') + '</div>' +
        '<details class="case-more"><summary>' + CFG.labels.readMore + '</summary><p>' + c.details + '</p></details>' +
        '</div></article>';
    }).join('');
    return chips + '<div class="case-grid">' + cards + '</div>';
  }

  function vendorsGrid() {
    return CFG.vendors.map(function (v) {
      return '<div class="vendor"><b>' + v[0] + '</b><span>' + v[1] + '</span></div>';
    }).join('');
  }

  function menuList() {
    return '<div class="menu-grid">' + CFG.menu.map(function (m) {
      return '<div class="menu-item"><div class="mi-top"><h4>' + m[0] + '</h4><b>' + m[1] + '</b></div><p>' + m[2] + '</p></div>';
    }).join('') + '</div>';
  }

  function zonesGrid() {
    return '<div class="zone-grid">' + CFG.zones.map(function (z) {
      return '<div class="zone"><div class="zone-ico">' + ic(z.icon) + '</div><h4>' + z.title + '</h4><p>' + z.text + '</p>' +
        '<span class="zone-price">' + z.price + '</span></div>';
    }).join('') + '</div>';
  }

  function productPhoto(p) {
    var P = window.CI_PHOTOS || {};
    if (!P.merch_wear) return null;
    if (p.cat === 'hoodie' || p.cat === 'shirt') return p.seed % 2 ? P.merch_wear : P.merch_detail;
    if (p.cat === 'mug') return P.coffee_bar;
    if (p.cat === 'acc' || p.cat === 'sticker') return P.merch_detail;
    return null;
  }

  function productCard(p) {
    var ph = productPhoto(p);
    return '<article class="product rv' + (ph ? ' has-photo' : '') + '" data-cat="' + p.cat + '">' +
      '<div class="product-media" style="background-image:url(' + (ph || productImg(p)) + ')">' + ic(p.icon, 'product-ico') + '</div>' +
      '<div class="product-body"><span class="product-cat">' + CATNAMES[p.cat] + '</span><h3>' + p.title + '</h3>' +
      (p.note ? '<p class="product-note">' + p.note + '</p>' : '') +
      '<div class="product-foot"><b>' + p.price.toLocaleString('ru-RU') + ' ₽</b>' +
      '<button class="btn btn-sm" data-add="' + p.id + '">В корзину</button></div></div></article>';
  }

  function shopGrid(opt) {
    opt = opt || {};
    var list = opt.limit ? products.slice(0, opt.limit) : products;
    var chips = '';
    if (!opt.noChips) {
      var cats = ['all'].concat(Object.keys(CATNAMES).filter(function (c) {
        return products.some(function (p) { return p.cat === c; });
      }));
      chips = '<div class="chips" data-shop-filter>' + cats.map(function (c, i) {
        return '<button class="chip' + (i === 0 ? ' is-on' : '') + '" data-cat="' + c + '">' + (c === 'all' ? 'Всё' : CATNAMES[c]) + '</button>';
      }).join('') + '</div>';
    }
    return chips + '<div class="product-grid">' + list.map(productCard).join('') + '</div>';
  }

  function contactsRows() {
    return (C.rows || []).map(function (r) {
      return '<li>' + ic(r[0]) + '<div><b>' + r[1] + '</b><span>' + r[2] + '</span></div></li>';
    }).join('');
  }

  function cartMarkup() {
    return '<div class="scrim" id="scrim" data-cart-close></div>' +
      '<aside class="cart-drawer" id="cartDrawer" aria-label="Корзина">' +
      '<header class="cart-head"><h3>' + (CFG.cartTitle || 'Корзина') + '</h3><button class="icon-btn" data-cart-close aria-label="Закрыть">' + ic('close') + '</button></header>' +
      '<div class="cart-body" id="cartBody"></div></aside>' +
      '<button class="cart-fab" id="cartFab" data-cart-open aria-label="Открыть корзину">' + ic('cart') +
      '<span class="badge" id="cartBadge">0</span></button>';
  }


  /* ---------- бегущая строка ---------- */
  function marquee(items, cls) {
    var row = items.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    return '<div class="mq ' + (cls || '') + '" data-marquee><div class="mq-inner">' + row + '</div></div>';
  }

  /* ---------- спонсорство ---------- */
  function sponsorStats() {
    var s = (CFG.sponsorship || {}).stats || [];
    return s.map(function (x) {
      var num = parseFloat(String(x[0]).replace(/[^\d.]/g, '')) || 0;
      return '<div class="sp-stat rv"><b data-count="' + num + '" data-suffix="' +
        String(x[0]).replace(/^[\d\s.,]+/, '') + '">' + x[0] + '</b><span>' + x[1] + '</span></div>';
    }).join('');
  }

  function sponsorProjects() {
    var P = (CFG.sponsorship || {}).projects || [];
    return P.map(function (p, i) {
      var img = (window.CI_PHOTOS || {})[p.photo] || raster(300 + i * 41, 760, 500);
      return '<article class="sp-card rv" data-proj="' + i + '">' +
        '<div class="sp-media" style="background-image:url(' + img + ')" data-parallax="14">' +
        '<span class="sp-tag">' + p.tag + '</span><span class="sp-year">' + p.year + '</span></div>' +
        '<div class="sp-body"><div class="sp-top"><h3>' + p.name + '</h3><span class="sp-status">' + p.status + '</span></div>' +
        '<p>' + p.text + '</p>' +
        '<div class="sp-metrics">' + p.metrics.map(function (m) {
          return '<div><b>' + m[0] + '</b><span>' + m[1] + '</span></div>';
        }).join('') + '</div>' +
        '<div class="sp-want"><b>Ищем партнёров:</b> ' + p.want.join(' · ') + '</div>' +
        '<a class="sp-link" href="#contacts" data-cta="sponsor" data-topic="Спонсорство: ' + p.name + '">Стать партнёром проекта →</a>' +
        '</div></article>';
    }).join('');
  }

  function sponsorTiers() {
    var T = (CFG.sponsorship || {}).tiers || [];
    return T.map(function (t, i) {
      return '<div class="sp-tier' + (i === 1 ? ' is-hot' : '') + ' rv">' +
        (i === 1 ? '<span class="sp-pop">Чаще всего выбирают</span>' : '') +
        '<span class="sp-metal m' + i + '">' + t[0] + '</span>' +
        '<b class="sp-price">' + t[1] + '</b><span class="sp-sub">' + t[2] + '</span>' +
        '<ul>' + t[3].map(function (x) { return '<li>' + ic('check') + '<span>' + x + '</span></li>'; }).join('') + '</ul>' +
        '<a class="btn ' + (i === 1 ? '' : 'btn-ghost') + '" href="#contacts" data-cta="sponsor" data-topic="Спонсорство: пакет ' + t[0] + '">Выбрать пакет</a>' +
        '</div>';
    }).join('');
  }

  function sponsorFaq() {
    var F = (CFG.sponsorship || {}).faq || [];
    return F.map(function (f, i) {
      return '<details' + (i === 0 ? ' open' : '') + '><summary>' + f[0] + '</summary><p>' + f[1] + '</p></details>';
    }).join('');
  }

  /* ---------- cart state ---------- */
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem('ci_cart_' + CFG.id) || '[]'); } catch (e) { cart = []; }
  function count() { return cart.reduce(function (a, b) { return a + b.qty; }, 0); }
  function total() { return cart.reduce(function (a, b) { return a + b.qty * b.price; }, 0); }
  function saveCart() {
    try { localStorage.setItem('ci_cart_' + CFG.id, JSON.stringify(cart)); } catch (e) {}
    renderCart();
  }
  function renderCart() {
    $$('#cartBadge').forEach(function (b) { b.textContent = count(); b.classList.toggle('is-empty', count() === 0); });
    var body = $('#cartBody');
    if (!body) return;
    if (!cart.length) {
      body.innerHTML = '<div class="cart-empty">' + ic('cart') + '<p>Корзина пуста. Мерч coffeeIT ждёт вас — кружки, худи и стикеры уже на витрине.</p>' +
        '<a class="btn btn-ghost" href="#shop" data-nav="shop">В магазин</a></div>';
      return;
    }
    var p = function (id) { return products.filter(function (x) { return x.id === id; })[0] || {}; };
    body.innerHTML = cart.map(function (l) {
      var pr = p(l.id);
      var th = pr.id ? (productPhoto(pr) || productImg(pr, 160)) : '';
      return '<div class="cart-line"><div class="cart-thumb" style="background-image:url(' + th + ')">' + ic(l.icon) + '</div>' +
        '<div class="cart-info"><b>' + l.title + '</b><span>' + l.price.toLocaleString('ru-RU') + ' ₽ / шт</span></div>' +
        '<div class="qty"><button data-dec="' + l.id + '" aria-label="Меньше">' + ic('minus') + '</button><span>' + l.qty + '</span>' +
        '<button data-inc="' + l.id + '" aria-label="Больше">' + ic('plus') + '</button></div></div>';
    }).join('') +
      '<div class="cart-total"><span>Итого</span><b>' + total().toLocaleString('ru-RU') + ' ₽</b></div>' +
      '<form class="cart-form" id="cartForm"><input name="name" required placeholder="Имя" autocomplete="name">' +
      '<input name="phone" required placeholder="Телефон или @telegram" autocomplete="tel">' +
      '<textarea name="comment" rows="2" placeholder="Комментарий к заказу (необязательно)"></textarea>' +
      '<button class="btn btn-full" type="submit">Оформить заказ</button>' +
      '<p class="form-note">Итог заказа откроется в почтовом приложении — останется нажать «Отправить».</p></form>';
  }

  /* ---------- toast ---------- */
  var toastEl, toastT;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2600);
  }
  window.CI_TOAST = toast;

  /* ---------- interactions ---------- */
  document.addEventListener('click', function (e) {
    var add = e.target.closest('[data-add]');
    if (add) {
      var id = add.getAttribute('data-add');
      var pr = products.filter(function (x) { return x.id === id; })[0];
      var line = cart.filter(function (x) { return x.id === id; })[0];
      if (line) line.qty++;
      else cart.push({ id: id, title: pr.title, price: pr.price, qty: 1, icon: pr.icon });
      saveCart();
      toast('«' + pr.title + '» в корзине');
      var old = add.textContent;
      add.textContent = 'Добавлено ✓';
      setTimeout(function () { add.textContent = old; }, 1200);
      return;
    }
    var t;
    if ((t = e.target.closest('[data-inc]'))) { cart.forEach(function (l) { if (l.id === t.getAttribute('data-inc')) l.qty++; }); saveCart(); return; }
    if ((t = e.target.closest('[data-dec]'))) {
      var did = t.getAttribute('data-dec');
      cart.forEach(function (l) { if (l.id === did) l.qty--; });
      cart = cart.filter(function (l) { return l.qty > 0; }); saveCart(); return;
    }
    if (e.target.closest('[data-cart-open]')) { openCart(true); return; }
    if (e.target.closest('[data-cart-close]')) { openCart(false); return; }

    /* tabs */
    if ((t = e.target.closest('[data-tab]'))) {
      var box = t.closest('[data-tabs]') || document;
      var key = t.getAttribute('data-tab');
      $$('[data-tab]', box).forEach(function (b) { b.classList.toggle('is-on', b === t); });
      $$('[data-panel]', box).forEach(function (p) { p.classList.toggle('is-on', p.getAttribute('data-panel') === key); });
      return;
    }

    /* filters */
    if ((t = e.target.closest('[data-tag]'))) {
      var wrap = t.closest('[data-cases-filter]');
      $$('.chip', wrap).forEach(function (c) { c.classList.toggle('is-on', c === t); });
      var tag = t.getAttribute('data-tag');
      $$('.case').forEach(function (c) {
        c.style.display = (tag === 'Все' || c.getAttribute('data-tag') === tag) ? '' : 'none';
      });
      return;
    }
    if ((t = e.target.closest('[data-cat]'))) {
      var w2 = t.closest('[data-shop-filter]');
      $$('.chip', w2).forEach(function (c) { c.classList.toggle('is-on', c === t); });
      var cat = t.getAttribute('data-cat');
      $$('.product').forEach(function (p) {
        p.style.display = (cat === 'all' || p.getAttribute('data-cat') === cat) ? '' : 'none';
      });
      return;
    }

    /* CTA → mail */
    var cta = e.target.closest('[data-cta]');
    if (cta && !cta.hasAttribute('href')) {
      e.preventDefault();
      var kind = cta.getAttribute('data-cta');
      var topic = cta.getAttribute('data-topic') || (CFG.ctaTopics || {})[kind] || '';
      window.location.href = mailto((CFG.subjectPrefix || 'coffeeIT —') + ' ' + topic,
        'Здравствуйте!\n\nХочу обсудить: ' + topic + '.\n\nЗадача: \nСроки: \nБюджет: ');
      toast('Открываем почту для заявки');
      return;
    }

    /* menu */
    if (e.target.closest('#burger')) {
      var on = document.body.classList.toggle('menu-open');
      var b = $('#burger'); if (b) b.setAttribute('aria-expanded', on ? 'true' : 'false');
      return;
    }
    if (e.target.closest('.mobile-menu a')) {
      document.body.classList.remove('menu-open');
      var b2 = $('#burger'); if (b2) b2.setAttribute('aria-expanded', 'false');
    }
  });

  function openCart(on) {
    var d = $('#cartDrawer'), ov = $('#scrim');
    if (!d) return;
    d.classList.toggle('is-open', on);
    if (ov) ov.classList.toggle('is-open', on);
    document.body.classList.toggle('cart-open', on);
  }

  /* ---------- forms ---------- */
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f.id === 'cartForm') {
      e.preventDefault();
      var d = new FormData(f);
      var lines = cart.map(function (l) {
        return '• ' + l.title + ' × ' + l.qty + ' = ' + (l.price * l.qty).toLocaleString('ru-RU') + ' ₽';
      }).join('\n');
      window.location.href = mailto('coffeeIT — заказ мерча',
        'Заказ мерча coffeeIT\n\n' + lines + '\n\nИтого: ' + total().toLocaleString('ru-RU') + ' ₽\n\n' +
        'Имя: ' + (d.get('name') || '') + '\nКонтакт: ' + (d.get('phone') || '') + '\nКомментарий: ' + (d.get('comment') || '—') + '\n');
      toast('Заказ готов к отправке');
      return;
    }
    if (f.classList.contains('js-lead')) {
      e.preventDefault();
      var dd = new FormData(f);
      var body = 'Здравствуйте!\n\n';
      [['name', 'Имя'], ['contact', 'Контакт'], ['topic', 'Интересует'], ['message', 'Задача'], ['date', 'Дата'], ['time', 'Время'], ['zone', 'Зона'], ['people', 'Человек']].forEach(function (k) {
        if (dd.get(k[0])) body += k[1] + ': ' + dd.get(k[0]) + '\n';
      });
      window.location.href = mailto((CFG.subjectPrefix || 'coffeeIT —') + ' ' + (dd.get('topic') || 'заявка'), body);
      var ok = f.querySelector('.form-ok'); if (ok) ok.hidden = false;
      toast('Заявка готова к отправке');
      return;
    }
    if (f.classList.contains('js-book')) {
      e.preventDefault();
      var b = new FormData(f);
      var rows = [['name', 'Имя'], ['contact', 'Контакт'], ['date', 'Дата'], ['time', 'Время'], ['zone', 'Зона'], ['people', 'Человек']]
        .map(function (k) { return k[1] + ': ' + (b.get(k[0]) || '—'); }).join('\n');
      window.location.href = mailto('coffeeIT — бронирование места', 'Здравствуйте!\n\nХочу забронировать место.\n\n' + rows + '\n');
      var ok2 = f.querySelector('.form-ok'); if (ok2) ok2.hidden = false;
      toast('Бронь готова к отправке');
      return;
    }
    if (f.classList.contains('js-news')) {
      e.preventDefault();
      toast('Подписка оформлена — до встречи в coffeeIT ☕');
      f.reset();
    }
  });


  /* ---------- АНИМАЦИИ ---------- */
  function fmtNum(t, v) {
    var dec = t % 1 !== 0;
    var s = dec ? v.toFixed(1) : Math.round(v).toLocaleString('ru-RU');
    return s.replace(/,/g, ' ');
  }

  /* счётчики: [data-count] — считаются при появлении в кадре */
  function counters(scope) {
    $$('[data-count]', scope || document).forEach(function (el) {
      if (el.dataset.done) return;
      var target = parseFloat(el.getAttribute('data-count'));
      if (isNaN(target)) return;
      el.dataset.done = '1';
      var suf = el.getAttribute('data-suffix') || '';
      var pre = el.getAttribute('data-prefix') || '';
      var t0 = performance.now(), dur = parseInt(el.getAttribute('data-dur') || '1600', 10);
      var pct = suf.indexOf('%') === 0 && target % 1 !== 0;
      function fmt(v) {
        if (pct) return (Math.round(v * 100) / 100).toFixed(2).replace('.', ',');
        return fmtNum(target, v);
      }
      function step(t) {
        var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        el.textContent = pre + fmt(target * e) + suf;
        if (k < 1) requestAnimationFrame(step);
        else el.textContent = pre + fmt(target) + suf;
      }
      requestAnimationFrame(step);
    });
  }

  /* живая статистика: каждые 2.5–4 с слегка меняются значения */
  function liveStats() {
    $$('[data-live]').forEach(function (el) {
      if (el.dataset.liveRun) return;
      el.dataset.liveRun = '1';
      var base = parseFloat(el.getAttribute('data-live')) || 0;
      var suf = el.getAttribute('data-suffix') || '';
      var min = base - base * 0.18, max = base + base * 0.18;
      var cur = base;
      function tick() {
        var amp = Math.max(1, base * 0.12);
        var next = cur + (Math.random() - 0.5) * 2 * amp;
        next = Math.max(min, Math.min(max, next));
        if (Math.round(next) === Math.round(cur)) next = cur + (next >= cur ? 1 : -1);
        cur = next;
        el.textContent = fmtNum(base % 1 ? 1 : base, Math.max(0, next)) + suf;
        el.classList.add('is-bump');
        setTimeout(function () { el.classList.remove('is-bump'); }, 420);
        setTimeout(tick, 2200 + Math.random() * 2000);
      }
      setTimeout(tick, 2600 + Math.random() * 1200);
    });
  }

  /* бегущая строка: клонируем содержимое, чтобы шов не читался */
  function marquees() {
    $$('[data-marquee]').forEach(function (m) {
      if (m.dataset.mq) return;
      m.dataset.mq = '1';
      var inner = m.querySelector('.mq-inner');
      if (!inner) return;
      inner.innerHTML = inner.innerHTML + inner.innerHTML;
    });
  }

  /* «печатная машинка» для заголовков с data-type */
  function typers() {
    $$('[data-type]').forEach(function (el) {
      if (el.dataset.typed) return;
      el.dataset.typed = '1';
      var full = el.getAttribute('data-type') || el.textContent;
      el.textContent = '';
      var i = 0;
      var speed = parseInt(el.getAttribute('data-speed') || '34', 10);
      function tick() {
        el.textContent = full.slice(0, ++i);
        if (i < full.length) setTimeout(tick, speed + Math.random() * 40);
      }
      setTimeout(tick, 320);
    });
  }

  /* появление блоков */
  var io;
  function revealInit() {
    if (!('IntersectionObserver' in window)) {
      $$('.rv').forEach(function (el) { el.classList.add('is-in'); });
      counters(); liveStats(); marquees(); typers();
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            counters(en.target);
            liveStats();
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    }
    $$('.rv:not(.is-in)').forEach(function (el) { io.observe(el); });
    counters(); liveStats(); marquees(); typers();
  }

  /* параллакс для фото */
  function parallax() {
    var items = $$('[data-parallax]');
    if (!items.length) return;
    function onScroll() {
      var vh = window.innerHeight;
      items.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var k = (r.top + r.height / 2 - vh / 2) / vh;
        var amp = parseFloat(el.getAttribute('data-parallax')) || 12;
        el.style.transform = 'translate3d(0,' + (-k * amp).toFixed(2) + 'px,0) scale(1.06)';
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  /* ---------- router ---------- */
  var PAGES = NAV.map(function (n) { return n[0]; });
  function route() {
    var id = (location.hash || '#home').replace('#', '');
    if (PAGES.indexOf(id) < 0) id = 'home';
    if (!$('#page-' + id)) id = 'home';
    $$('.page').forEach(function (p) { p.classList.toggle('is-active', p.id === 'page-' + id); });
    $$('[data-nav]').forEach(function (a) { a.classList.toggle('is-on', a.getAttribute('data-nav') === id); });
    document.body.setAttribute('data-page', id);
    document.body.classList.remove('menu-open');
    window.scrollTo(0, 0);
    revealInit();
    marquees(); typers(); liveStats(); parallax();
  }
  window.addEventListener('hashchange', route);

  /* ---------- boot ---------- */
  function boot() {
    var H = {
      ic: ic, raster: raster, cfg: CFG, data: CFG, contacts: C, mail: mail,
      navHtml: navHtml(),
      servicesHtml: servicesCards(),
      servicesRows: servicesCards(),
      serviceRowsAll: servicesCards(),
      casesHtml: casesGrid(),
      casesHome: casesGrid({ noChips: true, limit: 3 }),
      vendorsHtml: vendorsGrid(),
      vendorsTable: '<table class="v4-table"><thead><tr><th>Вендор</th><th>Направление</th><th>Статус</th></tr></thead><tbody>' +
        CFG.vendors.map(function (v) { return '<tr><td>' + v[0] + '</td><td>' + v[1] + '</td><td>партнёр</td></tr>'; }).join('') +
        '</tbody></table>',
      cartCount: String(count()),
      v4tabs: (function () {
        function sp(i) { var s = CFG.services[i]; return s ? '<h3>' + s.title + '</h3><p>' + s.text + '</p><ul class="ticks">' +
          s.list.map(function (l) { return '<li>' + l + '</li>'; }).join('') + '</ul>' : ''; }
        var quotes = CFG.services.map(function (s, i) {
          return '<button class="' + (i === 0 ? 'is-on' : '') + '" data-tab="s' + i + '">' + s.title.split(' ')[0].replace('ПО', 'ПО') + '</button>';
        }).join('');
        var labels = ['develop', 'hardware', 'infosec', 'integrations', 'support'];
        var tabs = CFG.services.map(function (s, i) {
          return '<button class="' + (i === 0 ? 'is-on' : '') + '" data-tab="s' + i + '"><span class="c">0' + (i + 1) + '</span> ' + s.title + '</button>';
        }).join('');
        var panels = CFG.services.map(function (s, i) {
          return '<div class="v4-tabpanel' + (i === 0 ? ' is-on' : '') + '" data-panel="s' + i + '">' + sp(i) +
            '<div class="v4-tabmeta"><span class="dim">price</span> <span class="c">' + s.price + '</span>' +
            '<span class="dim">eta</span> <span>' + s.time + '</span>' +
            '<a class="link-arrow" href="#contacts" data-cta="service" data-topic="' + s.title + '">отправить заявку →</a></div></div>';
        }).join('');
        return '<div class="v4-tabs" data-tabs><div class="v4-tablist">' + tabs + '</div>' + panels + '</div>';
      })(),
      menuHtml: menuList(),
      zonesHtml: zonesGrid(),
      shopHtml: '<div class="ci-banner" style="background-image:url(' + ((window.CI_PHOTOS || {}).merch || raster(51, 820, 400)) + ')"></div>' + shopGrid(),
      shopPreview: shopGrid({ noChips: true, limit: 4 }),
      contactsHtml: contactsRows(),
      sponsorStats: sponsorStats(),
      sponsorProjects: sponsorProjects(),
      sponsorTiers: sponsorTiers(),
      sponsorFaq: sponsorFaq(),
      marqueeTech: marquee(['Разработка', 'Серверы и СХД', 'Информационная безопасность', 'Интеграции',
        'Облака', 'Свежая обжарка', 'Мерч', 'Игровой клуб', 'Автомастерская', 'Музыкальный магазин', 'Gamedev', 'Консоли'], 'mq-dark'),
      marqueeOpen: marquee(['Открыто 08:00–23:00', 'Свободных мест: 7 из 24', 'Свежая обжарка каждые две недели',
        'Кофе в подарок к первой заявке', 'Бесплатная диагностика 30 минут', 'Свой мерч у бара'], 'mq-light'),
      photoBar: (window.CI_PHOTOS || {}).coffee_bar || raster(610, 860, 560),
      photoWear: (window.CI_PHOTOS || {}).merch_wear || raster(611, 860, 560),
      photoDetail: (window.CI_PHOTOS || {}).merch_detail || raster(612, 860, 560),
      photoMerch: (window.CI_PHOTOS || {}).merch || raster(613, 860, 560),
      brands: CFG.vendors.slice(0, 8).map(function (v) { return '<span>' + v[0] + '</span>'; }).join(''),
      cart: cartMarkup(),
      heroArt: (window.CI_PHOTOS || {}).hero || raster((CFG.art || {}).heroSeed || 7, 900, 1100),
      sceneArt: (window.CI_PHOTOS || {}).space || raster((CFG.art || {}).sceneSeed || 21, 1000, 760),
      merchArt: (window.CI_PHOTOS || {}).merch || raster((CFG.art || {}).sceneSeed || 33, 820, 400)
    };
    var html = CFG.layout(H);
    html = html.replace(/\{\{(\w+)(?::(\w+))?\}\}/g, function (m, k, arg) {
      if (k === 'ic') return ic(arg || 'bean');
      if (typeof H[k] === 'string') return H[k];
      return m;
    });
    $('#app').innerHTML = html;
    if (CFG.cartSlot) {
      var cslot = $('#cartSlot');
      if (cslot) cslot.outerHTML = cartMarkup();
    }
    renderCart();
    route();
    window.addEventListener('scroll', function () {
      document.body.classList.toggle('is-scrolled', window.scrollY > 20);
    }, { passive: true });
    $$('[data-raster]').forEach(function (el) {
      el.style.backgroundImage = 'url(' + raster(parseInt(el.getAttribute('data-raster'), 10) || 5, 640, 640) + ')';
    });
    document.body.classList.add('is-ready');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
