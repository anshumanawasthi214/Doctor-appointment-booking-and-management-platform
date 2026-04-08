import { createContext, createElement, useContext, useMemo, useState } from "react";
import { apiRequest } from "../api/api";
import { getDashboardHome, initialAuthForm, registerEndpoints, roleOptions } from "../config/dashboard";

const AuthContext = createContext(null);
const STORAGE_KEY = "doctorAtHomeSession";

function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  const value = useMemo(() => {
    const persistSession = (nextSession) => {
      setSession(nextSession);

      if (nextSession) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    };

    return {
      session,
      role: session?.user?.role || null,
      userName: session?.user?.username || "Care Portal",
      roleOptions,
      initialAuthForm,
      getDashboardHome,
      async login(credentials) {
        const data = await apiRequest("/user/authenticate", {
          method: "POST",
          body: { username: credentials.username, password: credentials.password }
        });
        persistSession(data);
        return data;
      },
      async register(payload) {
        return apiRequest(registerEndpoints[payload.role], {
          method: "POST",
          body: payload
        });
      },
      async logout() {
        if (session?.token) {
          try {
            await apiRequest("/user/logout", { method: "POST", token: session.token });
          } catch {
            // Even if logout fails, clear the local session so the UI can recover.
          }
        }

        persistSession(null);
      }
    };
  }, [session]);

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
