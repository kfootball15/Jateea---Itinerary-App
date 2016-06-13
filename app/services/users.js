angular.module('MyApp')
  .factory('UsersFactory', function($http) {
    return {
      getAllUsers: function() {
        return $http.get('/api/users')
        .then(function(users){
          return users.data
        });
      }
    };
  });
