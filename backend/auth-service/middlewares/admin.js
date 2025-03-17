const User = require('../models/userModel')

// Middleware to check if the user is an admin
const authAdmin = async (req, res, next) => {
    try {
        // Get user information by their ID from the request object
        const user = await User.findOne({
            _id: req.user.id
        })

        // Check if the user's role is 'admin'
        if (user.role === 'admin') {
            // If the user is an admin, proceed to the next middleware or route handler
            next()
        } else {
            // If the user is not an admin, return a 403 Forbidden response
            return res.status(403).json({ msg: "Admin resources access denied" })
        }
    } catch (err) {
        // Handle any errors that occur and return a 500 Internal Server Error response
        return res.status(500).json({ msg: err.message })
    }
}

// Export the middleware function
module.exports = authAdmin