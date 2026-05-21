/* ── Daily Checklist ────────────────────────────── */
(function () {

  const STORAGE_KEY = 'xgrowth_checklist';

  const TIERS = {
    1: {
      range: '0 – 999 followers',
      label: 'Tier 1 — Escape the Penalty Box',
      tierClass: 'tier-1',
      desc: 'The spam filter treats new accounts with maximum suspicion. Your only goal is to hit 1,000 as fast as possible. Every action below moves you closer.',
      tip: '<strong>Remember:</strong> Under 1K, the algorithm watches everything closely. Consistency beats volume — one great post beats five mediocre ones every single time.',
      categories: [
        {
          name: '📝 Content',
          tasks: [
            { id: 'c1', text: '<strong>Post exactly 1 piece of content</strong> — quality over quantity. Second posts the same day get penalised.' },
            { id: 'c2', text: '<strong>Stick to your ONE core topic.</strong> Your last 128 posts train the algorithm on what you are about.' },
            { id: 'c3', text: '<strong>Write for 25–30 seconds of read time.</strong> Hook in line 1. Deliver the value. Stop.' },
          ]
        },
        {
          name: '⏱️ First 30 Minutes (critical)',
          tasks: [
            { id: 'e1', text: '<strong>Post at the time your most engaged followers are online</strong> — not when "the platform" is busiest.' },
            { id: 'e2', text: '<strong>DM your post to 5–10 people</strong> who will genuinely engage within the first 30 minutes.' },
            { id: 'e3', text: '<strong>Stay active for 2 hours after posting</strong> — reply to every single comment. Engagement velocity is tracked.' },
          ]
        },
        {
          name: '📣 Growth Moves',
          tasks: [
            { id: 'g1', text: '<strong>Reply to 3+ large accounts (10K+) in your niche</strong> with a sharp, valuable take. Your reply becomes its own ranked post.' },
            { id: 'g2', text: '<strong>Follow 5–10 accounts your target audience follows</strong> — this builds Jaccard overlap, making you appear in their feeds.' },
            { id: 'g3', text: '<strong>Engage with trending topics in your niche</strong> if you have a genuine angle — new accounts get bonus routing into topic feeds.' },
          ]
        },
        {
          name: '🚫 Avoid',
          tasks: [
            { id: 'a1', text: '<strong>Do not go private,</strong> even for a day. Private accounts are cut off from every viral pipeline in the code.' },
            { id: 'a2', text: '<strong>Do not post more than once within 3 hours.</strong> Author diversity decay starts immediately.' },
          ]
        }
      ]
    },
    2: {
      range: '1,000 – 4,999 followers',
      label: 'Tier 2 — Build Your Identity',
      tierClass: 'tier-2',
      desc: 'The spam penalty has lifted. The algorithm now has enough history to understand what you post about and who should see it. Feed it clean, consistent signal.',
      tip: '<strong>You have traction now.</strong> The BangerInitialScreen AI is watching every post. Make every one specific, original, and debatable — generic posts score below the quality threshold.',
      categories: [
        {
          name: '📝 Content',
          tasks: [
            { id: 'c1', text: '<strong>Post one high-quality, specific piece</strong> — aim for the isHighQuality flag. Say something someone could disagree with.' },
            { id: 'c2', text: '<strong>Use images that add information</strong> — charts, screenshots, data. The Banger AI reads your images too.' },
            { id: 'c3', text: '<strong>Try a thread today.</strong> Each post in a thread is its own ranked candidate — a great reply-2 can pull people to post-1.' },
          ]
        },
        {
          name: '⏱️ First Hour',
          tasks: [
            { id: 'e1', text: '<strong>Seed your first engagement within 30–60 minutes.</strong> The Banger AI only reviews posts that clear the min-traction gate.' },
            { id: 'e2', text: '<strong>Reply to every comment to boost engagement velocity</strong> — the algorithm tracks how fast your replies come in.' },
          ]
        },
        {
          name: '📣 Growth Moves',
          tasks: [
            { id: 'g1', text: '<strong>Reply to 5+ accounts in your niche</strong> with a perspective that adds value, not just agreement.' },
            { id: 'g2', text: '<strong>Quote tweet something relevant</strong> — quotes reach the quoter\'s entire audience plus yours.' },
            { id: 'g3', text: '<strong>Design your post to be DM-worthy.</strong> Ask: "Would someone send this to a friend?" DM shares outweigh likes.' },
          ]
        },
        {
          name: '🔎 Audit',
          tasks: [
            { id: 'au1', text: '<strong>Check your last 10 posts — are they all on-topic?</strong> Topic drift confuses the routing algorithm and kills reach.' },
          ]
        }
      ]
    },
    3: {
      range: '5,000 – 9,999 followers',
      label: 'Tier 3 — Feed the Machine',
      tierClass: 'tier-3',
      desc: 'The algorithm knows who you are. Your author embedding is established. Every post now benefits from your reputation — don\'t break the pattern.',
      tip: '<strong>Don\'t dilute your signal.</strong> At this stage, every off-topic post costs you routing precision the algorithm built over hundreds of posts. Stay in your lane.',
      categories: [
        {
          name: '📝 Content',
          tasks: [
            { id: 'c1', text: '<strong>Post at YOUR audience\'s peak time</strong> — check your analytics, not platform-wide stats.' },
            { id: 'c2', text: '<strong>Post a clear opinion with a debatable argument</strong> — invites quotes, which bring entirely new audiences.' },
            { id: 'c3', text: '<strong>Keep your consistent voice and format</strong> — it trains the algorithm and conditions your audience.' },
          ]
        },
        {
          name: '⏱️ Engagement Window',
          tasks: [
            { id: 'e1', text: '<strong>Seed cross-network engagement in the first 30–60 minutes.</strong> Quality over quantity in your seed group.' },
            { id: 'e2', text: '<strong>Reply to every comment</strong> — boosts click-through dwell and conversation depth signals.' },
            { id: 'e3', text: '<strong>Check your post at the 1-hour and 6-hour marks.</strong> If it\'s below your baseline, re-seed or quote it.' },
          ]
        },
        {
          name: '📣 Reach Moves',
          tasks: [
            { id: 'g1', text: '<strong>If posting video, make it 60+ seconds.</strong> Shorter videos zero out the video-quality scoring category entirely.' },
            { id: 'g2', text: '<strong>Connect your post to a trending topic</strong> if it\'s natural — you get two distribution channels instead of one.' },
            { id: 'g3', text: '<strong>Design content specifically to get quoted.</strong> Every quote brings a new audience pool with zero extra effort.' },
          ]
        }
      ]
    },
    4: {
      range: '10,000+ followers',
      label: 'Tier 4 — Scale and Compound',
      tierClass: 'tier-4',
      desc: 'You\'re in the trust tier. The algorithm routes your content confidently and your author signal is strong. Now compound it systematically.',
      tip: '<strong>You\'re playing a different game now.</strong> Think about audience architecture — who quotes you, who reposts you, and who you\'re pulling from Out-of-Network all feed into compounding returns.',
      categories: [
        {
          name: '📝 Content',
          tasks: [
            { id: 'c1', text: '<strong>Post your signature format</strong> — consistent voice, structure, visual style. Your audience expects it and the algorithm has learned it.' },
            { id: 'c2', text: '<strong>Design one post specifically engineered for shares and quotes.</strong> At scale, these are your biggest reach multipliers.' },
            { id: 'c3', text: '<strong>Post at your audience\'s optimised time.</strong> At 10K+, your analytics data is reliable — use it.' },
          ]
        },
        {
          name: '⏱️ Engagement',
          tasks: [
            { id: 'e1', text: '<strong>Actively seed cross-network engagement early.</strong> Your seed group should be diverse — different follower tiers, different network clusters.' },
            { id: 'e2', text: '<strong>Engage with all replies for the first 2 hours</strong> to keep the engagement velocity signal high.' },
          ]
        },
        {
          name: '📣 Growth',
          tasks: [
            { id: 'g1', text: '<strong>Expand your niche slightly if you\'re ready</strong> — one adjacent topic tested carefully, not a full pivot.' },
            { id: 'g2', text: '<strong>Post threads on complex topics</strong> — threads give the algorithm multiple ranking candidates from one piece of content.' },
            { id: 'g3', text: '<strong>Only link to content worth 20+ seconds of read time.</strong> Click-through dwell is tracked — bad links hurt your score.' },
          ]
        },
        {
          name: '🔎 Review',
          tasks: [
            { id: 'r1', text: '<strong>Review last week\'s top-performing post.</strong> What made it land? Reproduce the structure, not the words.' },
          ]
        }
      ]
    }
  };

  function getTier(n) {
    if (n < 1000) return 1;
    if (n < 5000) return 2;
    if (n < 10000) return 3;
    return 4;
  }

  function loadState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
  }
  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function updateProgress(tierData, state) {
    const allIds = tierData.categories.flatMap(c => c.tasks.map(t => t.id));
    const done = allIds.filter(id => state[id]).length;
    const total = allIds.length;
    document.getElementById('clDoneCount').textContent = done;
    document.getElementById('clTotalCount').textContent = total;
    const pct = total ? (done / total * 100) : 0;
    document.getElementById('clProgressFill').style.width = pct + '%';
  }

  function renderChecklist(tierNum, followers) {
    const tierData = TIERS[tierNum];
    const state = loadState();

    // Badge + title + desc
    const badge = document.getElementById('clTierBadge');
    badge.className = 'cl-tier-badge ' + tierData.tierClass;
    badge.textContent = tierData.range;
    document.getElementById('clResultTitle').textContent = tierData.label;
    document.getElementById('clResultDesc').textContent = tierData.desc;
    document.getElementById('clFooterTip').innerHTML = tierData.tip;

    // Items
    const container = document.getElementById('clItems');
    container.innerHTML = '';
    tierData.categories.forEach(cat => {
      const catEl = document.createElement('div');
      catEl.className = 'cl-category';
      catEl.innerHTML = `<div class="cl-category-label">${cat.name}</div>`;
      cat.tasks.forEach(task => {
        const isDone = !!state[task.id];
        const item = document.createElement('div');
        item.className = 'cl-item' + (isDone ? ' done' : '');
        item.dataset.id = task.id;
        item.innerHTML = `
          <div class="cl-checkbox">
            <svg class="cl-checkbox-tick" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 5L3.8 7.5L8.5 2.5" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="cl-item-text">${task.text}</div>`;
        item.addEventListener('click', () => {
          const s = loadState();
          s[task.id] = !s[task.id];
          saveState(s);
          item.classList.toggle('done', !!s[task.id]);
          updateProgress(tierData, s);
        });
        catEl.appendChild(item);
      });
      container.appendChild(catEl);
    });

    updateProgress(tierData, state);

    document.getElementById('clSetup').style.display = 'none';
    document.getElementById('clResult').style.display = 'block';
  }

  function showSetup() {
    document.getElementById('clSetup').style.display = 'block';
    document.getElementById('clResult').style.display = 'none';
    document.getElementById('clFollowerInput').value = '';
  }

  // Button handlers
  document.getElementById('clGetBtn')?.addEventListener('click', () => {
    const val = parseInt(document.getElementById('clFollowerInput').value, 10);
    if (isNaN(val) || val < 0) {
      document.getElementById('clFollowerInput').focus();
      return;
    }
    renderChecklist(getTier(val), val);
  });

  document.getElementById('clFollowerInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('clGetBtn').click();
  });

  document.getElementById('clChangeBtn')?.addEventListener('click', showSetup);

  document.getElementById('clResetBtn')?.addEventListener('click', () => {
    saveState({});
    const tierNum = getTier(parseInt(document.getElementById('clFollowerInput').value || '0', 10));
    document.querySelectorAll('.cl-item').forEach(el => el.classList.remove('done'));
    updateProgress(TIERS[tierNum], {});
  });

})();

/* ── Mobile sidebar toggle ──────────────────────── */
(function () {
  const btn     = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  function open()  { sidebar.classList.add('open');    overlay.classList.add('visible');    document.body.style.overflow = 'hidden'; }
  function close() { sidebar.classList.remove('open'); overlay.classList.remove('visible'); document.body.style.overflow = ''; }

  btn?.addEventListener('click', () => sidebar.classList.contains('open') ? close() : open());
  overlay?.addEventListener('click', close);

  // close drawer when a sidebar link is tapped
  sidebar?.addEventListener('click', e => {
    if (e.target.closest('.sidebar-link')) close();
  });
})();

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
