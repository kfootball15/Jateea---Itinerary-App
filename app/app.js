angular.module('MyApp', ['ngRoute', 'satellizer', 'ui.router'])
  .config(function($routeProvider, $locationProvider, $authProvider, $stateProvider) {
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
            currentTrip: function(TripsFactory, $routeParams, $route){
                return TripsFactory.getCurrentTrip( $route.current.params.tripId);
            }
        },
      })
      .when('/createTrip', {
        templateUrl: 'partials/tripCreate.html',
        controller: 'TripCreateCtrl',
        resolve: {
            allUsers: function(UsersFactory){
                return UsersFactory.getAllUsers();
            },
            allLocations: function(LocationsFactory){
                return LocationsFactory.getAllLocations();
            }
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
  })
  .run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  });
