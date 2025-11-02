const express = require('express');
const router = express.Router();

// Import route modules
const userRoutes = require('./userRoutes');
const matrixRoutes = require('./matrixRoutes');

// Mount routes
router.use('/users', userRoutes);
router.use('/matrices', matrixRoutes);

module.exports = router;
