# Express MVC Server

A basic Node.js Express server with MVC (Model-View-Controller) architecture.

## Project Structure

```
.
├── server.js              # Main server file
├── package.json           # Project dependencies
├── .env                   # Environment variables
├── controllers/           # Controllers (business logic)
│   └── userController.js
├── models/                # Models (data layer)
│   └── User.js
├── routes/                # Routes (API endpoints)
│   ├── index.js
│   └── userRoutes.js
└── views/                 # Views (for rendering - optional for API)
```

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Root
- `GET /` - Welcome message

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

- **Models** (`models/`): Handle data logic and database operations
- **Views** (`views/`): Handle presentation (optional for REST APIs)
- **Controllers** (`controllers/`): Handle business logic and coordinate between models and views
- **Routes** (`routes/`): Define API endpoints and map them to controllers

### Flow

1. Request comes to `server.js`
2. Routes in `routes/` determine which controller handles the request
3. Controller in `controllers/` processes the request
4. Controller uses Model from `models/` to interact with data
5. Response is sent back to the client

## Notes

- The current User model uses an in-memory array. Replace it with a real database (MongoDB, PostgreSQL, etc.) for production use.
- Add authentication middleware as needed.
- Configure CORS if building a frontend application.
