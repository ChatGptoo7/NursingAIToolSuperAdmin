import { createContext, useContext, useEffect, useState } from "react";

type User = {
  userId: string;
  email: string;
  userType: string;
  permissions?: string[];
};

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (data: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore auth on page refresh
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
 

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  // ⏱ Auto logout after 15 min
  useEffect(() => {
    if (!accessToken) return;

    const timer = setTimeout(() => logout(), 15 * 60 * 1000);
    return () => clearTimeout(timer);
  }, [accessToken]);

  const login = (data: any) => {
    const userData = data;
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setAccessToken(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ✅ SAFE hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
