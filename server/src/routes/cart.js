const express = require('express');
const CartController = require('../controllers/CartController');
const router = express.Router();

router.get('/', CartController.index);

module.exports = router;