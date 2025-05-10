// reverse.js — Logic konversi Braille Unicode → Teks biasa

(() => {
    // 1. Constants & maps
    const NUMBER_SIGN = '\u283C';  // ⠼
  
    // Braille → Latin letter
    const letterMap = {
      '\u2801': 'a', '\u2803': 'b', '\u2809': 'c', '\u2819': 'd', '\u2811': 'e',
      '\u280B': 'f', '\u281B': 'g', '\u2813': 'h', '\u280A': 'i', '\u281A': 'j',
      '\u2805': 'k', '\u2807': 'l', '\u280D': 'm', '\u281D': 'n', '\u2815': 'o',
      '\u280F': 'p', '\u281F': 'q', '\u2817': 'r', '\u280E': 's', '\u281E': 't',
      '\u2825': 'u', '\u2827': 'v', '\u283A': 'w', '\u282D': 'x', '\u283D': 'y',
      '\u2835': 'z'
    };
  
    // Braille → punctuation
    const punctMap = {
      '\u2802': ',',  // ⠂
      '\u2806': ';',  // ⠆
      '\u2812': ':',  // ⠒
      '\u2832': '.',  // ⠲
      '\u2826': '?',  // ⠦
      '\u2816': '!',  // ⠖
      '\u2824': '-',  // ⠤
      '\u2804': '\'', // ⠄ apostrof
      '\u282C': '/',  // ⠬
      '\u2836': '()'  // ⠶ parenthesis (ambiguous; you may split as needed)
    };
  
    // 2. Grab DOM elements
    const brailleInput     = document.getElementById('braille-input');
    const textOutput       = document.getElementById('text-output');
    const copyTextBtn      = document.getElementById('copy-text-btn');
    const downloadTextBtn  = document.getElementById('download-text-btn');
  
    if (!brailleInput || !textOutput) {
      console.warn('reverse.js: Missing #braille-input or #text-output, aborting.');
      return;
    }
  
    // 3. Conversion function
    function convertBrailleToText(braille) {
      let result = '';
      let numericMode = false;
  
      for (const ch of braille) {
        if (ch === NUMBER_SIGN) {
          numericMode = true;
          continue;
        }
        if (numericMode) {
          // letters a–j → digits 1–0
          const letter = letterMap[ch];
          if (letter && letter >= 'a' && letter <= 'j') {
            // map 'a'..'j' to '1'..'0'
            const code = letter.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
            result += (code % 10).toString();
          } else {
            result += '?';
          }
          numericMode = false;
        } else if (letterMap[ch]) {
          result += letterMap[ch];
        } else if (punctMap[ch]) {
          result += punctMap[ch];
        } else if (ch === ' ' || ch === '\n' || ch === '\t') {
          result += ch;
        } else {
          result += '?';
        }
      }
  
      return result;
    }
  
    // 4. Update output whenever input changes
    function updateOutput() {
      textOutput.textContent = convertBrailleToText(brailleInput.value);
    }
    brailleInput.addEventListener('input', updateOutput);
    document.addEventListener('DOMContentLoaded', updateOutput);
  
    // 5. Copy-to-clipboard
    if (copyTextBtn) {
      copyTextBtn.addEventListener('click', async () => {
        const text = textOutput.textContent;
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
          alert('Teks disalin!');
        } catch {
          // Fallback execCommand
          const rng = document.createRange();
          rng.selectNodeContents(textOutput);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(rng);
          document.execCommand('copy');
          sel.removeAllRanges();
          alert('Teks disalin!');
        }
      });
    }
  
    // 6. Download as .txt
    if (downloadTextBtn) {
      downloadTextBtn.addEventListener('click', () => {
        const text = textOutput.textContent;
        if (!text) return;
        const blob = new Blob([text], { type: 'text/plain' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = 'translated_text.txt';
        a.click();
        URL.revokeObjectURL(url);
      });
    }
  })();
  