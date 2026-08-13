/* Site-wide behaviour: hamburger menu + scroll reveal. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- hamburger menu ---- */
  var burger = document.getElementById('burger'),
      menu = document.getElementById('menu'),
      menuClose = document.getElementById('menuClose');
  if (burger && menu) {
    var setMenu = function (open) {
      menu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    if (menuClose) menuClose.addEventListener('click', function () { setMenu(false); });
    menu.querySelectorAll('nav a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---- scroll reveal ---- */
  var els = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window) || reduced) {
    els.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }
})();
