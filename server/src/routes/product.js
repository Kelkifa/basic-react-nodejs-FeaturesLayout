const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

router.use('/products', ProductController.index);

module.exports = router;