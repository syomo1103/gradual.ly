angular.module('app')
.controller('SchoolDetailController', SchoolDetailController);

SchoolDetailController.$inject = ['School', '$state', 'UserService', 'SearchService', '$stateParams', 'socket', 'EmailService'];

function SchoolDetailController(School, $state, UserService, SearchService, $stateParams, socket, EmailService) {
  var vm = this;

  vm.getUser = UserService.getUser;
  vm.isLoggedIn = UserService.isLoggedIn;

  vm.schools = School.favsForUser();
  vm.id = $stateParams.schoolId;

  vm.school = SearchService.selectedSchool;
  vm.updateUsers = [];
  // vm.emailContent = {
  //   emails: [],
  //   names: [],
  //   school: {}
  // };
  // vm.emailContent = [
  //   {
  //     user: {
  //       email: '',
  //       name: '',
  //       school: {}
  //     }
  //   }
  // ];
  vm.emailContent = [];

//   vm.user = function buUser() {
//     return {
//       'email': '',
//       'name': '',
//       'school': {}
//   };
// };

  // vm.user = {
  //   email: '',
  //   name: '',
  //   school: {}
  // }

  vm.addPost = function() {
    SearchService.addPost(vm.newPost).then(function(school) {
      vm.school = school;
      SearchService.selectedSchool = school;
      vm.newPost.program = '';
      vm.newPost.comment = '';
      socket.emit('add-notification');
      vm.favUsers = school.favoritedBy;
      UserService.findEmails(vm.favUsers).then(function(users) {
        console.log(Array.isArray(users));
        console.log(users.length);
        users.forEach(function(user) {
          vm.user = {
            email: '',
            name: '',
            school: {}
          }
          if (user._id !== UserService.getUser()._id) {
            console.log(user.email);
            // vm.emailContent.emails.push(user.email);
            // vm.emailContent.names.push(user.name);
            // console.log(vm.emailContent.names);
            // console.log(vm.emailContent.emails);
            // vm.emailContent.school = school;
            // console.log(vm.emailContent.school);
            // vm.emailContent.push(vm.emailContent[i].user.email = user.email, vm.emailContent[i].user.name = user.name, vm.emailContent[i].user.school = school);

            vm.user['email'] = user.email;
            vm.user['name'] = user.name;
            vm.user['school'] = school;
            console.log(vm.user);
            vm.emailContent.push(vm.user);
            console.log(vm.emailContent);
            // vm.updateUsers.push(user.email);
          } else {
            return;
          }
        });
      UserService.sendEmail(vm.emailContent);
      });
      // UserService.sendEmail(vm.updateUsers, school);
      // SearchService.sendMail();

      // for (var prop in vm.school.posts) {
      //   console.log(vm.school.posts[prop].poster);
      //   if UserService.getUser()._id === vm.school.posts[prop].poster
      // }
      // console.log(vm.school.posts);
    });
  };

  // vm.sendEmail = function(email) {
  //   EmailService.save({
  //     to: ,
  //     subject: ,
  //     text:

  //   });
  // };

  vm.deletePost = function(post) {
    SearchService.deletePost(post._id).then(function(school) {
      vm.school = school;
      SearchService.selectedSchool = school;
    });
  };

  vm.favorited = function() {
    return vm.school.favoritedBy.some(userId => userId == UserService.getUser()._id);
  };

  vm.favSchool = function() {
    SearchService.favSchool().then(function(school) {
      vm.school = school;
      SearchService.selectedSchool = school;
    });
  };

   vm.unFavFromDetail = function(school) {
    SearchService.unFavFromDetail(school).then(function(school) {
      vm.school = school;
      var schoolIdx = vm.schools.findIndex(s => s._id === school._id);
      vm.schools.splice(schoolIdx, 1);
    });
  };

}

