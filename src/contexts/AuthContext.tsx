
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'jobseeker' | 'employer' | 'admin';
  skills?: string[];
  experience?: string;
  company?: string;
  website?: string;
  phone?: string;
  location?: string;
  bio?: string;
  education?: string;
  linkedIn?: string;
  github?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'jobseeker' | 'employer') => Promise<boolean>;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<boolean>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (profile) {
        const userData: User = {
          id: profile.id,
          name: profile.full_name || '',
          email: profile.email,
          type: profile.user_type || 'jobseeker',
          skills: profile.skills || [],
          experience: profile.experience,
          phone: profile.phone,
          location: profile.location,
          bio: profile.bio,
          education: profile.education,
          linkedIn: profile.linkedin_url,
          github: profile.github_url,
          website: profile.website_url,
        };

        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const login = async (email: string, password: string, type: 'jobseeker' | 'employer'): Promise<boolean> => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return false;
      }

      // Profile will be fetched automatically by the auth state change listener
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: userData.email!,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: userData.name,
            user_type: userData.type || 'jobseeker',
            skills: userData.skills,
            experience: userData.experience,
            company: userData.company,
            website: userData.website,
          }
        }
      });

      if (error) {
        console.error('Registration error:', error);
        return false;
      }

      // The profile will be created automatically by the database trigger
      // and fetched by the auth state change listener
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<User>): Promise<boolean> => {
    if (!user || !session?.user) return false;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.name,
          skills: profileData.skills,
          experience: profileData.experience,
          phone: profileData.phone,
          location: profileData.location,
          bio: profileData.bio,
          education: profileData.education,
          linkedin_url: profileData.linkedIn,
          github_url: profileData.github,
          website_url: profileData.website,
        })
        .eq('id', user.id);

      if (error) {
        console.error('Profile update error:', error);
        return false;
      }

      // Update local user state
      setUser({ ...user, ...profileData });
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
      
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateProfile, 
      isAuthenticated,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
