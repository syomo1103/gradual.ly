angular.module('app')
  .factory('SearchService', searchService);

searchService.$inject = ['$http', '$q', 'School'];

function searchService($http, $q, School) {

  var selectedSchool;
  var selectedPage;
  var selectedPost;
  var messageReceived;

  var service = {
    getSchoolsByState,
    getSchoolsByPage,
    selectPage,
    selectedSchool,
    selectedPage,
    selectSchool,
    addPost,
    deletePost,
    favSchool,
    unFavSchool,
    unFavFromDetail,
    getSchoolsByName,
    searchByName,
    getSchoolsOnlyByName,
    deletePostFromPosts,
    addNotification
  };

  var baseUrl = '//api.data.gov/ed/collegescorecard/v1/schools?_per_page=100&school.degrees_awarded.predominant=3,4&_fields=school.name,id,school.school_url&api_key=' + SCORECARD_TOKEN;

  function getSchoolsByState(state) {
    return $http.get(baseUrl + '&school.state=' + state);
  }

  function getSchoolsByName(state, name) {
    // console.log('get schools by state: ' + state);
    // console.log('get schools by name: ' + name);
    return $http.get(baseUrl + '&school.state=' + state + '&school.name=' + name);
  }

  function getSchoolsOnlyByName(name) {
    // console.log('get schools only by name: ' + name);
    return $http.get(baseUrl + '&school.name=' + name);
  }

  function searchByName(state, name) {
    return $http.get(baseUrl + '&school.state=' + state + '&school.name=' + name);
  }

  function getSchoolsByPage(state, page) {
    // console.log('get schools by state: ' + state);
    // console.log('get schools by page: ' + page);
    return $http.get(baseUrl + '&school.state=' + state + '&_page=' + page);
  }

  function selectPage(state, page) {
    return $http.get(baseUrl + '&school.state=' + state + '&_page=' + page);
  }

  function selectSchool(selSchool) {
    // get school from my api
    var school = selSchool;
    // the api will create school if doesn't exist
    return $q(function(resolve, reject) {
      School.get({schoolId: school.id}).$promise.then(function(s) {
        this.selectedSchool = s;
        resolve(s);
      }).catch(function(err) {
        School.save({
          // keys map to your mongoose model
          // values map to selSchool
          name: school['school.name'],
          schoolId: school.id,
          schoolWebsite: school['school.school_url']
        }, function(newSchool) {
          this.selectedSchool = newSchool;
          resolve(newSchool);
        });
      });
    });
  }

  function addPost(post) {
    return School.addPost({
      id: this.selectedSchool.schoolId,
      data: post
    }).$promise;
  }

  function deletePost(post) {
    return School.deletePost({id: post}).$promise;
  };

  // function deletePostFromPosts(post) {
  //   return School.deletePost({id: this.selectedPost._id}).$promise;
  // };

  function deletePostFromPosts(post) {
    return School.deletePost({id: post}).$promise;
  };

  function favSchool() {
    return School.addFav({id: this.selectedSchool._id}).$promise;
  };

  function unFavFromDetail(school) {
    return School.deleteFav({id: this.selectedSchool._id}).$promise;
  };

  function unFavSchool(school) {
    return School.deleteFav({id: school._id}).$promise;
  };

  function addNotification() {
    messageReceived = true;
  };


  return service;

}
