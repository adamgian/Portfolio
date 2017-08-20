---
permalink: /service-worker.js
---




const CACHE_NAME = 'me.adamgian.www';
const PRECACHE = [
    '/',
    '/projects',
    '/project/adamgian',
    '/project/caboolturecountrymarkets',
    '/project/gravitas',
    '/assets/styles/main.min.css',
    '/assets/javascript/bundle.min.js'
].map( path => new Request( path, { credentials: 'include' } ) );




self.addEventListener( 'install', installHandler );
self.addEventListener( 'activate', activateHandler );
self.addEventListener( 'fetch', fetchHandler );




function installHandler( event ) {
    event.waitUntil(
        caches
            .open( CACHE_NAME )
            .then( cache => {
                return cache.addAll( PRECACHE );
            })
            .then( () => {
                self.skipWaiting();
            })
    );
}


function activateHandler( event ) {
    event.waitUntil(
        // Take control of uncontrolled clients, essentially
        // putting service worker to work immediately rather
        // than at the next page load.
        self.clients.claim()
    );
}


function fetchHandler( event ) {
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
}