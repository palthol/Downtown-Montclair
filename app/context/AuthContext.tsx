import { createContext, useContext, useState, useEffect } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '~/supabase/supabaseClient';
// Update import path to services folder
import { fetchProfile } from '~/services/authService';
import type { AuthContextType, AuthProviderProps } from '~/types/authContext';
import type { Profile } from '~/types/profile';

// Remove duplicate type definitions - now imported from type files

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  // Refactored to use the auth service
  async function loadProfile(userId: string) {
    try {
      setLoading(true);
      const { success, data, error } = await fetchProfile(userId);
      
      if (success && data) {
        setProfile(data as Profile);
      } else {
        console.error('Error loading profile:', error);
        setProfile(null);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Auth state initialization logic
    async function initAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await loadProfile(session.user.id);
      } else {
        setLoading(false);
      }
    }
    
    initAuth();

    // Auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Manually refresh profile data
  async function refreshProfile() {
    if (user?.id) {
      await loadProfile(user.id);
    }
  }

  const value = {
    session,
    user,
    profile,
    loading,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);