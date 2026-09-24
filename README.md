# TPQ Nurul Hidayah — Aplikasi Manajemen TPQ (PWA)

Aplikasi mobile-first (PWA) untuk manajemen TPQ dalam Bahasa Indonesia. Seluruh data tersimpan di perangkat (localStorage) dan saling terhubung antar menu.

## Navigasi Utama
1. **Informasi** — ringkasan kondisi TPQ: jumlah santri (Banin/Banat/Private), kehadiran hari ini, progress pembelajaran & hafalan, pencapaian terbaru, jadwal/sesi hari ini, aktivitas terbaru, dan pengumuman.
2. **Kelas** — tempat utama pencatatan pembelajaran per kelompok (Banin, Banat, Private) dengan alur sesi.
3. **Kantor** — pusat administrasi: Data Santri, Data Wali, Data Pengajar, Data Kitab/Materi, Data Hafalan, Pengaturan TPQ, Backup & Restore, dan Administrasi (pengumuman).
4. **Raport** — rekap perkembangan santri per periode (bulan/semester/tahun) dengan narasi yang dapat dibantu AI, diedit, disimpan, dan dicetak ke PDF.

## Alur Mulai Kelas
1. Guru memilih kelompok lalu menekan **Mulai Kelas** (membuat sesi baru).
2. Semua santri kelompok berstatus **Belum Dipanggil**.
3. Guru memilih santri → **Hadir & Mulai Setoran**.
4. Guru mencatat: tanggal, kitab, surah, halaman, baris, kelancaran, paraf guru, keterangan.
5. **Bantu AI** membuat draft keterangan — guru tetap dapat mengedit sebelum menyimpan.
6. Setelah disimpan, status santri menjadi **Selesai** dan sistem menawarkan santri berikutnya.
7. Absensi: Izin / Sakit / Berhalangan dipilih manual; santri yang masih **Belum Dipanggil** saat sesi ditutup otomatis menjadi **Alpa**.
8. Setiap setoran selalu menjadi riwayat baru — catatan lama tidak diubah.

## Profil Santri
Nama, foto/inisial, jenis kelamin, grup, jenjang, posisi belajar terakhir + shortcut Kehadiran, Adab, Prestasi, Bintang, serta riwayat pembelajaran/kehadiran/adab/prestasi/bintang.

## Teknologi
- HTML + CSS + JavaScript vanilla (tanpa framework) — ringan, cepat, offline-ready (localStorage).
- PWA: manifest + ikon, dapat dipasang di HP.
- Ikon: SVG inline (tanpa dependensi eksternal selain font).

## Backup
Menu Kantor → Backup & Restore untuk mengunduh seluruh data sebagai JSON atau memulihkannya kembali.
