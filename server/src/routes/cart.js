const express = require('express');
const CartController = require('../controllers/CartController');
const router = express.Router();

router.post('/add', CartController.add);
router.get('/', CartController.index);

module.exports = router;