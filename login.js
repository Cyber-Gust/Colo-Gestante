document.addEventListener('DOMContentLoaded', () => {
    // Se o usuário já tem uma sessão, redireciona para o painel principal
    if (localStorage.getItem('colo_session')) {
        window.location.href = 'dashboard.html'; // <-- MUDANÇA AQUI
        return;
    }

    // Dados de login para a demonstração.
    const DEMO_USER = { cpf: "02199151646", sus: "123456" };

    const $ = (s) => document.querySelector(s);
    
    // Função para mostrar notificações na tela
    function toast(msg) {
        const el = $('#toast');
        if (!el) return;
        el.textContent = msg;
        el.classList.add('show');
        setTimeout(() => el.classList.remove('show'), 3000);
    }

    const loginForm = $('#login-form');
    if (loginForm) {
        // Preenche o ano no rodapé
        const yearEl = $('#year');
        if(yearEl) yearEl.textContent = new Date().getFullYear();

        // Funcionalidade do botão "mostrar senha"
        const showPassBtn = $('.showpass');
        if (showPassBtn) {
            showPassBtn.addEventListener('click', () => {
                const senhaInput = $('#senha');
                senhaInput.type = senhaInput.type === 'password' ? 'text' : 'password';
            });
        }
        
        // Lógica de submissão do formulário
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cpf = $('#cpf').value.replace(/\D/g, '');
            const sus = $('#senha').value;

            if (cpf === DEMO_USER.cpf && sus === DEMO_USER.sus) {
                // Simula a criação de uma sessão
                const session = {
                    loggedIn: true,
                    user: COLO_DATA.gestante.nome,
                    loginTime: new Date().toISOString()
                };
                localStorage.setItem('colo_session', JSON.stringify(session));
                toast('Login realizado com sucesso! Redirecionando...');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html'; // <-- E MUDANÇA AQUI
                }, 1500);
            } else {
                toast('CPF ou Nº SUS inválidos. Tente novamente.');
            }
        });
    }
});