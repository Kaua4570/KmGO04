const CACHE_NAME = "murici-app-v2";

const urlsToCache = [
  "index.html",
  "dados.txt"
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
  self.clients.claim();
});

// Fetch inteligente
self.addEventListener("fetch", event => {
  if (event.request.url.includes("dados.txt")) {
    // 🔥 SEMPRE pega atualizado
    event.respondWith(fetch(event.request));
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
