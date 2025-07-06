import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useDispatch } from "react-redux"; // Mengakses fungsi dispatch dari Redux untuk mengirim action ke store global
import {
  addTransaction,
  updateTransaction,
} from "../store/transactionSlice"; // Mengimpor action creator dari Redux slice transaksi
import { useState, useEffect } from "react"; // Menggunakan hook bawaan React
import styles from "../styles/editTx.module.css"; // Mengimpor styling CSS khusus untuk modal transaksi

// Kategori tetap untuk pemasukan dan pengeluaran
const incomeCategories = ["paycheck", "etc"];
const expenseCategories = ["groceries", "food", "online shop", "etc"];

// Komponen utama yang merender modal untuk menambah atau mengedit transaksi
export default function AddTransactionModal({
  open, // boolean: apakah modal terbuka
  onClose, // fungsi: untuk menutup modal
  editedTransaction, // objek: data transaksi yang sedang diedit
  clearEdit, // fungsi: untuk mereset status edit
}) {
  const dispatch = useDispatch(); // Inisialisasi dispatch Redux untuk mengirim action

  const isEditing = !!editedTransaction; // Menentukan apakah sedang dalam mode edit

  // useState digunakan untuk menyimpan nilai form transaksi 
  // jenis transaksi, nominal, deskripsi, kategori, dan tanggal.
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // useEffect dijalankan saat transaksi yang diedit berubah atau modal dibuka.
  // Mengisi form jika sedang mengedit transaksi, atau mereset form jika menambah baru -> open pada [editedTransaction, open]
  useEffect(() => {
    if (editedTransaction) {
      setType(editedTransaction.type);
      setAmount((editedTransaction.amount ?? "").toString());
      setDescription(editedTransaction.description);
      setCategory(editedTransaction.category);
      setDate(editedTransaction.date);
    } else {
      setType("income");
      setAmount("");
      setDescription("");
      setCategory("");
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [editedTransaction, open]);

  // Fungsi untuk menyimpan transaksi, baik baru maupun hasil edit.
  // Mengirim data ke backend melalui endpoint API, lalu meng-update state global melalui Redux.
  const handleSubmit = async () => {
    const transactionData = {
      type,
      amount: Number(amount),
      description,
      category,
      date,
    };

    try {
      if (isEditing) {
        const res = await fetch("/api/transactions/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...transactionData,
            id: editedTransaction.id,
          }),
        });
        const updated = await res.json();
        dispatch(updateTransaction(updated)); // Update state global Redux
        clearEdit(); // Reset status edit
      } else {
        const res = await fetch("/api/transactions/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transactionData),
        });
        const saved = await res.json();
        dispatch(addTransaction(saved)); // Tambahkan ke state global Redux
      }

      onClose(); // Tutup modal setelah submit berhasil
    } catch (error) {
      console.error("Gagal menyimpan transaksi:", error);
    }
  };

  // Bagian tampilan (UI) modal: form untuk input transaksi
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose(); // Tutup modal
        clearEdit(); // Reset status edit saat modal ditutup
      }}
    >
      <Box className={styles.styleEditTx}>
        <Typography variant="h6" gutterBottom>
          {isEditing ? "✏️ Edit Transaksi" : "➕ Tambah Transaksi"}
        </Typography>

        {/* Tombol untuk memilih jenis transaksi: pemasukan atau pengeluaran */}
        <ToggleButtonGroup
          fullWidth
          color="primary"
          value={type}
          exclusive
          onChange={(e, newType) => newType && setType(newType)}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="income">Pemasukan</ToggleButton>
          <ToggleButton value="expense">Pengeluaran</ToggleButton>
        </ToggleButtonGroup>

        {/* Input nominal transaksi */}
        <TextField
          fullWidth
          label="Nominal"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Input keterangan transaksi */}
        <TextField
          fullWidth
          label="Keterangan"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Dropdown kategori, menyesuaikan jenis transaksi */}
        <TextField
          fullWidth
          select
          label="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ mb: 2 }}
        >
          {(type === "income" ? incomeCategories : expenseCategories).map(
            (cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            )
          )}
        </TextField>

        {/* Input tanggal transaksi */}
        <TextField
          fullWidth
          type="date"
          label="Tanggal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ mb: 3 }}
          InputLabelProps={{ shrink: true }}
        />

        {/* Tombol submit untuk menyimpan atau update transaksi */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          {isEditing ? "Update Transaksi" : "Tambah Transaksi"}
        </Button>
      </Box>
    </Modal>
  );
}
