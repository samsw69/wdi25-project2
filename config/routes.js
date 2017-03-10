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
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

router.route('/users/:id/edit')
  .get(users.edit);

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
.post(events.createComment);

router.route('/events/:id/comments/:commentId')
.delete(events.deleteComment);

router.all('*', (req, res) => res.notFound());
module.exports = router;
