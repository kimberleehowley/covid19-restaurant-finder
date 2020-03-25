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

  // Filter through restaurants with the given zip code
  const zipRestaurants = data.Restaurants.filter(
    restaurant => restaurant.Zip_Code == zip
  );

  // Return the name and phone number of the restaurant
  return zipRestaurants.map(
    restaurant => `${restaurant.Name}: ${restaurant.Phone}`
  );
}

module.exports = {
  getRestaurants,
  getRestaurant
};
