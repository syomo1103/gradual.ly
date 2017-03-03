var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/users');
var schoolCtrl = require('../controllers/schools');

// Public routes (no auth required)
router.post('/users/login', userCtrl.login);
router.get('/users/logout', userCtrl.logout);
router.post('/users', userCtrl.create);
router.get('/users/me', userCtrl.me);
router.get('/schools/:schoolId', schoolCtrl.getSchool);
router.post('/schools', schoolCtrl.addSchooltoDB);

// router.post('/schoolId', schoolCtrl.addSchooltoDb);

// Auth middleware (routes below need authentication)
router.use(function(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'not authenticated'});
});

// Protected routes (authentication required)
router.post('/schools/:schoolId/posts', schoolCtrl.addPost);
router.delete('/posts/:postId', schoolCtrl.deletePost);
router.post('/schools/:schoolId/fav', schoolCtrl.favSchool);
router.delete('/schools/:schoolId/fav', schoolCtrl.unFavSchool);
router.get('/favorites', schoolCtrl.favsForUser);
// router.get('/todos', todoCtrl.getAllTodos);
// router.post('/todos', todoCtrl.createPost);
// router.delete('/todos/:id', todoCtrl.deletePost);


module.exports = router;
