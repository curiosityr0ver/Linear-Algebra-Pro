const express = require('express');
const router = express.Router();
const matrixController = require('../controllers/matrixController');

// Matrix operation routes
router.post('/add', matrixController.addMatrices);
router.post('/multiply', matrixController.multiplyMatrices);

module.exports = router;

