/**
 * Context-related type definitions
 */

import type { Session, User } from '@supabase/supabase-js';
import type { Profile } from './profile';

// Auth context type
export interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

// Auth provider props
export interface AuthProviderProps {
  children: React.ReactNode;
}