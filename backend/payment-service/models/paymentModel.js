const { Schema, model } = require("mongoose");


const paymentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        order: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },
        total: {
            type: Number,
            required: true
        }
        },
    // Automatically add createdAt and updatedAt timestamps
    { timestamps: true }
);

// Create the Item model using the schema
const Payment = model("Payment", paymentSchema);

// Export the Item model for use in other parts of the application
module.exports = Payment;