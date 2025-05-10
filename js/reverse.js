// reverse.js - Logic konversi Braille Unicode → Teks biasa

// Mapping Braille Unicode ke karakter Latin (lengkapi sesuai kebutuhan)
const reverseMap = {
    '\u2801': 'a', '\u2803': 'b', '\u2809': 'c', '\u2819': 'd', '\u2811': 'e',
    '\u280B': 'f', '\u281B': 'g', '\u2813': 'h', '\u280A': 'i', '\u281A': 'j',
    '\u2805': 'k', '\u2807': 'l', '\u280D': 'm', '\u281D': 'n', '\u2815': 'o',
    '\u280F': 'p', '\u281F': 'q', '\u2817': 'r', '\u280E': 's', '\u281E': 't',
    '\u2825': 'u', '\u2827': 'v', '\u283A': 'w', '\u282D': 'x', '\u283D': 'y',
    '\u2835': 'z', ' ': ' ' // spasi
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    const brailleInput = document.getElementById('braille-input');
    const textOutput = document.getElementById('text-output');
    const copyTextBtn = document.getElementById('copy-text-btn');
    const downloadTextBtn = document.getElementById('download-text-btn');
  
    if (!brailleInput || !textOutput || !copyTextBtn || !downloadTextBtn) return;
  
    // Fungsi utama konversi balik
    function convertBrailleToText(braille) {
      let result = '';
      for (const ch of braille) {
        const txtChar = reverseMap[ch] || '?';
        result += txtChar;
      }
      return result;
    }
  
    // Update output saat input berubah
    brailleInput.addEventListener('input', () => {
      const inputVal = brailleInput.value;
      const converted = convertBrailleToText(inputVal);
      textOutput.textContent = converted;
    });
  
    // Tombol Salin
    copyTextBtn.addEventListener('click', () => {
      const range = document.createRange();
      range.selectNodeContents(textOutput);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      try {
        document.execCommand('copy');
        alert('Teks disalin!');
      } catch (err) {
        console.error('Salin gagal:', err);
      }
    });
  
    // Tombol Unduh
    downloadTextBtn.addEventListener('click', () => {
      const text = textOutput.textContent;
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'translated_text.txt';
      a.click();
      URL.revokeObjectURL(url);
    });
  });