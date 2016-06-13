var mongoose = require('mongoose');

var tripSchema = new mongoose.Schema({
    name: String,
    description: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    locations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }],
    begin: String,
    end: String
});


var Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
