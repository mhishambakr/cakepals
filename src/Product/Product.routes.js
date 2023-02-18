const express = require('express');
const { authMiddleware, checkRole } = require('../Auth/Auth.middlewares');
const { addProduct, updateProduct, getProductList, removeProduct, restoreProduct } = require('./Product.controller');
const { validateProductList, validateProductCreate, validateProductUpdate, validateProductDeletionAndRestoration } = require('./Product.middlewares');

const router = express.Router();

router.get('/list', validateProductList, getProductList);
router.post('/create', authMiddleware, checkRole, validateProductCreate, addProduct);
router.patch('/update', authMiddleware, checkRole, validateProductUpdate, updateProduct);
router.delete('/delete', authMiddleware, checkRole, validateProductDeletionAndRestoration, removeProduct);
router.patch('/restore', authMiddleware, checkRole, validateProductDeletionAndRestoration, restoreProduct);


module.exports = router;