var nodemailer = require('nodemailer');

module.exports = {
  sendMail
};

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAILSERVICEUSER,
    pass: process.env.EMAILSERVICEPASS
  }
});

function sendMail(req, res, next) {
  for (var i = 0; i < req.body.data.length; i++) {
    var mailOptions = {
      from: process.env.EMAILSERVICEUSER,
      to: req.body.data[i].email,
      subject: 'New Post: ' + req.body.data[i].school.name,
      html: 'Hi ' + req.body.data[i].name + ',<br><br>A new post has been added to <b>' + req.body.data[i].school.name + '</b>.<br><br>Log into your account at gradually.herokuapp.com to stay informed!<br><br><br>Much love, <br>Team Gradually'
    };
      transporter.sendMail(mailOptions, function(err, info) {
        if(err) {
          res.status(500).json(err);
        } else {
          res.json(info);
        }
      });
    };
}
