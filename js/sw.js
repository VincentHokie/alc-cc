/*
    All the interactions that concern the indexDB come from and are
    written in this file
*/


// const SW_VERSION = 'v1';

//   self.addEventListener('install', (event) => {
//     event.waitUntil(
//       caches.open(SW_VERSION).then((cache) => {
//         return cache.addAll([
//           '/',
//           '/index.html',
//           '/build/main.bundle.js',
//           '/static/styles/fontawesome-all.min.css',
//           '/static/styles/bulma.min.css',
//           '/static/images/coin.jpg',
//         ]);
//       })
//     );
//   });

//   self.addEventListener('fetch', (event) => {
//     event.respondWith(
//       caches.match(event.request).then((resp) => {
//         return resp || fetch(event.request).then((response) => {
//           let responseClone = response.clone();
//           caches.open(SW_VERSION).then((cache) => {
//             cache.put(event.request, responseClone);
//           });
  
//           return response;
//         });
//       }).catch(() => {
//         return caches.match('/sw-test/gallery/myLittleVader.jpg');
//       })
//     );
//   });