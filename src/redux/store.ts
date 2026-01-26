import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/auhtSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/loginWithSecretKey/fulfilled'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user', 'auth.session'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;