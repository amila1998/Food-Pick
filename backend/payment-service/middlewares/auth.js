const axios = require('axios')

// Middleware function to authenticate requests
const auth = async (req, res, next) => {
    try {
        // Retrieve the token from the Authorization header
        const token = req.header("Authorization")
        
        // If no token is provided, return a 403 Forbidden response
        if (!token) return res.status(403).json({ msg: "Invalid Authentication" })

        // Verify the token using the secret key
        const response = await axios.get(process.env.GATEWAY + "/auth/isAuth", {
            headers: { Authorization: token }
        })
        
        const user = response.data
        if (!user) return res.status(403).json({ msg: "Invalid Authentication" })

        req.user = user

        next()

    } catch (err) {
        // Handle any unexpected errors and return a 500 Internal Server Error response
        return res.status(500).json({ msg: err.message })
    }
}

// Export the middleware function for use in other parts of the application
module.exports = auth