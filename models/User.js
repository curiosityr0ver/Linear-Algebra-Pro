// In-memory data store (replace with actual database in production)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

let nextId = 3;

class User {
  // Get all users
  static findAll() {
    return Promise.resolve(users);
  }

  // Get user by ID
  static findById(id) {
    const user = users.find(u => u.id === parseInt(id));
    return Promise.resolve(user);
  }

  // Create new user
  static create(userData) {
    const newUser = {
      id: nextId++,
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return Promise.resolve(newUser);
  }

  // Update user
  static update(id, userData) {
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
      return Promise.resolve(null);
    }
    
    users[index] = {
      ...users[index],
      ...userData,
      updatedAt: new Date().toISOString()
    };
    
    return Promise.resolve(users[index]);
  }

  // Delete user
  static delete(id) {
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
      return Promise.resolve(false);
    }
    
    users.splice(index, 1);
    return Promise.resolve(true);
  }
}

module.exports = User;
