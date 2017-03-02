angular.module('app')
.factory('School', SchoolResource);

SchoolResource.$inject = ['$resource'];

function SchoolResource($resource) {
  return $resource(
    '/api/schools/:schoolId',
    {schoolId: '@_id'},
    {
      addPost: {
        method: 'POST',
        url: '/api/schools/:id/posts',
        params: {id: '@id'},
        isArray: false,
        data: ':data'
      },
      deletePost: {
        method: 'DELETE',
        url: '/api/posts/:id',
        params: {id: '@id'}
      },
      // favSchool: {
      //   method: 'POST',
      //   url: '/api/schools/:id/fav',
      //   params: {id: '@id'}
      // }
    }
  );
}
