const C='shiftmoney-v10',F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const tell=async()=>{for(const c of await self.clients.matchAll())c.postMessage('updated')};
/* instant loads: answer from cache, refresh in background, tell the app if index.html changed */
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET'||!q.url.startsWith(self.location.origin))return;
e.respondWith((async()=>{const c=await caches.open(C),old=await c.match(q,{ignoreSearch:true});
const net=fetch(q).then(async r=>{if(r.ok){if(old&&(q.mode==='navigate'||q.url.endsWith('index.html'))){const[a,b]=await Promise.all([old.clone().text(),r.clone().text()]);if(a!==b)tell()}c.put(q,r.clone())}return r}).catch(()=>old);
return old||net})())});
