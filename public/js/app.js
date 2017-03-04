/* global google:ignore mapStyles:ignore */

// $(() => {
//
//   // Store the #map div, and make it available to all functions
//   const $map = $('#map');
//   // Set a map variable that will hold our Google map, and is available to all functions
//   let map = null;
//   // Set infowindow as null to begin with, and make it available to all functions
//   let infowindow = null;
//   // If there is a #map div on the page, then initialise the Google map
//   if ($map.length) initMap();
//
//   function initMap() {
//     const latLng = { lat: 51.515113, lng: -0.072051 };
//     map = new google.maps.Map($map.get(0), {
//       zoom: 14,
//       center: latLng,
//       scrollwheel: false,
//       // Map styles are stored in another .js file - which is required above the app.js and is available inside this file
//       styles: mapStyles
//     });
//
// // Finally, open the new InfoWindow
//     infowindow.open(map, marker);
//
//
// //check the above as new option to trial
"use strict";