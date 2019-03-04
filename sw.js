const staticCacheName = 'app-cache';
const filesToCache = [
  './',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  './js/serviceWorkerReg.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
];

// installing service worker
self.addEventListener('install', function(e) {
  e.waitUntill(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

//activate the service worker
self.addEventListener('activate', function(e) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('app-') &&
            cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// fethching for offline viewing
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request)
    .then(function(response) {
      if (response) {
        return response;
      } else {
        return fetch(e.request)
          .then(function(response) {
            const clonedResponse = response.clone();
            caches.open(staticCacheName)
              .then(function(cache) {
                cache.put(e.request, clonedResponse)
              })
            return response;
          });
      }
    })
  );
});
