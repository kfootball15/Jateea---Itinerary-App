var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var Promise = require('bluebird');
var chalk = require('chalk');
var currentEnvironment = require(path.join(__dirname, '/env'))
var tokenSecret = currentEnvironment.TOKEN_SECRET

// Load environment variables from .env file
dotenv.load();

// Models
var User = require('./models/user');
var models = require('./models');

// Controllers
var UserController = require('./controllers/user');
var ContactController = require('./controllers/contact');

var app = express();

//Fetches the Database URI from the env folder, which determines whether this is a production or development environment
var DATABASE_URI = require(path.join(__dirname, '/env')).DATABASE_URI;

// mongoose.connect(process.env.MONGODB);
var db = mongoose.connect(DATABASE_URI).connection;
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

// Promises returned from mongoose queries/operations are BLUEBIRD promises
mongoose.Promise = Promise;

//require models so that we can more easily access certain models

// Modifying startDbPromise to return the db object to have an access to it when  .then on startDbPromise
var startDbPromise = new Promise(function (resolve, reject) {
    db.on('open', function () {
      resolve(db);
    });
    db.on('error', reject);
});

console.log(chalk.yellow('Opening connection to MongoDB . . .'));
startDbPromise.then(function () {
    console.log(chalk.green('MongoDB connection opened!'));
});

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes'))

app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, tokenSecret);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    User.findById(payload.sub, function(err, user) {
      req.user = user;
      next();
    });
  } else {
    next();
  }
});

app.post('/contact', ContactController.contactPost);
app.put('/account', UserController.ensureAuthenticated, UserController.accountPut);
app.delete('/account', UserController.ensureAuthenticated, UserController.accountDelete);
app.post('/signup', UserController.signupPost);
app.post('/login', UserController.loginPost);
app.post('/forgot', UserController.forgotPost);
app.post('/reset/:token', UserController.resetPost);
app.get('/unlink/:provider', UserController.ensureAuthenticated, UserController.unlink);
app.post('/auth/facebook', UserController.authFacebook);
app.get('/auth/facebook/callback', UserController.authFacebookCallback);
app.post('/auth/google', UserController.authGoogle);
app.get('/auth/google/callback', UserController.authGoogleCallback);
app.post('/auth/twitter', UserController.authTwitter);
app.get('/auth/twitter/callback', UserController.authTwitterCallback);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
