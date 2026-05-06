/* ================================================
   ZION INTERNATIONAL PENTECOSTAL CHURCH
   Global JavaScript — Professional Edition 2026
   ================================================ */

(function() {
  'use strict';

  /* ─── PAGE LOADER ─────────────────────────────── */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => { loader.remove(); }, 900);
    }, 800);
  });

  /* ─── CUSTOM CURSOR ───────────────────────────── */
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (dot && ring && window.innerWidth > 768) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
    });

    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.addEventListener('mousedown', () => dot.style.transform = 'translate(-50%,-50%) scale(0.6)');
    document.addEventListener('mouseup',   () => dot.style.transform = 'translate(-50%,-50%) scale(1)');
  }

  /* ─── SCROLL PROGRESS BAR ─────────────────────── */
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const s = document.documentElement;
      const pct = (s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100;
      progressBar.style.width = pct + '%';
    });
  }

  /* ─── HEADER SCROLL STATE ─────────────────────── */
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* ─── MOBILE MENU ─────────────────────────────── */
  window.openMenu  = () => {
    document.getElementById('mobileMenu')?.classList.add('active');
    document.querySelector('.hamburger')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeMenu = () => {
    document.getElementById('mobileMenu')?.classList.remove('active');
    document.querySelector('.hamburger')?.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ─── ACTIVE NAV LINK ─────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('nav a, .mobile-menu a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current ||
        a.getAttribute('href')?.includes(current));
    });
  });

  /* ─── SCROLL REVEAL ───────────────────────────── */
  const revealEls   = document.querySelectorAll('.reveal');
  const staggerEls  = document.querySelectorAll('.stagger');

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('visible');
        revealObs.unobserve(el.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObs.observe(el));
  staggerEls.forEach(el => revealObs.observe(el));

  /* ─── COUNTER ANIMATION ───────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target || el.textContent);
    const duration = 2000;
    const start    = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(ease * target).toLocaleString() + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => {
    el.dataset.target = el.textContent;
    counterObs.observe(el);
  });

  /* ─── MINISTRY SLIDERS ────────────────────────── */
  document.querySelectorAll('.slider').forEach(slider => {
    const imgs = slider.querySelectorAll('img');
    if (!imgs.length) return;
    let cur = 0;
    imgs[cur].classList.add('active');

    setInterval(() => {
      imgs[cur].classList.remove('active');
      imgs[cur].classList.add('prev');
      cur = (cur + 1) % imgs.length;
      imgs[cur].classList.add('active');
      setTimeout(() => imgs.forEach(i => i.classList.remove('prev')), 1100);
    }, 4500);
  });

  /* ─── GIVING MODAL ────────────────────────────── */
  window.openGiving  = () => document.getElementById('givingModal')?.classList.add('open');
  window.closeGiving = () => document.getElementById('givingModal')?.classList.remove('open');

  document.getElementById('givingModal')?.addEventListener('click', e => {
    if (e.target.id === 'givingModal') closeGiving();
  });

  /* ─── PAGE TRANSITION LINKS ───────────────────── */
  const transition = document.querySelector('.page-transition');

  if (transition) {
    document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"]):not([href^="https"]):not([href^="tel"]):not([href^="mailto"]):not([href^="wa.me"])').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const href = a.href;
        transition.classList.add('in');
        setTimeout(() => { window.location = href; }, 450);
      });
    });
    window.addEventListener('pageshow', () => {
      transition.classList.remove('in');
    });
  }

  /* ─── PARTICLES ───────────────────────────────── */
  function createParticles(container, count = 20) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        bottom: ${Math.random() * 60}%;
        --dur: ${4 + Math.random() * 6}s;
        --delay: ${Math.random() * 6}s;
        width: ${1 + Math.random() * 2}px;
        height: ${1 + Math.random() * 2}px;
        opacity: ${0.2 + Math.random() * 0.5};
      `;
      container.appendChild(p);
    }
  }

  document.querySelectorAll('.particles').forEach(c => createParticles(c, 25));

  /* ─── TILT 3D CARDS ───────────────────────────── */
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const x   = e.clientX - r.left;
      const y   = e.clientY - r.top;
      const rx  = ((y / r.height) - 0.5) * 16;
      const ry  = ((x / r.width)  - 0.5) * -16;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });

  /* ─── SMOOTH ANCHOR SCROLL ────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        closeMenu();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();