angular.module('MyApp')
  .controller('HomeCtrl', function($scope, $rootScope, TripsFactory, LocationsFactory) {

    $scope.user = $rootScope.currentUser;

    //Gets all Trips for this User and Adjusts the styling to allow for cool User UI effect.
    TripsFactory.getTrips($scope.user._id)
    .then(function(trips){
        $scope.trips = trips.data.reverse()

        //Loop through each user in every trip and set its style to create overlap effect
        for (var i = 0; i < $scope.trips.length; i++) {

            var counter = 0;
            for (var j = 0; j < $scope.trips[i].users.length; j++) {

                //Set the "left" CSS to increment by 40 pixels for every user in every trip, so they appear in an overlapping row
                $scope.trips[i].users[j].style = {'left': '' + (0 + counter) + 'px', 'position': 'absolute'}
                counter += 40;

            }

            counter = 0;
            for (var b = 0; b < $scope.trips[i].locations.length; b++) {

                //Set the "left" CSS to increment by 40 pixels for every user in every trip, so they appear in an overlapping row
                $scope.trips[i].locations[b].style = {'left': '' + (0 + counter) + 'px', 'position': 'absolute'}
                counter += 40;

            }
        }

        //Loop through each trips Locations and change CSS for tags
        // for (var a = 0; a < $scope.trips.length; a++) {

        //     var counter = 0;

        // }

        console.log("Trips", $scope.trips)
    })






    // $scope.updateProfile = function() {
    //   Account.updateProfile($scope.profile)
    //     .then(function(response) {
    //       console.log("The updated profile", response)
    //       $rootScope.currentUser = response.data.user;
    //       $window.localStorage.user = JSON.stringify(response.data.user);
    //       $scope.messages = {
    //         success: [response.data]
    //       };
    //     })
    //     .catch(function(response) {
    //       $scope.messages = {
    //         error: Array.isArray(response.data) ? response.data : [response.data]
    //       };
    //     });
    // };

    // $scope.changePassword = function() {
    //   Account.changePassword($scope.profile)
    //     .then(function(response) {
    //       $scope.messages = {
    //         success: [response.data]
    //       };
    //     })
    //     .catch(function(response) {
    //       $scope.messages = {
    //         error: Array.isArray(response.data) ? response.data : [response.data]
    //       };
    //     });
    // };

    // $scope.link = function(provider) {
    //   $auth.link(provider)
    //     .then(function(response) {
    //       $scope.messages = {
    //         success: [response.data]
    //       };
    //     })
    //     .catch(function(response) {
    //       $window.scrollTo(0, 0);
    //       $scope.messages = {
    //         error: [response.data]
    //       };
    //     });
    // };

    // $scope.unlink = function(provider) {
    //   $auth.unlink(provider)
    //     .then(function() {
    //       $scope.messages = {
    //         success: [response.data]
    //       };
    //     })
    //     .catch(function(response) {
    //       $scope.messages = {
    //         error: [response.data]
    //       };
    //     });
    // };

    // $scope.deleteAccount = function() {
    //   Account.deleteAccount()
    //     .then(function() {
    //       $auth.logout();
    //       delete $window.localStorage.user;
    //       $location.path('/');
    //     })
    //     .catch(function(response) {
    //       $scope.messages = {
    //         error: [response.data]
    //       };
    //     });
    // };
  });
