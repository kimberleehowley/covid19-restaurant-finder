// Interacting with the data in our restaurant_data.json file //
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

// Get all restaurants within a zip code
async function getRestaurant(zip) {
  const data = await getRestaurants();
  return zipRestaurants = data.Restaurants.filter(restaurant => restaurant.Zip_Code == zip);
  // Should I create a new object and .push everything there??? 
}

module.exports = {
  getRestaurants,
  getRestaurant
};
