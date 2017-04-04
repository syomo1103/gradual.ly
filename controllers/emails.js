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
  console.log(req.body.data);
  console.log(req.body.data.length);
  for (var i = 0; i < req.body.data.length; i++) {
    var mailOptions = {
      from: process.env.EMAILSERVICEUSER,
      // bcc: req.body.data.emails,
      to: req.body.data[i].email,
      subject: 'New Post: ' + req.body.data[i].school.name,
      html: 'Hi ' + req.body.data[i].name + ',<br><br>A new post has been added to <b>' + req.body.data[i].school.name + '</b>.<br><br>Log into your account at gradually.herokuapp.com to stay informed!<br><br><br>Much love, <br>Team Gradually'
    };
      // text: 'Hey ' + req.body.data.names + ' Log into your account for more info.'
      transporter.sendMail(mailOptions, function(err, info) {
        if(err) {
          res.status(500).json(err);
        } else {
          res.json(info);
        }
      });
    };
}
