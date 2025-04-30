const { Schema, model } = require("mongoose");


const orderSchema = new Schema(
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
            default: false,
            required: true
        },
        deliveryAddress: {
            type: String,
            required: true
        },
        deliverd:{
            type: Boolean,
            default: false,
            required: false  
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
const Order = model("Order", orderSchema);

// Export the Item model for use in other parts of the application
module.exports = Order;