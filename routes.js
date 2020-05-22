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

// Greeting
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const restaurants = await model.getRestaurants();
    res.json({message: "Welcome! Add /restaurants to the end of this url to see Bay Area restaurants. A zip after that will show you some by zip."});
  })
);

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
    const restaurants_in_zip = await model.getZipRestaurants(req.params.zip);
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

    // Store the body of the user's text as a variable 
    const zip = req.body.Body;

    // Load zip codes 
    const validZips = await model.getZips(); 

    // If the zip is not in our valid zip codes list, return an error 
    if (!validZips.includes(zip)) {
      twiml.message(`Hmmm, I'm not finding any restaurants open in ${req.body.Body}`);
      twiml.message(`Could you please try another five-digit Bay Area zip code?`);
    }

    // But if it is, return the list of restaurants 
    else {
      const restaurants_in_zip = await model.getZipRestaurants(zip);
      twiml.message(
        `Thanks for eating local❣️ Here are the restaurants open in ${req.body.Body}:`
      );
      // Formatting: remove the commas in the returned array with an empty space 
      twiml.message(restaurants_in_zip.join("").toString());
    }

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  })
);

module.exports = router;