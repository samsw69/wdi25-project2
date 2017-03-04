// const rp = require('request-promise');
// const config = require('../config/oauth');
// const User = require('../models/user');
//
// function facebook(req, res, next) {
//   return rp({
//     method: 'POST',
//     url: config.facebook.accessTokenURL,
//     qs: {
//       client_id: config.facebook.clientId,
//       client_secret: config.facebookId.clientSecret,
//       code: req.query.code
//     },
//     json: true
//   })
//   .then((token) => {
//     return rp({
//       method: 'GET',
//       url: config.facebookId.profileURL,
//       qs: token,
//       json: true,
//       headers: {
//         'User-Agent': 'Request-Promise'
//       }
//     });
//   })
//   .then((profile) => {
//     return User
//       .findOne({ $or: [{ email: profile.email }, { facebookId: profile.id }] })
//       .then((user) => {
//         if(!user) {
//           user = new User({
//             username: profile.login,
//             email: profile.email
//           });
//         }
//
//         user.facebookId = profile.id;
//         user.profileImage = profile.avatar_url;
//         return user.save();
//       });
//   })
//   .then((user) => {
//     req.session.userId = user.id;
//     req.session.isAuthenticated = true;
//
//     req.flash('info', `Welcome back, ${user.username}!`);
//     res.redirect('/user');
//   })
//   .catch(next);
// }
//
// module.exports = { facebookId };
