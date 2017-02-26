var mongoose = require('mongoose');
mongoose.Promise = Promise;

var db = mongoose.connect(process.env.DATABASE_URL);
var con = db.connection;

con.on('open', function() {
  console.log(`Connected to database ${con.name} at ${con.host}:${con.port}`);
});
