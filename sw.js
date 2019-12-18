// install service worker
self.addEventListener('install', (event) => {
    console.log('Service worker installed');
});

// Listen to activate event
self.addEventListener('activate', (event) => {
    console.log('Service worker has been activated');
});
