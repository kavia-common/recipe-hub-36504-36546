import React, { createContext, useEffect, useMemo, useState } from "react";
import api from "../api/client";

export const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * useAuthContext: internal helper to expose context in hooks.
 */
export const useAuthContext = () => React.useContext(AuthContext);

/**
 * PUBLIC_INTERFACE
 * AuthProvider manages JWT-based auth state with localStorage persistence.
 */
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const raw = localStorage.getItem("auth");
      return raw ? JSON.parse(raw) : { user: null, access_token: null };
    } catch {
      return { user: null, access_token: null };
    }
  });
  const [loading, setLoading] = useState(false);
  const [bootstrapDone, setBootstrapDone] = useState(false);
  const user = auth?.user;

  // Bootstrap: Optionally validate token/profile if backend is up; if fails, keep local state
  useEffect(() => {
    const bootstrap = async () => {
      setBootstrapDone(true);
    };
    bootstrap();
  }, []);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Expect FastAPI typical /auth/login or /login; fallback if 404
      // We'll try /auth/login first
      let resp;
      try {
        resp = await api.post("/auth/login", { email, password });
      } catch (err) {
        // fallback to /login (if backend exposes different path)
        resp = await api.post("/login", { email, password });
      }
      const data = resp?.data || {};
      const access_token = data?.access_token || data?.token;
      const userInfo = data?.user || { email };
      setAuth({ access_token, user: userInfo });
      return { success: true };
    } catch (e) {
      return { success: false, error: e?.response?.data?.detail || "Unable to login" };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    try {
      let resp;
      try {
        resp = await api.post("/auth/register", { email, password });
      } catch (err) {
        resp = await api.post("/register", { email, password });
      }
      const data = resp?.data || {};
      // Some APIs auto-login on register; handle both cases
      const access_token = data?.access_token || null;
      const userInfo = data?.user || { email };
      setAuth({ access_token, user: userInfo });
      return { success: true };
    } catch (e) {
      return { success: false, error: e?.response?.data?.detail || "Unable to register" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuth({ user: null, access_token: null });
  };

  const value = useMemo(
    () => ({
      user,
      token: auth?.access_token,
      loading: loading || !bootstrapDone,
      login,
      register,
      logout,
      setAuth,
    }),
    [user, auth?.access_token, loading, bootstrapDone]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
