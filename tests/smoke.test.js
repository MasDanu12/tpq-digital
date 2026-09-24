/* =====================================================
   Smoke test TPQ Nurul Hidayah
   Menjalankan store.js + app.js di sandbox vm dengan stub
   DOM/localStorage, lalu menguji alur inti fungsional.
   Jalankan: node tests/smoke.test.js
   ===================================================== */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const storeSrc = fs.readFileSync(path.join(root, "public", "store.js"), "utf8");
const appSrc = fs.readFileSync(path.join(root, "public", "app.js"), "utf8");

/* ---------- stub browser ---------- */
const fakeStorage = () => {
  const m = new Map();
  return {
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: k => m.delete(k),
    _map: m,
  };
};

const appEl = { innerHTML: "" };
const documentStub = {
  getElementById: id => (id === "app" ? appEl : { classList: { add() {}, remove() {} } }),
  querySelector: () => null,
  querySelectorAll: () => [],
  createElement: () => ({ click() {}, set href(v) {}, set download(v) {} }),
  body: { classList: { add() {}, remove() {} } },
};

const sandbox = {
  console,
  setTimeout,
  clearTimeout,
  localStorage: fakeStorage(),
  document: documentStub,
  window: { scrollTo() {}, print() {} },
  URL: { createObjectURL: () => "blob:x", revokeObjectURL() {} },
  Blob: class { constructor() {} },
  FileReader: class {},
};
vm.createContext(sandbox);

const run = expr => vm.runInContext(expr, sandbox);

/* ---------- assertion helpers ---------- */
let passed = 0;
const failures = [];
function ok(cond, label) {
  if (cond) { passed++; console.log("  PASS  " + label); }
  else { failures.push(label); console.log("  FAIL  " + label); }
}
function eq(actual, expected, label) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  ok(a === e, label + (a === e ? "" : `  (got ${a}, want ${e})`));
}

/* ---------- load app ---------- */
console.log("== Memuat store.js & app.js di sandbox ==");
vm.runInContext(storeSrc, sandbox, { filename: "store.js" });
vm.runInContext(appSrc, sandbox, { filename: "app.js" });
ok(true, "store.js + app.js dieksekusi tanpa error");

/* ---------- 1. seed data ---------- */
console.log("== Seed data ==");
eq(run("getStudents().length"), 6, "seed: 6 santri");
eq(run("getGuardians().length"), 3, "seed: 3 wali");
eq(run("getTeachers().length"), 3, "seed: 3 pengajar");
eq(run("getBooks().length"), 5, "seed: 5 kitab");
eq(run("getMemorization().length"), 3, "seed: 3 materi hafalan");
ok(run("getAnnouncements().length") >= 1, "seed: ada pengumuman");
eq(run("getProfile().name"), "TPQ Nurul Hidayah", "seed: profil TPQ");

/* ---------- 2. utilitas ---------- */
console.log("== Utilitas ==");
ok(/^\d{4}-\d{2}-\d{2}$/.test(run("todayISO()")), "todayISO format YYYY-MM-DD");
ok(run("fmtDate('2026-09-24')").includes("Sep"), "fmtDate menghasilkan bulan Indonesia");
eq(run("dayName('2026-09-24')"), "Kamis", "dayName 2026-09-24 = Kamis");
eq(run('esc("<b>&\'")'), "&lt;b&gt;&amp;&#039;", "esc meng-escape HTML");
eq(run("waLink('08123456789','halo')"), "https://wa.me/628123456789?text=" + encodeURIComponent("halo"), "waLink konversi 08→62");
ok(run("aiDraft({kitab:'Iqra 1',surah:'Al-Fatihah',page:'3',lines:'1-5',kelancaran:'lancar'})").includes("sangat lancar"), "aiDraft memakai kelancaran");
ok(run("aiDraftAdab({type:'pelanggaran',adab:'berisik'})").includes("berisik"), "aiDraftAdab memakai adab");

/* ---------- 3. alur sesi kelas ---------- */
console.log("== Alur sesi kelas ==");
const sessId = run("startSession('Banin').id");
ok(!!sessId, "sesi Banin dibuat");
eq(run("getActiveSession('Banin').called.length"), 0, "semua santri mulai: Belum Dipanggil");
eq(run("activeStudents('Banin').length"), 3, "Banin punya 3 santri aktif");

run("markCalled(getActiveSession('Banin'),'s1')");
ok(run("getActiveSession('Banin').called.includes('s1')"), "s1 dipanggil (sedang setoran)");

run("markAbsent(getActiveSession('Banin'),'s2','sakit')");
eq(run("getActiveSession('Banin').absent.s2"), "sakit", "s2 ditandai sakit");

run("markFinished(getActiveSession('Banin'),'s1')");
ok(run("getActiveSession('Banin').finished.includes('s1')"), "s1 selesai setoran");

eq(run("sessionAttendanceCount('Banin').belum"), 1, "sisa 1 santri belum dipanggil");

run("closeSession(getActiveSession('Banin'))");
ok(!run("getActiveSession('Banin')"), "sesi ditutup (tidak ada sesi berjalan)");
eq(run("getSessions()[0].status"), "selesai", "status sesi = selesai");

/* absensi masuk riwayat kehadiran */
const sum1 = run("JSON.stringify(studentAttendanceSummary('s1'))");
ok(JSON.parse(sum1).hadir === 1, "s1 tercatat hadir di riwayat");
const sum2 = run("JSON.stringify(studentAttendanceSummary('s2'))");
ok(JSON.parse(sum2).sakit === 1, "s2 sakit masuk riwayat kehadiran");
const sum3 = run("JSON.stringify(studentAttendanceSummary('s3'))");
ok(JSON.parse(sum3).alpa === 1, "s3 (tidak dipanggil) otomatis alpa");

/* ---------- 4. catatan pembelajaran ---------- */
console.log("== Catatan pembelajaran ==");
run("addLearningRecord({studentId:'s1',studentName:'Ahmad Fauzi',group:'Banin',date:todayISO(),kitab:'Iqra 1',surah:'Al-Fatihah',page:'3',lines:'',hafalanId:null,kelancaran:'lancar',paraph:'AR',note:'bagus'})");
eq(run("getRecords().length"), 1, "1 setoran tercatat");
eq(run("recordsToday().length"), 1, "setoran terhitung hari ini");

const rs = run("JSON.stringify(reportStats('s1', todayISO(), todayISO()))");
const stats = JSON.parse(rs);
eq(stats.count, 1, "raport: 1 setoran pada periode");
eq(stats.kelancaranPct, 100, "raport: kelancaran 100%");
ok(stats.position.includes("Iqra 1"), "raport: posisi belajar dari setoran");

run("saveReport({studentId:'s1',period:'semester',narasi:'uji narasi'})");
ok(run("getReports().some(r=>r.narasi==='uji narasi')"), "raport tersimpan");

/* ---------- 5. posisi belajar maju via saveSessionSetoran (alur UI sebenarnya) ---------- */
console.log("== Simpan setoran via UI flow ==");
run("goTo('kelas')");
run("act('start-session')");
ok(!!run("S.session"), "S.session aktif setelah Mulai Kelas");
run("S.modal='setoran-form'; S.modalData={studentId:'s1',recId:null,fromSession:true}; render()");
ok(appEl.innerHTML.includes('Simpan Setoran'), "modal setoran dirender");
run("saveSessionSetoran({studentId:'s1',date:todayISO(),kitab:'Iqra 2',surah:'',page:'5',lines:'',hafalanId:null,kelancaran:'cukup lancar',paraph:'',note:''})");
eq(run("studentById('s1').position"), "Iqra 2 Hal. 5", "posisi belajar s1 maju otomatis");
ok(run("getActiveSession('Banin').finished.includes('s1')"), "s1 masuk daftar selesai sesi");
run("act('close-session'); act('confirm-yes')");
ok(!run("getActiveSession('Banin')"), "sesi ditutup lewat dispatcher");

/* ---------- 6. backup / restore / reset ---------- */
console.log("== Backup & restore ==");
const exported = run("exportData()");
ok(JSON.parse(exported).students.length === 6, "export memuat santri");
run("resetAllData()");
eq(run("getStudents().length"), 0, "reset mengosongkan data");
run("seedIfEmpty()");
eq(run("getStudents().length"), 6, "seed ulang setelah reset");
run("importData(" + JSON.stringify(exported) + ")");
eq(run("getStudents().length"), 6, "import memulihkan data");

/* ---------- 7. render halaman ---------- */
console.log("== Render halaman ==");
run("goTo('informasi')");
ok(appEl.innerHTML.includes("TPQ Nurul Hidayah"), "header menampilkan nama lembaga");
ok(appEl.innerHTML.includes("Santri Aktif"), "halaman Informasi dirender");

run("goTo('kelas')");
ok(appEl.innerHTML.includes("Mulai Kelas"), "halaman Kelas punya tombol Mulai Kelas");
ok(["Banin", "Banat", "Private"].every(g => appEl.innerHTML.includes(g)), "tiga kelompok tampil");

run("openProfile('s1')");
ok(appEl.innerHTML.includes("Ahmad Fauzi"), "profil santri dirender");
ok(appEl.innerHTML.includes("Catat Pembelajaran"), "profil punya form pembelajaran");
ok(appEl.innerHTML.includes("Pembelajaran") && appEl.innerHTML.includes("Kehadiran"), "tab riwayat tampil");

run("goTo('kantor')");
run("S.profileId=null; render()");
ok(appEl.innerHTML.includes("Data Santri") && appEl.innerHTML.includes("Data Wali"), "grid Kantor dirender");
run("S.kantorView='santri'; S.profileId=null; render()");
ok(appEl.innerHTML.includes("q-santri"), "pencarian Data Santri tampil");

run("goTo('raport')");
ok(appEl.innerHTML.includes("Raport"), "halaman Raport dirender");

/* sesi berjalan tampil di UI */
run("goTo('kelas'); S.profileId=null; render()");
run("act('start-session')");
ok(appEl.innerHTML.includes("Tutup Sesi Kelas"), "halaman sesi punya tombol tutup");
run("S.kelasView='groups'; S.profileId=null; render()");
ok(appEl.innerHTML.includes("Sesi berjalan"), "kartu Banin menandai sesi berjalan");
ok(appEl.innerHTML.includes("Belum dipanggil"), "status santri: Belum dipanggil");
run("act('close-session'); act('confirm-yes')");
ok(!run("getActiveSession('Banin')"), "sesi Banin ditutup lewat dispatcher");

/* ---------- hasil ---------- */
console.log("\n========================================");
console.log(`LULUS: ${passed}  GAGAL: ${failures.length}`);
if (failures.length) {
  console.log("Kasus gagal:");
  failures.forEach(f => console.log("  - " + f));
  process.exit(1);
} else {
  console.log("Semua smoke test lulus.");
}
