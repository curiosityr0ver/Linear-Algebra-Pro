class Matrix {
  constructor(data) {
    this.validate(data);
    this.data = data;
    this.rows = data.length;
    this.columns = data.length > 0 ? data[0].length : 0;
  }

  /**
   * Factory method to create a Matrix from a 2D array
   * @param {Array<Array<number>>} array - 2D array representing the matrix
   * @returns {Matrix} - New Matrix instance
   */
  static fromArray(array) {
    return new Matrix(array);
  }

  /**
   * Validates that the input is a valid matrix
   * @param {*} data - Data to validate
   * @throws {Error} - If data is not a valid matrix
   */
  validate(data) {
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
   * @returns {{rows: number, columns: number}} - Matrix dimensions
   */
  getDimensions() {
    return {
      rows: this.rows,
      columns: this.columns
    };
  }

  /**
   * Add another matrix to this matrix
   * @param {Matrix} otherMatrix - Matrix to add
   * @returns {Matrix} - New Matrix instance with the result
   * @throws {Error} - If matrices have different dimensions
   */
  add(otherMatrix) {
    if (!(otherMatrix instanceof Matrix)) {
      throw new Error('Argument must be a Matrix instance');
    }

    if (this.rows !== otherMatrix.rows || this.columns !== otherMatrix.columns) {
      throw new Error(
        `Matrices must have the same dimensions for addition. ` +
        `This matrix: ${this.rows}x${this.columns}, ` +
        `Other matrix: ${otherMatrix.rows}x${otherMatrix.columns}`
      );
    }

    const result = [];
    for (let i = 0; i < this.rows; i++) {
      result[i] = [];
      for (let j = 0; j < this.columns; j++) {
        result[i][j] = this.data[i][j] + otherMatrix.data[i][j];
      }
    }

    return new Matrix(result);
  }

  /**
   * Multiply this matrix by another matrix
   * @param {Matrix} otherMatrix - Matrix to multiply by
   * @returns {Matrix} - New Matrix instance with the result
   * @throws {Error} - If matrices have incompatible dimensions
   */
  multiply(otherMatrix) {
    if (!(otherMatrix instanceof Matrix)) {
      throw new Error('Argument must be a Matrix instance');
    }

    if (this.columns !== otherMatrix.rows) {
      throw new Error(
        `Matrices have incompatible dimensions for multiplication. ` +
        `This matrix columns (${this.columns}) must equal ` +
        `other matrix rows (${otherMatrix.rows})`
      );
    }

    const result = [];
    for (let i = 0; i < this.rows; i++) {
      result[i] = [];
      for (let j = 0; j < otherMatrix.columns; j++) {
        let sum = 0;
        for (let k = 0; k < this.columns; k++) {
          sum += this.data[i][k] * otherMatrix.data[k][j];
        }
        result[i][j] = sum;
      }
    }

    return new Matrix(result);
  }

  /**
   * Convert matrix to 2D array
   * @returns {Array<Array<number>>} - 2D array representation of the matrix
   */
  toArray() {
    return this.data.map(row => [...row]);
  }

  /**
   * Convert matrix to string representation
   * @returns {string} - String representation of the matrix
   */
  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

module.exports = Matrix;

