// Setting up our server 
const express = require('express'); 
const fs = require('fs'); 

// Dependency to make http requests
const request = require('request'); 
// "" to parse data 
const cheerio = require('cheerio'); 

//Creating the app 
const app = express(); 

// Route for scraping the website 
app.get('/scrape', function(req, res) {
    // TBD
}); 

// Setting up our port 
app.listen('8081'); 

console.log('Up and running over on 8081!'); 

exports = module.exports = app; 

