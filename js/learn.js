// js/learn.js — Braille→Teks quiz as randomized grid
document.addEventListener('DOMContentLoaded', () => {
    const data = [
      { symbol: '⠁', answer: 'A' }, { symbol: '⠃', answer: 'B' },
      { symbol: '⠉', answer: 'C' }, { symbol: '⠙', answer: 'D' },
      { symbol: '⠑', answer: 'E' }, { symbol: '⠋', answer: 'F' },
      { symbol: '⠛', answer: 'G' }, { symbol: '⠓', answer: 'H' },
      { symbol: '⠊', answer: 'I' }, { symbol: '⠚', answer: 'J' },
      { symbol: '⠅', answer: 'K' }, { symbol: '⠇', answer: 'L' },
      { symbol: '⠍', answer: 'M' }, { symbol: '⠝', answer: 'N' },
      { symbol: '⠕', answer: 'O' }, { symbol: '⠏', answer: 'P' },
      { symbol: '⠟', answer: 'Q' }, { symbol: '⠗', answer: 'R' },
      { symbol: '⠎', answer: 'S' }, { symbol: '⠞', answer: 'T' },
      { symbol: '⠥', answer: 'U' }, { symbol: '⠧', answer: 'V' },
      { symbol: '⠺', answer: 'W' }, { symbol: '⠭', answer: 'X' },
      { symbol: '⠽', answer: 'Y' }, { symbol: '⠵', answer: 'Z' }
    ];
  
    // Fisher‑Yates shuffle
    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
  
    const quizSec   = document.getElementById('kuis');
    const grid      = quizSec.querySelector('.quiz-grid');
    const checkBtn  = document.getElementById('check-quiz');
    const answerKey = quizSec.querySelector('.answer-key');
    const keyGrid   = answerKey.querySelector('.key-grid');
  
    if (!grid || !checkBtn || !answerKey || !keyGrid) return;
  
    // render shuffled quiz items
    const items = shuffle(data.slice());
    grid.innerHTML = items.map((item, idx) => `
      <div class="quiz-item">
        <span aria-label="Braille letter">${ item.symbol }</span>
        <input
          type="text"
          maxlength="1"
          data-answer="${ item.answer }"
          aria-label="Jawaban untuk ${item.symbol}"
        >
      </div>
    `).join('');
  
    // prepare the key grid (always in A–Z order)
    keyGrid.innerHTML = data.map(item => `
      <div class="key-item">
        ${ item.symbol }: ${ item.answer }
      </div>
    `).join('');
  
    // check logic
    checkBtn.addEventListener('click', () => {
      const inputs = Array.from(grid.querySelectorAll('input'));
      let allCorrect = true;
  
      inputs.forEach(input => {
        const expected = input.dataset.answer.toUpperCase();
        const given    = (input.value || '').trim().toUpperCase();
        input.classList.remove('correct', 'incorrect');
  
        if (given === expected) {
          input.classList.add('correct');
        } else {
          input.classList.add('incorrect');
          allCorrect = false;
        }
      });
  
      if (allCorrect) {
        alert('Selamat! Semua jawaban benar.');
        quizSec.classList.remove('show-key');
      } else {
        quizSec.classList.add('show-key');
      }
    });
  });
  