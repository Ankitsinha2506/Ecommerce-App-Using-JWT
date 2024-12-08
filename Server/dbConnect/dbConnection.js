const mongoose = require('mongoose');

// Function to connect to MongoDB
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL); // No additional options required
        console.log("Successfully connected to the database.");
    } catch (err) {
        console.error("Database connection error:", err.message);
    }
};

module.exports = dbConnect;
