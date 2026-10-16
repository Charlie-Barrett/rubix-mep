/* Site-wide behaviour: hamburger menu, sticky header, scroll reveal, HubSpot forms. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- hamburger menu ---- */
  var burger = document.getElementById('burger'),
      menu = document.getElementById('menu'),
      menuClose = document.getElementById('menuClose'),
      backdrop = document.getElementById('menuBackdrop');
  if (burger && menu) {
    var setMenu = function (open) {
      menu.classList.toggle('open', open);
      if (backdrop) backdrop.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    if (menuClose) menuClose.addEventListener('click', function () { setMenu(false); });
    if (backdrop) backdrop.addEventListener('click', function () { setMenu(false); });
    menu.querySelectorAll('nav a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---- sticky header: transparent over the banner, slim navy bar once scrolled ---- */
  var header = document.getElementById('header');
  if (header) {
    var hdrTick = false;
    var setHeader = function () {
      hdrTick = false;
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    addEventListener('scroll', function () {
      if (!hdrTick) { hdrTick = true; requestAnimationFrame(setHeader); }
    }, { passive: true });
    setHeader();
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

  /* ---- enquiry forms -> HubSpot ----
     Each form keeps the site's own markup and posts its fields to the HubSpot
     Forms API (Rubix MEP portal, EU data centre). Field names in the markup are
     HubSpot internal property names; the hidden enquiry_type picks the form.
     website_url is a honeypot: if it is filled, pretend success and send nothing. */
  var HS_PORTAL = '149538377';
  var HS_FORMS = {
    project: '6b401466-6deb-40be-bf5a-506a3febf11c',   // Website: Project enquiry
    careers: '2b904f43-d120-41c5-83ba-0fc712a35a2e',   // Website: Careers interest
    brochure: '6583253e-4521-48e1-881e-86f525727933'   // Website: Brochure download
  };
  var HS_MARKETING_SUB = 3863685722;                   // "Marketing Information" subscription
  var HS_HOSTS = ['https://api-eu1.hsforms.com', 'https://api.hsforms.com'];
  var SKIP = { website_url: 1, marketing_optin: 1 };

  var hsPayload = function (form, kind) {
    var fields = [];
    new FormData(form).forEach(function (v, k) {
      if (SKIP[k]) return;
      v = String(v).trim();
      if (v) fields.push({ objectTypeId: '0-1', name: k, value: v });
    });
    var body = { fields: fields, context: { pageUri: location.href, pageName: document.title } };
    var utk = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
    if (utk) body.context.hutk = utk[1];
    if (kind === 'brochure') {
      var optin = form.querySelector('[name="marketing_optin"]');
      body.legalConsentOptions = { consent: {
        consentToProcess: true,
        text: 'To deliver your service, we need your permission to store and process your personal data.',
        communications: [{
          value: !!(optin && optin.checked),
          subscriptionTypeId: HS_MARKETING_SUB,
          text: 'I agree to receive other communications from Rubix MEP.'
        }]
      } };
    }
    return body;
  };

  var hsSend = function (kind, body, i) {
    i = i || 0;
    return fetch(HS_HOSTS[i] + '/submissions/v3/integration/submit/' + HS_PORTAL + '/' + HS_FORMS[kind], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (r) {
      if (r.ok) return r;
      if (r.status === 404 && i + 1 < HS_HOSTS.length) return hsSend(kind, body, i + 1);
      return r.text().then(function (t) { throw new Error('HubSpot ' + r.status + ': ' + t); });
    });
  };

  /* GA4 conversion events, sent only if the visitor accepted statistics cookies.
     Project enquiries and brochure downloads are leads; careers is tracked separately. */
  var GA_EVENTS = { project: 'generate_lead', brochure: 'generate_lead', careers: 'careers_interest' };
  var track = function (kind) {
    try {
      if (!window.gtag || !GA_EVENTS[kind]) return;
      if (!(window.Cookiebot && Cookiebot.consent && Cookiebot.consent.statistics)) return;
      gtag('event', GA_EVENTS[kind], { form_type: kind, page_path: location.pathname });
    } catch (e) {}
  };

  document.querySelectorAll('[data-enquiry] form').forEach(function (form) {
    var box = form.closest('[data-enquiry]');
    var btn = form.querySelector('button[type="submit"]');
    var err = form.querySelector('.err');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var trap = form.querySelector('[name="website_url"]');
      if (trap && trap.value) { box.classList.add('sent'); return; }
      var kindEl = form.querySelector('[name="enquiry_type"]');
      var kind = kindEl ? kindEl.value : 'project';
      if (!HS_FORMS[kind]) return;
      if (err) err.hidden = true;
      if (btn) btn.disabled = true;
      hsSend(kind, hsPayload(form, kind)).then(function () {
        box.classList.add('sent');
        track(kind);
        if (kind === 'brochure') {
          var dl = box.querySelector('[data-download]');
          if (dl) dl.click();
        }
      }).catch(function (ex) {
        if (window.console) console.warn('[Rubix forms]', ex);
        if (err) err.hidden = false;
      }).then(function () {
        if (btn) btn.disabled = false;
      });
    });
  });

  /* ---- CTA anchors fall back to the contact page ----
     Pages without a project enquiry form (About carries only the careers form)
     must not send "Discuss your project" to whatever form happens to be there. */
  if (!document.getElementById('enquire')) {
    document.querySelectorAll('a[href="#enquire"]').forEach(function (a) {
      a.setAttribute('href', '/contact#enquire');
    });
  }
})();
