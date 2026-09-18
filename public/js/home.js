/* Homepage-only behaviour: docking hero logo, marquees, RIBA pop-outs, project carousel. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- migrating hero logo: centre of hero -> top-left corner ---- */
  var heroLogo = document.getElementById('heroLogo'),
      heroLogoImg = document.getElementById('heroLogoImg'),
      brandHero = document.getElementById('brandHero'),
      ticking = false;
  function placeLogo() {
    ticking = false;
    var vw = window.innerWidth,
        nw = heroLogoImg.naturalWidth || 1000,
        nh = heroLogoImg.naturalHeight || 320,
        ratio = nh / nw,
        startW = Math.min(680, vw * 0.8),
        startH = startW * ratio;
    if (vw <= 760) {
      heroLogo.style.position = 'absolute';
      heroLogoImg.style.width = startW + 'px';
      heroLogo.style.transform = 'translate3d(' + ((vw - startW) / 2) + 'px,' +
        ((brandHero.offsetHeight - startH) / 2) + 'px,0)';
      heroLogo.style.setProperty('--dock', '0');
      return;
    }
    heroLogo.style.position = 'fixed';
    var endH = 44,
        endW = endH / ratio,
        xe = 26,
        ye = 14,
        heroH = brandHero.offsetHeight,
        p = Math.min(Math.max(window.scrollY / (heroH * 0.7), 0), 1),
        e = 1 - Math.pow(1 - p, 3),
        xs = (vw - startW) / 2,
        ys = (heroH - startH) / 2 - window.scrollY,
        x = (1 - e) * xs + e * xe,
        y = (1 - e) * ys + e * ye,
        s = 1 + (endW / startW - 1) * e;
    heroLogoImg.style.width = startW + 'px';
    heroLogo.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) scale(' + s + ')';
    /* navy tile behind the mark fades in over the last third of the dock */
    heroLogo.style.setProperty('--dock', Math.max(0, (e - 0.66) / 0.34).toFixed(3));
  }
  function onScrollLogo() {
    if (!ticking) { ticking = true; requestAnimationFrame(placeLogo); }
  }
  if (heroLogo && heroLogoImg && brandHero) {
    addEventListener('scroll', onScrollLogo, { passive: true });
    addEventListener('resize', onScrollLogo);
    if (heroLogoImg.complete) { placeLogo(); } else { heroLogoImg.addEventListener('load', placeLogo); }
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
