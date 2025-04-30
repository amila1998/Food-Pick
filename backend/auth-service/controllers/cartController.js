const Cart = require("../models/cartModel");
const Item = require("../models/itemModel");
const User = require("../models/userModel");

const cartController = {
  getCart: async (req, res) => {
    try {
      const cart = await Cart.find({
        user: req.user.id,
      }).populate("item");
      res.status(200).json(cart);
    } catch (error) {
      console.log("🚀 ~ getCart:async ~ error:", error);
      res.status(500).json({ msg: error.message });
    }
  },
  deleteCartItemByItemId: async (req, res) => {
    try {
      const id = req.params.id;
      await Cart.findByIdAndDelete(id);
      res.status(200).json("Cart item deleted successfully");
    } catch (error) {
      console.log("🚀 ~ deleteCartItemByItemId: ~ error:", error);
      res.status(500).json({ msg: error.message });
    }
  },
  addToCart: async (req, res) => {
    try {
      const { item_id, qty, amount } = req.body;
      const item = await Item.findById(item_id);
      const cartItem = await Cart.findOne({
        user: req.user.id,
        item: item_id,
      });
      if(cartItem){
        return res.status(200).json({ msg: "Item already in cart" });
      }
      if (!item) {return res.status(404).json({ msg: "Item not found" });}
        const user = await User.findById(req.user.id);
       
      await Cart.create({
        item: item_id,
        user: user._id,
        qty,
        amount,
      });
      res.status(200).json("Cart item added successfully");
    } catch (error) {
      console.log("🚀 ~ addToCart: ~ error:", error);

      res.status(500).json({ msg: error.message });
    }
  },
  updateCartItemByItemId: async (req, res) => {
    try {
      const id = req.params.id;
      const { amount, selected, qty } = req.body;
      const cartItem = await Item.findById(id);
      if (!cartItem) return res.status(404).json({ msg: "Item not found" });
      await Cart.findOneAndUpdate({item:id}, {
        qty,
        amount,
        selected,
      });
      res.status(200).json("Cart item updated successfully");
    } catch (error) {
      console.log("🚀 ~ updateCartItemByItemId: ~ error:", error);
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = cartController;
