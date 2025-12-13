import { createContext, useEffect, useState } from "react";
import { authApi } from "../utils/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- VERIFY TOKEN ON LOAD ---------------- */
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await authApi.me();

      if (res?.error) {
        logout();
      } else {
        setUser(res);
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  /* ---------------- LOGIN ---------------- */
  const login = async (form) => {
    const res = await authApi.login(form);

    if (res?.token && res?.user) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);
    }

    return res;
  };

  /* ---------------- REGISTER ---------------- */
  const register = async (form) => {
    return await authApi.register(form);
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  /* ---------------- LOADING GUARD ---------------- */
  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
