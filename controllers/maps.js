// const Event = require('../models/event');


//this sets up the map**********


// how do I declare these at the end to use elsewhere in the app?******************

function googleMap {
  function getPosition(callback) {
  	// set up our geoCoder
  	const geocoder = new google.maps.Geocoder();
//
  	// get our postcode value
  	const postcode = document.getElementById("postcode").value;

  	//send value to google to get a longitude and latitude value
  	geocoder.geocode({'address': postcode}, function(results, status)
  	{
  	  // callback with a status and result
  	  if (status == google.maps.GeocoderStatus.OK)
  	  {
  	    // send the values back in a JSON string
  	    callback({
  	      latt: results[0].geometry.location.lat(),
  	      long: results[0].geometry.location.lng()
  	    });
  	  }
  	});
  }
  function setup_map(latitude, longitude) {
  	create a JSON object with the values to mark the position
  	const _position = { lat: latitude, lng: longitude};

  	// add our default mapOptions
  	const mapOptions = {
  	  zoom: 16,              // zoom level of the map - *;added*
  	  center: _position     // position to center
  	}

  	// load a map within the "map" div and display
  	const map = new google.maps.Map(document.getElementById('map'), mapOptions);

  	add a marker to the map with the position of the longitude and latitude
  	const marker = new google.maps.Marker({
  	  position: mapOptions.center,
  	  map: map
  	});
  }
  window.onload = function() {
  	// first setup the map, with our default location of London
  	setup_map(51.5073509, -0.12775829999998223);

  //this needs to be updated to get info from event create form
  	document.getElementById("form").onsubmit = function() {
  	  // when form is submitted, wait for a callback with the longitude and latitude values
  	  getPosition(function(position){

  	    // log the position returned
  	    const text = document.getElementById("text")
  	    text.innerHTML = "Marker position: { Longitude: "+position.long+ ",  Latitude:"+position.latt+" }";

  	    // update the map with the new position
  	    setup_map(position.latt, position.long);
  	  });
  	}
  }
}


module.exports = {

  deleteComment: deleteCommentRoute
};
