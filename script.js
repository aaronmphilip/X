/* ── Navbar hide/show on scroll ─────────────────── */
(function () {
  const nav = document.getElementById('navbar');
  let lastY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > lastY && y > 80) {
          nav.classList.add('hidden');
        } else {
          nav.classList.remove('hidden');
        }
        nav.classList.toggle('scrolled', y > 10);
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ── Active sidebar link on scroll ─────────────── */
(function () {
  const sections = document.querySelectorAll('.section[id]');
  const links    = document.querySelectorAll('.sidebar-link[data-section]');
  const navLinks = document.querySelectorAll('.nav-links a[data-section]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.toggle('active', l.dataset.section === id));
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
      }
    });
  }, { rootMargin: `-${60}px 0px -60% 0px`, threshold: 0 });

  sections.forEach(s => observer.observe(s));
})();

/* ── Smooth scroll on sidebar/nav clicks ────────── */
document.addEventListener('click', e => {
  const link = e.target.closest('[data-section]');
  if (!link) return;
  e.preventDefault();
  const target = document.getElementById(link.dataset.section);
  if (target) {
    const offset = 60 + 24;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
});

/* ── Copy code blocks ───────────────────────────── */
document.querySelectorAll('pre').forEach(pre => {
  const btn = document.createElement('button');
  btn.textContent = 'Copy';
  btn.style.cssText = `
    position:absolute; top:10px; right:10px; font-size:11px; font-weight:600;
    padding:4px 10px; border-radius:5px; border:1px solid rgba(255,255,255,0.12);
    background:rgba(255,255,255,0.07); color:#aaa; cursor:pointer; opacity:0;
    transition:opacity 150ms, background 150ms; font-family:inherit;
  `;
  pre.style.position = 'relative';
  pre.appendChild(btn);
  pre.addEventListener('mouseenter', () => { btn.style.opacity = '1'; });
  pre.addEventListener('mouseleave', () => { btn.style.opacity = '0'; });
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(pre.textContent.replace('Copy','').trim());
    btn.textContent = 'Copied!';
    btn.style.color = '#00ba7c';
    setTimeout(() => { btn.textContent = 'Copy'; btn.style.color = '#aaa'; }, 1500);
  });
});

/* ── Progress bar ───────────────────────────────── */
(function () {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position:fixed; top:0; left:0; height:2px; background:var(--accent);
    z-index:2000; transition:width 100ms linear; width:0%;
  `;
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (window.scrollY / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
})();
