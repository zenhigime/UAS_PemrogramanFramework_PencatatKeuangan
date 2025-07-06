import { configureStore } from "@reduxjs/toolkit";
// Mengimpor fungsi dari Redux Toolkit untuk membuat store

import transactionReducer from "./transactionSlice";
// Mengimpor reducer yang mengatur state transaksi

// Membuat dan mengekspor Redux store utama aplikasi
// Semua slice reducer dikumpulkan di sini
export const store = configureStore({
  reducer: {
    transactions: transactionReducer, // State global: transactions
  },
});

/*
File ini bertugas untuk:
Mengonfigurasi Redux store
Menggabungkan reducer yang ada (saat ini hanya transactionReducer)
Mengekspor store agar bisa digunakan di _app.js (melalui <Provider>)
*/
