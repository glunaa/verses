// ⚠️ Bump this version string on EVERY deploy — the activate handler below
// deletes old caches, so changing it is what pushes updates to users.
// (Long term: switch to vite-plugin-pwa to automate this.)
const CACHE_VERSION = 'v2';
const CACHE_NAME = `verses-cache-${CACHE_VERSION}`;
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon-192.png',
  '/icon-512.png',
  '/sacred-heart.jpeg',
  '/sacred-heart-header-icon.JPG',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: serve from cache instantly (so it works offline),
// and refresh the cache from the network in the background when available.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Network-first for page navigations: users get the newest index.html
  // (and therefore the newest JS bundle) whenever they're online,
  // while still falling back to cache offline.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then((c) => c || caches.match('/index.html')))
    );
    return;
  }

  // Stale-while-revalidate for everything else (assets, images, fonts).
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
