// nav-footer.js — Mission Church Africa
// Injects the shared nav and footer into every page

(function () {
  /* ────────────────────────────────────────
     NAV
  ──────────────────────────────────────── */
  const navHTML = `
  <header class="nav-header" id="navHeader">
    <div class="nav-inner">

      <!-- LOGO — uses logo-image.jpg -->
      <a href="index.html" class="nav-logo">
        <img src="zipc1.jpeg" alt="ZIPC" class="nav-logo-img"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
        <div class="nav-logo-icon" style="display:none;">✝</div>
        <div class="nav-logo-text">
          <span class="nav-logo-title">ZION INERNATIONAL PENTECOSTAL<span>Africa</span></span>
          <span class="nav-logo-sub">CHURCH· Uganda</span>
        </div>
      </a>

      <!-- HAMBURGER (mobile) -->
      <div class="hamburger" id="hamburger" onclick="toggleMenu()">
        <span></span><span></span><span></span>
      </div>

      <!-- NAV LINKS -->
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html" class="active">Home</a></li>
        <li>
          <a href="about.html">About ▾</a>
          <div class="nav-dropdown">
            <a href="about.html">Our Story</a>
            <a href="about.html#leadership">Leadership</a>
            <a href="about.html#beliefs">Beliefs</a>
          </div>
        </li>
        <li>
          <a href="services.html">Services ▾</a>
          <div class="nav-dropdown">
            <a href="services.html">Sunday Service</a>
            <a href="services.html#wednesday">Wednesday Prayer</a>
            <a href="services.html#friday">Friday Night</a>
          </div>
        </li>
        <li>
          <a href="ministries.html">Ministries ▾</a>
          <div class="nav-dropdown">
            <a href="ministries.html#youth">Youth</a>
            <a href="ministries.html#women">Women</a>
            <a href="ministries.html#men">Men</a>
            <a href="ministries.html#children">Children</a>
          </div>
        </li>
        <li><a href="sermons.html">Sermons</a></li>
        <li><a href="events.html">Events</a></li>
        <li><a href="give.html">Give</a></li>
        <li><a href="contact.html" class="nav-cta">Visit Us</a></li>
      </ul>
    </div>
  </header>`;

  /* ────────────────────────────────────────
     FOOTER
  ──────────────────────────────────────── */
  const footerHTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">

        <div class="footer-brand">
          <a href="index.html" class="nav-logo" style="margin-bottom:16px;">
            <img src="zipc1.jpeg" alt="ZIPC" class="nav-logo-img"
                 style="width:44px;height:44px;"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
            <div class="nav-logo-icon" style="display:none;">✝</div>
            <div class="nav-logo-text">
              <span class="nav-logo-title" style="color:white;">ZION INTERNAL<span>PENTECOSTAL</span></span>
              <span class="nav-logo-sub">CHURCH· Uganda</span>
            </div>
          </a>
          <p>Rooted in Scripture, empowered by the Holy Spirit, and reaching every nation with the love of Christ.</p>
          <div class="footer-socials">
            <a href="#" class="social-link" title="Facebook">f</a>
            <a href="#" class="social-link" title="YouTube">▶</a>
            <a href="#" class="social-link" title="Instagram">◉</a>
            <a href="#" class="social-link" title="Twitter/X">✕</a>
            <a href="https://wa.me/256700000000" class="social-link" title="WhatsApp">💬</a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="about.html">Our Story</a></li>
            <li><a href="about.html#leadership">Leadership</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="ministries.html">Ministries</a></li>
            <li><a href="sermons.html">Sermons</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="events.html">Events</a></li>
            <li><a href="contact.html">Visit Us</a></li>
            <li><a href="contact.html#prayer">Prayer Requests</a></li>
            <li><a href="give.html">Give Online</a></li>
            <li><a href="contact.html#volunteer">Volunteer</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Service Times</h4>
          <ul>
            <li><a href="services.html">Sunday 8:00 AM</a></li>
            <li><a href="services.html">Sunday 10:00 AM</a></li>
            <li><a href="services.html">Sunday 12:00 PM</a></li>
            <li><a href="services.html">Wednesday 6:30 PM</a></li>
            <li><a href="services.html">Friday 7:00 PM</a></li>
          </ul>
        </div>

      </div><!-- .footer-top -->

      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Mission Church Africa. All rights reserved.</span>
        <div class="footer-bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="contact.html">Contact</a>
        </div>
      </div>
    </div>
  </footer>`;

  /* ────────────────────────────────────────
     INJECT
  ──────────────────────────────────────── */
  const navPH    = document.getElementById('nav-placeholder');
  const footerPH = document.getElementById('footer-placeholder');
  if (navPH)    navPH.innerHTML    = navHTML;
  if (footerPH) footerPH.innerHTML = footerHTML;

  /* ── Scroll-based nav styling ── */
  const header = document.getElementById('navHeader');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Active link highlighting ── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
    }
  });
})();

/* ── Mobile menu toggle ── */
function toggleMenu() {
  const links     = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  const isOpen    = links.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
}

/* Close menu on outside click */
document.addEventListener('click', (e) => {
  const links = document.getElementById('navLinks');
  const burger = document.getElementById('hamburger');
  if (links && links.classList.contains('open')) {
    if (!links.contains(e.target) && !burger.contains(e.target)) {
      links.classList.remove('open');
      burger.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  }
});