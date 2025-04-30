const { update } = require("../../restaurant-service/controllers/restaurantController");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const axios = require("axios");
const orderController = {
    placeOrder: async (req, res) => {
        try {
            const { total, items, deliveryAddress } = req.body;
            const userId = req.user._id;
            const user = await User.findById(userId)
            // Create a new order in the database
            const newOrder = await Order.create({
                user: userId,
                deliveryAddress: deliveryAddress,
                paid: false,
                total: total,
                deliverd: false,
                items: items,
            });

            const token = req.header("Authorization")
        
            // If no token is provided, return a 403 Forbidden response
            if (!token) return res.status(403).json({ msg: "Invalid Authentication" })
    
            // Verify the token using the secret key
            await axios.post(process.env.GATEWAY + "/payment/create",{
                order: newOrder._id,
                total: total,
            }, {
                headers: { Authorization: token }
            })

      

            await Order.findByIdAndUpdate(newOrder._id, {
                paid: true,
            });

            await axios.post(process.env.GATEWAY + "/notifications/oderConform",{
                to: user.email
              }, {
                  headers: { Authorization: token }
              })

            res.status(201).json({ msg: "Order placed successfully" });
          
        } catch (error) {
            console.log("🚀 ~ placeOrder:async ~ error:", error);
            res.status(500).json({ msg: error.message });
        }
    },
    getMyOrders: async (req, res) => {
        try {
            const orders = await Order.find({ user: req.user._id }).populate("items.item");
            res.status(200).json(orders);
        } catch (error) {
            console.log("🚀 ~ getOrders:async ~ error:", error);
            res.status(500).json({ msg: error.message });
        }
    },
    getOrders: async (req, res) => {
        try {
            const orders = await Order.find({ "items.user": req.user._id }).populate("items.item");
            console.log("🚀 ~ getOrders: ~ orders:", orders)
            res.status(200).json(orders);
        } catch (error) {
            console.log("🚀 ~ getOrders:async ~ error:", error);
            res.status(500).json({ msg: error.message });
        }
    },
    updateOrder: async (req, res) => {
        try {
            const id = req.params.id;
            const { deliverd } = req.body;

            // Find the order by ID and update its status
            const order = await Order.findByIdAndUpdate(id, { deliverd:deliverd });
            if (!order) return res.status(404).json({ msg: "Order not found" });

            res.status(200).json({ msg: "Order updated successfully", order });
        } catch (error) {
            console.log("🚀 ~ updateOrder:async ~ error:", error);
            res.status(500).json({ msg: error.message });
        }
    },
    getAllOdersForAdmin: async (req, res) => {
        try {
         
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
}

module.exports = orderController;