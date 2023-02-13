const express = require('express');
const { authMiddleware } = require('../Auth/Auth.middlewares');
const { getBakerDetails } = require('./Baker.controller');

const router = express.Router();

router.get('/details', authMiddleware, getBakerDetails);

module.exports = router;