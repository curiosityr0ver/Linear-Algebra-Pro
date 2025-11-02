import { IMatrix } from '../interfaces/IMatrix';

/**
 * Default Matrix implementation using dense storage
 */
export class Matrix implements IMatrix {
  public readonly data: number[][];
  public readonly rows: number;
  public readonly columns: number;

  constructor(data: number[][]) {
    this.validate(data);
    this.data = data;
    this.rows = data.length;
    this.columns = data.length > 0 ? data[0].length : 0;
  }

  /**
   * Factory method to create a Matrix from a 2D array
   * @param array - 2D array representing the matrix
   * @returns New Matrix instance
   */
  static fromArray(array: number[][]): Matrix {
    return new Matrix(array);
  }

  /**
   * Validates that the input is a valid matrix
   * @param data - Data to validate
   * @throws {Error} - If data is not a valid matrix
   */
  private validate(data: any): void {
    if (!Array.isArray(data)) {
      throw new Error('Matrix data must be an array');
    }

    if (data.length === 0) {
      throw new Error('Matrix cannot be empty');
    }

    if (!Array.isArray(data[0])) {
      throw new Error('Matrix data must be a 2D array');
    }

    const numColumns = data[0].length;
    if (numColumns === 0) {
      throw new Error('Matrix rows cannot be empty');
    }

    // Check all rows have the same length and all elements are numbers
    for (let i = 0; i < data.length; i++) {
      if (!Array.isArray(data[i])) {
        throw new Error('All matrix rows must be arrays');
      }
      
      if (data[i].length !== numColumns) {
        throw new Error('All matrix rows must have the same length');
      }

      for (let j = 0; j < data[i].length; j++) {
        if (typeof data[i][j] !== 'number' || isNaN(data[i][j])) {
          throw new Error('All matrix elements must be valid numbers');
        }
      }
    }
  }

  /**
   * Get the dimensions of the matrix
   * @returns Matrix dimensions
   */
  getDimensions(): { rows: number; columns: number } {
    return {
      rows: this.rows,
      columns: this.columns
    };
  }

  /**
   * Convert matrix to 2D array
   * @returns 2D array representation of the matrix
   */
  toArray(): number[][] {
    return this.data.map(row => [...row]);
  }

  /**
   * Convert matrix to string representation
   * @returns String representation of the matrix
   */
  toString(): string {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

