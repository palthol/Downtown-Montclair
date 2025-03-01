import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '~/supabase/supabaseClient';

export interface UserProfile {
  id: string;
  email: string;
  // Extra profile fields can be added later
  accountType?: 'personal' | 'business';
  name?: string;
  profilePicture?: string;
  pronouns?: string;
  address?: string;
  businessImages?: string[];
  creationDate?: string;
  socialMedia?: string;
}

export interface AuthContextType {
  readonly user: UserProfile | null;
  readonly loading: boolean;
  readonly error: string | null;
  readonly setUser: (user: UserProfile | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to auth state changes from Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        // Optionally, fetch extra profile details as needed
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup the listener on unmount
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Wrap the context value in useMemo to avoid unnecessary re-renders
  const value = useMemo(() => ({ user, loading, error, setUser }), [user, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}