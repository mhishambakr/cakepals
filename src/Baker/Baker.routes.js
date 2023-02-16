const express = require('express');
const { authMiddleware } = require('../Auth/Auth.middlewares');
const { getBakerDetails } = require('./Baker.controller');
const { validateBakerDetails } = require('./Baker.middlewares');

const router = express.Router();

router.get('/details', authMiddleware, validateBakerDetails, getBakerDetails);

module.exports = router;