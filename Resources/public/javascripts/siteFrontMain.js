$( function() {

    /* addClass first level fieldset */
    $( ".uForm > fieldset" ).each( function() {
        $( this ).addClass( "fieldsetWidth" );
    } );

    /* radio input with tab container */
    $( '.nestedGroup.tabGroup input' ).click( function( event ) {
        $( this ).tab( 'show' );
    } )

    /* placeholder */
    $( 'input, textarea' ).placeholder();

    /* checkbox, radio input */
    $( ".colorCheck input" ).change( function() {
        $( this ).next( "label" ).toggleClass( "iChecked", this.checked );
        return true;
    } );

    /* check/uncheck all checkbox */
    $( '#colorUnCheckAll' ).click( function( event ) {
        if ( this.checked ) {
            $( this ).next( "label" ).text( "Tout sélectionner" );
            $( this ).next( "label" ).addClass( "iChecked" );
            $( '.colorCheck input' ).each( function() {
                this.checked = false;
                $( this ).next( "label" ).removeClass( "iChecked" );
            } );
        } else {
            $( this ).next( "label" ).text( "Tout désélectionner" );
            $( this ).next( "label" ).removeClass( "iChecked" );
            $( '.colorCheck input' ).each( function() {
                this.checked = true;
                $( this ).next( "label" ).addClass( "iChecked" );
            } );
        }
    } );

    /* News Search Checkboxes - check/uncheck checkboxes group */
    $( '.topicList input' ).change( function() {
        var classTopic = $( this ).parent( "li" ).attr( 'class' );
        var classSubTopic = $( 'ul.' + classTopic + '' ).not( this );
        if ( this.checked ) {
            $( classSubTopic ).find( 'input' ).each( function() {
                this.checked = true;
                $( this ).next( "label" ).addClass( "iChecked" );
            } );
        } else {
            $( classSubTopic ).find( 'input' ).each( function() {
                this.checked = false;
                $( this ).next( "label" ).removeClass( "iChecked" );
            } );
        }
    } );
    $( '#newsSubTopics ul li input' ).click( function() {
        var classSubTopic = $( this ).closest( "ul" ).attr( 'class' ).split( " " )[3];
        var classTopic = $( '.topicList li.' + classSubTopic + '' ).not( this );
        var cnt = $( this ).closest( "ul" ).find( 'input:checked' ).length;
        if ( cnt == 0 ) {
            $( classTopic ).find( 'input' ).attr( 'checked', false );
            $( classTopic ).find( 'input' ).next( "label" ).removeClass( "iChecked" );
        }
        else {
            (classTopic).find( 'input' ).attr( 'checked', 'checked' );
            (classTopic).find( 'input' ).next( "label" ).addClass( "iChecked" );
        }

    } );

    /* tooltip */
    $( "#main .btnInfo" ).tooltip( {
        placement: 'top'
    } );

    /* multiselect or singleselect input */
    $( '.multiselect' ).multiselect();

    /* scroll pane */
    $( '.scrollPane' ).jScrollPane( {
        autoReinitialise: true,
        showArrows: true,
        arrowScrollOnHover: true,
        verticalDragMinHeight: 22,
        verticalDragMaxHeight: 22,
        horizontalDragMinWidth: 22,
        horizontalDragMaxWidth: 22
    } );

} );


$( document ).ready( function() {
    /* Infinite Ajax Scroll */
    var nbPage = null;
    if($('#nbPage').length){
        nbPage = $('#nbPage').val();
    }
    jQuery.ias( {
        container: '.listing',
        item: '.item',
        pagination: '#main .loadMore',
        next: '.next-items a',
        loader: '<img src="/bundles/cgfront/images/loader.gif"/>',
        triggerPageThreshold: 1,
        trigger: 'Voir plus de résultats',
        nbPage: nbPage
    } );
    /* Print */
    $( '.toolPrint button' ).click( function() {
        window.print();
        return false;
    } );
} );

/* goToByScroll */
function goToByScroll( id ) {
    $( 'html,body' ).animate( {scrollTop: $( "#" + id ).offset().top}, 'slow' );
}

/* siteMap accordion list */
$( function site_map() {
    //Rewrite tree
    $( ".siteMap > li" ).filter( ":has(>ul)" ).each( function() {
        var depth = $( this ).parents( "ul" ).length;
        var node = this.firstChild;
        this.removeChild( this.firstChild );
        var newNode = document.createElement( "div" );
        newNode.className = "expanded0" + depth;
        newNode.appendChild( node );
        $( this ).contents().not( "ul, strong" ).appendTo( newNode );
        $( this ).prepend( newNode );
    } );

    var click_button = $( ".siteMap > li > div" );
    $( click_button ).click( function( ev ) {
        if ( ev.target.tagName == "A" ) {
            return true;
        }
        if ( $( this ).siblings( ":visible" ).length != 0 ) {
            $( this ).siblings().slideUp( "normal", function() {
                $( this ).prev( click_button ).removeClass( "open" );
                $( this ).prev( click_button ).addClass( "closed" );
            } );
        }
        else {
            $( this ).siblings().slideDown( "normal", function() {
                $( this ).prev( click_button ).addClass( "open" );
                $( this ).prev( click_button ).removeClass( "closed" );
            } );
        }
        return false;
    } );

} );


/* Desktop or Mobile Script */
var isMobile = {
    Android: function() {
        var ua = navigator.userAgent;
        if ( ua.indexOf( "Android" ) >= 0 ) {
            var androidversion = parseFloat( ua.slice( ua.indexOf( "Android" ) + 8 ) );
            if ( androidversion > 4.0 ) {
                return navigator.userAgent.match( /Android/i );
            }
        }
    },
    BlackBerry: function() {
        return navigator.userAgent.match( /BlackBerry/i );
    },
    iOS: function() {
        return navigator.userAgent.match( /iPhone|iPad|iPod/i );
    },
    Opera: function() {
        return navigator.userAgent.match( /Opera Mini/i );
    },
    Windows: function() {
        return navigator.userAgent.match( /IEMobile/i );
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if ( isMobile.any() ) {
    // Mobile
} else {
    $( function() {

        /* singleselect input */
        $( '.singleselect' ).multiselect( {
            onChange: function( option, checked ) {
                var values = [];
                $( '#'+option.parent().attr('id')+' option' ).each( function() {
                    if ( $( this ).val() !== option.val() ) {
                        $( "input:radio" ).uniform();
                        values.push( $( this ).val() );
                    }
                } );
                $( '#'+option.parent().attr('id') ).multiselect( 'deselect', values );
            }
        } );

    } );
}

/* Tablet Script */
function appendScriptTablette() {
    var scriptTablette = document.createElement( 'script' );
    scriptTablette.type = 'text/javascript';
    scriptTablette.src = '../public/javascripts/bootstrap/bootstrap-tablet.js';
    document.getElementsByTagName( 'head' )[0].appendChild( scriptTablette );
}
if ( navigator.userAgent.indexOf( 'iPad' ) > 0 ) {
    appendScriptTablette();
}
else if ( navigator.userAgent.indexOf( 'Android' ) > 0 && matchMedia( '(min-width:768px)' ).matches ) {
    appendScriptTablette();
}
else if ( navigator.userAgent.indexOf( 'Tablet' ) > 0 && matchMedia( '(min-width:768px)' ).matches ) {
    appendScriptTablette();
}
