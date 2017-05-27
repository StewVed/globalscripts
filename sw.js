var zAppVersion = 'gs2017-05-27'
self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(zAppVersion).then(function(cache) {
    return cache.addAll([
        './'
      , './gcl.js'
      , './gevents.js'
      , './gstyles.css'
      , './gtexts.js'
      , './images/Patreon.png'
      , './images/PaypalDonate.png'
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
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(cacheResponse) {
      return cacheResponse || fetch(event.request).then(function(netResponse) {
        return caches.open(zAppVersion).then(function(cache) {
          cache.put(event.request, netResponse.clone());
          console.log(event.request.url + ' added to gs cache!');
          return netResponse;
        });
      });
    })
  );
});
self.addEventListener('activate', function(event) {
  var zAppPrefix = zAppVersion.slice(0, 2);
  event.waitUntil(caches.keys().then(function(cacheNames) {
    return Promise.all(cacheNames.map(function(cacheName) {
      if (cacheName.slice(0, 2) === zAppPrefix) {
        if (cacheName !== zAppVersion) {
          return caches.delete(cacheName);
        }
      }
    }))
  }))
});
