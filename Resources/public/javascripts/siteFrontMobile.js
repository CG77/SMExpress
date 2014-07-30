var wi = $( window ).width();

$( window ).ready( function() {
    var wi = $( window ).width();

    $( function mobile_mainnav() {
        if ( wi < 611 ) {
            $( "#summary ul li a " ).removeAttr( "data-target" );
            $( "#summary ul li a " ).removeAttr( "role" );
            $( "#summary ul li a " ).removeAttr( "data-toggle" );

            var click_button = $( "#mainNav h2,#mainNav button,#surfingTools label" );
            $( click_button ).click( function() {
                if ( $( this ).next( "#header .tab:visible" ).length != 0 ) {
                    $( this ).next( "#header .tab" ).slideUp( "normal", function() {
                        $( this ).prev( click_button ).removeClass( "open" );
                        $( this ).prev( click_button ).addClass( "closed" );
                        $( this ).parentsUntil( $( "#header .wrapper" ) ).removeClass( "open" );
                        $( this ).parentsUntil( $( "#header .wrapper" ) ).addClass( "closed" );
                    } );
                }
                else {
                    $( "#header .tab" ).slideUp( "normal", function() {
                        $( this ).prev( click_button ).removeClass( "open" );
                        $( this ).prev( click_button ).addClass( "closed" );
                        $( this ).parentsUntil( $( "#header .wrapper" ) ).removeClass( "open" );
                        $( this ).parentsUntil( $( "#header .wrapper" ) ).addClass( "closed" );
                    } );
                    $( this ).next( "#header .tab" ).slideDown( "normal", function() {
                        $( this ).prev( click_button ).addClass( "open" );
                        $( this ).prev( click_button ).removeClass( "closed" );
                        $( this ).parentsUntil( $( "#header .wrapper" ) ).addClass( "open" );
                        $( this ).parentsUntil( $( "#header .wrapper" ) ).removeClass( "closed" );
                    } );
                }
                return false;
            } );
        }

    } );

    $( function mobile_footer() {
        if ( wi < 611 ) {
            var click_button = $( "#footer .upperSection .wrapper ul li h3" );
            $( click_button ).click( function() {
                if ( $( this ).next( "#footer .upperSection .wrapper ul li ul:visible" ).length != 0 ) {
                    $( this ).next( "#footer .upperSection .wrapper ul li ul" ).slideUp( "normal", function() {
                        $( this ).prev( click_button ).removeClass( "open" );
                        $( this ).prev( click_button ).addClass( "closed" );
                    } );
                }
                else {
                    $( this ).next( "#footer .upperSection .wrapper ul li ul" ).slideDown( "normal", function() {
                        $( this ).prev( click_button ).addClass( "open" );
                        $( this ).prev( click_button ).removeClass( "closed" );
                    } );
                }
                return false;
            } );
        }

    } );

    $( function mobile_accordion_summary() {
        if ( wi < 611 ) {
            var click_button = $( ".summaryUnit .click" );
            $( click_button ).click( function() {
                if ( $( ".summaryUnit .tab > li + li:visible" ).length != 0 ) {
                    $( ".summaryUnit .tab > li + li" ).slideUp( "normal", function() {
                        $( ".summaryUnit > div" ).removeClass( "open" );
                        $( ".summaryUnit > div" ).addClass( "closed" );
                    } );
                }
                else {
                    $( ".summaryUnit .tab > li + li" ).slideDown( "normal", function() {
                        $( ".summaryUnit > div" ).addClass( "open" );
                        $( ".summaryUnit > div" ).removeClass( "closed" );
                    } );
                }
                return false;
            } );
        }

    } );

    $( function mobile_service() {
        if ( wi < 611 ) {
            var click_button = $( ".bodyServices .serviceUnit h2" );
            $( click_button ).append( '<span></span>' );
            $( click_button ).click( function() {
                if ( $( this ).next( "ul:visible" ).length != 0 ) {
                    $( this ).next( ".bodyServices .serviceUnit ul" ).slideUp( "normal", function() {
                        $( this ).prev( click_button ).removeClass( "open" );
                        $( this ).prev( click_button ).addClass( "closed" );
                    } );
                }
                else {
                    $( this ).next( "ul" ).slideDown( "normal", function() {
                        $( this ).prev( click_button ).addClass( "open" );
                        $( this ).prev( click_button ).removeClass( "closed" );
                    } );
                }
                return false;
            } );
        }

    } );

} );

