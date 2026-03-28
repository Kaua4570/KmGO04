// NOME DO CACHE (pode mudar versão quando atualizar)
const CACHE_NAME = "relatorio-km-v1";

// ARQUIVOS QUE SERÃO SALVOS OFFLINE
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./dados.txt",
  "./fundo.jpg",
  "./icon.png"
];

// INSTALAÇÃO (salva arquivos no cache)
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// ATIVAÇÃO (limpa cache antigo)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// INTERCEPTA REQUISIÇÕES (offline)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
