import { useState } from "react";
// useState digunakan untuk mengelola form input transaksi

import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material";
// Mengimpor komponen UI dari Material UI untuk membuat form input transaksi

import { useDispatch } from "react-redux";
// useDispatch digunakan untuk mengirim aksi (action) ke Redux store

import { addTransaction } from "../store/transactionSlice";
// Mengimpor action untuk menambahkan transaksi ke Redux store

// Komponen TransactionForm: menampilkan form untuk input transaksi baru
export default function TransactionForm({ onSuccess }) {
  const dispatch = useDispatch(); // Inisialisasi dispatch Redux

  // State lokal untuk menyimpan data form transaksi
  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0], // Default tanggal hari ini
  });

  // Daftar pilihan kategori berdasarkan jenis transaksi
  const categoryOptions = {
    income: ["paycheck", "etc"],
    expense: ["groceries", "food", "online shop", "etc"],
  };

  // Fungsi untuk menangani perubahan input form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Fungsi untuk mengirim form ke backend saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    try {
      const res = await fetch("/api/transactions/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(addTransaction(data)); // Tambahkan ke Redux store
        onSuccess(); // Tutup modal atau reset tampilan setelah sukses
      } else {
        alert(data.error || "Gagal menambahkan transaksi");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Terjadi kesalahan saat mengirim data");
    }
  };

  // Tampilan form input transaksi
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {/* Pilih jenis transaksi: income / expense */}
        <Grid xs={6}>
          <FormControl fullWidth>
            <InputLabel>Jenis</InputLabel>
            <Select
              name="type"
              value={form.type}
              label="Jenis"
              onChange={handleChange}
            >
              <MenuItem value="income">Pemasukan</MenuItem>
              <MenuItem value="expense">Pengeluaran</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Pilih kategori berdasarkan jenis transaksi */}
        <Grid xs={6}>
          <FormControl fullWidth>
            <InputLabel>Kategori</InputLabel>
            <Select
              name="category"
              value={form.category}
              label="Kategori"
              onChange={handleChange}
            >
              {categoryOptions[form.type].map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Input nominal transaksi */}
        <Grid xs={6}>
          <TextField
            fullWidth
            label="Nominal"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Input tanggal transaksi */}
        <Grid xs={6}>
          <TextField
            fullWidth
            label="Tanggal"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>

        {/* Input deskripsi transaksi */}
        <Grid xs={12}>
          <TextField
            fullWidth
            label="Keterangan"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Tombol untuk menyimpan data */}
        <Grid xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Simpan
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

/*
Penjelasan tambahan:
- dispatch(addTransaction(data)) → menambahkan transaksi baru ke Redux state
- onSuccess() → dipanggil setelah submit berhasil, bisa untuk menutup modal atau refresh UI
*/
