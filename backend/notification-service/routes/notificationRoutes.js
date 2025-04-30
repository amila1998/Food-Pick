const { Router } = require("express");
const auth = require("../middlewares/auth");
const authRestaurant = require("../middlewares/restaurant");
const notificationController = require("../controller/notificationController");
const route = Router();


route.post("/oderConform", auth, notificationController.orderConform)



module.exports = route;