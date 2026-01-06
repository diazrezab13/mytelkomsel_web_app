import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTransaction } from '../contexts/TransactionContext';
import { ArrowLeft, ShieldCheck, Banknote } from 'lucide-react';
import { buyPackage } from '../services/transactionService';
import { useModal } from '../contexts/ModalContext';
import { fetchUserProfile } from '../services/userService';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { showModal } = useModal();

  const pkg = location.state || { name: "Paket Internet", price: 0, gb: 0 };
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    if (user.balance < pkg.price) {
      showModal("Gagal", `Saldo Pulsa Tidak Cukup`, "error");
      return
    }
    
    setLoading(true);
    setTimeout(() => {
      buyPackage(user.phone, pkg, fetchUserProfile);
      setLoading(false);
      showModal("Berhasil", `Paket ${pkg.name} berhasil dibeli!`, "success");
      navigate('/history');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-500 mb-6 font-bold">
          <ArrowLeft size={20} /> Kembali
        </button>

        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
          <h2 className="text-xl font-black mb-6">Konfirmasi Pembayaran</h2>

          <div className="bg-slate-50 p-4 rounded-2xl mb-6">
            <p className="text-xs text-slate-400 uppercase font-black tracking-widest mb-1">Paket Dipilih</p>
            <p className="font-bold text-slate-800">{pkg.name}</p>
            <p className="text-red-600 font-black text-xl">Rp {pkg.price.toLocaleString()}</p>
          </div>

          <div className="space-y-4 mb-8">
            <p className="font-bold text-slate-700">Metode Pembayaran</p>
            <div className="flex items-center justify-between p-4 border-2 border-red-600 bg-red-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <Banknote className="text-red-600" />
                <div>
                  <p className="text-sm font-black">Pulsa</p>
                  <p className="text-xs text-slate-500">Saldo: Rp {user.balance.toLocaleString()}</p>
                </div>
              </div>
              <div className="w-5 h-5 bg-red-600 rounded-full border-4 border-white"></div>
            </div>
          </div>

          <button
            disabled={loading}
            onClick={handlePay}
            className={`w-full py-4 rounded-2xl font-black text-white text-lg flex items-center justify-center gap-2 ${loading ? 'bg-slate-400' : 'bg-red-600 shadow-lg shadow-red-100'}`}
          >
            {loading ? "MEMPROSES..." : <><ShieldCheck size={20} /> BAYAR SEKARANG</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;