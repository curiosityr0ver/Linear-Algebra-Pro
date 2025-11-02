/**
 * Interface representing a matrix data structure
 * Allows for different implementations (DenseMatrix, SparseMatrix, etc.)
 */
export interface IMatrix {
  readonly data: number[][];
  readonly rows: number;
  readonly columns: number;

  /**
   * Get the dimensions of the matrix
   * @returns Object with rows and columns
   */
  getDimensions(): { rows: number; columns: number };

  /**
   * Convert matrix to 2D array representation
   * @returns 2D array of numbers
   */
  toArray(): number[][];

  /**
   * Convert matrix to string representation
   * @returns String representation of the matrix
   */
  toString(): string;
}

/**
 * Factory function type for creating Matrix instances
 */
export interface IMatrixFactory {
  fromArray(array: number[][]): IMatrix;
}

