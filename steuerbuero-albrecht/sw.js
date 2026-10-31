const V='vmvwfq9xa';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(['/website-entwuerfe/steuerbuero-albrecht/'])).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
const seite=u=>u.pathname.endsWith('/')||u.pathname.endsWith('.html');
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
if(u.pathname.startsWith('/website-entwuerfe/steuerbuero-albrecht/_astro/')){e.respondWith(caches.match(r).then(t=>t||fetch(r).then(n=>{const k=n.clone();caches.open(V).then(c=>c.put(r,k));return n})));return}
if(r.mode==='navigate'||seite(u)){e.respondWith(fetch(r).then(n=>{const k=n.clone();caches.open(V).then(c=>c.put(r,k));return n}).catch(()=>caches.match(r).then(t=>t||caches.match('/website-entwuerfe/steuerbuero-albrecht/'))));return}
e.respondWith(caches.match(r).then(t=>{const n=fetch(r).then(x=>{const k=x.clone();caches.open(V).then(c=>c.put(r,k));return x}).catch(()=>t);return t||n}))});