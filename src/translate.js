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

export const LANGS = [
  {code:"en",label:"🇺🇸 English"},
  {code:"pt-br",label:"🇧🇷 Português (BR)"},
  {code:"pt-pt",label:"🇵🇹 Português (PT)"},
  {code:"es",label:"🇪🇸 Español"},
  {code:"fr",label:"🇫🇷 Français"},
  {code:"de",label:"🇩🇪 Deutsch"},
  {code:"it",label:"🇮🇹 Italiano"},
  {code:"ru",label:"🇷🇺 Русский"},
  {code:"zh",label:"🇨🇳 中文"},
  {code:"ja",label:"🇯🇵 日本語"},
  {code:"ko",label:"🇰🇷 한국어"},
  {code:"hi",label:"🇮🇳 हिन्दी"},
  {code:"bn",label:"🇧🇩 বাংলা"},
  {code:"mr",label:"🇮🇳 मराठी"},
  {code:"ar",label:"🇸🇦 العربية"},
  {code:"ur",label:"🇵🇰 اردو"},
  {code:"id",label:"🇮🇩 Bahasa Indonesia"},
  {code:"tr",label:"🇹🇷 Türkçe"},
  {code:"pl",label:"🇵🇱 Polski"},
  {code:"sw",label:"🇰🇪 Kiswahili"},
  {code:"auto",label:"🌐 Outros (Auto Detectar)"}
]

export async function loadLang(lang){
  CURRENT_LANG = lang

  // Tradução automática
  if(lang === "auto"){
    const nav = (navigator.language || "en").toLowerCase();
    const base = (await modules['./translations/en.js']()).default;
    const cacheKey = `auto-translation-${nav}`;
    let autoT = localStorage.getItem(cacheKey);
    if(autoT){
      T = JSON.parse(autoT);
    } else {
      // Chave/valor traduzido
      T = {...base};
      for(const k of Object.keys(base)){
        if(typeof base[k] === "string"){
          try {
            // Google Translate API gratuita (exemplo, substitua pela sua chave real)
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

  const key = `./translations/${lang}.js`
  if(!modules[key]){
    console.warn("Language file missing:", key, "- falling back to English")
    lang = "en"
    CURRENT_LANG = "en"
  }
  
  const finalKey = `./translations/${lang}.js`
  const mod = await modules[finalKey]()
  const base = (await modules['./translations/en.js']()).default
  // Fallback seguro: retorna chave do inglês se faltar
  T = new Proxy(mod.default, {
    get(target, prop) {
      if (prop in target) return target[prop]
      return base[prop]
    }
  })
  localStorage.setItem("lang", lang)
}

export function detectLang(){

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

export function buildLangSelect(){

  const select = document.getElementById("langSelect")

  select.innerHTML = LANGS.map(l =>
    `<option value="${l.code}">${l.label}</option>`
  ).join("")

  const current = detectLang()
  select.value = current

  select.onchange = async () => {
    await loadLang(select.value)
    location.reload()
  }

  // UI direction support for RTL languages
  document.documentElement.setAttribute("dir", ["ar","ur"].includes(current) ? "rtl" : "ltr")
}

export function isRtl(){
  return ["ar","ur"].includes(CURRENT_LANG)
}
