const Payment = require("../models/paymentModel");

const paymentController = {
    processPayment: async (req, res) => {
        try {
            const { total, order } = req.body;
            const userId = req.user._id;

            const payment = await Payment.create({
                user: userId,
                order: order,
                total: total,
            });
            res.status(201).json({ msg: "Payment processed successfully" });

        } catch (error) {
            console.log("🚀 ~ processPayment:async ~ error:", error);
            res.status(500).json({ msg: error.message });
            
        }
    },
    getAllMyPayments: async (req, res) => {
        try {
     
            res.status(200)

        } catch (error) {
            res.status(500).json({ msg: error.message });
            
        }
    },
    getAllPaymentsForAdmin: async (req, res) => {
        try {
      
            res.status(200)

        } catch (error) {
            res.status(500).json({ msg: error.message });
            
        }
    }
}

module.exports = paymentController;