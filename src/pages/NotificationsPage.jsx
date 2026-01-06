import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, Tag, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [selectedNotice, setSelectedNotice] = useState(null); // State untuk simpan notifikasi yang diklik

  const notices = [
    { id: 1, title: "Promo Spesial Untukmu!", desc: "Dapatkan kuota 10GB hanya Rp10.000 hari ini.", content: "Selamat! Anda terpilih mendapatkan promo Internet Sakti. Kuota 10GB berlaku selama 3 hari di semua jaringan. Buruan beli sebelum kehabisan!", time: "2 jam yang lalu", icon: <Gift size={20}/>, color: "bg-red-50 text-red-600" },
    { id: 2, title: "Pembayaran Berhasil", desc: "Paket Internet Sakti 10GB telah aktif.", content: "Transaksi Anda dengan nomor referensi TSEL-99283 telah berhasil. Paket Internet Sakti 10GB (30 Hari) sudah aktif dan bisa digunakan.", time: "5 jam yang lalu", icon: <Tag size={20}/>, color: "bg-green-50 text-green-600" },
    { id: 3, title: "Info Keamanan", desc: "Jangan berikan kode OTP kepada siapapun.", content: "Waspada penipuan! Telkomsel tidak pernah meminta kode OTP atau data pribadi melalui media sosial atau telepon. Selalu jaga kerahasiaan data Anda.", time: "1 hari yang lalu", icon: <Info size={20}/>, color: "bg-blue-50 text-blue-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 relative">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard')} className="p-2 bg-white rounded-xl shadow-sm hover:bg-slate-50 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-slate-800">Notifikasi</h1>
        </div>

        <div className="space-y-4">
          {notices.map((n) => (
            <motion.div 
              whileTap={{ scale: 0.98 }}
              key={n.id} 
              onClick={() => setSelectedNotice(n)} // Set notifikasi yang diklik
              className="bg-white p-4 rounded-3xl border border-slate-100 flex gap-4 shadow-sm cursor-pointer hover:border-red-200 transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${n.color}`}>
                {n.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 leading-tight">{n.title}</h4>
                <p className="text-sm text-slate-500 mt-1 line-clamp-1">{n.desc}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">{n.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL DETAIL (Muncul kalau ada yang diklik) */}
      <AnimatePresence>
        {selectedNotice && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
            {/* Overlay Hitam Transparan */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedNotice(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            {/* Kotak Modal */}
            <motion.div 
              initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
              className="bg-white w-full max-w-md rounded-[32px] p-8 relative z-10 shadow-2xl"
            >
              <button onClick={() => setSelectedNotice(null)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-500">
                <X size={20} />
              </button>
              
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${selectedNotice.color}`}>
                {selectedNotice.icon}
              </div>
              
              <h2 className="text-2xl font-black text-slate-800 mb-2">{selectedNotice.title}</h2>
              <p className="text-slate-400 text-sm mb-6 font-bold uppercase">{selectedNotice.time}</p>
              <div className="bg-slate-50 p-6 rounded-2xl mb-8">
                <p className="text-slate-600 leading-relaxed font-medium">
                  {selectedNotice.content}
                </p>
              </div>
              
              <button 
                onClick={() => setSelectedNotice(null)}
                className="w-full bg-red-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-red-200 active:scale-95 transition-all"
              >
                MENGERTI
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsPage;