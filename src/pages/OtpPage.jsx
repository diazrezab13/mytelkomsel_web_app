import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';
import { motion } from 'framer-motion';
import { verifyOtp } from '../services/authService';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();
  const { showModal } = useModal();

  // Ambil nomor HP yang dikirim dari LoginPage
  const phone = location.state?.phone;

  const handleVerifyOtp = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    
    if (otp.length < 4) {
      showModal("Input Tidak Valid", "Kode OTP harus 4 digit", "error");
      return;
    }

    setLoading(true);

    try {
      const userData = await verifyOtp(phone, otp);
      loginSuccess(userData); 
      navigate('/dashboard');
    } catch (error) {
      showModal("Verifikasi Gagal", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div className="bg-white p-8 rounded-[32px] shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-black text-slate-800 mb-2">Verifikasi OTP</h2>
        <p className="text-slate-500 mb-6">Kode dikirim ke <span className="font-bold">{phone}</span></p>
        
        {/* FORM DISINI */}
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <input 
            type="text" 
            maxLength="4"
            placeholder="0000"
            className="w-full p-4 text-center text-3xl tracking-[1rem] font-black border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
            onChange={(e) => setOtp(e.target.value)}
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-red-700 transition-all"
          >
            {loading ? 'VERIFIKASI...' : 'VERIFIKASI'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default OtpPage;