'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Promise = require('bluebird');
module.exports = router;

console.log("We Got to Users At Least!!!!!")
router.get('/', function(req, res, next) {
    User.find({})
    .then(function(users) {
        res.status(200).send(users);
    })
    .catch(next);
});



