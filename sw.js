// CSN Cimentos Manutencao v3
const CACHE_NAME = 'csn-manut-v3';
const URLS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(c){
      return c.addAll(URLS).catch(function(){});
    })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE_NAME; })
            .map(function(k){ return caches.delete(k); })
      );
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  if(e.request.method !== 'GET') return;
  e.respondWith(
    // cache:'no-store' forca ignorar o cache HTTP do navegador/GitHub Pages,
    // garantindo que o arquivo mais recente do repositorio seja sempre buscado.
    fetch(e.request, {cache: 'no-store'}).then(function(r){
      if(r.ok){
        var c = r.clone();
        caches.open(CACHE_NAME).then(function(ca){ ca.put(e.request, c); });
      }
      return r;
    }).catch(function(){
      return caches.match(e.request);
    })
  );
});
