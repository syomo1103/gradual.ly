var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { SCORECARD_TOKEN: process.env.SCORECARD_TOKEN });
});

module.exports = router;
