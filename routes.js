const express = require('express');
const user = require('./controller/userController')
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/register', user.register);
router.post('/login', user.login);
router.post('/logout', user.logout);
router.post('/check-session', user.checkSession);
router.post('/profile', user.editProfile);

module.exports = router;
