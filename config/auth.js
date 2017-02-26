var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
  var token = req.body.token || req.query.token || req.get('Authorization');
  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, SECRET, function(err, decoded) {
      if (!err) {
        req.user = decoded.user;

        var token = jwt.sign({
           user: req.user
          }, SECRET, {expiresIn: '24h'});

        res.set('Authorization', token);
        next();
      }
    });
  } else {
    next();
  }
}
