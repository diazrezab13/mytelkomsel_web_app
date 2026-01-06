// src/services/transactionService.js
export const buyPackage = async (phone, pkg, refreshCallback) => {
    try {
        const response = await fetch(`http://localhost:8083/api/transaction/buy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone: phone,
                productId: pkg.id,
                productName: pkg.name,
                amount: pkg.price
            })
        });

        const result = await response.json();
        if (response.ok) {
            // 1. Refresh profil untuk dapat saldo terbaru dari User Service
            refreshCallback(phone);
            // 2. Beri notifikasi
            console.log(`Paket ${pkg.name} berhasil dibeli!`);
        }
    } catch (error) {
        console.error("Gagal melakukan pembelian paket:", error);
    }
};
