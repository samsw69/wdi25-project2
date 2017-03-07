const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
    // shuld this be createdBy?  How do I get all showing?
    .populate('users.username')
    .exec()
    .then((users) => res.render('users/index', { users }))
    .catch(next);
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('users.username')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return res.render('users/show', { user });
    })
    .catch(next);
}

function newImageRoute(req, res) {
  res.render('users/newImage');
}

function createImageRoute(req, res, next) {
  if(req.file) req.body.filename = req.file.key;

  // For some reason multer's req.body doesn't behave like body-parser's
  req.body = Object.assign({}, req.body);

  req.user.images.push(req.body);

  req.user
    .save()
    .then(() => res.redirect('/user'))
    .catch((err) => {
      console.log(err);
      if(err.name === 'ValidationError') return res.badRequest('/user/images/new', err.toString());
      next(err);
    });
}

// function deleteRoute(req, res, next) {
//   User
//     .findById(req.params.id)
//     .exec()
//     .then((user) => {
//       if(!user) return res.notFound();
//       return user.remove();
//     })
//     .then(() => res.redirect('/users'))
//     .catch(next);
// }

// function createCommentRoute(req, res, next) {
//
//   req.body.createdBy = req.user;
//
//   User
//   .findById(req.params.id)
//   .exec()
//   .then((event) => {
//     if(!event) return res.notFound();
//
//     event.comments.push(req.body); //create an embedded record
//     return event.save();
//   })
//   .then((event) => res.redirect(`/events/${event.id}`))
//   .catch(next);
// }
//
// function deleteCommentRoute(req, res, next) {
//   User
//   .findById(req.params.id)
//   .exec()
//   .then((event) => {
//     if(!event) return res.notFound();
//     //get embedded record by ID
//     const comment = event.comments.id(req.params.commentId);
//     comment.remove();
//
//     return event.save();
//   })
//   .then((event) => res.redirect(`/events/${event.id}`))
//   .catch(next);
// }
//if want to use this will need to add additional edit.ejs to the views/users folder
// function editRoute(req, res, next) {
//   User
//     .findById(req.params.id)
//     .exec()
//     .then((user) => {
//       if(req.user.id === event.createdBy.toString()) {
//         return res.render('users/edit', { user });
//       }
//     })
//     .catch(next);
// }




module.exports = {
  index: indexRoute,
  show: showRoute,
  // delete: deleteRoute
  newImage: newImageRoute,
  createImage: createImageRoute
};
