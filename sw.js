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
});
