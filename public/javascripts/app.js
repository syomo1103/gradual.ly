// angular.module('app', ['ui.router', 'ngResource'])
//   .config(configRoutes)
//   .run(runBlock);

//   runBlock.$inject = ['$rootScope', '$state', 'UserService'];

//   function runBlock($rootScope, $state, UserService) {
//     $rootScope.$on('$stateChangeStart', function(evt, toState) {
//       if(toState.loginRequired && !UserService.isLoggedIn()) {
//         evt.preventDefault();
//         $state.go('login');
//       }
//     });
//   }

// configRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

// function configRoutes($stateProvider, $urlRouterProvider, $httpProvider) {

//   $httpProvider.interceptors.push('AuthInterceptor');

//   $stateProvider

//     .state('home', {
//       url: '/home',
//       templateUrl: 'templates/home.html'
//     })

//     .state('login', {
//       url: '/login',
//       templateUrl: 'templates/users/login.html',
//       controller: 'UserController as userCtrl'
//     })

//     .state('signup', {
//       url: '/signup',
//       templateUrl: 'templates/users/signup.html',
//       controller: 'UserController as userCtrl'
//     })

//     .state('todos', {
//       url: '/todos',
//       templateUrl: 'templates/todos/index.html',
//       controller: 'TodosController as todosCtrl',
//       loginRequired: true
//     })

//     .state('newTodo', {
//       url: '/new',
//       templateUrl: 'templates/todos/new.html',
//       controller: 'NewController as newCtrl',
//       loginRequired: true
//     });

//   $urlRouterProvider.otherwise('/home');
// }
