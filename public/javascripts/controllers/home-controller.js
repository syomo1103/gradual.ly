angular.module('app')
.controller('HomeController', HomeController);

HomeController.$inject = ['$state', 'UserService', 'SearchService'];

function HomeController($state, UserService, SearchService) {
  var vm = this;

  vm.stateList = new Array("AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY");

  vm.stateSelected = function(state) {
    $state.go('schools-by-state', {abbr: state});
  }
}
