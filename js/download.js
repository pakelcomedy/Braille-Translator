// download.js - Fungsi umum untuk unduh hasil sebagai file .txt

document.addEventListener('DOMContentLoaded', () => {
    // Unduh hasil konversi Braille di index.html
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        const outputEl = document.getElementById('braille-output');
        const content = outputEl ? outputEl.textContent : '';
        downloadContent(content, 'braille_output.txt');
      });
    }
  
    // Unduh hasil teks biasa di reverse.html
    const downloadTextBtn = document.getElementById('download-text-btn');
    if (downloadTextBtn) {
      downloadTextBtn.addEventListener('click', () => {
        const outputEl = document.getElementById('text-output');
        const content = outputEl ? outputEl.textContent : '';
        downloadContent(content, 'translated_text.txt');
      });
    }
  
    // Unduh hasil konversi dari upload.html
    const downloadFileBtn = document.getElementById('download-file-btn');
    if (downloadFileBtn) {
      downloadFileBtn.addEventListener('click', () => {
        const outputEl = document.getElementById('file-output');
        const content = outputEl ? outputEl.textContent : '';
        downloadContent(content, 'braille_conversion.txt');
      });
    }
  
    // Helper: buat dan klik link download
    function downloadContent(text, filename) {
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  });