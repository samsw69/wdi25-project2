const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const events = require('../controllers/events');
const users = require('../controllers/users');
const oauth = require('../controllers/oauth');
const upload = require('../lib/upload');


router.get('/', (req, res) => res.render('statics/index'));

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .post(secureRoute, users.edit)
  .delete(secureRoute, users.delete);


// **HENS INDEX - new addition to show new image for user / is this profile pic or an image upload - may need for admin to upload pics for app
// router.route('/user/images/new')
//   .get(secureRoute, users.profileImage);

//new add from instagram app
// router.route('/user/images')
//   .post(secureRoute, upload.single('filename'), users.createImage);

router.route('/register')
  .get(registrations.new)
  .post(upload.single('profileImage'), registrations.create);

router.route('/login')
    .get(sessions.new)
    .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/oauth/facebook')
      .get(oauth.facebook);

router.route('/events')
  .get(events.index)
  .post(secureRoute, events.create);

router.route('/events/new')
  .get(secureRoute, events.new);

router.route('/events/:id')
  .get(secureRoute, events.show)
  .put(secureRoute, events.update)
  .delete(secureRoute, events.delete);

router.route('/events/:id/edit')
  .get(secureRoute, events.edit);

router.route('/events/:id/comments')
.post(secureRoute, events.createComment);

router.route('/events/:id/comments/:commentId')
.delete(secureRoute, events.deleteComment);



router.all('*', (req, res) => res.notFound());
module.exports = router;
