import { prisma } from "../../../lib/prisma";
// Mengimpor instance Prisma untuk melakukan operasi database

// API handler untuk menambahkan transaksi baru ke database
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { type, amount, category, description, date } = req.body;
      // Mengambil data transaksi dari body request

      console.log("📩 Data diterima:", req.body); // DEBUG: menampilkan data yang dikirim dari client

      // Menyimpan transaksi baru ke database menggunakan Prisma
      const newTx = await prisma.transaction.create({
        data: {
          type,
          amount,
          category,
          description,
          date: new Date(date), // Mengubah string tanggal ke objek Date
        },
      });

      res.status(200).json(newTx); // Mengembalikan data transaksi baru sebagai respon
    } catch (error) {
      // Menangani error saat proses penyimpanan
      console.error("❌ Gagal menambahkan transaksi:", error);
      res.status(500).json({ error: "Gagal menambahkan transaksi" });
    }
  } else {
    // Menolak metode selain POST
    res.status(405).json({ message: "Method not allowed" });
  }
}
