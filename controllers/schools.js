// var User = require('../models/user');
var School = require('../models/school');
var SECRET = process.env.SECRET;

module.exports = {
  getSchool,
  addSchooltoDB,
  addPost,
  deletePost
  // favSchool
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

// function favSchool(req, res, next) {
//   School.findOne({schoolId: req.params.schoolId}, function(err, school) {
//     if (school) {
//       if (!req.user.favorites.some(fav => fav.equals(school._id))) {
//         req.user.favorites.push(school._id);
//         console.log(school._id);
//         req.user.save(function(err, user) {
//           res.status(200).json(user);
//           // getPopulatedUser(req.user._id)
//           // .then(user => res.render('recipes/index', {user: req.user, recipes: user.favorites}));
//       // } else {
//       //   getPopulatedUser(req.user._id)
//       //   .then(user => res.render('recipes/index', {user: req.user, recipes: user.favorites}));
//       // }
//       })
//     }
//   }
// })
// }
  //     school.posts.push(req.body.data);
  //     school.save(function(err, school) {
  //       res.status(200).json(school);
  //     });
  //   }
  // });

// helper function
// function getPopulatedUser(userId) {
//   return User.findById(userId).populate('favorites').exec();
// };
