// Stylesheets
import '../styles/scss/main.scss';

// Javascript assets
// import './components/_analytics.js';
import './components/_async-page-load.js';
// import './components/_service-worker.js';
import './components/_vertical-rhythm.js';
import './components/_webfont.js';




var isCompliantBrowser = (
    'from' in Array
);

// TODO
// if ( !isCompliantBrowser )
//     loadPolyfill( './assets/javascript/polyfill-bundle.min.js', main );




function main( err ) {
    // Log error message if there is an error, then
    // (regardless) carry on with the rest of the code.
    if ( err ) console.error( err );
}


function loadPolyfill( src, done ) {
    var js = document.createElement( 'script' );
    js.src = src;

    js.onload = () => {
        done();
    };

    js.onerror = () => {
        var error = new Error( `Error: failed to load script ${src}` );
        done( error );
    };

    document.head.appendChild( js );
}