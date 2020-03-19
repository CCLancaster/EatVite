let bcrypt = require('bcryptjs')
const mongoose = require('mongoose');

// Create User Schema

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: String,
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100
  },
  phone: String,
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});


const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  friends: [userSchema],
  restaurant: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }]
})

// Use bcrypt to hash password
userSchema.pre('save', function (next) {
  if (this.isNew) {
    // New, as opposed to modified
    this.password = bcrypt.hashSync(this.password, 12)
  }

  next()
})

// Ensure that password doesn't get sent with the rest of the data
userSchema.set('toJSON', {
  transform: (doc, user) => {
    delete user.password
    delete user.__v
    return user
  }
})

// Create a helper function to compare the password hashes
userSchema.methods.isValidPassword = function (typedPassword) {
  return bcrypt.compareSync(typedPassword, this.password)
}


// Use schema to create model
// const Event = mongoose.model('Event', eventSchema);



// Use schema to create model
const User = mongoose.model('User', userSchema);

// Export User model
module.exports = User;

// Export User model
// module.exports = Event;
