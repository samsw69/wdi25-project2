/* global google:ignore mapStyles:ignore */

$(() => {
  const $input = $('.autocomplete');
  const autocomplete = new google.maps.places.Autocomplete($input[0]);
  autocomplete.addListener('place_changed', () => {

    const $lat = $('input[name=lat]');
    const $lng = $('input[name=lng]');

    const place = autocomplete.getPlace();
    const location = place.geometry.location.toJSON();
    $lat.val(location.lat);
    $lng.val(location.lng);
  });

  const $map = $('#map');
  let map = null;
  let infowindow = null;
  if ($map.length) initMap();

  function initMap() {
    const latLng = { lat: $('#map').data('lat'), lng: $('#map').data('lng') };
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
    const latLng = { lat: location.lat, lng: location.lon };
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: '../assets/images/dot.svg'
    });

    marker.addListener('click', (locationName) => {
      markerClick(marker, location);
    });
  }

  function markerClick(marker, location) {
    if(infowindow) infowindow.close();

    const locationName = event.postcode;

    infowindow = new google.maps.InfoWindow({
      content: `
      <div class="infowindow">
        <h3>${event.address1}</h3>
        </div>
      `
    });

    infowindow.open(map, marker);
  }

});
