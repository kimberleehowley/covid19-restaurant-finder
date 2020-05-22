# COVID-19 Bay Area Open Restaurant Finder 
An API that returns data from the San Francisco Chronicle's [directory](https://projects.sfchronicle.com/2020/restaurant-delivery/) of Bay Area restaurants open for delivery and takeout during Shelter in Place.

Deployed on [Heroku](https://open-restaurants.herokuapp.com/restaurants) at: `https://open-restaurants.herokuapp.com/restaurants`.

If you're interested in how and why this was built, or in building a clone for your area, you can read more on [Dev.to](https://dev.to/kimberleejohnson/build-a-twilio-app-to-help-people-support-local-restaurants-during-covid-19-14k5). 

## Endpoints 
### User Routes
| Method | Endpoint       | Access Control | Description                                          |
| ------ | -------------  | -------------- | ---------------------------------------------------- |
| GET    | `/restaurants` | public         | Returns a list of all SF Chronicle-listed restaurants open during shelter in place.|
| GET    | `/restaurants/:zip` | public         |  Returns a list of all listed restaurants open within a provided zip code.| 
| POST   | `/sms` | public         |  Creates a text message (via [Twilio](https://www.twilio.com/try-twilio?promo=avaKmb)) in response to a zip code provided by a user.| 

## Usage 
### From the command line 
Example request for restaurants in the 94117 zip: 
`curl -H "Accept: application/json" "https://open-restaurants.herokuapp.com/restaurants/94117"`

Example response: 
`["1428 Haight Patio Cafe: 415-864-8484\n\n","4505 Burgers & BBQ: 415-231-6993\n\n","Bean Bag Cafe: 415-563-3634\n\n","Berliner Berliner: 415-795-1457\n\n","Bob's on Baker: 415-815-2534\n\n","Che Fico Alimentari: 415-416-6980\n\n","CreoLa: 415-260-3143\n\n","Escape From New York Pizza: 415-668-5577\n\n","Jannah Restaurant: 415-5674400\n\n","Maven: 415-829-7982\n\n","Memphis Minnie's: 415-864-7675\n\n","Namu Stonepot: 415-926-8065\n\n","Nopa: 415-864-8643\n\n","Nopalito: 415-300-0029\n\n","StreetTaco: 415-525-4435\n\n","The Little Chihuahua: 415-255-8225\n\n","The Mill: 415-345-1953\n\n","Zazie: 415-564-5332\n\n"]`

### Running the server locally 
1. Fork and clone this respository. 
2. From your terminal, cd into the cloned repository. 
3. Run `npm install` from the directory.  
4. Run `npm start`. 
5. Check that you see this message in your terminal: ``SF Chronicle restaurant data listening on: http://localhost:${port}! `. 
6. Then, you can visit any of the routes you like via the `localhost` url. 

## Contributing 
There are a ton of ways this project could be better, and [Pull Requests](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) are very welcome.

Here are some ideas to get you started: 
* Add a restaurant that's missing from the list in the json file (#goodfirstissue). 
* We don't currently have any tests set up. We should fix that! 
* Improve the json file to store data in an Object by zip code, instead of looping through an array, to make searching faster. 
* Help set up a real database to make it easier to update the restaurant data. 
* Anything else you can think of! 

Ping [@kimeejohnson](https://twitter.com/kimeejohnson) on Twitter if you have any questions about getting involved. 

## Code of Conduct 
We want to make sure you're comfortable contributing, and we take or Code of Conduct seriously. Have a look at our full [text and reporting instructions](https://github.com/kimberleejohnson/open-restaurants/blob/master/CODE_OF_CONDUCT.md). 

## License 
[MIT](https://choosealicense.com/licenses/mit/)