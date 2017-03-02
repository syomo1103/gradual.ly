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
      $rootScope.navStyle = toState.navStyle;
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
      bgStyle: "background-image: url('//i.imgur.com/C7AYAf6.jpg'); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;",
      controller: 'HomeController as homeCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/users/login.html',
      controller: 'UserController as userCtrl',
      bgStyle: 'background: lightgrey'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/users/signup.html',
      controller: 'UserController as userCtrl',
      bgStyle: 'background: lightgrey'
    })

    .state('schools-by-state', {
      url: '/schools/:abbr',
      templateUrl: 'templates/schools-by-state.html',
      controller: 'SchoolsByStateController as schoolsByStateCtrl',
      navStyle: 'color: black'
    })

    .state('school-detail', {
      url: '/details',
      templateUrl: 'templates/school-detail.html',
      controller: 'SchoolDetailController as schoolDetailCtrl',
      navStyle: 'color: black'
    })

    .state('saved-schools', {
      url: '/saved',
      templateUrl: 'templates/saved-schools.html',
      // controller: 'SavedSchoolsController as savedSchoolsCtrl',
      navStyle: 'color: black'
    });

    // .state('newTodo', {
    //   url: '/new',
    //   templateUrl: 'templates/todos/new.html',
    //   controller: 'NewController as newCtrl',
    //   loginRequired: true
    // });

  $urlRouterProvider.otherwise('/home');
}
