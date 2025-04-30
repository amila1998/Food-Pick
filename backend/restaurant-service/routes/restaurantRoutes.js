const { Router } = require("express"); // Importing Router from express
const auth = require("../middlewares/auth"); // Middleware for authentication
const authRestaurant = require("../middlewares/restaurant"); // Middleware for restaurant-specific authentication
const restaurantController = require("../controllers/restaurantController"); // Importing restaurant controller
const authAdmin = require("../middlewares/admin");
const route = Router(); // Creating a new router instance

// Route to get all restaurants (publicly accessible)
route.get("/getAllRestaurants", restaurantController.getAllRestaurants);

// Route to update the availability of a restaurant by ID (requires authentication and restaurant-specific authorization)
route.patch("/:id/availability", auth,authAdmin, restaurantController.availability);

// Route to verify a restaurant by ID (requires authentication and restaurant-specific authorization)
route.patch("/verify/:id", auth,authAdmin, restaurantController.verify);

// Route to create a new item (requires authentication and restaurant-specific authorization)
route.post("/createNewItem", auth, authRestaurant, restaurantController.create);

// Route to update an existing item by ID (requires authentication and restaurant-specific authorization)
route.patch("/updateItem/:id", auth, authRestaurant, restaurantController.update);

// Route to get items owned by the authenticated restaurant (requires authentication and restaurant-specific authorization)
route.get("/getOwnItems", auth, authRestaurant, restaurantController.getOwnItems);

// Route to get all items (publicly accessible)
route.get("/getAllItems", restaurantController.getAll);

// Route to delete an item by ID (requires authentication and restaurant-specific authorization)
route.delete("/deleteItem/:id", auth, authRestaurant, restaurantController.delete);




module.exports = route; // Exporting the router