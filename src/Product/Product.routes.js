const express = require('express');
const { authMiddleware } = require('../Auth/Auth.middlewares');
const { addProduct, updateProduct, getProductList } = require('./Product.controller');
const { validateProductList, validateProductCreate, validateProductUpdate } = require('./Product.middlewares');

const router = express.Router();

router.get('/list', authMiddleware, validateProductList, getProductList);
router.post('/create', authMiddleware, validateProductCreate, addProduct);
router.patch('/update', authMiddleware, validateProductUpdate, updateProduct);

module.exports = router;