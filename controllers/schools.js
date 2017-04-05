var School = require('../models/school');
var User = require('../models/user');

var SECRET = process.env.SECRET;

module.exports = {
  getSchool,
  addSchooltoDB,
  addPost,
  deletePost,
  favSchool,
  favsForUser,
  unFavSchool,
  postsForUser
};

function getSchool(req, res, next) {
  School.findOne({schoolId: req.params.schoolId}, function(err, school){
    if (school) {
      res.status(200).json(school);
    } else {
      res.status(400).json({err: 'School not found'});
    }
  });
}

function addSchooltoDB(req, res, next) {
  School.create(req.body).then(function(s){
    res.status(201).json(s);
  });
}

function addPost(req, res, next) {
  School.findOne({schoolId: req.params.schoolId}, function(err, school){
    if (school) {
      req.body.data.poster = req.user._id;
      school.posts.push(req.body.data);
      school.save(function(err, school) {
        res.status(200).json(school);
      });
    }
  });
}

function deletePost(req, res, next) {
  School.findOne({'posts._id': req.params.postId}, function(err, school) {
    if (school) {
      school.posts.remove(req.params.postId);
    };
    school.save(function(err, school) {
      res.status(200).json(school);
    });
  });
}

function favSchool(req, res, next) {
  School.findById(req.params.schoolId, function(err, school) {
    if (!school.favoritedBy.some(userId => userId.equals(req.user._id))) {
      school.favoritedBy.push(req.user._id);
      school.save(function(err) {
        res.status(200).json(school);
      });
    } else {
      res.status(200).json(school);
    }
  });
}

function unFavSchool(req, res, next) {
  School.findById(req.params.schoolId, function(err, school) {
    school.favoritedBy.remove(req.user._id);
    school.save(function(err) {
      res.status(200).json(school);
    });
  })
}

function favsForUser(req, res, next) {
  School.find({favoritedBy: req.user._id}, function(err, schools) {
    res.status(200).json(schools);
  });
}

function postsForUser(req, res, next) {
  School.find({'posts.poster': req.user._id}, function(err, schools) {
    console.log(schools);
    res.status(200).json(schools);
  });
}

