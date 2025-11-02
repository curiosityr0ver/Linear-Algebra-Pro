import { Request, Response } from 'express';
import { Matrix } from '../models/Matrix';
import { add, multiply } from '../operations';

/**
 * Add two matrices
 * POST /api/matrices/add
 * Body: { matrixA: [[...]], matrixB: [[...]] }
 */
export const addMatrices = (req: Request, res: Response): void => {
  try {
    const { matrixA, matrixB } = req.body;

    // Validate input
    if (!matrixA || !matrixB) {
      res.status(400).json({
        success: false,
        error: 'Both matrixA and matrixB are required'
      });
      return;
    }

    if (!Array.isArray(matrixA) || !Array.isArray(matrixB)) {
      res.status(400).json({
        success: false,
        error: 'Both matrixA and matrixB must be arrays'
      });
      return;
    }

    // Create Matrix instances (this will validate the matrices)
    const matA = Matrix.fromArray(matrixA);
    const matB = Matrix.fromArray(matrixB);

    // Perform addition using the operation function
    const result = add(matA, matB);

    res.status(200).json({
      success: true,
      result: result.toArray(),
      operation: 'addition',
      dimensions: result.getDimensions()
    });
  } catch (error) {
    handleMatrixError(error, res);
  }
};

/**
 * Multiply two matrices
 * POST /api/matrices/multiply
 * Body: { matrixA: [[...]], matrixB: [[...]] }
 */
export const multiplyMatrices = (req: Request, res: Response): void => {
  try {
    const { matrixA, matrixB } = req.body;

    // Validate input
    if (!matrixA || !matrixB) {
      res.status(400).json({
        success: false,
        error: 'Both matrixA and matrixB are required'
      });
      return;
    }

    if (!Array.isArray(matrixA) || !Array.isArray(matrixB)) {
      res.status(400).json({
        success: false,
        error: 'Both matrixA and matrixB must be arrays'
      });
      return;
    }

    // Create Matrix instances (this will validate the matrices)
    const matA = Matrix.fromArray(matrixA);
    const matB = Matrix.fromArray(matrixB);

    // Perform multiplication using the operation function
    const result = multiply(matA, matB);

    res.status(200).json({
      success: true,
      result: result.toArray(),
      operation: 'multiplication',
      dimensions: result.getDimensions()
    });
  } catch (error) {
    handleMatrixError(error, res);
  }
};

/**
 * Helper function to handle matrix errors
 */
function handleMatrixError(error: unknown, res: Response): void {
  if (error instanceof Error) {
    const message = error.message;
    
    // Handle validation errors from Matrix class
    if (message.includes('must be an array') || 
        message.includes('cannot be empty') ||
        message.includes('must be a 2D array') ||
        message.includes('must be valid numbers') ||
        message.includes('must have the same length')) {
      res.status(400).json({
        success: false,
        error: message
      });
      return;
    }

    // Handle dimension mismatch errors
    if (message.includes('same dimensions for addition') ||
        message.includes('incompatible dimensions for multiplication')) {
      res.status(400).json({
        success: false,
        error: message
      });
      return;
    }
  }

  // Handle other errors
  res.status(500).json({
    success: false,
    error: error instanceof Error ? error.message : 'An unknown error occurred'
  });
}

