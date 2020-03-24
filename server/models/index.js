// 'use strict';
const mongoose = require('mongoose');

// Connect to Mongo database
mongoose.connect(
  process.env.MONGO_URL || 'mongodb://localhost:27017/eatvite',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
);
let db = mongoose.connection;
db.once('open', () => {
  console.log(`🔗 Connected to MongoDB on ${db.host}: ${db.port}`);
});
db.on('error', err => {
  console.log(`🐻 Bad news bears! MongoDB error:\n${err}`);
});

// Require your other models, and export them
// NOTE: Your files can have multiple module.exports statements!
// Make sure to export both your Museum and Piece models!
module.exports.User = require('./user');
module.exports.Event = require('./event');

