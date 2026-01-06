// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { ModalProvider } from './contexts/ModalContext';
import { TransactionProvider } from './contexts/TransactionContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import si Satpam

// Pastikan jalur (path) import ini sesuai dengan lokasi file kamu
import LoginPage from './pages/LoginPage';
import OtpPage from './pages/OtpPage';
import Dashboard from './pages/Dashboard';
import CheckoutPage from './pages/CheckoutPage';
import HistoryPage from './pages/HistoryPage';
import AccountPage from './pages/AccountPage';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <UserProvider>
          <TransactionProvider>
            <Router>
              <Routes>
                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/otp" element={<OtpPage />} />
                
                {/* PROTECTED ROUTES (Hanya bisa diakses jika sudah login) */}
                <Route path="/dashboard" element={
                  <ProtectedRoute> <Dashboard /> </ProtectedRoute>
                } />
                <Route path="/checkout/:id" element={
                  <ProtectedRoute> <CheckoutPage /> </ProtectedRoute>
                } />
                <Route path="/history" element={
                  <ProtectedRoute> <HistoryPage /> </ProtectedRoute>
                } />
                <Route path="/account" element={
                  <ProtectedRoute> <AccountPage /> </ProtectedRoute>
                } />
                <Route path="/notifications" element={
                  <ProtectedRoute> <NotificationsPage /> </ProtectedRoute>
                } />

                {/* CATCH ALL: Jika nyasar, balik ke dashboard (nanti akan dicheck ProtectedRoute) */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </Router>
          </TransactionProvider>
        </UserProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;