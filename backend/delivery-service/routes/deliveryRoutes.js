const { Router } = require("express");
const auth = require("../middlewares/auth");
const authRestaurant = require("../middlewares/restaurant");
const restaurantController = require("../controllers/restaurantController");
const route = Router();


route.post("/getDeliveries", auth, authRestaurant, restaurantController.create)



module.exports = route;