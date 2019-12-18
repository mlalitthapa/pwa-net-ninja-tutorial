const STATIC_ASSETS_CACHE = 'static-assets-cache-v1';
const DYNAMIC_CACHE_KEY = 'dynamic-cache-v1';
const ASSETS = [
    '/',
    'index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/materialize.min.css',
    '/css/styles.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
];

// install service worker
self.addEventListener('install', event => {
    // console.log('Service worker installed');
    event.waitUntil(
        caches.open(STATIC_ASSETS_CACHE)
            .then(cache => {
                console.log('caching assets');
                cache.addAll(ASSETS);
            })
    );
});

// Listen to activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        // Get the current cache keys and remove all other except the current version
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== STATIC_ASSETS_CACHE)
                    .map(key => caches.delete(key))
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    // console.log('Fetch event', event);
    event.respondWith(
        caches.match(event.request).then(cacheResponse => {
            return cacheResponse || fetch(event.request).then(fetchResponse => {
                // Cache the response data of fetch in new dynamic cache key
                return caches.open(DYNAMIC_CACHE_KEY).then(cache => {
                    cache.put(event.request.url, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        })
    );
});
