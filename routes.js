const express = require("express");
const router = express.Router();
const model = require("./data-model");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

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
        message: "No restaurants found in your zip code! Please enter another.",
      });
    }
  })
);

// Receive a zip code, and return a list of restaurants
router.post(
  "/sms",
  asyncHandler(async (req, res) => {
    const twiml = new MessagingResponse();

    const zip = req.body.Body;
    const restaurants_in_zip = await model.getRestaurant(zip);

    // If the model returns 1, meaning the body was not a Bay Area zip 
    // Send an error text 
    if (restaurants_in_zip === 1) {
      twiml.message(`Hmmm, I'm not finding any restaurants open in ${req.body.Body}`);
      twiml.message(`Could you please try another five-digit Bay Area zip code?`);
    } 

    // Otherwise, send back the list 
    else if (restaurants_in_zip !== 1) {
      twiml.message(
        `Thanks for eating local❣️ Here are the restaurants open in ${req.body.Body}:`
      );
      twiml.message(restaurants_in_zip.toString());
    }

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  })
);

module.exports = router;
