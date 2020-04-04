var zAppVersion = 'gs2020-04-04';

self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(zAppVersion).then(function(cache) {
    return cache.addAll([
        './gcl.js'
      , './gevents.js'
      , './gstyles.css'
      , './gtexts.js'
      , './images/PaypalDonate.png'
      , './images/brave-bat-partnership.svg'
      , './images/logo-full-color.svg'
      , './images/brave-logotype-dark.svg'
      , './images/StewVed.jpg'
      , './initialize.js'
      , './inputs.js'
      , './loader.js'
      , './settings.js'
      , './sounds.js'
      , './storage.js'
      , './toolTips.js'
    ])
  }))
  console.log('globalscripts files cached.');
  // activate without user having to close/open.
  self.skipWaiting();
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(cacheResponse) {
      return cacheResponse || fetch(event.request).then(function(netResponse) {
        return caches.open(zAppVersion).then(function(cache) {
          cache.put(event.request, netResponse.clone());
          console.log(event.request.url + ' added to globalscripts cache.');
          return netResponse;
        });
      });
    })
  );
});
self.addEventListener('activate', function(event) {
  //make the new serviceworker take over now:
  event.waitUntil(clients.claim());
  //delete any old file caches for this app:
  var zAppPrefix = zAppVersion.slice(0, 2);
  event.waitUntil(caches.keys().then(function(cacheNames) {
    return Promise.all(cacheNames.map(function(cacheName) {
      if (cacheName.slice(0, 2) === zAppPrefix) {
        if (cacheName !== zAppVersion) {
          return caches.delete(cacheName);
        }
      }
    }))
  }));
});