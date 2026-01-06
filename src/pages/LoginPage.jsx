import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';
import { motion } from 'framer-motion';
import { login } from '../services/authService';

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const { showModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    // Hanya redirect jika user benar-benar sudah punya TOKEN (sudah lewat OTP)
    // Jika login baru tahap masukkan nomor, jangan di-redirect dulu
    if (user && user.token) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (phone.length < 9) {
      showModal("Input Salah", "Masukkan nomor telepon yang valid", "error");
      return;
    }

    setLoading(true);

    try {
      const fullPhone = "0" + phone;
      await login(fullPhone);

      // Pada tahap LOGIN (masukkan nomor), kita biasanya belum setUser secara utuh
      // agar tidak ter-trigger redirect oleh useEffect ke Dashboard.
      // Kita hanya pindah ke halaman OTP.
      
      navigate('/otp', { state: { phone: fullPhone } });

    } catch (error) {
      showModal("Ops! Nomor Salah", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-[32px] shadow-xl shadow-slate-200 w-full max-w-md border border-slate-100"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-red-600 tracking-tighter mb-2">MyTelkomsel</h1>
          <p className="text-slate-500 font-medium">Silahkan masuk dengan nomor HP Anda</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-slate-700 ml-1">Nomor Telepon</label>
            <div className="flex mt-2">
              <span className="bg-slate-100 px-4 py-4 rounded-l-2xl border border-r-0 border-slate-200 text-slate-500 font-bold">+62</span>
              <input
                type="tel"
                placeholder="8123456xxx"
                className="w-full p-4 border border-slate-200 rounded-r-2xl outline-none focus:ring-2 focus:ring-red-500 transition-all font-bold"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                disabled={loading}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-slate-400' : 'bg-red-600 hover:bg-red-700'} text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-red-200 transition-all active:scale-95`}
          >
            {loading ? 'MENGECEK NOMOR...' : 'MASUK'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;