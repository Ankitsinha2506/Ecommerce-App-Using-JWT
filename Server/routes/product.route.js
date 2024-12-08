const express = require('express'); // Import express
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProduct
} = require("../controllers/product.controller");
const { verifyAdmin } = require("../middleware/verifyToken");
const { parser } = require("../utils/cloudinary.js")

const router = express.Router();

router.post("/", verifyAdmin, parser.single("image"), createProduct);
router.put("/:id", verifyAdmin, parser.single("image"), updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);
router.get("/:id", getProduct);
router.get("/", getAllProduct);

module.exports = router;
