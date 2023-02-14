const express = require('express');
const { authMiddleware } = require('../Auth/Auth.middlewares');
const { makeOrder } = require('./Order.controller');

const router = express.Router();

router.post('/create', authMiddleware, makeOrder);

module.exports = router;