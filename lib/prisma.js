import { PrismaClient } from "@prisma/client";
// Mengimpor PrismaClient untuk mengakses database menggunakan Prisma

let globalForPrisma = global;
// Menyimpan Prisma client ke dalam objek global agar tidak dibuat ulang saat hot-reload (khusus development)

const prisma = globalForPrisma.prisma || new PrismaClient();
// Jika sudah ada instance prisma di global, gunakan itu
// Jika belum ada, buat instance PrismaClient baru

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
// Di lingkungan selain production (misal: development), simpan instance Prisma ke global agar tidak terjadi duplikasi saat reload

export { prisma };
// Mengekspor instance prisma agar bisa digunakan di file lain untuk query ke database
