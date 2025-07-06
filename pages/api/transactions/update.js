import { prisma } from "../../../lib/prisma";
// Mengimpor Prisma Client instance untuk operasi database

// API handler untuk memperbarui data transaksi berdasarkan ID
export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { id, type, amount, description, category, date } = req.body;
      // Mengambil data transaksi yang akan diupdate dari body request

      console.log("📤 Update request body:", req.body); // DEBUG: menampilkan data update

      // Menyusun data yang akan diupdate
      const updateData = {
        type,
        amount: parseFloat(amount), // Pastikan amount berupa angka
        description,
        category,
      };

      if (date) {
        updateData.date = new Date(date); // Pastikan tanggal valid
      }

      // Update data transaksi di database berdasarkan ID
      const updated = await prisma.transaction.update({
        where: {
          id: Number(id), // ID harus integer
        },
        data: updateData,
      });

      res.status(200).json(updated); // Kirim hasil update ke client
    } catch (err) {
      // Menangani error jika gagal update
      console.error("❌ Gagal update transaksi:", err);
      res.status(500).json({ error: "Gagal memperbarui transaksi." });
    }
  } else {
    // Menolak method selain PUT
    res.status(405).json({ message: "Method not allowed" });
  }
}
