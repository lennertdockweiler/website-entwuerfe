/* Generiert beim Build – nicht von Hand bearbeiten */
const VERSION = '6591b37d19';
const PAGES = 'pages-' + VERSION;
const ASSETS = 'assets-v1';
const PRECACHE = ["/_astro/BaseLayout.astro_astro_type_script_index_0_lang.KntJXo_P.js","/_astro/BookingWidget.C-PDkUHl.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CO1cjG9V.js","/_astro/EventInquiry.CARMYAU6.js","/_astro/SplitText.B7FBQkMm.js","/_astro/accordion.DdBM0pVw.js","/_astro/app.CRWInDqz.js","/_astro/carousel.CYAmPD9O.js","/_astro/client.5sRcbqVE.js","/_astro/consent.BHuadMeo.js","/_astro/fonts/134f2eb76ca9c538.woff2","/_astro/fonts/71407db4e316e229.woff2","/_astro/fonts/96696d6f557c99ed.woff2","/_astro/fonts/a6cdaf31a31c1951.woff2","/_astro/fonts/fe5d37682e3391f2.woff2","/_astro/fonts/ff0e6ab8e0eca771.woff2","/_astro/forms.BEl3TwUI.js","/_astro/gallery.Dn2IBTW7.js","/_astro/hero.DUce39Po.js","/_astro/hooks.DhG_hFEC.js","/_astro/jsxRuntime.CTsdxqSM.js","/_astro/lifecycle.WfH4QlQF.js","/_astro/lightbox.CZialCAq.js","/_astro/marquee.B77-Fnte.js","/_astro/page.Bx2KSkeL.js","/_astro/poi-map.CkDhPvIi.js","/_astro/preact.0LJ3gdp1.js","/_astro/prefetch.GJhwodf8.js","/_astro/preload-helper.Baqf51-l.js","/_astro/pricing.C0jAZpPd.js","/_astro/roi.CGZQL7BL.js","/_astro/rooms.kHgAhiGV.js","/_astro/season.gcrQjRO4.js","/_astro/signals.module.B85RxiXA.js","/_astro/tilt.CzHVbrZt.js","/_astro/voucher.CRBPMLDa.js","/agb-stornobedingungen/","/anfahrt-kontakt/","/angebote/drei-tage-stille/","/angebote/","/angebote/seezeit-zu-zweit/","/angebote/tegernseer-genusstage/","/angebote/winterstille/","/datenschutz/","/en/about/","/en/contact/","/en/dining/","/en/explore/","/en/faq/","/en/gallery/","/en/gift-vouchers/","/en/","/en/legal-notice/","/en/meetings-events/","/en/offers/","/en/offers/lake-time-for-two/","/en/offers/tegernsee-food-days/","/en/offers/three-days-of-silence/","/en/offers/winter-silence/","/en/privacy/","/en/rooms/country-room/","/en/rooms/","/en/rooms/lake-room/","/en/rooms/lake-view-suite/","/en/rooms/larch-junior-suite/","/en/rooms/wallberg-fireplace-suite/","/en/spa/","/en/terms/","/erleben/","/faq/","/galerie/","/genuss/","/gutscheine/","/impressum/","/","/spa-wellness/","/tagungen-events/","/ueber-uns/","/zimmer/","/zimmer/junior-suite-laerche/","/zimmer/kaminsuite-wallberg/","/zimmer/landhauszimmer/","/zimmer/seeblick-suite/","/zimmer/seezimmer/"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(PAGES).then((c) => c.addAll(PRECACHE).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('pages-') && k !== PAGES).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (url.pathname.startsWith('/_astro/')) {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(ASSETS).then((c) => c.put(req, copy)); }
        return res;
      })),
    );
    return;
  }
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(req).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(PAGES).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req).then((hit) => hit || caches.match('/404.html'))),
    );
  }
});
