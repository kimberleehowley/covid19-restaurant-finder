// Defining what data will be returned //

const express = require("express");
const router = express.Router();
const model = require("./data-model");

// Helper function that wraps another function in try/catch and passes errors to middleware
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
      res
        .status(404)
        .json({
          message: "No restaurants found in your zip code! Please enter another zip."
        });
    }
  })
);

module.exports = router;
