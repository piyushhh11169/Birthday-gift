import type { SupabaseClient, User, Session } from '@supabase/supabase-js';
import { supabase } from '../conf/conf';
import type { AuthResponse, AuthKey } from '../types/auth';

class AuthService {
  private supabase: SupabaseClient;
  private user: User | null = null;
  private session: Session | null = null;

  constructor() {
    this.supabase = supabase;
    this.initializeAuthListener();
  }

  /**
   * Initialize auth state change listener
   */
  private initializeAuthListener(): void {
    this.supabase.auth.onAuthStateChange((_event, session) => {
      this.session = session;
      this.user = session?.user ?? null;
    });
  }

  /**
   * Validate secret key against database and create session
   */
  async loginWithSecretKey(secretKey: string): Promise<AuthResponse> {
    try {
      // Validate input
      if (!secretKey || secretKey.trim().length === 0) {
        return {
          success: false,
          error: 'Secret key is required',
        };
      }

      // Query the auth_keys table to validate the secret key
      const { data: authKeys, error: queryError } = await this.supabase
        .from('auth_keys')
        .select('*')
        .eq('secret_key', secretKey)
        .eq('is_active', true)
        .single<AuthKey>();

      if (queryError || !authKeys) {
        return {
          success: false,
          error: 'Invalid secret key',
        };
      }

      // Update last_used_at timestamp
      await this.supabase
        .from('auth_keys')
        .update({ last_used_at: new Date().toISOString() })
        .eq('id', authKeys.id);

      // Sign in anonymously to create a Supabase session
      // This gives us a real User and Session object
      const { data: authData, error: signInError } = await this.supabase.auth.signInAnonymously({
        options: {
          data: {
            secret_key_id: authKeys.id,
            authenticated_via: 'secret_key',
          },
        },
      });

      if (signInError || !authData.session || !authData.user) {
        return {
          success: false,
          error: signInError?.message || 'Authentication failed',
        };
      }

      // Update internal state
      this.session = authData.session;
      this.user = authData.user;

      return {
        success: true,
        data: {
          user: authData.user,
          session: authData.session,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      };
    }
  }

  /**
   * Logout user and clear session
   */
  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
    this.user = null;
    this.session = null;
  }

  /**
   * Get current authenticated user
   */
  getCurrentUser(): User | null {
    return this.user;
  }

  /**
   * Get current session
   */
  getCurrentSession(): Session | null {
    return this.session;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.user !== null && this.session !== null;
  }
}

// Export singleton instance
export const authService = new AuthService();