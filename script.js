/* =====================================================================
   script.js  —  site ka chalne wala hissa.
   Aam taur par ise badalne ki zaroorat nahi. Number, log, photo sab
   config.js mein badalte hain.

   Is file mein kya-kya hai (upar se neeche):
     1. chhote helper
     2. config.js se contacts / owners / slides / gallery banana
     3. Hindi <-> English
     4. top ki photo slideshow (apne aap badalti hai)
     5. "दुकान की झलक" patti (apne aap sarakti hai) + badi photo dekhna
     6. rate form  -> WhatsApp message
   ===================================================================== */
(function () {
  'use strict';

  var S = window.SITE;
  if (!S) { console.error('config.js load nahi hui. index.html mein config.js script.js se pehle honi chahiye.'); return; }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang = 'hi';                                  // Hindi pehle
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------------- 1. helper ---------------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // {hi:'..', en:'..'} -> dono bhasha ke span (jo bhasha chuni hai wahi dikhti hai, CSS se)
  function T(o) { return '<span class="hi">' + esc(o.hi) + '</span><span class="en">' + esc(o.en) + '</span>'; }
  // abhi ki bhasha ka text
  function L(o) { return (o && (o[lang] || o.hi)) || ''; }
  // number se sirf ank
  function digits(p) { return String(p || '').replace(/\D/g, ''); }
  // 10 ank ho to aage 91 jod do
  function full(p) { var d = digits(p); return d.length === 10 ? '91' + d : d; }
  function tel(p) { return 'tel:+' + full(p); }
  function wa(p, text) { return 'https://wa.me/' + full(p) + (text ? '?text=' + encodeURIComponent(text) : ''); }

  /* ---------------- 2. config se page banana ---------------- */

  // 2a. Kaun dikhe: contactMode ke hisaab se
  function visibleContacts() {
    var all = (S.contacts || []).filter(function (c) { return c.show !== false; });
    var mode = S.contactMode || 'all';
    var list = all;
    if (mode === 'staff')  list = all.filter(function (c) { return c.role === 'staff'; });
    if (mode === 'owners') list = all.filter(function (c) { return c.role === 'owner'; });
    return list.length ? list : all;               // agar list khali ho gayi to sab dikha do
  }

  function renderContacts() {
    var list = visibleContacts();

    var ul = $('#contact-list');
    if (ul) {
      ul.innerHTML = list.map(function (c) {
        return '<li><div>' +
          '<b>' + T(c.name) + '</b>' +
          (c.note && (c.note.hi || c.note.en) ? '<small>' + T(c.note) + '</small>' : '') +
          '<span>' + esc(c.phone) + '</span></div>' +
          '<div class="pbtn">' +
            '<a href="' + tel(c.phone) + '">' + T({ hi: 'कॉल', en: 'Call' }) + '</a>' +
            '<a href="' + wa(c.phone) + '" target="_blank" rel="noopener">WhatsApp</a>' +
          '</div></li>';
      }).join('');
    }

  }

  // 2b. mukhya number wale button / link
  function wireMainLinks() {
    $$('[data-call="main"]').forEach(function (a) { a.href = tel(S.mainPhone); });
    $$('[data-wa="main"]').forEach(function (a) { a.href = wa(S.whatsapp); });
    $$('[data-phone-text="main"]').forEach(function (s) { s.textContent = S.mainPhone; });
    $$('[data-maps]').forEach(function (a) { a.href = S.mapsLink; });
  }

  // 2c. Malik ke card (dono barabar)
  function initialOf(name) {
    var m = String(name || '').match(/^[\s\S][ऀ-ःऺ-ॏ]*/);
    return m ? m[0] : '';
  }
  function renderOwners() {
    var box = $('#owners');
    if (!box) return;
    box.innerHTML = (S.owners || []).map(function (o) {
      var hasAbout = o.about && (o.about.hi || o.about.en);
      return '<article class="owner">' +
        '<div class="owner-photo">' +
          '<span class="owner-initial" aria-hidden="true"><span class="hi">' + esc(initialOf(o.name.hi)) + '</span><span class="en">' + esc(initialOf(o.name.en)) + '</span></span>' +
          '<img src="' + esc(o.photo) + '" alt="' + esc(o.alt ? o.alt.hi : o.name.hi) + '"' +
            (o.alt ? ' data-alt-hi="' + esc(o.alt.hi) + '" data-alt-en="' + esc(o.alt.en) + '"' : '') +
            ' style="object-position:' + esc(o.pos || '50% 50%') + '" loading="lazy">' +
        '</div>' +
        '<div class="owner-body">' +
          '<h3>' + T(o.name) + '</h3>' +
          '<p class="owner-role">' + T(o.role) + '</p>' +
          (hasAbout ? '<p class="owner-about">' + T(o.about) + '</p>' : '') +
        '</div></article>';
    }).join('');

    // photo nahi mili (jaise Hemant ji ki abhi nahi hai) to sirf pehla akshar wala khaana dikhta hai
    $$('.owner-photo img', box).forEach(function (img) {
      img.addEventListener('error', function () { img.remove(); });
    });
  }

  // 2d. Google ke liye dukan ki jaankari (JSON-LD) - number config.js se hi aata hai
  function writeSchema() {
    var data = {
      '@context': 'https://schema.org',
      '@type': 'HardwareStore',
      'name': S.shopName.hi + ' (' + S.shopName.en + ')',
      'telephone': '+' + full(S.mainPhone),
      'hasMap': S.mapsLink,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'रेलवे स्टेशन रोड',
        'addressLocality': 'मुलताई',
        'addressRegion': 'मध्य प्रदेश',
        'postalCode': '460661',
        'addressCountry': 'IN'
      }
    };
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  /* ---------------- 3. Hindi <-> English ---------------- */
  var titleEl = document.querySelector('title');
  var descEl = document.getElementById('meta-desc');
  var titleHi = titleEl ? titleEl.textContent : '';
  var descHi = descEl ? descEl.getAttribute('content') : '';
  var slider;                                       // niche banega, language badalne par caption update hoga

  function setLang(next, remember) {
    lang = next === 'en' ? 'en' : 'hi';
    var root = document.documentElement;
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);

    $$('[data-setlang]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-setlang') === lang ? 'true' : 'false');
    });

    // alt, placeholder, aria-label: har tag ke data-*-hi / data-*-en se
    $$('[data-alt-hi]').forEach(function (el) { el.setAttribute('alt', el.getAttribute('data-alt-' + lang)); });
    $$('[data-ph-hi]').forEach(function (el) { el.setAttribute('placeholder', el.getAttribute('data-ph-' + lang)); });
    $$('[data-aria-hi]').forEach(function (el) { el.setAttribute('aria-label', el.getAttribute('data-aria-' + lang)); });

    if (titleEl) titleEl.textContent = lang === 'en' ? titleEl.getAttribute('data-en') : titleHi;
    if (descEl) descEl.setAttribute('content', lang === 'en' ? descEl.getAttribute('data-en') : descHi);

    if (slider) slider.refresh();
    if (typeof showTarget === 'function') showTarget();

    if (remember) { try { localStorage.setItem('lang', lang); } catch (e) {} }
  }

  $$('[data-setlang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-setlang'), true); });
  });

  /* ---------------- 4. top ki photo slideshow ---------------- */
  function initSlider() {
    var box = $('#slider');
    var track = $('#slides');
    var slides = S.slides || [];
    if (!box || !track || !slides.length) return null;

    track.innerHTML = slides.map(function (s, i) {
      return '<div class="slide' + (i === 0 ? ' is-active' : '') + '" aria-hidden="' + (i === 0 ? 'false' : 'true') + '">' +
        '<img src="' + esc(s.img) + '" alt="' + esc(s.alt.hi) + '" data-alt-hi="' + esc(s.alt.hi) + '" data-alt-en="' + esc(s.alt.en) + '"' +
        ' style="object-position:' + esc(s.pos || '50% 50%') + '"' +
        (i === 0 ? '' : ' loading="lazy"') + ' decoding="async"></div>';
    }).join('');

    var els = $$('.slide', track);
    var dotsBox = $('#dots');
    dotsBox.innerHTML = slides.map(function (s, i) {
      return '<button type="button" class="dot' + (i === 0 ? ' on' : '') + '" data-i="' + i + '" aria-label="' + (i + 1) + '"></button>';
    }).join('');
    var dots = $$('.dot', dotsBox);
    var cap = $('#slide-cap');
    var pp = $('#s-pp');

    var idx = 0, timer = null, userPaused = reduceMotion, hoverPaused = false;
    var ms = Math.max(2, Number(S.slideSeconds) || 4.5) * 1000;

    function label() { if (cap) cap.textContent = L(slides[idx].cap); }

    function go(n) {
      idx = (n + els.length) % els.length;
      els.forEach(function (el, i) {
        el.classList.toggle('is-active', i === idx);
        el.setAttribute('aria-hidden', i === idx ? 'false' : 'true');
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('on', i === idx);
        if (i === idx) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
      label();
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function start() {
      stop();
      if (userPaused || hoverPaused || document.hidden || els.length < 2) return;
      timer = setInterval(function () { go(idx + 1); }, ms);
    }
    function reset() { start(); }

    function syncPP() {
      pp.textContent = userPaused ? '▶' : 'II';
      var key = userPaused ? ['फ़ोटो चलाएँ', 'Play slideshow'] : ['फ़ोटो चलना रोकें', 'Pause slideshow'];
      pp.setAttribute('data-aria-hi', key[0]);
      pp.setAttribute('data-aria-en', key[1]);
      pp.setAttribute('aria-label', lang === 'en' ? key[1] : key[0]);
    }

    $('#s-prev').addEventListener('click', function () { go(idx - 1); reset(); });
    $('#s-next').addEventListener('click', function () { go(idx + 1); reset(); });
    dotsBox.addEventListener('click', function (e) {
      var d = e.target.closest('.dot');
      if (d) { go(Number(d.getAttribute('data-i'))); reset(); }
    });
    pp.addEventListener('click', function () { userPaused = !userPaused; syncPP(); start(); });

    // mouse upar ho ya keyboard focus ho to ruk jaye
    box.addEventListener('mouseenter', function () { hoverPaused = true; stop(); });
    box.addEventListener('mouseleave', function () { hoverPaused = false; start(); });
    box.addEventListener('focusin', function () { hoverPaused = true; stop(); });
    box.addEventListener('focusout', function () { hoverPaused = false; start(); });

    // mobile par ungli se left/right sarkana
    var x0 = null, y0 = null;
    box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; stop(); }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (x0 !== null) {
        var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(idx + (dx < 0 ? 1 : -1));
      }
      x0 = null; start();
    }, { passive: true });

    document.addEventListener('visibilitychange', start);

    label(); syncPP(); start();
    return { refresh: function () { label(); syncPP(); } };
  }

  /* ---------------- 5. "दुकान की झलक" patti + badi photo ---------------- */
  function initReel() {
    var reel = $('#reel');
    var items = S.gallery || [];
    if (!reel || !items.length) return;

    reel.innerHTML = items.map(function (g, i) {
      return '<figure class="shot" data-i="' + i + '">' +
        '<img src="' + esc(g.img) + '" alt="' + esc(g.alt.hi) + '" data-alt-hi="' + esc(g.alt.hi) + '" data-alt-en="' + esc(g.alt.en) + '"' +
        ' style="object-position:' + esc(g.pos || '50% 50%') + '" loading="lazy" decoding="async">' +
        '<figcaption>' + T(g.cap) + '</figcaption></figure>';
    }).join('');

    var prev = $('#g-prev'), next = $('#g-next');
    function step(dir) {
      var first = reel.firstElementChild;
      if (!first) return;
      var gap = parseFloat(getComputedStyle(reel).columnGap) || 0;
      var w = first.getBoundingClientRect().width + gap;
      var atEnd = reel.scrollLeft + reel.clientWidth >= reel.scrollWidth - 4;
      var atStart = reel.scrollLeft <= 4;
      if (dir > 0 && atEnd) reel.scrollTo({ left: 0, behavior: 'smooth' });          // end par pahunche to shuru se
      else if (dir < 0 && atStart) reel.scrollTo({ left: reel.scrollWidth, behavior: 'smooth' });
      else reel.scrollBy({ left: dir * w, behavior: 'smooth' });
    }

    var auto = null, resumeT = null, visible = false;
    function stopAuto() { if (auto) { clearInterval(auto); auto = null; } }
    function startAuto() {
      stopAuto();
      if (reduceMotion || !visible || document.hidden) return;
      auto = setInterval(function () { step(1); }, 3200);
    }
    function pauseThenResume() { stopAuto(); clearTimeout(resumeT); resumeT = setTimeout(startAuto, 6000); }

    prev.addEventListener('click', function () { step(-1); pauseThenResume(); });
    next.addEventListener('click', function () { step(1); pauseThenResume(); });
    ['touchstart', 'wheel', 'pointerdown', 'focusin'].forEach(function (ev) {
      reel.addEventListener(ev, pauseThenResume, { passive: true });
    });
    reel.addEventListener('mouseenter', stopAuto);
    reel.addEventListener('mouseleave', startAuto);
    reel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { step(1); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { step(-1); e.preventDefault(); }
    });
    document.addEventListener('visibilitychange', startAuto);

    // sirf tab chale jab patti screen par dikh rahi ho
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; startAuto(); }, { threshold: 0.25 }).observe(reel);
    } else { visible = true; startAuto(); }

    // badi photo
    var viewer = $('#viewer');
    if (!viewer || typeof viewer.showModal !== 'function') return;
    var vImg = $('img', viewer), vCap = $('.cap', viewer);
    reel.addEventListener('click', function (e) {
      var shot = e.target.closest('.shot');
      if (!shot) return;
      var g = items[Number(shot.getAttribute('data-i'))];
      vImg.src = g.img;
      vImg.alt = L(g.alt);
      vCap.textContent = L(g.alt);
      viewer.showModal();
    });
    $('.close', viewer).addEventListener('click', function () { viewer.close(); });
    viewer.addEventListener('click', function (e) { if (e.target === viewer) viewer.close(); });
  }

  /* ---------------- 6. rate form -> WhatsApp ---------------- */
  var showTarget;
  (function initForm() {
    var form = $('#rate-form');
    if (!form) return;
    var sendTo = $('#send-to');
    var msg = $('#form-msg');
    var M = S.messages;

    showTarget = function () { sendTo.textContent = L(S.shopName) + ', ' + S.whatsapp; };

    form.addEventListener('change', function () { msg.textContent = ''; });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // chune hue saaman ke naam, abhi ki bhasha mein (label ke andar .hi / .en se)
      var items = $$('input[name="item"]:checked', form).map(function (el) {
        var span = $('.' + lang, el.parentNode);
        return span ? span.textContent : '';
      }).filter(Boolean);
      var detail = form.elements.detail.value.trim();
      var name = form.elements.name.value.trim();
      var site = form.elements.site.value.trim();

      if (!items.length && !detail) { msg.textContent = L(M.needItem); return; }

      var lines = [L(M.hello).replace('{shop}', L(S.shopName))];
      if (items.length) lines.push(L(M.items) + items.join(', '));
      if (detail) lines.push(L(M.detail) + detail);
      if (site) lines.push(L(M.site) + site);
      if (name) lines.push(L(M.name) + name);
      lines.push(L(M.footer));

      window.open(wa(S.whatsapp, lines.join('\n')), '_blank', 'noopener');
      msg.textContent = '';
    });
  })();

  /* ---------------- shuru karo ---------------- */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  renderContacts();
  renderOwners();
  wireMainLinks();
  writeSchema();
  slider = initSlider();
  initReel();

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  setLang(saved === 'en' ? 'en' : 'hi', false);     // jab tak customer ne EN na dabaya ho, Hindi
})();
