export let T = {}
export let CURRENT_LANG = "en"

const RTL_LANGS = ["ar","ur"]

const LANGS = [
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
  {code:"ar",label:"🇸🇦 العربية"},
  {code:"ur",label:"🇵🇰 اردو"},
  {code:"bn",label:"🇧🇩 বাংলা"},
  {code:"mr",label:"🇮🇳 मराठी"},
  {code:"id",label:"🇮🇩 Bahasa"},
  {code:"tr",label:"🇹🇷 Türkçe"},
  {code:"pl",label:"🇵🇱 Polski"},
  {code:"sw",label:"🇰🇪 Kiswahili"}
]

export async function loadLang(lang){
  CURRENT_LANG = lang

  try{
    T = (await import(`./translations/${lang}.js`)).default
  }catch{
    T = (await import(`./translations/en.js`)).default
  }

  localStorage.setItem("lang", lang)

  applyDirection(lang)
  applyFont(lang)
}

export function detectLang(){
  return localStorage.getItem("lang") || navigator.language.toLowerCase() || "en"
}

export function buildLangSelect(){

  const sel = document.getElementById("langSelect")

  sel.innerHTML = LANGS.map(l =>
    `<option value="${l.code}">${l.label}</option>`
  ).join("")

  sel.value = detectLang()

  sel.onchange = async ()=>{
    await loadLang(sel.value)
    location.reload()
  }
}

function applyDirection(lang){

  if(RTL_LANGS.includes(lang)){
    document.documentElement.dir = "rtl"
    document.body.classList.add("rtl")
  }else{
    document.documentElement.dir = "ltr"
    document.body.classList.remove("rtl")
  }
}

function applyFont(lang){

  let font = "Segoe UI"

  if(["ja","zh","ko"].includes(lang)){
    font = "Noto Sans CJK JP"
  }

  if(["ar","ur"].includes(lang)){
    font = "Noto Naskh Arabic"
  }

  if(["hi","bn","mr"].includes(lang)){
    font = "Noto Sans Devanagari"
  }

  document.body.style.fontFamily = font
}