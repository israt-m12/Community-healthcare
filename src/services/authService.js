// ==============================================
// src/services/authService.js
// ==============================================
import api from './api';
import { mockAuthService } from './mockAuthService';
import { supabaseAuthService } from './supabaseAuthService';

// Set authentication mode:
// 'mock' - Use localStorage (for testing without backend)
// 'supabase' - Use Supabase (real database)
// 'api' - Use custom backend API
const AUTH_MODE = 'supabase';

export const authService = {
  login: async (email, password) => {
    if (AUTH_MODE === 'mock') {
      return await mockAuthService.login(email, password);
    } else if (AUTH_MODE === 'supabase') {
      return await supabaseAuthService.login(email, password);
    } else {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    }
  },

  register: async (userData) => {
    if (AUTH_MODE === 'mock') {
      return await mockAuthService.register(userData);
    } else if (AUTH_MODE === 'supabase') {
      return await supabaseAuthService.register(userData);
    } else {
      const response = await api.post('/auth/register', userData);
      return response.data;
    }
  },

  logout: async () => {
    if (AUTH_MODE === 'mock') {
      return await mockAuthService.logout();
    } else if (AUTH_MODE === 'supabase') {
      return await supabaseAuthService.logout();
    } else {
      return Promise.resolve();
    }
  },

  getCurrentUser: async () => {
    if (AUTH_MODE === 'supabase') {
      return await supabaseAuthService.getCurrentUser();
    }
    return null;
  },
};
