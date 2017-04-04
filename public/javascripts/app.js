angular.module('app', ['ui.router', 'ngAnimate', 'ngResource'])
  .config(configRoutes)
  .run(runBlock);

runBlock.$inject = ['$rootScope', '$state', 'UserService', 'SearchService'];

function runBlock($rootScope, $state, UserService, SearchService) {
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
      bgStyle: "background-image: url('//i.imgur.com/KZPKJJ2.jpg'); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;",
      controller: 'HomeController as homeCtrl',
      navStyle: 'box-shadow: none; color: rgba(0,0,0,0.87);'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/users/login.html',
      controller: 'UserController as userCtrl',
      bgStyle: 'background: lightgrey',
      navStyle: 'color: rgba(0,0,0,0.87);'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/users/signup.html',
      controller: 'UserController as userCtrl',
      bgStyle: 'background: lightgrey',
      navStyle: 'color: rgba(0,0,0,0.87);'
    })

    .state('schools-by-state', {
      url: '/schools/:abbr',
      templateUrl: 'templates/schools-by-state.html',
      controller: 'SchoolsByStateController as schoolsByStateCtrl',
      navStyle: 'color: white; background-color: #CA3D2E;'
    })

    .state('pages', {
      url: '/schools/:abbr/:page',
      templateUrl: 'templates/schools-by-state-pages.html',
      controller: 'SchoolsByStatePagesController as schoolsByStatePagesCtrl',
      navStyle: 'color: white; background-color: #CA3D2E;'
    })

    .state('name', {
      // url: '/schools/:abbr/:page/:name',
      url: '/schools/:abbr/search/:name',
      templateUrl: 'templates/schools-by-name.html',
      controller: 'SchoolsByNameController as schoolsByNameCtrl',
      navStyle: 'color: white; background-color: #CA3D2E;'
    })

    .state('only-name', {
      url: '/search/:name',
      templateUrl: 'templates/schools-only-by-name.html',
      controller: 'SchoolsOnlyByNameController as schoolsOnlyByNameCtrl',
      navStyle: 'color: white; background-color: #CA3D2E;'
    })

    .state('school-detail', {
      url: '/details',
      templateUrl: 'templates/school-detail.html',
      controller: 'SchoolDetailController as schoolDetailCtrl',
      navStyle: 'color: white; background-color: #CA3D2E;'
    })

    .state('favorite-schools', {
      url: '/favorites',
      templateUrl: 'templates/favorite-schools.html',
      controller: 'FavsController as favsCtrl',
      navStyle: 'color: white; background-color: #CA3D2E;'
    })

    .state('my-posts', {
      url: '/myposts',
      templateUrl: 'templates/my-posts.html',
      controller: 'MyPostsController as myPostsCtrl',
      navStyle: 'color: white; background-color: #CA3D2E;'
    });

  $urlRouterProvider.otherwise('/home');
}
