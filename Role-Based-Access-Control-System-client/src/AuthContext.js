import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const API = process.env.SERVER_URL || "http://localhost:5000/";
axios.defaults.baseURL = API;
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const loadMe = async () => {
      try {
        const { data } = await axios.get("/api/auth/token");
        const userId = data.user.id;
        if (!userId) {
          setUser(null);
          return;
        }
        const user = await getUserById(userId);
        setUser(user);
      } catch (err) {
        console.error("Error loading user:", err);
        setUser(null);
      }
    };
    loadMe();
  }, []);

  const getUserById = async (id) => {
    const { data } = await axios.get(`/api/users/${id}`);
    return data;
  };

  const login = async (email, password) => {
    const loginRes = await axios.post("/api/auth/login", { email, password });
    const userId = loginRes.data.user.id;
    const user = await getUserById(userId);
    setUser(user);
    return user;
  };

  const signup = async (name, email, password) => {
    const signRes = await axios.post("/api/auth/signup", {
      name,
      email,
      password,
    });
    const userId = signRes.data.user.id;
    const user = await getUserById(userId);
    setUser(user);
    return user;
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
