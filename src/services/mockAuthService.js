// ==============================================
// src/services/mockAuthService.js
// Mock authentication service for testing without backend
// ==============================================

// Simulated database in localStorage
const USERS_KEY = 'mock_users_db';

// Helper function to get all users from localStorage
const getAllUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Helper function to save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthService = {
  // Register a new user
  register: async (userData) => {
    await delay(800); // Simulate network delay

    const users = getAllUsers();

    // Check if email already exists
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      throw {
        response: {
          data: { message: 'Email already registered' }
        }
      };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      password: userData.password, // In real app, this would be hashed
      createdAt: new Date().toISOString(),
      isApproved: userData.role === 'patient' ? true : false, // Providers need approval
    };

    users.push(newUser);
    saveUsers(users);

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isApproved: newUser.isApproved,
      },
      message: 'Registration successful'
    };
  },

  // Login user
  login: async (email, password) => {
    await delay(800); // Simulate network delay

    const users = getAllUsers();

    // Find user by email
    const user = users.find(u => u.email === email);

    if (!user) {
      throw {
        response: {
          data: { message: 'Invalid email or password' }
        }
      };
    }

    // Check password
    if (user.password !== password) {
      throw {
        response: {
          data: { message: 'Invalid email or password' }
        }
      };
    }

    // Check if provider is approved
    if (user.role === 'provider' && !user.isApproved) {
      throw {
        response: {
          data: { message: 'Your provider account is pending admin approval' }
        }
      };
    }

    // Generate mock token
    const token = `mock_token_${user.id}_${Date.now()}`;

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
      },
      message: 'Login successful'
    };
  },

  // Logout (optional, for cleanup)
  logout: async () => {
    await delay(300);
    return { message: 'Logout successful' };
  },

  // Helper: Create an admin user for testing
  createAdminUser: () => {
    const users = getAllUsers();
    const adminExists = users.find(u => u.role === 'admin');

    if (!adminExists) {
      const admin = {
        id: 'admin_001',
        name: 'Admin User',
        email: 'admin@healthcare.com',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString(),
        isApproved: true,
      };
      users.push(admin);
      saveUsers(users);
      console.log('Admin user created: admin@healthcare.com / admin123');
    }
  },

  // Helper: View all registered users (for debugging)
  getAllUsers: () => {
    return getAllUsers();
  },

  // Helper: Clear all users (for testing)
  clearAllUsers: () => {
    localStorage.removeItem(USERS_KEY);
    console.log('All users cleared');
  }
};
