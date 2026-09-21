const state={view:'dashboard', group:'Banin', students:[], selected:null, tab:'Pencapaian', modal:false};
const defaultStudents=[
 {id:1,nama:'Ahmad',gender:'Laki-laki',wali:'Bapak Ahmad',wa:'081234567890',group:'Banin',level:'Faturrahman',page:'24',line:'1–4'},
 {id:2,nama:'Budi',gender:'Laki-laki',wali:'Ibu Budi',wa:'081234567891',group:'Banin',level:'Al-Bayan',page:'18',line:'1–3'},
 {id:3,nama:'Siti',gender:'Perempuan',wali:'Ibu Siti',wa:'081234567892',group:'Banat',level:'Al-Qur\'an',page:'604',line:'1–5'},
 {id:4,nama:'Fajar',gender:'Laki-laki',wali:'Bapak Fajar',wa:'081234567893',group:'Private',level:'Faturrahman',page:'12',line:'1–3'}
];
state.students=JSON.parse(localStorage.getItem('ngaji_students')||'null')||defaultStudents;
const save=()=>localStorage.setItem('ngaji_students',JSON.stringify(state.students));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const groups=['Banin','Banat','Private'];
const tabs=['Pencapaian','Adab','Ranking','Bintang','Kehadiran','Tracker','Tajwid','Faturrahman','Al-Bayan',"Al-Qur'an",'Hafalan Qur\'an','Hafalan Doa','Hafalan Hadis'];

function render(){
 const app=document.querySelector('#app');
 app.innerHTML=`<div class="app">${header()}<main class="content">${page()}</main>${bottom()}${state.modal?modal():''}</div>`;
 bind();
}
function header(){return `<header class="top"><h1>Ngaji Tracker</h1><p>Kelola perkembangan santri secara rapi dan berkelanjutan</p></header>`}
function page(){
 if(state.view==='dashboard')return dashboard();
 if(['Banin','Banat','Private'].includes(state.view))return groupPage(state.view);
 if(state.view==='Raport')return reportPage();
 return settingPage();
}
function dashboard(){
 const count=g=>state.students.filter(s=>s.group===g).length;
 return `<div class="grid">
  <div class="card stat"><b>${state.students.length}</b><span>Total Santri</span></div>
  <div class="card stat"><b>${count('Banin')}</b><span>Banin</span></div>
  <div class="card stat"><b>${count('Banat')}</b><span>Banat</span></div>
  <div class="card stat"><b>${count('Private')}</b><span>Private</span></div>
 </div>
 <div class="section">Informasi Hari Ini</div>
 <div class="card list">
  <div class="between"><span>Kehadiran</span><span class="pill">Belum ada sesi</span></div>
  <div class="between"><span>Pencapaian terbaru</span><span class="pill">0</span></div>
  <div class="between"><span>Jadwal</span><span class="pill">Atur di Setting</span></div>
 </div>
 <div class="section">Ringkasan</div>
 <div class="card"><p class="muted">Dashboard hanya menampilkan informasi dan ringkasan. Proses pembelajaran dimulai dari Banin, Banat, atau Private.</p></div>`;
}
function groupPage(group){
 const list=state.students.filter(s=>s.group===group);
 return `<div class="between"><div><h2>${group}</h2><div class="muted">${list.length} santri</div></div><button class="btn" data-add>+ Tambah</button></div>
 <div class="row" style="margin:12px 0"><button class="btn secondary" data-start="${group}">Mulai Pembelajaran</button></div>
 <div class="list">${list.length?list.map(s=>`<div class="card student" data-student="${s.id}"><div><strong>${esc(s.nama)}</strong><div class="muted">${esc(s.level)} • Hal. ${esc(s.page)} • Baris ${esc(s.line)}</div></div><span class="pill">Profil ›</span></div>`).join(''):'<div class="card empty">Belum ada santri di kelompok ini.</div>'}</div>`;
}
function profile(s){
 return `<div class="between"><div><button class="btn secondary" data-back>‹ Kembali</button><h2 style="margin-top:12px">${esc(s.nama)}</h2><div class="muted">${s.group} • ${esc(s.level)}</div></div><button class="btn secondary" data-edit="${s.id}">Edit</button></div>
 <div class="card" style="margin-top:12px"><div class="grid"><div><div class="muted">Wali</div><b>${esc(s.wali)}</b></div><div><div class="muted">WhatsApp</div><b>${esc(s.wa)}</b></div><div><div class="muted">Posisi</div><b>Hal. ${esc(s.page)}</b></div><div><div class="muted">Baris</div><b>${esc(s.line)}</b></div></div></div>
 <div class="tabs">${tabs.map(t=>`<button class="tab ${state.tab===t?'active':''}" data-tab="${esc(t)}">${esc(t)}</button>`).join('')}</div>
 <div class="card">${tabContent(s,state.tab)}</div>`;
}
function tabContent(s,t){
 if(t==='Pencapaian'||t==='Tracker'||t==='Faturrahman'||t==='Al-Bayan'||t==="Al-Qur'an"){
  const level=(t==='Pencapaian'||t==='Tracker')?s.level:t;
  if(t!=='Pencapaian'&&t!=='Tracker'&&t!==s.level)return `<div class="empty">Belum ada data ${esc(t)} untuk santri ini.</div>`;
  return `<h3>${esc(level)}</h3><div class="timeline">
   <div class="item"><b>19 Sep 2026</b><div class="muted">Halaman ${esc(s.page)} • Baris ${esc(s.line)}</div><div>Hasil: Baik</div><div class="muted">Koreksi: makhraj dan panjang pendek</div></div>
   <div class="item"><b>17 Sep 2026</b><div class="muted">Halaman ${Math.max(1,+s.page-1)} • Baris 1–4</div><div>Hasil: Baik</div></div>
  </div><div class="card" style="background:#f7faf9"><b>Target berikutnya</b><div class="muted">Halaman ${+s.page+1} • Baris 1–4</div></div>`;
 }
 if(t==='Kehadiran')return `<h3>Kehadiran</h3><div class="grid"><div class="card stat"><b>0</b><span>Hadir</span></div><div class="card stat"><b>0</b><span>Izin</span></div><div class="card stat"><b>0</b><span>Sakit</span></div><div class="card stat"><b>0</b><span>Alpa</span></div></div>`;
 if(t==='Adab')return `<h3>Adab</h3><div class="list">${['Adab kepada Al-Qur\'an','Kepada ustadz','Kepada teman','Disiplin','Kebersihan','Kemandirian','Tanggung jawab','Semangat'].map(x=>`<div class="between"><span>${x}</span><span class="pill">Belum dinilai</span></div>`).join('')}</div>`;
 if(t==='Ranking')return `<h3>Ranking</h3><div class="empty">Riwayat ranking akan terisi dari penilaian periode.</div>`;
 if(t==='Bintang')return `<h3>Bintang</h3><div style="font-size:30px">0</div><div class="muted">Belum ada bintang.</div>`;
 if(t==='Tajwid')return `<h3>Tajwid</h3><div class="empty">Belum ada penilaian tajwid.</div>`;
 return `<h3>${esc(t)}</h3><div class="empty">Belum ada data. Data akan muncul ketika santri mulai mengambil ${esc(t)}.</div>`;
}
function reportPage(){return `<h2>Raport</h2><div class="card"><p class="muted">Pilih santri untuk membuat draft raport berdasarkan data pembelajaran, kehadiran, adab, tajwid, hafalan, pencapaian, dan tracker.</p><div class="list">${state.students.map(s=>`<button class="btn secondary" data-report="${s.id}" style="text-align:left">${esc(s.nama)} — ${esc(s.level)}</button>`).join('')}</div></div>`}
function settingPage(){return `<h2>Setting</h2><div class="list"><div class="card"><b>Identitas TPQ</b><p class="muted">Nama lembaga, alamat, kepala TPQ untuk header raport.</p></div><div class="card"><b>Jadwal & Libur</b><p class="muted">Atur jadwal pembelajaran dan pesan libur.</p></div><div class="card"><b>Template WhatsApp</b><p class="muted">Atur pesan dan variabel {{nama}}, {{tanggal}}, {{kitab}}.</p></div><div class="card"><b>Backup & Restore</b><p class="muted">Ekspor dan impor seluruh data.</p></div><div class="card"><b>Info Aplikasi</b><p class="muted">Ngaji Tracker v0.1.0</p></div></div>`}
function bottom(){const items=['Dashboard','Banin','Banat','Private','Raport','Setting'];return `<nav class="bottom"><div class="nav">${items.map(x=>`<button class="${state.view===x?'active':''}" data-nav="${x}">${x}</button>`).join('')}</div></nav>`}
function modal(){
 const s=state.selected;
 if(s&&state.modal==='profile')return `<div class="modal"><div class="sheet">${profile(s)}</div></div>`;
 if(state.modal==='add'||state.modal==='edit'){
  const e=s||{}; return `<div class="modal"><div class="sheet"><button class="close" data-close>×</button><h2>${state.modal==='add'?'Tambah Santri':'Edit Santri'}</h2><form class="form" data-form>
  <label>Nama anak<input name="nama" required value="${esc(e.nama)}"></label>
  <label>Jenis kelamin<select name="gender"><option ${e.gender==='Laki-laki'?'selected':''}>Laki-laki</option><option ${e.gender==='Perempuan'?'selected':''}>Perempuan</option></select></label>
  <label>Nama wali<input name="wali" value="${esc(e.wali)}"></label>
  <label>No. WhatsApp wali<input name="wa" value="${esc(e.wa)}"></label>
  <label>Kelompok<select name="group">${groups.map(g=>`<option ${e.group===g?'selected':''}>${g}</option>`).join('')}</select></label>
  <label>Jenjang awal<select name="level">${['Faturrahman','Al-Bayan',"Al-Qur'an",'Fashiatul Huruf'].map(g=>`<option ${e.level===g?'selected':''}>${g}</option>`).join('')}</select></label>
  <label>Halaman awal<input name="page" value="${esc(e.page||'1')}"></label>
  <label>Baris awal<input name="line" value="${esc(e.line||'1–3')}"></label>
  <button class="btn" type="submit">Simpan</button></form></div></div>`;
 }
 return '';
}
function bind(){
 document.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>{state.view=b.dataset.nav;state.selected=null;render()});
 document.querySelectorAll('[data-student]').forEach(b=>b.onclick=()=>{state.selected=state.students.find(s=>s.id==b.dataset.student);state.tab='Pencapaian';state.modal='profile';render()});
 document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{state.modal='add';state.selected=null;render()});
 document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{state.modal='edit';render()});
 document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>{state.modal=false;render()});
 document.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>{state.modal=false;render()});
 document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{state.tab=b.dataset.tab;render()});
 document.querySelectorAll('[data-start]').forEach(b=>b.onclick=()=>alert('Alur Mulai Pembelajaran akan dibuat pada modul sesi pembelajaran untuk kelompok '+b.dataset.start+'.'));
 document.querySelectorAll('[data-report]').forEach(b=>b.onclick=()=>alert('Draft raport untuk '+state.students.find(s=>s.id==b.dataset.report).nama+' akan dibuat dari data periode terpilih.'));
 const f=document.querySelector('[data-form]'); if(f)f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));if(state.modal==='add'){d.id=Date.now();state.students.push(d)}else Object.assign(state.selected,d);save();state.modal=false;render()};
}
render();