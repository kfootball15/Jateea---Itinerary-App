var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    tag: String,
    time: Number,
    type: {
        type: String,
        enum: ['Activity', 'Food'],
        default: 'Activity'
    },
    //Store this as an object with an x and y coordatinate: {name:, x:..., y:...}
    coordinates: {type: Array},
    priority: {
        type: Number,
        enum: [1,2,3]
    },
    //In 15 minute Increments, written like '130' for 1.5 hours
    duration: Number,
    keywords: [String],
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
