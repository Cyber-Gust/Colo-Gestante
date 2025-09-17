// Colo Demo App (no backend) — by BitBlueAI
// Versão Refatorada para melhor organização e funcionalidade

document.addEventListener('DOMContentLoaded', () => {
  // Verifica se estamos na página do app. Se não houver o body .app-body, o script não roda.
  if (!document.body.classList.contains('app-body')) return;

  // Verificação de dependência: COLO_DATA deve existir
  if (typeof COLO_DATA === 'undefined') {
    console.error("O arquivo data.js não foi carregado ou não contém o objeto COLO_DATA.");
    alert("Erro crítico: os dados da aplicação não foram encontrados. Verifique o console.");
    return;
  }
  
  const App = {
    // --- ELEMENTOS DO DOM ---
    elements: {
      sidebar: document.getElementById('sidebar'),
      mainContent: document.getElementById('main'),
      // Adicione outros elementos frequentemente usados aqui
    },

    // --- ESTADO DA APLICAÇÃO ---
    state: {
      consultas: COLO_DATA.consultas.map(c => ({ ...c, d: new Date(c.data) })),
      currentMonth: new Date(),
    },

    // --- FUNÇÕES HELPER ---
    utils: {
      $: (s, el = document) => el.querySelector(s),
      $$: (s, el = document) => Array.from(el.querySelectorAll(s)),
      fmtDate: (d) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      fmtTime: (d) => d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      toast: (msg) => {
        const el = App.utils.$('#toast');
        if (!el) return;
        el.textContent = msg;
        el.classList.add('show');
        setTimeout(() => el.classList.remove('show'), 3000);
      }
    },

    // --- MÓDULOS DE RENDERIZAÇÃO ---
    render: {
      // Preenche os dados do cabeçalho e rodapé
      headerAndFooter() {
        const { $ } = App.utils;
        const G = COLO_DATA.gestante;
        $('#nomeGestante').textContent = G.nome;
        $('#semana').textContent = G.semana;
        $('#dia').textContent = G.dia;
        $('#avatar').src = G.avatar;
        $('#year').textContent = new Date().getFullYear();
      },

      // Renderiza a página inicial
      home() {
        const { $ } = App.utils;
        const G = COLO_DATA.gestante;
        $('#nomeHome').textContent = G.nome.split(' ')[0];

        const dicas = [
          'Hidrate-se bem hoje. Tente beber ao menos 8 copos de água.',
          'Faça uma caminhadinha leve de 15 minutos.',
          'Inclua frutas ricas em vitamina C na sua dieta.',
          'Reserve um momento de descanso ao longo do dia.',
          'Lembre-se de tomar seus suplementos, se prescrito.',
          'Uma boa noite de sono é fundamental para você e o bebê.',
          'Converse com seu bebê, ele já pode ouvir sua voz.',
        ];
        $('#orientacaoDia').textContent = dicas[new Date().getDay() % dicas.length];

        const futura = App.state.consultas
          .filter(c => c.d >= new Date())
          .sort((a, b) => a.d - b.d)[0];
        if (futura) {
          $('#proxConsulta').textContent = `${App.utils.fmtDate(futura.d)} às ${App.utils.fmtTime(futura.d)}`;
          $('#proxConsultaLocal').textContent = `${futura.local} • ${futura.tipo.toUpperCase()}`;
        }

        const al = $('#alertas');
        al.innerHTML = ''; // Limpa antes de adicionar
        COLO_DATA.alertas.forEach(a => {
          const li = document.createElement('li');
          // Adiciona ícone SVG para um visual mais profissional
          li.innerHTML = `<span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></span> ${a}`;
          al.appendChild(li);
        });
      },

      // Renderiza o carrossel da página inicial
      carousel() {
        const { $, $$ } = App.utils;
        const carousel = $('#heroCarousel');
        if (!carousel) return;
        const slides = $('.slides', carousel);
        const dots = $('.dots', carousel);
        dots.innerHTML = ''; // Limpar dots para evitar duplicação

        let idx = 0;
        const total = slides.children.length;
        if (total === 0) return;

        for (let i = 0; i < total; i++) {
          const b = document.createElement('button');
          if (i === 0) b.classList.add('active');
          b.addEventListener('click', () => go(i));
          dots.appendChild(b);
        }

        function go(i) {
          idx = i;
          slides.style.transform = `translateX(${-i * 100}%)`;
          $$('.dots button', carousel).forEach((d, k) => d.classList.toggle('active', k === i));
        }

        // Limpa intervalo anterior se a função for chamada novamente
        if (carousel.dataset.intervalId) clearInterval(carousel.dataset.intervalId);
        const intervalId = setInterval(() => go((idx + 1) % total), 4000);
        carousel.dataset.intervalId = intervalId;
      },
      
      // Renderiza a seção de Educação
      educacao() {
        const { $ } = App.utils;
        const G = COLO_DATA.gestante;
        const edu = COLO_DATA.educacao.filter(c => c.semana === G.semana);
        $('#semanaEdu').textContent = G.semana;
        const grid = $('#eduGrid');
        grid.innerHTML = '';
        edu.forEach(c => {
          const card = document.createElement('article');
          card.className = 'edu-card';
          // MODIFICADO: Botão agora é um link para a página de publicação
          card.innerHTML = `
            <img src="${c.img}" alt="${c.titulo}">
            <div class="body">
              <span class="tag">${c.tag}</span>
              <h4>${c.titulo}</h4>
              <p class="muted">${c.texto}</p>
              <a href="publicacao.html?id=${c.id}" class="btn-outline">Saiba mais</a>
            </div>`;
          grid.appendChild(card);
        });
      },
      
      // Renderiza o feed de sintomas
      sintomas() {
        const { $ } = App.utils;
        const feed = $('#sintomasFeed');
        feed.innerHTML = '';
        const stored = JSON.parse(localStorage.getItem('colo_sintomas') || '[]');
        stored.forEach(item => App.events.addSintomaToFeed(item, false));
      }
    },
    
    // --- MÓDULO DE EVENTOS E AÇÕES ---
    events: {
        // Navega para uma seção específica
        navigateTo(sectionId) {
            const { $, $$ } = App.utils;
            if (!sectionId) return;

            const targetSection = $(`#${sectionId}`);
            if (!targetSection) return;

            $$('.section').forEach(sec => sec.classList.remove('visible'));
            targetSection.classList.add('visible');

            $$('.menu-item').forEach(i => i.classList.remove('active'));
            const menuItem = $(`.menu-item[data-section="${sectionId}"]`);
            if (menuItem) menuItem.classList.add('active');

            // Recarrega o calendário se a seção for a de calendário
            if (sectionId === 'calendario') {
                Calendar.render(App.state.currentMonth);
            }
        },

        // Adiciona um item ao feed de sintomas
        addSintomaToFeed(item, prepend = true) {
            const { $ } = App.utils;
            const feed = $('#sintomasFeed');
            const el = document.createElement('div');
            el.className = 'item';
            const when = new Date(item.at);
            el.innerHTML = `
                <div class="meta">${App.utils.fmtDate(when)} às ${App.utils.fmtTime(when)} — ${item.g}</div>
                <div>${item.desc}</div>`;
            if (prepend) {
                feed.prepend(el);
            } else {
                feed.appendChild(el);
            }
        },

        // Configura todos os event listeners da aplicação
        setupListeners() {
            const { $$, $ } = App.utils;

            // Toggle da Sidebar
            $('#toggleSidebar').addEventListener('click', () => {
                App.elements.sidebar.classList.toggle('collapsed');
            });

            // Delegação de eventos para navegação (menu e botões de ação rápida)
            document.body.addEventListener('click', (e) => {
                const navElement = e.target.closest('[data-section]');
                if (navElement) {
                    // Impede o comportamento padrão apenas se não for um link real
                    if (navElement.tagName !== 'A') {
                       e.preventDefault();
                    }
                    App.events.navigateTo(navElement.dataset.section);
                }
            });

            // Logout
            $('#logoutBtn').addEventListener('click', () => {
                if (confirm("Tem certeza que deseja sair?")) {
                    // Simula logout limpando o "local storage" e recarregando
                    localStorage.clear();
                    App.utils.toast("Sessão encerrada.");
                    setTimeout(() => location.reload(), 1000);
                }
            });

            // Formulário de Sintomas
            $('#formSintomas').addEventListener('submit', (e) => {
                e.preventDefault();
                const desc = $('#descSintoma').value.trim();
                const g = $('#gravidade').value;
                if (!desc) return;

                const item = { desc, g, at: new Date().toISOString() };
                const arr = JSON.parse(localStorage.getItem('colo_sintomas') || '[]');
                arr.unshift(item);
                localStorage.setItem('colo_sintomas', JSON.stringify(arr));

                App.events.addSintomaToFeed(item, true);
                e.target.reset();
                App.utils.toast('Sintoma enviado à UBS');
            });

            // Configurações
            $('#saveConfig').addEventListener('click', () => {
                const url = $('#fotoUrl').value.trim();
                if (url) {
                    $('#avatar').src = url;
                    // Idealmente, salvaria isso no COLO_DATA ou localStorage
                }
                App.utils.toast('Configurações salvas');
            });
            
            // Toggle de notificações
            const notifToggle = $('#notifToggle');
            notifToggle.checked = localStorage.getItem('colo_notif') === '1';
            notifToggle.addEventListener('change', () => {
                const on = notifToggle.checked;
                localStorage.setItem('colo_notif', on ? '1' : '0');
                App.utils.toast(on ? 'Notificações ativadas' : 'Notificações desativadas');
            });
        }
    },
    
    // --- FUNÇÃO DE INICIALIZAÇÃO ---
    init() {
      this.render.headerAndFooter();
      this.render.home();
      this.render.carousel();
      this.render.educacao();
      this.render.sintomas();
      this.events.setupListeners();
      Calendar.init(); // Inicializa o módulo do calendário

      this.utils.toast(`Bem-vinda, ${COLO_DATA.gestante.nome.split(' ')[0]}!`);
    }
  };
  
  // --- MÓDULO DO CALENDÁRIO (separado para organização) ---
  const Calendar = {
      elements: {
          grid: App.utils.$('#calendarGrid'),
          eventList: App.utils.$('#eventList'),
          monthLabel: App.utils.$('#monthLabel'),
      },

      mapKind: (tipo) => ({
          'pré-natal': 'prenatal', 'ultrassom': 'ultrasound', 'vacina': 'vaccine', 'puericultura': 'pueric', 'exame': 'exam'
      })[tipo] || 'prenatal',
      
      shortKind: (tipo) => ({
          'pré-natal': 'PN', 'ultrassom': 'USG', 'vacina': 'VAC', 'puericultura': 'PUE', 'exame': 'EX'
      })[tipo] || tipo,

      render(refDate) {
          this.elements.monthLabel.textContent = refDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
          this.elements.grid.innerHTML = '';
          
          const dow = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
          dow.forEach(d => {
              const c = document.createElement('div');
              c.className = 'cell header';
              c.textContent = d;
              this.elements.grid.appendChild(c);
          });

          const year = refDate.getFullYear();
          const month = refDate.getMonth();
          const firstDay = new Date(year, month, 1).getDay();
          const daysInMonth = new Date(year, month + 1, 0).getDate();

          for (let i = 0; i < firstDay; i++) {
              const cell = document.createElement('div');
              cell.className = 'cell';
              this.elements.grid.appendChild(cell);
          }
          
          for (let day = 1; day <= daysInMonth; day++) {
              const cell = document.createElement('div');
              cell.className = 'cell';
              const label = document.createElement('div');
              label.style.fontWeight = '700';
              label.textContent = day;
              cell.appendChild(label);
              
              const dayDate = new Date(year, month, day);
              App.state.consultas
                  .filter(e => e.d.toDateString() === dayDate.toDateString())
                  .forEach(e => {
                      const kind = this.mapKind(e.tipo);
                      const b = document.createElement('span');
                      b.className = `badge ${kind}`;
                      b.textContent = this.shortKind(e.tipo);
                      cell.appendChild(b);
                  });
              this.elements.grid.appendChild(cell);
          }
          
          this.renderEventList(refDate);
      },

      renderEventList(refDate) {
          this.elements.eventList.innerHTML = '';
          App.state.consultas
              .filter(e => e.d.getMonth() === refDate.getMonth() && e.d.getFullYear() === refDate.getFullYear())
              .sort((a, b) => a.d - b.d)
              .forEach(e => {
                  const el = document.createElement('div');
                  el.className = 'event';
                  el.innerHTML = `
                      <div>
                          <strong>${e.tipo.toUpperCase()}</strong>
                          <div class="meta">${App.utils.fmtDate(e.d)} • ${App.utils.fmtTime(e.d)}</div>
                      </div>
                      <div>${e.local}</div>`;
                  this.elements.eventList.appendChild(el);
              });
      },

      init() {
          App.utils.$('#prevMonth').addEventListener('click', () => {
              App.state.currentMonth.setMonth(App.state.currentMonth.getMonth() - 1);
              this.render(App.state.currentMonth);
          });
          App.utils.$('#nextMonth').addEventListener('click', () => {
              App.state.currentMonth.setMonth(App.state.currentMonth.getMonth() + 1);
              this.render(App.state.currentMonth);
          });
          // Renderiza o calendário inicial ao carregar a página
          this.render(App.state.currentMonth);
      }
  };

  // Inicia a aplicação
  App.init();
});