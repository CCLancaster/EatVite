var express = require('express');
var router = express.Router();
const axios = require('axios'); 

var db = require('../models');



router.get('/profile', function(req, res) {
  let user = db.User.findById(req.params.id)
  let friends = []
  // {friends: [1,2,3]}
  user.friends.forEach((friendId) => {
    friends.push(db.User.findById(friendId))
  })
  let events = []
  // {events: [1,2,3]}
  user.events.forEach((eventId) => {
    events.push(db.User.findById(eventId))
  })
  res.send(({ friends: friends, events: events }))
})

// router.get('/addevent', function(req, res) {
//     res.send('addevent')
// })

router.post('/addevent', function(req, res) {
    db.Event.create(req.body)
  .then(event => {
    //this is were we use the friend name we just entered into the event table to find the user id
    //db.User.findOne()
    res.redirect('chooser')
  }).catch(err=>res.send(err))  
})


router.post('/addfriend', function(req, res) {
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  console.log(req)
    db.User.findById(req.user._id)
  .then(user => {
    console.log(user)
    db.User.findOne({email: req.body.email})
    
    .then(friend => {

      console.log(`friend ${friend}`)
      console.log(`user ${user}`)
      if (!user.friends.includes(friend._id)){
        user.friends.push(friend._id)
      }
      if (!friend.friends.includes(user._id)){
        friend.friends.push(user._id)
      }
      friend.save()
      console.log(`this is mutated user ${user}`)
      user.save().then(() => {
          res.send({ friends: user.friends})
      })
      .catch(err => {
          console.log('Aww suck', err)
          res.status(503).send({ message: 'Error saving document' })
        })
    })
    .catch(err => {
      console.log('failed to find friend', err)
      res.status(503).send({ message: 'failed to find a friend' })
    })

   
  })
  .catch(err => {
    console.log('Server error', err)
    res.status(500).send({ message: 'Server error' })
  })  
})


router.post('/chooser', function(req, res) {
    var yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${req.body.search}`;
    console.log(req.body.search);
    console.log(yelpUrl);
    axios.get(yelpUrl, {headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    }}).then( function(apiResponse) {
        var restaurant = apiResponse.data.businesses;
        
      
        console.log(restaurant);
        res.send({ restaurant });
      }).catch(err => {
          console.log(err);
          res.send('error');
    // res.send(restaurant)
})
})


module.exports = router;