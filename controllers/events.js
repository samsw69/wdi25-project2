const Event = require('../models/event');

function indexRoute(req, res, next) {
  Event
    .find()
    .populate('createdBy')
    .exec()
    .then((events) => res.render('events/index', { events }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('events/new');
}

function createRoute(req, res, next) {

  req.body.createdBy = req.user;

  Event
    .create(req.body)
    .then(() => res.redirect('/events'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/events/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Event
    .findById(req.params.id)
    .populate('comments.createdBy')
    .exec()
    .then((event) => {
      if(!event) return res.notFound();
      return res.render('events/show', { event });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(req.user.id === event.createdBy.toString()) {
        return res.render('events/edit', { event });
      }
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.notFound();

      for(const field in req.body) {
        event[field] = req.body[field];
      }

      return event.save();
    })
    .then(() => res.redirect(`/events/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/events/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.notFound();
      return event.remove();
    })
    .then(() => res.redirect('/events'))
    .catch(next);
}

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Event
  .findById(req.params.id)
  .exec()
  .then((event) => {
    if(!event) return res.notFound();

    event.comments.push(req.body); //create an embedded record
    return event.save();
  })
  .then((event) => res.redirect(`/events/${event.id}`))
  .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Event
  .findById(req.params.id)
  .exec()
  .then((event) => {
    if(!event) return res.notFound();
    //get embedded record by ID
    const comment = event.comments.id(req.params.commentId);
    comment.remove();

    return event.save();
  })
  .then((event) => res.redirect(`/events/${event.id}`))
  .catch(next);
}

//this sets up the map**********

// ********** -
// should this go here?
// and if so how do I declare these at the end to use elsewhere in the app?******************

// function googleMap {
//   function getPosition(callback) {
//   	// set up our geoCoder
//   	const geocoder = new google.maps.Geocoder();
//
//   	// get our postcode value
//   	const postcode = document.getElementById("postcode").value;
//
//   	//send value to google to get a longitude and latitude value
//   	geocoder.geocode({'address': postcode}, function(results, status)
//   	{
//   	  // callback with a status and result
//   	  if (status == google.maps.GeocoderStatus.OK)
//   	  {
//   	    // send the values back in a JSON string
//   	    callback({
//   	      latt: results[0].geometry.location.lat(),
//   	      long: results[0].geometry.location.lng()
//   	    });
//   	  }
//   	});
//   }
//   function setup_map(latitude, longitude) {
//   	// create a JSON object with the values to mark the position
//   	const _position = { lat: latitude, lng: longitude};
//
//   	// add our default mapOptions
//   	const mapOptions = {
//   	  zoom: 16,              // zoom level of the map - *;added*
//   	  center: _position     // position to center
//   	}
//
//   	// load a map within the "map" div and display
//   	const map = new google.maps.Map(document.getElementById('map'), mapOptions);
//
//   	// add a marker to the map with the position of the longitude and latitude
//   	const marker = new google.maps.Marker({
//   	  position: mapOptions.center,
//   	  map: map
//   	});
//   }
//   window.onload = function() {
//   	// first setup the map, with our default location of London
//   	setup_map(51.5073509, -0.12775829999998223);
//
//   //this needs to be updated to get info from event create form
//   	document.getElementById("form").onsubmit = function() {
//   	  // when form is submitted, wait for a callback with the longitude and latitude values
//   	  getPosition(function(position){
//
//   	    // log the position returned
//   	    const text = document.getElementById("text")
//   	    text.innerHTML = "Marker position: { Longitude: "+position.long+ ",  Latitude:"+position.latt+" }";
//
//   	    // update the map with the new position
//   	    setup_map(position.latt, position.long);
//   	  });
//   	}
//   }
// }


module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
