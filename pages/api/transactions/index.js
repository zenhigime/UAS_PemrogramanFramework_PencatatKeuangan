import { prisma } from "../../../lib/prisma";
// Mengimpor instance Prisma Client untuk mengakses database

// API handler untuk mengambil semua transaksi dari database
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Mengambil semua data transaksi dari tabel menggunakan Prisma
      const allTx = await prisma.transaction.findMany();

      console.log("📦 Transaksi dari DB:", allTx); // DEBUG: menampilkan data hasil query
      res.status(200).json(allTx); // Mengembalikan data dalam bentuk JSON
    } catch (err) {
      // Menangani error saat mengambil data
      console.error("❌ Gagal mengambil transaksi:", err);
      res.status(500).json({ error: err.message });
    }
  } else {
    // Menolak metode selain GET
    res.status(405).json({ message: "Method not allowed" });
  }
}
