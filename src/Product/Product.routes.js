const express = require('express');
const { authMiddleware } = require('../Auth/Auth.middlewares');
const { addProduct, updateProduct, getProductList } = require('./Product.controller');

const router = express.Router();

router.get('/list', authMiddleware, getProductList);
router.post('/create', authMiddleware, addProduct);
router.patch('/update', authMiddleware, updateProduct);

module.exports = router;