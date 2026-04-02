let state = {
  transactions: [],
  role: 'admin',
  theme: 'dark',
  editingId: null
};

let sortState = { key: 'date', dir: 'desc' };

const CATS = ['Food','Transport','Shopping','Housing','Healthcare','Entertainment','Utilities','Salary','Freelance','Investment','Other'];
const CAT_COLORS = {
  Food:'#00e5a0', Transport:'#4d8fff', Shopping:'#f5c542', Housing:'#a78bfa',
  Healthcare:'#ff5f5f', Entertainment:'#ff9f43', Utilities:'#5bc8ff',
  Salary:'#00e5a0', Freelance:'#4d8fff', Investment:'#a78bfa', Other:'#8494b8'
};

const SEED = [
  {id:1,  desc:'Monthly Salary',      amount:65000, type:'income',  category:'Salary',        date:'2024-11-01'},
  {id:2,  desc:'Apartment Rent',       amount:18000, type:'expense', category:'Housing',       date:'2024-11-03'},
  {id:3,  desc:'Grocery Store',        amount:3200,  type:'expense', category:'Food',          date:'2024-11-05'},
  {id:4,  desc:'Freelance Project',    amount:12000, type:'income',  category:'Freelance',     date:'2024-11-07'},
  {id:5,  desc:'Ola / Uber Rides',     amount:1400,  type:'expense', category:'Transport',     date:'2024-11-08'},
  {id:6,  desc:'Netflix + Spotify',    amount:850,   type:'expense', category:'Entertainment', date:'2024-11-10'},
  {id:7,  desc:'Doctor Consultation',  amount:500,   type:'expense', category:'Healthcare',    date:'2024-11-12'},
  {id:8,  desc:'Electricity Bill',     amount:2100,  type:'expense', category:'Utilities',     date:'2024-11-14'},
  {id:9,  desc:'Online Shopping',      amount:4500,  type:'expense', category:'Shopping',      date:'2024-11-16'},
  {id:10, desc:'Monthly Salary',       amount:65000, type:'income',  category:'Salary',        date:'2024-12-01'},
  {id:11, desc:'Apartment Rent',       amount:18000, type:'expense', category:'Housing',       date:'2024-12-03'},
  {id:12, desc:'Restaurant Dinner',    amount:2200,  type:'expense', category:'Food',          date:'2024-12-06'},
  {id:13, desc:'Mutual Fund Return',   amount:5200,  type:'income',  category:'Investment',    date:'2024-12-08'},
  {id:14, desc:'Petrol',               amount:1200,  type:'expense', category:'Transport',     date:'2024-12-10'},
  {id:15, desc:'New Clothes',          amount:3800,  type:'expense', category:'Shopping',      date:'2024-12-14'},
  {id:16, desc:'Utility Bills',        amount:1900,  type:'expense', category:'Utilities',     date:'2024-12-17'},
  {id:17, desc:'Monthly Salary',       amount:65000, type:'income',  category:'Salary',        date:'2025-01-01'},
  {id:18, desc:'Apartment Rent',       amount:18000, type:'expense', category:'Housing',       date:'2025-01-03'},
  {id:19, desc:'Swiggy / Zomato',      amount:2800,  type:'expense', category:'Food',          date:'2025-01-07'},
  {id:20, desc:'Gym Membership',       amount:1500,  type:'expense', category:'Healthcare',    date:'2025-01-09'},
  {id:21, desc:'Freelance Project',    amount:15000, type:'income',  category:'Freelance',     date:'2025-01-11'},
  {id:22, desc:'Bus Pass',             amount:600,   type:'expense', category:'Transport',     date:'2025-01-13'},
  {id:23, desc:'Entertainment',        amount:1200,  type:'expense', category:'Entertainment', date:'2025-01-18'},
  {id:24, desc:'Monthly Salary',       amount:65000, type:'income',  category:'Salary',        date:'2025-02-01'},
  {id:25, desc:'Apartment Rent',       amount:18000, type:'expense', category:'Housing',       date:'2025-02-03'},
  {id:26, desc:'Amazon Order',         amount:5500,  type:'expense', category:'Shopping',      date:'2025-02-06'},
  {id:27, desc:'Dividend Received',    amount:3800,  type:'income',  category:'Investment',    date:'2025-02-10'},
  {id:28, desc:'Electricity Bill',     amount:2300,  type:'expense', category:'Utilities',     date:'2025-02-14'},
  {id:29, desc:'Zomato Dinner',        amount:1800,  type:'expense', category:'Food',          date:'2025-02-18'},
  {id:30, desc:'Monthly Salary',       amount:65000, type:'income',  category:'Salary',        date:'2025-03-01'},
  {id:31, desc:'Apartment Rent',       amount:18000, type:'expense', category:'Housing',       date:'2025-03-03'},
  {id:32, desc:'Medical Bills',        amount:3200,  type:'expense', category:'Healthcare',    date:'2025-03-07'},
  {id:33, desc:'Freelance Project',    amount:18000, type:'income',  category:'Freelance',     date:'2025-03-10'},
  {id:34, desc:'Grocery Shopping',     amount:3600,  type:'expense', category:'Food',          date:'2025-03-14'},
  {id:35, desc:'Cab Rides',            amount:1600,  type:'expense', category:'Transport',     date:'2025-03-18'},
  {id:36, desc:'OTT Subscriptions',    amount:850,   type:'expense', category:'Entertainment', date:'2025-03-20'},
];
function loadState() {
  try {
    const saved = localStorage.getItem('fintrack_txns');
    state.transactions = saved ? JSON.parse(saved) : SEED.map(t => ({...t}));
    const th = localStorage.getItem('fintrack_theme');
    if (th) state.theme = th;
    const role = localStorage.getItem('fintrack_role');
    if (role) state.role = role;
  } catch(e) {
    state.transactions = SEED.map(t => ({...t}));
  }
}

function saveState() {
  try { 
    localStorage.setItem('fintrack_txns', JSON.stringify(state.transactions)); 
    localStorage.setItem('fintrack_role', state.role);
  } catch(e) {}
}

const fmt = n => '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });
const fmtDate = d => new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
const monthKey = d => d.slice(0, 7);
const monthLabel = k => { const [y, m] = k.split('-'); return new Date(y, +m-1, 1).toLocaleDateString('en-IN', { month:'short', year:'2-digit' }); };
const uid = () => Date.now() + Math.random();
const escHtml = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

function getMonthlyData() {
  const map = {};
  state.transactions.forEach(t => {
    const k = monthKey(t.date);
    if (!map[k]) map[k] = { income: 0, expense: 0 };
    map[k][t.type] += t.amount;
  });
  return map;
}

function getCatExpenses() {
  const map = {};
  state.transactions.filter(t => t.type === 'expense').forEach(t => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return map;
}

function animateCount(el, target, prefix = '') {
  const start = Date.now();
  const duration = 700;
  const startVal = 0;
  const tick = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * ease);
    el.textContent = prefix + Number(current).toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = prefix + Number(target).toLocaleString('en-IN');
  };
  requestAnimationFrame(tick);
}
const PAGE_META = {
  dashboard:    { heading: 'Dashboard',    sub: 'Your financial overview' },
  transactions: { heading: 'Transactions', sub: 'Manage your records' },
  insights:     { heading: 'Insights',     sub: 'Patterns & analysis' },
};

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelector(`.nav-item[data-page="${page}"]`).classList.add('active');
  document.getElementById('pageHeading').textContent = PAGE_META[page].heading;
  document.getElementById('pageSub').textContent = PAGE_META[page].sub;
  if (page === 'dashboard')    renderDashboard();
  if (page === 'transactions') renderTransactions();
  if (page === 'insights')     renderInsights();
  closeSidebar();
}

document.querySelectorAll('.nav-item').forEach(n => {
  n.addEventListener('click', () => navigate(n.dataset.page));
});
function applyRole() {
  const isAdmin = state.role === 'admin';
  document.querySelectorAll('.admin-only').forEach(el => {
    el.style.display = isAdmin ? '' : 'none';
  });
  document.getElementById('roleIndicator').innerHTML = isAdmin
    ? '<span class="role-dot admin"></span><span class="role-desc">Full access — can add &amp; edit</span>'
    : '<span class="role-dot viewer"></span><span class="role-desc">View only — read access</span>';
  const vm = document.getElementById('viewerMsg');
  if (vm) vm.style.display = isAdmin ? 'none' : 'flex';
  if (document.getElementById('page-transactions').classList.contains('active')) renderTransactions();
}

document.getElementById('roleSelector').addEventListener('change', function() {
  state.role = this.value;
  applyRole();
  saveState();
  showToast(state.role === 'admin' ? 'Switched to Admin mode' : 'Switched to Viewer mode', '🔄');
});
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  document.getElementById('themeToggle').textContent = state.theme === 'dark' ? '🌙' : '☀️';
  try { localStorage.setItem('fintrack_theme', state.theme); } catch(e) {}
  renderDashboard();
}
function renderDashboard() {
  renderCards();
  renderBarChart();
  renderDonut();
  renderRecentTxns();
  document.getElementById('txnBadge').textContent = state.transactions.length;
}

function renderCards() {
  const totalIncome  = state.transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = state.transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;
  const savings = totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;

  const cards = [
    { cls:'c-green', icon:'💰', ico:'ig', trend:'up',   trendTxt:`↑ ${savings}% saved`, label:'Net Balance',    val:balance,      sub:'Across all time periods' },
    { cls:'c-blue',  icon:'📥', ico:'ib', trend:'up',   trendTxt:'↑ Total',              label:'Total Income',   val:totalIncome,  sub:`${state.transactions.filter(t=>t.type==='income').length} transactions` },
    { cls:'c-red',   icon:'📤', ico:'ir', trend:'down', trendTxt:'↓ Spent',              label:'Total Expenses', val:totalExpense, sub:`${state.transactions.filter(t=>t.type==='expense').length} transactions` },
    { cls:'c-gold',  icon:'📋', ico:'io', trend: savings>=20?'up':'down', trendTxt:savings>=20?'↑ Good':'↓ Low', label:'Savings Rate', val:savings, sub:'Of total income saved', isPercent:true },
  ];

  document.getElementById('cardsRow').innerHTML = cards.map((c, i) => `
    <div class="summary-card ${c.cls}" style="transition-delay:${i * 80}ms">
      <div class="sc-top">
        <div class="sc-icon ${c.ico}">${c.icon}</div>
        <span class="sc-trend ${c.trend}">${c.trendTxt}</span>
      </div>
      <div class="sc-label">${c.label}</div>
      <div class="sc-value" data-val="${c.val}" data-percent="${c.isPercent||false}">
        ${c.isPercent ? savings + '%' : fmt(c.val)}
      </div>
      <div class="sc-sub">${c.sub}</div>
    </div>
  `).join('');

  requestAnimationFrame(() => {
    document.querySelectorAll('.summary-card').forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('visible');
        if (!card.querySelector('[data-percent="true"]')) {
          const el = card.querySelector('.sc-value');
          const val = Math.abs(parseInt(el.dataset.val));
          animateCount(el, val, '₹');
        }
      }, i * 80);
    });
    setTimeout(() => {
      document.querySelectorAll('.progress-fill').forEach(el => {
        const target = el.dataset.target;
        if (target) el.style.width = target + '%';
      });
    }, 300);
  });
}

function renderBarChart() {
  const monthly = getMonthlyData();
  const keys = Object.keys(monthly).sort().slice(-6);
  const svg = document.getElementById('barChartSvg');
  const W = svg.parentElement.offsetWidth || 500;
  const H = 180;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('width', W);

  const maxVal = Math.max(...keys.map(k => monthly[k].income + monthly[k].expense), 1);
  const padL = 40, padR = 16, padB = 30, padT = 10;
  const chartW = W - padL - padR;
  const chartH = H - padB - padT;
  const bw = Math.floor(chartW / keys.length);
  const bGap = 6;

  let html = '';

  [0.25, 0.5, 0.75, 1].forEach(f => {
    const y = padT + chartH * (1 - f);
    html += `<line x1="${padL}" y1="${y}" x2="${W-padR}" y2="${y}" stroke="var(--border)" stroke-width="1"/>`;
    html += `<text x="${padL-4}" y="${y+4}" text-anchor="end" font-size="9" fill="var(--muted)" font-family="'Times New Roman',Times,serif">${Math.round(maxVal*f/1000)}k</text>`;
  });

  keys.forEach((k, i) => {
    const d = monthly[k];
    const x = padL + i * bw;
    const bWidth = Math.floor((bw - bGap * 2) / 2);

    const incH = Math.round((d.income / maxVal) * chartH);
    const expH = Math.round((d.expense / maxVal) * chartH);
    const animDelay = i * 60;

    html += `<rect class="chart-bar" x="${x+bGap}" y="${padT + chartH - incH}" width="${bWidth}" height="${incH}" rx="3" fill="var(--accent)" opacity=".85">
      <title>${monthLabel(k)} Income: ${fmt(d.income)}</title>
      <animate attributeName="height" from="0" to="${incH}" dur=".5s" begin="${animDelay}ms" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
      <animate attributeName="y" from="${padT + chartH}" to="${padT + chartH - incH}" dur=".5s" begin="${animDelay}ms" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
    </rect>`;

    html += `<rect class="chart-bar" x="${x+bGap+bWidth+2}" y="${padT + chartH - expH}" width="${bWidth}" height="${expH}" rx="3" fill="var(--red)" opacity=".75">
      <title>${monthLabel(k)} Expense: ${fmt(d.expense)}</title>
      <animate attributeName="height" from="0" to="${expH}" dur=".5s" begin="${animDelay + 30}ms" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
      <animate attributeName="y" from="${padT + chartH}" to="${padT + chartH - expH}" dur=".5s" begin="${animDelay + 30}ms" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
    </rect>`;

    html += `<text x="${x + bw/2}" y="${H-8}" text-anchor="middle" font-size="9.5" fill="var(--muted)" font-family="'Times New Roman',Times,serif">${monthLabel(k)}</text>`;
  });

  html += `<rect x="${padL}" y="${padT}" width="10" height="10" rx="2" fill="var(--accent)"/>`;
  html += `<text x="${padL+14}" y="${padT+9}" font-size="9.5" fill="var(--muted2)" font-family="'Times New Roman',Times,serif">Income</text>`;
  html += `<rect x="${padL+60}" y="${padT}" width="10" height="10" rx="2" fill="var(--red)"/>`;
  html += `<text x="${padL+74}" y="${padT+9}" font-size="9.5" fill="var(--muted2)" font-family="'Times New Roman',Times,serif">Expense</text>`;

  svg.innerHTML = html;
}

function renderDonut() {
  const catExp = getCatExpenses();
  const entries = Object.entries(catExp).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const total = entries.reduce((s, [, v]) => s + v, 0);

  if (!total) {
    document.getElementById('donutWrap').innerHTML = '<div style="color:var(--muted);font-size:.85rem">No expense data</div>';
    return;
  }

  const R = 60, cx = 70, cy = 70, stroke = 22;
  let startAngle = -Math.PI / 2;
  let paths = '';

  entries.forEach(([cat, val]) => {
    const angle = (val / total) * Math.PI * 2;
    const x1 = cx + R * Math.cos(startAngle);
    const y1 = cy + R * Math.sin(startAngle);
    const x2 = cx + R * Math.cos(startAngle + angle);
    const y2 = cy + R * Math.sin(startAngle + angle);
    const large = angle > Math.PI ? 1 : 0;
    const color = CAT_COLORS[cat] || '#8494b8';
    paths += `<path d="M${cx},${cy} L${x1},${y1} A${R},${R},0,${large},1,${x2},${y2} Z"
      fill="${color}" opacity=".85" stroke="var(--surface)" stroke-width="2"
      style="transition:opacity .2s;cursor:pointer" onmouseover="this.style.opacity='.65'" onmouseout="this.style.opacity='.85'">
      <title>${cat}: ${fmt(val)}</title>
    </path>`;
    startAngle += angle;
  });

  paths += `<circle cx="${cx}" cy="${cy}" r="${R - stroke}" fill="var(--surface)"/>`;
  const pct = Math.round((entries[0][1] / total) * 100);
  paths += `<text x="${cx}" y="${cy-4}" text-anchor="middle" font-size="13" font-weight="700" fill="var(--text)" font-family="'Times New Roman',Times,serif">${entries[0][0]}</text>`;
  paths += `<text x="${cx}" y="${cy+13}" text-anchor="middle" font-size="10" fill="var(--muted)" font-family="'Times New Roman',Times,serif">${pct}% of spend</text>`;

  let legend = '<div class="donut-legend">';
  entries.forEach(([cat, val]) => {
    const p = Math.round((val / total) * 100);
    const c = CAT_COLORS[cat] || '#8494b8';
    legend += `<div class="dl-item">
      <div class="dl-dot" style="background:${c}"></div>
      <span class="dl-name">${cat}</span>
      <span class="dl-pct">${p}%</span>
      <span class="dl-amt">${fmt(val)}</span>
    </div>`;
  });
  legend += '</div>';

  document.getElementById('donutWrap').innerHTML =
    `<svg class="donut-svg" width="140" height="140" viewBox="0 0 140 140">${paths}</svg>${legend}`;
}

function renderRecentTxns() {
  const recent = [...state.transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const tbody = document.getElementById('recentTbody');
  if (!recent.length) {
    tbody.innerHTML = '<tr><td colspan="5"><div class="empty-state"><div class="e-icon">📭</div><p>No transactions yet</p></div></td></tr>';
    return;
  }
  tbody.innerHTML = recent.map(t => `
    <tr>
      <td><div class="txn-desc">${escHtml(t.desc)}</div></td>
      <td><div class="txn-date">${fmtDate(t.date)}</div></td>
      <td><span class="cat-tag">${t.category}</span></td>
      <td><span class="badge badge-${t.type}">${t.type}</span></td>
      <td style="text-align:right"><span class="amount-cell ${t.type}">${t.type==='income'?'+':'-'}${fmt(t.amount)}</span></td>
    </tr>
  `).join('');
}
function populateFilters() {
  const prevCat = document.getElementById('filterCat').value;
  const prevMonth = document.getElementById('filterMonth').value;

  const cats = [...new Set(state.transactions.map(t => t.category))].sort();
  const months = [...new Set(state.transactions.map(t => monthKey(t.date)))].sort().reverse();

  const fc = document.getElementById('filterCat');
  fc.innerHTML = '<option value="all">All Categories</option>' +
    cats.map(c => `<option value="${c}">${c}</option>`).join('');
  fc.value = cats.includes(prevCat) ? prevCat : 'all';

  const fm = document.getElementById('filterMonth');
  fm.innerHTML = '<option value="all">All Months</option>' +
    months.map(m => `<option value="${m}">${monthLabel(m)}</option>`).join('');
  fm.value = months.includes(prevMonth) ? prevMonth : 'all';
}

function sortBy(key) {
  sortState.dir = sortState.key === key ? (sortState.dir === 'asc' ? 'desc' : 'asc') : 'asc';
  sortState.key = key;

  document.querySelectorAll('thead th').forEach(th => th.classList.remove('sorted'));
  const colMap = { desc:0, date:1, category:2, type:3, amount:4 };
  const ths = document.querySelectorAll('#page-transactions thead th');
  const th = ths[colMap[key]];
  if (th) {
    th.classList.add('sorted');
    const arrow = th.querySelector('.sort-arrow');
    if (arrow) arrow.textContent = sortState.dir === 'asc' ? '↑' : '↓';
  }
  renderTransactions();
}

function getFilteredTxns() {
  const q      = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const fType  = document.getElementById('filterType')?.value  || 'all';
  const fCat   = document.getElementById('filterCat')?.value   || 'all';
  const fMonth = document.getElementById('filterMonth')?.value || 'all';

  let arr = state.transactions.filter(t => {
    if (q && !t.desc.toLowerCase().includes(q) && !t.category.toLowerCase().includes(q)) return false;
    if (fType  !== 'all' && t.type !== fType) return false;
    if (fCat   !== 'all' && t.category !== fCat) return false;
    if (fMonth !== 'all' && monthKey(t.date) !== fMonth) return false;
    return true;
  });

  const { key, dir } = sortState;
  arr.sort((a, b) => {
    let va = a[key], vb = b[key];
    if (key === 'amount') { va = +va; vb = +vb; }
    if (va < vb) return dir === 'asc' ? -1 : 1;
    if (va > vb) return dir === 'asc' ?  1 : -1;
    return 0;
  });

  return arr;
}

function renderTransactions() {
  populateFilters();
  const filtered = getFilteredTxns();
  const isAdmin = state.role === 'admin';

  const cnt = document.getElementById('txnCount');
  if (cnt) cnt.textContent = `${filtered.length} record${filtered.length !== 1 ? 's' : ''}`;

  const vm = document.getElementById('viewerMsg');
  if (vm) vm.style.display = isAdmin ? 'none' : 'flex';

  const actHdr = document.getElementById('actionsHeader');
  if (actHdr) actHdr.style.display = isAdmin ? '' : 'none';

  const tbody = document.getElementById('txnTbody');
  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state">
      <div class="e-icon">🔍</div><p>No transactions match your filters.</p>
    </div></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(t => `
    <tr>
      <td><div class="txn-desc">${escHtml(t.desc)}</div></td>
      <td><div class="txn-date">${fmtDate(t.date)}</div></td>
      <td><span class="cat-tag">${t.category}</span></td>
      <td><span class="badge badge-${t.type}">${t.type}</span></td>
      <td style="text-align:right"><span class="amount-cell ${t.type}">${t.type==='income'?'+':'-'}${fmt(t.amount)}</span></td>
      ${isAdmin
        ? `<td><div class="action-cell">
            <button class="btn btn-edit btn-sm" onclick="editTransaction(${t.id})">✏️ Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${t.id})">🗑</button>
           </div></td>`
        : '<td style="display:none"></td>'}
    </tr>
  `).join('');
}

// ==================== INSIGHTS PAGE ====================
function renderInsights() {
  const totalIncome  = state.transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = state.transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const savings = totalIncome > 0 ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0;
  const catExp  = getCatExpenses();
  const topCat  = Object.entries(catExp).sort((a, b) => b[1] - a[1])[0] || ['—', 0];
  const monthly = getMonthlyData();
  const mKeys   = Object.keys(monthly).sort();
  const avgExp  = mKeys.length ? Math.round(Object.values(monthly).reduce((s, m) => s + m.expense, 0) / mKeys.length) : 0;

  const topPct  = totalExpense ? Math.round((topCat[1] / totalExpense) * 100) : 0;

  document.getElementById('insightsTop').innerHTML = `
    <div class="insight-card">
      <div class="i-label">Highest Spending Category</div>
      <div class="i-val" style="color:var(--red)">${topCat[0]}</div>
      <div class="i-sub">${fmt(topCat[1])} total spent</div>
      <div class="progress-bar-wrap">
        <div class="progress-bar" style="margin-top:10px">
          <div class="progress-fill" data-target="${topPct}" style="background:var(--red)"></div>
        </div>
        <div style="font-size:.72rem;color:var(--muted);margin-top:4px">${topPct}% of total expenses</div>
      </div>
    </div>
    <div class="insight-card">
      <div class="i-label">Savings Rate</div>
      <div class="i-val" style="color:${savings>=20?'var(--accent)':'var(--gold)'}">${savings}%</div>
      <div class="i-sub">Income − Expenses ÷ Income</div>
      <div class="progress-bar-wrap">
        <div class="progress-bar" style="margin-top:10px">
          <div class="progress-fill" data-target="${Math.min(savings,100)}" style="background:${savings>=20?'var(--accent)':'var(--gold)'}"></div>
        </div>
        <div style="font-size:.72rem;color:var(--muted);margin-top:4px">${savings>=30?'Excellent 🎉':savings>=20?'Good 👍':savings>=10?'Fair ⚠️':'Needs attention 🔴'}</div>
      </div>
    </div>
    <div class="insight-card">
      <div class="i-label">Avg Monthly Expense</div>
      <div class="i-val" style="color:var(--accent2)">${fmt(avgExp)}</div>
      <div class="i-sub">Over ${mKeys.length} month${mKeys.length!==1?'s':''}</div>
      <div class="i-sub" style="margin-top:6px">Total: ${fmt(totalExpense)}</div>
    </div>
  `;

  requestAnimationFrame(() => {
    document.querySelectorAll('.progress-fill[data-target]').forEach(el => {
      setTimeout(() => { el.style.width = el.dataset.target + '%'; }, 100);
    });
  });

  const last4 = mKeys.slice(-4);
  document.getElementById('monthlyGrid').innerHTML = last4.map(k => {
    const d = monthly[k];
    const net = d.income - d.expense;
    return `<div class="month-cell">
      <div class="month-name">${monthLabel(k)}</div>
      <div class="month-row"><span>Income</span><span class="pos">${fmt(d.income)}</span></div>
      <div class="month-row"><span>Expense</span><span class="neg">${fmt(d.expense)}</span></div>
      <div class="month-row" style="border-top:1px solid var(--border);padding-top:4px;margin-top:4px">
        <span>Net</span><span class="${net>=0?'pos':'neg'}">${fmt(net)}</span>
      </div>
    </div>`;
  }).join('');

  const topCats = Object.entries(catExp).sort((a, b) => b[1] - a[1]);
  const obs = [];
  if (topCats.length) obs.push({ color:'var(--red)',   text:`Biggest expense: <strong>${topCats[0][0]}</strong> at ${fmt(topCats[0][1])}, making up ${Math.round((topCats[0][1]/totalExpense)*100)}% of total.` });
  if (savings >= 20) obs.push({ color:'var(--accent)', text:`Savings rate is <strong>${savings}%</strong> — above the recommended 20% threshold. Keep it up!` });
  else obs.push({ color:'var(--gold)', text:`Savings rate is only <strong>${savings}%</strong>. Cutting back on <strong>${topCats[0]?.[0]||'non-essentials'}</strong> could help.` });

  if (last4.length >= 2) {
    const prev = monthly[last4[last4.length - 2]];
    const curr = monthly[last4[last4.length - 1]];
    const diff = curr.expense - prev.expense;
    if (diff > 0) obs.push({ color:'var(--purple)', text:`Expenses went up by <strong>${fmt(Math.abs(diff))}</strong> compared to last month.` });
    else obs.push({ color:'var(--accent)', text:`Expenses dropped by <strong>${fmt(Math.abs(diff))}</strong> from last month — good discipline!` });
  }

  const housingAmt = catExp['Housing'] || 0;
  if (housingAmt && totalIncome) {
    const hp = Math.round((housingAmt / totalIncome) * 100);
    if (hp > 30) obs.push({ color:'var(--purple)', text:`Housing costs are <strong>${hp}%</strong> of income. Advisors recommend keeping this below 30%.` });
  }

  document.getElementById('obsList').innerHTML = obs.map(o =>
    `<div class="obs-item">
      <div class="obs-bullet" style="background:${o.color}"></div>
      <div class="obs-text">${o.text}</div>
    </div>`
  ).join('');
}
function openModal(id = null) {
  if (state.role !== 'admin') return;
  state.editingId = id;
  document.getElementById('modalTitle').textContent = id ? 'Edit Transaction' : 'Add Transaction';
  document.getElementById('saveBtn').textContent = id ? 'Update' : 'Save';

  if (id) {
    const t = state.transactions.find(x => x.id === id);
    if (!t) return;
    document.getElementById('fDesc').value   = t.desc;
    document.getElementById('fAmount').value = t.amount;
    document.getElementById('fDate').value   = t.date;
    document.getElementById('fType').value   = t.type;
    document.getElementById('fCat').value    = t.category;
  } else {
    document.getElementById('fDesc').value   = '';
    document.getElementById('fAmount').value = '';
    document.getElementById('fDate').value   = new Date().toISOString().slice(0, 10);
    document.getElementById('fType').value   = 'expense';
    document.getElementById('fCat').value    = 'Food';
  }
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  state.editingId = null;
}

document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

function saveTransaction() {
  const desc   = document.getElementById('fDesc').value.trim();
  const amount = parseFloat(document.getElementById('fAmount').value);
  const date   = document.getElementById('fDate').value;
  const type   = document.getElementById('fType').value;
  const cat    = document.getElementById('fCat').value;

  if (!desc || isNaN(amount) || amount <= 0 || !date) {
    showToast('Please fill all fields correctly.', '⚠️');
    return;
  }

  if (state.editingId) {
    const t = state.transactions.find(x => x.id === state.editingId);
    if (t) Object.assign(t, { desc, amount, date, type, category: cat });
    showToast('Transaction updated!', '✅');
  } else {
    state.transactions.push({ id: uid(), desc, amount, type, category: cat, date });
    showToast('Transaction added!', '✅');
  }

  saveState();
  closeModal();
  renderDashboard();
  if (document.getElementById('page-transactions').classList.contains('active')) renderTransactions();
  document.getElementById('txnBadge').textContent = state.transactions.length;
}

function editTransaction(id) {
  if (state.role !== 'admin') return;
  navigate('transactions');
  setTimeout(() => openModal(id), 50);
}

function deleteTransaction(id) {
  if (state.role !== 'admin') return;
  if (!confirm('Delete this transaction?')) return;
  state.transactions = state.transactions.filter(t => t.id !== id);
  saveState();
  renderTransactions();
  renderDashboard();
  showToast('Transaction deleted.', '🗑️');
}
function exportData() {
  const csv = [
    ['ID', 'Description', 'Amount', 'Type', 'Category', 'Date'],
    ...state.transactions.map(t => [t.id, `"${t.desc}"`, t.amount, t.type, t.category, t.date])
  ].map(r => r.join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'fintrack_transactions.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Exported as CSV!', '⬇️');
}
let toastTimer;
function showToast(msg, icon = '✅') {
  clearTimeout(toastTimer);
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent  = msg;
  document.getElementById('toastIcon').textContent = icon;
  t.classList.add('show');
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const bd = document.getElementById('sidebarBackdrop');
  const open = sb.classList.toggle('open');
  bd.style.display = open ? 'block' : 'none';
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarBackdrop').style.display = 'none';
}
function init() {
  loadState();
  document.documentElement.setAttribute('data-theme', state.theme);
  document.getElementById('themeToggle').textContent = state.theme === 'dark' ? '🌙' : '☀️';
  document.getElementById('roleSelector').value = state.role;
  applyRole();
  renderDashboard();
  window.addEventListener('resize', () => {
    if (document.getElementById('page-dashboard').classList.contains('active')) renderBarChart();
  });
  setTimeout(renderBarChart, 300);
}

init();