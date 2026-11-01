/* Generiert beim Build – nicht von Hand bearbeiten */
const VERSION = '37edd737c7';
const PAGES = 'pages-' + VERSION;
const ASSETS = 'assets-v1';
const PRECACHE = ["/_astro/BaseLayout.astro_astro_type_script_index_0_lang.C9pYp0s9.js","/_astro/BookingWidget.C-PDkUHl.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CO1cjG9V.js","/_astro/EventInquiry.CARMYAU6.js","/_astro/SplitText.B7FBQkMm.js","/_astro/accordion.DdBM0pVw.js","/_astro/app.PyidQ_3g.js","/_astro/carousel.CYAmPD9O.js","/_astro/client.Cgvwi4R8.js","/_astro/consent.BHuadMeo.js","/_astro/fonts/16d1cfe5a795e387.woff2","/_astro/fonts/70ea363670ac9f85.woff2","/_astro/fonts/83edf1e95de8eac0.woff2","/_astro/fonts/9e486d98724b0866.woff2","/_astro/forms.BEl3TwUI.js","/_astro/gallery.Dn2IBTW7.js","/_astro/hero.CCtFQg6S.js","/_astro/hooks.DhG_hFEC.js","/_astro/jsxRuntime.CTsdxqSM.js","/_astro/lifecycle.WfH4QlQF.js","/_astro/lightbox.D4jcF31w.js","/_astro/marquee.B77-Fnte.js","/_astro/page.Bx2KSkeL.js","/_astro/poi-map.CkDhPvIi.js","/_astro/preact.0LJ3gdp1.js","/_astro/prefetch.GJhwodf8.js","/_astro/preload-helper.BiqfmZKo.js","/_astro/pricing.C0jAZpPd.js","/_astro/roi.CGZQL7BL.js","/_astro/rooms.ZSQPbezD.js","/_astro/season.gcrQjRO4.js","/_astro/signals.module.B85RxiXA.js","/_astro/tilt.CzHVbrZt.js","/_astro/voucher.CRBPMLDa.js","/agb-stornobedingungen/","/anfahrt-kontakt/","/angebote/48-stunden-hamburg/","/angebote/hafen-bei-nacht/","/angebote/","/angebote/konzert-und-koje/","/angebote/workation/","/datenschutz/","/en/about/","/en/contact/","/en/dining/","/en/explore/","/en/faq/","/en/gallery/","/en/gift-vouchers/","/en/","/en/legal-notice/","/en/meetings-events/","/en/offers/48-hours-hamburg/","/en/offers/concert-and-bunk/","/en/offers/harbour-by-night/","/en/offers/","/en/offers/workation/","/en/privacy/","/en/rooms/bunk/","/en/rooms/canal-view/","/en/rooms/","/en/rooms/kontor-room/","/en/rooms/loft/","/en/rooms/warehouse-suite/","/en/terms/","/erleben/","/faq/","/galerie/","/genuss/","/gutscheine/","/impressum/","/","/tagungen-events/","/ueber-uns/","/zimmer/fleetblick/","/zimmer/","/zimmer/koje/","/zimmer/kontor-zimmer/","/zimmer/loft/","/zimmer/speicher-suite/"];
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
