angular.module('MyApp')
  .factory('LocationsFactory', function($http) {
    return {
      getLocations: function(tripId) {
        return $http.get('/api/locations/' + tripId)
        .then(function(locations){
            return locations.data
        })
      },
      getAllLocations: function() {
        return $http.get('/api/locations/')
        .then(function(locations){
            return locations.data
        })
      }
      // changePassword: function(data) {
      //   return $http.put('/account', data);
      // },
      // deleteAccount: function() {
      //   return $http.delete('/account');
      // },
      // forgotPassword: function(data) {
      //   return $http.post('/forgot', data);
      // },
      // resetPassword: function(data) {
      //   return $http.post('/reset', data);
      // }
    };
  });
