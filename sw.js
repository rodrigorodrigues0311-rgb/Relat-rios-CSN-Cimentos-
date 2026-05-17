// CSN Cimentos v1778986604
const CACHE_NAME='csn-v1778986604';
const URLS=['./','./index.html','./manifest.json','./sw.js','./icon-192.png','./icon-512.png','./lima-logo.png'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE_NAME).then(function(c){return c.addAll(URLS).catch(function(){});}).catch(function(){}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ns){return Promise.all(ns.filter(function(n){return n!==CACHE_NAME;}).map(function(n){return caches.delete(n);}))}).then(function(){return self.clients.claim();}))});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(function(r){if(r.ok){var c=r.clone();caches.open(CACHE_NAME).then(function(ca){ca.put(e.request,c);});}return r;}).catch(function(){return caches.match(e.request);}))});
