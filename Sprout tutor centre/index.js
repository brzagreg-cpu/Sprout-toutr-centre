/* ============================================
   index.js – Sprout Tutor Centre
   Homepage Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll(
    '.feature-card, .teacher-card, .why-item, .stat'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));

  /* ── STAT COUNTER ANIMATION ── */
  const stats = document.querySelectorAll('.stat h2');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => countObserver.observe(stat));

  function animateCount(el) {
    const text = el.textContent;
    const num = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/[\d,]/g, '');
    const duration = 1400;
    const steps = 50;
    const increment = num / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), num);
      el.textContent = current.toLocaleString() + suffix;
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
  }

  /* ── HERO IMAGE PARALLAX (subtle) ── */
  const heroImg = document.querySelector('.hero-image img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroImg.style.transform = `translateY(${scrollY * 0.06}px)`;
    }, { passive: true });
  }

});

/* ── INJECT REVEAL STYLES ── */
const style = document.createElement('style');
style.textContent = `
  .feature-card,
  .teacher-card,
  .why-item,
  .stat {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .feature-card.revealed,
  .teacher-card.revealed,
  .why-item.revealed,
  .stat.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
