import React from 'react';

const MessageModal = ({ isOpen, onClose, title, message, type = 'error' }) => {
  if (!isOpen) return null;

  return (
    // Bagian ini yang diubah: bg-white/30 dan backdrop-blur-sm
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-md px-4 transition-all">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-gray-100">
        <div className="text-center">
          {/* Icon */}
          <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 ${
            type === 'error' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
          }`}>
            {type === 'error' ? (
              <span className="text-3xl font-bold">!</span>
            ) : (
              <span className="text-3xl font-bold">✓</span>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500 mb-8 leading-relaxed">{message}</p>
          
          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl font-bold text-white bg-[#EC0A23] hover:bg-[#C8091E] active:scale-95 transition-all shadow-lg shadow-red-200"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;