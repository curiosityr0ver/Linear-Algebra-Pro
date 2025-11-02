# Linear Algebra Pro - Express TypeScript Server

A Node.js Express server built with TypeScript, implementing MVC architecture for linear algebra operations including matrix addition and multiplication.

## Project Structure

```
.
├── src/                     # TypeScript source files
│   ├── server.ts           # Main server file
│   ├── interfaces/         # TypeScript interfaces
│   │   └── IMatrix.ts      # Matrix interface
│   ├── models/             # Models (data layer)
│   │   ├── Matrix.ts       # Matrix implementation
│   │   └── User.ts         # User model
│   ├── operations/         # Matrix operations
│   │   ├── add.ts          # Matrix addition
│   │   ├── multiply.ts     # Matrix multiplication
│   │   └── index.ts        # Operations exports
│   ├── controllers/        # Controllers (business logic)
│   │   ├── matrixController.ts
│   │   └── userController.ts
│   └── routes/             # Routes (API endpoints)
│       ├── index.ts
│       ├── matrixRoutes.ts
│       └── userRoutes.ts
├── dist/                   # Compiled JavaScript output
├── tests/                  # Test files
│   └── matrix.test.ts      # Matrix tests
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest test configuration
└── .env                    # Environment variables
```

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

### Build TypeScript:
```bash
npm run build
```

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## Running Tests

```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## API Endpoints

### Root
- `GET /` - Welcome message

### Matrix Operations

#### Add Matrices
- `POST /api/matrices/add` - Add two matrices
  ```json
  {
    "matrixA": [[1, 2], [3, 4]],
    "matrixB": [[5, 6], [7, 8]]
  }
  ```
  
  **Response:**
  ```json
  {
    "success": true,
    "result": [[6, 8], [10, 12]],
    "operation": "addition",
    "dimensions": {
      "rows": 2,
      "columns": 2
    }
  }
  ```

#### Multiply Matrices
- `POST /api/matrices/multiply` - Multiply two matrices
  ```json
  {
    "matrixA": [[1, 2], [3, 4]],
    "matrixB": [[5, 6], [7, 8]]
  }
  ```
  
  **Response:**
  ```json
  {
    "success": true,
    "result": [[19, 22], [43, 50]],
    "operation": "multiplication",
    "dimensions": {
      "rows": 2,
      "columns": 2
    }
  }
  ```

**Error Responses:**
- `400 Bad Request` - Invalid input or dimension mismatch
- `500 Internal Server Error` - Server error

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Architecture Overview

### MVC Pattern

- **Models** (`src/models/`): Handle data logic and data structures
  - `Matrix.ts`: Implements `IMatrix` interface for matrix data structure
  - `User.ts`: User data model
- **Interfaces** (`src/interfaces/`): TypeScript interfaces defining contracts
  - `IMatrix.ts`: Interface for matrix implementations (allows different implementations like SparseMatrix, DenseMatrix)
- **Operations** (`src/operations/`): Separated matrix operations
  - `add.ts`: Matrix addition operation
  - `multiply.ts`: Matrix multiplication operation
- **Controllers** (`src/controllers/`): Handle business logic and coordinate between models and views
- **Routes** (`src/routes/`): Define API endpoints and map them to controllers

### Design Principles

- **Interface-based Design**: `IMatrix` interface allows for different implementations
- **Separation of Concerns**: Operations are separated from data structures
- **Type Safety**: Full TypeScript coverage with proper types
- **Extensibility**: Easy to add new operations and matrix implementations

### Flow

1. Request comes to `src/server.ts`
2. Routes in `src/routes/` determine which controller handles the request
3. Controller in `src/controllers/` processes the request
4. Controller uses operations from `src/operations/` for matrix calculations
5. Operations use Matrix model from `src/models/` to perform calculations
6. Response is sent back to the client

## Matrix Operations

### Addition
- Requires matrices with identical dimensions (same rows and columns)
- Returns a new matrix with element-wise addition

### Multiplication
- Requires compatible dimensions: columns of first matrix must equal rows of second matrix
- Returns a new matrix with standard matrix multiplication result

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Testing**: Jest with ts-jest
- **Development**: ts-node-dev for hot reloading

## Notes

- The current User model uses an in-memory array. Replace it with a real database (MongoDB, PostgreSQL, etc.) for production use.
- Add authentication middleware as needed.
- Configure CORS if building a frontend application.
- The Matrix class can be extended with different implementations (e.g., SparseMatrix for sparse matrices) by implementing the `IMatrix` interface.
