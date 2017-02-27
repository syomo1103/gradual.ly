var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET;

module.exports.createToken = function(user, res) {
  var token = jwt.sign(
    {user: user},
    SECRET,
    {expiresIn: '24h'}
  );
  res.set('Authorization', token);
  // return token, just in case caller wants to use it
  return token;
}

module.exports.verifyToken = function(req, res, next) {
  var token = req.body.token || req.query.token || req.get('Authorization');
  if (token) {
    // remove the 'Bearer ' if it was included in the token header
    token = token.replace('Bearer ', '');
    // check if token is valid and not expired
    jwt.verify(token, SECRET, function(err, decoded) {
      if (!err) {
        // valid token, so add user to req
        req.user = decoded.user;
        // add a new token to implement sliding expiration!
        module.exports.createToken(decoded.user, res);
        next();
      }
    });
  } else {
    next();
  }
}

