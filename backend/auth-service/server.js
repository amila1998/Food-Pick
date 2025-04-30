const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Middleware (Ensure correct ordering)

// Enable Cross-Origin Resource Sharing (CORS) for requests from the specified origin
app.use(cors({ origin: [process.env.ORGINS] }));

// Parse incoming JSON requests with a size limit of 50MB
app.use(express.json({ limit: "50mb", strict: false }));

// Parse URL-encoded bodies with a size limit of 50MB
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Add security headers to HTTP responses
app.use(helmet());

// Import and use user-related routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/auth", userRoutes); // All routes under /api/auth will be handled by userRoutes

// Database Connection
// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, // Use the new MongoDB connection string parser
    useUnifiedTopology: true // Use the new server discovery and monitoring engine
}).then(() => {
    console.log("MongoDB Connected!"); // Log success message on successful connection
}).catch((err) => {
    console.error("MongoDB Connection Error:", err); // Log error message if connection fails
    process.exit(1); // Exit the process with a failure code
});

// Start Auth Service
const PORT = process.env.PORT || 5000; // Use the port from environment variables or default to 5000
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`)); // Start the server and log the port
