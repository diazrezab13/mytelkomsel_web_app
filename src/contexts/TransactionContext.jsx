// src/contexts/TransactionContext.jsx
import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useModal } from './ModalContext';
import { topUpBalance } from '../services/userService';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const { user, setUser } = useAuth();
  const { showModal } = useModal();

  const topUp = async (amount) => {
    if (!user?.phone) return;

    try {
      const newBalance = await topUpBalance(user.phone, amount);
      setUser(prev => ({
        ...prev,
        balance: newBalance
      }));
      showModal("Berhasil", `Top Up Rp ${amount.toLocaleString()} sukses!`, "success");
    } catch (error) {
      showModal("Gagal", error.message, "error");
    }
  };

  const buyPackage = (pkg) => {
    setUser(prev => {
      const newHistory = {
        id: `TRX-${Math.floor(Math.random() * 90000) + 10000}`,
        date: new Date().toLocaleDateString('id-ID'),
        item: pkg.name,
        amount: pkg.price,
        status: "Success",
        type: "minus"
      };

      return {
        ...prev,
        balance: prev.balance - pkg.price,
        quota: prev.quota + pkg.gb,
        history: [newHistory, ...prev.history]
      };
    });
  };

  const value = {
    topUp,
    buyPackage
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within TransactionProvider");
  }
  return context;
};