# open-restaurants
Scraping the SF Chronicle's open restaurant list. 

Deployed at: https://open-restaurants.herokuapp.com/restaurants

## How it works 
A user texts our Twilio Phone Number a five-digit zip code. Our Twilio Phone Number sends an HTTP request including the zip code to a Node.js API deployed on Heroku. The API receives the zip code, looks up the relevant restaurants, and sends a formatted list of them back to the user’s phone number via a POST request. 

To set it all up, you’ll want to have [Twilio](www.twilio.com/referral/avaKmb), [Heroku](https://signup.heroku.com/), and [Github](https://github.com/join) accounts ready. 


## Original SF Chronicle project (inspiration)
https://projects.sfchronicle.com/2020/restaurant-delivery/ 

## Getting the data 
At first, I thought I would build a web scraper to grab the data, but then I inspected the source code and looked at the links run in the scripts, found [0], and then copy/pasted where I saw the raw data set into a JSON viewer, which I thinen saved as a json file to this repository. 

Next time, I would build a script to automate some of the cleaning up I had to do, e.g. regex to replace some of the special characters before apostrophes and other special characters. 

Also, the way I've built this as of now, updates are manual, but I would like to automate this to stay up-to-date in realtime with the SF Chronicle's data.  

[0] https://projects.sfchronicle.com/2020/restaurant-delivery/commons-b814dac70f94398e80aa.js?1584771523