const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  rating: String,
  style: String,
  address: String,
  price: String,
  url: String,
  phone: String,
  image_url: String
})

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  restaurants: [restaurantSchema]
})

// // Use schema to create model
const Event = mongoose.model('Event', eventSchema);

// // Export User model
module.exports = Event;