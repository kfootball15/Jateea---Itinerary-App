var mongoose = require('mongoose');

var daySchema = new mongoose.Schema({
  date: String,
  location: {type : mongoose.Schema.Types.ObjectId, ref: 'Location'},
  events: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

var Day = mongoose.model('Day', daySchema);

module.exports = Day;
