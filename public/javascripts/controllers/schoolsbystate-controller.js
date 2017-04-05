angular.module('app')
.controller('SchoolsByStateController', SchoolsByStateController);

SchoolsByStateController.$inject = ['$state', 'UserService', 'SearchService', '$stateParams', '$timeout'];

function SchoolsByStateController($state, UserService, SearchService, $stateParams, $timeout) {
  var vm = this;

  vm.state = $stateParams.abbr;
  vm.pages = [];
  vm.page = $stateParams.page;

  SearchService.getSchoolsByState($stateParams.abbr).then(function(resp) {
    vm.totalSchools = resp.data.metadata.total;
    vm.totalPages = Math.ceil(vm.totalSchools / 100);
    for (var i = 0; i < vm.totalPages; i++) {
      vm.pages.push(i);
    }
    vm.schools = resp.data;
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

  vm.selectPage = function(page) {
    $timeout(function() {
      $state.go('pages', {abbr: vm.state, page: page + 1});
    });
  }

  vm.moreThanOne = function(totalPages) {
    if (vm.totalPages > 1) {
      return true;
    }
  }

  vm.nextPage = function() {
    vm.page = vm.pages[0] + 1;
    vm.selectPage(vm.page);
  }

}
