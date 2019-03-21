const TRACKING_ID = 'UA-34531724-2';


window.ga = window.ga || function() {
    ( ga.q = ga.q || [] )
        .push( arguments );
};

ga.l = +new Date;


ga('create', TRACKING_ID, 'auto');
ga('send', 'pageview');