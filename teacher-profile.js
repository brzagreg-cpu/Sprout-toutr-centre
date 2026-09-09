/* ============================================================
   teacher-profile.js — Sprout Tutor Centre
   Individual Teacher Profile Page — Interactions & Booking Modal

   HOW TO USE:
   - Add <script src="teacher-profile.js"></script> before </body>
   - The booking modal auto pre-selects the teacher
   - To customise per teacher: edit TEACHER_DATA below
============================================================ */

/* ──────────────────────────────────────
   TEACHER DATA — edit per teacher page
────────────────────────────────────── */
const TEACHER_DATA = {
  name:      'Teacher Chanté',
  role:      "Children's English Specialist",
  image:     'chante.PNG',
  offer:     '🎉 First Lesson 30% Off',
  offerNote: "Book your trial with Chanté this month and save!"
};

/* ──────────────────────────────────────
   BOOKING MODAL
────────────────────────────────────── */

/**
 * Open the booking modal
 * Called by: Book Trial button, promo badge CTA
 */
function openBookingModal() {
  const overlay = document.getElementById('bookingModal');
  if (!overlay) return;

  // Ensure form is shown (not success state)
  const form = document.getElementById('modalFormWrap');
  const success = document.getElementById('modalSuccess');
  if (form)    form.style.display = 'block';
  if (success) success.style.display = 'none';

  // Reset submit button
  const submitBtn = document.getElementById('modalSubmitBtn');
  if (submitBtn) {
    submitBtn.textContent = 'Confirm Booking →';
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
  }

  overlay.style.display = 'flex';
  // Slight delay so display:flex registers before transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add('open'));
  });

  document.body.style.overflow = 'hidden';
}

/**
 * Close the booking modal
 */
function closeBookingModal() {
  const overlay = document.getElementById('bookingModal');
  if (!overlay) return;
  overlay.classList.remove('open');
  setTimeout(() => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }, 320);
}

/**
 * Handle booking form submission
 * Validates required fields, then shows success screen
 */
function submitBookingModal() {
  const fname = document.getElementById('m-fname');
  const email = document.getElementById('m-email');

  // Basic validation
  if (fname && !fname.value.trim()) {
    fname.focus();
    fname.style.borderColor = '#ef4444';
    setTimeout(() => fname.style.borderColor = '', 2000);
    return;
  }

  if (email && !email.value.trim()) {
    email.focus();
    email.style.borderColor = '#ef4444';
    setTimeout(() => email.style.borderColor = '', 2000);
    return;
  }

  // Loading state
  const btn = document.getElementById('modalSubmitBtn');
  if (btn) {
    btn.textContent = 'Sending…';
    btn.disabled = true;
    btn.style.opacity = '0.75';
  }

  // Simulate API call
  setTimeout(() => {
    const form = document.getElementById('modalFormWrap');
    const success = document.getElementById('modalSuccess');
    if (form) {
      form.style.opacity = '0';
      form.style.transform = 'translateY(-10px)';
      form.style.transition = 'opacity 0.3s, transform 0.3s';
    }
    setTimeout(() => {
      if (form)    form.style.display = 'none';
      if (success) {
        success.style.display = 'block';
        success.style.animation = 'none';
        success.offsetHeight; // reflow
        success.style.animation = 'tp-fade-up 0.4s ease forwards';
      }
    }, 300);
  }, 1200);
}

/* ──────────────────────────────────────
   PROMO BADGE
────────────────────────────────────── */

/** Close the promo badge */
function closePromoBadge() {
  const badge = document.getElementById('promoBadge');
  if (!badge) return;
  badge.style.opacity = '0';
  badge.style.transform = 'translateY(20px)';
  badge.style.transition = 'opacity 0.3s, transform 0.3s';
  setTimeout(() => badge.style.display = 'none', 320);
}

/* ──────────────────────────────────────
   KEYBOARD & ACCESSIBILITY
────────────────────────────────────── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeBookingModal();
  }
});

/* ──────────────────────────────────────
   INPUT MICRO-LIFT
   Fields lift slightly on focus for a premium feel
────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // Input micro-interactions
  document.querySelectorAll('.tp-mfield input, .tp-mfield select').forEach(el => {
    el.addEventListener('focus', () => {
      el.closest('.tp-mfield').style.transform = 'translateY(-2px)';
      el.closest('.tp-mfield').style.transition = 'transform 0.2s';
    });
    el.addEventListener('blur', () => {
      el.closest('.tp-mfield').style.transform = 'translateY(0)';
    });
  });

  // Star rating bar animation on scroll into view
  const starFills = document.querySelectorAll('.tp-star-fill');
  if (starFills.length) {
    // Store widths then set to 0 for animation
    const widths = Array.from(starFills).map(el => el.style.width);
    starFills.forEach(el => { el.dataset.target = el.style.width; el.style.width = '0%'; });

    const starObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          starFills.forEach((el, i) => {
            setTimeout(() => {
              el.style.transition = 'width 0.8s ease';
              el.style.width = el.dataset.target;
            }, i * 80);
          });
          starObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const ratingSection = document.querySelector('.tp-rating-header');
    if (ratingSection) starObserver.observe(ratingSection);
  }

  // Scroll reveal for cards
  const cards = document.querySelectorAll('.tp-card, .tp-detail-box, .tp-style-item, .tp-review-item');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = 'opacity 0.45s ease, transform 0.45s ease, box-shadow 0.3s';
    revealObserver.observe(card);
  });

  // Promo badge — delay appearance for UX
  const badge = document.getElementById('promoBadge');
  if (badge) {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(20px)';
    setTimeout(() => {
      badge.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      badge.style.opacity = '1';
      badge.style.transform = 'translateY(0)';
    }, 2500);
  }

});

/* ──────────────────────────────────────
   INJECT ADDITIONAL ANIMATION KEYFRAMES
────────────────────────────────────── */
const style = document.createElement('style');
style.textContent = `
  @keyframes tp-fade-up {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }
`;
document.head.appendChild(style);
