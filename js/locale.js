import { translations } from "./i18n.js";

export const SUPPORTED_LANGS = ["fr", "sk", "cs", "en", "es"];

const STORAGE_KEY = "mariage-lang";
const DEFAULT_LANG = "fr";

let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
const listeners = new Set();

export function getLocale() {
  return currentLang;
}

export function getTranslations(lang = currentLang) {
  return translations[lang] ?? translations[DEFAULT_LANG];
}

export function setLocale(lang) {
  if (!translations[lang] || lang === currentLang) return;

  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
  listeners.forEach((fn) => fn(lang));
}

export function onLocaleChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function initLocale() {
  if (!translations[currentLang]) currentLang = DEFAULT_LANG;
  document.documentElement.lang = currentLang;
}

export function formatTemplate(str, vars) {
  return str.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}
