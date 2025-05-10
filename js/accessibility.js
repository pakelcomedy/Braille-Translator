// accessibility.js — High‑Contrast / Accessibility Mode Toggle
(() => {
    const TOGGLE_SELECTOR = '#accessibility-toggle';
    const ACTIVE_CLASS     = 'accessibility-high';
    const STORAGE_KEY      = 'accessibilityHighMode';
  
    document.addEventListener('DOMContentLoaded', () => {
      const toggles = Array.from(document.querySelectorAll(TOGGLE_SELECTOR));
      if (!toggles.length) return; // nothing to do
  
      // Apply the mode: flip the class, update ARIA & title
      function applyMode(isActive) {
        document.body.classList.toggle(ACTIVE_CLASS, isActive);
        toggles.forEach(btn => {
          btn.setAttribute('aria-pressed',  isActive);
          btn.setAttribute(
            'aria-label',
            isActive
              ? 'Non‑aktifkan mode aksesibilitas tinggi'
              : 'Aktifkan mode aksesibilitas tinggi'
          );
          btn.setAttribute(
            'title',
            isActive
              ? 'Klik untuk non‑aktifkan mode aksesibilitas tinggi'
              : 'Klik untuk aktifkan mode aksesibilitas tinggi'
          );
        });
      }
  
      // Load saved preference (default: off)
      const saved = localStorage.getItem(STORAGE_KEY) === 'true';
      applyMode(saved);
  
      // Toggle handler: flip state, persist, re‑apply
      function toggleMode() {
        const active = !document.body.classList.contains(ACTIVE_CLASS);
        localStorage.setItem(STORAGE_KEY, active);
        applyMode(active);
      }
  
      // Wire up click + keydown (Space / Enter)
      toggles.forEach(btn => {
        btn.addEventListener('click', toggleMode);
        btn.addEventListener('keydown', e => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggleMode();
          }
        });
        // ensure focusable
        if (!btn.hasAttribute('tabindex')) {
          btn.setAttribute('tabindex', '0');
        }
      });
    });
  })();
  