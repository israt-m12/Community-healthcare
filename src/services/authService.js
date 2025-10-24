// ==============================================
// src/services/authService.js
// ==============================================
import api from './api';
import { mockAuthService } from './mockAuthService';

// Set this to true to use mock authentication
// Set to false when you have a real backend
const USE_MOCK = true;

export const authService = {
  login: async (email, password) => {
    if (USE_MOCK) {
      return await mockAuthService.login(email, password);
    } else {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    }
  },

  register: async (userData) => {
    if (USE_MOCK) {
      return await mockAuthService.register(userData);
    } else {
      const response = await api.post('/auth/register', userData);
      return response.data;
    }
  },

  logout: async () => {
    if (USE_MOCK) {
      return await mockAuthService.logout();
    } else {
      return Promise.resolve();
    }
  },
};
