/* ============================================
   contact.js – Sprout Tutor Centre
   Contact Page Interactions
   ============================================ */

/* ── FORM SUBMIT ── */
function submitForm() {
  const btn = document.getElementById('submitBtn');

  // Basic validation
  const email = document.getElementById('email').value.trim();
  const firstName = document.getElementById('firstName').value.trim();

  if (!firstName || !email) {
    shakeBtn(btn);
    return;
  }

  // Loading state
  btn.innerHTML = '<span>Sending…</span>';
  btn.style.opacity = '0.75';
  btn.style.pointerEvents = 'none';

  // Simulate sending then show success
  setTimeout(() => {
    const formWrap = document.getElementById('formWrap');
    const successState = document.getElementById('successState');

    formWrap.style.opacity = '0';
    formWrap.style.transform = 'translateY(-10px)';
    formWrap.style.transition = 'opacity 0.3s, transform 0.3s';

    setTimeout(() => {
      formWrap.style.display = 'none';
      successState.style.display = 'flex';
      successState.style.animation = 'fadeUp 0.4s ease forwards';
    }, 300);
  }, 1400);
}

/* ── FORM RESET ── */
function resetForm() {
  const formWrap = document.getElementById('formWrap');
  const successState = document.getElementById('successState');
  const btn = document.getElementById('submitBtn');

  successState.style.display = 'none';
  formWrap.style.display = 'block';
  formWrap.style.opacity = '1';
  formWrap.style.transform = 'translateY(0)';

  btn.innerHTML = '<span>Send Message</span><span>→</span>';
  btn.style.opacity = '1';
  btn.style.pointerEvents = 'auto';

  // Clear fields
  document.querySelectorAll('input, textarea, select').forEach(el => {
    el.value = '';
  });
}

/* ── SHAKE ANIMATION for validation ── */
function shakeBtn(btn) {
  btn.style.animation = 'shake 0.4s ease';
  setTimeout(() => { btn.style.animation = ''; }, 400);
}

/* ── INPUT MICRO-LIFT on focus ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input, textarea, select').forEach(el => {
    el.addEventListener('focus', () => {
      el.closest('.field').style.transform = 'translateY(-2px)';
    });
    el.addEventListener('blur', () => {
      el.closest('.field').style.transform = 'translateY(0)';
    });
  });
});

/* ── CSS KEYFRAMES injected via JS ── */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-6px); }
    40%       { transform: translateX(6px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }
`;
document.head.appendChild(style);
