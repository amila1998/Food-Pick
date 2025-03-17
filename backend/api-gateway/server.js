const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Authentication Middleware to verify JWT tokens
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token required" });

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        req.user = user;
        next();
    });
};

// Dynamic Microservice URLs from .env
const SERVICES = {
    AUTH: process.env.AUTH_SERVICE || "http://localhost:5000",
    RESTAURANTS: process.env.RESTAURANT_SERVICE || "http://localhost:5001",
    ORDERS: process.env.ORDER_SERVICE || "http://localhost:5002",
    DELIVERY: process.env.DELIVERY_SERVICE || "http://localhost:5003",
    PAYMENT: process.env.PAYMENT_SERVICE || "http://localhost:5004",
    NOTIFICATIONS: process.env.NOTIFICATION_SERVICE || "http://localhost:5005",
};

// Helper function to forward requests with Axios
const forwardRequest = async (serviceUrl, req, res) => {
    try {
        const originalUrl = `/api${req.originalUrl}`;
        console.log("🚀 ~ forwardRequest ~ url:", serviceUrl + originalUrl);
        const method = req.method; // GET, POST, PUT, DELETE
        const token = req.headers["authorization"];

        let response;
        const headers = token ? { Authorization: token } : {};

        switch (method) {
            case "GET":
            response = await axios.get(serviceUrl + originalUrl, { headers });
            break;
            case "POST":
            response = await axios.post(serviceUrl + originalUrl, req.body, { headers });
            break;
            case "PUT":
            response = await axios.put(serviceUrl + originalUrl, req.body, { headers });
            break;
            case "DELETE":
            response = await axios.delete(serviceUrl + originalUrl, { headers });
            break;
            default:
            return res.status(400).json("Invalid request method");
        }
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error("API Gateway Error:", error.message);

        let statusCode = error.response?.status || 500;
        let errorMessage = error.response?.data || "Internal Server Error";

        if (error.code === "ECONNREFUSED") {
            statusCode = 503;
            errorMessage = "Service Unavailable - Unable to connect to microservice";
        } else if (error.code === "ETIMEDOUT") {
            statusCode = 504;
            errorMessage = "Gateway Timeout - Microservice did not respond";
        }

        res.status(statusCode).json({ error: errorMessage });
    
    }
};

// **Auth Service Routes**
app.all("/auth/*", (req, res) => forwardRequest(SERVICES.AUTH, req, res));

// **Restaurant Service Routes**
app.all("/restaurants/*", (req, res) => forwardRequest(SERVICES.RESTAURANTS, req, res));

// **Order Service (Requires Authentication)**
app.all("/orders/*", verifyToken, (req, res) => forwardRequest(SERVICES.ORDERS, req, res));

// **Delivery Service (Requires Authentication)**
app.all("/delivery/*", verifyToken, (req, res) => forwardRequest(SERVICES.DELIVERY, req, res));

// **Payment Service (Requires Authentication)**
app.all("/payment/*", verifyToken, (req, res) => forwardRequest(SERVICES.PAYMENT, req, res));

// **Notification Service**
app.all("/notifications/*", (req, res) => forwardRequest(SERVICES.NOTIFICATIONS, req, res));

// Start API Gateway
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
