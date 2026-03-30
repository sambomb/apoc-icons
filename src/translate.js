// Importar tradução explicitamente para evitar problemas de glob em iframes
import * as enMod from './translations/en.js'
import * as ptBrMod from './translations/pt-br.js'
import * as ptPtMod from './translations/pt-pt.js'
import * as esMod from './translations/es.js'
import * as frMod from './translations/fr.js'
import * as deMod from './translations/de.js'
import * as itMod from './translations/it.js'
import * as ruMod from './translations/ru.js'
import * as zhMod from './translations/zh.js'
import * as jaMod from './translations/ja.js'
import * as koMod from './translations/ko.js'
import * as hiMod from './translations/hi.js'
import * as bnMod from './translations/bn.js'
import * as mrMod from './translations/mr.js'
import * as arMod from './translations/ar.js'
import * as urMod from './translations/ur.js'
import * as idMod from './translations/id.js'
import * as trMod from './translations/tr.js'
import * as plMod from './translations/pl.js'
import * as swMod from './translations/sw.js'

const modules = {
  './translations/en.js': () => Promise.resolve(enMod),
  './translations/pt-br.js': () => Promise.resolve(ptBrMod),
  './translations/pt-pt.js': () => Promise.resolve(ptPtMod),
  './translations/es.js': () => Promise.resolve(esMod),
  './translations/fr.js': () => Promise.resolve(frMod),
  './translations/de.js': () => Promise.resolve(deMod),
  './translations/it.js': () => Promise.resolve(itMod),
  './translations/ru.js': () => Promise.resolve(ruMod),
  './translations/zh.js': () => Promise.resolve(zhMod),
  './translations/ja.js': () => Promise.resolve(jaMod),
  './translations/ko.js': () => Promise.resolve(koMod),
  './translations/hi.js': () => Promise.resolve(hiMod),
  './translations/bn.js': () => Promise.resolve(bnMod),
  './translations/mr.js': () => Promise.resolve(mrMod),
  './translations/ar.js': () => Promise.resolve(arMod),
  './translations/ur.js': () => Promise.resolve(urMod),
  './translations/id.js': () => Promise.resolve(idMod),
  './translations/tr.js': () => Promise.resolve(trMod),
  './translations/pl.js': () => Promise.resolve(plMod),
  './translations/sw.js': () => Promise.resolve(swMod)
}

function isPlainObject(value){
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

function deepMerge(base, overrides){
  if(!isPlainObject(base)) return overrides
  const result = { ...base }

  if(!isPlainObject(overrides)) return result

  Object.keys(overrides).forEach((key) => {
    const baseValue = result[key]
    const overrideValue = overrides[key]

    if(isPlainObject(baseValue) && isPlainObject(overrideValue)){
      result[key] = deepMerge(baseValue, overrideValue)
      return
    }

    result[key] = overrideValue
  })

  return result
}

export let T = {
  time: "Time",
  current: "Current",
  alert: "Alert",
  localLabel: "Local",
  apocLabel: "Apocalypse", 
  nextLabel: "Next",
  dayLabel: "Day",
  days: [],
  dayTitles: {},
  events: {},
  timeFormat24: "24H",
  timeFormat12: "12H"
}
export let CURRENT_LANG = "en"

// Limpar localStorage de valores inválidos (ex: en-US)
function cleanStoredLang() {
  const stored = localStorage.getItem("lang")
  if(stored && !LANGS.find(l => l.code === stored)) {
    console.warn("Removing invalid language from storage:", stored)
    localStorage.removeItem("lang")
  }
}

export const LANGS = [
  { code: "en", flag: "🇺🇸", name: "English" },
  { code: "pt-br", flag: "🇧🇷", name: "Português (BR)" },
  { code: "pt-pt", flag: "🇵🇹", name: "Português (PT)" },
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "it", flag: "🇮🇹", name: "Italiano" },
  { code: "ru", flag: "🇷🇺", name: "Русский" },
  { code: "zh", flag: "🇨🇳", name: "中文" },
  { code: "ja", flag: "🇯🇵", name: "日本語" },
  { code: "ko", flag: "🇰🇷", name: "한국어" },
  { code: "hi", flag: "🇮🇳", name: "हिन्दी" },
  { code: "bn", flag: "🇧🇩", name: "বাংলা" },
  { code: "mr", flag: "🇮🇳", name: "मराठी" },
  { code: "ar", flag: "🇸🇦", name: "العربية" },
  { code: "ur", flag: "🇵🇰", name: "اردو" },
  { code: "id", flag: "🇮🇩", name: "Bahasa Indonesia" },
  { code: "tr", flag: "🇹🇷", name: "Türkçe" },
  { code: "pl", flag: "🇵🇱", name: "Polski" },
  { code: "sw", flag: "🇰🇪", name: "Kiswahili" },
  { code: "auto", flag: "🌐", name: "Outros (Auto Detectar)" }
].map((lang) => ({ ...lang, label: `${lang.flag} ${lang.name}` }))

export async function loadLang(lang){
  cleanStoredLang()
  CURRENT_LANG = lang

  // Tradução automática
  if(lang === "auto"){
    const nav = (navigator.language || "en").toLowerCase();
    const baseMod = await modules['./translations/en.js']()
    const base = baseMod.default || baseMod
    const cacheKey = `auto-translation-${nav}`;
    let autoT = localStorage.getItem(cacheKey);
    if(autoT){
      T = JSON.parse(autoT);
    } else {
      // Start with complete base
      T = {...base};
      for(const k of Object.keys(base)){
        if(typeof base[k] === "string"){
          try {
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${nav}&dt=t&q=${encodeURIComponent(base[k])}`;
            const resp = await fetch(url);
            const data = await resp.json();
            T[k] = data[0][0][0];
          } catch(e){
            T[k] = base[k];
          }
        } else {
          T[k] = base[k];
        }
      }
      localStorage.setItem(cacheKey, JSON.stringify(T));
    }
    return;
  }

  // Garantir que o idioma solicitado existe
  const validLang = LANGS.find(l => l.code === lang)?.code || "en"
  const key = `./translations/${validLang}.js`
  
  if(!modules[key]){
    console.warn("Language file missing:", key, "- using English")
    CURRENT_LANG = "en"
    const enMod = await modules['./translations/en.js']()
    T = {... (enMod.default || enMod)}
    localStorage.setItem("lang", "en")
    return
  }
  
  const mod = await modules[key]()
  const langData = mod.default || mod
  const baseMod = await modules['./translations/en.js']()
  const base = baseMod.default || baseMod
  
  T = deepMerge(base, langData)
  
  CURRENT_LANG = validLang
  localStorage.setItem("lang", validLang)
}

export function detectLang(){
  cleanStoredLang()
  
  const saved = localStorage.getItem("lang")
  if(saved) {
    const validCode = LANGS.find(l => l.code === saved)?.code
    if(validCode) return validCode
  }

  const nav = (navigator.language || "en").toLowerCase()

  if(nav.startsWith("pt-br")) return "pt-br"
  if(nav.startsWith("pt")) return "pt-pt"

  const short = nav.split("-")[0]
  const found = LANGS.find(l => l.code === short)?.code
  return found || "en"
}

function updateDocumentDirection(langCode){
  document.documentElement.setAttribute("dir", ["ar","ur"].includes(langCode) ? "rtl" : "ltr")
}

function getValidLangCode(code){
  return LANGS.find((lang) => lang.code === code)?.code || "en"
}

let langComboCleanup = null

export function buildLangSelect(){
  const select = document.getElementById("langSelect")
  if(!select) return

  select.innerHTML = LANGS.map(l =>
    `<option value="${l.code}">${l.label}</option>`
  ).join("")

  const current = getValidLangCode(localStorage.getItem("lang") || detectLang())
  select.value = current
  updateDocumentDirection(current)

  select.onchange = async () => {
    const nextCode = getValidLangCode(select.value)
    updateDocumentDirection(nextCode)
    await loadLang(nextCode)
    location.reload()
  }

  if(langComboCleanup){
    langComboCleanup()
    langComboCleanup = null
  }

  const parent = select.parentElement
  if(!parent) return

  const oldCombo = parent.querySelector(".lang-combobox")
  if(oldCombo) oldCombo.remove()

  select.classList.add("lang-native-hidden")

  const combo = document.createElement("div")
  combo.className = "lang-combobox"
  combo.setAttribute("data-current-lang", current)

  combo.innerHTML = `
    <button type="button" class="lang-combobox-trigger" aria-haspopup="listbox" aria-expanded="false">
      <span class="lang-combobox-trigger-content"></span>
      <span class="lang-combobox-caret" aria-hidden="true">▾</span>
    </button>
    <div class="lang-combobox-list" role="listbox" tabindex="-1"></div>
  `

  parent.appendChild(combo)

  const trigger = combo.querySelector(".lang-combobox-trigger")
  const triggerContent = combo.querySelector(".lang-combobox-trigger-content")
  const list = combo.querySelector(".lang-combobox-list")

  if(!trigger || !triggerContent || !list) return

  const renderTrigger = () => {
    const selectedCode = combo.getAttribute("data-current-lang") || "en"
    const selectedLang = LANGS.find((lang) => lang.code === selectedCode) || LANGS[0]
    triggerContent.innerHTML = `
      <span class="lang-option-flag" aria-hidden="true">${selectedLang.flag}</span>
      <span class="lang-option-name">${selectedLang.name}</span>
    `
  }

  const closeList = () => {
    combo.classList.remove("open")
    trigger.setAttribute("aria-expanded", "false")
  }

  const openList = () => {
    combo.classList.add("open")
    trigger.setAttribute("aria-expanded", "true")
  }

  const toggleList = () => {
    if(combo.classList.contains("open")){
      closeList()
      return
    }
    openList()
  }

  const buildOptions = () => {
    const selectedCode = combo.getAttribute("data-current-lang") || "en"
    list.innerHTML = LANGS.map((lang) => {
      const activeClass = lang.code === selectedCode ? " active" : ""
      return `
        <button type="button" class="lang-combobox-option${activeClass}" role="option" data-lang="${lang.code}" aria-selected="${lang.code === selectedCode}">
          <span class="lang-option-flag" aria-hidden="true">${lang.flag}</span>
          <span class="lang-option-name">${lang.name}</span>
        </button>
      `
    }).join("")
  }

  const onOptionClick = async (event) => {
    const option = event.target.closest(".lang-combobox-option")
    if(!option) return

    const code = getValidLangCode(option.getAttribute("data-lang") || "en")
    select.value = code
    combo.setAttribute("data-current-lang", code)
    updateDocumentDirection(code)
    renderTrigger()
    closeList()

    await loadLang(code)
    location.reload()
  }

  const onDocumentClick = (event) => {
    if(!combo.contains(event.target)) closeList()
  }

  const onDocumentKeydown = (event) => {
    if(event.key === "Escape") closeList()
  }

  trigger.addEventListener("click", toggleList)
  trigger.addEventListener("keydown", (event) => {
    if(event.key === "ArrowDown" || event.key === "Enter" || event.key === " "){
      event.preventDefault()
      openList()
    }
  })
  list.addEventListener("click", onOptionClick)
  document.addEventListener("click", onDocumentClick)
  document.addEventListener("keydown", onDocumentKeydown)

  langComboCleanup = () => {
    document.removeEventListener("click", onDocumentClick)
    document.removeEventListener("keydown", onDocumentKeydown)
  }

  renderTrigger()
  buildOptions()
}

export function isRtl(){
  return ["ar","ur"].includes(CURRENT_LANG)
}
