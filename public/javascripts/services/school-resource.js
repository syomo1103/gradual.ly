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
      addFav: {
        method: 'POST',
        url: '/api/schools/:id/fav',
        params: {id: '@id'}
      },
      deleteFav: {
        method: 'DELETE',
        url: '/api/schools/:id/fav',
        params: {id: '@id'}
      },
      favsForUser: {
        method: 'GET',
        url: '/api/favorites',
        isArray: true
      },
      postsForUser: {
        method: 'GET',
        url: '/api/posts',
        isArray: true
      },
      findEmails: {
        method: 'POST',
        url: '/api/emails',
        isArray: true,
        data: ':data'
      },
      sendEmail: {
        method: 'POST',
        url: '/api/mail',
        data: ':data'
      }
    }
  );
}
