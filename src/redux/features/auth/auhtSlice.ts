import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User, Session } from '@supabase/supabase-js';
import { authService } from '../../../supabase/authService';
import type { AuthState, AuthResponse } from '../../../types/auth';

// Initial state
const initialState: AuthState = {
  user: null,
  session: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// Async thunk for login with secret key
export const loginWithSecretKey = createAsyncThunk<
  { user: User; session: Session },
  string,
  { rejectValue: string }
>(
  'auth/loginWithSecretKey',
  async (secretKey: string, { rejectWithValue }) => {
    const response: AuthResponse = await authService.loginWithSecretKey(secretKey);

    if (!response.success || !response.data) {
      return rejectWithValue(response.error || 'Login failed');
    }

    if (!response.data.user || !response.data.session) {
      return rejectWithValue('Invalid authentication response');
    }

    return {
      user: response.data.user,
      session: response.data.session,
    };
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Logout failed'
      );
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Manual state reset
    resetAuthState: (state) => {
      state.user = null;
      state.session = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
    // Clear error
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login with secret key
    builder
      .addCase(loginWithSecretKey.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        loginWithSecretKey.fulfilled,
        (state, action: PayloadAction<{ user: User; session: Session }>) => {
          state.status = 'succeeded';
          state.user = action.payload.user;
          state.session = action.payload.session;
          state.isAuthenticated = true;
          state.error = null;
        }
      )
      .addCase(loginWithSecretKey.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
        state.user = null;
        state.session = null;
        state.isAuthenticated = false;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.session = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Logout failed';
      });
  },
});

export const { resetAuthState, clearAuthError } = authSlice.actions;
export default authSlice.reducer;