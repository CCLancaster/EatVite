const mongoose = require('mongoose');


// Create User Schema

const restaurantSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  name: String,
  rating: String,
  style: String,
  address: String,
  price: String,
  url: String,
  phone: String
})

// Use schema to create model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// Export User model
module.exports = Restaurant;
