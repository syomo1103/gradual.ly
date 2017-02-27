angular.module('app', ['ui.router', 'ngAnimate', 'ngResource'])
  .config(configRoutes)
  .run(runBlock);

runBlock.$inject = ['$rootScope', '$state', 'UserService'];

function runBlock($rootScope, $state, UserService) {
  $rootScope.$on('$stateChangeStart', function(evt, toState) {
    if (toState.loginRequired && !UserService.isLoggedIn()) {
      evt.preventDefault();
      $state.go('login');
    } else {
      $rootScope.bgStyle = toState.bgStyle;
    }
  });
}

configRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

function configRoutes($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push('AuthInterceptor');

  $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      bgStyle: "background-image: url('http://i.imgur.com/C7AYAf6.jpg'); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;"
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/users/login.html',
      controller: 'UserController as userCtrl',
      bgStyle: 'background: lightgrey'
      // resolve: {
      //   bodyClass: function() {return 'login-page'}
      // }
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/users/signup.html',
      controller: 'UserController as userCtrl',
      bgStyle: 'background: lightgrey'
      // resolve: {
      //   bodyClass: function() {return 'signup-page'}
      // }
    });

    // .state('todos', {
    //   url: '/todos',
    //   templateUrl: 'templates/todos/index.html',
    //   controller: 'TodosController as todosCtrl',
    //   loginRequired: true
    // })

    // .state('newTodo', {
    //   url: '/new',
    //   templateUrl: 'templates/todos/new.html',
    //   controller: 'NewController as newCtrl',
    //   loginRequired: true
    // });

  $urlRouterProvider.otherwise('/home');
}
