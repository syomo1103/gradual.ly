angular.module('app')
.controller('NavController', NavController);

NavController.$inject = ['$state', 'UserService', '$scope', 'SearchService'];

function NavController($state, UserService, $scope, SearchService) {
  var vm = this;

  vm.logout = function() {
    UserService.logout();
    $state.go('home');
    toastr.success("You've successfully logged out!");
  };

  vm.getUser = UserService.getUser;
  vm.isLoggedIn = UserService.isLoggedIn;

}
