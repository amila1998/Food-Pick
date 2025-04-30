const { Schema, model } = require("mongoose");

// Define the schema for the Item model
const itemSchema = new Schema(
    {
        // Item's name (required field)
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        avalable: {
            type: Boolean,
            default: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        price: {
            type: Number,
            required: true
        }
        },
    // Automatically add createdAt and updatedAt timestamps
    { timestamps: true }
);

// Create the Item model using the schema
const Item = model("Item", itemSchema);

// Export the Item model for use in other parts of the application
module.exports = Item;