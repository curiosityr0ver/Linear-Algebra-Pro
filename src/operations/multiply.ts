import { IMatrix } from '../interfaces/IMatrix';
import { Matrix } from '../models/Matrix';

/**
 * Multiply two matrices
 * @param matrixA - First matrix
 * @param matrixB - Second matrix
 * @returns New Matrix instance with the product
 * @throws {Error} - If matrices have incompatible dimensions
 */
export function multiply(matrixA: IMatrix, matrixB: IMatrix): IMatrix {
  // Validate dimension compatibility
  if (matrixA.columns !== matrixB.rows) {
    throw new Error(
      `Matrices have incompatible dimensions for multiplication. ` +
      `First matrix columns (${matrixA.columns}) must equal ` +
      `second matrix rows (${matrixB.rows})`
    );
  }

  // Perform matrix multiplication
  const result: number[][] = [];
  for (let i = 0; i < matrixA.rows; i++) {
    result[i] = [];
    for (let j = 0; j < matrixB.columns; j++) {
      let sum = 0;
      for (let k = 0; k < matrixA.columns; k++) {
        sum += matrixA.data[i][k] * matrixB.data[k][j];
      }
      result[i][j] = sum;
    }
  }

  return new Matrix(result);
}

