angular.module('MyApp', ['ngRoute', 'satellizer', 'ui.router'])
  .config(["$routeProvider", "$locationProvider", "$authProvider", "$stateProvider", function($routeProvider, $locationProvider, $authProvider, $stateProvider) {
    skipIfAuthenticated.$inject = ["$location", "$auth"];
    loginRequired.$inject = ["$location", "$auth"];
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      })
      .when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/account', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/forgot', {
        templateUrl: 'partials/forgot.html',
        controller: 'ForgotCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/reset/:token', {
        templateUrl: 'partials/reset.html',
        controller: 'ResetCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/trips/:tripId', {
        url: '/trip/:tripId',
        templateUrl: 'partials/trip.html',
        controller: 'TripCtrl',
        resolve: {
            currentTrip: ["TripsFactory", "$routeParams", "$route", function(TripsFactory, $routeParams, $route){
                return TripsFactory.getCurrentTrip( $route.current.params.tripId);
            }]
        },
      })
      .when('/createTrip', {
        templateUrl: 'partials/tripCreate.html',
        controller: 'TripCreateCtrl',
        resolve: {
            allUsers: ["UsersFactory", function(UsersFactory){
                return UsersFactory.getAllUsers();
            }],
            allLocations: ["LocationsFactory", function(LocationsFactory){
                return LocationsFactory.getAllLocations();
            }]
        },
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });

    // $stateProvider
    //   .state('trip', {
    //     url: '/trip/:tripId',
    //     templateUrl: 'partials/trip.html',
    //     controller: 'TripCtrl',
    //     resolve: {
    //         currentTrip: function(TripsFactory, $stateParams){
    //             console.log("Got into Resolve", $stateParams.tripId)
    //             return TripsFactory.getCurrentTrip($stateParams.tripId);
    //         }
    //     },
    //   });

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';
    $authProvider.facebook({
      url: '/auth/facebook',
      clientId: '980220002068787',
      redirectUri: 'http://localhost:3000/auth/facebook/callback'
    });
    $authProvider.google({
      url: '/auth/google',
      // clientId: currentEnvironment.GOOGLE.clientID
    });
    $authProvider.twitter({
      url: '/auth/twitter'
    });

    function skipIfAuthenticated($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }
  }])
  .run(["$rootScope", "$window", function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  }]);

angular.module('MyApp')
  .controller('ContactCtrl', ["$scope", "Contact", function($scope, Contact) {
    $scope.sendContactForm = function() {
      Contact.send($scope.contact)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    }
  }]);
angular.module('MyApp')
  .controller('ForgotCtrl', ["$scope", "Account", function($scope, Account) {
    $scope.forgotPassword = function() {
      Account.forgotPassword($scope.user)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    }
  }]);
angular.module('MyApp')
  .controller('HeaderCtrl', ["$scope", "$location", "$window", "$auth", function($scope, $location, $window, $auth) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
    
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    
    $scope.logout = function() {
      $auth.logout();
      delete $window.localStorage.user;
      $location.path('/');
    };
  }]);
angular.module('MyApp')
  .controller('HomeCtrl', ["$scope", "$rootScope", "TripsFactory", "LocationsFactory", function($scope, $rootScope, TripsFactory, LocationsFactory) {

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
  }]);

angular.module('MyApp')
  .controller('LoginCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", function($scope, $rootScope, $location, $window, $auth) {
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/account');
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };
  }]);
angular.module('MyApp')
  .controller('ProfileCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", "Account", function($scope, $rootScope, $location, $window, $auth, Account) {
    $scope.profile = $rootScope.currentUser;

    $scope.updateProfile = function() {
      Account.updateProfile($scope.profile)
        .then(function(response) {
          console.log("The updated profile", response)
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
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

    $scope.changePassword = function() {
      Account.changePassword($scope.profile)
        .then(function(response) {
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

    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $window.scrollTo(0, 0);
          $scope.messages = {
            error: [response.data]
          };
        });
    };
    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: [response.data]
          };
        });
    };

    $scope.deleteAccount = function() {
      Account.deleteAccount()
        .then(function() {
          $auth.logout();
          delete $window.localStorage.user;
          $location.path('/');
        })
        .catch(function(response) {
          $scope.messages = {
            error: [response.data]
          };
        });
    };
  }]);

angular.module('MyApp')
  .controller('ResetCtrl', ["$scope", "Account", function($scope, Account) {
    Account.forgotPassword($scope.user)
      .then(function(response) {
        $scope.messages = {
          success: [response.data]
        };
      })
      .catch(function(response) {
        $scope.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
      });
  }]);
angular.module('MyApp')
  .controller('SignupCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", function($scope, $rootScope, $location, $window, $auth) {
    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          $auth.setToken(response);
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };
  }]);
angular.module('MyApp')
  .controller('TripCtrl', ["$scope", "$rootScope", "TripsFactory", "LocationsFactory", "currentTrip", function($scope, $rootScope, TripsFactory, LocationsFactory, currentTrip) {

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
  }]);

angular.module('MyApp')
  .controller('TripCreateCtrl', ["$scope", "$rootScope", "$location", "TripsFactory", "LocationsFactory", "allUsers", "allLocations", function($scope, $rootScope, $location, TripsFactory, LocationsFactory, allUsers, allLocations) {

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


  }]);

angular.module('MyApp')
  .factory('Account', ["$http", function($http) {
    return {
      updateProfile: function(data) {
        return $http.put('/account', data);
      },
      changePassword: function(data) {
        return $http.put('/account', data);
      },
      deleteAccount: function() {
        return $http.delete('/account');
      },
      forgotPassword: function(data) {
        return $http.post('/forgot', data);
      },
      resetPassword: function(data) {
        return $http.post('/reset', data);
      }
    };
  }]);
angular.module('MyApp')
  .factory('Contact', ["$http", function($http) {
    return {
      send: function(data) {
        return $http.post('/contact', data);
      }
    };
  }]);
angular.module('MyApp')
  .factory('LocationsFactory', ["$http", function($http) {
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
  }]);

angular.module('MyApp')
  .factory('TripsFactory', ["$http", function($http) {
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
  }]);

angular.module('MyApp')
  .factory('UsersFactory', ["$http", function($http) {
    return {
      getAllUsers: function() {
        return $http.get('/api/users')
        .then(function(users){
          return users.data
        });
      }
    };
  }]);
