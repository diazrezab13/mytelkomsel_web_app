// src/contexts/ModalContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';
import MessageModal from '../components/MessageModal';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'error'
  });

  const showModal = useCallback((title, message, type = 'error') => {
    setModalConfig({ isOpen: true, title, message, type });
  }, []);

  const closeModal = useCallback(() => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  }, []);

  const value = {
    modalConfig,
    showModal,
    closeModal
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <MessageModal {...modalConfig} onClose={closeModal} />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};