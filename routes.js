// Specifying data returned with specific API calls //

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

// Get restaurants with a user input zip code 

module.exports = router; 