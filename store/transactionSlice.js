import { createSlice } from "@reduxjs/toolkit";
// Mengimpor createSlice untuk membuat slice Redux (otomatis membuat action & reducer)

// Slice ini mengatur state transaksi keuangan
const transactionSlice = createSlice({
  name: "transactions", // Nama slice, juga akan menjadi prefix untuk action type
  initialState: {
    items: [], // Menyimpan daftar semua transaksi
  },
  reducers: {
    // Menambahkan transaksi baru ke array items
    addTransaction: (state, action) => {
      state.items.push(action.payload);
    },

    // Memperbarui transaksi yang sudah ada berdasarkan ID
    updateTransaction: (state, action) => {
      const index = state.items.findIndex((tx) => tx.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    // Menghapus transaksi berdasarkan ID
    deleteTransaction: (state, action) => {
      state.items = state.items.filter((tx) => tx.id !== action.payload);
    },

    // Mengatur seluruh daftar transaksi (biasanya dipanggil saat fetch dari database)
    setTransactions: (state, action) => {
      state.items = action.payload;
    },
  },
});

// Mengekspor semua action yang sudah dibuat otomatis oleh createSlice
export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setTransactions,
} = transactionSlice.actions;

// Mengekspor reducer untuk digunakan dalam store
export default transactionSlice.reducer;
