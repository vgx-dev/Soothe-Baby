const CACHE_NAME = 'baby-touch-v19';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/main.js',
  './js/i18n.js',
  './js/audio.js',
  './js/physics.js',
  './js/renderer.js',
  './bg.png',
  './star.png',
  './circle.png',
  './triangle.png',
  './square.png',
  'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
