angular.module('app')
.controller('SchoolsByStateController', SchoolsByStateController);

SchoolsByStateController.$inject = ['$state', 'UserService', 'SearchService', '$stateParams'];

function SchoolsByStateController($state, UserService, SearchService, $stateParams) {
  var vm = this;

  vm.state = $stateParams.abbr;

  SearchService.getSchoolsByState($stateParams.abbr).then(function(resp) {
    vm.totalSchools = resp.data.metadata.total;
    // SearchService.addPages(vm.totalSchools);
    // console.log(resp.data.results[0].id);
    vm.schools = resp.data;
  })

  vm.selectSchool = function(school) {
    SearchService.selectSchool(school).then(function(school) {
      // school is from my api/db
      SearchService.selectedSchool = school;
      $state.go('school-detail');
    });
  }

}
