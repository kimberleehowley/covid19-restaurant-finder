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
    (restaurant) => restaurant.Zip_Code == zip
  );

  // Check if the user texted something invalid here
  if (!zipRestaurants) {
    errorMessage =
      "Hmmm, not seeing any restaurants open near that zip. Mind trying another five-digit Bay Area zip?";
    return errorMessage;
  } else {
    // Return the name and phone number of the restaurant
    return zipRestaurants.map(
      (restaurant) => `${restaurant.Name}: ${restaurant.Phone}\n\n`
    );
  }
}

module.exports = {
  getRestaurants,
  getRestaurant,
};
