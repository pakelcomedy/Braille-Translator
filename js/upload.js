const fileInput = document.getElementById('file-input');
const processBtn = document.getElementById('process-btn');
const fileOutput = document.getElementById('file-output');
const copyFileBtn = document.getElementById('copy-file-btn');
const downloadFileBtn = document.getElementById('download-file-btn');

// Fungsi konversi teks ke Braille
function convertTextToBraille(text) {
  if (typeof convertToBraille !== 'function') {
    alert('Fungsi konversi Braille tidak ditemukan (convertToBraille). Pastikan convert.js dimuat.');
    return '';
  }
  return convertToBraille(text, 'unicode');
}

// Proses file .txt
function processTxtFile(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const text = e.target.result;
      const braille = convertTextToBraille(text);
      fileOutput.textContent = braille;
    } catch (err) {
      console.error('Gagal memproses file TXT:', err);
      fileOutput.textContent = '';
      alert('Gagal membaca file TXT.');
    }
  };
  reader.onerror = () => {
    console.error('Error saat membaca file TXT');
    alert('Terjadi kesalahan saat membaca file TXT.');
  };
  reader.readAsText(file);
}

// Proses file .pdf
async function processPdfFile(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      fullText += strings.join(' ') + '\n';
    }

    const braille = convertTextToBraille(fullText);
    fileOutput.textContent = braille;
  } catch (err) {
    console.error('Gagal memproses PDF:', err);
    fileOutput.textContent = '';
    alert('Terjadi kesalahan saat memproses PDF. Pastikan file valid.');
  }
}

// Event tombol proses
processBtn.addEventListener('click', () => {
  fileOutput.textContent = 'Memproses...';
  const file = fileInput.files[0];

  if (!file) {
    alert('Silakan pilih file terlebih dahulu.');
    fileOutput.textContent = '';
    return;
  }

  const fileName = file.name.toLowerCase();
  if (file.type === 'text/plain' || fileName.endsWith('.txt')) {
    processTxtFile(file);
  } else if (file.type === 'application/pdf' || fileName.endsWith('.pdf')) {
    processPdfFile(file);
  } else {
    alert('Format file tidak didukung. Gunakan .txt atau .pdf.');
    fileOutput.textContent = '';
  }
});

// Tombol salin ke clipboard
copyFileBtn.addEventListener('click', () => {
  const text = fileOutput.textContent;
  if (!text) {
    alert('Tidak ada teks untuk disalin.');
    return;
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => alert('Hasil konversi disalin!'))
      .catch(err => {
        console.error('Clipboard API gagal:', err);
        alert('Gagal menyalin ke clipboard.');
      });
  } else {
    // Fallback untuk browser lama
    const range = document.createRange();
    range.selectNodeContents(fileOutput);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    try {
      const success = document.execCommand('copy');
      alert(success ? 'Hasil konversi disalin!' : 'Gagal menyalin.');
    } catch (err) {
      console.error('execCommand gagal:', err);
      alert('Clipboard tidak didukung di browser ini.');
    }
    sel.removeAllRanges();
  }
});

// Tombol unduh hasil sebagai file
downloadFileBtn.addEventListener('click', () => {
  const text = fileOutput.textContent;
  if (!text) {
    alert('Tidak ada hasil untuk diunduh.');
    return;
  }
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'braille_conversion.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
