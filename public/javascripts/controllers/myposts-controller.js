angular.module('app')
.controller('MyPostsController', MyPostsController);

MyPostsController.$inject = ['School', '$timeout', '$state', 'UserService', 'SearchService'];

function MyPostsController(School, $timeout, $state, UserService, SearchService) {
  var vm = this;

  vm.schools = School.postsForUser();
  console.log(vm.schools);
  vm.school = SearchService.selectedSchool;
  // vm.post = SearchService.selectedPost;

  vm.selectSchool = function(school) {
    SearchService.selectSchool(school).then(function(school) {
      // school is from my api/db
      SearchService.selectedSchool = school;
      $state.go('school-detail');
    });
  }

  vm.gotoSchool = function(school) {
    SearchService.selectedSchool = school;
    $state.go('school-detail');
  }

  vm.deletePost = function(post) {
    SearchService.deletePost(post._id).then(function(school) {
      vm.schools = School.postsForUser();
    });
  };

}
