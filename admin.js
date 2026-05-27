/* =============================================
   ADMIN.JS — Admin Panel Logic
   ============================================= */

// ── Auth ──────────────────────────────────────
const HASH_KEY    = 'admin_pw_hash';
const SESSION_KEY = 'admin_session';

// ── Firebase Configuration ─────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyBUjyPpgaiS4ndlSiEuMDUwnkJgx9btDHw",
  authDomain: "hama-portfolio.firebaseapp.com",
  projectId: "hama-portfolio",
  storageBucket: "hama-portfolio.firebasestorage.app",
  messagingSenderId: "112470438769",
  appId: "1:112470438769:web:d544900ba6c023b856fcd0",
  measurementId: "G-CTSN40HE4B"
};

let db = null;
if (typeof firebase !== 'undefined') {
  try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
  } catch (e) {
    console.error("Firebase init failed:", e);
  }
}

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

// Salted stretched hashing (10,000 rounds)
async function secureHash(password, salt) {
  let combined = password + salt;
  let hash = combined;
  for (let i = 0; i < 10000; i++) {
    hash = await sha256(hash);
  }
  return hash;
}

// Lockout check
let lockoutTimerInterval = null;

function checkLockout() {
  const lockoutUntil = parseInt(localStorage.getItem('admin_lockout_until') || '0');
  const now = Date.now();

  if (lockoutUntil > now) {
    document.getElementById('lockout-overlay').style.display = 'block';
    document.getElementById('login-fields-wrap').style.display = 'none';
    
    updateLockoutCountdown(lockoutUntil);
    if (!lockoutTimerInterval) {
      lockoutTimerInterval = setInterval(() => {
        updateLockoutCountdown(lockoutUntil);
      }, 1000);
    }
    return true;
  } else {
    document.getElementById('lockout-overlay').style.display = 'none';
    document.getElementById('login-fields-wrap').style.display = 'block';
    if (lockoutTimerInterval) {
      clearInterval(lockoutTimerInterval);
      lockoutTimerInterval = null;
    }
    return false;
  }
}

function updateLockoutCountdown(lockoutUntil) {
  const now = Date.now();
  const diff = lockoutUntil - now;
  if (diff <= 0) {
    localStorage.setItem('admin_failed_attempts', '0');
    localStorage.removeItem('admin_lockout_until');
    checkLockout();
    return;
  }
  const mins = Math.floor(diff / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  document.getElementById('lockout-timer').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Idle logout timeout (15 minutes)
let idleTimeout = null;
const IDLE_TIME = 15 * 60 * 1000;

function initIdleTimeout() {
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
  events.forEach(name => {
    document.addEventListener(name, resetIdleTimer, { passive: true });
  });
  resetIdleTimer();
}

function resetIdleTimer() {
  if (idleTimeout) clearTimeout(idleTimeout);
  idleTimeout = setTimeout(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session) {
      logout();
      showAdminToast('⚠️ Session expired due to inactivity', 'error');
    }
  }, IDLE_TIME);
}

// On load: check session or show login
document.addEventListener('DOMContentLoaded', async () => {
  const session = sessionStorage.getItem(SESSION_KEY);
  const SEED_FLAG = 'admin_seeded_2026_v2';
  let hash = localStorage.getItem(HASH_KEY);

  // Force-migrate to default secure credentials if seed flag not set
  if (localStorage.getItem(SEED_FLAG) !== 'true') {
    const defaultUser = 'hamait';
    const defaultPass = 'HAma12210';
    
    // Generate secure random salt
    const saltArray = new Uint8Array(16);
    crypto.getRandomValues(saltArray);
    const salt = Array.from(saltArray).map(b => b.toString(16).padStart(2,'0')).join('');
    
    // Create stretched hash
    hash = await secureHash(defaultPass, salt);
    
    localStorage.setItem('admin_username', defaultUser);
    localStorage.setItem('admin_pw_salt', salt);
    localStorage.setItem(HASH_KEY, hash);
    localStorage.setItem('admin_failed_attempts', '0');
    localStorage.removeItem('admin_lockout_until'); // Reset lockout
    localStorage.setItem(SEED_FLAG, 'true');
  }

  // Check lockout on load
  checkLockout();

  if (session === hash) {
    showDashboard();
  } else {
    document.getElementById('login-page').style.display = 'flex';
    if (!checkLockout()) {
      const userEl = document.getElementById('login-user');
      if (userEl) userEl.focus();
    }
  }

  initIdleTimeout();
});

// Secure Login
async function login() {
  if (checkLockout()) return;

  const userEl = document.getElementById('login-user');
  const passEl = document.getElementById('login-pass');
  const errEl  = document.getElementById('login-error');
  const btn    = document.getElementById('login-btn');

  const username = userEl.value.trim();
  const password = passEl.value;

  if (!username || !password) return;

  btn.disabled = true;
  btn.textContent = 'Checking cryptographic key...';

  const storedUser = localStorage.getItem('admin_username') || 'hamait';
  const salt = localStorage.getItem('admin_pw_salt') || '';
  const hash = await secureHash(password, salt);
  const storedHash = localStorage.getItem(HASH_KEY);

  const usernameMatches = username.toLowerCase() === storedUser.toLowerCase();
  const passwordMatches = hash === storedHash;

  if (usernameMatches && passwordMatches) {
    sessionStorage.setItem(SESSION_KEY, hash);
    localStorage.setItem('admin_failed_attempts', '0');
    errEl.classList.remove('show');
    userEl.classList.remove('error');
    passEl.classList.remove('error');
    passEl.value = '';
    showDashboard();
  } else {
    let failed = parseInt(localStorage.getItem('admin_failed_attempts') || '0') + 1;
    localStorage.setItem('admin_failed_attempts', failed.toString());

    if (failed >= 5) {
      const lockoutTime = Date.now() + 5 * 60 * 1000;
      localStorage.setItem('admin_lockout_until', lockoutTime.toString());
      checkLockout();
      passEl.value = '';
      errEl.classList.remove('show');
    } else {
      errEl.textContent = `Wrong username or password. Attempt ${failed} of 5 before lockout.`;
      errEl.classList.add('show');
      userEl.classList.add('error');
      passEl.classList.add('error');
      passEl.value = '';
      passEl.focus();
      btn.disabled = false;
      btn.textContent = 'Login to Dashboard';
      
      document.querySelector('.login-card').style.animation = 'none';
      setTimeout(() => document.querySelector('.login-card').style.animation = '', 10);
    }
  }
}

function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('login-page').style.display = 'flex';
  document.getElementById('login-pass').value = '';
  document.getElementById('login-btn').disabled = false;
  document.getElementById('login-btn').textContent = 'Login to Dashboard';
  document.getElementById('login-error').classList.remove('show');
  document.getElementById('login-pass').classList.remove('error');
}

function showDashboard() {
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('dashboard').style.display = 'grid';
  loadDashboardData();
}

// ── Panel Navigation ──────────────────────────
function showPanel(name, el) {
  event && event.preventDefault();
  // Hide all panels
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  // Show target
  const panel = document.getElementById('panel-' + name);
  if (panel) panel.classList.add('active');
  // Update sidebar active
  document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
  if (el) el.classList.add('active');
  // Update topbar title
  const titles = { projects:'🚀 Projects', social:'🔗 Social Links', bio:'📝 Bio / About', settings:'🔐 Security' };
  setText('panel-title', titles[name] || name);
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ── Load Dashboard Data ───────────────────────
function loadDashboardData() {
  loadProjectsTable();
  loadSocialLinksEditor();
  loadBioEditor();
}

// ── Projects CRUD ─────────────────────────────
let loadedProjects = [];

async function addProject() {
  if (!db) {
    showAdminToast('❌ Database connection not initialized', 'error');
    return;
  }
  const icon     = document.getElementById('p-icon').value.trim() || '🌐';
  const category = document.getElementById('p-category').value;
  const url      = document.getElementById('p-url').value.trim();
  const tags     = document.getElementById('p-tags').value.trim();
  let imageUrl   = document.getElementById('p-image-url').value.trim();

  const fileInput = document.getElementById('p-image-file');
  if (fileInput && fileInput.files && fileInput.files[0]) {
    try {
      imageUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(fileInput.files[0]);
      });
    } catch (e) {
      console.error("Failed to read local image file", e);
    }
  }

  const titleKu = document.getElementById('p-title-ku').value.trim();
  const titleEn = document.getElementById('p-title-en').value.trim();

  const descKu  = document.getElementById('p-desc-ku').value.trim();
  const descEn  = document.getElementById('p-desc-en').value.trim();

  if (!titleKu && !titleEn) {
    showAdminToast('⚠️ Please enter a project title (Kurdish or English)', 'error');
    return;
  }
  if (!url) {
    showAdminToast('⚠️ Please enter a project URL', 'error');
    return;
  }

  // Fallbacks
  const finalTitleKu = titleKu || titleEn;
  const finalTitleEn = titleEn || titleKu;
  const finalDescKu  = descKu || descEn;
  const finalDescEn  = descEn || descKu;

  const idEl = document.getElementById('p-id');
  const editId = idEl ? idEl.value : '';

  const project = {
    icon,
    category,
    url,
    imageUrl,
    tags,
    title:    { ku: finalTitleKu, en: finalTitleEn, ar: finalTitleEn, fa: finalTitleEn },
    desc:     { ku: finalDescKu,  en: finalDescEn,  ar: finalDescEn,  fa: finalDescEn  }
  };

  if (editId) {
    db.collection("projects").doc(editId).update(project)
      .then(() => {
        cancelEdit();
        loadProjectsTable();
        showAdminToast('✓ Project updated successfully!', 'success');
      })
      .catch(err => {
        console.error(err);
        showAdminToast('❌ Database update failed', 'error');
      });
  } else {
    project.createdAt = new Date().toISOString();
    db.collection("projects").add(project)
      .then(() => {
        clearProjectForm();
        loadProjectsTable();
        showAdminToast('✓ Project added to database!', 'success');
      })
      .catch(err => {
        console.error(err);
        showAdminToast('❌ Database write failed', 'error');
      });
  }
}

function copyProjectsCode() {
  const cached = localStorage.getItem('portfolio_projects_cache') || '[]';
  const code = `const defaultProjects = ${cached};`;
  navigator.clipboard.writeText(code).then(() => {
    showAdminToast('✓ Config copied! Paste inside main.js!', 'success');
  }).catch(err => {
    console.error('Failed to copy', err);
    showAdminToast('❌ Failed to copy automatically.', 'error');
  });
}

function clearProjectForm() {
  ['p-id', 'p-title-ku', 'p-title-en', 'p-desc-ku', 'p-desc-en', 'p-url', 'p-image-url', 'p-image-file'].forEach(id => { 
    const el = document.getElementById(id); 
    if (el) el.value = ''; 
  });
}

function editProject(id) {
  const p = loadedProjects.find(item => item.id === id);
  if (!p) return;

  const idEl = document.getElementById('p-id');
  if (idEl) idEl.value = id;

  const titleKuEl = document.getElementById('p-title-ku');
  if (titleKuEl) titleKuEl.value = p.title?.ku || '';

  const titleEnEl = document.getElementById('p-title-en');
  if (titleEnEl) titleEnEl.value = p.title?.en || '';

  const descKuEl = document.getElementById('p-desc-ku');
  if (descKuEl) descKuEl.value = p.desc?.ku || '';

  const descEnEl = document.getElementById('p-desc-en');
  if (descEnEl) descEnEl.value = p.desc?.en || '';

  const urlEl = document.getElementById('p-url');
  if (urlEl) urlEl.value = p.url || '';

  const imageUrlEl = document.getElementById('p-image-url');
  if (imageUrlEl) imageUrlEl.value = p.imageUrl || '';

  const fileInput = document.getElementById('p-image-file');
  if (fileInput) fileInput.value = '';

  const iconEl = document.getElementById('p-icon');
  if (iconEl) iconEl.value = p.icon || '🌐';

  const categoryEl = document.getElementById('p-category');
  if (categoryEl) categoryEl.value = p.category || 'website';

  const tagsEl = document.getElementById('p-tags');
  if (tagsEl) tagsEl.value = p.tags || '';

  // UI state updates
  const formTitle = document.getElementById('p-form-title');
  if (formTitle) formTitle.innerHTML = '<span>✏️</span> Edit Project';

  const submitBtnIcon = document.getElementById('p-submit-btn-icon');
  if (submitBtnIcon) submitBtnIcon.textContent = '💾';

  const submitBtnText = document.getElementById('p-submit-btn-text');
  if (submitBtnText) submitBtnText.textContent = 'Update Project';

  const cancelBtn = document.getElementById('p-cancel-btn');
  if (cancelBtn) cancelBtn.style.display = 'inline-flex';

  // Scroll to form
  const formCard = document.querySelector('.admin-card');
  if (formCard) formCard.scrollIntoView({ behavior: 'smooth' });
}

function cancelEdit() {
  clearProjectForm();

  // UI state reverts
  const formTitle = document.getElementById('p-form-title');
  if (formTitle) formTitle.innerHTML = '<span>➕</span> Add New Project';

  const submitBtnIcon = document.getElementById('p-submit-btn-icon');
  if (submitBtnIcon) submitBtnIcon.textContent = '➕';

  const submitBtnText = document.getElementById('p-submit-btn-text');
  if (submitBtnText) submitBtnText.textContent = 'Add Project';

  const cancelBtn = document.getElementById('p-cancel-btn');
  if (cancelBtn) cancelBtn.style.display = 'none';
}

function deleteProject(id) {
  if (!db) return;
  if (!confirm('Delete this project?')) return;
  db.collection("projects").doc(id).delete()
    .then(() => {
      loadProjectsTable();
      showAdminToast('🗑️ Project deleted from database', 'success');
    })
    .catch(err => {
      console.error(err);
      showAdminToast('❌ Delete failed', 'error');
    });
}

function loadProjectsTable() {
  const tbody = document.getElementById('projects-table-body');
  if (!tbody) return;
  if (!db) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><p style="color:var(--red)">Database connection offline</p></div></td></tr>`;
    return;
  }

  db.collection("projects").orderBy("createdAt", "desc").get()
    .then(snapshot => {
      const projects = [];
      snapshot.forEach(doc => {
        projects.push({ id: doc.id, ...doc.data() });
      });

      loadedProjects = projects;

      if (projects.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><div class="empty-state-icon">🚀</div><p>No projects yet. Add your first one above!</p></div></td></tr>`;
        return;
      }

      tbody.innerHTML = projects.map(p => `
        <tr>
          <td><div class="project-table-icon">${escHtml(p.icon||'🌐')}</div></td>
          <td><strong>EN:</strong> ${escHtml(p.title?.en || '-')}<br/>
              <span style="font-size:0.78rem;color:var(--muted)"><strong>KU:</strong> ${escHtml(p.title?.ku||'-')}</span></td>
          <td><span style="font-size:0.78rem;font-weight:600;color:var(--cyan);text-transform:uppercase;letter-spacing:1px">${escHtml(p.category||'')}</span></td>
          <td><a href="${escHtml(p.url||'#')}" target="_blank" style="color:var(--cyan);text-decoration:none;font-size:0.82rem;white-space:nowrap">
              ${p.url ? (p.url.replace(/https?:\/\//,'').substring(0,30) + (p.url.length>35?'...':'')) : '-'} ↗
          </a></td>
          <td>
            <div class="table-actions">
              <button class="btn-admin btn-admin-primary btn-admin-sm" onclick="editProject('${p.id}')">✏️ Edit</button>
              <button class="btn-admin btn-admin-danger btn-admin-sm" onclick="deleteProject('${p.id}')">🗑️ Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    })
    .catch(err => {
      console.error(err);
      tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><p style="color:var(--red)">Failed to load from database</p></div></td></tr>`;
    });
}

async function clearAllProjects() {
  if (!db) return;
  if (!confirm('Are you sure? This will delete ALL projects. This cannot be undone.')) return;
  
  try {
    const snapshot = await db.collection("projects").get();
    const batch = db.batch();
    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    loadProjectsTable();
    showAdminToast('🗑️ All projects cleared from database', 'success');
  } catch (err) {
    console.error(err);
    showAdminToast('❌ Clear failed', 'error');
  }
}

// ── Social Links ──────────────────────────────
const SOCIAL_PLATFORMS = ['instagram','telegram','whatsapp','facebook','tiktok','snapchat'];

function loadSocialLinksEditor() {
  try {
    const links = JSON.parse(localStorage.getItem('portfolio_social') || '{}');
    SOCIAL_PLATFORMS.forEach(p => {
      const urlEl    = document.getElementById('sl-' + p + '-url');
      const handleEl = document.getElementById('sl-' + p + '-handle');
      if (urlEl)    urlEl.value    = links[p]?.url    || '';
      if (handleEl) handleEl.value = links[p]?.handle || '';
    });
  } catch(e) { console.error(e); }
}

function saveSocialLinks() {
  const links = {};
  SOCIAL_PLATFORMS.forEach(p => {
    const url    = document.getElementById('sl-' + p + '-url')?.value.trim()    || '';
    const handle = document.getElementById('sl-' + p + '-handle')?.value.trim() || '';
    links[p] = { url, handle };
  });
  localStorage.setItem('portfolio_social', JSON.stringify(links));
  showAdminToast('✓ Social links saved!', 'success');
}

// ── Bio Editor ────────────────────────────────
let currentBioTab = 'ku';

function loadBioEditor() {
  try {
    const bios = JSON.parse(localStorage.getItem('portfolio_bios') || '{}');
    ['ku','ar','en','fa'].forEach(lang => {
      const el = document.getElementById('bio-text-' + lang);
      if (el) el.value = bios[lang] || '';
    });
  } catch(e) {}
}

function switchBioTab(lang, btn) {
  currentBioTab = lang;
  document.querySelectorAll('.bio-editor').forEach(e => e.classList.remove('active'));
  document.querySelectorAll('.bio-tab').forEach(b => b.classList.remove('active'));
  const editor = document.getElementById('bio-' + lang);
  if (editor) editor.classList.add('active');
  if (btn) btn.classList.add('active');
}

function saveBio() {
  const bios = {};
  ['ku','ar','en','fa'].forEach(lang => {
    const el = document.getElementById('bio-text-' + lang);
    if (el && el.value.trim()) bios[lang] = el.value.trim();
  });
  localStorage.setItem('portfolio_bios', JSON.stringify(bios));
  showAdminToast('✓ Bio saved!', 'success');
}

// ── Password Change ───────────────────────────
async function changePassword() {
  const cur     = document.getElementById('cur-pass').value;
  const newPass = document.getElementById('new-pass').value;
  const confirm = document.getElementById('confirm-pass').value;
  const errEl   = document.getElementById('pass-error');

  const requirementsValid = 
    newPass.length >= 8 &&
    /[A-Z]/.test(newPass) && /[a-z]/.test(newPass) &&
    /[0-9]/.test(newPass) &&
    /[^A-Za-z0-9]/.test(newPass);

  if (!requirementsValid) {
    showAdminToast('⚠️ New password must be at least 8 characters and meet all security criteria', 'error'); return;
  }
  if (newPass !== confirm) {
    errEl.classList.add('show'); return;
  }
  errEl.classList.remove('show');

  const curSalt = localStorage.getItem('admin_pw_salt') || '';
  const curHash = await secureHash(cur, curSalt);
  const stored  = localStorage.getItem(HASH_KEY);
  if (curHash !== stored) {
    showAdminToast('❌ Current password is wrong', 'error'); return;
  }

  // Generate new cryptographic salt
  const saltArray = new Uint8Array(16);
  crypto.getRandomValues(saltArray);
  const newSalt = Array.from(saltArray).map(b => b.toString(16).padStart(2,'0')).join('');
  localStorage.setItem('admin_pw_salt', newSalt);

  const newHash = await secureHash(newPass, newSalt);
  localStorage.setItem(HASH_KEY, newHash);
  sessionStorage.setItem(SESSION_KEY, newHash);
  
  document.getElementById('cur-pass').value = '';
  document.getElementById('new-pass').value = '';
  document.getElementById('confirm-pass').value = '';
  resetStrengthBars();
  showAdminToast('✓ Password updated securely!', 'success');
}

function checkStrength(pass) {
  const requirements = {
    len: pass.length >= 8,
    case: /[A-Z]/.test(pass) && /[a-z]/.test(pass),
    num: /[0-9]/.test(pass),
    spec: /[^A-Za-z0-9]/.test(pass)
  };
  let score = 0;
  if (requirements.len) score++;
  if (requirements.case) score++;
  if (requirements.num) score++;
  if (requirements.spec) score++;

  const bars = [1,2,3,4].map(i => document.getElementById('s'+i));
  bars.forEach(b => { if(b) b.className='strength-bar'; });
  if (!pass) return;

  const cls = score <= 2 ? 'filled weak' : score === 3 ? 'filled medium' : 'filled';
  for (let i=0; i<score; i++) {
    if (bars[i]) bars[i].className = 'strength-bar ' + cls;
  }
}
function resetStrengthBars() {
  [1,2,3,4].forEach(i => { const b=document.getElementById('s'+i); if(b) b.className='strength-bar'; });
}

// ── Toast ─────────────────────────────────────
function showAdminToast(msg, type='success') {
  const toast = document.getElementById('admin-toast');
  const msgEl = document.getElementById('a-toast-msg');
  const icon  = document.getElementById('a-toast-icon');
  if (!toast) return;
  toast.className = 'admin-toast ' + type;
  msgEl.textContent = msg;
  icon.textContent  = type === 'success' ? '✓' : '⚠';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── Utils ─────────────────────────────────────
function escHtml(str) {
  return String(str||'')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Handle enter key in login ─────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    if (document.getElementById('login-pass') === document.activeElement) login();
    if (document.getElementById('setup-confirm') === document.activeElement) setupPassword();
  }
});
