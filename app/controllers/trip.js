angular.module('MyApp')
  .controller('TripCtrl', function($scope, $rootScope, TripsFactory, LocationsFactory, currentTrip) {

    $scope.user = $rootScope.currentUser;
    $scope.currentTrip = currentTrip
    console.log("Current Trip from Resolve", $scope.currentTrip)


    //Initialize Calendar
    $(document).ready(function() {

        // page is now ready, initialize the calendar...
        console.log("Runs After document load")
        $('#calendar').fullCalendar({
            // put your options and callbacks here
        })

    });





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
