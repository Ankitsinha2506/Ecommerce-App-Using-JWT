const { register, login } = require('../controllers/auth.controller.js');

const router = require('express').Router();


router.post('/register', register);


// Login route
router.post('/login', login);

module.exports = router;
