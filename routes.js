const express = require('express');
const router = express.Router();
const model = require('./data-model');
const MessagingResponse = require('twilio').twiml.MessagingResponse; 
const bodyParser = require('body-parser'); 
// const twimlGenerator = require('')

router.use(bodyParser.urlencoded({ extended: false})); 

// Helper function: wraps another function in try/catch and passes errors to middleware
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

// Get all restaurant names
router.get(
  "/restaurants",
  asyncHandler(async (req, res) => {
    const restaurants = await model.getRestaurants();
    res.json(restaurants);
  })
);

// Get all restaurants in a zip code
router.get(
  "/restaurants/:zip",
  asyncHandler(async (req, res) => {
    const restaurants_in_zip = await model.getRestaurant(req.params.zip);
    if (restaurants_in_zip) {
      res.json(restaurants_in_zip);
    } else {
      res.status(404).json({
        message: "No restaurants found in your zip code! Please enter another."
      });
    }
  })
);

// Receive SMS via POST and send to Twilio 
router.post('/sms', asyncHandler(async (req, res) => {
  const twiml = new MessagingResponse(); 

  const zip = req.body.Body; 
  
  const restaurants_in_zip = await model.getRestaurant(zip);

  const formatted_list = restaurants_in_zip.map(restaurant => `${restaurant}\n\n`).join(''); 
  console.log(formatted_list); 

  if (restaurants_in_zip) {
    twiml.message(`There are restaurants open in ${req.body.Body}!`);
    twiml.message(formatted_list.toString()); 
  }

  res.writeHead(200, {'Content-Type': 'text/xml'}); 
  res.end(twiml.toString()); 
}));

module.exports = router;

  // const twiml = new MessagingResponse(); 

  // console.log(req.body.Body); 
  // console.log(req.cookies); 

  // twiml.message(`There are restaurants open in ${req.body.Body}!`);
  // twiml.message(`https://open-restaurants.herokuapp.com/restaurants/${req.body.Body}`);

  // res.writeHead(200, {'Content-Type': 'text/xml'}); 
  // res.end(twiml.toString()); 