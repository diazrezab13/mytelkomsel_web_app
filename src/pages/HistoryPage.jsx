import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const HistoryPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-500 mb-6 font-bold">
          <ArrowLeft size={20} /> Ke Dashboard
        </button>

        <h2 className="text-2xl font-black mb-6">Riwayat Transaksi</h2>

        <div className="space-y-4">
          {user.history.map((trx, idx) => (
            <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="font-black text-slate-800">{trx.productName}</p>
                  <p className="text-xs text-slate-400">{trx.createdAt} • {trx.trxId}</p>
                </div>
              </div>
              <p className={`font-black ${trx.type === 'plus' ? 'text-green-600' : 'text-slate-800'}`}>
                {trx.type === 'plus' ? '+' : '-'} Rp {trx.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;