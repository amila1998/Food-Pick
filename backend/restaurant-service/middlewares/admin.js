// Middleware to authorize delivery personnel
const authAdmin = async (req, res, next) => {
    try {

        // Check if the user's role is 'delivery'
        if (req.user.role === 'admin') {
            // If the user is authorized, proceed to the next middleware or route handler
            next()
        } else {
            // If the user is not authorized, return a 403 Forbidden response
            return res.status(403).json({ msg: "Admin resources access denied" })
        }
    } catch (err) {
        // Handle any server errors and return a 500 Internal Server Error response
        return res.status(500).json({ msg: err.message })
    }
}

// Export the middleware function
module.exports = authAdmin