var express = require('express');
var router = express.Router();
const axios = require('axios'); 
var nodemailer = require('nodemailer');
var db = require('../models');



router.get('/profile', function(req, res) {
  db.User.findById(req.user._id).populate('friends').populate('events')
  .then(user => {
    user.friends.forEach(friend=>console.log(`${friend.firstname}`))
    user.events.forEach(event=>console.log(`${event}`))
    console.log(user)
      res.send(user)

    
    // console.log(user.friends)
    // console.log(user.events)
    // db.User.findOne({_id: user.friends[0]})
    // .then(names => {
    //   res.send(names.firstname)
    //   console.log(`Your fluffing friends list includes!: ${names.firstname}`)

    // })
    // console.log(db.User.findById(user.friends[0]))
    // user.friends.forEach((friendId) => {
      // friends.push(db.User.findById(friendId))
    // })
  })
  // let friends = []
  // {friends: [1,2,3]}
  // console.log(user)
  
  // let events = []
  // {events: [1,2,3]}
  // user.events.forEach((eventId) => {
  //   events.push(db.User.findById(eventId))
  // res.send(({ friend: friend.firstname, event: event }))
  })


// router.get('/addevent', function(req, res) {
//     res.send('addevent')
// })

router.post('/addevent', function(req, res) {
  db.Event.create(req.body)
  .then(event => {
    //this is were we use the friend name we just entered into the event table to find the user id
    db.User.updateMany({ _id: { $in: req.body.attendees } }, {$addToSet:{events: event}}).then(updatedMeta=>res.send(event))
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

router.get('/event/:id', function(req, res) {
  console.log(req.params)
  console.log('titties')
  db.Event.find({"_id" : req.params.id})
  .then(event => res.send(event))
  console.log(event)
  .catch(err => res.send({ message: 'Error in getting one event', err}));
})

// TODO:This method needs method-override to work (UPDATE: does not need method override, just needs "PUT" in the method portion of the fetch call-w00t!)
router.put('/event/:id', function(req, res) {
  console.log(req.params.id)
  console.log('butts')
  db.Event.findByIdAndUpdate(req.params.id, { $push: { restaurants: req.body.restaurant} })
  .then(event => {
    console.log(event)
    //will need more details to grab and update for below section of code from event console.log (or setState on Event page?):
    res.send(event)
  })

})

router.post('/sendEatVite', function(req, res) {

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testpeaches@gmail.com',
    pass: 'Qu4rant1nedD3vs'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
})

module.exports = router;