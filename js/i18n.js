// js/i18n.js — Handles loading & applying translations
(() => {
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY  = 'lang';
  const DICT_FOLDER  = 'assets/lang/';      // ← ensure trailing slash
  const DATA_ATTR    = 'data-i18n';
  const PLACEHOLDER  = 'data-i18n-placeholder';

  // 1) Keep a map of all loaded dictionaries
  const cache = new Map();
  let currentLang = null;

  const dictUrl = lang => `${DICT_FOLDER}${lang}.json`;

  async function fetchDict(lang) {
    if (cache.has(lang)) {
      return cache.get(lang);
    }

    try {
      const res = await fetch(dictUrl(lang), { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const dict = await res.json();
      cache.set(lang, dict);
      console.info(`i18n: loaded "${lang}"`);
      return dict;
    } catch (err) {
      console.warn(`i18n: failed to load "${lang}" (${err.message})`);
      if (lang !== DEFAULT_LANG) {
        // fallback once
        return await fetchDict(DEFAULT_LANG);
      }
      return {}; // ultimate fallback
    }
  }

  function applyText(dict) {
    document.querySelectorAll(`[${DATA_ATTR}]`).forEach(el => {
      const key = el.getAttribute(DATA_ATTR);
      if (dict[key] != null) el.textContent = dict[key];
    });
  }

  function applyPlaceholder(dict) {
    document.querySelectorAll(`[${PLACEHOLDER}]`).forEach(el => {
      const key = el.getAttribute(PLACEHOLDER);
      if (dict[key] != null) el.setAttribute('placeholder', dict[key]);
    });
  }

  async function setLanguage(lang) {
    const dict = await fetchDict(lang);
    applyText(dict);
    applyPlaceholder(dict);
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    currentLang = lang;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('langSelector');
    const saved    = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

    if (selector) {
      selector.value = saved;
      selector.addEventListener('change', () => {
        setLanguage(selector.value);
      });
    }

    setLanguage(saved);
  });
})();
