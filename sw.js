/*
    All the interactions that concern the indexDB come from and are
    written in this file
*/


const expectedCaches = ['static-v2'];

  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open("static-v2").then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/build/main.bundle.js',
          '/static/images/coin.jpg',
          '/static/images/img-loading.gif',
          '/static/js/Chart.bundle.min',
          '/static/css/iziToast.min.css',
        ]);
      }).catch((error) => {
        console.log("error", error)
      })
    );
  });

  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(keys => Promise.all(
        keys.map(key => {
          if (!expectedCaches.includes(key)) {
            return caches.delete(key);
          }
        })
      )).then(() => {
        console.log('V2 now ready to handle fetches!');
      })
    );
  });

  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((resp) => {
        return resp || fetch(event.request).then((response) => {
          let responseClone = response.clone();
          caches.open("static-v2").then((cache) => {
            cache.put(event.request, responseClone);
          });
  
          return response;
        });
      }).catch(() => {
        return caches.match('/static/images/coin.jpg');
      })
    );
  });