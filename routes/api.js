var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/users');

// Public routes (no auth required)
router.post('/users/login', userCtrl.login);
router.get('/users/logout', userCtrl.logout);
router.post('/users', userCtrl.create);
router.get('/users/me', userCtrl.me);

// Auth middleware (routes below need authentication)
router.use(function(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'not authenticated'});
});

// Protected routes (authentication required)
// router.get('/todos', todoCtrl.getAllTodos);
// router.post('/todos', todoCtrl.createTodo);
// router.delete('/todos/:id', todoCtrl.deleteTodo);

module.exports = router;
