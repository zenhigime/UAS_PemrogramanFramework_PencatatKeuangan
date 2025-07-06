import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"; 
// Mengimpor komponen UI dari Material UI untuk membuat navigasi bar

import Link from "next/link"; 
// Menggunakan Link dari Next.js untuk navigasi antar halaman tanpa reload

// Komponen Navbar yang menampilkan AppBar (navigasi atas) dengan dua menu: Home dan About
export default function Navbar() {
  return (
    <AppBar position="static" color="primary"> 
      {/* Bar navigasi tetap di bagian atas (posisi statis), dengan warna utama */}
      <Toolbar>
        {/* Toolbar sebagai kontainer horizontal untuk isi AppBar */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Aplikasi Keuangan
        </Typography>
        {/* Box digunakan untuk mengatur tombol-tombol navigasi secara horizontal dengan jarak */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Link ke halaman Home */}
          <Link href="/" passHref>
            <Button color="inherit">🏠 Home</Button>
          </Link>
          {/* Link ke halaman About */}
          <Link href="/about" passHref>
            <Button color="inherit">ℹ️ About</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
