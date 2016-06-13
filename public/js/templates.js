angular.module("MyApp").run(["$templateCache", function($templateCache) {$templateCache.put("partials/404.html","<div class=\"container text-center\">\r\n  <h1>404</h1>\r\n  <p>Page Not Found</p>\r\n</div>");
$templateCache.put("partials/contact.html","<div class=\"container\">\r\n  <div class=\"panel\">\r\n    <div class=\"panel-heading\">\r\n      <h3 class=\"panel-title\">Contact Form</h3>\r\n    </div>\r\n    <div class=\"panel-body\">\r\n      <div ng-if=\"messages.error\" role=\"alert\" class=\"alert alert-danger\">\r\n        <div ng-repeat=\"error in messages.error\">{{error.msg}}</div>\r\n      </div>\r\n      <div ng-if=\"messages.success\" role=\"alert\" class=\"alert alert-success\">\r\n        <div ng-repeat=\"success in messages.success\">{{success.msg}}</div>\r\n      </div>\r\n      <form ng-submit=\"sendContactForm()\" class=\"form-horizontal\">\r\n        <div class=\"form-group\">\r\n          <label for=\"name\" class=\"col-sm-2\">Name</label>\r\n          <div class=\"col-sm-8\">\r\n            <input type=\"text\" name=\"name\" id=\"name\" class=\"form-control\" ng-model=\"contact.name\" autofocus>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"email\" class=\"col-sm-2\">Email</label>\r\n          <div class=\"col-sm-8\">\r\n            <input type=\"email\" name=\"email\" id=\"email\" class=\"form-control\" ng-model=\"contact.email\">\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"message\" class=\"col-sm-2\">Body</label>\r\n          <div class=\"col-sm-8\">\r\n            <textarea name=\"message\" id=\"message\" rows=\"7\" class=\"form-control\" ng-model=\"contact.message\"></textarea>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <div class=\"col-sm-offset-2 col-sm-8\">\r\n            <button type=\"submit\" class=\"btn btn-success\">Send</button>\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>");
$templateCache.put("partials/footer.html","<footer>\r\n  <p>© 2016 Company, Inc. All Rights Reserved.</p>\r\n</footer>");
$templateCache.put("partials/forgot.html","<div class=\"container\">\r\n  <div class=\"panel\">\r\n    <div class=\"panel-body\">\r\n      <div ng-if=\"messages.error\" role=\"alert\" class=\"alert alert-danger\">\r\n        <div ng-repeat=\"error in messages.error\">{{error.msg}}</div>\r\n      </div>\r\n      <div ng-if=\"messages.success\" role=\"alert\" class=\"alert alert-success\">\r\n        <div ng-repeat=\"success in messages.success\">{{success.msg}}</div>\r\n      </div>\r\n      <form ng-submit=\"forgotPassword()\">\r\n        <legend>Forgot Password</legend>\r\n        <div class=\"form-group\">\r\n          <p>Enter your email address below and we\'ll send you password reset instructions.</p>\r\n          <label for=\"email\">Email</label>\r\n          <input type=\"email\" name=\"email\" id=\"email\" placeholder=\"Email\" class=\"form-control\" ng-model=\"user.email\" autofocus>\r\n        </div>\r\n        <button type=\"submit\" class=\"btn btn-success\">Reset Password</button>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>");
$templateCache.put("partials/header.html","<nav ng-controller=\"HeaderCtrl\" class=\"navbar navbar-default navbar-static-top\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" data-toggle=\"collapse\" data-target=\"#navbar\" class=\"navbar-toggle collapsed\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a href=\"/\" class=\"navbar-brand\">JATEEA</a>\n    </div>\n    <div id=\"navbar\" class=\"navbar-collapse collapse\">\n      <ul class=\"nav navbar-nav\">\n        <li ng-class=\"{ active: isActive(\'/\')}\"><a href=\"/\">Home</a></li>\n        <li ng-class=\"{ active: isActive(\'/contact\')}\"><a href=\"/contact\">Contact</a></li>\n      </ul>\n      <ul ng-if=\"isAuthenticated()\" class=\"nav navbar-nav navbar-right\">\n        <li class=\"dropdown\">\n          <a href=\"#\" data-toggle=\"dropdown\" class=\"navbar-avatar dropdown-toggle\">\n            <img ng-src=\"{{currentUser.picture || currentUser.gravatar}}\"> {{currentUser.name || currentUser.email || currentUser.id}} <i class=\"caret\"></i>\n          </a>\n          <ul class=\"dropdown-menu\">\n            <li><a href=\"/account\">My Account</a></li>\n            <li class=\"divider\"></li>\n            <li><a href=\"#\" ng-click=\"logout()\"}>Logout</a></li>\n          </ul>\n        </li>\n      </ul>\n      <ul ng-if=\"!isAuthenticated()\" class=\"nav navbar-nav navbar-right\">\n        <li ng-class=\"{ active: isActive(\'/login\')}\"><a href=\"/login\">Log in</a></li>\n        <li ng-class=\"{ active: isActive(\'/signup\')}\"><a href=\"/signup\">Sign up</a></li>\n      </ul>\n    </div>\n  </div>\n</nav>\n");
$templateCache.put("partials/home.html","<div class=\"container-fluid\" style=\"margin: 0 400px;\">\n  <div class=\"row\">\n    <div class=\"col-sm-4\">\n      <div class=\"panel\" style=\"height:400px; overflow: scroll; background-color: green;\">\n        <div class=\"panel-body\">\n          <h3 style=\"color: white\">ADD A TRIP</h3>\n          <a href=\"/createTrip\" role=\"button\" class=\"btn btn-default\" style=\"border-radius: 20px;\">+</a>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-4\" ng-repeat=\"trip in trips\">\n      <div class=\"panel\" style=\"height:400px; overflow: scroll\">\n        <div class=\"panel-body\">\n          <h3>{{trip.name}}</h3>\n          <a\n          ng-href=\"/trips/{{trip._id}}\"\n          role=\"button\"\n          class=\"btn btn-default\">\n            View Trip\n          </a>\n          <p style=\"height:75px; overflow: scroll; margin: 0 0 15px 0; box-shadow: inset 0 0 5px #000000;\">{{trip.description}}</p>\n          <div class=\"tagWrapper\">\n            <div ng-repeat=\"location in trip.locations\" style=\"overflow: scroll;\">\n              <div ng-style=\"{{location.style}}\">\n                <img class=\"userTags\" ng-src=\"{{location.image || location.tag}}\">\n                <label class=\"tagLabel\"> {{location.name}} </label>\n              </div>\n            </div>\n          </div>\n          <div class=\"tagWrapper\">\n            <div ng-repeat=\"user in trip.users\" style=\"overflow: scroll;\">\n              <div  ng-style=\"{{user.style}}\">\n                <img class=\"userTags\" ng-src=\"{{user.picture || user.gravatar}}\">\n                <label class=\"tagLabel\"> {{user.name}} </label>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n");
$templateCache.put("partials/login.html","<div class=\"login-container\">\r\n  <div class=\"panel\">\r\n    <div class=\"panel-body\">\r\n      <div ng-if=\"messages.error\" role=\"alert\" class=\"alert alert-danger\">\r\n        <div ng-repeat=\"error in messages.error\">{{error.msg}}</div>\r\n      </div>\r\n      <form ng-submit=\"login()\">\r\n        <legend>Log In</legend>\r\n        <div class=\"form-group\">\r\n          <label for=\"email\">Email</label>\r\n          <input type=\"email\" name=\"email\" id=\"email\" placeholder=\"Email\" class=\"form-control\" ng-model=\"user.email\" autofocus>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"password\">Password</label>\r\n          <input type=\"password\" name=\"password\" id=\"password\" placeholder=\"Password\" class=\"form-control\" ng-model=\"user.password\">\r\n        </div>\r\n        <div class=\"form-group\"><a href=\"/forgot\"><strong>Forgot your password?</strong></a></div>\r\n        <button type=\"submit\" class=\"btn btn-success\">Log in</button>\r\n      </form>\r\n      <div class=\"hr-title\"><span>or</span></div>\r\n      <div class=\"btn-toolbar text-center\">\r\n        <button class=\"btn btn-facebook\" ng-click=\"authenticate(\'facebook\')\">Sign in with Facebook</button>\r\n        <button class=\"btn btn-twitter\" ng-click=\"authenticate(\'twitter\')\">Sign in with Twitter</button>\r\n        <button class=\"btn btn-google\" ng-click=\"authenticate(\'google\')\">Sign in with Google</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <p class=\"text-center\">\r\n    Don\'t have an account? <a href=\"/signup\"><strong>Sign up</strong></a>\r\n  </p>\r\n</div>\r\n");
$templateCache.put("partials/profile.html","<div class=\"container\">\n  <div class=\"panel\">\n    <div class=\"panel-body\">\n      <div ng-if=\"messages.error\" role=\"alert\" class=\"alert alert-danger\">\n        <div ng-repeat=\"error in messages.error\">{{error.msg}}</div>\n      </div>\n      <div ng-if=\"messages.success\" role=\"alert\" class=\"alert alert-success\">\n        <div ng-repeat=\"success in messages.success\">{{success.msg}}</div>\n      </div>\n      <form ng-submit=\"updateProfile()\" class=\"form-horizontal\">\n        <legend>Profile Information</legend>\n        <div class=\"form-group\">\n          <label for=\"email\" class=\"col-sm-3\">Email</label>\n          <div class=\"col-sm-7\">\n            <input type=\"email\" name=\"email\" id=\"email\" class=\"form-control\" ng-model=\"profile.email\">\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"name\" class=\"col-sm-3\">Name</label>\n          <div class=\"col-sm-7\">\n            <input type=\"text\" name=\"name\" id=\"name\" class=\"form-control\" ng-model=\"profile.name\">\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"col-sm-3\">Gravatar</label>\n          <div class=\"col-sm-4\">\n            <img ng-src=\"{{profile.gravatar}}\" class=\"profile\" width=\"100\" height=\"100\">\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <div class=\"col-sm-offset-3 col-sm-4\">\n            <button type=\"submit\" class=\"btn btn-success\">Update Profile</button>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n\n<!-- UPDATE PASSWORD -->\n<!--   <div class=\"panel\">\n    <div class=\"panel-body\">\n      <form ng-submit=\"changePassword()\" class=\"form-horizontal\">\n        <legend>Change Password</legend>\n        <div class=\"form-group\">\n          <label for=\"password\" class=\"col-sm-3\">New Password</label>\n          <div class=\"col-sm-7\">\n            <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"profile.password\">\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"confirm\" class=\"col-sm-3\">Confirm Password</label>\n          <div class=\"col-sm-7\">\n            <input type=\"password\" name=\"confirm\" id=\"confirm\" class=\"form-control\" ng-model=\"profile.confirm\">\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <div class=\"col-sm-4 col-sm-offset-3\">\n            <button type=\"submit\" class=\"btn btn-success\">Change Password</button>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div> -->\n\n<!-- GOOGLE, FACEBOOK, TWITTER SIGNUP -->\n<!--   <div class=\"panel\">\n    <div class=\"panel-body\">\n      <div class=\"form-horizontal\">\n        <legend>Linked Accounts</legend>\n        <div class=\"form-group\">\n          <div class=\"col-sm-offset-3 col-sm-4\">\n            <p>\n              <a href=\"#\" ng-click=\"unlink(\'facebook\')\" ng-if=\"currentUser.facebook\" class=\"text-danger\">Unlink your Facebook account</a>\n              <a href=\"#\" ng-click=\"link(\'facebook\')\" ng-if=\"!currentUser.facebook\">Link your Facebook account</a>\n            </p>\n            <p>\n              <a href=\"#\" ng-click=\"unlink(\'twitter\')\" ng-if=\"currentUser.twitter\" class=\"text-danger\">Unlink your Twitter account</a>\n              <a href=\"#\" ng-click=\"link(\'twitter\')\" ng-if=\"!currentUser.twitter\">Link your Twitter account</a>\n            </p>\n            <p>\n              <a href=\"#\" ng-click=\"unlink(\'google\')\" ng-if=\"currentUser.google\" class=\"text-danger\">Unlink your Google account</a>\n              <a href=\"#\" ng-click=\"link(\'google\')\" ng-if=\"!currentUser.google\">Link your Google account</a>\n            </p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div> -->\n  <div class=\"panel\">\n    <div class=\"panel-body\">\n      <form ng-submit=\"deleteAccount()\" class=\"form-horizontal\">\n        <legend>Delete Account</legend>\n        <div class=\"form-group\">\n          <p class=\"col-sm-offset-3 col-sm-9\">You can delete your account, but keep in mind this action is irreversible.</p>\n          <div class=\"col-sm-offset-3 col-sm-9\">\n            <button type=\"submit\" class=\"btn btn-danger\">Delete my account</button>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("partials/reset.html","<div class=\"container\">\r\n  <div class=\"panel\">\r\n    <div class=\"panel-body\">\r\n      <div ng-if=\"messages.error\" role=\"alert\" class=\"alert alert-danger\">\r\n        <div ng-repeat=\"error in messages.error\">{{error.msg}}</div>\r\n      </div>\r\n      <div ng-if=\"messages.success\" role=\"alert\" class=\"alert alert-success\">\r\n        <div ng-repeat=\"success in messages.success\">{{success.msg}}</div>\r\n      </div>\r\n        <form ng-submit=\"resetPassword()\">\r\n          <legend>Reset Password</legend>\r\n          <div class=\"form-group\">\r\n            <label for=\"password\">New Password</label>\r\n            <input type=\"password\" name=\"password\" id=\"password\" placeholder=\"New password\" class=\"form-control\" ng-model=\"user.password\" autofocus>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"confirm\">Confirm Password</label>\r\n            <input type=\"password\" name=\"confirm\" id=\"confirm\" placeholder=\"Confirm password\" class=\"form-control\" ng-model=\"user.confirm\">\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <button type=\"submit\" class=\"btn btn-success\">Change Password</button>\r\n          </div>\r\n        </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n");
$templateCache.put("partials/signup.html","<div class=\"login-container\">\r\n  <div class=\"panel\">\r\n    <div class=\"panel-body\">\r\n      <div ng-if=\"messages.error\" role=\"alert\" class=\"alert alert-danger\">\r\n        <div ng-repeat=\"error in messages.error\">{{error.msg}}</div>\r\n      </div>\r\n      <form ng-submit=\"signup()\">\r\n        <legend>Create an account</legend>\r\n        <div class=\"form-group\">\r\n          <label for=\"name\">Name</label>\r\n          <input type=\"text\" name=\"name\" id=\"name\" placeholder=\"Name\" class=\"form-control\" ng-model=\"user.name\" autofocus>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"email\">Email</label>\r\n          <input type=\"email\" name=\"email\" id=\"email\" placeholder=\"Email\" class=\"form-control\" ng-model=\"user.email\">\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"password\">Password</label>\r\n          <input type=\"password\" name=\"password\" id=\"password\" placeholder=\"Password\" class=\"form-control\" ng-model=\"user.password\">\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <small class=\"text-muted\">By signing up, you agree to the <a href=\"/\">Terms of Service</a>.</small>\r\n        </div>\r\n        <button type=\"submit\" class=\"btn btn-success\">Create an account</button>\r\n      </form>\r\n      <div class=\"hr-title\"><span>or</span></div>\r\n      <div class=\"btn-toolbar text-center\">\r\n        <button class=\"btn btn-facebook\" ng-click=\"authenticate(\'facebook\')\">Sign in with Facebook</button>\r\n        <button class=\"btn btn-twitter\" ng-click=\"authenticate(\'twitter\')\">Sign in with Twitter</button>\r\n        <button class=\"btn btn-google\" ng-click=\"authenticate(\'google\')\">Sign in with Google</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <p class=\"text-center\">\r\n    Already have an account? <a href=\"/login\"><strong>Log in</strong></a>\r\n  </p>\r\n</div>\r\n");
$templateCache.put("partials/trip.html","<h1>{{currentTrip.name}}</h1>\n\n<div id=\'calendar\'></div>\n");
$templateCache.put("partials/tripCreate.html","<div class=\"container\">\n  <div class=\"panel\">\n    <div class=\"panel-body\">\n<!--       <div ng-if=\"messages.error\" role=\"alert\" class=\"alert alert-danger\">\n        <div ng-repeat=\"error in messages.error\">{{error.msg}}</div>\n      </div>\n      <div ng-if=\"messages.success\" role=\"alert\" class=\"alert alert-success\">\n        <div ng-repeat=\"success in messages.success\">{{success.msg}}</div>\n      </div> -->\n      <form ng-submit=\"createTrip()\" class=\"form-horizontal\">\n        <legend>Create Trip</legend>\n        <div class=\"form-group\">\n          <label for=\"email\" class=\"col-sm-3\">Name</label>\n          <div class=\"col-sm-7\">\n            <input type=\"text\" name=\"name\" id=\"name\" class=\"form-control\" ng-model=\"profile.name\">\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"name\" class=\"col-sm-3\"> Description </label>\n          <div class=\"col-sm-7\">\n            <input type=\"text\" name=\"description\" id=\"description\" class=\"form-control\" ng-model=\"profile.description\">\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"name\" class=\"col-sm-3\"> Begin Date </label>\n          <div class=\"col-sm-7\">\n            <input type=\"text\" id=\"datepicker1\" ng-model=\"profile.begin\">\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"name\" class=\"col-sm-3\"> End Date </label>\n          <div class=\"col-sm-7\">\n            <input type=\"text\" id=\"datepicker2\" ng-model=\"profile.end\">\n          </div>\n        </div>\n        <div class=\"form-group\" style=\"overflow: scroll;\">\n          <label class=\"col-sm-3\">Users</label>\n          <div\n          ng-repeat=\"user in allUsers\"\n          style=\"display: inline-block; padding: 10px;\">\n            <img ng-src=\"{{user.gravatar}}\" ng-click=\"addUser(user)\" class=\"tagsCreate\" >\n            <p style=\"text-align: center\">{{user.name}}</p>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"col-sm-3\">Locations</label>\n          <div\n          ng-repeat=\"location in allLocations\"\n          style=\"display: inline-block; padding: 10px;\">\n            <img ng-src=\"{{location.tag}}\" ng-click=\"addLocation(location)\" class=\"tagsCreate\" >\n            <p style=\"text-align: center\">{{location.name}}</p>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <div class=\"col-sm-offset-3 col-sm-4\">\n            <button type=\"submit\" class=\"btn btn-success\">Create Trip!</button>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n");}]);