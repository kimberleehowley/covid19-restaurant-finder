// Importing libraries for making http requests and parsing results 
const axios = require('axios'); 
const cheerio = require('cheerio'); 

// Making http request
axios.get('https://projects.sfchronicle.com/2020/restaurant-delivery/')
    .then(res => {
        const $ = cheerio.load(res.data); 

        console.log($('#row-1').first().text()); 
    })