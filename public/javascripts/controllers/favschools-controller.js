angular.module('app')
.controller('FavsController', FavsController);

FavsController.$inject = ['School', 'SearchService', '$state', '$stateParams'];

function FavsController(School, SearchService, $state, $stateParams) {
  var vm = this;

  vm.schools = School.favsForUser();
  vm.id = $stateParams.schoolId;

  vm.selectSchool = function(school) {
    SearchService.selectSchool(school).then(function(school) {
      // school is from my api/db
      SearchService.selectedSchool = school;
      $state.go('school-detail');
    });
  }

  vm.unFavSchool = function(school) {
    SearchService.unFavSchool(school).then(function(school) {
      var schoolIdx = vm.schools.findIndex(s => s._id === school._id);
      vm.schools.splice(schoolIdx, 1);
    });
  };

  vm.gotoSchool = function(school) {
    SearchService.selectedSchool = school;
    $state.go('school-detail');
  }

  vm.searchByName = function(name) {
    $timeout(function() {
      $state.go('only-name', {name: name});
    });
  }

}
