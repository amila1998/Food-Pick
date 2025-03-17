const { Router } = require("express");
const auth = require("../middlewares/auth");
const authRestaurant = require("../middlewares/restaurant");
const restaurantController = require("../controllers/restaurantController");
const route = Router();


route.post("/create", auth, authRestaurant, restaurantController.create)
route.put("/update/:id",auth, authRestaurant, restaurantController.update)
route.get("/getOwnItems",auth, authRestaurant, restaurantController.getOwnItems)
route.get("/getAll", restaurantController.getAll)
route.delete("/delete/:id",auth, authRestaurant, restaurantController.delete)


module.exports = route;