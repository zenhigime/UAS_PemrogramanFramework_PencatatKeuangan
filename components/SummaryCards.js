import { useSelector } from "react-redux"; 
// Mengimpor hook useSelector dari Redux untuk mengambil data dari state global

import { Card, CardContent, Typography, Grid } from "@mui/material"; 
// Mengimpor komponen UI dari Material UI untuk tampilan kartu dan layout grid

// Komponen SummaryCards digunakan untuk menampilkan ringkasan total pemasukan dan pengeluaran
export default function SummaryCards() {
  // Mengambil array transaksi dari Redux store, default ke array kosong jika belum ada
  const transactions = useSelector((state) => state.transactions.items || []);
  console.log("🧪 transactions:", transactions, Array.isArray(transactions)); // Debugging: memastikan data berbentuk array

  // Menghitung total pemasukan dengan menjumlahkan semua transaksi bertipe 'income'
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  // Menghitung total pengeluaran dengan menjumlahkan semua transaksi bertipe 'expense'
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // Menampilkan dua kartu ringkasan: total pemasukan dan total pengeluaran
  return (
    <Grid container spacing={2} sx={{ my: 4 }}>
      {/* Kartu untuk total pemasukan */}
      <Grid item xs={6}>
        <Card sx={{ backgroundColor: "#e8f5e9" }}>
          <CardContent>
            <Typography variant="h6">Total Pemasukan</Typography>
            <Typography variant="h5" color="green">
              Rp {totalIncome.toLocaleString("id-ID")}
              {/* Format angka ke format lokal Indonesia, misal: 1.000.000 */}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      {/* Kartu untuk total pengeluaran */}
      <Grid item xs={6}>
        <Card sx={{ backgroundColor: "#ffebee" }}>
          <CardContent>
            <Typography variant="h6">Total Pengeluaran</Typography>
            <Typography variant="h5" color="red">
              Rp {totalExpense.toLocaleString("id-ID")}
              {/* Format angka ke format lokal Indonesia */}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

/*
Fungsi utama komponen ini:
- Mengambil data transaksi dari Redux store
- Menghitung total pemasukan dan pengeluaran secara terpisah
- Menampilkan hasilnya dalam dua kartu UI dengan format angka lokal
*/
