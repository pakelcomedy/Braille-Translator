// convert.js — Logic konversi Teks → Braille Unicode saja

// 1. Full map (tambahkan A–Z, angka & tanda baca sesuai kebutuhan)
const brailleMap = {
    'a': '\u2801', 'b': '\u2803', 'c': '\u2809', 'd': '\u2819', 'e': '\u2811',
    'f': '\u280B', 'g': '\u281B', 'h': '\u2813', 'i': '\u280A', 'j': '\u281A',
    'k': '\u2805', 'l': '\u2807', 'm': '\u280D', 'n': '\u281D', 'o': '\u2815',
    'p': '\u280F', 'q': '\u281F', 'r': '\u2817', 's': '\u280E', 't': '\u281E',
    'u': '\u2825', 'v': '\u2827', 'w': '\u283A', 'x': '\u282D', 'y': '\u283D',
    'z': '\u2835', ' ': ' '
    // …tambahkan A–Z (uppercase dipetakan via toLowerCase),
    // angka '0'–'9', tanda baca, dll.
  };
  
  // 2. Ambil elemen DOM utama
  const textInput    = document.getElementById('text-input');
  const brailleOutput = document.getElementById('braille-output');
  const copyBtn      = document.getElementById('copy-btn');
  
  // 3. Fungsi konversi teks ke Braille Unicode
  function convertToBraille(text) {
    return Array.from(text).map(char => {
      const b = brailleMap[char.toLowerCase()];
      return b !== undefined ? b : '?';
    }).join('');
  }
  
  // 4. Update output setiap input berubah
  function updateOutput() {
    brailleOutput.textContent = convertToBraille(textInput.value);
  }
  
  // 5. Salin ke clipboard pakai modern API (fallback ke execCommand)
  async function copyBraille() {
    const text = brailleOutput.textContent;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      alert('Hasil Braille disalin!');
    } catch (err) {
      // Fallback lama
      const sel = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(brailleOutput);
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand('copy');
      sel.removeAllRanges();
      alert('Hasil Braille disalin!');
    }
  }
  
  // 6. Pasang event listeners
  textInput.addEventListener('input', updateOutput);
  copyBtn.addEventListener('click', copyBraille);
  document.addEventListener('DOMContentLoaded', updateOutput);
  