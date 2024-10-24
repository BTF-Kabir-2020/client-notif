// let cacheData = "appv1";

// // مرحله نصب سرویس‌ورکر و کش کردن فایل‌ها
// this.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open(cacheData).then((cache) => {
//             return cache.addAll(['/index.html', '/']); // اختیاری: کش کردن صفحه اصلی و root
//         })
//     );
// });

// // مرحله دریافت درخواست‌ها و بررسی کش
// this.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request).then((response) => {
//             if (response) {
//                 return response;  // اگر فایل در کش بود، از کش برگردان
//             }

//             let requestUrl = event.request.clone();
//             return fetch(requestUrl).then((fetchResponse) => {
//                 if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
//                     return fetchResponse;  // فقط درخواست‌های موفق کش می‌شوند
//                 }

//                 let responseToCache = fetchResponse.clone();
//                 caches.open(cacheData).then((cache) => {
//                     cache.put(event.request, responseToCache);  // ذخیره در کش
//                 });

//                 return fetchResponse;
//             });
//         }).catch(() => {
//             return caches.match('/index.html');  // اگر آفلاین بود و فایل در کش نبود، صفحه‌ی اصلی را برگردانید
//         })
//     );
// });

// // مرحله دریافت نوتیفیکیشن‌های push
// // this.addEventListener('push', function (event) {
// //     const data = event.data ? event.data.json() : {};
// //     const title = data.title || 'Default Title';
// //     const options = {
// //         body: data.body || 'Default Body',
// //         icon: '/path/to/icon.png'
// //     };

// //     event.waitUntil(
// //         self.registration.showNotification(title, options)
// //     );
// // });
// self.addEventListener('push', function (event) {
//     const title = 'New Message';
//     const options = {
//         body: event.data ? event.data.text() : 'You have a new message!',
//         icon: '/icon.png',
//         badge: '/badge.png'
//     };

//     event.waitUntil(self.registration.showNotification(title, options));
// });







let cacheData = "appv1";

self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            console.log('[Service Worker] Caching files...');
            return cache.addAll(['/index.html', '/']); // اختیاری
        }).catch((error) => {
            console.error('[Service Worker] Caching failed:', error);
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log(`[Service Worker] Fetching: ${event.request.url}`);

    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                console.log('[Service Worker] Found in cache:', event.request.url);
                return response;
            }

            console.log('[Service Worker] Network request for:', event.request.url);
            return fetch(event.request.clone()).then((fetchResponse) => {
                if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                    console.warn('[Service Worker] Fetch failed or not caching:', event.request.url);
                    return fetchResponse;
                }

                let responseToCache = fetchResponse.clone();
                caches.open(cacheData).then((cache) => {
                    console.log('[Service Worker] Caching new data:', event.request.url);
                    cache.put(event.request, responseToCache);
                }).catch((error) => {
                    console.error('[Service Worker] Failed to cache:', error);
                });

                return fetchResponse;
            });
        }).catch((error) => {
            console.error('[Service Worker] Fetching failed:', error);
            return caches.match('/index.html');
        })
    );
});

self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push event received:', event);
    const title = 'New Message';
    const options = {
        body: event.data ? event.data.text() : 'You have a new message!',
        icon: '/icon.png',
        badge: '/badge.png'
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
            .then(() => console.log('[Service Worker] Notification displayed'))
            .catch((error) => {
                console.error('[Service Worker] Notification display failed:', error);
            })
    );
});







