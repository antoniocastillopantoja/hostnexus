
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export type UserRole = "guest" | "host" | "admin";

interface UserWithRole extends User {
  roles?: UserRole[];
}

interface AuthContextType {
  session: Session | null;
  user: UserWithRole | null;
  userRoles: UserRole[];
  isLoading: boolean;
  isAdmin: boolean;
  isHost: boolean;
  isGuest: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user roles from database
  const fetchUserRoles = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching user roles:", error);
      return [];
    }

    return data.map(item => item.role as UserRole);
  };

  // Initialize session and set up auth state listener
  useEffect(() => {
    setIsLoading(true);
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          const roles = await fetchUserRoles(session.user.id);
          const userWithRole = { ...session.user, roles };
          setUser(userWithRole);
          setUserRoles(roles);
        } else {
          setUser(null);
          setUserRoles([]);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      
      if (session?.user) {
        const roles = await fetchUserRoles(session.user.id);
        const userWithRole = { ...session.user, roles };
        setUser(userWithRole);
        setUserRoles(roles);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      
      toast({
        title: "Registro exitoso",
        description: "Se ha enviado un correo de confirmación a tu email.",
      });
    } catch (error: any) {
      toast({
        title: "Error al registrarse",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error al cerrar sesión",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const isAdmin = userRoles.includes("admin");
  const isHost = userRoles.includes("host");
  const isGuest = userRoles.includes("guest") || userRoles.length === 0;

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userRoles,
        isLoading,
        isAdmin,
        isHost,
        isGuest,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
