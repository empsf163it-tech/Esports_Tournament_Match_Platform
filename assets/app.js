document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('nav-open');
    });
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('nav-open') && !nav.contains(e.target) && e.target !== menuToggle) {
        nav.classList.remove('nav-open');
      }
    });
  }

  const search = document.getElementById('tournament-search');
  const gameFilter = document.getElementById('game-filter');
  const statusFilter = document.getElementById('status-filter');
  const tournamentCards = [...document.querySelectorAll('#tournament-grid .event-card')];
  function filterTournaments() {
    if (!tournamentCards.length) return;
    const q = (search?.value || '').trim().toLowerCase();
    const game = gameFilter?.value || 'all';
    const status = statusFilter?.value || 'all';
    let visible = 0;
    tournamentCards.forEach(card => {
      const ok = (!q || (card.dataset.search || '').includes(q)) &&
        (game === 'all' || card.dataset.game === game) &&
        (status === 'all' || card.dataset.status === status);
      card.hidden = !ok; if (ok) visible++;
    });
    const noResults = document.getElementById('no-results');
    if (noResults) noResults.hidden = visible !== 0;
  }
  [search, gameFilter, statusFilter].forEach(el => el?.addEventListener('input', filterTournaments));

  const teamSearch = document.getElementById('team-search');
  const teamGame = document.getElementById('team-game-filter');
  const teamCards = [...document.querySelectorAll('#team-grid .team-card')];
  function filterTeams() {
    const q = (teamSearch?.value || '').trim().toLowerCase();
    const game = teamGame?.value || 'all'; let visible = 0;
    teamCards.forEach(card => {
      const ok = (!q || (card.dataset.search || '').includes(q)) && (game === 'all' || card.dataset.game === game);
      card.hidden = !ok; if (ok) visible++;
    });
    const empty = document.getElementById('team-no-results'); if (empty) empty.hidden = visible !== 0;
  }
  [teamSearch, teamGame].forEach(el => el?.addEventListener('input', filterTeams));

  document.querySelectorAll('[data-match-tab]').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('[data-match-tab]').forEach(b => b.classList.toggle('active', b === btn));
    const state = btn.dataset.matchTab;
    document.querySelectorAll('#match-list [data-state]').forEach(row => row.hidden = state !== 'all' && row.dataset.state !== state);
  }));
  document.querySelectorAll('[data-media-tab]').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('[data-media-tab]').forEach(b => b.classList.toggle('active', b === btn));
    const type = btn.dataset.mediaTab;
    document.querySelectorAll('#media-grid [data-type]').forEach(card => card.hidden = type !== 'all' && card.dataset.type !== type);
  }));

  const modal = document.getElementById('register-modal');
  const modalEvent = document.getElementById('modal-event');
  const interestForm = document.getElementById('interest-form');
  const success = document.getElementById('form-success');
  function openModal(name) {
    if (!modal) return;
    if (modalEvent) modalEvent.textContent = name || 'Selected tournament';
    if (interestForm) interestForm.hidden = false;
    if (success) success.hidden = true;
    modal.hidden = false; document.body.classList.add('modal-open');
  }
  function closeModal() { if (modal) modal.hidden = true; document.body.classList.remove('modal-open'); }
  document.querySelectorAll('[data-register]').forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.register)));
  document.querySelectorAll('[data-close-modal]').forEach(btn => btn.addEventListener('click', closeModal));
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  interestForm?.addEventListener('submit', e => { e.preventDefault(); interestForm.hidden = true; if (success) success.hidden = false; });

  const loginForm = document.getElementById('login-form');
  loginForm?.addEventListener('submit', e => { e.preventDefault(); const msg = document.getElementById('login-message'); if (msg) msg.textContent = 'Demo only: connect a secure authentication backend to enable sign-in.'; });
  document.getElementById('demo-login')?.addEventListener('click', () => { const msg = document.getElementById('login-message'); if (msg) msg.textContent = 'Demo account selected. No account session was created.'; });

  document.getElementById('show-create-form')?.addEventListener('click', () => { const p = document.getElementById('create-panel'); if (p) { p.hidden = false; p.scrollIntoView({behavior:'smooth',block:'start'}); } });
  document.getElementById('hide-create-form')?.addEventListener('click', () => { const p = document.getElementById('create-panel'); if (p) p.hidden = true; });
  document.getElementById('create-tournament-form')?.addEventListener('submit', e => {
    e.preventDefault(); const form = e.currentTarget; const data = new FormData(form);
    const row = document.createElement('tr');
    const wrapDiv = document.createElement('div'); wrapDiv.className = 'admin-tourney-cell';
    const thumb = document.createElement('img'); thumb.className = 'admin-tourney-thumb';
    thumb.src = 'assets/images/01_2019_Road_to_TwithCon_Esports_tournament_Camp_Mabry_(32864485487).jpg';
    thumb.alt = data.get('name');
    const textDiv = document.createElement('div');
    const name = document.createElement('strong'); name.textContent = data.get('name');
    const date = document.createElement('small'); date.textContent = 'New demo event';
    textDiv.append(name, date);
    wrapDiv.append(thumb, textDiv);
    const nameCell = document.createElement('td'); nameCell.append(wrapDiv);
    const gameCell = document.createElement('td'); gameCell.textContent = data.get('game');
    const formatCell = document.createElement('td'); formatCell.textContent = 'Custom Bracket';
    const statusCell = document.createElement('td'); statusCell.innerHTML = '<span class="pill pill-open">Draft</span>';
    const teamsCell = document.createElement('td'); teamsCell.textContent = '0 / ' + data.get('capacity');
    const prizeCell = document.createElement('td'); prizeCell.textContent = data.get('prize');
    const actionCell = document.createElement('td'); actionCell.innerHTML = '<a class="text-link" href="tournament-detail.html">Manage bracket</a>';
    row.append(nameCell, gameCell, formatCell, statusCell, teamsCell, prizeCell, actionCell);
    document.getElementById('admin-tournament-table')?.prepend(row);
    const metric = document.getElementById('metric-tournaments'); if (metric) metric.textContent = String(Number(metric.textContent) + 1);
    form.reset(); document.getElementById('create-panel').hidden = true;
  });
  document.querySelectorAll('[data-approve]').forEach(btn => btn.addEventListener('click', () => {
    const row = btn.closest('.registration-row'); const pill = row?.querySelector('.pill');
    if (pill) { pill.textContent = 'Approved (demo)'; pill.classList.remove('pill-open'); pill.classList.add('pill-live'); }
    btn.disabled = true; btn.textContent = 'Approved';
  }));
  document.querySelectorAll('[data-score]').forEach(btn => btn.addEventListener('click', () => {
    const result = prompt('Enter a sample score (e.g. VTX 2 - 1 RAV):');
    if (result) { const match = btn.closest('.match-row'); const title = match?.querySelector('.match-game strong'); if (title) title.textContent = title.textContent.split(' · ')[0] + ' — ' + result; }
  }));

  document.querySelectorAll('[data-home-game-filter]').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('[data-home-game-filter]').forEach(p => p.classList.toggle('active', p === pill));
      const target = pill.dataset.homeGameFilter;
      document.querySelectorAll('#home-tournament-grid .event-card').forEach(card => {
        card.hidden = target !== 'all' && card.dataset.game !== target;
      });
    });
  });

  document.querySelectorAll('[data-admin-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-admin-filter]').forEach(b => b.classList.toggle('active', b === btn));
      const filter = btn.dataset.adminFilter;
      document.querySelectorAll('#admin-tournament-table tr').forEach(row => {
        if (filter === 'all') {
          row.hidden = false;
        } else {
          const pill = row.querySelector('.pill');
          const text = (pill?.textContent || '').toLowerCase();
          row.hidden = !text.includes(filter);
        }
      });
    });
  });

  // PURE BRIGHT MODE (No toggle needed)
  document.documentElement.removeAttribute('data-theme');
  try { localStorage.removeItem('arena_theme'); } catch (e) {}

  // BACK TO TOP BUTTON LOGIC
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // NEWSLETTER SUBSCRIPTION HANDLER
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button');
      const input = newsletterForm.querySelector('input[type="email"]');
      if (btn) {
        const origText = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.disabled = true;
        if (input) input.value = '';
        setTimeout(() => {
          btn.textContent = origText;
          btn.disabled = false;
        }, 3000);
      }
    });
  }

});