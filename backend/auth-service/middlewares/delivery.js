const Users = require('../models/userModel')

// Middleware to authorize delivery personnel
const authDelivery = async (req, res, next) => {
    try {
        // Retrieve user information from the database using the user ID from the request
        const user = await Users.findOne({
            _id: req.user.id
        })

        // Check if the user's role is 'delivery'
        if (user.role === 'delivery') {
            // If the user is authorized, proceed to the next middleware or route handler
            next()
        } else {
            // If the user is not authorized, return a 403 Forbidden response
            return res.status(403).json({ msg: "Delivery resources access denied" })
        }
    } catch (err) {
        // Handle any server errors and return a 500 Internal Server Error response
        return res.status(500).json({ msg: err.message })
    }
}

// Export the middleware function
module.exports = authDelivery