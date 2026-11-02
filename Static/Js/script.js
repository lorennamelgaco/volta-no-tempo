
/* =========================================
   ANIMAÇÕES AO ROLAR A PÁGINA
========================================= */

const elementos = document.querySelectorAll(
    '.historia, .familia, .sonhos, .final, .foto-animal, .sonho'
);

const observer = new IntersectionObserver(

    (entradas) => {

        entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {

                entrada.target.classList.add('visivel');

                observer.unobserve(entrada.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);

elementos.forEach((elemento) => {

    elemento.classList.add('animar');

    observer.observe(elemento);

});


/* =========================================
   ESTRELAS PISCANDO
========================================= */

const ceu = document.querySelector('.ceu-estrelado');

if (ceu) {

    for (let i = 0; i < 45; i++) {

        const estrela = document.createElement('span');

        estrela.classList.add('estrela');

        estrela.style.left = Math.random() * 100 + '%';

        estrela.style.top = Math.random() * 100 + '%';

        estrela.style.animationDelay =
            Math.random() * 4 + 's';

        estrela.style.animationDuration =
            (2 + Math.random() * 4) + 's';

        ceu.appendChild(estrela);

    }

}


/* =========================================
   NAVEGAÇÃO SUAVE
========================================= */

const links = document.querySelectorAll('.menu a, .logo, .botao-historia');

links.forEach((link) => {

    link.addEventListener('click', (evento) => {

        const destino = link.getAttribute('href');

        if (destino && destino.startsWith('#')) {

            const secao = document.querySelector(destino);

            if (secao) {

                evento.preventDefault();

                secao.scrollIntoView({
                    behavior: 'smooth'
                });

            }

        }

    });

});


/* =========================================
   ANO E DATA DO NOSSO COMEÇO
========================================= */

console.log(
    'Uma história que começou em 03.03.2023 ❤️'
);

console.log(
    'Entre tudo que fomos e tudo que ainda podemos ser.'
);
