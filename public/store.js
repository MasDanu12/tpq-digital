/* =====================================================
   TPQ Nurul Hidayah — Lapisan Data (store.js)
   Semua data tersimpan di localStorage & saling terhubung
   ===================================================== */

const DB_KEYS = {
  students: "tpq_students_v3",
  guardians: "tpq_guardians_v3",
  teachers: "tpq_teachers_v3",
  books: "tpq_books_v3",
  memorization: "tpq_memorization_v3",
  records: "tpq_records_v3",
  sessions: "tpq_sessions_v3",
  attendance: "tpq_attendance_v3",
  adab: "tpq_adab_v3",
  achievements: "tpq_achievements_v3",
  stars: "tpq_stars_v3",
  reports: "tpq_reports_v3",
  announcements: "tpq_announcements_v3",
  profile: "tpq_profile_v3",
  activity: "tpq_activity_v3",
};

const GROUPS = ["Banin", "Banat", "Private"];
const DAYS_ID = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

/* ---------- utilitas umum ---------- */
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function todayISO() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function esc(x) { return String(x ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c])); }
function ini(n) { return String(n || "?").trim().split(/\s+/).slice(0, 2).map(x => x[0] || "").join("").toUpperCase(); }
function fmtDate(iso) {
  if (!iso) return "-";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return iso;
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtTime(ts) { const d = new Date(ts); return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; }
function fmtDateTime(ts) { const d = new Date(ts); return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()} • ${fmtTime(ts)}`; }
function dayName(iso) { const d = new Date(iso + "T00:00:00"); return isNaN(d) ? "" : DAYS_ID[d.getDay()]; }
function waLink(number, text) { const n = String(number || "").replace(/[^0-9]/g, "").replace(/^0/, "62"); return `https://wa.me/${n}${text ? "?text=" + encodeURIComponent(text) : ""}`; }

/* ---------- penyimpanan ---------- */
function loadDB(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(fallback)) return Array.isArray(v) ? v : fallback.slice();
    if (v && typeof v === "object") return v;
    return fallback;
  } catch { return Array.isArray(fallback) ? fallback.slice() : fallback; }
}
function saveDB(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

/* ---------- seed data awal (hanya sekali) ---------- */
const SEED_FLAG = "tpq_seeded_v3";
function seedIfEmpty() {
  if (localStorage.getItem(SEED_FLAG)) return;
  saveDB(DB_KEYS.students, [
    { id: "s1", name: "Ahmad Fauzi", gender: "Laki-laki", guardianId: "w1", guardianName: "Bapak Hasan", wa: "6281234567890", group: "Banin", level: "Faturrahman", position: "Hal. 12", status: "aktif", joined: "2025-07-15", note: "" },
    { id: "s2", name: "Muhammad Rizki", gender: "Laki-laki", guardianId: "w2", guardianName: "Ibu Rohmah", wa: "6281234567891", group: "Banin", level: "Faturrahman", position: "Hal. 8", status: "aktif", joined: "2025-07-15", note: "" },
    { id: "s3", name: "Abdul Aziz", gender: "Laki-laki", guardianId: "w1", guardianName: "Bapak Hasan", wa: "6281234567890", group: "Banin", level: "Al-Bayan", position: "Jilid 2 Hal. 20", status: "aktif", joined: "2025-08-01", note: "" },
    { id: "s4", name: "Aisyah Putri", gender: "Perempuan", guardianId: "w3", guardianName: "Ibu Siti Aminah", wa: "6281234567892", group: "Banat", level: "Faturrahman", position: "Hal. 15", status: "aktif", joined: "2025-07-15", note: "" },
    { id: "s5", name: "Fatimah Az-Zahra", gender: "Perempuan", guardianId: "w3", guardianName: "Ibu Siti Aminah", wa: "6281234567892", group: "Banat", level: "Al-Bayan", position: "Jilid 1 Hal. 5", status: "aktif", joined: "2025-08-10", note: "" },
    { id: "s6", name: "Zaid Abdullah", gender: "Laki-laki", guardianId: "w2", guardianName: "Ibu Rohmah", wa: "6281234567891", group: "Private", level: "Al-Qur'an", position: "Juz 30", status: "aktif", joined: "2025-09-01", note: "Program privat sore" },
  ]);
  saveDB(DB_KEYS.guardians, [
    { id: "w1", name: "Bapak Hasan", wa: "6281234567890", relation: "Ayah", address: "Jl. Melati No. 5", note: "" },
    { id: "w2", name: "Ibu Rohmah", wa: "6281232345678", relation: "Ibu", address: "Jl. Kenanga No. 12", note: "" },
    { id: "w3", name: "Ibu Siti Aminah", wa: "6281234567892", relation: "Ibu", address: "Jl. Mawar No. 3", note: "" },
  ]);
  saveDB(DB_KEYS.teachers, [
    { id: "t1", name: "Ust. Ahmad Ridwan", gender: "Laki-laki", wa: "628120000000001", active: true, classes: "Banin", paraph: "AR", note: "" },
    { id: "t2", name: "Ustzh. Fatimah", gender: "Perempuan", wa: "628120000000002", active: true, classes: "Banat", paraph: "FZ", note: "" },
    { id: "t3", name: "Ustzh. Khadijah", gender: "Perempuan", wa: "628120000000003", active: true, classes: "Private", paraph: "KH", note: "" },
  ]);
  saveDB(DB_KEYS.books, [
    { id: "b1", name: "Iqra 1", category: "Iqra", description: "Pengenalan huruf hijaiyah", pages: 40 },
    { id: "b2", name: "Iqra 2", category: "Iqra", description: "Harakat dan tanwin", pages: 40 },
    { id: "b3", name: "Faturrahman", category: "Tulis Qur'an", description: "Menulis dan membaca Al-Qur'an", pages: 60 },
    { id: "b4", name: "Al-Bayan", category: "Tulis Qur'an", description: "Tulis Al-Qur'an lanjutan", pages: 60 },
    { id: "b5", name: "Al-Qur'an", category: "Tadarus", description: "Tadarus dan tahsin", pages: 604 },
  ]);
  saveDB(DB_KEYS.memorization, [
    { id: "h1", name: "Juz 30 (Juz 'Amma)", category: "Hafalan Qur'an", total: 37, unit: "surah" },
    { id: "h2", name: "Doa Harian", category: "Hafalan Doa", total: 15, unit: "doa" },
    { id: "h3", name: "Hadis Pilihan", category: "Hafalan Hadis", total: 12, unit: "hadis" },
  ]);
  saveDB(DB_KEYS.announcements, [
    { id: "a1", title: "Munaqasyah Akhir Semester", body: "Munaqasyah akan dilaksanakan akhir bulan ini. Mohon santri menyiapkan hafalan.", date: todayISO(), ts: Date.now() },
  ]);
  saveDB(DB_KEYS.profile, { name: "TPQ Nurul Hidayah", tagline: "Membentuk Generasi Qur'ani", address: "", head: "", logo: "mosque" });
  localStorage.setItem(SEED_FLAG, "1");
}

/* ---------- akses data ---------- */
function getStudents() { return loadDB(DB_KEYS.students, []); }
function getGuardians() { return loadDB(DB_KEYS.guardians, []); }
function getTeachers() { return loadDB(DB_KEYS.teachers, []); }
function getBooks() { return loadDB(DB_KEYS.books, []); }
function getMemorization() { return loadDB(DB_KEYS.memorization, []); }
function getRecords() { return loadDB(DB_KEYS.records, []); }
function getSessions() { return loadDB(DB_KEYS.sessions, []); }
function getAttendance() { return loadDB(DB_KEYS.attendance, []); }
function getAdab() { return loadDB(DB_KEYS.adab, []); }
function getAchievements() { return loadDB(DB_KEYS.achievements, []); }
function getStars() { return loadDB(DB_KEYS.stars, []); }
function getReports() { return loadDB(DB_KEYS.reports, []); }
function getAnnouncements() { return loadDB(DB_KEYS.announcements, []); }
function getProfile() { return loadDB(DB_KEYS.profile, { name: "TPQ Nurul Hidayah", tagline: "Membentuk Generasi Qur'ani", address: "", head: "", logo: "mosque" }); }

function saveStudents(v) { saveDB(DB_KEYS.students, v); }
function saveGuardians(v) { saveDB(DB_KEYS.guardians, v); }
function saveTeachers(v) { saveDB(DB_KEYS.teachers, v); }
function saveBooks(v) { saveDB(DB_KEYS.books, v); }
function saveMemorization(v) { saveDB(DB_KEYS.memorization, v); }
function saveAnnouncements(v) { saveDB(DB_KEYS.announcements, v); }
function saveProfile(v) { saveDB(DB_KEYS.profile, v); }

function activeStudents(group) { return getStudents().filter(x => x.group === group && x.status === "aktif"); }
function studentById(id) { return getStudents().find(x => x.id === id); }
function guardianOf(student) { return student && student.guardianId ? getGuardians().find(w => w.id === student.guardianId) : null; }
function guardiansOfStudent(studentId) {
  const s = studentById(studentId);
  if (!s) return [];
  const list = [];
  if (s.guardianId) { const w = guardianOf(s); if (w) list.push(w); }
  return list.length ? list : (s.guardianName ? [{ name: s.guardianName, wa: s.wa, relation: "Wali" }] : []);
}
function studentsOfGuardian(guardianId) { return getStudents().filter(x => x.guardianId === guardianId); }

/* ---------- aktivitas terbaru ---------- */
function logActivity(icon, title, detail) {
  const list = loadDB(DB_KEYS.activity, []);
  list.unshift({ id: uid(), icon, title, detail, ts: Date.now() });
  saveDB(DB_KEYS.activity, list.slice(0, 30));
}
function getActivity() { return loadDB(DB_KEYS.activity, []); }

/* ---------- catatan pembelajaran (setoran) ----------
   Aturan: jangan ubah catatan lama. Edit membuat revisi pada entri,
   setiap setoran baru selalu menjadi riwayat baru. */
function addLearningRecord(r) {
  const list = loadDB(DB_KEYS.records, []);
  list.unshift({ id: uid(), ts: Date.now(), ...r });
  saveDB(DB_KEYS.records, list);
  logActivity("fa-book-open", "Setoran dicatat", `${r.studentName} • ${r.kitab}${r.surah ? " — " + r.surah : ""}`);
}
function updateLearningRecord(id, patch) {
  const list = loadDB(DB_KEYS.records, []);
  const i = list.findIndex(x => x.id === id);
  if (i >= 0) { list[i] = { ...list[i], ...patch, edited: true }; saveDB(DB_KEYS.records, list); }
}
function deleteLearningRecord(id) {
  saveDB(DB_KEYS.records, loadDB(DB_KEYS.records, []).filter(x => x.id !== id));
}
function studentRecords(id) { return loadDB(DB_KEYS.records, []).filter(x => x.studentId === id); }
function recordsToday() { const t = todayISO(); return loadDB(DB_KEYS.records, []).filter(r => r.date === t); }

/* ---------- sesi kelas ---------- */
function getActiveSession(group) { return loadDB(DB_KEYS.sessions, []).find(s => s.group === group && s.status === "berjalan"); }
function startSession(group) {
  const list = loadDB(DB_KEYS.sessions, []);
  const session = {
    id: uid(), group, status: "berjalan", startedAt: Date.now(), closedAt: null,
    called: [], finished: [], absent: {},
  };
  list.unshift(session);
  saveDB(DB_KEYS.sessions, list);
  logActivity("fa-play", "Kelas dimulai", `${group} • ${activeStudents(group).length} santri`);
  return session;
}
function persistSession(session) {
  const list = loadDB(DB_KEYS.sessions, []);
  const i = list.findIndex(x => x.id === session.id);
  if (i >= 0) list[i] = session;
  saveDB(DB_KEYS.sessions, list);
}
function markCalled(session, studentId) {
  if (!session.called.includes(studentId)) session.called.push(studentId);
  persistSession(session);
}
function markFinished(session, studentId) {
  if (!session.finished.includes(studentId)) session.finished.push(studentId);
  if (!session.called.includes(studentId)) session.called.push(studentId);
  persistSession(session);
}
function markAbsent(session, studentId, reason) {
  session.absent = session.absent || {};
  session.absent[studentId] = reason;
  persistSession(session);
}
function closeSession(session) {
  const absent = session.absent || {};
  const active = activeStudents(session.group);
  active.forEach(st => {
    const already = session.finished.includes(st.id) || (st.id in absent);
    if (!already) {
      absent[st.id] = "alpa";
      addAttendanceRow({ studentId: st.id, studentName: st.name, group: session.group, sessionRef: session.id, status: "alpa", date: todayISO(), auto: true });
    }
  });
  // hadir (selesai setoran) juga dicatat ke riwayat kehadiran
  session.finished.forEach(sid => {
    const st = studentById(sid);
    if (st && !getAttendance().some(a => a.sessionRef === session.id && a.studentId === sid)) {
      addAttendanceRow({ studentId: sid, studentName: st.name, group: session.group, sessionRef: session.id, status: "hadir", date: todayISO(), auto: false });
    }
  });
  // izin / sakit / berhalangan yang ditandai guru juga masuk riwayat kehadiran
  Object.keys(absent).forEach(sid => {
    const reason = absent[sid];
    if (reason === "alpa") return; // alpa sudah dicatat di atas
    const st = studentById(sid);
    if (st && !getAttendance().some(a => a.sessionRef === session.id && a.studentId === sid)) {
      addAttendanceRow({ studentId: sid, studentName: st.name, group: session.group, sessionRef: session.id, status: reason, date: todayISO(), auto: false });
    }
  });
  session.absent = absent;
  session.status = "selesai";
  session.closedAt = Date.now();
  persistSession(session);
  logActivity("fa-flag-checkered", "Kelas ditutup", `${session.group} • ${session.finished.length} selesai setoran`);
}

/* ---------- kehadiran ---------- */
function addAttendanceRow(r) {
  const list = loadDB(DB_KEYS.attendance, []);
  list.unshift({ id: uid(), ts: Date.now(), ...r });
  saveDB(DB_KEYS.attendance, list);
}
function attendanceToday() { const t = todayISO(); return loadDB(DB_KEYS.attendance, []).filter(a => a.date === t); }
function studentAttendance(id) { return loadDB(DB_KEYS.attendance, []).filter(a => a.studentId === id); }
function studentAttendanceSummary(id) {
  const rows = studentAttendance(id);
  return {
    hadir: rows.filter(a => a.status === "hadir").length,
    izin: rows.filter(a => a.status === "izin").length,
    sakit: rows.filter(a => a.status === "sakit").length,
    berhalangan: rows.filter(a => a.status === "berhalangan").length,
    alpa: rows.filter(a => a.status === "alpa").length,
    total: rows.length,
  };
}
function sessionAttendanceCount(group) {
  const s = getActiveSession(group);
  if (!s) return { hadir: 0, absen: 0, belum: activeStudents(group).length };
  const belum = activeStudents(group).filter(x => !s.called.includes(x.id) && !(x.id in (s.absent || {}))).length;
  return { hadir: s.finished.length, absen: Object.keys(s.absent || {}).length, belum };
}

/* ---------- adab / prestasi / bintang / pengumuman ---------- */
function addAdab(r) { const l = loadDB(DB_KEYS.adab, []); l.unshift({ id: uid(), ts: Date.now(), ...r }); saveDB(DB_KEYS.adab, l); }
function addAchievement(r) { const l = loadDB(DB_KEYS.achievements, []); l.unshift({ id: uid(), ts: Date.now(), ...r }); saveDB(DB_KEYS.achievements, l); logActivity("fa-trophy", "Prestasi dicatat", `${r.studentName} • ${r.title}`); }
function addStar(r) { const l = loadDB(DB_KEYS.stars, []); l.unshift({ id: uid(), ts: Date.now(), ...r }); saveDB(DB_KEYS.stars, l); }
function addAnnouncement(r) { const l = loadDB(DB_KEYS.announcements, []); l.unshift({ id: uid(), ts: Date.now(), ...r }); saveDB(DB_KEYS.announcements, l); }
function adabOf(id) { return loadDB(DB_KEYS.adab, []).filter(x => x.studentId === id); }
function achievementsOf(id) { return loadDB(DB_KEYS.achievements, []).filter(x => x.studentId === id); }
function starsOf(id) { return loadDB(DB_KEYS.stars, []).filter(x => x.studentId === id); }
function countStars(id) { return starsOf(id).length; }

/* ---------- bantuan AI (draft keterangan, bisa diedit guru) ---------- */
function aiDraft(f) {
  const k = f.kitab || "kitab";
  const peta = { "lancar": "sangat lancar", "cukup lancar": "dengan cukup lancar", "perlu bimbingan": "masih perlu bimbingan" };
  const pos = [f.page ? `hlm. ${f.page}` : "", f.lines ? `baris ${f.lines}` : ""].filter(Boolean).join(" ");
  return [
    `Setoran ${k}${f.surah ? ` surah ${f.surah}` : ""}${pos ? ` (${pos})` : ""}.`,
    `Dibaca ${peta[f.kelancaran] || "dengan baik"}.`,
    f.tajwid === "baik" ? "Bacaan tajwid sudah baik." : f.tajwid === "perlu perbaikan" ? "Perlu perbaikan pada beberapa hukum tajwid." : "",
    f.makna === "baik" ? "Pemahaman makna baik." : f.makna === "perlu perbaikan" ? "Perlu penguatan pemahaman makna." : "",
    f.kelancaran === "lancar" ? "Alhamdulillah, pertahankan semangat belajarnya." : "Semoga lebih lancar lagi pada setoran berikutnya.",
  ].filter(Boolean).join(" ");
}
function aiDraftAdab(f) {
  return f.type === "pelanggaran"
    ? `Catatan adab: terlihat ${f.adab} saat pembelajaran. Sudah diingatkan dan diminta memperbaiki sikap. Mohon didampingi di rumah.`
    : `Alhamdulillah, menunjukkan ${f.adab} yang patut diapresiasi. Terus dijaga dan menjadi teladan bagi teman-temannya.`;
}

/* ---------- raport ---------- */
function reportStats(studentId, from, to) {
  const recs = studentRecords(studentId).filter(r => (!from || r.date >= from) && (!to || r.date <= to));
  const att = studentAttendance(studentId).filter(a => (!from || a.date >= from) && (!to || a.date <= to));
  const stars = starsOf(studentId).filter(x => (!from || x.date >= from) && (!to || x.date <= to)).length;
  const ach = achievementsOf(studentId).filter(x => (!from || x.date >= from) && (!to || x.date <= to));
  const adab = adabOf(studentId).filter(x => (!from || x.date >= from) && (!to || x.date <= to));
  const last = recs[0];
  return {
    count: recs.length,
    hadir: att.filter(a => a.status === "hadir").length,
    attTotal: att.length,
    izin: att.filter(a => a.status === "izin").length,
    sakit: att.filter(a => a.status === "sakit").length,
    alpa: att.filter(a => a.status === "alpa").length,
    stars, ach: ach.length, adab: adab.length,
    kelancaranPct: recs.length ? Math.round(recs.filter(r => r.kelancaran === "lancar").length / recs.length * 100) : 0,
    last: last ? `${last.kitab}${last.surah ? " — " + last.surah : ""} · ${fmtDate(last.date)}` : "Belum ada setoran",
    position: last ? [last.kitab, last.page ? `hlm. ${last.page}` : ""].filter(Boolean).join(" ") : "-",
  };
}
function saveReport(r) {
  const list = loadDB(DB_KEYS.reports, []);
  const i = list.findIndex(x => x.studentId === r.studentId && x.period === r.period);
  if (i >= 0) list[i] = { ...list[i], ...r, updatedAt: Date.now() };
  else list.unshift({ id: uid(), ts: Date.now(), ...r });
  saveDB(DB_KEYS.reports, list);
}

/* ---------- backup / restore ---------- */
function exportObject() {
  const out = { version: 3, exportedAt: new Date().toISOString(), app: "TPQ Nurul Hidayah" };
  Object.entries(DB_KEYS).forEach(([k, key]) => {
    const raw = localStorage.getItem(key);
    out[k] = raw === null ? null : JSON.parse(raw);
  });
  return out;
}
function exportData() { return JSON.stringify(exportObject(), null, 2); }
function importData(json) {
  const data = JSON.parse(json);
  Object.entries(DB_KEYS).forEach(([k, key]) => { if (data[k] !== undefined) saveDB(key, data[k]); });
}
function resetAllData() { Object.values(DB_KEYS).forEach(k => localStorage.removeItem(k)); localStorage.removeItem(SEED_FLAG); }
function storageInfo() {
  let total = 0;
  Object.values(DB_KEYS).forEach(k => { total += (localStorage.getItem(k) || "").length; });
  return { total, kb: (total / 1024).toFixed(1) + " KB" };
}

/* ---------- init ---------- */
seedIfEmpty();
