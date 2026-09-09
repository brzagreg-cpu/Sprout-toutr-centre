// ===============================
// SCROLL REVEAL ANIMATIONS
// ===============================

const revealElements = document.querySelectorAll(
'.feature-card, .teacher-card, .stat, .cta, .hero-content, .hero-image'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }

    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => {
    el.classList.add('hidden');
    revealObserver.observe(el);
});


// ===============================
// ANIMATED STATS COUNTER
// ===============================

const stats = document.querySelectorAll('.stat h2');

const countObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const targetText = entry.target.innerText;
            const target = parseInt(targetText);

            let current = 0;
            const increment = target / 80;

            const counter = setInterval(() => {

                current += increment;

                if (current >= target) {

                    entry.target.innerText = targetText;
                    clearInterval(counter);

                } else {

                    if (targetText.includes('%')) {

                        entry.target.innerText =
                        Math.floor(current) + '%';

                    } else if (targetText.includes('+')) {

                        entry.target.innerText =
                        Math.floor(current) + '+';

                    } else {

                        entry.target.innerText =
                        Math.floor(current);

                    }

                }

            }, 20);

            countObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.6
});

stats.forEach(stat => {
    countObserver.observe(stat);
});


// ===============================
// HERO PARALLAX EFFECT
// ===============================

const heroImage = document.querySelector('.hero-image');

document.addEventListener('mousemove', (e) => {

    if (!heroImage) return;

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    heroImage.style.transform =
    `translate(${x}px, ${y}px)`;

});


// ===============================
// 3D TEACHER CARD EFFECT
// ===============================

const cards = document.querySelectorAll('.teacher-card');

cards.forEach(card => {

    card.addEventListener('mousemove', (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY =
        ((x / rect.width) - 0.5) * 16;

        const rotateX =
        ((y / rect.height) - 0.5) * -16;

        card.style.transform =
        `perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-12px)`;

    });

    card.addEventListener('mouseleave', () => {

        card.style.transform =
        'perspective(1000px) rotateX(0) rotateY(0)';

    });

});


// ===============================
// PREMIUM BUTTON GLOW
// ===============================

const buttons = document.querySelectorAll(
'.btn-primary, .trial-btn'
);

buttons.forEach(btn => {

    btn.addEventListener('mouseenter', () => {

        btn.style.boxShadow =
        '0 20px 40px rgba(255,196,0,.35)';

    });

    btn.addEventListener('mouseleave', () => {

        btn.style.boxShadow =
        '0 8px 20px rgba(0,0,0,.08)';

    });

});


// ===============================
// GLASS NAVBAR ON SCROLL
// ===============================

const header = document.querySelector('header');

window.addEventListener('scroll', () => {

    if (window.scrollY > 50) {

        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow =
        '0 10px 30px rgba(0,0,0,.08)';

    } else {

        header.style.boxShadow = 'none';

    }

});


// ===============================
// SMOOTH SCROLLING
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        const target = document.querySelector(
            this.getAttribute('href')
        );

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth'
            });

        }

    });

});




