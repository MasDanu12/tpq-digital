PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS kelompok (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 nama TEXT NOT NULL UNIQUE
);
INSERT OR IGNORE INTO kelompok (nama) VALUES ('Banin'),('Banat'),('Private');

CREATE TABLE IF NOT EXISTS jenjang (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 nama TEXT NOT NULL UNIQUE,
 urutan INTEGER NOT NULL DEFAULT 0,
 aktif INTEGER NOT NULL DEFAULT 1
);
INSERT OR IGNORE INTO jenjang (nama,urutan) VALUES
 ('Faturrahman',1),('Al-Bayan',2),('Al-Qur''an',3),('Fashiatul Huruf',4);

CREATE TABLE IF NOT EXISTS santri (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 nama_anak TEXT NOT NULL,
 jenis_kelamin TEXT NOT NULL,
 nama_wali TEXT,
 no_wa_wali TEXT,
 kelompok_id INTEGER NOT NULL,
 jenjang_awal_id INTEGER,
 aktif INTEGER NOT NULL DEFAULT 1,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY(kelompok_id) REFERENCES kelompok(id),
 FOREIGN KEY(jenjang_awal_id) REFERENCES jenjang(id)
);

CREATE TABLE IF NOT EXISTS sesi_pembelajaran (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 kelompok_id INTEGER NOT NULL,
 tanggal TEXT NOT NULL,
 jam_mulai TEXT,
 jam_selesai TEXT,
 status TEXT NOT NULL DEFAULT 'dibuka',
 FOREIGN KEY(kelompok_id) REFERENCES kelompok(id)
);

CREATE TABLE IF NOT EXISTS kehadiran (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 sesi_id INTEGER NOT NULL,
 santri_id INTEGER NOT NULL,
 status TEXT NOT NULL,
 catatan TEXT,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE(sesi_id,santri_id),
 FOREIGN KEY(sesi_id) REFERENCES sesi_pembelajaran(id),
 FOREIGN KEY(santri_id) REFERENCES santri(id)
);

CREATE TABLE IF NOT EXISTS riwayat_pembelajaran (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 santri_id INTEGER NOT NULL,
 sesi_id INTEGER,
 jenjang_id INTEGER NOT NULL,
 kitab TEXT,
 jilid TEXT,
 halaman_awal TEXT,
 baris_awal TEXT,
 halaman_akhir TEXT,
 baris_akhir TEXT,
 materi TEXT,
 kelancaran INTEGER,
 makhraj INTEGER,
 tajwid INTEGER,
 panjang_pendek INTEGER,
 waqaf_ibtida INTEGER,
 catatan TEXT,
 tanggal TEXT NOT NULL,
 FOREIGN KEY(santri_id) REFERENCES santri(id),
 FOREIGN KEY(sesi_id) REFERENCES sesi_pembelajaran(id),
 FOREIGN KEY(jenjang_id) REFERENCES jenjang(id)
);

CREATE TABLE IF NOT EXISTS penilaian_adab (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 santri_id INTEGER NOT NULL,
 tanggal TEXT NOT NULL,
 aspek TEXT NOT NULL,
 status TEXT NOT NULL,
 catatan TEXT,
 FOREIGN KEY(santri_id) REFERENCES santri(id)
);

CREATE TABLE IF NOT EXISTS tajwid (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 santri_id INTEGER NOT NULL,
 tanggal TEXT NOT NULL,
 materi TEXT NOT NULL,
 nilai INTEGER,
 catatan TEXT,
 FOREIGN KEY(santri_id) REFERENCES santri(id)
);

CREATE TABLE IF NOT EXISTS hafalan (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 santri_id INTEGER NOT NULL,
 jenis TEXT NOT NULL,
 materi TEXT NOT NULL,
 bagian TEXT,
 tanggal TEXT NOT NULL,
 status TEXT,
 nilai INTEGER,
 catatan TEXT,
 FOREIGN KEY(santri_id) REFERENCES santri(id)
);

CREATE TABLE IF NOT EXISTS target (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 santri_id INTEGER NOT NULL,
 jenis TEXT NOT NULL,
 target TEXT NOT NULL,
 deadline TEXT,
 progress INTEGER DEFAULT 0,
 status TEXT DEFAULT 'Berjalan',
 catatan TEXT,
 FOREIGN KEY(santri_id) REFERENCES santri(id)
);

CREATE TABLE IF NOT EXISTS pencapaian (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 santri_id INTEGER NOT NULL,
 jenjang_id INTEGER,
 tipe TEXT NOT NULL,
 pencapaian TEXT NOT NULL,
 tanggal TEXT NOT NULL,
 status TEXT DEFAULT 'Tercapai',
 catatan TEXT,
 FOREIGN KEY(santri_id) REFERENCES santri(id),
 FOREIGN KEY(jenjang_id) REFERENCES jenjang(id)
);

CREATE TABLE IF NOT EXISTS bintang (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 santri_id INTEGER NOT NULL,
 tanggal TEXT NOT NULL,
 jumlah INTEGER NOT NULL DEFAULT 1,
 alasan TEXT,
 FOREIGN KEY(santri_id) REFERENCES santri(id)
);

CREATE TABLE IF NOT EXISTS raport (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 santri_id INTEGER NOT NULL,
 periode_mulai TEXT NOT NULL,
 periode_selesai TEXT NOT NULL,
 status TEXT DEFAULT 'draft',
 isi_json TEXT,
 ai_draft TEXT,
 catatan_guru TEXT,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY(santri_id) REFERENCES santri(id)
);

CREATE TABLE IF NOT EXISTS tpq_settings (
 id INTEGER PRIMARY KEY CHECK(id=1),
 nama_tpq TEXT,
 alamat TEXT,
 kepala_tpq TEXT,
 no_kontak TEXT
);
