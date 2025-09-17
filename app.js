// Colo Demo App (no backend) — by BitBlueAI
const DEMO_USER = { cpf: "02199151646", senha: "123456" }; // ajuste aqui

// Helpers
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));
const fmtDate = (d) => d.toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'numeric' });
const fmtTime = (d) => d.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });
const pad = (n) => String(n).padStart(2,'0');

function toast(msg) {
  const el = $('#toast'); if (!el) return;
  el.textContent = msg; el.classList.add('show');
  setTimeout(()=> el.classList.remove('show'), 2500);
}

function requireAuth() {
  if (!localStorage.getItem('colo_session')) {
    location.href = 'index.html';
  }
}

function saveSession(data) {
  localStorage.setItem('colo_session', JSON.stringify(data));
}
function getSession() {
  const raw = localStorage.getItem('colo_session'); 
  try { return raw ? JSON.parse(raw) : null } catch { return null }
}
function logout() {
  localStorage.removeItem('colo_session');
  location.href = 'index.html';
}

// Login page logic
(function loginBoot() {
  const form = document.getElementById('login-form');
  if (!form) return;

  const showBtn = $('.showpass', form);
  showBtn.addEventListener('click', () => {
    const pwd = $('#senha', form);
    pwd.type = pwd.type === 'password' ? 'text' : 'password';
    pwd.focus();
  });

  $('#year').textContent = new Date().getFullYear();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cpf = $('#cpf').value.replace(/\D/g,'');
    const senha = $('#senha').value;
    if (cpf === DEMO_USER.cpf && senha === DEMO_USER.senha) {
      saveSession({ cpf, nome: COLO_DATA.gestante.nome });
      location.href = 'dashboard.html';
    } else {
      toast('CPF ou senha inválidos');
    }
  });
})();

// Dashboard logic
(function appBoot() {
  if (!document.body.classList.contains('app-body')) return;
  requireAuth();
  const session = getSession();

  // Sidebar toggle
  const sidebar = document.getElementById('sidebar');
  $('#toggleSidebar').addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  // Menu navigation
  $$('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const s = item.dataset.section;
      if (!s) return;
      e.preventDefault();
      $$('.menu-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      $$('.section').forEach(sec => sec.classList.remove('visible'));
      document.getElementById(s).classList.add('visible');
      if (s === 'calendario') renderCalendar(currentMonth); 
    });
  });

  // Header data
  const G = COLO_DATA.gestante;
  $('#nomeGestante').textContent = G.nome;
  $('#semana').textContent = G.semana;
  $('#dia').textContent = G.dia;
  $('#nomeHome').textContent = G.nome;
  $('#avatar').src = G.avatar;
  $('#year').textContent = new Date().getFullYear();

  // Orientação do dia (simples)
  const dicas = [
    'Hidrate-se bem hoje. Tente beber ao menos 8 copos de água.',
    'Faça uma caminhadinha leve de 15 minutos.',
    'Inclua frutas ricas em vitamina C.',
    'Reserve um momento de descanso ao longo do dia.',
  ];
  $('#orientacaoDia').textContent = dicas[new Date().getDay() % dicas.length];

  // Próxima consulta
  const consultas = COLO_DATA.consultas.map(c => ({...c, d: new Date(c.data)}));
  const futura = consultas.filter(c => c.d >= new Date()).sort((a,b)=> a.d-b.d)[0];
  if (futura) {
    $('#proxConsulta').textContent = fmtDate(futura.d) + ' às ' + fmtTime(futura.d);
    $('#proxConsultaLocal').textContent = futura.local + ' • ' + futura.tipo.toUpperCase();
  }

  // Alertas
  const al = $('#alertas');
  COLO_DATA.alertas.forEach(a => {
    const li = document.createElement('li');
    li.textContent = a;
    al.appendChild(li);
  });

  // Carousel
  const carousel = document.getElementById('heroCarousel');
  const slides = $('.slides', carousel);
  const dots = $('.dots', carousel);
  let idx = 0;
  const total = slides.children.length;
  for (let i=0;i<total;i++) { 
    const b = document.createElement('button'); 
    if (i===0) b.classList.add('active'); 
    b.addEventListener('click', ()=> go(i)); 
    dots.appendChild(b);
  }
  function go(i){ idx = i; slides.style.transform = 'translateX(' + (-i*100) + '%)'; 
    $$('.dots button', carousel).forEach((d,k)=> d.classList.toggle('active', k===i)); }
  setInterval(()=> go((idx+1)%total), 4000);

  // Calendar
  const calendarGrid = $('#calendarGrid');
  const eventList = $('#eventList');
  let currentMonth = new Date(); currentMonth.setDate(1);
  $('#prevMonth').addEventListener('click', ()=> { currentMonth.setMonth(currentMonth.getMonth()-1); renderCalendar(currentMonth); });
  $('#nextMonth').addEventListener('click', ()=> { currentMonth.setMonth(currentMonth.getMonth()+1); renderCalendar(currentMonth); });

  function renderCalendar(ref) {
    $('#monthLabel').textContent = ref.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
    calendarGrid.innerHTML = '';
    const dow = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    dow.forEach(d => {
      const c = document.createElement('div'); c.className='cell header'; c.textContent = d; calendarGrid.appendChild(c);
    });
    const firstDay = (new Date(ref.getFullYear(), ref.getMonth(), 1)).getDay();
    const daysInMonth = new Date(ref.getFullYear(), ref.getMonth()+1, 0).getDate();
    for (let i=0;i<firstDay;i++) calendarGrid.appendChild(document.createElement('div')).className='cell';
    const evs = consultas;
    for (let day=1; day<=daysInMonth; day++) {
      const cell = document.createElement('div'); cell.className='cell';
      const label = document.createElement('div'); label.style.fontWeight='700'; label.textContent = day; cell.appendChild(label);
      const dayDate = new Date(ref.getFullYear(), ref.getMonth(), day);
      evs.filter(e => e.d.getFullYear()===dayDate.getFullYear() && e.d.getMonth()===dayDate.getMonth() && e.d.getDate()===dayDate.getDate())
         .forEach(e => {
            const kind = mapKind(e.tipo);
            const b = document.createElement('span'); b.className = 'badge ' + kind; b.textContent = shortKind(e.tipo); cell.appendChild(b);
         });
      calendarGrid.appendChild(cell);
    }
    // Event list
    eventList.innerHTML='';
    evs.filter(e => e.d.getMonth()===ref.getMonth() && e.d.getFullYear()===ref.getFullYear())
       .sort((a,b)=>a.d-b.d)
       .forEach(e => {
          const el = document.createElement('div'); el.className='event';
          el.innerHTML = '<div><strong>' + e.tipo.toUpperCase() + '</strong><div class="meta">' + fmtDate(e.d) + ' • ' + fmtTime(e.d) + '</div></div><div>' + e.local + '</div>';
          eventList.appendChild(el);
       });
  }
  function mapKind(tipo) {
    return ({
      'pré-natal':'prenatal', 'ultrassom':'ultrasound', 'vacina':'vaccine', 'puericultura':'pueric', 'exame':'exam'
    })[tipo] || 'prenatal';
  }
  function shortKind(tipo) {
    return ({
      'pré-natal':'PN', 'ultrassom':'USG', 'vacina':'VAC', 'puericultura':'PUE', 'exame':'EX'
    })[tipo] || tipo;
  }

  // Educação
  const edu = COLO_DATA.educacao.filter(c => c.semana === G.semana);
  $('#semanaEdu').textContent = G.semana;
  const grid = $('#eduGrid');
  edu.forEach(c => {
    const card = document.createElement('article'); card.className='edu-card';
    card.innerHTML = '<img src="' + c.img + '" alt="' + c.titulo + '"><div class="body"><span class="tag">' + c.tag + '</span><h4>' + c.titulo + '</h4><p class="muted">' + c.texto + '</p><button class="btn-outline">Assistir</button></div>';
    grid.appendChild(card);
  });

  // Sintomas (demo feed)
  const feed = $('#sintomasFeed');
  const stored = JSON.parse(localStorage.getItem('colo_sintomas') || '[]');
  stored.forEach(addItem);
  $('#formSintomas').addEventListener('submit', (e)=>{
    e.preventDefault();
    const desc = $('#descSintoma').value.trim();
    const g = $('#gravidade').value;
    if (!desc) return;
    const now = new Date();
    const item = { desc, g, at: now.toISOString() };
    const arr = JSON.parse(localStorage.getItem('colo_sintomas') || '[]'); arr.unshift(item);
    localStorage.setItem('colo_sintomas', JSON.stringify(arr));
    addItem(item);
    e.target.reset();
    toast('Sintoma enviado à UBS');
  });
  function addItem(item) {
    const el = document.createElement('div');
    el.className='item';
    const when = new Date(item.at);
    el.innerHTML = '<div class="meta">' + fmtDate(when) + ' às ' + fmtTime(when) + ' — ' + item.g + '</div><div>' + item.desc + '</div>';
    feed.prepend(el);
  }

  // Configurações
  $('#fotoUrl').value = G.avatar;
  $('#saveConfig').addEventListener('click', ()=>{
    const url = $('#fotoUrl').value.trim();
    if (url) $('#avatar').src = url;
    toast('Configurações salvas');
  });

  // Notifications (simuladas)
  const toggle = $('#notifToggle');
  const saved = localStorage.getItem('colo_notif') === '1';
  toggle.checked = saved;
  toggle.addEventListener('change', ()=>{
    const on = toggle.checked;
    localStorage.setItem('colo_notif', on ? '1' : '0');
    toast(on ? 'Notificações ativadas' : 'Notificações desativadas');
    if (on) demoNotifications();
  });
  if (saved) demoNotifications();

  function demoNotifications(){
    setTimeout(()=> toast('Lembrete: sua consulta é amanhã às 14h'), 2000);
    setTimeout(()=> toast('Hidratação: beba um copo d\'água agora 💧'), 6000);
  }

  // Logout
  $('#logoutBtn').addEventListener('click', logout);
})();
