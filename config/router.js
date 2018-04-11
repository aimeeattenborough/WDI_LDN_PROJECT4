const router = require('express').Router();
const secureRoute = require('../lib/secureRoute');
const images = require('../controllers/images');
const users = require('../controllers/users');
const auth = require('../controllers/auth');


// REGISTRATION AND LOGIN requests - uses auth controller to register and find the user in the database
router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

// IMAGES
router.route('/images')
  .get(images.index)
  .post(secureRoute, images.create); //sr

router.route('/images/:id')
  .get(images.show)
  .put(images.update) //sr
  .delete(images.delete); //sr

// IMAGE COMMENTS
router.route('/images/:id/comments')
  .post(secureRoute, images.commentsCreate); //sr

router.route('/images/:id/comments/:commentId')
  .delete(images.commentsDelete); //sr

// LIKING AND UNLIKING
router.route('/images/:id/likes')
  .post(secureRoute, images.likesCreate) //sr
  .delete(secureRoute, images.likesDelete); //sr

// USERS - PROFILES
router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update); //sR?

// USERS LIKES
// router.route('/users/:id/likes')
//   .get(users.likes)
//

// To add - Show route for users, dislikes, follows/following

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
