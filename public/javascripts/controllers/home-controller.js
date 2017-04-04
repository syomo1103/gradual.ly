angular.module('app')
.controller('HomeController', HomeController);

HomeController.$inject = ['$timeout', '$state', 'UserService', 'SearchService', '$stateParams'];

function HomeController($timeout, $state, UserService, SearchService, $stateParams) {
  var vm = this;
  document.getElementById("home-form").reset();
  // vm.name = $stateParams.name;

  vm.stateList = new Array("AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY");

  vm.stateSelected = function(state) {
    $timeout(function() {
      $state.go('schools-by-state', {abbr: state});
    });
  }

  vm.searchByName = function(name) {
    $timeout(function() {
      $state.go('only-name', {name: name});
      document.getElementById("home-form").reset();
      document.getElementById("search-form").reset();
    });
  }


}
