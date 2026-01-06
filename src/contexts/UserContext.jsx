// src/contexts/UserContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useModal } from './ModalContext';
import { fetchUserProfile } from '../services/userService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, setUser } = useAuth();
  const { showModal } = useModal();
  const [userData, setUserData] = useState(null);

  const loadUserProfile = useCallback(async (phone) => {
    try {
      const data = await fetchUserProfile(phone);
      setUserData(data);
      setUser(prev => ({
        ...prev,
        ...data
      }));
    } catch (error) {
      showModal("Error", error.message, "error");
    }
  }, [showModal, setUser]);

  useEffect(() => {
    if (user?.phone) {
      loadUserProfile(user.phone);
    }
  }, [user?.phone, loadUserProfile]);

  const value = {
    userData,
    loadUserProfile
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};