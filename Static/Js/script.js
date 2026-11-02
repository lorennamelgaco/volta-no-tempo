
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
        menu.classList.toggle('aberto');

        botaoMenu.setAttribute(
            'aria-expanded',
            menu.classList.contains('aberto')
        );
    });

    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            menu.classList.remove('aberto');
            botaoMenu.setAttribute('aria-expanded', 'false');
        });
    });
}

/* =========================================
   NAVEGAÇÃO SUAVE
========================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (evento) => {
        const destino = document.querySelector(
            link.getAttribute('href')
        );

        if (destino) {
            evento.preventDefault();
            destino.scrollIntoView({
                behavior: movimentoReduzido ? 'auto' : 'smooth'
            });
        }
    });
});

/* =========================================
   MENSAGEM NO CONSOLE
========================================= */

console.log('Uma história que começou em 03.03.2023 ❤️');
console.log('Entre tudo que fomos e tudo que ainda podemos ser.');
