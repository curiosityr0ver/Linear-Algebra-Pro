// In-memory data store (replace with actual database in production)
interface UserData {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

let users: UserData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

let nextId = 3;

class User {
  // Get all users
  static findAll(): Promise<UserData[]> {
    return Promise.resolve(users);
  }

  // Get user by ID
  static findById(id: string | number): Promise<UserData | undefined> {
    const user = users.find(u => u.id === parseInt(id as string));
    return Promise.resolve(user);
  }

  // Create new user
  static create(userData: { name: string; email: string }): Promise<UserData> {
    const newUser: UserData = {
      id: nextId++,
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return Promise.resolve(newUser);
  }

  // Update user
  static update(id: string | number, userData: { name?: string; email?: string }): Promise<UserData | null> {
    const index = users.findIndex(u => u.id === parseInt(id as string));
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
  static delete(id: string | number): Promise<boolean> {
    const index = users.findIndex(u => u.id === parseInt(id as string));
    if (index === -1) {
      return Promise.resolve(false);
    }
    
    users.splice(index, 1);
    return Promise.resolve(true);
  }
}

export default User;

