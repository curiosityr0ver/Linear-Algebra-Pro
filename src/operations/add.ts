import { IMatrix } from '../interfaces/IMatrix';
import { Matrix } from '../models/Matrix';

/**
 * Add two matrices
 * @param matrixA - First matrix
 * @param matrixB - Second matrix
 * @returns New Matrix instance with the sum
 * @throws {Error} - If matrices have different dimensions
 */
export function add(matrixA: IMatrix, matrixB: IMatrix): IMatrix {
  // Validate dimensions match
  if (matrixA.rows !== matrixB.rows || matrixA.columns !== matrixB.columns) {
    throw new Error(
      `Matrices must have the same dimensions for addition. ` +
      `First matrix: ${matrixA.rows}x${matrixA.columns}, ` +
      `Second matrix: ${matrixB.rows}x${matrixB.columns}`
    );
  }

  // Perform addition
  const result: number[][] = [];
  for (let i = 0; i < matrixA.rows; i++) {
    result[i] = [];
    for (let j = 0; j < matrixA.columns; j++) {
      result[i][j] = matrixA.data[i][j] + matrixB.data[i][j];
    }
  }

  return new Matrix(result);
}

