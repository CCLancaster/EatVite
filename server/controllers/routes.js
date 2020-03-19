var express = require('express');
var router = express.Router();
const axios = require('axios'); 

var db = require('../models');

// router.get('/', function(req, res) {
    
    
//       res.send('home')
// });






// router.get('/profile', function(req, res) {
//     res.send('profile')
// })


// router.get('/addevent', function(req, res) {
//     res.send('addevent')
// })

router.post('/addevent', function(req, res) {
    db.Event.create(req.body)
  .then(event => {
    res.redirect('chooser')
  }).catch(err=>res.send(err))  
})


// router.get('/addfriend', function(req, res) {
//     res.send('addfriend')
// })

router.post('/addfriend', function(req, res) {
    db.User.findOne(req.user.id)
  .then(user => {
    user.friends.push({
        name: 'Fanny',
        email: 'email@email.com',
        phone: '1231231234'
    })
    user.save().then(() => {
        res.send({ friends: user.friends})
    })
    .catch(err => {
        console.log('Aww suck', err)
        res.status(503).send({ message: 'Error saving document' })
      })
  })
  .catch(err => {
    console.log('Server error', err)
    res.status(500).send({ message: 'Server error' })
  })  
})


router.get('/chooser', function(req, res) {
    var yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${req.body}`;
    axios.get(yelpUrl, {headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    }}).then( function(apiResponse) {
        var restaurant = apiResponse.data.businesses;
        
      
        console.log(apiResponse);
        res.send({ restaurant });
      }).catch(err => {
          console.log(err);
          res.send('error');
    res.send('chooser page')
})
})

router.post('/chooser', function(req, res) {
    db.User.findOne(req.user.id)
  .then(user => {
      user.restaurant.push({
        name: 'restaurant',
        rating: '4.5',
        style: 'american',
        address: '3 lower falls rd',
        price: '$',
        url: 'restaurant.com',
        phone: '2078788674'
      })
      user.save().then(() => {
        res.send({ restaurant: user.restaurant})
      })
  })

    res.send('chose restauants')
})

module.exports = router;