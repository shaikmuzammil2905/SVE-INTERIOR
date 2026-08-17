/* ==========================================================================
   SV Elegant Interior - Admin Core Engine & Shell Provider
   ========================================================================== */

function isLoginPage() {
  const p = window.location.pathname.toLowerCase();
  return p.includes('login') || p.endsWith('login.html') || p.endsWith('/login') || p === '/admin/login';
}

document.addEventListener('DOMContentLoaded', async () => {
  if (!isLoginPage()) {
    await checkAdminAuth();
    renderAdminShell();
    updateUnreadCountBadge();
    const wrapper = document.querySelector('.admin-wrapper');
    if (wrapper) wrapper.classList.add('ready');
  }
});

// Check if user is logged in via Supabase Auth ONLY
async function checkAdminAuth() {
  if (isLoginPage()) return;

  const db = getSupabaseClient();
  let loggedIn = false;
  let userEmail = '';

  if (db) {
    try {
      let { data: { session } } = await db.auth.getSession();
      
      // Retry after brief delay if Supabase client is still restoring session from storage
      if (!session) {
        await new Promise(resolve => setTimeout(resolve, 200));
        const retryRes = await db.auth.getSession();
        session = retryRes.data?.session;
      }

      if (session && session.user && session.user.email) {
        loggedIn = true;
        userEmail = session.user.email;
      }
    } catch (e) {
      console.error('Session retrieval error:', e);
    }
  }

  if (!loggedIn) {
    if (!isLoginPage()) {
      window.location.href = '/admin/login.html';
    }
  } else {
    window.currentAdminUser = { email: userEmail };
  }
}

// Admin Logout
async function handleAdminLogout() {
  const db = getSupabaseClient();
  if (db) {
    try { await db.auth.signOut(); } catch (e) {}
  }
  localStorage.removeItem('sve_admin_session');
  showAdminToast('Logged out successfully', 'success');
  setTimeout(() => {
    window.location.href = '/admin/login.html';
  }, 600);
}

// Render Uniform Admin Navigation Sidebar & Topbar Header
function renderAdminShell() {
  const currentPath = window.location.pathname;

  const navItems = [
    { name: 'Dashboard', url: 'index.html', icon: 'fas fa-chart-line' },
    { name: 'Hero Section', url: 'hero.html', icon: 'fas fa-image' },
    { name: 'About Section', url: 'about.html', icon: 'fas fa-address-card' },
    { name: 'Services', url: 'services.html', icon: 'fas fa-concierge-bell' },
    { name: 'Projects', url: 'projects.html', icon: 'fas fa-tasks' },
    { name: 'Before & After', url: 'before-after.html', icon: 'fas fa-sliders-h' },
    { name: 'Why Choose Us', url: 'why-choose-us.html', icon: 'fas fa-star' },
    { name: 'Gallery', url: 'gallery.html', icon: 'fas fa-photo-video' },
    { name: 'Testimonials', url: 'testimonials.html', icon: 'fas fa-quote-left' },
    { name: 'Quote Requests', url: 'contact-requests.html', icon: 'fas fa-envelope-open-text', hasBadge: true },
    { name: 'Media Library', url: 'media-library.html', icon: 'fas fa-folder-open' },
    { name: 'Settings', url: 'settings.html', icon: 'fas fa-cog' },
    { name: 'Activity Logs', url: 'activity-logs.html', icon: 'fas fa-history' }
  ];

  const sidebarHTML = `
    <div class="sidebar-backdrop" id="sidebar-backdrop" onclick="closeMobileSidebar()"></div>
    <aside class="admin-sidebar" id="admin-sidebar">
      <div class="sidebar-header">
        <img src="/assets/images/logo.png" alt="SV Elegant Interior">
        <div>
          <div class="brand-text">SV Elegant</div>
          <div class="brand-subtitle">CMS Admin Panel</div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section-title">MANAGEMENT CORE</div>
        ${navItems.map(item => {
          const isActive = currentPath.endsWith(item.url) || (item.url === 'index.html' && currentPath.endsWith('/admin/'));
          return `
            <a href="${item.url}" class="nav-item ${isActive ? 'active' : ''}" onclick="closeMobileSidebar()">
              <div class="nav-left">
                <i class="${item.icon}"></i>
                <span>${item.name}</span>
              </div>
              ${item.hasBadge ? `<span class="nav-badge" id="sidebar-unread-badge" style="display:none;">0</span>` : ''}
            </a>
          `;
        }).join('')}
      </nav>

      <div class="sidebar-footer">
        <div class="admin-user-info">
          <div class="user-avatar">${(window.currentAdminUser?.email || 'A')[0].toUpperCase()}</div>
          <div class="user-details">
            <h5>Admin User</h5>
            <span>${window.currentAdminUser?.email || 'admin@svelegantinteriors.com'}</span>
          </div>
        </div>
        <button class="btn-logout" onclick="handleAdminLogout()" title="Logout">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </aside>
  `;

  const userPageTitle = document.title.split('-')[0].trim() || 'Dashboard';

  const topbarHTML = `
    <header class="admin-topbar">
      <div class="topbar-left">
        <button class="mobile-nav-toggle" onclick="toggleMobileSidebar()">
          <i class="fas fa-bars"></i>
        </button>
        <h2 class="page-title">${userPageTitle}</h2>
      </div>

      <div class="topbar-right">
        <a href="/index.html" target="_blank" class="btn-visit-site">
          <i class="fas fa-external-link-alt"></i>
          <span>View Public Site</span>
        </a>
      </div>
    </header>
  `;

  // Inject sidebar & topbar if containers exist
  const wrapper = document.querySelector('.admin-wrapper');
  if (wrapper) {
    if (!document.getElementById('admin-sidebar')) {
      wrapper.insertAdjacentHTML('afterbegin', sidebarHTML);
    }

    const main = document.querySelector('.admin-main');
    if (main && !document.querySelector('.admin-topbar')) {
      main.insertAdjacentHTML('afterbegin', topbarHTML);
    }

    wrapper.classList.add('ready');
  }
}

// Toggle mobile sidebar drawer
function toggleMobileSidebar() {
  const sidebar = document.getElementById('admin-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.toggle('open');
  if (backdrop) backdrop.classList.toggle('active');
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('admin-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (backdrop) backdrop.classList.remove('active');
}

// Update unread quote request count badge in sidebar
async function updateUnreadCountBadge() {
  const db = getSupabaseClient();
  if (!db) return;

  try {
    const { count, error } = await db
      .from('contact_requests')
      .select('id', { count: 'exact' })
      .eq('is_read', false);

    if (!error && count > 0) {
      const badge = document.getElementById('sidebar-unread-badge');
      if (badge) {
        badge.textContent = count;
        badge.style.display = 'inline-block';
      }
    }
  } catch (e) {
    console.error('Failed to update unread badge:', e);
  }
}

// Admin Toast Notification Utility
function showAdminToast(message, type = 'success') {
  let toast = document.getElementById('admin-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'admin-toast';
    toast.className = 'admin-toast';
    document.body.appendChild(toast);
  }

  toast.className = `admin-toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// Confirmation Dialog Modal Helper
function confirmAction(title, message, onConfirm) {
  let modal = document.getElementById('admin-confirm-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'admin-confirm-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-container" style="max-width: 440px;">
        <div class="modal-header">
          <h3 id="confirm-title">Confirm Action</h3>
          <button class="modal-close" onclick="closeConfirmModal()">&times;</button>
        </div>
        <div class="modal-body" id="confirm-message" style="color: var(--text-muted);">
          Are you sure you want to delete this item?
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeConfirmModal()">Cancel</button>
          <button class="btn btn-danger" id="confirm-proceed-btn">Delete</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-message').textContent = message;

  const proceedBtn = document.getElementById('confirm-proceed-btn');
  proceedBtn.onclick = async () => {
    closeConfirmModal();
    await onConfirm();
  };

  modal.classList.add('active');
}

// Global Safe Error Catchers - Prevents Blank White Screens
window.addEventListener('error', (event) => {
  console.error('Unhandled Admin Error:', event.error || event.message);
  displayGlobalAdminError(event.message || 'An unexpected runtime error occurred.');
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
  const msg = event.reason?.message || String(event.reason || 'Unhandled Promise error');
  displayGlobalAdminError(msg);
});

function displayGlobalAdminError(message) {
  let box = document.getElementById('admin-global-error-banner');
  if (!box) {
    box = document.createElement('div');
    box.id = 'admin-global-error-banner';
    box.style.cssText = 'position:fixed; top:16px; left:50%; transform:translateX(-50%); z-index:99999; background:#7f1d1d; color:#fca5a5; padding:12px 24px; border-radius:8px; border:1px solid #ef4444; font-family:sans-serif; font-size:0.88rem; box-shadow:0 10px 25px rgba(0,0,0,0.5); max-width:90vw; text-align:center; display:flex; align-items:center; gap:10px;';
    if (document.body) document.body.appendChild(box);
  }
  if (box) {
    box.innerHTML = `<i class="fas fa-exclamation-triangle"></i> <span><strong>Admin Notice:</strong> ${message}</span>`;
    setTimeout(() => { if (box) box.remove(); }, 8000);
  }
}

