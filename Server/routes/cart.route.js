const express = require('express'); // Import express
const { verifyAdmin, verifyToken } = require("../middleware/verifyToken");
const { parser } = require("../utils/cloudinary.js");
const { createCart, updateCart, deleteCart, getCartItem, getAllCartItems } = require('../controllers/cart.controller.js');

const router = express.Router();

router.post("/", verifyToken, createCart);
router.put("/:id", verifyToken, updateCart);
router.delete("/:id", verifyToken, deleteCart);
router.get("/:id", verifyToken, getCartItem);
router.get("/", verifyToken, getAllCartItems);


module.exports = router;
