angular.module('app')
  .factory('AuthInterceptor', AuthInterceptor);

AuthInterceptor.$inject = ['TokenService'];

function AuthInterceptor(TokenService) {
  return {

    request: function(config) {
      var token = TokenService.getToken();
      if (token) config.headers.Authorization = 'Bearer ' + token;
      return config;
    },

    response: function(response) {
      var token = response.headers('Authorization');
      if (token) TokenService.setToken(token);
      return response;
    }
  };
}
