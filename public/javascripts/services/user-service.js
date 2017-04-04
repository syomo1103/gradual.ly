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

  // function sendEmail(userData) {
  //   var stringUserData = userData.toString();
  //   console.log(stringUserData);
  //   return School.sendEmail({
  //     data: stringUserData
  //   }).$promise;
  // }

  function sendEmail(emailContent) {
    // var stringUserData = userData.toString();
    console.log(emailContent);
    return School.sendEmail({
      data: emailContent
    }).$promise;
  }

  // function findEmails(userData) {
  //   console.log(userData);
  //   return $http.post({
  //     url: '/api/emails',
  //     data: {
  //       arr: userData
  //     }
  //   });
  // }

  // function findEmails(userData) {
  //   console.log(userData);
  //   return School.findEmails({
  //     id: this.selectedSchool.schoolId,
  //     data: userData
  //   }).$promise;
  // }

  return service;

  // helper functions
  function getUserFromToken() {
    var token = TokenService.getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  }

}
