var root = document.querySelector( 'html' );
var media;
var baseline;
var resizeTimeout;

window.addEventListener( 'load', setMediaHeight );
window.addEventListener( 'resize', resizeHandler );




function resizeHandler() {
    if ( !resizeTimeout ) {
        resizeTimeout = setTimeout( function() {
            resizeTimeout = null;
            setMediaHeight();
        }, 100 );
    }
}




function setMediaHeight() {

    media = document.querySelectorAll( '.media' );
    baseline = window.getComputedStyle( root ).getPropertyValue( 'line-height' );
    baseline = parseFloat( baseline, 10 );

    Array.from( media ).forEach( item => {
        var height = item.offsetWidth * 0.6666;
        var multiplier = Math.floor( height / baseline );

        item.style.paddingBottom = `${ baseline * multiplier }px`;
    } );

}