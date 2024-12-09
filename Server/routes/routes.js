const express = require('express'); // Import express
const router = express.Router(); // Create a router instance

const userRoutes = require('./user.route.js');
const authRoutes = require('./auth.route.js'); // Ensure authRoutes is imported
const productRoutes = require('./product.route.js');
const cartRoutes = require("./cart.route.js");

const base = '/api/v1';



// Define routes
router.use(`${base}/users`, userRoutes);
router.use(`${base}/auth`, authRoutes);
router.use(`${base}/products`, productRoutes);
router.use(`${base}/carts`, cartRoutes);

module.exports = router;
