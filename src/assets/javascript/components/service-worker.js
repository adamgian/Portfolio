---
permalink: /service-worker.js
---




const CACHE_NAME = 'me.adamgian.www@{{ site.time | date: "%y%m%d" }}';
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
    var expectedCaches = [ CACHE_NAME ];

    event.waitUntil(
        caches
            .keys()
            // Removing old cache versions
            .then( cacheNames => {
                return Promise.all(
                    cacheNames.map( cacheName => {
                        if ( !expectedCaches.includes( cacheName ) )
                            return caches.delete( cacheName );
                    })
                )
            })
            // Take control of uncontrolled clients, essentially
            // putting service worker to work immediately rather
            // than at the next page load.
            .then( () => {
                self.clients.claim()
            })
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

                        console.log( event.request );

                        // Check that response is valid:
                        //   - reponse exists
                        //   - succesful response
                        if ( !response || response.status !== 200 )
                            return response;

                        // Intercept
                        var isInternalRequest = /(http|https):\/\/{{ site.apex }}/.test( event.request.url );
                        if ( !isInternalRequest ) return response;

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