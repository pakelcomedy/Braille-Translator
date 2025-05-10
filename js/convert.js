// convert.js - Logic konversi Teks → Braille

// Mapping karakter Latin ke Braille Unicode
// Hanya contoh sebagian, perlu ditambah lengkap untuk A-Z, a-z, angka, dan tanda baca
const brailleMap = {
    'a': '\u2801', 'b': '\u2803', 'c': '\u2809', 'd': '\u2819', 'e': '\u2811',
    'f': '\u280B', 'g': '\u281B', 'h': '\u2813', 'i': '\u280A', 'j': '\u281A',
    'k': '\u2805', 'l': '\u2807', 'm': '\u280D', 'n': '\u281D', 'o': '\u2815',
    'p': '\u280F', 'q': '\u281F', 'r': '\u2817', 's': '\u280E', 't': '\u281E',
    'u': '\u2825', 'v': '\u2827', 'w': '\u283A', 'x': '\u282D', 'y': '\u283D',
    'z': '\u2835', ' ': ' ' // spasi tetap
  };
  
  // Inisialisasi elemen DOM
  const textInput = document.getElementById('text-input');
  const modeSelect = document.getElementById('mode-select');
  const brailleOutput = document.getElementById('braille-output');
  const copyBtn = document.getElementById('copy-btn');
  
  // Fungsi utama konversi
  function convertToBraille(text, mode) {
    let result = '';
    // Untuk setiap karakter pada input, cari padanannya
    for (const char of text) {
      const lower = char.toLowerCase();
      const brailleChar = brailleMap[lower] || '?';
      switch (mode) {
        case 'unicode':
          result += brailleChar;
          break;
        case 'dots':
          // ASCII art atau elemen <span> dengan class CSS untuk titik
          result += `<span class="braille-dot">${brailleChar}</span>`;
          break;
        case '6dot':
          // Gambar titik dengan grid 2x3, gunakan data-attr data-char
          result += `<div class="braille-6dot" data-char="${lower}"></div>`;
          break;
        default:
          result += brailleChar;
      }
    }
    return result;
  }
  
  // Event Listener: saat teks atau mode berubah
  function updateOutput() {
    const text = textInput.value;
    const mode = modeSelect.value;
    const converted = convertToBraille(text, mode);
    brailleOutput.innerHTML = converted;
  }
  
  textInput.addEventListener('input', updateOutput);
  modeSelect.addEventListener('change', updateOutput);
  
  // Fungsi salin ke clipboard
  copyBtn.addEventListener('click', () => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(brailleOutput);
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand('copy');
      alert('Hasil Braille disalin!');
    } catch (err) {
      console.error('Salin gagal', err);
    }
  });
  
  // Inisialisasi output kosong saat halaman load
  document.addEventListener('DOMContentLoaded', updateOutput);