/* Google maps v3 */
function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng( 48.540556, 2.66 ),
    };

    var map = new google.maps.Map( document.getElementById( 'map-canvas' ),
        mapOptions );

    var imageBlueDark = '../public/images/pic-map-marker-blue-dark.png';
    var imageBlue = '../public/images/pic-map-marker-blue.png';
    var imageGreenDark = '../public/images/pic-map-marker-green-dark.png';
    var imageGreen = '../public/images/pic-map-marker-green.png';
    var imageOrangeDark = '../public/images/pic-map-marker-orange-dark.png';
    var imageOrange = '../public/images/pic-map-marker-orange.png';
    var imageBluePurple = '../public/images/pic-map-marker-blue-purple.png';
    var imagePurpleDark = '../public/images/pic-map-marker-purple-dark.png';
    var imagePurple = '../public/images/pic-map-marker-purple.png';
    var imageMagenta = '../public/images/pic-map-marker-magenta.png';
    var imageRedDark = '../public/images/pic-map-marker-red-dark.png';
    var imageYellowGreen = '../public/images/pic-map-marker-yellow-green.png';

    //  Lignes ci-dessus - A ne pas reprendre : variables pour illustrer les marqueurs affiches sur la carte dans la maquette html
    var myLatLng01 = new google.maps.LatLng( 48.540556, 2.66 );
    var blueDarkMarker = new google.maps.Marker( {
        position: myLatLng01,
        map: map,
        icon: imageBlueDark
    } );
    var myLatLng02 = new google.maps.LatLng( 48.240556, 2.56 );
    var blueMarker = new google.maps.Marker( {
        position: myLatLng02,
        map: map,
        icon: imageBlue
    } );
    var myLatLng03 = new google.maps.LatLng( 48.540556, 2.16 );
    var greenDarkMarker = new google.maps.Marker( {
        position: myLatLng03,
        map: map,
        icon: imageGreenDark
    } );
    var myLatLng04 = new google.maps.LatLng( 48.340556, 2.06 );
    var greenMarker = new google.maps.Marker( {
        position: myLatLng04,
        map: map,
        icon: imageGreen
    } );
    var myLatLng05 = new google.maps.LatLng( 48.340556, 2.36 );
    var orangeMarker = new google.maps.Marker( {
        position: myLatLng05,
        map: map,
        icon: imageOrange
    } );
    var myLatLng06 = new google.maps.LatLng( 48.140556, 2.06 );
    var bluePurpleMarker = new google.maps.Marker( {
        position: myLatLng06,
        map: map,
        icon: imageBluePurple
    } );
    var myLatLng07 = new google.maps.LatLng( 48.240556, 2.76 );
    var purpleMarker = new google.maps.Marker( {
        position: myLatLng07,
        map: map,
        icon: imagePurple
    } );
    var myLatLng08 = new google.maps.LatLng( 48.140556, 2.96 );
    var magentaMarker = new google.maps.Marker( {
        position: myLatLng08,
        map: map,
        icon: imageMagenta
    } );
    var myLatLng09 = new google.maps.LatLng( 48.140556, 2.36 );
    var redDarkMarker = new google.maps.Marker( {
        position: myLatLng09,
        map: map,
        icon: imageRedDark
    } );
    var myLatLng10 = new google.maps.LatLng( 48.240556, 2.16 );
    var orangeDarkMarker = new google.maps.Marker( {
        position: myLatLng10,
        map: map,
        icon: imageOrangeDark
    } );
    var myLatLng11 = new google.maps.LatLng( 48.440556, 2.76 );
    var purpleDarkMarker = new google.maps.Marker( {
        position: myLatLng11,
        map: map,
        icon: imagePurpleDark
    } );
    var myLatLng12 = new google.maps.LatLng( 48.040556, 2.26 );
    var purpleDarkMarker = new google.maps.Marker( {
        position: myLatLng12,
        map: map,
        icon: imageYellowGreen
    } );
}

function loadScript() {
    var script = document.createElement( 'script' );
    script.type = 'text/javascript';
    script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
        'callback=initialize';
    if ( document.getElementById( 'map-canvas' ) ) {
        document.body.appendChild( script );
    }
}

window.onload = loadScript;

