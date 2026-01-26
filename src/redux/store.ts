import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/auhtSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // No need for serializableCheck middleware anymore
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;