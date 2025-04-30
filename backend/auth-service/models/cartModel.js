const { Schema, model } = require("mongoose");

// Define the schema for the Cart model
const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        item: {
            type: Schema.Types.ObjectId,
            ref: "Item",
            required: true
        },
        amount:{
            type:Number,
            default:0
        },
        qty:{
            type:Number,
            default:0
        },
        selected:{
            type:Boolean,
            default:false
        },

    },
    // Automatically add createdAt and updatedAt timestamps
    { timestamps: true }
);

// Create the Cart model using the schema
const Cart = model("Cart", cartSchema);

// Export the Cart model for use in other parts of the application
module.exports = Cart;