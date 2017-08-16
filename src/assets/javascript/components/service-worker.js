---
permalink: /service-worker.js
---




var CACHE_NAME = 'me.adamgian.www';
var cacheable = [
    '/',
    '/projects/',
    '/project/gravitas/',
    '/project/adamgian/',
    '/project/caboolturecountrymarkets/',
    '/assets/javascript/bundle.min.js',
    '/assets/styles/main.min.css',
];


self.addEventListener( 'install', event => {
    console.log(cache);
    event.waitUntil(
        caches
            .open( CACHE_NAME )
            .then( cache => {
                return cache.addAll( cacheable );
            })
            // Force waiting service worker to become active
            .then( () => {
                return self.skipWaiting();
            })
    );
});


self.addEventListener( 'activate', event => {
    var whitelist = ['me.adamgian.www'];

    event.waitUntil(
        caches
            .keys()
            .then( cacheNames => {
                return Promise.all(
                    cacheNames.map( cacheName => {
                        if ( whitelist.indexOf( cacheName ) === -1 )
                            return caches.delete( cacheName );
                    })
                );
            })
            // Take control of uncontrolled clients, essentially
            // putting service worker to work immediately rather
            // than at the next page load.
            .then( () => {
                return self.clients.claim();
            })
    );
});


self.addEventListener( 'fetch', event  => {
    event.respondWith(
        caches
            .match( event.request )
            .then( response => {
                // Already in cache.
                // No need to fetch request and place in cache
                if ( response ) return response;

                // Clone request.
                var fetchRequest = event.request.clone();

                return fetch( event.request )
                    .then( response => {
                        // Check that response is valid
                        if ( !response || response.status !== 200 || response.type !== 'basic' )
                            return response;

                        // Clone response
                        var responseToCache = response.clone();

                        caches
                            .open( CACHE_NAME )
                            .then( cache => {
                                cache.put( fetchRequest, responseToCache );
                            });

                        return response;
                    });
            })
    );
});