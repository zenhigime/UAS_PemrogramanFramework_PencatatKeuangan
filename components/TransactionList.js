import { useSelector } from "react-redux";
// useSelector digunakan untuk mengambil data transaksi dari Redux state

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
} from "@mui/material";
// Mengimpor komponen UI dari Material UI untuk menampilkan daftar transaksi dalam format kartu

// Komponen TransactionList menampilkan semua transaksi dalam urutan terbaru
// dan menyediakan tombol untuk mengedit dan menghapus transaksi
export default function TransactionList({ onEdit, onDelete }) {
  // Mengambil data transaksi dari Redux store
  const transactions = useSelector((state) => state.transactions.items);

  // Menyusun transaksi dari yang terbaru ke terlama berdasarkan tanggal
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Tampilan daftar transaksi
  return (
    <Box sx={{ mt: 4 }}>
      {/* Judul dan garis pemisah */}
      <Typography variant="h6" gutterBottom>
        📋 Daftar Transaksi
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Menampilkan setiap transaksi dalam grid */}
      <Grid container spacing={2}>
        {sortedTransactions.map((tx) => (
          <Grid item xs={12} key={tx.id}>
            <Card>
              <CardContent>
                {/* Nama atau deskripsi transaksi */}
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {tx.description}
                </Typography>

                {/* Jumlah transaksi, diberi warna hijau jika income, merah jika expense */}
                <Typography
                  variant="h6"
                  sx={{
                    color: tx.type === "income" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {tx.type === "income" ? "+" : "-"} Rp{tx.amount}
                </Typography>

                {/* Kategori dan tanggal transaksi (format lokal) */}
                <Typography variant="body2">
                  {tx.category} • {new Date(tx.date).toLocaleDateString()}
                </Typography>

                {/* Tombol Edit dan Hapus */}
                <Box sx={{ mt: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onEdit(tx)} // Mengirim data transaksi ke fungsi edit
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    sx={{ ml: 1 }}
                    onClick={() => onDelete(tx.id)} // Menghapus transaksi berdasarkan id
                  >
                    🗑️ Hapus
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
