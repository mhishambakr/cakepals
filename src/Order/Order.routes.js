const express = require('express');
const { authMiddleware, checkRole } = require('../Auth/Auth.middlewares');
const { makeOrder, updateOrder } = require('./Order.controller');
const { validateOrderCreate, validateOrderUpdate } = require('./Order.middlewares');

const router = express.Router();

router.post('/create', authMiddleware, validateOrderCreate, makeOrder);
router.patch('/update', authMiddleware, validateOrderUpdate, updateOrder);

module.exports = router;