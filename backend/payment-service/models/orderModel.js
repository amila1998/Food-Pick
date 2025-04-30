const { Schema, model } = require("mongoose");


const paymentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        paid: {
            type: Boolean,
            required: true
        },
        deliveryAddress: {
            type: Text,
            required: true
        },
        items: [
            {
            type: Schema.Types.ObjectId,
            ref: "Item",
            required: true
            }
        ],

        },
    // Automatically add createdAt and updatedAt timestamps
    { timestamps: true }
);

// Create the Item model using the schema
const Order = model("Order", paymentSchema);

// Export the Item model for use in other parts of the application
module.exports = Order;