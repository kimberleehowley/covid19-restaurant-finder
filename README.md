# open-restaurants
Scraping the SF Chronicle's open restaurant list. 

Deployed at: https://open-restaurants.herokuapp.com/restaurants

## Original SF Chronicle project (inspiration)
https://projects.sfchronicle.com/2020/restaurant-delivery/ 

## Getting the data 
At first I thought I would build a web scraper to grab the data, but then I inspected the source code and looked at the links run in the scripts, found [0], and then copy/pasted where I saw the raw data set into a JSON viewer, which I thinen saved as a json file to this repository. 

Next time, I would build a script to automate some of the cleaning up I had to do, e.g. regex to replace some of the special characters before apostrophes. 

Also, the way I've built this as of now, updates are manual, but I would like to automate this to stay up-to-date in realtime with the SF Chronicle's data.  

[0] https://projects.sfchronicle.com/2020/restaurant-delivery/commons-b814dac70f94398e80aa.js?1584771523