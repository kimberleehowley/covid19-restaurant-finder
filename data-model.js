const fs = require("fs");

// Return all restaurants
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

// Return all zip codes 
async function getZips() {
  const data = await getRestaurants();
  return data.Restaurants.map((restaurant) => `${restaurant.Zip_Code}`);
}

// Get all restaurants within a zip code
async function getRestaurant(zip) {
  const data = await getRestaurants();

  // Filter through the data looking for restaurants with a given zip 
  const zipRestaurants = data.Restaurants.filter(
    (restaurant) => restaurant.Zip_Code == zip
  );

  // And return the name and phone number of each
  // Add a join to get rid of the commas 
  return zipRestaurants.map(
    (restaurant) => `${restaurant.Name}: ${restaurant.Phone});
}

module.exports = {
  getRestaurants,
  getZips, 
  getRestaurant
};
