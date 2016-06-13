angular.module('MyApp')
  .controller('TripCreateCtrl', function($scope, $rootScope, $location, TripsFactory, LocationsFactory, allUsers, allLocations) {

    $scope.currentUser = $rootScope.currentUser;
    $scope.profile={};

    //Array of Users that will be added to the current trip, starting of course with the current User
    $scope.profile.users = [$rootScope.currentUser._id];
    $scope.profile.locations = []

    //All the users in the site for our hero to sort through and add to this trip (in the array above)
    $scope.allUsers = gatherAllUsers();
    $scope.allLocations = allLocations
    console.log("All Locations", allLocations)

    //Gathers all the users in the DB that are NOT already in the $scope.profile.users
    //Will become SUPER inneffecient once lots of users are added --> Fix this
    function gatherAllUsers() {
        var arr = allUsers
        var idx = -1;
        for (var i = 0; i < $scope.profile.users.length; i++) {
            for (var j = 0; j < arr.length; j++) {
                if (arr[j]._id === $scope.profile.users[i]) idx = j;
            }
        }
        if (idx >= 0) arr.splice(idx, 1)
        return arr
    }

    //Set up Date picker for Begin and End Date
    $(function() {
        $.datepicker.setDefaults({ dateFormat: 'yy-mm-dd' })
        $( "#datepicker1" ).datepicker();
        $( "#datepicker2" ).datepicker();
    });

    //adds selected users to the Trips Profile object, which is used when creating the trip in the database
    $scope.addUser = function(user){
        var idx = $scope.allUsers.indexOf(user)
        $scope.profile.users.push(user._id)
        $scope.allUsers.splice(idx, 1)
        console.log("User to add", $scope.allUsers, $scope.profile, idx)
    }

    //adds selected locations to the Trips Profile object, which is used when creating the trip in the database
    $scope.addLocation = function(location){
        var idx = $scope.allLocations.indexOf(location)
        $scope.profile.locations.push(location._id)
        $scope.allLocations.splice(idx, 1)
        console.log("Locations to add", $scope.allLocations, $scope.profile, idx)
    }

    $scope.createTrip = function() {

        console.log($scope.profile)

        TripsFactory.createTrip($scope.profile)
        .then(function(response) {
          console.log("The created Trip", response)
          $location.path('/trips/' + response._id)
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };


  });
