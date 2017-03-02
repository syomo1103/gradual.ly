angular.module('app')
.controller('UserController', UserController);

UserController.$inject = ['$state', 'UserService'];

function UserController($state, UserService) {
  var vm = this;

  vm.signup = function() {
    UserService.signup(vm.user).then(function() {
      $state.go('home');
    });
    vm.user = {};
  };

  vm.login = function() {
    UserService.login(vm.user).then(function() {
      $state.go('home');
      toastr.success("You've successfully logged in!");
    }, function() {
      $state.go('login');
      toastr.error('Bad credentials. Please try again or create an account.');
    });
    vm.user = {};
  };

}
