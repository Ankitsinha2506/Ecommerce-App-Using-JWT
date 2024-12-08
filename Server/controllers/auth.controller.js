const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Ensure bcrypt is installed


const register = async (req, res) => {
    try {
        // Extract user details from the request body
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists. Please use a different email.',
            });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with the hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        // Exclude the password from the response
        const { password: _, ...userDetails } = newUser.toObject(); // Convert to plain object for destructuring

        // Respond with success message and user data
        res.status(201).json({
            message: 'User created successfully',
            data: userDetails
        });
    } catch (error) {
        // Log the error and send a server error response
        console.error('Error during user registration:', error);
        res.status(500).json({
            message: 'User creation failed',
            error: error.message,
        });
    }
}

const login = async (req, res) => {
    try {
        // Extract login details from the request body
        const { email, password } = req.body;

        // Find the user in the database by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found. Please register first.',
            });
        }

        // Compare the entered password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid email or password.',
            });
        }

        const token = jwt.sign({
            userId: user._id,
            isAdmin: user.isAdmin,

        }, process.env.JWT_KEY, {
            expiresIn: '1d',
        });

        const { password: _, ...userDetails } = user._doc;

        // Respond with a success message and user details
        res.status(200).json({
            message: 'Login successful',
            data: { ...userDetails, token },
        });
    } catch (error) {
        // Log the error and send a server error response
        console.error('Error during user login:', error);
        res.status(500).json({
            message: 'Login failed',
            error: error.message,
        });
    }
}

module.exports = {
    register,
    login,
}
