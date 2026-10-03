const CACHE='native-english-coach-v1.12.0';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./audio-index.json','./irregular-verbs.json','./irregular-course-cues.json'];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c=>c.addAll(ASSETS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  if(url.pathname.endsWith('/irregular-course.mp3') || url.pathname.endsWith('/irregular-course.m4a')){
    e.respondWith(fetch(e.request));
    return;
  }

  const networkFirst=
    e.request.mode==='navigate' ||
    url.pathname.endsWith('/index.html') ||
    url.pathname.endsWith('/audio-index.json') ||
    url.pathname.endsWith('/irregular-verbs.json') ||
    url.pathname.endsWith('/irregular-course-cues.json');

  if(networkFirst){
    e.respondWith(
      fetch(e.request)
        .then(resp=>{
          const copy=resp.clone();
          caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
          return resp;
        })
        .catch(()=>caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request)
      .then(cached=>cached||fetch(e.request).then(resp=>{
        const copy=resp.clone();
        caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
        return resp;
      }))
  );
});
