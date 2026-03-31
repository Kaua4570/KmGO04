const CACHE_NAME = "murici-app-v1";

const urlsToCache = [
  "index.html"
];

// Instala
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa
self.addEventListener("activate", event => {
  console.log("Service Worker ativo");
});

// Fetch (offline)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
