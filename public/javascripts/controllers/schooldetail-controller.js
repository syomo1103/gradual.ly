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
  vm.emailContent = [];

  vm.addPost = function() {
    SearchService.addPost(vm.newPost).then(function(school) {
      vm.school = school;
      SearchService.selectedSchool = school;
      vm.newPost.program = '';
      vm.newPost.comment = '';
      socket.emit('add-notification');
      vm.favUsers = school.favoritedBy;
      UserService.findEmails(vm.favUsers).then(function(users) {
        users.forEach(function(user) {
          vm.user = {
            email: '',
            name: '',
            school: {}
          }
          if (user._id !== UserService.getUser()._id) {
            vm.user['email'] = user.email;
            vm.user['name'] = user.name;
            vm.user['school'] = school;
            vm.emailContent.push(vm.user);
            console.log(vm.emailContent);
          } else {
            return;
          }
        });
      UserService.sendEmail(vm.emailContent);
      vm.emailContent = [];
      console.log(vm.emailContent);
      });
    });
  };

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

