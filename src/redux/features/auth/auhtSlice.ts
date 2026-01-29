import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthState } from '../../../types/auth'

// Valid secret keys (temporary — later replace with Supabase)
const VALID_SECRET_KEYS = [
  'DEV_SECRET_123',
  'ADMIN_SECRET_456',
  'i love you'
]

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  status: 'idle',
  error: null,
  secretKey: null,
}

// 🔐 Login with secret key
export const loginWithSecretKey = createAsyncThunk<
  string,               // return type
  string,               // argument type
  { rejectValue: string }
>(
  'auth/loginWithSecretKey',
  async (secretKey, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (!secretKey || secretKey.trim().length === 0) {
      return rejectWithValue('Secret key is required')
    }

    if (!VALID_SECRET_KEYS.includes(secretKey.trim())) {
      return rejectWithValue('Invalid secret key')
    }

    localStorage.setItem('auth_secret_key', secretKey.trim())
    return secretKey.trim()
  }
)

// 🚪 Logout
export const logoutUser = createAsyncThunk<void, void>(
  'auth/logoutUser',
  async () => {
    localStorage.removeItem('auth_secret_key')
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
)

// 🔁 Restore session
export const checkAuthSession = createAsyncThunk<
  string | null,
  void,
  { rejectValue: string }
>(
  'auth/checkAuthSession',
  async (_, { rejectWithValue }) => {
    const storedKey = localStorage.getItem('auth_secret_key')

    if (!storedKey) {
      return rejectWithValue('No stored session')
    }

    if (!VALID_SECRET_KEYS.includes(storedKey)) {
      localStorage.removeItem('auth_secret_key')
      return rejectWithValue('Invalid stored session')
    }

    return storedKey
  }
)

// 🧠 Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isAuthenticated = false
      state.status = 'idle'
      state.error = null
      state.secretKey = null
      localStorage.removeItem('auth_secret_key')
    },
    clearAuthError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginWithSecretKey.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(
        loginWithSecretKey.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = 'succeeded'
          state.isAuthenticated = true
          state.secretKey = action.payload
        }
      )
      .addCase(loginWithSecretKey.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Login failed'
        state.isAuthenticated = false
        state.secretKey = null
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle'
        state.isAuthenticated = false
        state.secretKey = null
        state.error = null
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = 'idle'
        state.isAuthenticated = false
        state.secretKey = null
        state.error = null
      })

      // Restore session
      .addCase(checkAuthSession.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        checkAuthSession.fulfilled,
        (state, action: PayloadAction<string | null>) => {
          state.status = 'succeeded'
          state.isAuthenticated = true
          state.secretKey = action.payload
        }
      )
      .addCase(checkAuthSession.rejected, (state) => {
        state.status = 'idle'
        state.isAuthenticated = false
        state.secretKey = null
      })
  },
})

export const { resetAuthState, clearAuthError } = authSlice.actions
export default authSlice.reducer
