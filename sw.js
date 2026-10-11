const C='shiftmoney-v12-20261011',F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET'||new URL(q.url).origin!==self.location.origin)return;if(new URL(q.url).pathname.indexOf('/shiftmoney2/')!==0)return;
if(q.mode==='navigate'){e.respondWith(fetch(q).then(async r=>{if(r.ok)(await caches.open(C)).put('./index.html',r.clone());return r}).catch(async()=>await caches.match('./index.html')||Response.error()));return}
e.respondWith(caches.match(q).then(old=>old||fetch(q).then(async r=>{if(r.ok)(await caches.open(C)).put(q,r.clone());return r}))) });
