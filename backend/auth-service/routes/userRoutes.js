const { Router } = require("express");
const route = Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/admin");
const authCustomer = require("../middlewares/customer");
const authDelivery = require("../middlewares/delivery");
const authRestaurant = require("../middlewares/restaurant");

// Route for user registration
route.post("/register", userController.register);

// Route for user sign-in
route.post("/signin", userController.signing);

// Route to get user information (requires authentication)
route.get('/infor', auth, userController.getUser);

// Route to update user profile (requires authentication)
route.patch('/updateProfile', auth, userController.updateProfile);

// Route to log out the user
route.post('/logout', userController.logout);

// Route to get all users (requires admin authentication)
route.get('/getAllUsers', auth, authAdmin, userController.getAllUsers);

// Route to check if the user is authenticated
route.get('/isAuth', auth, userController.authenticate);

// Route to check if the user is an admin
route.get('/isAdmin', auth, authAdmin, userController.authenticate);

// Route to check if the user is a customer
route.get('/isCustomer', auth, authCustomer, userController.authenticate);

// Route to check if the user is a delivery personnel
route.get('/isDelivery', auth, authDelivery, userController.authenticate);

// Route to check if the user is a restaurant personnel
route.get('/isRestaurant', auth, authRestaurant, userController.authenticate);

module.exports = route;