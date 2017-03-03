  const User = require('../models/user');

  function authentication(req, res, next) {
    //check to see if user is logged in
    //if not exit this piece of middleware
    if(!req.session.isAuthenticated) return next();


    //find user based on user ID in the session
    User
      .findById(req.session.userId)
      .then((user) => {
        if(!user) {
          //if user cannot be found logout the user (edge case)
          return req.session.regenerate(() => res.unauthorized());
        }

        //set userID back on session
        req.session.userId = user.id;

        //set whole user object to the request object
        //so we can use the users details in our controller
        req.user = user;

        //set the whole user object to res.locals so we can use it in the views
        res.locals.user = user;

        //set an isAuthenticated boolan so we can show and hide button and links
        res.locals.isAuthenticated = true;

        //we're done - move on to next piece of middleware
        next();
      })
      .catch(next);// handle any errors with our global error catcher
  }

  module.exports = authentication;
