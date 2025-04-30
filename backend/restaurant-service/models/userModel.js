const { Schema, model } = require("mongoose");

// Define the schema for the User model
const userSchema = new Schema(
    {
        // User's name (required field)
        name: {
            type: String,
            required: true
        },
        // User's email (must be unique and required)
        email: {
            type: String,
            unique: true,
            required: true,
        },
        phone: {
            type: String,
            unique: true,
            required: true,
        },
        // User's password (required field)
        password: { 
            type: String, 
            required: true 
        },
        // User's role (default is 'customer', must be one of the specified values)
        role: {
            type: String,
            required: true,
            default: 'customer',
            enum: ['customer', 'admin', 'delivery','restaurant']
        },
        available:{
            type:Boolean,
            default:true
        },
        verified:{
            type:Boolean,
            default:false
        },
        isDeleted:{
            type:Boolean,
            default:false
        }
    },
    // Automatically add createdAt and updatedAt timestamps
    { timestamps: true }
);

// Create the User model using the schema
const User = model("User", userSchema);

// Export the User model for use in other parts of the application
module.exports = User;