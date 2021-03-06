var body = document.querySelector( 'body' );
var content = document.querySelector( '.content' );
var sidebar = document.querySelector( '.sidebar' );




if ( history.pushState )
    body.addEventListener( 'click', event => {

        var target;
        var anchors;

        // Ignore click handler if ctrl/command clicked.
        if ( event.metaKey || event.ctrlKey ) return;

        // Try to get anchor element.
        if ( event.target.tagName == 'A' )
            target = event.target;
        else
            (( element = event.target ) => {
                while ( element.parentNode ) {
                    element = element.parentNode;
                    if ( element.tagName == 'A' )
                        return target = element;
                }
                return;
            })();

        // Don't bother with running rest of code if
        // element that was clicked is not even an anchor.
        if ( !target ) return;

        // Get all internal anchors on page.
        anchors = document.querySelectorAll( `a[href^="/"]` );


        // Going through each anchor that has an internal link.
        // If clicked link doesn't match, immediately skip.
        Array.from( anchors ).forEach( anchor => {
            if ( target != anchor ) return;

            event.preventDefault();
            target.blur();

            // Need to remove any current 'is-active' class from sidebar.
            var sidebarAnchor = document.querySelector( '.sidebar .is-active' );
            if ( sidebarAnchor ) sidebarAnchor.classList.remove( 'is-active' );

            // Add 'is-active' class to sidebar anchor that was clicked
            // (if it was clicked).
            if ( sidebar.contains( target ) )
                target.classList.add( 'is-active' );

            history.pushState( {}, null, target.href );
            fetchPage();
        } );

    } );




if ( history.pushState )
    window.addEventListener( 'popstate', event => {
        fetchPage();
    } );




function fetchPage() {

    const ANIMATION_DURATION = 300;

    var xhr = new XMLHttpRequest();
    var href = window.location.href;
    var data = {};

    var animationStart = Date.now();
    var animationLeft = ANIMATION_DURATION - ( Date.now() - animationStart );
    var hasFinishedAnimating = animationLeft <= 0;

    content.classList.add( 'is-loading' );

    xhr.open( 'GET', href, true );
    xhr.responseType = 'document';
    xhr.send();

    xhr.onload = ( res ) => {
        data.title = res.target.response.title;
        data.content = res.target.responseXML.querySelector( '.content' ).innerHTML;

        if ( hasFinishedAnimating )
            updateContent( data );
        else
            setTimeout( () => {
                updateContent( data );
            }, animationLeft );
    };

    xhr.onerror = ( res ) => {
        data.title = 'Error';
        data.content = `<p>Sorry, there was a problem while fetching page.</p>`;

        if ( hasFinishedAnimating )
            updateContent( data );
        else
            setTimeout( () => {
                updateContent( data );
            }, animationLeft );
    };

}




function updateContent( data ) {

    var event;

    if ( typeof( Event ) === 'function' )
        event = new Event( 'load' );
    else {
        event = document.createEvent( 'Event' );
        event.initEvent( 'load', true, false );
    }

    // Update title
    document.title = data.title;

    // Update content
    content.innerHTML = data.content;

    // Finalise page loading
    window.scrollTo( 0, 0 );
    window.dispatchEvent( event );
    content.classList.remove( 'is-loading' );

}