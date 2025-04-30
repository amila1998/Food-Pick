const { Router } = require("express"); // Importing the Router module from Express
const auth = require("../middlewares/auth"); // Middleware for user authentication
const authRestaurant = require("../middlewares/restaurant"); // Middleware for restaurant authentication
const orderController = require("../controllers/orderController"); // Importing the order controller
const route = Router(); // Creating a new router instance

// Route to place an order, requires user authentication
route.post("/placeOrder", auth, orderController.placeOrder);

// Route to get orders for the authenticated user
route.post("/getMyOders", auth, orderController.getMyOrders);

// Route to get all orders for admin, requires both user and restaurant authentication
route.post("/getAllOdersForAdmin", auth, authRestaurant, orderController.getAllOdersForAdmin);

// Route to update the status of an order by ID, requires both user and restaurant authentication
route.post("/updateStatus/:id", auth, authRestaurant, orderController.updateOrder);

module.exports = route; // Exporting the router