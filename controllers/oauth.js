const rp = require('request-promise');
const oauth = require('../config/oauth');
const User = require('../models/user');

function facebook(req, res, next) {
  console.log(req.query);
  return rp({
    method: 'GET',
    url: oauth.facebook.accessTokenURL,
    qs: {
      client_id: oauth.facebook.clientId,
      redirect_uri: oauth.facebook.redirectUri,
      client_secret: oauth.facebook.clientSecret,
      code: req.query.code
    },
    json: true
  })

 .then((token) => {

   return rp.get({
     url: 'https://graph.facebook.com/v2.5/me?fields=id,name,email,picture.height(961)',
     qs: token,
     json: true
   });
 })
 .then((profile) => {
   console.log(profile);
   return User.findOne({$or: [{ email: profile.email }, { facebookId: profile.id }]})
     .then((user) => {
       if(!user) {
         user = new User({
           username: profile.name,
           email: profile.email
         });
       }

       user.facebookId = profile.id;
       user.profileImage = profile.picture.data.url;
       return user.save();
     });
 })
 .then((user) => {
   req.session.userId = user.id;
   req.session.isAuthenticated = true;

   if (!user.firstName || !user.lastName || !user.email || !user.knowHen || !user.funnyStory) {
     return res.redirect(`/users/${user.id}/edit`);
   }

   req.flash('info', `welcome back ${user.username}!`);
   res.redirect('/');
 })
 .catch(next);
}

module.exports = { facebook };
