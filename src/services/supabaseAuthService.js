// ==============================================
// src/services/supabaseAuthService.js
// ==============================================
import { supabase } from './supabase';

export const supabaseAuthService = {
  // Register a new user
  register: async (userData) => {
    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: userData.role,
          }
        }
      });

      if (authError) throw authError;

      // 2. Insert user data into users table
      const { data: userRecord, error: dbError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            is_approved: userData.role === 'patient' ? true : false,
          }
        ])
        .select()
        .single();

      if (dbError) throw dbError;

      return {
        user: {
          id: userRecord.id,
          name: userRecord.name,
          email: userRecord.email,
          role: userRecord.role,
          isApproved: userRecord.is_approved,
        },
        message: 'Registration successful! Please check your email to verify your account.'
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw {
        response: {
          data: {
            message: error.message || 'Registration failed. Please try again.'
          }
        }
      };
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      // 1. Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // 2. Get user data from users table
      const { data: userRecord, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (dbError) throw dbError;

      // 3. Check if provider is approved
      if (userRecord.role === 'provider' && !userRecord.is_approved) {
        // Sign out the user
        await supabase.auth.signOut();
        throw new Error('Your provider account is pending admin approval');
      }

      return {
        user: {
          id: userRecord.id,
          name: userRecord.name,
          email: userRecord.email,
          role: userRecord.role,
          token: authData.session.access_token,
          isApproved: userRecord.is_approved,
        },
        message: 'Login successful'
      };
    } catch (error) {
      console.error('Login error:', error);
      throw {
        response: {
          data: {
            message: error.message || 'Invalid email or password'
          }
        }
      };
    }
  },

  // Logout user
  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { message: 'Logout successful' };
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  // Get current user session
  getCurrentUser: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return null;

      const { data: userRecord } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!userRecord) return null;

      return {
        id: userRecord.id,
        name: userRecord.name,
        email: userRecord.email,
        role: userRecord.role,
        isApproved: userRecord.is_approved,
      };
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },
};
