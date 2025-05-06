import { createContext, ReactNode, useState, useEffect } from "react";
import supabase from "../services/supabaseClient";

type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
};

interface AuthProviderProps {
  children: ReactNode;
}

interface UserProps {
  id: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();

      if (data?.user) {
        setUser({
          id: data.user.id,
          name: data.user.user_metadata?.name || null,
          email: data.user.email || null,
        });

        setLoadingAuth(false);
      } else {
        setUser(null);
        setLoadingAuth(false);
      }
    }

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            name: session.user.user_metadata?.name || null,
            email: session.user.email || null,
          });
          setLoadingAuth(false);
        } else {
          setUser(null);
          setLoadingAuth(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ signed: !!user, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
