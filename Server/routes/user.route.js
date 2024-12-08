const express = require('express');
const { verifyToken, verifyAdmin } = require('../middleware/verifyToken');
const { updateUser, deleteUser, getAdmin, getAllUsers, getUserStats } = require('../controllers/user.controller');
const router = express.Router();

// Test route
router.get('/get-users', (req, res) => {
    res.json({ message: 'Users fetched successfully' });
});

router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyAdmin, deleteUser);
router.get("/get-admin/:id", verifyAdmin, getAdmin);
router.get("/", verifyToken, getAllUsers);
router.get("/stats", verifyAdmin, getUserStats);

module.exports = router;
