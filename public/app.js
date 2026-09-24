/* =====================================================
   TPQ Nurul Hidayah — Aplikasi (app.js)
   SPA mobile-first: Informasi, Kelas, Kantor, Raport
   ===================================================== */

const S = {
  page: "informasi",
  kelasView: "groups",
  kantorView: "grid",
  group: "Banin",
  session: null,
  profileId: null,
  profileTab: "pembelajaran",
  kantorQuery: "",
  kantorFilter: "semua",
  raportStudentId: null,
  raportPeriod: "semester",
  modal: null,
  modalData: null,
  toast: "",
};

const PERIODS = {
  bulan: { label: "Bulan Ini", days: 30 },
  semester: { label: "Semester Ini", days: 182 },
  tahun: { label: "Tahun Ini", days: 365 },
};

function icon(name, cls) {
  const c = cls || "w-5 h-5";
  const P = {
    mosque: '<path d="M12 2c1 2 3 3.5 3 6H9c0-2.5 2-4 3-6zM5 9h14v2H5zM6 12h3v9H6zM15 12h3v9h-3zM10 12h4v9h-4zM3 21h18v2H3z"/>',
    info: '<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>',
    users: '<path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>',
    building: '<path d="M4 21V5a2 2 0 012-2h8a2 2 0 012 2v16h3v-9h-1V9h1V3h2v18H4zm4-14h2V5H8v2zm0 4h2V9H8v2zm0 4h2v-2H8v2z"/>',
    report: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>',
    gear: '<path d="M19.14 12.94a7 7 0 000-1.88l2.03-1.58a.5.5 0 00.12-.64l-1.92-3.32a.5.5 0 00-.61-.22l-2.39.96a7.3 7.3 0 00-1.62-.94l-.36-2.54a.5.5 0 00-.5-.42h-3.84a.5.5 0 00-.5.42l-.36 2.54c-.58.24-1.12.55-1.62.94l-2.39-.96a.5.5 0 00-.61.22L2.65 8.84a.5.5 0 00.12.64l2.03 1.58a7 7 0 000 1.88L2.77 14.5a.5.5 0 00-.12.64l1.92 3.32c.13.22.39.31.61.22l2.39-.96c.5.39 1.04.7 1.62.94l.36 2.54c.04.24.25.42.5.42h3.84c.25 0 .46-.18.5-.42l.36-2.54c.58-.24 1.12-.55 1.62-.94l2.39.96c.22.09.48 0 .61-.22l1.92-3.32a.5.5 0 00-.12-.64l-2.03-1.56zM12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7z"/>',
    user: '<path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.42 0-8 2.24-8 5v3h16v-3c0-2.76-3.58-5-8-5z"/>',
    usergroup: '<path d="M9 11a4 4 0 100-8 4 4 0 000 8zm7 1a3 3 0 100-6 3 3 0 000 6zM9 13c-3 0-7 1.5-7 4.5V20h14v-2.5C16 14.5 12 13 9 13zm7.5.5c-.3 0-.6 0-.9.05 1.3 1 2.4 2.4 2.4 3.95V20h5v-2c0-2.5-4-4.5-6.5-4.5z"/>',
    book: '<path d="M18 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>',
    bookmark: '<path d="M17 3H7a2 2 0 00-2 2v16l7-3 7 3V5a2 2 0 00-2-2z"/>',
    sliders: '<path d="M3 17h6v2H3zM13 15h8v2h-8zM3 9h10v2H3zM17 7h4v2h-4zM11 5h2v10h-2zM3 15h4v2H3z"/>',
    database: '<path d="M12 2C7.58 2 4 3.79 4 6v12c0 2.21 3.58 4 8 4s8-1.79 8-4V6c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zm6 14c0 .5-2.13 2-6 2s-6-1.5-6-2v-3.08C7.45 15.57 9.58 16 12 16s4.55-.43 6-1.08V18zm0-5c0 .5-2.13 2-6 2s-6-1.5-6-2V8.92C7.45 9.57 9.58 10 12 10s4.55-.43 6-1.08V13z"/>',
    file: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>',
    star: '<path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"/>',
    trophy: '<path d="M18 5V3H6v2H2v3a5 5 0 004.78 5A6 6 0 0011 16.92V19H8v2h8v-2h-3v-2.08A6 6 0 0017.22 13 5 5 0 0022 8V5h-4zM4 8V7h2v3.82A3 3 0 014 8zm16 0a3 3 0 01-2 2.82V7h2v1z"/>',
    check: '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
    chev: '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>',
    plus: '<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>',
    search: '<path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 10-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1114 9.5 4.5 4.5 0 019.5 14z"/>',
    back: '<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>',
    bell: '<path d="M12 22a2 2 0 002-2h-4a2 2 0 002 2zm6-6v-5a6 6 0 00-5-5.91V3a1 1 0 10-2 0v2.09C7 5.69 6 8.15 6 11v5l-2 2v1h16v-1l-2-2z"/>',
    wa: '<path d="M12 2a10 10 0 00-8.6 15.08L2 22l5.04-1.32A10 10 0 1012 2zm5.13 14.15c-.21.6-1.23 1.15-1.7 1.2-.47.05-.9.23-3.03-.63-2.57-1.01-4.2-3.66-4.32-3.83-.13-.17-1.03-1.37-1.03-2.62 0-1.24.65-1.85.88-2.1.23-.26.5-.32.67-.32h.48c.15 0 .36-.06.56.43.21.5.7 1.73.77 1.85.06.13.1.28.02.45-.09.17-.13.28-.26.43l-.39.45c-.13.13-.26.27-.11.53.15.26.66 1.08 1.41 1.75.97.86 1.78 1.13 2.04 1.26.26.13.41.11.56-.07.15-.17.65-.75.82-1.01.17-.26.35-.22.58-.13.24.09 1.5.7 1.75.83.26.13.43.19.5.3.06.12.06.68-.15 1.28z"/>',
    download: '<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>',
    upload: '<path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/>',
    edit: '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>',
    trash: '<path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>',
    play: '<path d="M8 5v14l11-7z"/>',
    stop: '<path d="M6 6h12v12H6z"/>',
    spark: '<path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2zM19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15z"/>',
    calendar: '<path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z"/>',
    flag: '<path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z"/>',
    chart: '<path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z"/>',
  };
  return '<svg viewBox="0 0 24 24" fill="currentColor" class="' + c + '" aria-hidden="true">' + (P[name] || P.info) + '</svg>';
}

function render() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="app">
      ${topbar()}
      <main class="main" id="main">${pageHTML()}</main>
      ${bottomNav()}
      ${S.modal ? modalHTML() : ""}
      ${S.toast ? `<div class="toast">${esc(S.toast)}</div>` : ""}
    </div>`;
  bind();
  window.scrollTo(0, 0);
}

function topbar() {
  const p = getProfile();
  return `
  <header class="top">
    <div class="topin">
      <div class="brand">
        <div class="mark">${icon("mosque", "w-5 h-5")}</div>
        <div>
          <div class="bt">${esc(p.name)}</div>
          <div class="bs">${esc(p.tagline)}</div>
        </div>
      </div>
      <div class="flex" style="gap:8px">
        <button class="ib" data-act="open-setting" title="Pengaturan">${icon("gear", "w-4 h-4")}</button>
        <button class="ib" data-act="open-tpq-profile" title="Profil TPQ">${icon("user", "w-4 h-4")}</button>
      </div>
    </div>
  </header>`;
}

function bottomNav() {
  const items = [
    ["informasi", "info", "Informasi"],
    ["kelas", "users", "Kelas"],
    ["kantor", "building", "Kantor"],
    ["raport", "report", "Raport"],
  ];
  return `
  <nav class="nav"><div class="navin">
    ${items.map(it => `
      <button class="ni ${S.page === it[0] ? "on" : ""}" data-nav="${it[0]}">
        ${icon(it[1], "w-5 h-5")}
        <span>${it[2]}</span>
      </button>`).join("")}
  </div></nav>`;
}

function pageHTML() {
  if (S.page === "informasi") return informasiPage();
  if (S.page === "kelas") return S.profileId ? profilePage() : kelasPage();
  if (S.page === "kantor") return S.profileId ? profilePage() : kantorPage();
  if (S.page === "raport") return raportPage();
  return informasiPage();
}

function pageHead(title, sub, backAct, backLabel) {
  return `
  ${backAct ? `<button class="back" data-act="${backAct}">${icon("back", "w-4 h-4")} ${backLabel || "Kembali"}</button>` : ""}
  <h1 class="title">${esc(title)}</h1>
  <p class="sub">${esc(sub)}</p>`;
}

function progressBar(label, pct, color) {
  return `
  <div style="margin-bottom:11px">
    <div class="pblabel"><span>${label}</span><b>${pct}%</b></div>
    <div class="pb"><div class="pbfill ${color}" style="width:${pct}%"></div></div>
  </div>`;
}

function isoDaysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
/* =====================================================
   1. INFORMASI
   ===================================================== */
function informasiPage() {
  const students = getStudents();
  const aktif = students.filter(x => x.status === "aktif");
  const count = g => aktif.filter(x => x.group === g).length;
  const attToday = attendanceToday();
  const hadir = attToday.filter(a => a.status === "hadir").length;
  const recToday = recordsToday();
  const pctHadir = aktif.length ? Math.round(hadir / aktif.length * 100) : 0;
  const lancar = recToday.filter(r => r.kelancaran === "lancar").length;
  const pctLancar = recToday.length ? Math.round(lancar / recToday.length * 100) : 0;

  const lastRec = getRecords()[0];
  const sessionsToday = getSessions().filter(s => new Date(s.startedAt).toISOString().slice(0, 10) === todayISO());
  const acts = getActivity().slice(0, 5);
  const anns = getAnnouncements().slice(0, 3);
  const memori = getMemorization();

  return `
  ${pageHead("Informasi", dayName(todayISO()) + ", " + fmtDate(todayISO()))}

  <div class="hero">
    <div class="herorow">
      <div>
        <div class="hl">Santri Aktif</div>
        <div class="hv">${aktif.length}</div>
        <div class="hn">${count("Banin")} banin · ${count("Banat")} banat · ${count("Private")} private</div>
      </div>
      <div class="herochip">${icon("chart", "w-4 h-4")} ${pctHadir}% hadir</div>
    </div>
  </div>

  <div class="grid2">
    <div class="card">
      <div class="sl">Kehadiran hari ini</div>
      <div class="sv">${hadir}<span class="svs">/${aktif.length}</span></div>
      <div class="rmeta">${attToday.filter(a => a.status === "izin").length} izin · ${attToday.filter(a => a.status === "sakit").length} sakit · ${attToday.filter(a => a.status === "alpa").length} alpa</div>
    </div>
    <div class="card">
      <div class="sl">Setoran hari ini</div>
      <div class="sv">${recToday.length}</div>
      <div class="rmeta">${pctLancar}% lancar</div>
    </div>
  </div>

  <div class="sec">
    <div class="sh"><div class="st">Progress Pembelajaran</div></div>
    <div class="card">
      ${progressBar("Kelancaran setoran hari ini", pctLancar, "emerald")}
      ${progressBar("Kehadiran hari ini", pctHadir, "sky")}
      <div class="ir"><span class="muted">Total catatan pembelajaran</span><b>${getRecords().length}</b></div>
      <div class="ir"><span class="muted">Sesi kelas hari ini</span><b>${sessionsToday.length}</b></div>
    </div>
  </div>

  <div class="sec">
    <div class="sh"><div class="st">Pencapaian Terbaru</div></div>
    ${lastRec ? `
    <div class="card" data-act="goto-kelas" role="button">
      <div class="row-flat">
        <div class="av">${ini(lastRec.studentName)}</div>
        <div class="rm">
          <div class="rn">${esc(lastRec.studentName)}</div>
          <div class="rmeta">${esc(lastRec.kitab)}${lastRec.surah ? " — " + esc(lastRec.surah) : ""}${lastRec.page ? " · hlm. " + esc(lastRec.page) : ""} · ${fmtDate(lastRec.date)}</div>
          <div class="rmeta kel ${lastRec.kelancaran === "lancar" ? "ok" : ""}">${esc(lastRec.kelancaran || "")}</div>
        </div>
      </div>
    </div>` : `<div class="card notice">Belum ada pencapaian. Mulai kelas di menu <b>Kelas</b> untuk mencatat setoran pertama.</div>`}
  </div>

  <div class="sec">
    <div class="sh"><div class="st">Progress Hafalan</div><button class="act" data-kgoto="hafalan">Kelola</button></div>
    <div class="card">
      ${memori.length ? memori.map(m => {
        const done = getRecords().filter(r => r.hafalanId === m.id).length;
        const pct = m.total ? Math.min(100, Math.round(done / m.total * 100)) : 0;
        return progressBar(esc(m.name) + " (" + done + "/" + m.total + " " + esc(m.unit || "") + ")", pct, "rose");
      }).join("") : `<div class="notice">Belum ada materi hafalan. Tambahkan di Kantor → Data Hafalan.</div>`}
    </div>
  </div>

  <div class="sec">
    <div class="sh"><div class="st">Jadwal & Sesi Hari Ini</div></div>
    ${sessionsToday.length ? sessionsToday.map(s => `
      <div class="card row-flat" style="margin-bottom:8px">
        <div class="av sm">${icon("calendar", "w-4 h-4")}</div>
        <div class="rm">
          <div class="rn2">Kelas ${esc(s.group)}</div>
          <div class="rmeta">${fmtTime(s.startedAt)}${s.closedAt ? " – " + fmtTime(s.closedAt) : " – berjalan"} · ${s.finished.length} selesai</div>
        </div>
        <span class="badge ${s.status === "berjalan" ? "warn" : ""}">${s.status === "berjalan" ? "Berjalan" : "Selesai"}</span>
      </div>`).join("") : `<div class="card notice">Belum ada sesi kelas hari ini. Buka menu <b>Kelas</b> lalu tekan <b>Mulai Kelas</b>.</div>`}
  </div>

  <div class="sec">
    <div class="sh"><div class="st">Aktivitas Terbaru</div></div>
    <div class="card">
      ${acts.length ? acts.map(a => `
        <div class="ir">
          <div class="row-flat">
            <div class="av sm">${icon(a.icon && a.icon.startsWith("fa-") ? "bell" : (a.icon || "bell"), "w-4 h-4")}</div>
            <div class="rm"><div class="rn2">${esc(a.title)}</div><div class="rmeta">${esc(a.detail)}</div></div>
          </div>
          <span class="rmeta nowrap">${fmtDateTime(a.ts)}</span>
        </div>`).join("") : `<div class="notice">Belum ada aktivitas.</div>`}
    </div>
  </div>

  <div class="sec">
    <div class="sh"><div class="st">Pengumuman TPQ</div><button class="act" data-kgoto="administrasi">Kelola</button></div>
    ${anns.length ? anns.map(a => `
      <div class="card" style="margin-bottom:8px">
        <div class="row-flat">
          <div class="av sm">${icon("flag", "w-4 h-4")}</div>
          <div class="rm">
            <div class="rn2">${esc(a.title)}</div>
            <div class="rmeta">${esc(a.body)}</div>
            <div class="rmeta">${fmtDate(a.date)}</div>
          </div>
        </div>
      </div>`).join("") : `<div class="card notice">Belum ada pengumuman.</div>`}
  </div>`;
}
/* =====================================================
   2. KELAS
   ===================================================== */
function kelasPage() {
  if (S.kelasView === "session" && S.session) return sessionPage();
  return kelasGroups();
}

function kelasGroups() {
  return `
  ${pageHead("Kelas", "Pilih kelompok untuk menjalankan pembelajaran hari ini.")}
  <div class="gg">
    ${GROUPS.map(g => {
      const active = activeStudents(g);
      const s = getActiveSession(g);
      const status = s ? "berjalan" : "belum";
      const belum = s ? sessionAttendanceCount(g).belum : active.length;
      return `
      <button class="gc" data-group="${g}">
        <div class="dot ${status === "berjalan" ? "run" : status === "selesai" ? "done" : ""}"></div>
        <div class="gn">${g}</div>
        <div class="gcnt">${active.length} santri aktif</div>
        <div class="gmeta">
          ${s ? `<span class="badge warn">Sesi berjalan</span>` : `<span class="badge mute">Belum mulai</span>`}
        </div>
        <div class="gcnt">${s ? `${s.finished.length} selesai · ${belum} belum dipanggil` : ""}</div>
      </button>`;
    }).join("")}
  </div>

  <div class="sec">
    <div class="sh"><div class="st">Kelompok ${esc(S.group)}</div></div>
    <button class="btn primary" data-act="start-session" style="margin-bottom:12px">${icon("play", "w-4 h-4")} Mulai Kelas ${esc(S.group)}</button>
    <div class="chips">${GROUPS.map(g => `<button class="chip ${g === S.group ? "on" : ""}" data-sg="${g}">${g}</button>`).join("")}</div>
    ${studentList(activeStudents(S.group), { empty: "Belum ada santri aktif di kelompok ini. Tambahkan dari Kantor → Data Santri." })}
  </div>`;
}

function studentList(list, opt) {
  const o = opt || {};
  return list.length ? `<div class="list">${list.map(x => {
    const sess = S.session;
    let chip = "";
    if (sess && sess.group === x.group) {
      if (sess.finished.includes(x.id)) chip = `<span class="badge ok">Selesai</span>`;
      else if ((sess.absent || {})[x.id]) chip = `<span class="badge warn">${labelAbsen(sess.absent[x.id])}</span>`;
      else if (sess.called.includes(x.id)) chip = `<span class="badge info">Sedang setoran</span>`;
      else chip = `<span class="badge mute">Belum dipanggil</span>`;
    }
    return `
    <div class="row" data-profile="${x.id}" role="button">
      <div class="av">${ini(x.name)}</div>
      <div class="rm">
        <div class="rn">${esc(x.name)} ${x.status !== "aktif" ? '<span class="badge mute">Nonaktif</span>' : ""}</div>
        <div class="rmeta">${esc(x.level)} · ${esc(x.position || "-")}</div>
      </div>
      ${chip}
      ${icon("chev", "chev w-4 h-4")}
    </div>`;
  }).join("")}</div>` : `<div class="card notice">${esc(o.empty || "Belum ada santri.")}</div>`;
}

function labelAbsen(r) {
  return { izin: "Izin", sakit: "Sakit", berhalangan: "Berhalangan", alpa: "Alpa" }[r] || r;
}

function sessionPage() {
  const sess = S.session;
  const list = activeStudents(sess.group);
  const belum = list.filter(x => !sess.called.includes(x.id) && !sess.finished.includes(x.id) && !((sess.absent || {})[x.id]));
  const next = belum[0];
  return `
  ${pageHead("Kelas " + sess.group, "Sesi " + fmtTime(sess.startedAt) + " · " + sess.finished.length + " selesai, " + Object.keys(sess.absent || {}).length + " absen, " + belum.length + " belum dipanggil", "back-to-groups", "Kembali")}

  ${next ? `<div class="card" style="margin-bottom:12px">
    <div class="row-flat">
      <div class="av">${ini(next.name)}</div>
      <div class="rm">
        <div class="rn">Berikutnya: ${esc(next.name)}</div>
        <div class="rmeta">${esc(next.level)} · ${esc(next.position || "-")}</div>
      </div>
      <button class="btn primary slim" data-call="${next.id}">${icon("play", "w-4 h-4")} Hadir & Mulai</button>
    </div>
  </div>` : `<div class="card okcard" style="margin-bottom:12px">${icon("check", "w-5 h-5")} Semua santri sudah diproses. Tutup sesi untuk mencatat absensi otomatis.</div>`}

  <div class="card" style="margin-bottom:12px">
    <button class="btn danger slim" data-act="close-session">${icon("stop", "w-4 h-4")} Tutup Sesi Kelas</button>
    <div class="rmeta" style="margin-top:8px">Santri yang masih "Belum Dipanggil" saat sesi ditutup otomatis menjadi <b>Alpa</b>.</div>
  </div>

  <div class="sec">
    <div class="sh"><div class="st">Santri (${list.length})</div></div>
    <div class="list">
      ${list.map(x => {
        const st = sess.finished.includes(x.id) ? "done" : (sess.absent || {})[x.id] ? "absent" : sess.called.includes(x.id) ? "calling" : "waiting";
        const reason = (sess.absent || {})[x.id];
        return `
        <div class="card st-${st}" style="margin-bottom:8px">
          <div class="row-flat">
            <div class="av ${st === "done" ? "ok" : st === "absent" ? "warn" : ""}">${ini(x.name)}</div>
            <div class="rm">
              <div class="rn2">${esc(x.name)}</div>
              <div class="rmeta">${esc(x.level)} · ${esc(x.position || "-")}</div>
              ${st === "done" ? `<div class="rmeta kel ok">Setoran selesai</div>` : st === "absent" ? `<div class="rmeta kel warn">${labelAbsen(reason)}</div>` : st === "calling" ? `<div class="rmeta kel">Sedang setoran</div>` : ""}
            </div>
          </div>
          ${st === "waiting" || st === "calling" ? `
          <div class="rowbtns">
            ${st === "waiting" ? `<button class="btn primary slim" data-call="${x.id}">Hadir & Mulai Setoran</button>` : ""}
            <button class="btn secondary slim" data-absent="${x.id}|izin">Izin</button>
            <button class="btn secondary slim" data-absent="${x.id}|sakit">Sakit</button>
            <button class="btn secondary slim" data-absent="${x.id}|berhalangan">Berhalangan</button>
          </div>` : ""}
        </div>`;
      }).join("")}
    </div>
  </div>`;
}

function setoranForm(prefix, student, rec) {
  const books = getBooks();
  const hafalan = getMemorization();
  const v = k => rec ? (rec[k] ?? "") : "";
  return `
  <form id="form-setoran-${prefix}" data-setoran="1" class="form">
    <input type="hidden" name="studentId" value="${esc(student.id)}">
    <input type="hidden" name="recId" value="${rec ? esc(rec.id) : ""}">
    <div class="field"><label>Tanggal</label><input type="date" name="date" value="${v("date") || todayISO()}" required></div>
    <div class="field"><label>Kitab</label>
      <input name="kitab" list="dl-books-${prefix}" value="${esc(v("kitab"))}" placeholder="Contoh: Faturrahman" required>
      <datalist id="dl-books-${prefix}">${books.map(b => `<option value="${esc(b.name)}">`).join("")}</datalist>
    </div>
    <div class="field"><label>Materi hafalan (opsional)</label>
      <select name="hafalanId"><option value="">— tidak terkait —</option>
      ${hafalan.map(h => `<option value="${h.id}" ${v("hafalanId") === h.id ? "selected" : ""}>${esc(h.name)}</option>`).join("")}</select>
    </div>
    <div class="grid2 gform">
      <div class="field"><label>Surah</label><input name="surah" value="${esc(v("surah"))}" placeholder="Contoh: Al-Baqarah"></div>
      <div class="field"><label>Halaman</label><input name="page" inputmode="numeric" value="${esc(v("page"))}" placeholder="Contoh: 12"></div>
    </div>
    <div class="grid2 gform">
      <div class="field"><label>Baris halaman</label><input name="lines" value="${esc(v("lines"))}" placeholder="Contoh: 3-8"></div>
      <div class="field"><label>Kelancaran</label>
        <select name="kelancaran">
          ${["lancar", "cukup lancar", "perlu bimbingan"].map(k => `<option ${v("kelancaran") === k ? "selected" : ""}>${k}</option>`).join("")}
        </select>
      </div>
    </div>
    <div class="field"><label>Paraf guru</label><input name="paraph" value="${esc(v("paraph"))}" placeholder="Inisial / paraf guru"></div>
    <div class="field">
      <label>Keterangan</label>
      <textarea name="note" id="note-${prefix}" rows="3" placeholder="Catatan perkembangan santri...">${esc(v("note"))}</textarea>
      <button type="button" class="btn secondary slim ai" data-act="ai-draft" data-prefix="${prefix}">${icon("spark", "w-4 h-4")} Bantu AI (dapat diedit)</button>
    </div>
    <button class="btn primary" type="submit">${rec ? "Simpan Perubahan" : "Simpan Setoran"}</button>
  </form>`;
}

function readSetoranForm(prefix) {
  const f = document.getElementById("form-setoran-" + prefix);
  if (!f) return null;
  return Object.fromEntries(new FormData(f));
}
/* =====================================================
   PROFIL SANTRI
   ===================================================== */
function profilePage() {
  const x = studentById(S.profileId);
  if (!x) return `<div class="card notice">Santri tidak ditemukan.</div>`;
  const att = studentAttendanceSummary(x.id);
  const tabs = [
    ["pembelajaran", "Pembelajaran"],
    ["kehadiran", "Kehadiran"],
    ["adab", "Adab"],
    ["prestasi", "Prestasi"],
    ["bintang", "Bintang"],
  ];
  return `
  <button class="back" data-act="back-profile">${icon("back", "w-4 h-4")} Kembali</button>

  <div class="phead">
    <div class="pav">${ini(x.name)}</div>
    <div class="rm">
      <div class="pn">${esc(x.name)}</div>
      <div class="pm">${esc(x.gender)} · Grup ${esc(x.group)}</div>
      <div class="pm">Jenjang ${esc(x.level)} · Posisi terakhir ${esc(x.position || "-")}</div>
      <div class="pm">Wali: ${esc(x.guardianName || "-")}${x.wa ? " · " + esc(x.wa) : ""}</div>
    </div>
  </div>

  <div class="chips">
    <button class="chip" data-act="p-kehadiran">${icon("check", "w-3 h-3")} Kehadiran ${att.hadir}</button>
    <button class="chip" data-act="p-adab">${icon("book", "w-3 h-3")} Adab</button>
    <button class="chip" data-act="p-prestasi">${icon("trophy", "w-3 h-3")} Prestasi ${achievementsOf(x.id).length}</button>
    <button class="chip" data-act="p-bintang">${icon("star", "w-3 h-3")} Bintang ${countStars(x.id)}</button>
  </div>

  <div class="card" style="margin-bottom:12px">
    <div class="sh"><div class="st">Catat Pembelajaran</div></div>
    ${setoranForm("profile", x)}
  </div>

  <div class="tabs">
    ${tabs.map(t => `<button class="tab ${S.profileTab === t[0] ? "on" : ""}" data-ptab="${t[0]}">${t[1]}</button>`).join("")}
  </div>
  ${profileTabContent(x)}
  <div style="height:10px"></div>`;
}

function profileTabContent(x) {
  if (S.profileTab === "pembelajaran") {
    const recs = studentRecords(x.id);
    return recs.length ? `<div class="list">${recs.map(r => `
      <div class="card" style="margin-bottom:8px">
        <div class="row-flat">
          <div class="av sm">${icon("book", "w-4 h-4")}</div>
          <div class="rm">
            <div class="rn2">${esc(r.kitab)}${r.surah ? " — " + esc(r.surah) : ""}</div>
            <div class="rmeta">${fmtDate(r.date)}${r.page ? " · hlm. " + esc(r.page) : ""}${r.lines ? " · baris " + esc(r.lines) : ""}</div>
            <div class="rmeta kel ${r.kelancaran === "lancar" ? "ok" : ""}">${esc(r.kelancaran || "-")}${r.paraph ? " · paraf " + esc(r.paraph) : ""}${r.edited ? " · diedit" : ""}</div>
            ${r.note ? `<div class="rmeta" style="margin-top:4px">${esc(r.note)}</div>` : ""}
          </div>
          <button class="iconbtn" data-act="edit-record" data-recid="${r.id}" title="Edit">${icon("edit", "w-4 h-4")}</button>
        </div>
      </div>`).join("")}</div>` : `<div class="card notice">Belum ada riwayat pembelajaran.</div>`;
  }
  if (S.profileTab === "kehadiran") {
    const s = studentAttendanceSummary(x.id);
    const rows = studentAttendance(x.id);
    return `
    <div class="grid4" style="margin-bottom:10px">
      ${mini("Hadir", s.hadir, "ok")}${mini("Izin", s.izin, "")}${mini("Sakit", s.sakit, "")}${mini("Alpa", s.alpa, "warn")}
    </div>
    ${rows.length ? `<div class="card">${rows.slice(0, 30).map(a => `
      <div class="ir"><span>${fmtDate(a.date)}</span><span class="badge ${a.status === "hadir" ? "ok" : a.status === "alpa" ? "warn" : "mute"}">${labelAbsen(a.status)}</span></div>`).join("")}</div>`
      : `<div class="card notice">Belum ada riwayat kehadiran.</div>`}`;
  }
  if (S.profileTab === "adab") {
    const rows = adabOf(x.id);
    return `
    <button class="btn secondary slim" data-act="add-adab" style="margin-bottom:10px">${icon("plus", "w-4 h-4")} Catat Adab</button>
    ${rows.length ? `<div class="card">${rows.map(a => `
      <div class="ir"><span><b>${esc(a.adab)}</b> · ${esc(a.type)}<br><span class="rmeta">${esc(a.note || "")}</span></span><span class="rmeta nowrap">${fmtDate(a.date)}</span></div>`).join("")}</div>`
      : `<div class="card notice">Belum ada catatan adab.</div>`}`;
  }
  if (S.profileTab === "prestasi") {
    const rows = achievementsOf(x.id);
    return `
    <button class="btn secondary slim" data-act="add-achievement" style="margin-bottom:10px">${icon("plus", "w-4 h-4")} Tambah Prestasi</button>
    ${rows.length ? `<div class="card">${rows.map(a => `
      <div class="ir"><span><b>${esc(a.title)}</b><br><span class="rmeta">${esc(a.note || "")}</span></span><span class="rmeta nowrap">${fmtDate(a.date)}</span></div>`).join("")}</div>`
      : `<div class="card notice">Belum ada prestasi.</div>`}`;
  }
  const rows = starsOf(x.id);
  return `
  <div class="grid4" style="margin-bottom:10px">
    <div class="card starcount">${icon("star", "w-6 h-6")}<div class="sv">${countStars(x.id)}</div><div class="sl">Total bintang</div></div>
  </div>
  <button class="btn secondary slim" data-act="add-star" style="margin-bottom:10px">${icon("plus", "w-4 h-4")} Beri Bintang</button>
  ${rows.length ? `<div class="card">${rows.map(a => `
    <div class="ir"><span>${esc(a.reason || "Bintang")}</span><span class="rmeta nowrap">${fmtDate(a.date)}</span></div>`).join("")}</div>`
    : `<div class="card notice">Belum ada bintang.</div>`}`;
}

function mini(label, val, cls) {
  return `<div class="card mini"><div class="sl">${label}</div><div class="mv ${cls || ""}">${val}</div></div>`;
}
/* =====================================================
   3. KANTOR
   ===================================================== */
function kantorPage() {
  const v = S.kantorView;
  if (v === "grid") return kantorGrid();
  if (v === "santri") return kantorSantri();
  if (v === "wali") return kantorWali();
  if (v === "pengajar") return kantorPengajar();
  if (v === "kitab") return kantorKitab();
  if (v === "hafalan") return kantorHafalan();
  if (v === "pengaturan") return kantorPengaturan();
  if (v === "backup") return kantorBackup();
  if (v === "administrasi") return kantorAdministrasi();
  return kantorGrid();
}

function kantorGrid() {
  const students = getStudents();
  return `
  ${pageHead("Kantor", "Kelola data dan administrasi TPQ.")}
  <div class="grid2 kgrid">
    ${kcard("santri", "usergroup", "Data Santri", students.filter(x => x.status === "aktif").length + " aktif · " + students.filter(x => x.status !== "aktif").length + " nonaktif", "emerald")}
    ${kcard("wali", "user", "Data Wali", getGuardians().length + " wali terdaftar", "sky")}
    ${kcard("pengajar", "user", "Data Pengajar", getTeachers().filter(t => t.active).length + " pengajar aktif", "purple")}
    ${kcard("kitab", "book", "Data Kitab / Materi", getBooks().length + " kitab", "amber")}
    ${kcard("hafalan", "bookmark", "Data Hafalan", getMemorization().length + " materi hafalan", "rose")}
    ${kcard("pengaturan", "sliders", "Pengaturan TPQ", "Profil lembaga", "teal")}
    ${kcard("backup", "database", "Backup & Restore", "Data " + storageInfo().kb, "indigo")}
    ${kcard("administrasi", "file", "Administrasi", getAnnouncements().length + " pengumuman", "slate")}
  </div>

  <div class="sec">
    <div class="sh"><div class="st">Ringkasan Data</div></div>
    <div class="grid4">
      ${mini("Santri", getStudents().length)}${mini("Wali", getGuardians().length)}${mini("Pengajar", getTeachers().length)}${mini("Kitab", getBooks().length)}
    </div>
  </div>

  <div class="sec">
    <div class="sh"><div class="st">Aktivitas Terbaru</div></div>
    <div class="card">
      ${getActivity().slice(0, 5).map(a => `
      <div class="ir">
        <div class="row-flat"><div class="av sm">${icon(a.icon && a.icon.startsWith("fa-") ? "bell" : (a.icon || "bell"), "w-4 h-4")}</div>
        <div class="rm"><div class="rn2">${esc(a.title)}</div><div class="rmeta">${esc(a.detail)}</div></div></div>
        <span class="rmeta nowrap">${fmtDateTime(a.ts)}</span>
      </div>`).join("") || `<div class="notice">Belum ada aktivitas.</div>`}
    </div>
  </div>`;
}

function kcard(view, ic, title, sub, color) {
  return `
  <button class="kc" data-kantor="${view}">
    <div class="kctop">
      <div class="kico ${color}">${icon(ic, "w-4 h-4")}</div>
      ${icon("chev", "chev w-4 h-4")}
    </div>
    <div><div class="kn">${title}</div><div class="ks">${sub}</div></div>
  </button>`;
}

function kantorSantri() {
  const q = S.kantorQuery.toLowerCase();
  let list = getStudents();
  if (S.kantorFilter === "aktif") list = list.filter(x => x.status === "aktif");
  if (S.kantorFilter === "nonaktif") list = list.filter(x => x.status !== "aktif");
  if (GROUPS.includes(S.kantorFilter)) list = list.filter(x => x.group === S.kantorFilter);
  if (q) list = list.filter(x => (x.name || "").toLowerCase().includes(q) || (x.guardianName || "").toLowerCase().includes(q));
  return `
  ${pageHead("Data Santri", "Kelola seluruh data santri TPQ.", "kantor-home", "Menu Kantor")}
  <div class="searchrow">
    <div class="search">${icon("search", "w-4 h-4")}<input id="q-santri" placeholder="Cari nama santri atau wali..." value="${esc(S.kantorQuery)}"></div>
    <button class="btn primary slim nowr" data-act="add-student">${icon("plus", "w-4 h-4")} Tambah</button>
  </div>
  <div class="chips">
    ${["semua", "aktif", "nonaktif", ...GROUPS].map(f => `<button class="chip ${S.kantorFilter === f ? "on" : ""}" data-kfilter="${f}">${f[0].toUpperCase() + f.slice(1)}</button>`).join("")}
  </div>
  ${studentList(list, { empty: "Tidak ada santri yang cocok." })}
  <div style="height:10px"></div>`;
}

function kantorWali() {
  const q = S.kantorQuery.toLowerCase();
  let list = getGuardians();
  if (q) list = list.filter(w => (w.name || "").toLowerCase().includes(q));
  return `
  ${pageHead("Data Wali", "Kelola data orang tua / wali santri.", "kantor-home", "Menu Kantor")}
  <div class="searchrow">
    <div class="search">${icon("search", "w-4 h-4")}<input id="q-wali" placeholder="Cari nama wali..." value="${esc(S.kantorQuery)}"></div>
    <button class="btn primary slim nowr" data-act="add-guardian">${icon("plus", "w-4 h-4")} Tambah</button>
  </div>
  ${list.length ? `<div class="list">${list.map(w => {
    const kids = studentsOfGuardian(w.id);
    return `
    <div class="card" style="margin-bottom:8px">
      <div class="row-flat">
        <div class="av">${ini(w.name)}</div>
        <div class="rm">
          <div class="rn2">${esc(w.name)}</div>
          <div class="rmeta">${esc(w.relation || "Wali")}${w.wa ? " · " + esc(w.wa) : ""}</div>
          <div class="rmeta">Santri: ${kids.length ? kids.map(k => esc(k.name)).join(", ") : "-"}</div>
        </div>
      </div>
      <div class="rowbtns">
        ${w.wa ? `<a class="btn secondary slim wa" href="${waLink(w.wa, "Assalamu'alaikum, kami dari " + getProfile().name + ". ")}" target="_blank" rel="noopener">${icon("wa", "w-4 h-4")} WhatsApp</a>` : ""}
        <button class="btn secondary slim" data-act="edit-guardian" data-id="${w.id}">${icon("edit", "w-4 h-4")} Edit</button>
      </div>
    </div>`;
  }).join("")}</div>` : `<div class="card notice">Belum ada data wali.</div>`}
  <div style="height:10px"></div>`;
}

function kantorPengajar() {
  const list = getTeachers();
  return `
  ${pageHead("Data Pengajar", "Kelola data ustadz / ustadzah.", "kantor-home", "Menu Kantor")}
  <div class="searchrow">
    <div class="search"><span class="rmeta">Total ${list.length} pengajar</span></div>
    <button class="btn primary slim nowr" data-act="add-teacher">${icon("plus", "w-4 h-4")} Tambah</button>
  </div>
  ${list.length ? `<div class="list">${list.map(t => `
    <div class="card" style="margin-bottom:8px">
      <div class="row-flat">
        <div class="av ${t.active ? "" : "warn"}">${ini(t.name)}</div>
        <div class="rm">
          <div class="rn2">${esc(t.name)} ${t.active ? "" : '<span class="badge mute">Nonaktif</span>'}</div>
          <div class="rmeta">${esc(t.gender || "-")} · Kelas: ${esc(t.classes || "-")}${t.wa ? " · " + esc(t.wa) : ""}</div>
          ${t.paraph ? `<div class="rmeta">Paraf: ${esc(t.paraph)}</div>` : ""}
        </div>
      </div>
      <div class="rowbtns">
        <button class="btn secondary slim" data-act="edit-teacher" data-id="${t.id}">${icon("edit", "w-4 h-4")} Edit</button>
        <button class="btn secondary slim" data-act="toggle-teacher" data-id="${t.id}">${t.active ? "Nonaktifkan" : "Aktifkan"}</button>
      </div>
    </div>`).join("")}</div>` : `<div class="card notice">Belum ada pengajar.</div>`}
  <div style="height:10px"></div>`;
}

function kantorKitab() {
  const list = getBooks();
  return `
  ${pageHead("Data Kitab / Materi", "Daftar kitab yang dipakai pembelajaran.", "kantor-home", "Menu Kantor")}
  <div class="searchrow">
    <div class="search"><span class="rmeta">${list.length} kitab</span></div>
    <button class="btn primary slim nowr" data-act="add-book">${icon("plus", "w-4 h-4")} Tambah</button>
  </div>
  ${list.length ? `<div class="card">${list.map(b => `
    <div class="ir">
      <span><b>${esc(b.name)}</b><br><span class="rmeta">${esc(b.category || "")}${b.pages ? " · " + b.pages + " hal" : ""}${b.description ? " — " + esc(b.description) : ""}</span></span>
      <span class="rowbtns nowrap">
        <button class="iconbtn" data-act="edit-book" data-id="${b.id}">${icon("edit", "w-4 h-4")}</button>
        <button class="iconbtn danger" data-act="delete-book" data-id="${b.id}">${icon("trash", "w-4 h-4")}</button>
      </span>
    </div>`).join("")}</div>` : `<div class="card notice">Belum ada kitab.</div>`}`;
}

function kantorHafalan() {
  const list = getMemorization();
  return `
  ${pageHead("Data Hafalan", "Materi hafalan santri (Qur'an, doa, hadis).", "kantor-home", "Menu Kantor")}
  <div class="searchrow">
    <div class="search"><span class="rmeta">${list.length} materi</span></div>
    <button class="btn primary slim nowr" data-act="add-hafalan">${icon("plus", "w-4 h-4")} Tambah</button>
  </div>
  ${list.length ? `<div class="card">${list.map(h => {
    const done = getRecords().filter(r => r.hafalanId === h.id).length;
    return `
    <div class="ir">
      <span><b>${esc(h.name)}</b><br><span class="rmeta">${esc(h.category || "")} · target ${h.total} ${esc(h.unit || "")} · tercatat ${done}</span></span>
      <span class="rowbtns nowrap">
        <button class="iconbtn" data-act="edit-hafalan" data-id="${h.id}">${icon("edit", "w-4 h-4")}</button>
        <button class="iconbtn danger" data-act="delete-hafalan" data-id="${h.id}">${icon("trash", "w-4 h-4")}</button>
      </span>
    </div>`;
  }).join("")}</div>` : `<div class="card notice">Belum ada materi hafalan.</div>`}`;
}

function kantorPengaturan() {
  const p = getProfile();
  return `
  ${pageHead("Pengaturan TPQ", "Identitas lembaga tampil di header aplikasi.", "kantor-home", "Menu Kantor")}
  <div class="card">
    <form id="form-tpq" class="form">
      <div class="field"><label>Nama lembaga</label><input name="name" value="${esc(p.name)}" required></div>
      <div class="field"><label>Tagline</label><input name="tagline" value="${esc(p.tagline)}"></div>
      <div class="field"><label>Alamat</label><input name="address" value="${esc(p.address || "")}"></div>
      <div class="field"><label>Kepala TPQ</label><input name="head" value="${esc(p.head || "")}"></div>
      <button class="btn primary" type="submit">Simpan Profil</button>
    </form>
  </div>`;
}

function kantorBackup() {
  return `
  ${pageHead("Backup & Restore", "Amankan seluruh data aplikasi.", "kantor-home", "Menu Kantor")}
  <div class="card">
    <div class="st">Backup</div>
    <p class="rmeta" style="margin:6px 0 12px">Unduh file JSON berisi seluruh data santri, wali, pengajar, catatan pembelajaran, kehadiran, dan raport.</p>
    <button class="btn primary slim" data-act="export-data">${icon("download", "w-4 h-4")} Unduh Backup</button>
  </div>
  <div class="card" style="margin-top:10px">
    <div class="st">Restore</div>
    <p class="rmeta" style="margin:6px 0 12px">Pulihkan data dari file backup. Data saat ini akan ditimpa.</p>
    <input type="file" id="file-import" accept="application/json" style="display:none">
    <button class="btn secondary slim" data-act="import-data">${icon("upload", "w-4 h-4")} Pilih File Backup</button>
  </div>
  <div class="card" style="margin-top:10px">
    <div class="st">Reset Data</div>
    <p class="rmeta" style="margin:6px 0 12px">Menghapus seluruh data dan mengembalikan data contoh. Tindakan ini tidak dapat dibatalkan.</p>
    <button class="btn danger slim" data-act="reset-data">${icon("trash", "w-4 h-4")} Reset Semua Data</button>
  </div>`;
}

function kantorAdministrasi() {
  const list = getAnnouncements();
  return `
  ${pageHead("Administrasi", "Pengumuman dan informasi TPQ.", "kantor-home", "Menu Kantor")}
  <div class="searchrow">
    <div class="search"><span class="rmeta">${list.length} pengumuman</span></div>
    <button class="btn primary slim nowr" data-act="add-announcement">${icon("plus", "w-4 h-4")} Tambah</button>
  </div>
  ${list.length ? list.map(a => `
    <div class="card" style="margin-bottom:8px">
      <div class="row-flat">
        <div class="av sm">${icon("flag", "w-4 h-4")}</div>
        <div class="rm">
          <div class="rn2">${esc(a.title)}</div>
          <div class="rmeta">${esc(a.body)}</div>
          <div class="rmeta">${fmtDate(a.date)}</div>
        </div>
        <button class="iconbtn danger" data-act="delete-announcement" data-id="${a.id}">${icon("trash", "w-4 h-4")}</button>
      </div>
    </div>`).join("") : `<div class="card notice">Belum ada pengumuman.</div>`}`;
}
/* =====================================================
   4. RAPORT
   ===================================================== */
function raportPage() {
  const students = getStudents().filter(x => x.status === "aktif");
  const x = S.raportStudentId ? studentById(S.raportStudentId) : null;
  const per = PERIODS[S.raportPeriod];
  const from = isoDaysAgo(per.days);
  const to = todayISO();
  return `
  ${pageHead("Raport", "Rekap perkembangan santri per periode.")}
  <div class="searchrow">
    <select id="raport-student" class="sel">
      <option value="">— pilih santri —</option>
      ${students.map(s => `<option value="${s.id}" ${S.raportStudentId === s.id ? "selected" : ""}>${esc(s.name)} (${esc(s.group)})</option>`).join("")}
    </select>
    <select id="raport-period" class="sel auto">
      ${Object.keys(PERIODS).map(k => `<option value="${k}" ${S.raportPeriod === k ? "selected" : ""}>${PERIODS[k].label}</option>`).join("")}
    </select>
  </div>

  ${x ? raportPreview(x, from, to) : `<div class="card notice">Pilih santri untuk menyusun raport. Data diambil dari catatan Kelas dan Kantor secara otomatis.</div>`}`;
}

function raportPreview(x, from, to) {
  const st = reportStats(x.id, from, to);
  const periodLabel = PERIODS[S.raportPeriod].label;
  const saved = getReports().find(r => r.studentId === x.id && r.period === S.raportPeriod);
  const narasi = saved && saved.narasi ? saved.narasi : aiReportNarrative(x, st, periodLabel);
  const p = getProfile();
  return `
  <div class="card" id="printArea">
    <div class="rphead">
      <div class="mark sm">${icon("mosque", "w-4 h-4")}</div>
      <div>
        <div class="rn2">${esc(p.name)}</div>
        <div class="rmeta">Raport ${esc(periodLabel)} · ${fmtDate(from)} – ${fmtDate(to)}</div>
      </div>
    </div>
    <div class="phead flat">
      <div class="pav">${ini(x.name)}</div>
      <div class="rm">
        <div class="pn">${esc(x.name)}</div>
        <div class="pm">${esc(x.gender)} · Grup ${esc(x.group)} · Jenjang ${esc(x.level)}</div>
        <div class="pm">Wali: ${esc(x.guardianName || "-")}</div>
      </div>
    </div>

    <div class="grid4">
      ${mini("Setoran", st.count)}${mini("Hadir", st.hadir + "/" + st.attTotal)}${mini("Bintang", st.stars)}${mini("Prestasi", st.ach)}
    </div>

    <div class="card flat" style="margin-top:10px">
      ${progressBar("Kelancaran bacaan (lancar)", st.kelancaranPct, "emerald")}
      <div class="ir"><span class="muted">Izin / Sakit / Alpa</span><b>${st.izin} / ${st.sakit} / ${st.alpa}</b></div>
      <div class="ir"><span class="muted">Catatan adab</span><b>${st.adab}</b></div>
      <div class="ir"><span class="muted">Posisi belajar terakhir</span><b>${esc(st.position)}</b></div>
      <div class="ir"><span class="muted">Setoran terakhir</span><span>${esc(st.last)}</span></div>
    </div>

    <div class="field" style="margin-top:12px">
      <label>Narasi guru (dapat diedit)</label>
      <textarea id="raport-narasi" rows="4">${esc(narasi)}</textarea>
      <div class="rowbtns" style="margin-top:8px">
        <button class="btn secondary slim" data-act="raport-ai">${icon("spark", "w-4 h-4")} Buat Ulang (AI)</button>
        <button class="btn primary slim" data-act="raport-save">${icon("check", "w-4 h-4")} Simpan Raport</button>
        <button class="btn secondary slim" data-act="raport-print">${icon("file", "w-4 h-4")} Cetak / PDF</button>
      </div>
    </div>
  </div>`;
}

function aiReportNarrative(x, st, periodLabel) {
  const att = st.attTotal ? Math.round(st.hadir / st.attTotal * 100) : 0;
  return [
    "Pada " + periodLabel.toLowerCase() + ", " + x.name + " tercatat melakukan " + st.count + " setoran pembelajaran dengan tingkat kelancaran " + st.kelancaranPct + "% lancar.",
    "Kehadiran " + st.hadir + " dari " + st.attTotal + " pertemuan (" + att + "%).",
    st.count ? "Posisi belajar terakhir berada pada " + st.position + "." : "Belum ada setoran tercatat pada periode ini.",
    st.stars ? "Memperoleh " + st.stars + " bintang dan " + st.ach + " pencapaian prestasi." : "",
    att >= 80 ? "Pertahankan semangat dan kehadirannya." : "Diharapkan meningkatkan kehadiran dan semangat belajar.",
  ].filter(Boolean).join(" ");
}

/* =====================================================
   MODAL
   ===================================================== */
function modalShell(title, sub, body) {
  return `
  <div class="modalbg" data-closebg="1">
    <div class="modal">
      <div class="handle"></div>
      <div class="mh">
        <div><div class="mt">${esc(title)}</div>${sub ? `<div class="rmeta">${esc(sub)}</div>` : ""}</div>
        <button class="close" data-act="close-modal">${icon("plus", "w-4 h-4")}</button>
      </div>
      ${body}
    </div>
  </div>`;
}

function modalHTML() {
  const m = S.modal;
  if (m === "setting") {
    const items = [
      ["Identitas TPQ", "Ubah nama dan tagline lembaga", "open-tpq-profile"],
      ["Backup & Restore", "Unduh atau pulihkan data", "goto-backup"],
      ["Reset Data", "Hapus seluruh data", "reset-data"],
    ];
    return modalShell("Pengaturan", "Pengaturan aplikasi TPQ", `
      <div class="card">${items.map(i => `
        <button class="setting" data-act="${i[2]}"><div><div class="settitle">${i[0]}</div><div class="setdesc">${i[1]}</div></div>${icon("chev", "chev w-4 h-4")}</button>`).join("")}
      </div>`);
  }
  if (m === "tpq-profile") return modalShell("Profil TPQ", "Identitas tampil di header aplikasi", `
    <form id="form-tpq-modal" class="form">
      <div class="field"><label>Nama lembaga</label><input name="name" value="${esc(getProfile().name)}" required></div>
      <div class="field"><label>Tagline</label><input name="tagline" value="${esc(getProfile().tagline)}"></div>
      <button class="btn primary" type="submit">Simpan</button>
    </form>`);

  if (m === "student-form") {
    const x = S.modalData && S.modalData.id ? getStudents().find(s => s.id === S.modalData.id) : null;
    const guardians = getGuardians();
    const v = k => x ? (x[k] ?? "") : "";
    return modalShell(x ? "Edit Santri" : "Tambah Santri", "Data santri terhubung dengan Kelas & Raport", `
      <form id="form-student" class="form">
        <input type="hidden" name="id" value="${x ? esc(x.id) : ""}">
        <div class="field"><label>Nama anak</label><input name="name" value="${esc(v("name"))}" required></div>
        <div class="field"><label>Jenis kelamin</label>
          <select name="gender">${["Laki-laki", "Perempuan"].map(g => `<option ${v("gender") === g ? "selected" : ""}>${g}</option>`).join("")}</select>
        </div>
        <div class="field"><label>Wali (dari data wali)</label>
          <select name="guardianId"><option value="">— belum dipilih —</option>
          ${guardians.map(w => `<option value="${w.id}" ${v("guardianId") === w.id ? "selected" : ""}>${esc(w.name)}</option>`).join("")}</select>
        </div>
        <div class="grid2 gform">
          <div class="field"><label>Nama wali (manual)</label><input name="guardianName" value="${esc(v("guardianName"))}" placeholder="Jika belum ada di data wali"></div>
          <div class="field"><label>No. WhatsApp wali</label><input name="wa" inputmode="tel" value="${esc(v("wa"))}"></div>
        </div>
        <div class="grid2 gform">
          <div class="field"><label>Grup</label>
            <select name="group">${GROUPS.map(g => `<option ${v("group") === g ? "selected" : ""}>${g}</option>`).join("")}</select>
          </div>
          <div class="field"><label>Jenjang</label><input name="level" value="${esc(v("level"))}" placeholder="Contoh: Faturrahman" required></div>
        </div>
        <div class="grid2 gform">
          <div class="field"><label>Posisi belajar</label><input name="position" value="${esc(v("position"))}" placeholder="Contoh: Hal. 12"></div>
          <div class="field"><label>Tanggal masuk</label><input type="date" name="joined" value="${esc(v("joined")) || todayISO()}"></div>
        </div>
        <div class="field"><label>Status</label>
          <select name="status"><option ${v("status") === "aktif" ? "selected" : ""}>aktif</option><option ${v("status") === "nonaktif" ? "selected" : ""}>nonaktif</option></select>
        </div>
        <div class="field"><label>Catatan</label><textarea name="note" rows="2">${esc(v("note"))}</textarea></div>
        <button class="btn primary" type="submit">Simpan Santri</button>
        ${x ? `<button class="btn danger" type="button" data-act="delete-student" data-id="${x.id}">Hapus Santri</button>` : ""}
      </form>`);
  }

  if (m === "guardian-form") {
    const w = S.modalData && S.modalData.id ? getGuardians().find(g => g.id === S.modalData.id) : null;
    const v = k => w ? (w[k] ?? "") : "";
    return modalShell(w ? "Edit Wali" : "Tambah Wali", "Satu wali dapat mengasuh lebih dari satu santri", `
      <form id="form-guardian" class="form">
        <input type="hidden" name="id" value="${w ? esc(w.id) : ""}">
        <div class="field"><label>Nama wali</label><input name="name" value="${esc(v("name"))}" required></div>
        <div class="field"><label>Nomor WhatsApp</label><input name="wa" inputmode="tel" value="${esc(v("wa"))}" placeholder="08xxxxxxxxxx"></div>
        <div class="field"><label>Hubungan dengan santri</label>
          <select name="relation">${["Ayah", "Ibu", "Wali", "Lainnya"].map(r => `<option ${v("relation") === r ? "selected" : ""}>${r}</option>`).join("")}</select>
        </div>
        <div class="field"><label>Alamat</label><input name="address" value="${esc(v("address"))}"></div>
        <div class="field"><label>Catatan</label><textarea name="note" rows="2">${esc(v("note"))}</textarea></div>
        <button class="btn primary" type="submit">Simpan Wali</button>
      </form>`);
  }

  if (m === "teacher-form") {
    const t = S.modalData && S.modalData.id ? getTeachers().find(g => g.id === S.modalData.id) : null;
    const v = k => t ? (t[k] ?? "") : "";
    return modalShell(t ? "Edit Pengajar" : "Tambah Pengajar", "Paraf dipakai pada catatan pembelajaran", `
      <form id="form-teacher" class="form">
        <input type="hidden" name="id" value="${t ? esc(t.id) : ""}">
        <div class="field"><label>Nama</label><input name="name" value="${esc(v("name"))}" required></div>
        <div class="field"><label>Jenis kelamin</label>
          <select name="gender">${["Laki-laki", "Perempuan"].map(g => `<option ${v("gender") === g ? "selected" : ""}>${g}</option>`).join("")}</select>
        </div>
        <div class="field"><label>Nomor WhatsApp</label><input name="wa" inputmode="tel" value="${esc(v("wa"))}"></div>
        <div class="field"><label>Kelas yang diajar</label>
          <select name="classes">${GROUPS.map(g => `<option ${v("classes") === g ? "selected" : ""}>${g}</option>`).join("")}</select>
        </div>
        <div class="field"><label>Paraf / tanda tangan (inisial)</label><input name="paraph" value="${esc(v("paraph"))}" placeholder="Contoh: AR"></div>
        <div class="field"><label>Catatan</label><textarea name="note" rows="2">${esc(v("note"))}</textarea></div>
        <button class="btn primary" type="submit">Simpan Pengajar</button>
      </form>`);
  }

  if (m === "book-form") {
    const b = S.modalData && S.modalData.id ? getBooks().find(g => g.id === S.modalData.id) : null;
    const v = k => b ? (b[k] ?? "") : "";
    return modalShell(b ? "Edit Kitab" : "Tambah Kitab", "", `
      <form id="form-book" class="form">
        <input type="hidden" name="id" value="${b ? esc(b.id) : ""}">
        <div class="field"><label>Nama kitab</label><input name="name" value="${esc(v("name"))}" required></div>
        <div class="grid2 gform">
          <div class="field"><label>Kategori</label><input name="category" value="${esc(v("category"))}" placeholder="Iqra / Tulis Qur'an / Tadarus"></div>
          <div class="field"><label>Jumlah halaman</label><input name="pages" inputmode="numeric" value="${esc(v("pages"))}"></div>
        </div>
        <div class="field"><label>Deskripsi</label><textarea name="description" rows="2">${esc(v("description"))}</textarea></div>
        <button class="btn primary" type="submit">Simpan Kitab</button>
      </form>`);
  }

  if (m === "hafalan-form") {
    const h = S.modalData && S.modalData.id ? getMemorization().find(g => g.id === S.modalData.id) : null;
    const v = k => h ? (h[k] ?? "") : "";
    return modalShell(h ? "Edit Materi Hafalan" : "Tambah Materi Hafalan", "", `
      <form id="form-hafalan" class="form">
        <input type="hidden" name="id" value="${h ? esc(h.id) : ""}">
        <div class="field"><label>Nama materi</label><input name="name" value="${esc(v("name"))}" required placeholder="Contoh: Juz 30"></div>
        <div class="field"><label>Kategori</label>
          <select name="category">${["Hafalan Qur'an", "Hafalan Doa", "Hafalan Hadis"].map(c => `<option ${v("category") === c ? "selected" : ""}>${c}</option>`).join("")}</select>
        </div>
        <div class="grid2 gform">
          <div class="field"><label>Target jumlah</label><input name="total" inputmode="numeric" value="${esc(v("total"))}" required></div>
          <div class="field"><label>Satuan</label>
            <select name="unit">${["surah", "doa", "hadis", "ayat", "halaman"].map(u => `<option ${v("unit") === u ? "selected" : ""}>${u}</option>`).join("")}</select>
          </div>
        </div>
        <button class="btn primary" type="submit">Simpan Materi</button>
      </form>`);
  }

  if (m === "announcement-form") return modalShell("Tambah Pengumuman", "Tampil di menu Informasi", `
    <form id="form-announcement" class="form">
      <div class="field"><label>Judul</label><input name="title" required></div>
      <div class="field"><label>Isi</label><textarea name="body" rows="3" required></textarea></div>
      <div class="field"><label>Tanggal</label><input type="date" name="date" value="${todayISO()}"></div>
      <button class="btn primary" type="submit">Simpan</button>
    </form>`);

  if (m === "adab-form") {
    const x = studentById(S.profileId);
    return modalShell("Catat Adab", esc(x ? x.name : ""), `
      <form id="form-adab" class="form">
        <div class="field"><label>Jenis</label>
          <select name="type"><option value="apresiasi">Apresiasi</option><option value="pelanggaran">Perlu perbaikan</option></select>
        </div>
        <div class="field"><label>Adab yang dicatat</label><input name="adab" required placeholder="Contoh: sopan kepada guru"></div>
        <div class="field"><label>Tanggal</label><input type="date" name="date" value="${todayISO()}"></div>
        <div class="field"><label>Keterangan</label>
          <textarea name="note" id="adab-note" rows="3"></textarea>
          <button type="button" class="btn secondary slim ai" data-act="ai-adab">${icon("spark", "w-4 h-4")} Bantu AI (dapat diedit)</button>
        </div>
        <button class="btn primary" type="submit">Simpan</button>
      </form>`);
  }

  if (m === "achievement-form") {
    const x = studentById(S.profileId);
    return modalShell("Tambah Prestasi", esc(x ? x.name : ""), `
      <form id="form-achievement" class="form">
        <div class="field"><label>Nama prestasi</label><input name="title" required placeholder="Contoh: Juara 1 Lomba Tahfidz"></div>
        <div class="field"><label>Tanggal</label><input type="date" name="date" value="${todayISO()}"></div>
        <div class="field"><label>Catatan</label><textarea name="note" rows="2"></textarea></div>
        <button class="btn primary" type="submit">Simpan</button>
      </form>`);
  }

  if (m === "star-form") {
    const x = studentById(S.profileId);
    return modalShell("Beri Bintang", esc(x ? x.name : ""), `
      <form id="form-star" class="form">
        <div class="field"><label>Jumlah bintang</label>
          <select name="count">${[1, 2, 3, 5].map(n => `<option value="${n}">${n}</option>`).join("")}</select>
        </div>
        <div class="field"><label>Alasan</label><input name="reason" placeholder="Contoh: hafalan lancar"></div>
        <div class="field"><label>Tanggal</label><input type="date" name="date" value="${todayISO()}"></div>
        <button class="btn primary" type="submit">Simpan</button>
      </form>`);
  }

  if (m === "setoran-form") {
    const student = studentById(S.modalData.studentId);
    const rec = S.modalData.recId ? getRecords().find(r => r.id === S.modalData.recId) : null;
    return modalShell(rec ? "Edit Setoran" : "Setoran — " + (student ? student.name : ""), student ? esc(student.level) + " · " + esc(student.position || "-") : "",
      setoranForm("session", student, rec));
  }

  if (m === "confirm") {
    const d = S.modalData;
    return modalShell(d.title || "Konfirmasi", "", `
      <div class="notice" style="margin-bottom:14px">${esc(d.message)}</div>
      <div class="rowbtns">
        <button class="btn secondary" data-act="close-modal">Batal</button>
        <button class="btn danger" data-act="confirm-yes">${esc(d.okLabel || "Ya, lanjutkan")}</button>
      </div>`);
  }
  return modalShell("Informasi", "", `<div class="notice">Segera hadir.</div>`);
}
/* =====================================================
   TOAST, NAVIGASI & SIMPAN SETORAN
   ===================================================== */
function toast(msg) {
  S.toast = msg;
  render();
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { S.toast = ""; if (!S.modal) render(); }, 2200);
}

function openProfile(id) {
  S.profileId = id;
  S.profileTab = "pembelajaran";
  render();
}

function goTo(page) { S.page = page; render(); }

function confirmModal(title, message, okLabel, fn) {
  S.modal = "confirm";
  S.modalData = { title: title, message: message, okLabel: okLabel, fn: fn };
  render();
}

function saveSessionSetoran(d) {
  const student = studentById(d.studentId);
  if (!student) return;
  const payload = {
    studentId: student.id, studentName: student.name, group: student.group,
    date: d.date, kitab: d.kitab, surah: d.surah, page: d.page, lines: d.lines,
    hafalanId: d.hafalanId || null, kelancaran: d.kelancaran,
    paraph: d.paraph, note: d.note, sessionRef: S.session ? S.session.id : null,
  };
  if (d.recId) {
    updateLearningRecord(d.recId, payload);
    toast("Perubahan setoran disimpan");
  } else {
    addLearningRecord(payload);
    const list = getStudents();
    const i = list.findIndex(x => x.id === student.id);
    if (i >= 0) {
      const pos = [d.kitab, d.page ? "Hal. " + d.page : ""].filter(Boolean).join(" ");
      if (pos) { list[i].position = pos; saveStudents(list); }
    }
    if (S.session && (S.modalData || {}).fromSession) {
      markFinished(S.session, student.id);
      const next = activeStudents(S.session.group).find(x => !S.session.called.includes(x.id) && !S.session.finished.includes(x.id) && !((S.session.absent || {})[x.id]));
      toast(next ? "Tersimpan. Berikutnya: " + next.name : "Tersimpan. Semua santri sudah diproses.");
    } else {
      toast("Setoran tersimpan sebagai riwayat baru");
    }
  }
  S.modal = null; S.modalData = null;
  render();
}

/* =====================================================
   BINDING
   ===================================================== */
function bind() {
  const $ = sel => document.querySelector(sel);
  const $$ = sel => document.querySelectorAll(sel);

  $$("[data-nav]").forEach(b => b.onclick = () => { S.profileId = null; goTo(b.dataset.nav); });

  $$("[data-act]").forEach(b => {
    b.onclick = e => {
      e.stopPropagation();
      act(b.dataset.act, b);
    };
  });

  $$("[data-sg]").forEach(b => b.onclick = () => { S.group = b.dataset.sg; render(); });

  $$("[data-group]").forEach(b => b.onclick = () => {
    S.group = b.dataset.group;
    const sess = getActiveSession(S.group);
    if (sess) { S.session = sess; S.kelasView = "session"; }
    else S.kelasView = "groups";
    render();
  });

  $$("[data-kantor]").forEach(b => b.onclick = () => {
    S.kantorView = b.dataset.kantor;
    S.kantorQuery = "";
    S.kantorFilter = "semua";
    render();
  });
  $$("[data-kgoto]").forEach(b => b.onclick = () => {
    S.page = "kantor";
    S.kantorView = b.dataset.kgoto;
    render();
  });

  $$("[data-kfilter]").forEach(b => b.onclick = () => {
    S.kantorFilter = b.dataset.kfilter;
    render();
  });

  const qSantri = $("#q-santri");
  if (qSantri) qSantri.oninput = debounce(() => {
    S.kantorQuery = qSantri.value;
    const pos = qSantri.selectionStart;
    render();
    const nq = $("#q-santri");
    if (nq) { nq.focus(); nq.setSelectionRange(pos, pos); }
  }, 250);
  const qWali = $("#q-wali");
  if (qWali) qWali.oninput = debounce(() => {
    S.kantorQuery = qWali.value;
    const pos = qWali.selectionStart;
    render();
    const nq = $("#q-wali");
    if (nq) { nq.focus(); nq.setSelectionRange(pos, pos); }
  }, 250);

  $$("[data-profile]").forEach(b => b.onclick = e => {
    e.stopPropagation();
    openProfile(b.dataset.profile);
  });

  $$("[data-ptab]").forEach(b => b.onclick = () => { S.profileTab = b.dataset.ptab; render(); });

  $$("[data-call]").forEach(b => b.onclick = e => {
    e.stopPropagation();
    if (S.session) markCalled(S.session, b.dataset.call);
    S.modal = "setoran-form";
    S.modalData = { studentId: b.dataset.call, recId: null, fromSession: true };
    render();
  });

  $$("[data-absent]").forEach(b => b.onclick = e => {
    e.stopPropagation();
    const parts = b.dataset.absent.split("|");
    const sid = parts[0], reason = parts[1];
    if (!S.session) return;
    markAbsent(S.session, sid, reason);
    const st = studentById(sid);
    logActivity("calendar", "Absensi dicatat", (st ? st.name : "Santri") + " • " + labelAbsen(reason));
    const next = activeStudents(S.session.group).find(x => !S.session.called.includes(x.id) && !S.session.finished.includes(x.id) && !((S.session.absent || {})[x.id]));
    toast((st ? st.name : "Santri") + ": " + labelAbsen(reason) + (next ? " • Berikutnya: " + next.name : ""));
  });

  const rs = $("#raport-student");
  if (rs) rs.onchange = () => { S.raportStudentId = rs.value; render(); };
  const rp = $("#raport-period");
  if (rp) rp.onchange = () => { S.raportPeriod = rp.value; render(); };

  $$("[data-closebg]").forEach(bg => bg.onclick = e => { if (e.target === bg) { S.modal = null; S.modalData = null; render(); } });

  bindForms($);
}

function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

function bindForms($) {
  const on = (id, fn) => { const f = $(id); if (f) f.onsubmit = e => { e.preventDefault(); fn(Object.fromEntries(new FormData(f))); }; };

  $$("form[data-setoran]").forEach(f => f.onsubmit = e => {
    e.preventDefault();
    saveSessionSetoran(Object.fromEntries(new FormData(f)));
  });

  on("#form-student", d => {
    const list = getStudents();
    if (d.id) {
      const i = list.findIndex(x => x.id === d.id);
      if (i >= 0) {
        const g = d.guardianId ? getGuardians().find(w => w.id === d.guardianId) : null;
        list[i] = { ...list[i], ...d, id: d.id, guardianName: g ? g.name : d.guardianName, wa: g && !d.wa ? g.wa : d.wa };
        saveStudents(list);
        toast("Data santri diperbarui");
        logActivity("user", "Data santri diperbarui", list[i].name + " • " + list[i].group);
      }
    } else {
      const g = d.guardianId ? getGuardians().find(w => w.id === d.guardianId) : null;
      const nu = { id: uid(), ...d, guardianName: g ? g.name : d.guardianName, wa: g && !d.wa ? g.wa : d.wa, status: d.status || "aktif" };
      list.unshift(nu);
      saveStudents(list);
      toast("Santri ditambahkan");
      logActivity("user", "Santri baru ditambahkan", nu.name + " • " + nu.group);
    }
    S.modal = null; S.modalData = null;
    render();
  });

  on("#form-guardian", d => {
    const list = getGuardians();
    if (d.id) {
      const i = list.findIndex(x => x.id === d.id);
      if (i >= 0) { list[i] = { ...list[i], ...d, id: d.id }; saveGuardians(list); toast("Data wali diperbarui"); }
    } else {
      list.unshift({ id: uid(), ...d });
      saveGuardians(list);
      toast("Wali ditambahkan");
      logActivity("user", "Wali ditambahkan", d.name);
    }
    S.modal = null; S.modalData = null;
    render();
  });

  on("#form-teacher", d => {
    const list = getTeachers();
    if (d.id) {
      const i = list.findIndex(x => x.id === d.id);
      if (i >= 0) { list[i] = { ...list[i], ...d, id: d.id, active: list[i].active }; saveTeachers(list); toast("Data pengajar diperbarui"); }
    } else {
      list.unshift({ id: uid(), ...d, active: true });
      saveTeachers(list);
      toast("Pengajar ditambahkan");
      logActivity("user", "Pengajar ditambahkan", d.name);
    }
    S.modal = null; S.modalData = null;
    render();
  });

  on("#form-book", d => {
    const list = getBooks();
    if (d.id) {
      const i = list.findIndex(x => x.id === d.id);
      if (i >= 0) { list[i] = { ...list[i], ...d, id: d.id, pages: Number(d.pages) || undefined }; saveBooks(list); toast("Kitab diperbarui"); }
    } else {
      list.unshift({ id: uid(), ...d, pages: Number(d.pages) || undefined });
      saveBooks(list);
      toast("Kitab ditambahkan");
      logActivity("book", "Kitab ditambahkan", d.name);
    }
    S.modal = null; S.modalData = null;
    render();
  });

  on("#form-hafalan", d => {
    const list = getMemorization();
    if (d.id) {
      const i = list.findIndex(x => x.id === d.id);
      if (i >= 0) { list[i] = { ...list[i], ...d, id: d.id, total: Number(d.total) || 0 }; saveMemorization(list); toast("Materi diperbarui"); }
    } else {
      list.unshift({ id: uid(), ...d, total: Number(d.total) || 0 });
      saveMemorization(list);
      toast("Materi hafalan ditambahkan");
    }
    S.modal = null; S.modalData = null;
    render();
  });

  on("#form-announcement", d => {
    addAnnouncement(d);
    toast("Pengumuman dipublikasikan");
    S.modal = null; S.modalData = null;
    render();
  });

  on("#form-adab", d => {
    const x = studentById(S.profileId);
    if (x) {
      addAdab({ studentId: x.id, studentName: x.name, type: d.type, adab: d.adab, note: d.note, date: d.date });
      toast("Catatan adab disimpan");
    }
    S.modal = null; S.modalData = null;
    render();
  });

  on("#form-achievement", d => {
    const x = studentById(S.profileId);
    if (x) {
      addAchievement({ studentId: x.id, studentName: x.name, title: d.title, note: d.note, date: d.date });
      toast("Prestasi dicatat");
    }
    S.modal = null; S.modalData = null;
    render();
  });

  on("#form-star", d => {
    const x = studentById(S.profileId);
    if (x) {
      const n = Number(d.count) || 1;
      for (let i = 0; i < n; i++) addStar({ studentId: x.id, studentName: x.name, reason: d.reason, date: d.date });
      toast(n + " bintang diberikan");
    }
    S.modal = null; S.modalData = null;
    render();
  });

  const tpq = $("#form-tpq-modal");
  if (tpq) tpq.onsubmit = e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(tpq));
    saveProfile({ ...getProfile(), ...d });
    S.modal = null;
    toast("Profil TPQ disimpan");
  };
  const tpq2 = $("#form-tpq");
  if (tpq2) tpq2.onsubmit = e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(tpq2));
    saveProfile({ ...getProfile(), ...d });
    toast("Profil TPQ disimpan");
  };
}

/* =====================================================
   DISPATCHER AKSI
   ===================================================== */
function act(a, btn) {
  switch (a) {
    case "open-setting": S.modal = "setting"; S.modalData = null; render(); break;
    case "open-tpq-profile": S.modal = "tpq-profile"; S.modalData = null; render(); break;
    case "close-modal": S.modal = null; S.modalData = null; render(); break;
    case "back": S.profileId = null; render(); break;
    case "back-profile": S.profileId = null; render(); break;
    case "back-to-groups": S.kelasView = "groups"; S.session = getActiveSession(S.group); render(); break;
    case "goto-kelas": S.profileId = null; goTo("kelas"); break;
    case "start-session": {
      if (getActiveSession(S.group)) { S.session = getActiveSession(S.group); S.kelasView = "session"; render(); break; }
      if (!activeStudents(S.group).length) { toast("Belum ada santri aktif di kelompok ini"); break; }
      S.session = startSession(S.group);
      S.kelasView = "session";
      render();
      break;
    }
    case "goto-backup": S.modal = null; S.page = "kantor"; S.kantorView = "backup"; render(); break;
    case "add-student": S.modal = "student-form"; S.modalData = null; render(); break;
    case "add-guardian": S.modal = "guardian-form"; S.modalData = null; render(); break;
    case "add-teacher": S.modal = "teacher-form"; S.modalData = null; render(); break;
    case "add-book": S.modal = "book-form"; S.modalData = null; render(); break;
    case "add-hafalan": S.modal = "hafalan-form"; S.modalData = null; render(); break;
    case "add-announcement": S.modal = "announcement-form"; S.modalData = null; render(); break;
    case "add-adab": S.modal = "adab-form"; render(); break;
    case "add-achievement": S.modal = "achievement-form"; render(); break;
    case "add-star": S.modal = "star-form"; render(); break;
    case "p-kehadiran": S.profileTab = "kehadiran"; render(); break;
    case "p-adab": S.profileTab = "adab"; render(); break;
    case "p-prestasi": S.profileTab = "prestasi"; render(); break;
    case "p-bintang": S.profileTab = "bintang"; render(); break;
    case "edit-guardian": S.modal = "guardian-form"; S.modalData = { id: btn.dataset.id }; render(); break;
    case "edit-teacher": S.modal = "teacher-form"; S.modalData = { id: btn.dataset.id }; render(); break;
    case "edit-book": S.modal = "book-form"; S.modalData = { id: btn.dataset.id }; render(); break;
    case "edit-hafalan": S.modal = "hafalan-form"; S.modalData = { id: btn.dataset.id }; render(); break;
    case "edit-record": S.modal = "setoran-form"; S.modalData = { studentId: S.profileId, recId: btn.dataset.recid, fromSession: false }; render(); break;
    case "toggle-teacher": {
      const list = getTeachers();
      const t = list.find(x => x.id === btn.dataset.id);
      if (t) { t.active = !t.active; saveTeachers(list); toast(t.active ? "Pengajar diaktifkan" : "Pengajar dinonaktifkan"); }
      break;
    }
    case "delete-book": confirmModal("Hapus Kitab", "Hapus kitab ini dari daftar? Riwayat setoran yang memakai kitab ini tidak berubah.", "Hapus", () => {
      saveBooks(getBooks().filter(x => x.id !== btn.dataset.id));
      toast("Kitab dihapus");
    }); break;
    case "delete-hafalan": confirmModal("Hapus Materi Hafalan", "Hapus materi hafalan ini?", "Hapus", () => {
      saveMemorization(getMemorization().filter(x => x.id !== btn.dataset.id));
      toast("Materi dihapus");
    }); break;
    case "delete-announcement": confirmModal("Hapus Pengumuman", "Hapus pengumuman ini?", "Hapus", () => {
      saveAnnouncements(getAnnouncements().filter(x => x.id !== btn.dataset.id));
      toast("Pengumuman dihapus");
    }); break;
    case "delete-student": {
      const sid = btn ? btn.dataset.id : null;
      confirmModal("Hapus Santri", "Santri akan dihapus dari daftar. Riwayat setoran dan kehadiran lama tidak ikut terhapus. Lanjutkan?", "Hapus Permanen", () => {
        if (sid) {
          const st = studentById(sid);
          saveStudents(getStudents().filter(x => x.id !== sid));
          logActivity("trash", "Santri dihapus", st ? st.name : "");
          toast("Santri dihapus");
        }
        S.modal = null; S.modalData = null;
        render();
      });
      break;
    }
    case "reset-data": confirmModal("Reset Semua Data", "Seluruh data akan dihapus dan kembali ke data contoh. Lanjutkan?", "Reset", () => {
      resetAllData();
      S.modal = null; S.session = null; S.kelasView = "groups"; S.kantorView = "grid";
      render();
      toast("Data direset");
    }); break;
    case "confirm-yes": {
      const fn = S.modalData && S.modalData.fn;
      S.modal = null;
      if (fn) fn();
      render();
      break;
    }
    case "close-session": confirmModal("Tutup Sesi Kelas", "Santri yang masih \"Belum Dipanggil\" otomatis menjadi Alpa. Setoran yang sudah tersimpan tidak berubah. Tutup sesi?", "Tutup Sesi", () => {
      if (S.session) { closeSession(S.session); S.session = null; S.kelasView = "groups"; }
      toast("Sesi kelas ditutup");
    }); break;
    case "ai-draft": {
      const d = readSetoranForm(btn.dataset.prefix);
      if (d) {
        const ta = document.getElementById("note-" + btn.dataset.prefix);
        if (ta) {
          ta.value = aiDraft(d);
          ta.focus();
          toast("Draft AI dibuat — silakan edit sebelum menyimpan");
        }
      }
      break;
    }
    case "ai-adab": {
      const ta = document.getElementById("adab-note");
      const form = document.getElementById("form-adab");
      if (ta && form) {
        const dd = Object.fromEntries(new FormData(form));
        ta.value = aiDraftAdab(dd);
        toast("Draft AI dibuat — silakan edit sebelum menyimpan");
      }
      break;
    }
    case "export-data": {
      const blob = new Blob([exportData()], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const el = document.createElement("a");
      el.href = url;
      el.download = "backup-tpq-" + todayISO() + ".json";
      el.click();
      URL.revokeObjectURL(url);
      toast("Backup diunduh");
      break;
    }
    case "import-data": {
      const inp = document.getElementById("file-import");
      if (inp) {
        inp.onchange = () => {
          const f = inp.files[0];
          if (!f) return;
          const reader = new FileReader();
          reader.onload = () => {
            try {
              importData(reader.result);
              toast("Data berhasil dipulihkan");
              render();
            } catch (e) { toast("File backup tidak valid"); }
          };
          reader.readAsText(f);
        };
        inp.click();
      }
      break;
    }
    case "raport-ai": {
      const x = studentById(S.raportStudentId);
      const ta = document.getElementById("raport-narasi");
      if (x && ta) {
        const per = PERIODS[S.raportPeriod];
        ta.value = aiReportNarrative(x, reportStats(x.id, isoDaysAgo(per.days), todayISO()), per.label);
        toast("Narasi dibuat ulang — dapat diedit");
      }
      break;
    }
    case "raport-save": {
      const x = studentById(S.raportStudentId);
      const ta = document.getElementById("raport-narasi");
      if (x && ta) {
        saveReport({ studentId: x.id, period: S.raportPeriod, narasi: ta.value, savedAt: Date.now() });
        logActivity("file", "Raport disimpan", x.name + " • " + PERIODS[S.raportPeriod].label);
        toast("Raport disimpan");
      }
      break;
    }
    case "raport-print": {
      const x = studentById(S.raportStudentId);
      if (x) {
        const ta = document.getElementById("raport-narasi");
        saveReport({ studentId: x.id, period: S.raportPeriod, narasi: ta ? ta.value : "", savedAt: Date.now() });
        document.body.classList.add("printing");
        window.print();
        setTimeout(() => document.body.classList.remove("printing"), 500);
      }
      break;
    }
  }
}

/* ---------- mulai ---------- */
render();
