const express = require('express');
const GameController = require('../controllers/GameController');
const router = express.Router();

router.get('/', GameController.index);
router.post('/', GameController.storeImg);

module.exports = router;