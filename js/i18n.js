// js/i18n.js — Handles loading & applying translations

(() => {
  const DEFAULT_LANG   = 'en';
  const STORAGE_KEY    = 'lang';
  // Pakai absolute path dari root
  const DICT_FOLDER    = '/assets/lang';
  const DATA_ATTR      = 'data-i18n';
  const PLACEHOLDER    = 'data-i18n-placeholder';

  let currentDict = {};

  const dictPath = lang => `${DICT_FOLDER}/${lang}.json`;

  async function fetchDict(lang) {
    if (currentDict.lang === lang) {
      return currentDict.data;
    }
    try {
      const res = await fetch(dictPath(lang), { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const dict = await res.json();
      currentDict = { lang, data: dict };
      return dict;
    } catch (err) {
      console.warn(`i18n: gagal load "${lang}", fallback ke "${DEFAULT_LANG}"`, err);
      if (lang !== DEFAULT_LANG) {
        return fetchDict(DEFAULT_LANG);
      }
      return {};
    }
  }

  function applyText(dict) {
    document.querySelectorAll(`[${DATA_ATTR}]`).forEach(el => {
      const key = el.getAttribute(DATA_ATTR);
      if (key in dict) el.textContent = dict[key];
    });
  }

  function applyPlaceholder(dict) {
    document.querySelectorAll(`[${PLACEHOLDER}]`).forEach(el => {
      const key = el.getAttribute(PLACEHOLDER);
      if (key in dict) el.setAttribute('placeholder', dict[key]);
    });
  }

  async function setLanguage(lang) {
    const dict = await fetchDict(lang);
    applyText(dict);
    applyPlaceholder(dict);
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
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
