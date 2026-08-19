// JavaScript code to handle form data and connect with index.html + style.css

const form = document.querySelector('form');

if (form) {
  form.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('Form submitted:', data);

    const output = document.querySelector('#form-output');
    if (output) {
      output.textContent = JSON.stringify(data, null, 2);
      output.style.display = 'block';
    }

    // assign id, then append row, save last form values and persist entries
    data.id = generateId();
    const tableBody = document.querySelector('#table tbody');
    if (tableBody) {
      appendRowToTable(data);
    }

    saveToStorage(STORAGE_KEY_LAST, data);
    const entries = loadFromStorage(STORAGE_KEY_ENTRIES) || [];
    entries.push(data);
    saveToStorage(STORAGE_KEY_ENTRIES, entries);

    form.classList.add('submitted');
    form.reset();
  });
  
}

// --- Local storage helpers and restore on load ---
const STORAGE_KEY_LAST = 'lastFormData';
const STORAGE_KEY_ENTRIES = 'formEntries';

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Could not save to localStorage', e);
  }
}

function loadFromStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Could not read from localStorage', e);
    return null;
  }
}

function populateFormWithData(data) {
  if (!data) return;
  Object.entries(data).forEach(([name, value]) => {
    const el = form.elements[name];
    if (!el) return;
    if (el.type === 'checkbox') {
      el.checked = !!value;
    } else if (el.type === 'radio') {
      const radio = form.querySelector(`input[name="${name}"][value="${value}"]`);
      if (radio) radio.checked = true;
    } else {
      el.value = value;
    }
  });
}

function appendRowToTable(data, serial) {
  const tableBody = document.querySelector('#table tbody');
  if (!tableBody) return;
  const row = document.createElement('tr');
  row.classList.add('product-row');
  if (data && data.id) row.dataset.entryId = data.id;

  const serialCell = document.createElement('td');
  serialCell.textContent = serial ?? tableBody.children.length + 1;
  row.appendChild(serialCell);

  ['name', 'category', 'price', 'quantity'].forEach((key) => {
    const cell = document.createElement('td');
    cell.textContent = data[key] ?? '';
    cell.dataset.key = key;
    row.appendChild(cell);
  });

  // delete button cell
  const actionCell = document.createElement('td');
  const del = document.createElement('button');
  del.type = 'button';
  del.className = 'delete-entry';
  del.textContent = 'Delete';
  del.addEventListener('click', () => {
    if (!data || !data.id) return;
    deleteEntry(data.id);
  });
  actionCell.appendChild(del);
  row.appendChild(actionCell);

  tableBody.appendChild(row);
}

function generateId() {
  return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
}

function deleteEntry(id) {
  const entries = loadFromStorage(STORAGE_KEY_ENTRIES) || [];
  const updated = entries.filter((e) => e.id !== id);
  saveToStorage(STORAGE_KEY_ENTRIES, updated);

  // if lastFormData references this id, remove it too
  const last = loadFromStorage(STORAGE_KEY_LAST);
  if (last && last.id === id) {
    localStorage.removeItem(STORAGE_KEY_LAST);
  }

  // remove row from DOM
  const tableBody = document.querySelector('#table tbody');
  if (!tableBody) return;
  const row = tableBody.querySelector(`tr[data-entry-id="${id}"]`);
  if (row) row.remove();

  // reindex serials
  Array.from(tableBody.querySelectorAll('tr')).forEach((r, idx) => {
    const first = r.querySelector('td');
    if (first) first.textContent = idx + 1;
  });
}

function restoreEntries() {
  const entries = loadFromStorage(STORAGE_KEY_ENTRIES) || [];
  let changed = false;
  const tableBody = document.querySelector('#table tbody');
  if (tableBody) tableBody.innerHTML = '';
  entries.forEach((entry, idx) => {
    if (!entry.id) { entry.id = generateId(); changed = true; }
    appendRowToTable(entry, idx + 1);
  });
  if (changed) saveToStorage(STORAGE_KEY_ENTRIES, entries);
}

// On load: restore last form values and table entries
document.addEventListener('DOMContentLoaded', () => {
  const last = loadFromStorage(STORAGE_KEY_LAST);
  if (last) populateFormWithData(last);
  restoreEntries();
});

// If script runs after DOMContentLoaded, restore immediately
if (document.readyState !== 'loading') {
  const lastNow = loadFromStorage(STORAGE_KEY_LAST);
  if (lastNow) populateFormWithData(lastNow);
  restoreEntries();
}

// Also expose simple API to get/set saved data programmatically
window.FormStorage = {
  getLast: () => loadFromStorage(STORAGE_KEY_LAST),
  getEntries: () => loadFromStorage(STORAGE_KEY_ENTRIES) || [],
  clear: () => { localStorage.removeItem(STORAGE_KEY_LAST); localStorage.removeItem(STORAGE_KEY_ENTRIES); }
};