import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import authService from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated =
    Boolean(localStorage.getItem("accessToken")) && Boolean(user);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const currentUser = await authService.me();
      setUser(currentUser);
    } catch {
      localStorage.removeItem("accessToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = useCallback(async (email, password) => {
    const response = await authService.login(
      email,
      password
    );

    if (response?.user) {
      setUser(response.user);
    } else {
      await loadUser();
    }

    return response;
  }, [loadUser]);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,
      login,
      logout,
      refreshUser: loadUser
    }),
    [
      user,
      loading,
      isAuthenticated,
      login,
      logout,
      loadUser
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;