const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library for creating and verifying JWTs

const createToken = {
    // Method to create an access token
    access: (payload) => {
        // Generate a JWT with the provided payload, secret key, and expiration time of 2 hours
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
    },
};

module.exports = createToken; // Export the createToken object for use in other parts of the application