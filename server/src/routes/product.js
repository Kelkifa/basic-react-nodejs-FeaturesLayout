const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

router.patch('/restore', ProductController.restore);
router.patch('/delete', ProductController.delete);
router.use('/', ProductController.index);

module.exports = router;