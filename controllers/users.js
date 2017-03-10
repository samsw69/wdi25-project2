const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
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
    .then((showUser) => {
      if(!showUser) return res.notFound();
      return res.render('users/show', { showUser }); // user is the person who's profile you are on
    })
    .catch(next);
}

function newImageRoute(req, res) {
  res.render('users/newImage');
}

function createImageRoute(req, res, next) {
  if(req.file) req.body.filename = req.file.key;

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

function deleteRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return user.remove();
    })
    .then(() => res.redirect('/'))
    .catch(next);
}

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  User
  .findById(req.params.id)
  .exec()
  .then((event) => {
    if(!event) return res.notFound();

    event.comment.push(req.body);
    return event.save();
  })
  .then((event) => res.redirect(`/events/${event.id}`))
  .catch(next);
}

function deleteCommentRoute(req, res, next) {
  User
  .findById(req.params.id)
  .exec()
  .then((event) => {
    if(!event) return res.notFound();
    const comment = event.comment.id(req.params.commentId);
    comment.remove();

    return event.save();
  })
  .then((event) => res.redirect(`/events/${event.id}`))
  .catch(next);
}

function editRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if( req.user.id === user.id ) {
        return res.render('users/edit', { user });
      } else {
        req.flash('alert', 'Not authorized');
        return res.redirect(`/users/${user.id}`);
      }
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      for(const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then(() => res.redirect(`/users/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/users/${req.params.id}/edit`, err.toString());
      next(err);
    });
}




module.exports = {
  index: indexRoute,
  show: showRoute,
  delete: deleteRoute,
  newImage: newImageRoute,
  createImage: createImageRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute,
  edit: editRoute,
  update: updateRoute
};
