// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext();

// Konstanta untuk menghindari typo
const STORAGE_KEY = 'user_session';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [storedUser, setStoredUser, removeStoredUser] = useLocalStorage(STORAGE_KEY, null);

  const loginSuccess = (userData) => {
    const sessionData = {
      ...userData,
      balance: 0,
      quota: 0,
      points: 0,
      history: []
    };
    setUser(sessionData);
    setStoredUser(sessionData);
  };

  const logout = useCallback(() => {
    removeStoredUser();
    setUser(null);
    window.location.href = '/login';
  }, [removeStoredUser]);

  // Initial check
  useEffect(() => {
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, [storedUser]);

  const value = {
    user,
    loading,
    setUser,
    loginSuccess,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};