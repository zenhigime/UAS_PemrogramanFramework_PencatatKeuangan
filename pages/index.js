import { useEffect, useState } from "react";
// useState untuk menyimpan state modal dan transaksi yang sedang diedit
// useEffect untuk memuat transaksi dari backend saat pertama kali halaman dibuka

import { useDispatch } from "react-redux";
import { Container, Typography, Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import SummaryCards from "../components/SummaryCards";
import AddTransactionModal from "../components/AddTransactionModal";
import TransactionList from "../components/TransactionList";
// Mengimpor komponen UI utama: ringkasan, daftar, dan form transaksi

import { deleteTransaction, setTransactions } from "../store/transactionSlice";
// Mengimpor action Redux untuk menghapus dan menyimpan daftar transaksi

export default function Home() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false); // state untuk kontrol modal
  const [editedTransaction, setEditedTransaction] = useState(null); // state transaksi yang diedit

  // Membuka modal untuk tambah transaksi
  const handleOpenModal = () => {
    setEditedTransaction(null); // reset state edit
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false); // menutup modal
  const clearEdit = () => setEditedTransaction(null); // menghapus status edit

  // Fungsi untuk menghapus transaksi
  const handleDelete = async (id) => {
    try {
      await fetch("/api/transactions/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      dispatch(deleteTransaction(id)); // hapus transaksi dari Redux state
    } catch (err) {
      console.error("Gagal menghapus transaksi:", err);
    }
  };

  // Memuat transaksi dari API saat halaman pertama kali dibuka
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();

        console.log("🧪 Data dari API:", data, Array.isArray(data)); // DEBUG

        if (Array.isArray(data)) {
          dispatch(setTransactions(data)); // simpan ke Redux
        } else {
          console.error("❌ Data dari API bukan array:", data);
        }
      } catch (err) {
        console.error("Gagal memuat transaksi:", err);
      }
    };
    fetchTransactions();
  }, [dispatch]);

  return (
    <Box sx={{ padding: 3 }}>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        {/* Judul halaman */}
        <Typography variant="h4" align="center" gutterBottom>
          Aplikasi Pencatatan Keuangan
        </Typography>

        {/* Ringkasan pemasukan dan pengeluaran */}
        <SummaryCards />

        {/* Daftar semua transaksi */}
        <TransactionList
          onEdit={(tx) => {
            setEditedTransaction(tx); // buka modal dengan data untuk diedit
            setOpen(true);
          }}
          onDelete={handleDelete} // hapus transaksi
        />

        {/* Tombol tambah transaksi (floating) */}
        <Box sx={{ position: "fixed", bottom: 32, right: 32 }}>
          <Fab color="primary" onClick={handleOpenModal}>
            <AddIcon />
          </Fab>
        </Box>

        {/* Modal form tambah/edit transaksi */}
        <AddTransactionModal
          open={open}
          onClose={handleCloseModal}
          editedTransaction={editedTransaction}
          clearEdit={clearEdit}
        />
      </Container>
    </Box>
  );
}
