/**
 * @fileoverview Defines the routes for user-related operations in the authentication service.
 * This includes user registration, authentication, profile management, and cart operations.
 */

const { Router } = require("express");
const route = Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/admin");
const authCustomer = require("../middlewares/customer");
const authDelivery = require("../middlewares/delivery");
const authRestaurant = require("../middlewares/restaurant");
const cartController = require("../controllers/cartController");

/**
 * POST /register
 * @description Route for user registration.
 * @access Public
 */

/**
 * POST /signin
 * @description Route for user sign-in.
 * @access Public
 */

/**
 * GET /info
 * @description Route to get user information.
 * @access Private (requires authentication)
 */

/**
 * PATCH /updateProfile
 * @description Route to update user profile.
 * @access Private (requires authentication)
 */

/**
 * POST /logout
 * @description Route to log out the user.
 * @access Public
 */

/**
 * GET /getAllUsers
 * @description Route to get all users.
 * @access Private (requires admin authentication)
 */

/**
 * GET /isAuth
 * @description Route to check if the user is authenticated.
 * @access Private (requires authentication)
 */

/**
 * GET /isAdmin
 * @description Route to check if the user is an admin.
 * @access Private (requires admin authentication)
 */

/**
 * GET /isCustomer
 * @description Route to check if the user is a customer.
 * @access Private (requires customer authentication)
 */

/**
 * GET /isDelivery
 * @description Route to check if the user is a delivery personnel.
 * @access Private (requires delivery personnel authentication)
 */

/**
 * GET /isRestaurant
 * @description Route to check if the user is a restaurant personnel.
 * @access Private (requires restaurant personnel authentication)
 */

/**
 * GET /getCart
 * @description Route to get the user's cart.
 * @access Private (requires authentication)
 */

/**
 * DELETE /deleteCartItemByItemId/:id
 * @description Route to delete a cart item by its ID.
 * @access Private (requires authentication)
 * @param {string} id - The ID of the cart item to delete.
 */

/**
 * POST /addToCart
 * @description Route to add an item to the user's cart.
 * @access Private (requires authentication)
 */

/**
 * PATCH /updateCartItemByItemId/:id
 * @description Route to update a cart item by its ID.
 * @access Private (requires authentication)
 * @param {string} id - The ID of the cart item to update.
 */

// Route for user registration
route.post("/register", userController.register);

// Route for user sign-in
route.post("/signin", userController.signing);

// Route to get user information (requires authentication)
route.get('/info', auth, userController.getUser);

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
// Route to get the user's cart (requires authentication)
route.get('/getCart', auth, cartController.getCart);

// Route to delete a cart item by its ID (requires authentication)
route.delete('/deleteCartItemByItemId/:id', auth, cartController.deleteCartItemByItemId);

// Route to add an item to the user's cart (requires authentication)
route.post('/addToCart', auth, cartController.addToCart);

// Route to update a cart item by its ID (requires authentication)
route.patch('/updateCartItemByItemId/:id', auth, cartController.updateCartItemByItemId);

module.exports = route;