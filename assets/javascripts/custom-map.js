// get the element to animate
var $element = $('.map-canvas');

// create global map variables
var map;
var marker;

// Main init function
function initMap() {

    // Set the latitude and longitude
    var latLong = new google.maps.LatLng(52.1590192, 5.964137299999948);

    // Get the html DOM element containing the map canvas
    var mapElement = document.getElementById('map-canvas');

    // Basic options for a simple Google Map
    var mapOptions = {

        // How zoomed in you want the map to start at (always required)
        zoom: 15,
        scrollwheel: false,
        draggable: true,
        zoomControl: false,
        streetViewControl: false,
        center: latLong,

        // Styling the map
        styles: [{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"},{"gamma":"1.82"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"gamma":"1.96"},{"lightness":"-9"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"lightness":"25"},{"gamma":"1.00"},{"saturation":"-100"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffaa00"},{"saturation":"-43"},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"},{"hue":"#ffaa00"},{"saturation":"-70"}]},{"featureType":"road.highway.controlled_access","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"on"},{"saturation":"-100"},{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"saturation":"-100"},{"lightness":"40"},{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"gamma":"0.80"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"off"}]}]
    
    };

    // Create the Google Map using out element and defined options
    map = new google.maps.Map(mapElement, mapOptions);

    // The content within the info window 
    var contentString = 
        '<div class="maps-info">'+
            '<h2 class="maps-info__title">Lin Wah</h2>'+
            '<div class="maps-info__content">'+
                '<p><b>Dagelijks</b>, zijn wij open van </br>' +
                '12:00 tot 22:00 uur. </p>'+
                '<p>Dorpstraat 44 in Beekbergen </p>'+
                '<p><a href="tel:0555061818">Tel: (055) 506 18 18 </a></p>'+
            '</div>'+
        '</div>';

    // Set some options for the info window
    var infowindow = new google.maps.InfoWindow({

      content: contentString,
      maxWidth: 200

    });

    // Set marker
    var marker = new google.maps.Marker({

        position: latLong,
        map: map,
        title:"Lin Wah",
        animation: google.maps.Animation.DROP,
        position: {
            lat: 52.1590192, 
            lng: 5.964137299999948
        },
        icon: {
            path: fontawesome.markers.MAP_MARKER,
            scale: 1,
            strokeWeight: 0.2,
            strokeColor: '#C43540', 
            strokeOpacity: 1,
            fillColor: '#C43540',
            fillOpacity: 1
        }
        
    }); 

    // on click listener for opening the info window
    marker.addListener('click', function() {

        infowindow.open(map, marker);

    });

    // open infowindow by default 
    infowindow.open(map, marker);

}

// create the google maps only if page contains the element
if ($element.length) {

    // When the window has finished loading, create the google maps
    google.maps.event.addDomListener(window, 'load', initMap);

}

// On window resize make sure to always center the location
google.maps.event.addDomListener(window, 'resize', function() {

    var center = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);

});