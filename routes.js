const express = require("express");
const router = express.Router();
const model = require("./data-model");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

// Load zip codes as a constant 
const validZips = await model.getZips(); 

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

// Display all restaurant names 
router.get(
  "/restaurants",
  asyncHandler(async (req, res) => {
    const restaurants = await model.getRestaurants();
    res.json(restaurants);
  })
);

// Display all restaurants in a zip code 
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

// Receive a zip code, and create a new message based on that zip 
router.post(
  "/sms",
  asyncHandler(async (req, res) => {
    const twiml = new MessagingResponse();

    // Store whatever is sent to the POST request as a variable 
    // Variable named 'zip' here, because user ideally texting a zip 
    const zip = req.body.Body;

    // But, if the zip isn't in our list
    if (!validZips.includes(zip)) {
      // Send an error message 
      twiml.message(`Hmmm, I'm not finding any restaurants open in ${req.body.Body}`);
      twiml.message(`Could you please try another five-digit Bay Area zip code?`);
      // But if it is in our list
    } else {
      // Load the restaurants for that zip code 
      const restaurants_in_zip = await model.getRestaurant(zip);
      const formatted_list = restaurants_in_zip.map(restaurant => `${restaurant}\n\n`).join(""); 
      twiml.message(
        `Thanks for eating local❣️ Here are the restaurants open in ${req.body.Body}:`
      );
      twiml.message(formatted_list.toString());

    }

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  })
);

module.exports = router;
