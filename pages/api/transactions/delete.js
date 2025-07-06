import { prisma } from "../../../lib/prisma";
// Mengimpor instance Prisma untuk melakukan operasi pada database

// API handler untuk menghapus transaksi berdasarkan ID
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { id } = req.body;
      // Mengambil ID transaksi dari body request

      console.log("🗑️ Menghapus transaksi id:", id); // DEBUG: menampilkan ID yang akan dihapus

      // Menghapus transaksi dari database berdasarkan ID
      const deleted = await prisma.transaction.delete({
        where: { id: Number(id) }, // Prisma mengharuskan id bertipe number (integer)
      });

      res.status(200).json(deleted); // Mengembalikan data transaksi yang telah dihapus
    } catch (err) {
      // Menangani error jika penghapusan gagal
      console.error("❌ Gagal menghapus transaksi:", err);
      res.status(500).json({ error: "Gagal menghapus transaksi" });
    }
  } else {
    // Menolak metode selain POST
    res.status(405).json({ message: "Method not allowed" });
  }
}
