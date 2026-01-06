import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTransaction } from '../contexts/TransactionContext';
import { PACKAGES } from '../constants/packages';
import { useNavigate } from 'react-router-dom';
import { Wallet, Globe, Zap, Bell, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const { topUp } = useTransaction();
  const navigate = useNavigate();

  const packages = PACKAGES;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50 pb-20 text-slate-900"
    >
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <span className="text-2xl font-black text-red-600 tracking-tighter cursor-pointer" onClick={() => navigate('/dashboard')}>
          MyTelkomsel
        </span>

        <div className="flex items-center gap-4">
          {/* Tombol Notifikasi */}
          <button
            onClick={() => navigate('/notifications')} // Ganti alert jadi navigate
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-gray-400 active:scale-90 relative"
          >
            <Bell size={20} />
            {/* Tambahkan titik merah notifikasi agar lebih keren */}
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border border-white"></span>
          </button>

          {/* Tombol Avatar "A" */}
          <button
            onClick={() => navigate('/account')}
            className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold hover:bg-red-200 transition-all active:scale-90 border-2 border-white shadow-sm"
          >
            {user.name[0]}
          </button>
        </div>
      </nav>

      <main className="w-full min-h-screen p-6">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-sm font-medium mb-1">Pulsa Anda</p>
            <h2 className="text-3xl font-black text-slate-800">Rp {user.balance.toLocaleString()}</h2>
            <button
              onClick={() => {
                topUp(50000);
              }}
              className="mt-4 w-full bg-red-50 text-red-600 py-2 rounded-xl font-bold text-sm active:scale-95 transition-all"
            >
              Isi Pulsa
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-16 h-16 border-4 border-red-500 border-t-gray-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">{user.quota}GB</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Internet Utama</p>
              <p className="text-red-600 font-bold text-sm">Detail Kuota</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-3xl shadow-lg text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="opacity-80 text-sm">Poin Anda</p>
                <h2 className="text-3xl font-black">{user.points}</h2>
              </div>
              <Zap size={24} />
            </div>
            <p className="text-xs mt-4 bg-white/20 p-2 rounded-lg text-center">Tukar Poin Sekarang</p>
          </div>
        </div>

        {/* Katalog */}
        <h3 className="text-xl font-bold mb-4">Pilih Paket Spesial</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map(pkg => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              key={pkg.id}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
            >
              <h4 className="font-bold text-lg">{pkg.name}</h4>
              <p className="text-gray-400 text-sm mb-4">{pkg.desc}</p>
              <div className="flex justify-between items-center border-t pt-4">
                <span className="font-black text-red-600">Rp {pkg.price.toLocaleString()}</span>
                <button
                  onClick={() => navigate(`/checkout/${pkg.id}`, { state: pkg })}
                  className="bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-md shadow-red-100"
                >
                  Beli
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-8 py-3 flex justify-between text-gray-400">
        <div className="flex flex-col items-center text-red-600"><Globe size={20} /><span className="text-[10px] font-bold">Home</span></div>
        <div onClick={() => navigate('/history')} className="flex flex-col items-center cursor-pointer hover:text-red-600"><Zap size={20} /><span className="text-[10px] font-bold">Riwayat</span></div>
        <div
          onClick={() => navigate('/account')}
          className="flex flex-col items-center cursor-pointer hover:text-red-600 transition-colors"
        >
          <Wallet size={20} />
          <span className="text-[10px] font-bold">Akun</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;