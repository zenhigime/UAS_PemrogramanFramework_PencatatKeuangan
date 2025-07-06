import { useEffect, useState } from "react";
// useEffect: untuk fetch data dari GitHub saat komponen dipasang
// useState: untuk menyimpan data repositori dan error status

import {
  Typography,
  Box,
  Card,
  CardContent,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
// Mengimpor komponen Material UI untuk tampilan About page

import styles from "../styles/about.module.css";
// Mengimpor styling lokal khusus halaman About

const GITHUB_USERNAME = "zenhigime";
// Username GitHub yang digunakan untuk fetch data repositori

const VIDEO_URL = "https://youtu.be/3SI1ahOn2jg";
// URL video penjelasan tugas

const GITHUB_REPO_LINK =
  "https://github.com/zenhigime/UAS_PemrogramanFramework_PencatatKeuangan";
// Link repo utama sebagai fallback jika fetch repos gagal

// Komponen halaman About untuk menampilkan:
// 1. Video penjelasan
// 2. Daftar repositori GitHub user
export default function About() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(false);

  // Fetch daftar repositori dari GitHub saat komponen pertama kali dimuat
  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
      .then((res) => {
        if (!res.ok) throw new Error("GitHub API error"); // Jika gagal, lempar error
        return res.json(); // Convert response ke JSON
      })
      .then((data) => {
        const userRepos = data.filter((repo) => !repo.fork); // Filter agar hanya repositori asli (bukan fork)
        setRepos(userRepos);
      })
      .catch((err) => {
        console.error("Error fetching repos:", err);
        setError(true); // Set status error jika fetch gagal
      });
  }, []);

  return (
    <Box className={styles.aboutcontainer} sx={{ padding: 3 }}>
      {/* Card untuk Video Penjelasan */}
      <Card className={styles.aboutcard}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            📺 Video Penjelasan Tugas
          </Typography>
          <Typography>
            Anda dapat menonton penjelasan lengkap saya di video berikut:
            <br />
            <Link href={VIDEO_URL} target="_blank" rel="noopener">
              [Klik di sini untuk menonton video penjelasan saya]
            </Link>
          </Typography>
        </CardContent>
      </Card>

      {/* Card untuk Daftar Repo GitHub */}
      <Card className={styles.aboutcard}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            📁 Repository GitHub Saya
          </Typography>

          {error ? (
            // Jika fetch gagal, tampilkan pesan error dan fallback link
            <>
              <Typography color="error">
                Gagal memuat repositori dari GitHub API.
              </Typography>
              <Typography>
                Anda masih bisa mengakses source code saya di:{" "}
                <Link href={GITHUB_REPO_LINK} target="_blank" rel="noopener">
                  {GITHUB_REPO_LINK}
                </Link>
              </Typography>
            </>
          ) : repos.length === 0 ? (
            // Jika masih loading, tampilkan status loading
            <Typography>Sedang memuat data repositori...</Typography>
          ) : (
            // Jika berhasil, tampilkan daftar repositori
            <List>
              {repos.map((repo) => (
                <ListItem key={repo.id} disablePadding>
                  <ListItemText
                    primary={
                      <Link href={repo.html_url} target="_blank" rel="noopener">
                        {repo.name}
                      </Link>
                    }
                    secondary={repo.description || "Tanpa deskripsi"}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
