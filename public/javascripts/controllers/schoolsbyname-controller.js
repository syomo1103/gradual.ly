angular.module('app')
.controller('SchoolsByNameController', SchoolsByNameController);

SchoolsByNameController.$inject = ['$state', 'UserService', 'SearchService', '$stateParams', '$timeout'];

function SchoolsByNameController($state, UserService, SearchService, $stateParams, $timeout) {
  var vm = this;

  vm.state = $stateParams.abbr;
  vm.pages = [];
  vm.page = $stateParams.page;
  vm.name = $stateParams.name;


    SearchService.getSchoolsByName(vm.state, vm.name).then(function(resp) {
      vm.totalSchools = resp.data.metadata.total;
      vm.totalPages = Math.ceil(vm.totalSchools / 100);
      for (var i = 0; i < vm.totalPages; i++) {
        vm.pages.push(i);
      }
      vm.schools = resp.data.results;
      console.log(vm.schools);
    })

  vm.searchByName = function(name) {
    $timeout(function() {
      $state.go('name', {abbr: vm.state, name: name});
      document.getElementById("home-form").reset();
      document.getElementById("search-form").reset();
    });
  }

  vm.selectSchool = function(school) {
    SearchService.selectSchool(school).then(function(school) {
      // school is from my api/db
      SearchService.selectedSchool = school;
      $state.go('school-detail');
    });
  }

}
