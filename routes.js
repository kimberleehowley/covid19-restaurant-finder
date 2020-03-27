const express = require('express');
const router = express.Router();
const model = require('./data-model');
const MessagingResponse = require('twilio').twiml.MessagingResponse; 
// const twimlGenerator = require('')

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
router.post('/sms', (req, res) => {
  const twiml = new MessagingResponse(); 

  twiml.message(`Your zip is ${req.body.Body}!`);

  res.writeHead(200, {'Content-Type': 'text/xml'}); 
  res.end(twiml.toString()); 
});

module.exports = router;
