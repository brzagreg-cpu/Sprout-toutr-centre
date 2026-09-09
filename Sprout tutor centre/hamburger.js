/* ============================================================
   hamburger.js — Sprout Tutor Centre
   Mobile Navigation Toggle
   
   Add this script to every HTML page just before </body>:
   <script src="hamburger.js"></script>
============================================================ */

(function () {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  if (!header || !nav) return;

  // Create hamburger button and inject into header
  const btn = document.createElement('button');
  btn.className = 'hamburger';
  btn.setAttribute('aria-label', 'Open navigation');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';
  header.appendChild(btn);

  // Toggle nav open/close
  function openNav() {
    nav.classList.add('nav-open');
    btn.classList.add('is-open');
    btn.setAttribute('aria-label', 'Close navigation');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    nav.classList.remove('nav-open');
    btn.classList.remove('is-open');
    btn.setAttribute('aria-label', 'Open navigation');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    nav.classList.contains('nav-open') ? closeNav() : openNav();
  });

  // Close when a nav link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  // Hide hamburger on desktop resize
  const mq = window.matchMedia('(min-width: 769px)');

  function handleBreakpoint(e) {
    btn.style.display = e.matches ? 'none' : 'flex';
    if (e.matches) closeNav();
  }

  mq.addEventListener('change', handleBreakpoint);
  handleBreakpoint(mq);
})();
