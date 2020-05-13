// A library that interprets files, like our .json 
const fs = require("fs");

// Returns all restaurants
function getRestaurants() {
  return new Promise((resolve, reject) => {
    fs.readFile("restaurant_data.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const json = JSON.parse(data);
        resolve(json);
      }
    });
  });
}

// Returns all zip codes (so we can compare a user's input)  
async function getZips() {
  // Load all the restaurants
  const data = await getRestaurants();
  return data.Restaurants.map((restaurant) => `${restaurant.Zip_Code}`);
}

// Return all restaurants within a given zip code 
async function getZipRestaurants(zip) {
  // Load all the restaurants
  const data = await getRestaurants();

  // Filter through all restaurants, finding ones in the zip 
  const zipRestaurants = data.Restaurants.filter(
    (restaurant) => restaurant.Zip_Code == zip
  );

  // Return a formatted list 
  return zipRestaurants.map(
    (restaurant) => `${restaurant.Name}: ${restaurant.Phone}\n\n`
  );
}

module.exports = {
  getRestaurants,
  getZips, 
  getZipRestaurants
};