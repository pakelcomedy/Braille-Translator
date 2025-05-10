(() => {
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY  = 'lang';
  // — no leading slash, so always relative to your current page
  const DICT_FOLDER  = 'assets/lang/';
  const DATA_ATTR    = 'data-i18n';
  const PLACEHOLDER  = 'data-i18n-placeholder';

  const cache = new Map();

  const dictUrl = lang => `${DICT_FOLDER}${lang}.json`;

  async function fetchDict(lang) {
    if (cache.has(lang)) return cache.get(lang);
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
        return await fetchDict(DEFAULT_LANG);
      }
      return {};
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
