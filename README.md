# SIMRS Plus - Frontend Portal (Next.js)

Repositori ini merupakan antarmuka pengguna (Frontend) dari SIMRS Plus. Dibangun menggunakan **Next.js (App Router)** dengan **Tailwind CSS**, proyek ini menyediakan dua jalur interaksi utama yang terproteksi: **Dashboard Manajemen Staf/Dokter** dan **Portal Layanan Pasien Mandiri**.

## 🚀 Fitur Utama
- **Two-Gate Routing & Security:** Pemisahan jalur masuk admin (`/login`) dan portal pasien (`/portal/login`) yang diamankan oleh Next.js Middleware di tingkat server.
- **Admin/Doctor Workspace:** Formulir registrasi pasien, tabel dengan fitur *instant search* (Nama/NIK), manajemen rekam medis (EMR), dan tombol unduh laporan Excel bulanan terfilter.
- **Patient Self-Service Portal:** Pasien dapat melakukan pendaftaran kunjungan mandiri (booking poli), melihat history nomor antrean digital, mengubah jadwal (*reschedule*), serta melakukan pembatalan (*cancel*).
- **Live Queue Tracking Widget:** Pelacakan sisa antrean di depan pasien beserta estimasi waktu tunggu secara real-time (auto-refetch 10s).
- **Interactive Data Visualization:** Integrasi grafik batang (**Recharts**) pada halaman utama admin untuk membaca tren pendaftaran pasien secara bulanan.
- **Medical Resume Print System:** Fitur cetak resume rekam medis ke PDF yang bersih menggunakan CSS Media Print (otomatis menyembunyikan elemen web).

## 🛠️ Tech Stack & Libraries
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS & Lucide Icons
- **State Management:** Zustand (Auth Store) & JS-Cookie
- **Data Fetching:** TanStack React Query (v5) & Axios
- **Data Chart:** Recharts

## 📂 Struktur Folder (Clean Architecture)
```text
src/
├── app/
│   ├── page.tsx          # Dashboard Utama Admin & Dokter
│   ├── login/            # Halaman Login Admin/Dokter
│   └── portal/           # Pintu Portal Interaksi Pasien Mandiri
│       ├── login/        # Login Pasien (NIK & Tanggal Lahir)
│       ├── booking/      # Form Pendaftaran Poli Mandiri (Mode New/Edit)
│       └── history/      # Riwayat Kunjungan + Tombol Batalkan & Ubah
├── components/           # Komponen UI Reusable (Forms, Tables, StatsCard, Charts)
├── lib/                  # Konfigurasi Axios API Client & Token Interceptors
├── services/             # Abstraksi Logika API Call (Patient, Appointment, MR)
├── store/                # Manajemen Global State Global Token (Zustand)
└── middleware.ts         # Server-Side Route Guard (Proteksi Token Cookies)
```

## ⚙️ Cara Menjalankan Proyek di Lokal

### 1. Konfigurasi Environment Variables (`.env.local`)
Buat file `.env.local` di root folder:
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"
```

### 2. Jalankan Server Development
Aplikasi Frontend akan berjalan secara lokal di: `http://localhost:3000`
