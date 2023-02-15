const express = require('express');
const { authMiddleware } = require('../Auth/Auth.middlewares');
const { makeOrder, updateOrder } = require('./Order.controller');

const router = express.Router();

router.post('/create', authMiddleware, makeOrder);
router.patch('/update', authMiddleware, updateOrder);

module.exports = router;