'use strict';

/* global google:ignore mapStyles:ignore */

$(function () {
  var $input = $('.autocomplete');
  var autocomplete = new google.maps.places.Autocomplete($input[0]);
  autocomplete.addListener('place_changed', function () {

    var $lat = $('input[name=lat]');
    var $lng = $('input[name=lng]');

    var place = autocomplete.getPlace();
    var location = place.geometry.location.toJSON();
    $lat.val(location.lat);
    $lng.val(location.lng);
  });

  var $map = $('#map');
  var map = null;
  var infowindow = null;
  if ($map.length) initMap();

  function initMap() {
    var latLng = { lat: $('#map').data('lat'), lng: $('#map').data('lng') };
    map = new google.maps.Map($map.get(0), {
      zoom: 14,
      center: latLng,
      scrollwheel: false,
      styles: mapStyles
    });

    new google.maps.Marker({
      position: latLng,
      map: map,
      icon: '../assets/images/dot.svg'
    });
  }

  function addMarker(location) {
    var latLng = { lat: location.lat, lng: location.lon };
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: '../assets/images/dot.svg'
    });

    marker.addListener('click', function (locationName) {
      markerClick(marker, location);
    });
  }

  function markerClick(marker, location) {
    if (infowindow) infowindow.close();

    var locationName = event.postcode;

    infowindow = new google.maps.InfoWindow({
      content: '\n      <div class="infowindow">\n        <h3>' + event.address1 + '</h3>\n        </div>\n      '
    });

    infowindow.open(map, marker);
  }
});