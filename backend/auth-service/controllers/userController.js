const bcrypt = require("bcryptjs");
const validateEmail = require("../helpers/validateEmail");
const User = require("../models/userModel");
const createToken = require("../helpers/createToken");
const { verify } = require("jsonwebtoken");

const userController = {
    // Register a new user
    register: async (req, res) => {
        try {
            const { name, email, password, role, phone } = req.body;

            // Check if all required fields are provided
            if (!name || !email || !password || !role || !phone)
                return res.status(400).json({ message: "Please fill in all fields." });

            // Validate email format
            if (!validateEmail(email))
                return res
                    .status(400)
                    .json({ message: "Please enter a valid email address." });

            // Check if the email is already registered
            const user = await User.findOne({ email });
            if (user)
                return res
                    .status(400)
                    .json({ message: "This email is already registered in our system." });

            // Ensure password meets minimum length requirement
            if (password.length < 6)
                return res
                    .status(400)
                    .json({ message: "Password must be at least 6 characters." });

            // Hash the password for security
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);

            // Create a new user object
            const newUser = new User({ name, email, password: hashPassword, role, phone });

            // Save the new user to the database
            await newUser.save();

            // Respond with success message
            res.status(201).json({
                message: "User Registration Successful !!!",
                success: true,
            });

        } catch (error) {
            // Handle server errors
            res.status(500).json({
                message: error.message,
                success: false
            });
        }
    },

    // User login/signing
    signing: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if the email exists in the database
            const user = await User.findOne({ email });
            if (!user)
                return res
                    .status(400)
                    .json({ msg: "This email is not registered in our system." });

            // Verify the password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ msg: "This password is incorrect." });

            // Generate a token for the user
            const token = createToken.access({ id: user._id });

            // Respond with success message and token
            res.status(200).json({ msg: "Signing success", token });
        } catch (err) {
            console.log("🚀 ~ file: userController.js ~ line 80 ~ signing: ~ err", err)
            res.status(500).json({ msg: err.message });
        }
    },

    // Get user details
    getUser: async (req, res) => {
        try {
            // Find user by ID and exclude the password field
            const user = await User.findById(req.user.id).select('-password');
            if (!user) return res.status(400).json({ msg: "User does not exist." });

            // Respond with user details
            res.json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // Logout user
    logout: async (req, res) => {
        // Generate a dummy token (optional, for invalidating tokens)
        const token = createToken.access({ id: 'asdjkasdasdhashdkasd' });
        res.status(200).json({ msg: "Signout success" });
    },

    // Update user profile
    updateProfile: async (req, res) => {
        try {
            const { name } = req.body;

            // Find user by ID
            const userD = await User.findById(req.user.id);
            if (!userD) return res.status(404).json({ msg: "Cannot find user." });

            // Update user name
            await User.findOneAndUpdate({ _id: req.user.id }, { name });

            // Respond with success message
            res.status(201).json({ msg: "Update success." });
        } catch (err) {
            console.log("🚀 ~ file: userController.js ~ line 132 ~ updateProfile: ~ err", err)
            res.status(500).json({ msg: err.message });
        }
    },
    verifyProfile: async (req, res) => {
        try {
            const { verified } = req.body;
            const id = req.params.id;

            // Find user by ID
            const userD = await User.findById(id);
            if (!userD) return res.status(404).json({ msg: "Cannot find user." });

            // Update user name
            await User.findOneAndUpdate({ _id: req.user.id }, { name });

            // Respond with success message
            res.status(201).json({ msg: "Update success." });
        } catch (err) {
            console.log("🚀 ~ file: userController.js ~ line 132 ~ updateProfile: ~ err", err)
            res.status(500).json({ msg: err.message });
        }
    },
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            // Retrieve all users from the database
            const users = await User.find();
            res.status(200).json({ users });
        } catch (error) {
            console.log("🚀 ~ file: userController.js ~ line 132 ~ updateProfile: ~ err", error);
            res.status(500).json({ msg: error.message });
        }
    },

    // Authenticate user (placeholder function)
    authenticate: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if(!user) return res.status(403).json({ msg: "Can not find user" });
            res.status(200).json(user);
        } catch (error) {
            console.log("🚀 ~ verifyIsAuth:async ~ error:", error);
            res.status(500).json({ msg: error.message });
        }
    }
};

module.exports = userController;