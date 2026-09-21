# Ngaji Tracker

Fondasi PWA mobile-first untuk pencatatan perkembangan santri.

## Kelompok
- Banin
- Banat
- Private

## Fitur fondasi
Dashboard informasi, daftar santri, profil santri dengan sheet perkembangan, database D1 schema, dan struktur awal raport.

## Deploy
1. Buat D1 database `ngaji-tracker-db`.
2. Ganti `REPLACE_WITH_D1_DATABASE_ID` pada `wrangler.toml`.
3. Jalankan migration.
4. Deploy Worker + Assets.

Versi awal sengaja memisahkan UI/fondasi data dari integrasi AI, PDF, Fonnte, Cron, R2 backup agar modul berikutnya dapat ditambahkan tanpa mengubah struktur inti.
