const STATIC_ASSETS_CACHE = 'static-assets-cache';
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
self.addEventListener('activate', (event) => {
    // console.log('Service worker has been activated');
});

// Fetch event
self.addEventListener('fetch', event => {
    // console.log('Fetch event', event);
    event.respondWith(
        caches.match(event.request).then(cacheResponse => {
            return cacheResponse || fetch(event.request);
        })
    );
});
