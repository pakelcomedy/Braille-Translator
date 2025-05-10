// convert.js — Logic konversi Teks → Braille Unicode saja

// 1. Full map (tambahkan A–Z, angka & tanda baca sesuai kebutuhan)
const brailleMap = {
    // huruf a–z
    'a': '\u2801', 'b': '\u2803', 'c': '\u2809', 'd': '\u2819', 'e': '\u2811',
    'f': '\u280B', 'g': '\u281B', 'h': '\u2813', 'i': '\u280A', 'j': '\u281A',
    'k': '\u2805', 'l': '\u2807', 'm': '\u280D', 'n': '\u281D', 'o': '\u2815',
    'p': '\u280F', 'q': '\u281F', 'r': '\u2817', 's': '\u280E', 't': '\u281E',
    'u': '\u2825', 'v': '\u2827', 'w': '\u283A', 'x': '\u282D', 'y': '\u283D',
    'z': '\u2835',
  
    // spasi
    ' ': ' ',
  
    // angka 1–9 & 0 (⠼ = tanda angka, lalu huruf a–j)
    '1': '\u283C\u2801',  // ⠼⠁
    '2': '\u283C\u2803',  // ⠼⠃
    '3': '\u283C\u2809',  // ⠼⠉
    '4': '\u283C\u2819',  // ⠼⠙
    '5': '\u283C\u2811',  // ⠼⠑
    '6': '\u283C\u280B',  // ⠼⠋
    '7': '\u283C\u281B',  // ⠼⠛
    '8': '\u283C\u2813',  // ⠼⠓
    '9': '\u283C\u280A',  // ⠼⠊
    '0': '\u283C\u281A',  // ⠼⠚
  
    // tanda baca
    ',': '\u2802',   // ⠂
    ';': '\u2806',   // ⠆
    ':': '\u2812',   // ⠒
    '.': '\u2832',   // ⠲
    '?': '\u2826',   // ⠦
    '!': '\u2816',   // ⠖
    '-': '\u2824',   // ⠤
    '\'': '\u2804',  // ⠄ (apostrof)
    '"': '\u2812',   // ⠒ (kutip dua, menggunakan pola titik dua)
    '/': '\u282C',   // ⠬
    '(': '\u2836',   // ⠶ (tanda kurung buka)
    ')': '\u2836'    // ⠶ (tanda kurung tutup, sama pola)
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
  