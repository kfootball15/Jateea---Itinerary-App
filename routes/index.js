'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/trips', require('./trips'));
router.use('/locations', require('./locations'));
router.use('/days', require('./days'));
router.use('/events', require('./events'));
router.use('/users', require('./users'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
