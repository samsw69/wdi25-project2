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

// function newImageRoute(req, res) {
//   res.render('users/newImage');
// }

// function createImageRoute(req, res, next) {
//   if(req.file) req.body.filename = req.file.key;

  // For some reason multer's req.body doesn't behave like body-parser's
  // req.body = Object.assign({}, req.body);
  //
  // req.user.images.push(req.body);

  // req.user
  //   .save()
  //   .then(() => res.redirect('/user'))
  //   .catch((err) => {
  //     console.log(err);
  //     if(err.name === 'ValidationError') return res.badRequest('/user/images/new', err.toString());
  //     next(err);
  //   });


module.exports = {
  index: indexRoute,
  show: showRoute
  // newImage: newImageRoute,
  // createImage: createImageRoute
};
