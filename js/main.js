/* ─── NAV SCROLL ─────────────────────────────────────────────────────── */
const nav = document.querySelector('.nav');
const scrollTop = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav?.classList.add('scrolled');
    scrollTop?.classList.add('visible');
  } else {
    nav?.classList.remove('scrolled');
    scrollTop?.classList.remove('visible');
  }
}, { passive: true });

scrollTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ─── MOBILE NAV ──────────────────────────────────────────────────────── */
const burger = document.querySelector('.nav__burger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-nav a');

burger?.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  const spans = burger.querySelectorAll('span');
  if (mobileNav.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

mobileLinks.forEach(link => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
  burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}));

/* ─── ACTIVE NAV LINK ─────────────────────────────────────────────────── */
const currentPath = window.location.pathname;
document.querySelectorAll('.nav__links a').forEach(a => {
  if (a.getAttribute('href') === currentPath || a.getAttribute('href') === currentPath.replace(/\/$/, '')) {
    a.classList.add('active');
  }
});

/* ─── FADE-UP OBSERVER ────────────────────────────────────────────────── */
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } }),
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ─── COOKIE BANNER ───────────────────────────────────────────────────── */
const cookieBanner = document.querySelector('.cookie-banner');
const cookieKey = 'rdl_cookie_consent';

if (!localStorage.getItem(cookieKey) && cookieBanner) {
  setTimeout(() => cookieBanner.classList.add('visible'), 800);
}

document.querySelector('.cookie-accept')?.addEventListener('click', () => {
  localStorage.setItem(cookieKey, 'all');
  cookieBanner.classList.remove('visible');
});

document.querySelector('.cookie-necessary')?.addEventListener('click', () => {
  localStorage.setItem(cookieKey, 'necessary');
  cookieBanner.classList.remove('visible');
});

/* ─── CONTACT FORM ────────────────────────────────────────────────────── */
const contactForm = document.querySelector('.contatti-form');
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Invio in corso…';
  btn.disabled = true;
  await new Promise(r => setTimeout(r, 1200));
  btn.textContent = '✓ Inviato';
  btn.style.background = 'transparent';
  btn.style.borderColor = 'rgba(201,169,110,0.4)';
  btn.style.color = 'var(--gold)';
  contactForm.querySelectorAll('input, textarea').forEach(f => f.value = '');
});

/* ─── CHARACTER CARDS EXPAND ──────────────────────────────────────────── */
document.querySelectorAll('.char-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
  });
});

/* ─── TICKER PAUSE ON HOVER ───────────────────────────────────────────── */
const ticker = document.querySelector('.ticker__inner');
if (ticker) {
  ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
  ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = '');
}
