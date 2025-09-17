document.addEventListener('DOMContentLoaded', () => {
    // Verificação de dependência
    if (typeof COLO_DATA === 'undefined') {
        console.error("O arquivo data.js não foi carregado ou não contém o objeto COLO_DATA.");
        alert("Erro crítico: os dados da aplicação não foram encontrados. Verifique o console.");
        return;
    }

    // Preenche dados básicos do usuário no header
    const G = COLO_DATA.gestante;
    const nomeGestanteEl = document.getElementById('nomeGestante');
    const avatarEl = document.getElementById('avatar');
    if (nomeGestanteEl) nomeGestanteEl.textContent = G.nome;
    if (avatarEl) avatarEl.src = G.avatar;
    
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // Pega o ID do artigo da URL
    const params = new URLSearchParams(window.location.search);
    const publicationId = params.get('id');

    if (publicationId) {
        // Encontra o artigo correspondente no COLO_DATA
        const article = COLO_DATA.educacao.find(item => item.id === publicationId);

        if (article) {
            // Preenche a página com os dados do artigo
            const titleEl = document.getElementById('publication-title');
            const textEl = document.getElementById('publication-text');
            const imageEl = document.getElementById('publication-image');

            if (titleEl) titleEl.textContent = article.titulo;
            if (textEl) textEl.textContent = article.textoCompleto || article.texto; // Usa textoCompleto se existir
            if (imageEl) {
                imageEl.src = article.img;
                imageEl.alt = article.titulo;
            }
            // Atualiza o título da página
            document.title = `${article.titulo} — Colo App`;
        } else {
            // Artigo não encontrado
            handleArticleNotFound();
        }
    } else {
        // ID não fornecido na URL
        handleArticleNotFound();
    }
});

function handleArticleNotFound() {
    const mainContent = document.getElementById('main-publication');
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="publication-card" style="text-align: center; padding: 3rem;">
                <h1>Artigo não encontrado</h1>
                <p>O conteúdo que você está procurando não existe ou foi movido.</p>
                <a href="index.html" class="btn-primary" style="margin-top: 1rem; display: inline-block;">Voltar para o início</a>
            </div>
        `;
    }
}
