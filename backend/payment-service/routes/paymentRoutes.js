const { Router } = require("express"); // Import the Router class from Express
const auth = require("../middlewares/auth"); // Import the authentication middleware
const paymentController = require("../controllers/paymentController"); // Import the payment controller
const route = Router(); // Create a new router instance

// Route to process a payment, protected by authentication middleware
route.post("/create", auth, paymentController.processPayment);

// Route to get all payments for the authenticated user
route.post("/getAllMyPayments", auth, paymentController.getAllMyPayments);

// Route to get all payments for admin users, protected by authentication middleware
route.post("/getAllPaymentsForAdmin", auth, paymentController.getAllPaymentsForAdmin);

module.exports = route; // Export the router to be used in other parts of the application