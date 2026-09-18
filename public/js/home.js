/* Homepage-only behaviour: docking hero logo, marquees, RIBA pop-outs, project carousel. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- migrating hero logo lock-up: centre of hero -> top-left corner ---- */
  var heroLogo = document.getElementById('heroLogo'),
      heroLogoImg = document.getElementById('heroLogoImg'),
      lockup = document.getElementById('lockup'),
      brandHero = document.getElementById('brandHero'),
      ticking = false,
      RATIO = 1.125 / 3.205;   /* lock-up height / width, fixed by the artwork */
  function setIdent(w) { heroLogo.style.setProperty('--ident', (w / 3.205).toFixed(2) + 'px'); }
  function placeLogo() {
    ticking = false;
    var vw = window.innerWidth,
        startW = Math.min(720, vw * 0.8),
        startH = startW * RATIO;
    setIdent(startW);
    if (vw <= 760) {
      heroLogo.style.position = 'absolute';
      heroLogo.style.transform = 'translate3d(' + ((vw - startW) / 2) + 'px,' +
        ((brandHero.offsetHeight - startH) / 2) + 'px,0)';
      heroLogo.style.setProperty('--dock', '0');
      return;
    }
    heroLogo.style.position = 'fixed';
    var endH = 44,
        endW = endH / RATIO,
        xe = 26,
        ye = 14,
        heroH = brandHero.offsetHeight,
        p = Math.min(Math.max(window.scrollY / (heroH * 0.7), 0), 1),
        e = 1 - Math.pow(1 - p, 3),
        xs = (vw - startW) / 2,
        ys = (heroH - startH) / 2 - window.scrollY,
        x = (1 - e) * xs + e * xe,
        y = (1 - e) * ys + e * ye,
        sc = 1 + (endW / startW - 1) * e;
    heroLogo.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) scale(' + sc + ')';
    /* navy tile behind the mark fades in over the last third of the dock */
    heroLogo.style.setProperty('--dock', Math.max(0, (e - 0.66) / 0.34).toFixed(3));
  }
  function onScrollLogo() {
    if (!ticking) { ticking = true; requestAnimationFrame(placeLogo); }
  }
  if (heroLogo && heroLogoImg && brandHero) {
    addEventListener('scroll', onScrollLogo, { passive: true });
    addEventListener('resize', onScrollLogo);
    placeLogo();
    if (!heroLogoImg.complete) heroLogoImg.addEventListener('load', placeLogo);
  }

  /* ---- ident burst: shapes leave the mark, sweep the hero, return into it ----
     Ported from the holding page. The shapes resolve into the finished lock-up:
     white tile grows in behind them, the artwork fades over, the loose shapes go.
     Scrolling during the burst cancels it and snaps to the resolved state, so the
     docking logo never fights the animation. */
  var ident = document.getElementById('ident'),
      tile = document.getElementById('heroTile');
  if (ident && tile && heroLogoImg) {
    var shapes = Array.prototype.slice.call(ident.querySelectorAll('svg')),
        anims = [],
        running = false;
    function resolveMark() {
      tile.classList.add('in');
      heroLogoImg.classList.add('in');
      setTimeout(function () { ident.classList.add('out'); }, 350);
    }
    function stopBurst() {
      if (!running) return;
      running = false;
      anims.forEach(function (a) { try { a.cancel(); } catch (e) {} });
      anims = [];
      resolveMark();
    }
    function burst() {
      if (running) return;
      running = true;
      var vw = window.innerWidth, vh = brandHero.offsetHeight,
          box = ident.getBoundingClientRect(),
          cx = box.left + box.width / 2, cy = box.top + box.height / 2,
          ox = vw / 2 - cx, oy = vh / 2 - cy,
          rx = Math.max(120, vw / 2 - 90), ry = Math.max(100, vh / 2 - 80),
          total = 4300, done = 0;
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
        anim.onfinish = function () { if (++done === shapes.length && running) { running = false; resolveMark(); } };
      });
    }
    if (reduced || !ident.animate) {
      resolveMark();
    } else {
      var kick = function () { setTimeout(function () { if (window.scrollY < 40) { burst(); } else { resolveMark(); } }, 420); };
      if (document.fonts && document.fonts.ready) { document.fonts.ready.then(kick); } else { kick(); }
      addEventListener('scroll', function () { if (running && window.scrollY > 40) stopBurst(); }, { passive: true });
      heroLogo.addEventListener('click', function (e) {
        if (window.scrollY < 40) {
          e.preventDefault();
          if (running) return;
          tile.classList.remove('in'); heroLogoImg.classList.remove('in'); ident.classList.remove('out');
          setTimeout(burst, 350);
        }
      });
    }
  }

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
