const Item = require("../models/itemModel");
const User = require("../models/userModel");
const restaurantController = {
  create: async (req, res) => {
    try {
      const { name, image, description, avalable, price } = req.body;

      if (!name || !image || !description || avalable === undefined || !price) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      // Create a new user object
      const newItem = new Item({
        name,
        image,
        description,
        avalable,
        user: req.user._id,
        price,
      });

      // Save the new user to the database
      await newItem.save();

      res.status(201).json({ msg: "Item created successfully" });
    } catch (error) {
      console.log("🚀 ~ create:async ~ error:", error);
      res.status(500).json({ msg: error.message });
    }
  },
  update: async (req, res) => {
    try {
      let id = req.params.id;
      const item = await Item.findById(id);
      if (!item) {
        return res.status(404).json({ msg: "Item not found" });
      }

      const { name, image, description, avalable, price } = req.body;

      if (!name || !image || !description || avalable === undefined || !price) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      await Item.findByIdAndUpdate(
        { _id: id },
        { name, image, description, avalable, price }
      );

      res.status(201).json({ msg: "Item updated successfully" });
    } catch (error) {
      console.log("🚀 ~ update:async ~ error:", error);
      res.status(500).json({ msg: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      let id = req.params.id;
      const item = await Item.findById(id);
      if (!item) {
        return res.status(404).json({ msg: "Item not found" });
      }

      await Item.findByIdAndUpdate({ _id: id }, { isDeleted: true });
    } catch (error) {
      console.log("🚀 ~ delete: ~ error:", error);
      res.status(500).json({ msg: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const name = req.query.name;
      const query = name
        ? { name: { $regex: name, $options: "i" }, isDeleted: false }
        : { isDeleted: false };
      const items = await Item.find(query).populate("user");
      res.status(200).json(items);
    } catch (error) {
      console.log("🚀 ~ getAll:async ~ error:", error);
      res.status(500).json({ msg: error.message });
    }
  },
  getOwnItems: async (req, res) => {
    try {
      const items = await Item.find({
        isDeleted: false,
        user: req.user._id,
      }).populate("user");
      res.status(200).json(items);
    } catch (error) {
      console.log("🚀 ~ getOwnItems error:", error);
      res.status(500).json({ msg: error.message });
    }
  },
  getAllRestaurants: async (req, res) => {
    try {
      const users = User.find({isDeleted:false, role:'restaurant'})
      res.status(200).json(users);
    } catch (error) {
      console.log("🚀 ~ getAllRestaurants:async ~ error:", error);
      res.status(500).json({ msg: error.message });
    }
  },
  availability: async (req, res) => {
    try {

      await User.findByIdAndUpdate(req.params.id,{available:req.body.available})
      res.status(200).json("Update completed");
    } catch (error) {
      console.log("🚀 ~ availability:async ~ error:", error);
      res.status(500).json({ msg: error.message });
    }
  },
  verify: async (req, res) => {
    try {
      
      await User.findByIdAndUpdate(req.params.id,{verified:req.body.verified})
      res.status(200).json("Update completed");
    } catch (error) {
      console.log("🚀 ~ verify:async ~ error:", error);
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = restaurantController;
