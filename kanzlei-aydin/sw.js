
const CACHE = 'demo-2-v-mvx4u32t';
const SEITEN = ["/website-entwuerfe/kanzlei-aydin/","/website-entwuerfe/kanzlei-aydin/rechtsgebiete/","/website-entwuerfe/kanzlei-aydin/rechtsgebiete/strafverteidigung/","/website-entwuerfe/kanzlei-aydin/rechtsgebiete/wirtschaftsstrafrecht/","/website-entwuerfe/kanzlei-aydin/rechtsgebiete/verkehrsstrafrecht/","/website-entwuerfe/kanzlei-aydin/rechtsgebiete/jugendstrafrecht/","/website-entwuerfe/kanzlei-aydin/anwaelte/","/website-entwuerfe/kanzlei-aydin/anwaelte/kerem-aydin/","/website-entwuerfe/kanzlei-aydin/anwaelte/lea-brandt/","/website-entwuerfe/kanzlei-aydin/kanzlei/","/website-entwuerfe/kanzlei-aydin/kosten/","/website-entwuerfe/kanzlei-aydin/kontakt/","/website-entwuerfe/kanzlei-aydin/orientierung/","/website-entwuerfe/kanzlei-aydin/fristenrechner/","/website-entwuerfe/kanzlei-aydin/notfall/","/website-entwuerfe/kanzlei-aydin/karriere/","/website-entwuerfe/kanzlei-aydin/ratgeber/","/website-entwuerfe/kanzlei-aydin/ratgeber/jugendstrafverfahren-eltern/","/website-entwuerfe/kanzlei-aydin/ratgeber/fuehrerschein-alkohol/","/website-entwuerfe/kanzlei-aydin/ratgeber/strafbefehl-einspruch/","/website-entwuerfe/kanzlei-aydin/ratgeber/vorladung-polizei/","/website-entwuerfe/kanzlei-aydin/ratgeber/hausdurchsuchung-was-tun/"];
// Nur Code, Styles und Schriften vorladen – Bilder werden beim Ansehen gecacht (spart mobiles Datenvolumen)
const ASSET = /\/_astro\/[^"'\s),]+\.(?:js|css|woff2)/g;

async function vorladen() {
  const cache = await caches.open(CACHE);
  for (const url of SEITEN) {
    try {
      const res = await fetch(url, { credentials: 'same-origin' });
      if (!res.ok) continue;
      await cache.put(url, res.clone());
      const html = await res.text();
      const assets = [...new Set(html.match(ASSET) || [])];
      await Promise.all(assets.map((a) => cache.match(a).then((hit) => hit || cache.add(a).catch(() => {}))));
    } catch (e) {}
  }
}

self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
    vorladen();
  })());
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((res) => {
      const kopie = res.clone();
      caches.open(CACHE).then((c) => c.put(req, kopie));
      return res;
    }).catch(() => caches.match(req).then((hit) => hit || caches.match('/website-entwuerfe/kanzlei-aydin/'))));
    return;
  }
  if (new URL(req.url).pathname.includes('/_astro/')) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      const kopie = res.clone();
      caches.open(CACHE).then((c) => c.put(req, kopie));
      return res;
    })));
  }
});
