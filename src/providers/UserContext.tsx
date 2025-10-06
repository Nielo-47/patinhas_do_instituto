'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { getDatabaseBrowserClient } from '@/supabase/client';
import type { User } from '@supabase/supabase-js';

interface UserContextType {
  user: User | null;
  isProtetor: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  isProtetor: false,
  loading: true,
  signOut: async () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isProtetor, setIsProtetor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getDatabaseBrowserClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkIfProtetor(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkIfProtetor(session.user.id);
      } else {
        setIsProtetor(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkIfProtetor = async (userId: string) => {
    const supabase = getDatabaseBrowserClient();
    const { data } = await supabase
      .from('protetores')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    setIsProtetor(!!data);
    setLoading(false);
  };

  const signOut = async () => {
    const supabase = getDatabaseBrowserClient();
    await supabase.auth.signOut();
  };

  return (
    <UserContext.Provider value={{ user, isProtetor, loading, signOut }}>
      {children}
    </UserContext.Provider>
  );
};