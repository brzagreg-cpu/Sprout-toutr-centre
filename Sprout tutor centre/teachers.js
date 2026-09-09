/* ============================================
   teachers.js – Sprout Tutor Centre
   Teachers Page Interactions & Filter
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── FILTER PILLS ── */
  const pills = document.querySelectorAll('.pill');
  const cards = document.querySelectorAll('.t-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Update active pill
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
          // Animate in
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = 'fadeUp 0.35s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ── SCROLL REVEAL on cards ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${i * 60}ms`;
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));

});

/* ── INJECT KEYFRAMES ── */
const style = document.createElement('style');
style.textContent = `
  .t-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.35s, outline 0.2s;
  }
  .t-card.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  .t-card.hidden {
    display: none !important;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
