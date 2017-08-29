---
permalink: /service-worker.js
---




const CACHE_NAME = 'me.adamgian.www';
const PRECACHE = [
    '/about',
    '/projects',
    '/project/adamgian',
    '/project/caboolturecountrymarkets',
    '/project/gravitas',
];




self.addEventListener( 'install', installHandler );
self.addEventListener( 'activate', activateHandler );
self.addEventListener( 'fetch', fetchHandler );




function installHandler( event ) {
    console.log( 'Installing service worker' );

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
    console.log( 'Activating handler' );

    event.waitUntil(
        // Take control of uncontrolled clients, essentially
        // putting service worker to work immediately rather
        // than at the next page load.
        self.clients.claim()
    );
}


function fetchHandler( event ) {
    console.log( 'Fetch handler' );

    event.respondWith(
        caches
            .match( event.request )
            .then( response => {
                console.log( 'Fetching request via service worker' );
                console.log( event );
                console.log( response );

                // Already in cache.
                // No need to fetch request and place in cache
                if ( response ) return response;

                // Clone request.
                var fetchRequest = event.request.clone();

                return fetch( event.request )
                    .then( response => {

                        // Check that response is valid:
                        //   - reponse exists
                        //   - same origin
                        //   - succesful response
                        if ( !response || response.type !== 'basic' || response.status !== 200 )
                            return response;

                        console.log( 'Fetching new request via service worker' );
                        console.log( response );

                        // Clone response
                        var responseToCache = response.clone();

                        // Put previously uncached item into cache.
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