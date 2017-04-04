angular.module('app')
  .factory('EmailService', emailService);


emailService.$inject = ['$resource'];

function emailService($resource) {
    return $resource('/api/mail', {data: ':data'});
}
