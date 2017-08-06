var body = document.querySelector( 'body' );
var content = document.querySelector( '.content' );
var sidebar = document.querySelector( '.sidebar' );
var siteUrl = `https://${ document.location.hostname || document.location.host }`;
var selector = `a[href^="/"], a[href^="${ siteUrl }"]`;




// Rather than explictly targeting each internal anchor and
// worrying about updating the nodelist after each ajax reload.
body.addEventListener( 'click', ( event ) => {

    var target;
    var anchors;

    // Ignore click handler if ctrl/command clicked.
    if ( event.metaKey || event.ctrlKey ) return;

    // Try to get anchor element.
    target = ( event.target.tagName == 'A' )
        && event.target
        || ( event.target.parentNode.tagName == 'A' )
        && event.target.parentNode;

    // Don't bother with running rest of code if
    // element that was clicked is not even an anchor.
    if ( !target ) return;

    anchors = document.querySelectorAll( selector );


    // Going through each anchor that has an internal link.
    Array.from( anchors ).forEach( anchor => {

        // If clicked link doesn't match, immediately skip.
        if ( target != anchor ) return;

        event.preventDefault();
        target.blur();

        // Need to remove any current 'is-active' class from sidebar.
        var sidebarAnchors = document.querySelectorAll( '.sidebar .is-active' );
        Array.from( sidebarAnchors ).forEach( sidebarAnchor => {
            sidebarAnchor.classList.remove( 'is-active' );
        } );

        // Add 'is-active' class to sidebar anchor if it was clicked.
        if ( sidebar.contains( target ) )
            target.classList.add( 'is-active' );

        history.pushState( { url: target.href }, null, target.href );
        getContent();

    } );

} );




function getContent() {
    var xhr = new XMLHttpRequest();
    xhr.open( 'GET', history.state.url, true );
    xhr.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
    xhr.responseType = 'document';
    xhr.send();

    xhr.onload = function( event ) {
        var res = event.target.responseXML;

        // Update page title
        document.title = event.target.response.title;
        // Update page content
        content.innerHTML = res.querySelector( '.content' ).innerHTML;
    };

}