// filepath: /home/aza/HCL/public/app.js
const fileInput = document.getElementById('fileInput');
const promptInput = document.getElementById('prompt');
const form = document.getElementById('chatForm');
const fileNameEl = document.getElementById('fileName');

// new elements for structured result
const resultEl = document.getElementById('result');
const resultBody = document.getElementById('resultBody');
const resultSources = document.getElementById('resultSources');
const copyBtn = document.getElementById('copyBtn');

let selectedFiles = [];
fileInput.addEventListener('change', (e) => {
  selectedFiles = Array.from(e.target.files || []);
  renderFileList();
});

function renderFileList() {
  fileNameEl.innerHTML = '';
  selectedFiles.forEach(f => {
    const chip = document.createElement('div');
    chip.className = 'file-chip';
    chip.textContent = f.name;
    fileNameEl.appendChild(chip);
  });
}

copyBtn.addEventListener('click', async () => {
  if (!resultBody.textContent) return;
  try {
    await navigator.clipboard.writeText(resultBody.textContent);
    copyBtn.textContent = '✓';
    setTimeout(() => { copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M16 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="8" y="2" width="8" height="4" rx="1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`; }, 1200);
  } catch (err) {
    console.error('copy failed', err);
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!selectedFiles.length) {
    alert('Add one or more PDF files first.');
    return;
  }
  const prompt = promptInput.value.trim();
  if (!prompt) {
    alert('Enter a prompt.');
    return;
  }

  const fd = new FormData();
  selectedFiles.forEach(f => fd.append('files', f));
  fd.append('prompt', prompt);

  // show loader text
  resultEl.hidden = false;
  resultBody.textContent = 'Thinking...';
  resultSources.innerHTML = '';

  try {
    const res = await fetch('/api/query', { method: 'POST', body: fd });
    const contentType = res.headers.get('content-type') || '';
    if (!res.ok) {
      const errTxt = await res.text();
      resultBody.textContent = `Error ${res.status}: ${errTxt}`;
      return;
    }

    if (contentType.includes('application/json')) {
      const data = await res.json();
      const answer = data.answer || data.text || '(No answer)';
      resultBody.textContent = answer;

      const sources = data.used_sources || data.sources || [];
      resultSources.innerHTML = '';
      sources.forEach(s => {
        const chip = document.createElement('div');
        chip.className = 'source-chip';
        chip.textContent = s;
        resultSources.appendChild(chip);
      });
    } else {
      // plain text fallback
      const text = await res.text();
      resultBody.textContent = text;
    }
  } catch (err) {
    console.error(err);
    resultBody.textContent = 'Network error';
  }
});