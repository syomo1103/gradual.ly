angular.module('app')
.controller('NavController', NavController);

NavController.$inject = ['$state', 'UserService', '$scope'];

function NavController($state, UserService, $scope) {
  var vm = this;

  vm.logout = function() {
    UserService.logout();
    $state.go('home');
    toastr.success("You've successfully logged out!");
  };

  vm.getUser = UserService.getUser;
  vm.isLoggedIn = UserService.isLoggedIn;
  // vm.bodyClass;
  $scope.$on('$stateChangeStart', function(event, toState, toParams) {
    vm.bodyClass = toState.name + '-page';
  })

}
