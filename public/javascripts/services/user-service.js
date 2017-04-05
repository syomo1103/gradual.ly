angular.module('app')
  .factory('UserService', userService);

userService.$inject = ['$http', 'TokenService', 'School'];

function userService($http, TokenService, School) {

  var service = {
    login,
    logout,
    signup,
    getUser,
    isLoggedIn,
    findEmails,
    sendEmail
  };

  function login(credentials) {
    return $http.post('/api/users/login', credentials);
  }

  function logout() {
    TokenService.removeToken();
  }

  function signup(userData) {
    return $http.post('/api/users', userData);
  }

  function getUser() {
    return getUserFromToken();
  }

  function isLoggedIn() {
    return !!getUserFromToken();
  }

  function findEmails(userData) {
    return School.findEmails({
      data: userData
    }).$promise;
  }

  function sendEmail(emailContent) {
    console.log(emailContent);
    return School.sendEmail({
      data: emailContent
    }).$promise;
  }

  return service;

  // helper functions
  function getUserFromToken() {
    var token = TokenService.getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  }

}
