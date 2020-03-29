# open-restaurants
Scraping the SF Chronicle's open restaurant list. 

Deployed at: https://open-restaurants.herokuapp.com/restaurants

## Original SF Chronicle project (inspiration)
https://projects.sfchronicle.com/2020/restaurant-delivery/ 

## Getting the data 
At first I thought I would build a web scraper to grab the data, but then I inspected the source code and looked at the links run in the scripts, found [0], and then copy/pasted where I saw the raw data start into a JSON viewer. 

Next time, I would build a script to automate some of the cleaning up I had to do, e.g. regex to replace some of the special characters before apostrophes. 

Also, the way I've built this as of now, it will be hard to automate updates for when new restaurants are added, a fairly big problem. 

[0] https://projects.sfchronicle.com/2020/restaurant-delivery/commons-b814dac70f94398e80aa.js?1584771523