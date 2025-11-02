const Matrix = require('../models/Matrix');

/**
 * Add two matrices
 * POST /api/matrices/add
 * Body: { matrixA: [[...]], matrixB: [[...]] }
 */
exports.addMatrices = (req, res) => {
  try {
    const { matrixA, matrixB } = req.body;

    // Validate input
    if (!matrixA || !matrixB) {
      return res.status(400).json({
        success: false,
        error: 'Both matrixA and matrixB are required'
      });
    }

    if (!Array.isArray(matrixA) || !Array.isArray(matrixB)) {
      return res.status(400).json({
        success: false,
        error: 'Both matrixA and matrixB must be arrays'
      });
    }

    // Create Matrix instances (this will validate the matrices)
    const matA = Matrix.fromArray(matrixA);
    const matB = Matrix.fromArray(matrixB);

    // Perform addition
    const result = matA.add(matB);

    res.status(200).json({
      success: true,
      result: result.toArray(),
      operation: 'addition',
      dimensions: result.getDimensions()
    });
  } catch (error) {
    // Handle validation errors from Matrix class
    if (error.message.includes('must be an array') || 
        error.message.includes('cannot be empty') ||
        error.message.includes('must be a 2D array') ||
        error.message.includes('must be valid numbers') ||
        error.message.includes('must have the same length')) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    // Handle dimension mismatch errors
    if (error.message.includes('same dimensions for addition')) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Multiply two matrices
 * POST /api/matrices/multiply
 * Body: { matrixA: [[...]], matrixB: [[...]] }
 */
exports.multiplyMatrices = (req, res) => {
  try {
    const { matrixA, matrixB } = req.body;

    // Validate input
    if (!matrixA || !matrixB) {
      return res.status(400).json({
        success: false,
        error: 'Both matrixA and matrixB are required'
      });
    }

    if (!Array.isArray(matrixA) || !Array.isArray(matrixB)) {
      return res.status(400).json({
        success: false,
        error: 'Both matrixA and matrixB must be arrays'
      });
    }

    // Create Matrix instances (this will validate the matrices)
    const matA = Matrix.fromArray(matrixA);
    const matB = Matrix.fromArray(matrixB);

    // Perform multiplication
    const result = matA.multiply(matB);

    res.status(200).json({
      success: true,
      result: result.toArray(),
      operation: 'multiplication',
      dimensions: result.getDimensions()
    });
  } catch (error) {
    // Handle validation errors from Matrix class
    if (error.message.includes('must be an array') || 
        error.message.includes('cannot be empty') ||
        error.message.includes('must be a 2D array') ||
        error.message.includes('must be valid numbers') ||
        error.message.includes('must have the same length')) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    // Handle dimension mismatch errors
    if (error.message.includes('incompatible dimensions for multiplication')) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

