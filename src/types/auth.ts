import type { User, Session } from '@supabase/auth-js';

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User | null;
    session: Session | null;
  };
  error?: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface AuthKey {
  id: string;
  secret_key: string;
  is_active: boolean;
  created_at: string;
  last_used_at: string | null;
}