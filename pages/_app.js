import "../styles/globals.css";
// Mengimpor stylesheet global agar bisa digunakan di seluruh halaman

import Navbar from "../components/Navbar";
// Mengimpor komponen Navbar yang akan selalu tampil di setiap halaman

import { Provider } from "react-redux";
import { store } from "../store";
// Mengimpor Redux Provider dan store agar state global bisa diakses oleh seluruh komponen

import { CssBaseline } from "@mui/material";
// CssBaseline dari Material UI digunakan untuk mereset dan menormalkan styling default

// Komponen ini adalah entry point utama dari aplikasi Next.js
// Komponen ini membungkus semua halaman (Component) dan menambahkan elemen global seperti Redux Provider dan Navbar
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* Menyediakan Redux store ke seluruh komponen aplikasi */}
      <CssBaseline /> 
      {/* Reset CSS dari Material UI agar tampilan lebih konsisten */}
      <Navbar />
      {/* Navbar selalu muncul di semua halaman */}
      <Component {...pageProps} />
      {/* Menampilkan halaman yang diminta, sesuai dengan route */}
    </Provider>
  );
}

export default MyApp;

/*
File ini bertindak sebagai root component untuk semua halaman aplikasi.
- Mengaktifkan Redux global state
- Menyisipkan navbar dan styling global
- Menyediakan baseline UI styling dari Material UI
*/
