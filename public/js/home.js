/* Homepage-only behaviour: docking hero logo, marquees, RIBA pop-outs, project carousel. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- loading screen + docking logo ----
     The lock-up starts large in the centre of the viewport over the navy preloader. The
     ident shapes burst out, sweep the screen and return into the mark (ported from the
     holding page); the overlay then lifts and the lock-up glides to its docked position
     top-left, where it stays. Full version once per browser session, short version after
     (sessionStorage), none at all for reduced motion. Clicking the docked logo at the top
     of the page replays the full version. */
  var heroLogo = document.getElementById('heroLogo'),
      heroLogoImg = document.getElementById('heroLogoImg'),
      ident = document.getElementById('ident'),
      tile = document.getElementById('heroTile'),
      pre = document.getElementById('preloader'),
      RATIO = 1.125 / 3.205,   /* lock-up height / width, fixed by the artwork */
      docked = false,
      running = false,
      anims = [];
  if (!heroLogo || !heroLogoImg || !ident || !tile || !pre) return;

  function setIdent(w) { heroLogo.style.setProperty('--ident', (w / 3.205).toFixed(2) + 'px'); }
  function geom() {
    var vw = window.innerWidth, vh = window.innerHeight, small = vw <= 760,
        startW = Math.min(720, vw * 0.8), startH = startW * RATIO,
        endH = small ? 34 : 44, endW = endH / RATIO;
    return { vw: vw, vh: vh, startW: startW, startH: startH,
      xs: (vw - startW) / 2, ys: (vh - startH) / 2,
      xe: small ? 12 : 26, ye: small ? 10 : 14, sc: endW / startW };
  }
  function place(e) {
    var g = geom();
    setIdent(g.startW);
    var x = (1 - e) * g.xs + e * g.xe, y = (1 - e) * g.ys + e * g.ye, sc = 1 + (g.sc - 1) * e;
    heroLogo.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) scale(' + sc + ')';
    heroLogo.style.setProperty('--dock', e ? '1' : '0');
  }
  addEventListener('resize', function () { place(docked ? 1 : 0); });

  function resolveMark() {
    tile.classList.add('in');
    heroLogoImg.classList.add('in');
    setTimeout(function () { ident.classList.add('out'); }, 350);
  }
  function unresolveMark() {
    tile.classList.remove('in'); heroLogoImg.classList.remove('in'); ident.classList.remove('out');
  }
  function dock(delay) {
    setTimeout(function () {
      docked = true;
      heroLogo.classList.add('docking');
      place(1);
      pre.classList.add('done');
      document.documentElement.classList.remove('preloading');
      setTimeout(function () { heroLogo.classList.remove('docking'); }, 1000);
    }, delay);
  }
  function undock() {
    docked = false;
    document.documentElement.classList.add('preloading');
    pre.classList.remove('done');
    heroLogo.classList.add('docking');
    place(0);
    setTimeout(function () { heroLogo.classList.remove('docking'); }, 1000);
  }
  function burst(onDone) {
    if (running) return;
    running = true;
    var shapes = Array.prototype.slice.call(ident.querySelectorAll('svg')),
        g = geom(), vw = g.vw, vh = g.vh,
        box = ident.getBoundingClientRect(),
        cx = box.left + box.width / 2, cy = box.top + box.height / 2,
        ox = vw / 2 - cx, oy = vh / 2 - cy,
        rx = Math.max(120, vw / 2 - 90), ry = Math.max(100, vh / 2 - 80),
        total = 4200, done = 0;
    anims = [];
    shapes.forEach(function (sv, i) {
      var r = sv.getBoundingClientRect(),
          hx = r.left + r.width / 2 - cx, hy = r.top + r.height / 2 - cy,
          a0 = (i / shapes.length) * Math.PI * 2 + (i % 2 ? 0.35 : -0.2),
          dir = (i % 3 === 0) ? -1 : 1,
          sweep = dir * (Math.PI * (1.15 + (i % 4) * 0.18)),
          spin = dir * 360 * (1 + (i % 2)),
          frames = [{ transform: 'translate(0px,0px) rotate(0deg) scale(1)', offset: 0 }],
          steps = 6, k, t, a, rad, x, y, scl;
      for (k = 0; k <= steps; k++) {
        t = k / steps;
        a = a0 + sweep * t;
        rad = 0.62 + 0.36 * Math.sin(t * Math.PI + i * 1.3) * Math.sin(t * Math.PI + i * 1.3);
        x = ox + Math.cos(a) * rx * rad - hx;
        y = oy + Math.sin(a) * ry * rad - hy;
        scl = 1.25 + 0.25 * Math.sin(t * Math.PI * 2 + i);
        frames.push({
          transform: 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) rotate(' +
            (spin * t).toFixed(1) + 'deg) scale(' + scl.toFixed(2) + ')',
          offset: 0.14 + t * 0.64,
          easing: k === 0 ? 'cubic-bezier(.2,.8,.2,1)' : 'ease-in-out'
        });
      }
      frames.push({ transform: 'translate(0px,0px) rotate(' + spin + 'deg) scale(1)', offset: 1,
        easing: 'cubic-bezier(.3,1.4,.4,1)' });
      var anim = sv.animate(frames, { duration: total, delay: 250 + i * 55, fill: 'none', easing: 'linear' });
      anims.push(anim);
      anim.onfinish = function () { if (++done === shapes.length && running) { running = false; resolveMark(); onDone(); } };
    });
  }

  var seen = false;
  try { seen = sessionStorage.getItem('rubix-loaded') === '1'; sessionStorage.setItem('rubix-loaded', '1'); } catch (e) {}

  document.documentElement.classList.add('preloading');
  place(0);
  if (reduced || !ident.animate) {
    resolveMark();
    dock(0);
  } else if (seen) {
    resolveMark();
    dock(650);
  } else {
    var kick = function () { setTimeout(function () { burst(function () { dock(700); }); }, 420); };
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(kick); } else { kick(); }
  }
  heroLogo.addEventListener('click', function (e) {
    if (docked && window.scrollY < 40 && !reduced && ident.animate) {
      e.preventDefault();
      if (running) return;
      unresolveMark();
      undock();
      setTimeout(function () { burst(function () { dock(700); }); }, 1000);
    }
  });

  /* ---- duplicate marquee tracks for seamless loop ---- */
  ['clientTrack', 'sectorTrack'].forEach(function (id) {
    var t = document.getElementById(id);
    if (t && !reduced) { t.innerHTML += t.innerHTML; }
  });

  /* ---- RIBA: tap-to-toggle for touch devices ---- */
  var stages = document.querySelectorAll('.riba-stage');
  stages.forEach(function (s) {
    s.addEventListener('click', function (e) {
      if (window.matchMedia('(hover: none)').matches || window.innerWidth <= 1024) {
        var was = s.classList.contains('active');
        stages.forEach(function (x) { x.classList.remove('active'); });
        if (!was) s.classList.add('active');
        e.preventDefault();
      }
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.riba-stage')) stages.forEach(function (x) { x.classList.remove('active'); });
  });

  /* ---- projects card carousel ---- */
  var slides = document.getElementById('slides');
  if (slides) {
    var items = Array.prototype.slice.call(slides.querySelectorAll('.card')),
        idx = 0;
    var padLeft = function () { return parseFloat(getComputedStyle(slides).paddingLeft) || 0; };
    var go = function (i) {
      idx = Math.min(Math.max(i, 0), items.length - 1);
      slides.scrollTo({ left: items[idx].offsetLeft - padLeft(), behavior: reduced ? 'auto' : 'smooth' });
    };
    document.getElementById('prevBtn').addEventListener('click', function () { go(idx - 1); });
    document.getElementById('nextBtn').addEventListener('click', function () { go(idx + 1); });
    var nearest = function () {
      var sl = slides.scrollLeft, best = 0, bd = Infinity;
      items.forEach(function (it, i) {
        var d = Math.abs(it.offsetLeft - padLeft() - sl);
        if (d < bd) { bd = d; best = i; }
      });
      return best;
    };
    slides.addEventListener('scroll', function () { idx = nearest(); }, { passive: true });

    items.forEach(function (a) { a.setAttribute('draggable', 'false'); });
    var isDown = false, dragged = false, dragX = 0, dragScroll = 0;
    slides.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      isDown = true; dragged = false; dragX = e.clientX; dragScroll = slides.scrollLeft;
    });
    addEventListener('pointermove', function (e) {
      if (!isDown) return;
      var dx = e.clientX - dragX;
      if (!dragged && Math.abs(dx) > 6) { dragged = true; slides.classList.add('dragging'); }
      if (dragged) { slides.scrollLeft = dragScroll - dx; e.preventDefault(); }
    });
    addEventListener('pointerup', function () {
      if (!isDown) return;
      isDown = false;
      if (dragged) { slides.classList.remove('dragging'); go(nearest()); }
    });
    slides.addEventListener('click', function (e) {
      if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; }
    }, true);
  }
})();
