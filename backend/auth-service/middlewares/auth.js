const jwt = require('jsonwebtoken')

// Middleware function to authenticate requests
const auth = (req, res, next) => {
    try {
        // Retrieve the token from the Authorization header
        const token = req.header("Authorization")
        
        // If no token is provided, return a 403 Forbidden response
        if (!token) return res.status(403).json({ msg: "Invalid Authentication" })

        // Verify the token using the secret key
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            // If token verification fails, return a 403 Forbidden response
            if (err) return res.status(403).json({ msg: "Invalid Authentication" })

            // Attach the decoded user information to the request object
            req.user = user

            // Proceed to the next middleware or route handler
            next()
        })
    } catch (err) {
        // Handle any unexpected errors and return a 500 Internal Server Error response
        return res.status(500).json({ msg: err.message })
    }
}

// Export the middleware function for use in other parts of the application
module.exports = auth