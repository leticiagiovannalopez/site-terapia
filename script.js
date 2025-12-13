// --- Efeito de scroll no Header ---
window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- Animação de elementos ao scrollar ---
const elementsToShow = document.querySelectorAll('.show-on-scroll');

const checkAndAnimate = () => {
  const triggerHeight = window.innerHeight - 100;

  elementsToShow.forEach(element => {
    const rect = element.getBoundingClientRect();

    if (rect.top < triggerHeight) {
      element.classList.add('visible');
    }
  });
};

// Executa a função quando o DOM está carregado
document.addEventListener('DOMContentLoaded', checkAndAnimate);

// Executa a função ao rolar a página
window.addEventListener('scroll', checkAndAnimate);

// --- Scroll suave para links de navegação ---
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = document.getElementById('main-header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// --- Efeito de parallax suave no hero ---
window.addEventListener('scroll', function() {
    const hero = document.getElementById('hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
    }
});

// --- Botão Voltar ao Topo ---
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// --- Animação de entrada para os cards de serviços e planos ---
const cards = document.querySelectorAll('.servico-card, .plano-card');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// --- Destaque visual ao passar mouse nos depoimentos ---
const depoimentoCards = document.querySelectorAll('.depoimento-card');

depoimentoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// --- Contador de scroll para mostrar progresso ---
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // Você pode criar uma barra de progresso se desejar
    // Por enquanto, apenas armazenamos o valor
    document.documentElement.style.setProperty('--scroll-progress', scrolled + '%');
});

// --- Lazy loading para imagens ---
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// --- Efeito de digitação no título do hero (opcional) ---
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Ativar o efeito quando a página carregar (opcional, descomente se quiser usar)
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('#hero h2');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         typeWriter(heroTitle, originalText, 50);
//     }
// });

// --- Melhorar a performance do scroll ---
let ticking = false;

function updateOnScroll() {
    checkAndAnimate();
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// --- Adicionar classe ativa ao link da navegação baseado na seção visível ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});
