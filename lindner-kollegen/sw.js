
const CACHE = 'demo-v-mvx4sfyn';
const SEITEN = ["/website-entwuerfe/lindner-kollegen/","/website-entwuerfe/lindner-kollegen/rechtsgebiete/","/website-entwuerfe/lindner-kollegen/rechtsgebiete/arbeitsrecht/","/website-entwuerfe/lindner-kollegen/rechtsgebiete/familienrecht/","/website-entwuerfe/lindner-kollegen/rechtsgebiete/verkehrsrecht/","/website-entwuerfe/lindner-kollegen/rechtsgebiete/mietrecht/","/website-entwuerfe/lindner-kollegen/rechtsgebiete/erbrecht/","/website-entwuerfe/lindner-kollegen/anwaelte/","/website-entwuerfe/lindner-kollegen/anwaelte/katharina-lindner/","/website-entwuerfe/lindner-kollegen/anwaelte/jonas-albrecht/","/website-entwuerfe/lindner-kollegen/anwaelte/selin-kaya/","/website-entwuerfe/lindner-kollegen/kanzlei/","/website-entwuerfe/lindner-kollegen/kosten/","/website-entwuerfe/lindner-kollegen/kontakt/","/website-entwuerfe/lindner-kollegen/orientierung/","/website-entwuerfe/lindner-kollegen/fristenrechner/","/website-entwuerfe/lindner-kollegen/karriere/","/website-entwuerfe/lindner-kollegen/ratgeber/","/website-entwuerfe/lindner-kollegen/ratgeber/erbschaft-ausschlagen/","/website-entwuerfe/lindner-kollegen/ratgeber/mieterhoehung-pruefen/","/website-entwuerfe/lindner-kollegen/ratgeber/unfall-ohne-schuld/","/website-entwuerfe/lindner-kollegen/ratgeber/scheidung-ablauf-kosten/","/website-entwuerfe/lindner-kollegen/ratgeber/kuendigung-erhalten-was-tun/"];
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
    }).catch(() => caches.match(req).then((hit) => hit || caches.match('/website-entwuerfe/lindner-kollegen/'))));
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
