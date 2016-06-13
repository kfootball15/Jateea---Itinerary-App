angular.module('MyApp')
  .factory('TripsFactory', function($http) {
    return {
      getTrips: function(userId) {
        return $http.get('/api/trips/user/' + userId);
      },
      getCurrentTrip: function(tripId) {
        return $http.get('/api/trips/' + tripId)
        .then(function(trip){
          return trip.data
        })
      },
      createTrip: function(data) {
        console.log("Got into factory createTrip")
        return $http.post('/api/trips', data)
        .then(function(trip){
          return trip.data
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
