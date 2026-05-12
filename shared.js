

/* ─── NAVIGATION ─── */



function initNav() {
  const header = document.querySelector('.nav-header');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-links > li > a').forEach(link => {
    link.addEventListener('click', (e) => {
      const li = link.parentElement;
      const dropdown = li.querySelector('.nav-dropdown');
      if (dropdown && window.innerWidth <= 900) {
        e.preventDefault();
        li.classList.toggle('open');
      } else if (window.innerWidth <= 900) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

/* ─── SCROLL REVEAL ─── */
function initReveal() {
  const els = document.querySelectorAll('.anim-up, .anim-left, .anim-right, .anim-scale');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

/* ─── COUNTER ANIMATION ─── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current).toLocaleString() + suffix;
          if (current >= target) clearInterval(timer);
        }, 16);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => obs.observe(el));
}

/* ─── GIVING MODAL ─── */
function initGivingModal() {
  const modal = document.getElementById('givingModal');
  if (!modal) return;
  document.querySelectorAll('[data-open-giving]').forEach(btn => {
    btn.addEventListener('click', () => modal.classList.add('open'));
  });
  document.querySelectorAll('[data-close-giving]').forEach(btn => {
    btn.addEventListener('click', () => modal.classList.remove('open'));
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('open');
  });
}

/* ─── BOOT ─── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initCounters();
  initGivingModal();
});