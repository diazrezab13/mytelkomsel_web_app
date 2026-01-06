// src/services/userService.js
const BASE_URL_USER = 'http://localhost:8082/api/user';

export const fetchUserProfile = async (phone) => {
  try {
    const res = await fetch(`${BASE_URL_USER}/profile/${phone}`);
    const result = await res.json();

    if (result.code !== 200) {
      throw new Error(result.message || "Gagal memuat profil pengguna");
    }

    const resHistory = await fetch(`http://localhost:8083/api/transaction/history/${phone}`);
    const resultHistory = await resHistory.json();

    if (resultHistory.code !== 200) {
      throw new Error(resultHistory.message || "Gagal memuat riwayat transaksi");
    }

    return {
      balance: result.data.balance,
      quota: result.data.quota,
      points: result.data.points,
      history: resultHistory.data || []
    };
  } catch (error) {
    console.error("Gagal mengambil profil user:", error);
    throw error;
  }
};

export const topUpBalance = async (phone, amount) => {
  try {
    const response = await fetch(`${BASE_URL_USER}/topup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        balance: amount
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result.data.balance;
  } catch (error) {
    console.error("Gagal top up:", error);
    throw error;
  }
};