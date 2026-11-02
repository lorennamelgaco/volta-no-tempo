
/* =========================================
   ESTRELAS DO CÉU
========================================= */

const ceu = document.querySelector('.ceu-estrelado');
const movimentoReduzido = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
).matches;

if (ceu && !movimentoReduzido) {
    for (let i = 0; i < 150; i++) {
        const estrela = document.createElement('span');
        estrela.classList.add('estrela');

        estrela.style.left = Math.random() * 100 + '%';
        estrela.style.top = Math.random() * 100 + '%';
        estrela.style.setProperty(
            '--duracao',
            (2 + Math.random() * 5) + 's'
        );
        estrela.style.animationDelay = Math.random() * 5 + 's';

        const tamanho = Math.random() * 2 + 1;
        estrela.style.width = tamanho + 'px';
        estrela.style.height = tamanho + 'px';

        ceu.appendChild(estrela);
    }
}

/* =========================================
   ESTRELAS CADENTES
========================================= */

function criarEstrelaCadente() {
    if (!ceu || movimentoReduzido) return;

    const cadente = document.createElement('span');
    cadente.classList.add('estrela-cadente');

    cadente.style.left = (25 + Math.random() * 75) + '%';
    cadente.style.top = (Math.random() * 55) + '%';

    ceu.appendChild(cadente);

    setTimeout(() => {
        cadente.remove();
    }, 1600);
}

if (!movimentoReduzido) {
    setInterval(criarEstrelaCadente, 4500);
}

/* =========================================
   ANIMAÇÕES AO ROLAR A PÁGINA
========================================= */

const elementos = document.querySelectorAll(
    '.capitulo, .pagina-scrapbook, .foto-polaroid, ' +
    '.cartao-sonho, .cartao-musica, .carta-presente, .final'
);

if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.12
    });

    elementos.forEach((elemento) => {
        elemento.classList.add('revelar');
        observador.observe(elemento);
    });
} else {
    elementos.forEach((elemento) => {
        elemento.classList.add('visivel');
    });
}

/* =========================================
   MENU PARA CELULAR
========================================= */

const botaoMenu = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (botaoMenu && menu) {
    botaoMenu.addEventListener('click', () => {
        const menuAberto = menu.classList.toggle('aberto');

        botaoMenu.setAttribute('aria-expanded', String(menuAberto));
        botaoMenu.setAttribute(
            'aria-label',
            menuAberto ? 'Fechar menu' : 'Abrir menu'
        );
    });

    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            menu.classList.remove('aberto');

            botaoMenu.setAttribute('aria-expanded', 'false');
            botaoMenu.setAttribute('aria-label', 'Abrir menu');
        });
    });
}

/* =========================================
   TELA DE ENTRADA — COMEÇAR NOSSA HISTÓRIA
========================================= */

const telaEntrada = document.querySelector('#telaEntrada');
const botaoComecar = document.querySelector('#comecarHistoria');

if (telaEntrada && botaoComecar) {
    botaoComecar.addEventListener('click', () => {
        telaEntrada.classList.add('saindo');
        document.body.classList.remove('tela-bloqueada');

        window.setTimeout(() => {
            telaEntrada.remove();

            document.querySelector('#inicio')?.scrollIntoView({
                behavior: movimentoReduzido ? 'auto' : 'smooth'
            });
        }, movimentoReduzido ? 0 : 1000);
    });
}

/* O player é controlado pelo seletor inline definido no index.html. */


/* =========================================
   NAVEGAÇÃO SUAVE E CAPÍTULO ATIVO
========================================= */

const botaoAbrirHistoria = document.querySelector('#abrirNossaHistoria');
if (botaoAbrirHistoria) {
    botaoAbrirHistoria.addEventListener('click', () => {
        document.body.classList.remove('aguardando-historia');
    });
}

const linksInternos = document.querySelectorAll('a[href^="#"]');
linksInternos.forEach((link) => {
    link.addEventListener('click', (evento) => {
        const destino = document.querySelector(link.getAttribute('href'));
        if (!destino) return;
        evento.preventDefault();
        destino.scrollIntoView({
            behavior: movimentoReduzido ? 'auto' : 'smooth',
            block: 'start'
        });
    });
});

const secoesNavegacao = document.querySelectorAll(
    'main section[id], header#inicio'
);
const linksMenu = document.querySelectorAll('.menu a[href^="#"]');

if ('IntersectionObserver' in window && secoesNavegacao.length) {
    const observadorMenu = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            linksMenu.forEach((link) => {
                const ativo = link.getAttribute('href') === '#' + entrada.target.id;
                link.classList.toggle('ativo', ativo);
                if (ativo) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    secoesNavegacao.forEach((secao) => observadorMenu.observe(secao));
}

/* =========================================
   BOTÃO VOLTAR AO TOPO
========================================= */

const botaoVoltarTopo = document.querySelector('.voltar-topo');

if (botaoVoltarTopo) {
    const atualizarBotaoTopo = () => {
        botaoVoltarTopo.classList.toggle('visivel', window.scrollY > 500);
    };
    window.addEventListener('scroll', atualizarBotaoTopo, { passive: true });
    atualizarBotaoTopo();

    botaoVoltarTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: movimentoReduzido ? 'auto' : 'smooth'
        });
    });
}

/* =========================================
   LIGHTBOX — FOTOS EM TAMANHO MAIOR
========================================= */

const imagensGaleria = Array.from(document.querySelectorAll(
    '.galeria-casal-grid img, .memorias-grid .memoria-imagem img, .album-gatos .moldura-foto img'
));

if (imagensGaleria.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-fotos';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Visualização das fotografias');
    lightbox.innerHTML = `
        <button class="lightbox-fechar" type="button" aria-label="Fechar fotografia">×</button>
        <button class="lightbox-seta lightbox-anterior" type="button" aria-label="Fotografia anterior">‹</button>
        <div class="lightbox-conteudo">
            <img alt="">
            <p class="lightbox-legenda"></p>
            <span class="lightbox-contador"></span>
        </div>
        <button class="lightbox-seta lightbox-proxima" type="button" aria-label="Próxima fotografia">›</button>
    `;
    document.body.appendChild(lightbox);

    const imagemAmpliada = lightbox.querySelector('img');
    const legendaAmpliada = lightbox.querySelector('.lightbox-legenda');
    const contadorAmpliado = lightbox.querySelector('.lightbox-contador');
    const fecharLightbox = lightbox.querySelector('.lightbox-fechar');
    let indiceFoto = 0;
    let ultimoElemento = null;

    function mostrarFoto(indice) {
        indiceFoto = (indice + imagensGaleria.length) % imagensGaleria.length;
        const foto = imagensGaleria[indiceFoto];
        imagemAmpliada.src = foto.currentSrc || foto.src;
        imagemAmpliada.alt = foto.alt || 'Fotografia da nossa história';
        const legenda = foto.closest('figure')?.querySelector('figcaption')?.textContent
            || foto.closest('.memoria-foto')?.querySelector('.memoria-legenda h3')?.textContent
            || foto.closest('.foto-polaroid')?.querySelector('h3')?.textContent
            || foto.alt;
        legendaAmpliada.textContent = legenda;
        contadorAmpliado.textContent = (indiceFoto + 1) + ' / ' + imagensGaleria.length;
    }

    function abrirLightbox(indice) {
        ultimoElemento = document.activeElement;
        mostrarFoto(indice);
        lightbox.classList.add('aberto');
        document.body.classList.add('lightbox-aberto');
        fecharLightbox.focus();
    }

    function fecharJanelaFotos() {
        lightbox.classList.remove('aberto');
        document.body.classList.remove('lightbox-aberto');
        if (ultimoElemento) ultimoElemento.focus();
    }

    imagensGaleria.forEach((foto, indice) => {
        foto.addEventListener('click', () => abrirLightbox(indice));
        foto.setAttribute('tabindex', '0');
        foto.setAttribute('role', 'button');
        foto.setAttribute('aria-label', 'Ampliar fotografia: ' + (foto.alt || 'lembrança'));
        foto.addEventListener('keydown', (evento) => {
            if (evento.key === 'Enter' || evento.key === ' ') {
                evento.preventDefault();
                abrirLightbox(indice);
            }
        });
    });

    fecharLightbox.addEventListener('click', fecharJanelaFotos);
    lightbox.querySelector('.lightbox-anterior').addEventListener('click', () => mostrarFoto(indiceFoto - 1));
    lightbox.querySelector('.lightbox-proxima').addEventListener('click', () => mostrarFoto(indiceFoto + 1));
    lightbox.addEventListener('click', (evento) => {
        if (evento.target === lightbox) fecharJanelaFotos();
    });

    document.addEventListener('keydown', (evento) => {
        if (!lightbox.classList.contains('aberto')) return;
        if (evento.key === 'Escape') fecharJanelaFotos();
        if (evento.key === 'ArrowLeft') mostrarFoto(indiceFoto - 1);
        if (evento.key === 'ArrowRight') mostrarFoto(indiceFoto + 1);
    });
}
