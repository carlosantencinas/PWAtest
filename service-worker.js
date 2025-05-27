self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('calc-cache').then(cache => {
      return cache.addAll([
        'index.html',
        'styles.css',   // cuidado con el nombre, debe ser exacto
        'app.js',
        'manifest.json'
      ]);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== 'calc-cache')
            .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
