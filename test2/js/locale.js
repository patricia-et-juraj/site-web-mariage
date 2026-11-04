import { translations } from "./i18n.js";

export const SUPPORTED_LANGS = ["fr", "sk", "cs", "en", "es"];

const STORAGE_KEY = "mariage-lang";
const DEFAULT_LANG = "fr";
const LANG_PARAM = "lang";

function isSupportedLang(lang) {
  return Boolean(lang && translations[lang]);
}

function getLangFromUrl() {
  const lang = new URLSearchParams(window.location.search).get(LANG_PARAM);
  return isSupportedLang(lang) ? lang : null;
}

function syncLangToUrl(lang) {
  const url = new URL(window.location.href);
  if (url.searchParams.get(LANG_PARAM) === lang) return;
  url.searchParams.set(LANG_PARAM, lang);
  history.replaceState(null, "", url);
}

function resolveInitialLang() {
  return getLangFromUrl() || localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
}

let currentLang = resolveInitialLang();
const listeners = new Set();

function applyLocale(lang, { updateUrl = true } = {}) {
  if (!isSupportedLang(lang)) return false;

  const changed = lang !== currentLang;
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
  if (updateUrl) syncLangToUrl(lang);
  return changed;
}

export function getLocale() {
  return currentLang;
}

export function getTranslations(lang = currentLang) {
  return translations[lang] ?? translations[DEFAULT_LANG];
}

export function setLocale(lang) {
  if (!applyLocale(lang)) return;
  listeners.forEach((fn) => fn(lang));
}

export function onLocaleChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function initLocale() {
  if (!isSupportedLang(currentLang)) currentLang = DEFAULT_LANG;
  applyLocale(currentLang);

  window.addEventListener("popstate", () => {
    const lang = getLangFromUrl() || localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    if (!applyLocale(lang, { updateUrl: false })) return;
    listeners.forEach((fn) => fn(lang));
  });
}

export function formatTemplate(str, vars) {
  return str.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}
