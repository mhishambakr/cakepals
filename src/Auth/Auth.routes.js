const express = require('express');
const { register, login } = require('./Auth.controller');
const { validateRegisteration, validateLogin } = require('./Auth.middlewares');
const router = express.Router();

router.post('/register', validateRegisteration, register);
router.post('/login', validateLogin, login)

module.exports = router;