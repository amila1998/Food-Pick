const Users = require('../models/userModel')

// Middleware to authenticate customer access
const authCustomer = async (req, res, next) => {
    try {
        // Retrieve user information from the database using the user ID from the request
        const user = await Users.findOne({
            _id: req.user.id
        })

        // Check if the user's role is 'customer'
        if (user.role === 'customer') {
            // If the user is a customer, proceed to the next middleware or route handler
            next()
        } else {
            // If the user is not a customer, deny access with a 403 status code
            return res.status(403).json({ msg: "Customer resources access denied" })
        }
    } catch (err) {
        // Handle any errors that occur and respond with a 500 status code
        return res.status(500).json({ msg: err.message })
    }
}

// Export the middleware function
module.exports = authCustomer