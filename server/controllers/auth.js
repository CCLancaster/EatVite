require('dotenv').config()
let db = require('../models')
let jwt = require('jsonwebtoken')
let router = require('express').Router()
const axios = require('axios')
let cors = require('cors')

// POST /auth/login (find and validate user; send token)
router.post('/login', (req, res) => {
  console.log(req.body)
  // Find the user
  db.User.findOne({ email: req.body.email }).populate('friends', 'name').populate('events')
  .then(user => {
    // Make sure the user exists and has a password
    if (!user || !user.password) {
      return res.status(404).send({ message: 'User not found!' })
    }

    // Good - they exist. Now we check the password
    if (!user.isValidPassword(req.body.password)) {
      return res.status(401).send({ message: 'Invalid credentials' })
    }

    // Good user - issue a token and send it
    let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 8 // 8 hours in seconds
    })
    console.log(`login ${token}, email: ${req.body.email}`)
    res.send({ token })
  })
  .catch(err => {
    console.log('Error in POST /auth/login', err)
    res.status(503).send({ message: 'Database or server-side error' })
  })
})

// POST to /auth/signup (create user; generate token)
router.post('/signup', (req, res) => {
  console.log(req.body)
  // Look up the user (make sure they aren't a duplicate)
  db.User.findOne({ email: req.body.email })
  .then(email => {
    
    // If the user exists, do NOT let them create another account!
    if (email) {
      // Bad - this is signup, they shouldn't already exist
      return res.status(409).send({ message: 'Email address in use!' })
    }

    // Good - the user doesn't exist :)
    db.User.create(req.body)
    .then(newUser => {
      // Cool - I have a user. Now I need to make them a token!
      let token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 8 // 8 hours in seconds
      })
      
      console.log(`new user: ${newUser} token: ${token}`)
      // Send that token
      res.send({ token })
    })
    .catch(err => {
      console.log('Error when creating user', err)
      if (err.name === 'ValidationError') {
        res.status(406).send({ message: 'Validation error!' })
      }
      else {
        res.status(500).send({ message: 'Error creating user' })
      }
    })
  })
  .catch(err => {
    console.log('Error in POST /auth/signup', err)
    res.status(503).send({ message: 'Database or server error' })
  })
})

// NOTE: User should be logged in to access this route
// router.get('/profile', (req, res) => {
//   // The user is logged in, so req.user should have data!
//   if (req.user) {
//     // needs another line of code to "send"/show the profile page
//   res.send({ message: 'Secret message for logged in people ONLY!' })

// } else {
//   res.status(400).send({ message: 'Please log in to see this page' })
//   // just need to make sure that the page doesn't load
// }
// })

// router.get('/profile', function(req, res) {
//   let user = db.User.findById(req.params.id)
//   let friends = []
//   // {friends: [1,2,3]}
//   user.friends.forEach((friendId) => {
//     friends.push(db.User.findById(friendId))
//   })
//   let events = []
//   // {events: [1,2,3]}
//   user.events.forEach((eventId) => {
//     events.push(db.User.findById(eventId))
//   })
//   res.send(({ friends: friends, events: events }))
// })


// // router.get('/addevent', function(req, res) {
// //     res.send('addevent')
// // })

// router.post('/addevent', function(req, res) {
//     db.Event.create(req.body)
//   .then(event => {
//     res.redirect('chooser')
//   }).catch(err=>res.send(err))  
// })


// // router.get('/addfriend', function(req, res) {
// //     res.send('addfriend')
// // })

// router.post('/addfriend', function(req, res) {
//     db.User.findOne(req.user.id)
//   .then(user => {
//     user.friends.push({
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone
//     })
//     user.save().then(() => {
//         res.send({ friends: user.friends})
//     })
//     .catch(err => {
//         console.log('Aww suck', err)
//         res.status(503).send({ message: 'Error saving document' })
//       })
//   })
//   .catch(err => {
//     console.log('Server error', err)
//     res.status(500).send({ message: 'Server error' })
//   })  
// })


// router.get('/chooser', function(req, res) {
//     var yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${req.body}`;
//     axios.get(yelpUrl, {headers: {
//         Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
//     }}).then( function(apiResponse) {
//         var restaurant = apiResponse.data.businesses;
        
      
//         console.log(apiResponse);
//         res.send({ restaurant });
//       }).catch(err => {
//           console.log(err);
//           res.send('error');
//     // res.send('chooser page')
// })
// })

// router.post('/chooser', function(req, res) {
//   db.Restaurant.create({
//     userId: 1,
//   name: req.body.name,
//   rating: String,
//   style: String,
//   address: String,
//   price: String,
//   url: String,
//   phone: String
//   })
// })

// router.post('/chooser', function(req, res) {
//     db.User.findOne(req.user.id)
//     .then(user => {
//       user.restaurant.push({
//         name: 'restaurant',
//         rating: '4.5',
//         style: 'american',
//         address: '3 lower falls rd',
//         price: '$',
//         url: 'restaurant.com',
//         phone: '2078788674'
//       })
//       user.save().then(() => {
//         res.send({ restaurant: user.restaurant})
//       })
//   })
// })

module.exports = router
