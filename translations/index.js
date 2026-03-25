// 🌍 Translation Loader (Modular System)

// Map each language to its global object
const LANG_MAP = {
  en: () => window.TRANSLATIONS_EN,
  pt: () => window.TRANSLATIONS_PT,
  es: () => window.TRANSLATIONS_ES,
  it: () => window.TRANSLATIONS_IT,
  ru: () => window.TRANSLATIONS_RU,
  ko: () => window.TRANSLATIONS_KO,
  ja: () => window.TRANSLATIONS_JA,
  hi: () => window.TRANSLATIONS_HI
}

// Normalize language code (pt-BR → pt)
function normalizeLang(lang){
  if(!lang) return "en"
  lang = lang.toLowerCase()
  if(lang.includes("-")) lang = lang.split("-")[0]
  return lang
}

// Detect browser language
function detectLang(){
  const navLang = navigator.language || navigator.userLanguage
  return normalizeLang(navLang)
}

// Get current language (localStorage > browser > fallback)
function getLang(){
  const saved = localStorage.getItem("lang")
  const detected = saved || detectLang()

  return LANG_MAP[detected] ? detected : "en"
}

// Main function to get translations
function getTranslations(){
  const lang = getLang()

  try{
    const t = LANG_MAP[lang]()
    return t || LANG_MAP["en"]()
  }catch(e){
    console.warn("Translation load failed, fallback to EN", e)
    return LANG_MAP["en"]()
  }
}

// Optional helper: set language manually
function setLang(lang){
  const normalized = normalizeLang(lang)

  if(LANG_MAP[normalized]){
    localStorage.setItem("lang", normalized)
  }else{
    console.warn("Unsupported language:", lang)
  }
}
