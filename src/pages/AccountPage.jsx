import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, User, Phone, Mail, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-slate-50 p-6 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard')} className="p-2 bg-white rounded-xl shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-black">Profil Akun</h1>
        </div>

        {/* Profil Card */}
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 text-center mb-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-3xl font-black mx-auto mb-4">
            {user.name[0]}
          </div>
          <h2 className="text-xl font-black text-slate-800">{user.name}</h2>
          <p className="text-slate-500 font-medium">{user.phone}</p>
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><User size={18} /></div>
              <span className="font-bold text-sm text-slate-700">Edit Profil</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </div>

          <div className="p-4 border-b border-slate-50 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Phone size={18} /></div>
              <span className="font-bold text-sm text-slate-700">Daftar Nomor</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </div>

          <div
            onClick={() => {
              // Opsional: Kamu bisa tambahkan logika hapus token/session di sini
              if (confirm("Apakah Anda yakin ingin keluar?")) {
                logout();
              }
            }}
            className="p-4 flex items-center justify-between hover:bg-red-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg"><LogOut size={18} /></div>
              <span className="font-bold text-sm text-red-600">Keluar Aplikasi</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AccountPage;