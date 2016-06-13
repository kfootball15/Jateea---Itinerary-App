var mongoose = require('mongoose');

var locationSchema = new mongoose.Schema({
    name: String,
    begin: String,
    end: String,
    coordinates: {type: Array},
    tag: String,
});

var Location = mongoose.model('Location', locationSchema);

module.exports = Location;
