import CN from "./cn";
import EN from "./en";
import TW from "./tw";
import ES from "./es";
import IT from "./it";
import TR from "./tr";
import JP from "./jp";
import DE from "./de";

export type { LocaleType } from "./cn";

export const AllLangs = [
  "en",
  "cn",
  "tw",
  "es",
  "it",
  "tr",
  "jp",
  "de",
] as const;
<<<<<<< HEAD
type Lang = (typeof AllLangs)[number];
=======
export type Lang = (typeof AllLangs)[number];
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6

const LANG_KEY = "lang";
const DEFAULT_LANG = "en";

function getItem(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setItem(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function getLanguage() {
  try {
    return navigator.language.toLowerCase();
  } catch {
    console.log("[Lang] failed to detect user lang.");
    return DEFAULT_LANG;
  }
}

export function getLang(): Lang {
  const savedLang = getItem(LANG_KEY);

  if (AllLangs.includes((savedLang ?? "") as Lang)) {
    return savedLang as Lang;
  }

  const lang = getLanguage();

  for (const option of AllLangs) {
    if (lang.includes(option)) {
      return option;
    }
  }

<<<<<<< HEAD
  return "en";
=======
  return DEFAULT_LANG;
>>>>>>> e0053d57f7d76248fd68d9f67ddbf1f64f431ea6
}

export function changeLang(lang: Lang) {
  setItem(LANG_KEY, lang);
  location.reload();
}

export default {
  en: EN,
  cn: CN,
  tw: TW,
  es: ES,
  it: IT,
  tr: TR,
  jp: JP,
  de: DE,
}[getLang()] as typeof CN;
