// Sample Pre-loaded Resources
const INITIAL_RESOURCES = [
  {
    id: '1',
    title: 'Next.js Official Documentation',
    category: 'Code',
    url: 'https://nextjs.org/docs',
    description: 'Official routing, rendering, and API guidelines for modern Next.js apps.',
    createdAt: '2026-10-01'
  },
  {
    id: '2',
    title: 'Tailwind CSS Layout Cheat Sheet',
    category: 'Notes',
    url: 'https://tailwindcss.com',
    description: 'Quick reference guide for grid, flexbox, and responsive utility classes.',
    createdAt: '2026-10-05'
  }
];

// App State
let resources = JSON.parse(localStorage.getItem('quickvault_resources')) || INITIAL_RESOURCES;
let selectedCategory = 'All';
let searchQuery = '';

// DOM Elements
const resourceGrid = document.getElementById('resourceGrid');
const searchInput = document.getElementById('searchInput');
const modalOverlay = document.getElementById('modalOverlay');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const resourceForm = document.getElementById('resourceForm');
const filterButtons = document.querySelectorAll('.filter-btn');

// Render Function
function renderResources() {
  const filtered = resources.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (filtered.length === 0) {
    resourceGrid.innerHTML = `
      <div class="col-span-full text-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
        <p class="text-slate-400 text-sm">No resources found matching your search.</p>
      </div>
    `;
    return;
  }

  resourceGrid.innerHTML = filtered.map(item => `
    <div class="resource-card bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryBadgeClass(item.category)}">
            <i class="${getCategoryIcon(item.category)} text-xs mr-1"></i>
            <span>${item.category}</span>
          </span>
          <button onclick="deleteResource('${item.id}')" class="text-slate-500 hover:text-rose-400 transition-colors p-1" title="Delete">
            <i class="fa-solid fa-trash-can text-sm"></i>
          </button>
        </div>

        <h3 class="font-semibold text-base mb-1.5 text-slate-100">${escapeHtml(item.title)}</h3>
        <p class="text-slate-400 text-sm mb-4 leading-relaxed">${escapeHtml(item.description)}</p>
      </div>

      <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span class="text-xs text-slate-500">${item.createdAt}</span>
        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center space-x-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
          <span>Visit Link</span>
          <i class="fa-solid fa-arrow-up-right-from-square text-xs ml-1"></i>
        </a>
      </div>
    </div>
  `).join('');
}

// Helpers
function getCategoryBadgeClass(cat) {
  if (cat === 'Code') return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
  if (cat === 'Notes') return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
  return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
}

function getCategoryIcon(cat) {
  if (cat === 'Code') return 'fa-solid fa-code';
  if (cat === 'Notes') return 'fa-solid fa-book';
  return 'fa-solid fa-link';
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}

function saveToLocalStorage() {
  localStorage.setItem('quickvault_resources', JSON.stringify(resources));
}

function deleteResource(id) {
  resources = resources.filter(item => item.id !== id);
  saveToLocalStorage();
  renderResources();
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderResources();
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('active-filter');
      b.classList.add('inactive-filter');
    });
    btn.classList.remove('inactive-filter');
    btn.classList.add('active-filter');
    selectedCategory = btn.getAttribute('data-category');
    renderResources();
  });
});

openModalBtn.addEventListener('click', () => modalOverlay.classList.remove('hidden'));
closeModalBtn.addEventListener('click', () => modalOverlay.classList.add('hidden'));

resourceForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('titleInput').value.trim();
  const category = document.getElementById('categorySelect').value;
  const url = document.getElementById('urlInput').value.trim();
  const desc = document.getElementById('descInput').value.trim();

  if (!title || !url) return;

  const newResource = {
    id: Date.now().toString(),
    title,
    category,
    url,
    description: desc || 'No additional details provided.',
    createdAt: new Date().toISOString().split('T')[0]
  };

  resources.unshift(newResource);
  saveToLocalStorage();
  renderResources();

  resourceForm.reset();
  modalOverlay.classList.add('hidden');
});

// Initial Render
renderResources();
