angular.module('app')
.controller('SchoolDetailController', SchoolDetailController);

SchoolDetailController.$inject = ['$state', 'UserService', 'SearchService'];

function SchoolDetailController($state, UserService, SearchService) {
  var vm = this;

  vm.school = SearchService.selectedSchool;
  vm.getUser = UserService.getUser;
  vm.isLoggedIn = UserService.isLoggedIn;

  vm.addPost = function() {
    SearchService.addPost(vm.newPost).then(function(school) {
      vm.school = school;
      SearchService.selectedSchool = school;
      vm.newPost.program = '';
      vm.newPost.comment = '';
    });
  };

  vm.deletePost = function(post) {
    SearchService.deletePost(post._id).then(function(school) {
      vm.school = school;
      SearchService.selectedSchool = school;
    })
  };

  // vm.favSchool = function() {
  //   SearchService.favSchool().then(function(user) {
  //     vm.user = user;
  //     SearchService.selectedSchool = school;
  //   })
  // }

}

