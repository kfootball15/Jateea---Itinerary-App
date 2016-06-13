// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('User')
// anywhere the User model needs to be used.

require('./day.js');
require('./user.js');
require('./events.js');
require('./locations.js');
require('./trips.js');
// require('./product.model.js');
// require('./reviews.model.js');
