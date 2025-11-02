const Matrix = require('../models/Matrix');

describe('Matrix Class', () => {
  describe('Constructor and Validation', () => {
    test('should create a valid matrix from 2D array', () => {
      const data = [[1, 2], [3, 4]];
      const matrix = new Matrix(data);
      expect(matrix.rows).toBe(2);
      expect(matrix.columns).toBe(2);
      expect(matrix.data).toEqual(data);
    });

    test('should throw error for non-array input', () => {
      expect(() => new Matrix('not an array')).toThrow('Matrix data must be an array');
      expect(() => new Matrix(123)).toThrow('Matrix data must be an array');
      expect(() => new Matrix(null)).toThrow('Matrix data must be an array');
    });

    test('should throw error for empty array', () => {
      expect(() => new Matrix([])).toThrow('Matrix cannot be empty');
    });

    test('should throw error for 1D array', () => {
      expect(() => new Matrix([1, 2, 3])).toThrow('Matrix data must be a 2D array');
    });

    test('should throw error for empty rows', () => {
      expect(() => new Matrix([[]])).toThrow('Matrix rows cannot be empty');
    });

    test('should throw error for rows with different lengths', () => {
      expect(() => new Matrix([[1, 2], [3]])).toThrow('All matrix rows must have the same length');
    });

    test('should throw error for non-numeric values', () => {
      expect(() => new Matrix([[1, 2], [3, 'a']])).toThrow('All matrix elements must be valid numbers');
      expect(() => new Matrix([[1, 2], [3, NaN]])).toThrow('All matrix elements must be valid numbers');
      expect(() => new Matrix([[1, 2], [3, null]])).toThrow('All matrix elements must be valid numbers');
    });

    test('should handle single row matrix', () => {
      const matrix = new Matrix([[1, 2, 3]]);
      expect(matrix.rows).toBe(1);
      expect(matrix.columns).toBe(3);
    });

    test('should handle single column matrix', () => {
      const matrix = new Matrix([[1], [2], [3]]);
      expect(matrix.rows).toBe(3);
      expect(matrix.columns).toBe(1);
    });

    test('should handle floating point numbers', () => {
      const matrix = new Matrix([[1.5, 2.7], [3.1, 4.9]]);
      expect(matrix.data[0][0]).toBe(1.5);
      expect(matrix.data[1][1]).toBe(4.9);
    });
  });

  describe('fromArray Factory Method', () => {
    test('should create matrix using fromArray', () => {
      const matrix = Matrix.fromArray([[1, 2], [3, 4]]);
      expect(matrix.rows).toBe(2);
      expect(matrix.columns).toBe(2);
      expect(matrix.data).toEqual([[1, 2], [3, 4]]);
    });

    test('should throw error if fromArray receives invalid input', () => {
      expect(() => Matrix.fromArray('invalid')).toThrow('Matrix data must be an array');
    });
  });

  describe('getDimensions', () => {
    test('should return correct dimensions', () => {
      const matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
      const dimensions = matrix.getDimensions();
      expect(dimensions.rows).toBe(2);
      expect(dimensions.columns).toBe(3);
    });
  });

  describe('Matrix Addition', () => {
    test('should add two matrices of same dimensions', () => {
      const matrixA = new Matrix([[1, 2], [3, 4]]);
      const matrixB = new Matrix([[5, 6], [7, 8]]);
      const result = matrixA.add(matrixB);
      
      expect(result.rows).toBe(2);
      expect(result.columns).toBe(2);
      expect(result.data).toEqual([[6, 8], [10, 12]]);
    });

    test('should add matrices with negative numbers', () => {
      const matrixA = new Matrix([[1, -2], [-3, 4]]);
      const matrixB = new Matrix([[5, -6], [-7, 8]]);
      const result = matrixA.add(matrixB);
      
      expect(result.data).toEqual([[6, -8], [-10, 12]]);
    });

    test('should add matrices with floating point numbers', () => {
      const matrixA = new Matrix([[1.5, 2.3], [3.1, 4.7]]);
      const matrixB = new Matrix([[0.5, 1.7], [2.9, 3.3]]);
      const result = matrixA.add(matrixB);
      
      expect(result.data[0][0]).toBeCloseTo(2.0);
      expect(result.data[0][1]).toBeCloseTo(4.0);
      expect(result.data[1][0]).toBeCloseTo(6.0);
      expect(result.data[1][1]).toBeCloseTo(8.0);
    });

    test('should throw error for different row dimensions', () => {
      const matrixA = new Matrix([[1, 2], [3, 4]]);
      const matrixB = new Matrix([[5, 6]]);
      
      expect(() => matrixA.add(matrixB)).toThrow('Matrices must have the same dimensions for addition');
    });

    test('should throw error for different column dimensions', () => {
      const matrixA = new Matrix([[1, 2], [3, 4]]);
      const matrixB = new Matrix([[5, 6, 7], [8, 9, 10]]);
      
      expect(() => matrixA.add(matrixB)).toThrow('Matrices must have the same dimensions for addition');
    });

    test('should throw error for non-Matrix argument', () => {
      const matrixA = new Matrix([[1, 2], [3, 4]]);
      
      expect(() => matrixA.add([[5, 6], [7, 8]])).toThrow('Argument must be a Matrix instance');
      expect(() => matrixA.add('not a matrix')).toThrow('Argument must be a Matrix instance');
    });

    test('should add 1x1 matrices', () => {
      const matrixA = new Matrix([[5]]);
      const matrixB = new Matrix([[3]]);
      const result = matrixA.add(matrixB);
      
      expect(result.data).toEqual([[8]]);
    });

    test('should not mutate original matrices', () => {
      const matrixA = new Matrix([[1, 2], [3, 4]]);
      const matrixB = new Matrix([[5, 6], [7, 8]]);
      const originalA = JSON.stringify(matrixA.data);
      const originalB = JSON.stringify(matrixB.data);
      
      matrixA.add(matrixB);
      
      expect(JSON.stringify(matrixA.data)).toBe(originalA);
      expect(JSON.stringify(matrixB.data)).toBe(originalB);
    });
  });

  describe('Matrix Multiplication', () => {
    test('should multiply two compatible matrices', () => {
      const matrixA = new Matrix([[1, 2], [3, 4]]);
      const matrixB = new Matrix([[5, 6], [7, 8]]);
      const result = matrixA.multiply(matrixB);
      
      expect(result.rows).toBe(2);
      expect(result.columns).toBe(2);
      // [1*5+2*7, 1*6+2*8] = [19, 22]
      // [3*5+4*7, 3*6+4*8] = [43, 50]
      expect(result.data).toEqual([[19, 22], [43, 50]]);
    });

    test('should multiply matrices with different dimensions (compatible)', () => {
      const matrixA = new Matrix([[1, 2, 3]]); // 1x3
      const matrixB = new Matrix([[4], [5], [6]]); // 3x1
      const result = matrixA.multiply(matrixB);
      
      expect(result.rows).toBe(1);
      expect(result.columns).toBe(1);
      // 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32
      expect(result.data).toEqual([[32]]);
    });

    test('should multiply 3x2 by 2x3 to get 3x3', () => {
      const matrixA = new Matrix([[1, 2], [3, 4], [5, 6]]);
      const matrixB = new Matrix([[7, 8, 9], [10, 11, 12]]);
      const result = matrixA.multiply(matrixB);
      
      expect(result.rows).toBe(3);
      expect(result.columns).toBe(3);
      // First row: [1*7+2*10, 1*8+2*11, 1*9+2*12] = [27, 30, 33]
      expect(result.data[0]).toEqual([27, 30, 33]);
    });

    test('should throw error for incompatible dimensions', () => {
      const matrixA = new Matrix([[1, 2], [3, 4]]); // 2x2
      const matrixB = new Matrix([[5, 6, 7], [8, 9, 10], [11, 12, 13]]); // 3x3
      
      expect(() => matrixA.multiply(matrixB)).toThrow('Matrices have incompatible dimensions for multiplication');
    });

    test('should throw error when first matrix columns != second matrix rows', () => {
      const matrixA = new Matrix([[1, 2, 3]]); // 1x3
      const matrixB = new Matrix([[4, 5], [6, 7]]); // 2x2
      
      expect(() => matrixA.multiply(matrixB)).toThrow('Matrices have incompatible dimensions for multiplication');
    });

    test('should throw error for non-Matrix argument', () => {
      const matrixA = new Matrix([[1, 2], [3, 4]]);
      
      expect(() => matrixA.multiply([[5, 6], [7, 8]])).toThrow('Argument must be a Matrix instance');
    });

    test('should multiply with negative numbers', () => {
      const matrixA = new Matrix([[1, -2], [-3, 4]]);
      const matrixB = new Matrix([[5, 6], [-7, 8]]);
      const result = matrixA.multiply(matrixB);
      
      // [1*5+(-2)*(-7), 1*6+(-2)*8] = [19, -10]
      // [(-3)*5+4*(-7), (-3)*6+4*8] = [-43, 14]
      expect(result.data).toEqual([[19, -10], [-43, 14]]);
    });

    test('should multiply with floating point numbers', () => {
      const matrixA = new Matrix([[1.5, 2.5], [3.5, 4.5]]);
      const matrixB = new Matrix([[0.5, 1.5], [2.5, 3.5]]);
      const result = matrixA.multiply(matrixB);
      
      expect(result.data[0][0]).toBeCloseTo(7.0); // 1.5*0.5 + 2.5*2.5
      expect(result.data[0][1]).toBeCloseTo(11.0); // 1.5*1.5 + 2.5*3.5
    });

    test('should not mutate original matrices', () => {
      const matrixA = new Matrix([[1, 2], [3, 4]]);
      const matrixB = new Matrix([[5, 6], [7, 8]]);
      const originalA = JSON.stringify(matrixA.data);
      const originalB = JSON.stringify(matrixB.data);
      
      matrixA.multiply(matrixB);
      
      expect(JSON.stringify(matrixA.data)).toBe(originalA);
      expect(JSON.stringify(matrixB.data)).toBe(originalB);
    });
  });

  describe('toArray Method', () => {
    test('should convert matrix to array', () => {
      const matrix = new Matrix([[1, 2], [3, 4]]);
      const array = matrix.toArray();
      
      expect(array).toEqual([[1, 2], [3, 4]]);
      expect(Array.isArray(array)).toBe(true);
    });

    test('should return a new array (not reference to internal data)', () => {
      const matrix = new Matrix([[1, 2], [3, 4]]);
      const array = matrix.toArray();
      
      array[0][0] = 999;
      expect(matrix.data[0][0]).toBe(1); // Original should be unchanged
    });
  });

  describe('toString Method', () => {
    test('should convert matrix to string representation', () => {
      const matrix = new Matrix([[1, 2], [3, 4]]);
      const str = matrix.toString();
      
      expect(typeof str).toBe('string');
      expect(str).toContain('1');
      expect(str).toContain('2');
    });
  });
});

