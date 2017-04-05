angular.module('app')
.controller('NavController', NavController);

NavController.$inject = ['$state', 'UserService', '$scope', 'SearchService', 'socket', '$timeout'];

function NavController($state, UserService, $scope, SearchService, socket, $timeout) {
  var vm = this;
  vm.addNotification;

  vm.logout = function() {
    UserService.logout();
    $state.go('home');
    toastr.success("You've successfully logged out!");
  };

  socket.on('add-notification', function() {
    vm.addNotification = true;
  });

  document.getElementById('my-schools-link').addEventListener('click', function() {
    if (vm.addNotification === true) {
      vm.addNotification = false;
    }
  });

  vm.searchByName = function(name) {
    $timeout(function() {
      $state.go('only-name', {name: name});
      document.getElementById("search-form").reset();
    });
  }

  vm.getUser = UserService.getUser;
  vm.isLoggedIn = UserService.isLoggedIn;

}
