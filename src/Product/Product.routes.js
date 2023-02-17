const express = require('express');
const { authMiddleware, checkRole } = require('../Auth/Auth.middlewares');
const { addProduct, updateProduct, getProductList } = require('./Product.controller');
const { validateProductList, validateProductCreate, validateProductUpdate } = require('./Product.middlewares');

const router = express.Router();

router.get('/list', validateProductList, getProductList);
router.post('/create', authMiddleware, checkRole, validateProductCreate, addProduct);
router.patch('/update', authMiddleware, checkRole, validateProductUpdate, updateProduct);

module.exports = router;