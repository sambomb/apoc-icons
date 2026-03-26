const modules = import.meta.glob('./translations/*.js')

export let T = {}
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
  {code:"sw",label:"🇰🇪 Kiswahili"}
]

export async function loadLang(lang){

  CURRENT_LANG = lang

  const key = `./translations/${lang}.js`

  if(!modules[key]){
    console.error("Language file missing:", key)
    return
  }

  const mod = await modules[key]()
  T = mod.default

  localStorage.setItem("lang", lang)
}

export function detectLang(){

  const saved = localStorage.getItem("lang")
  if(saved) return saved

  const nav = navigator.language.toLowerCase()

  if(nav.startsWith("pt-br")) return "pt-br"
  if(nav.startsWith("pt")) return "pt-pt"

  const short = nav.split("-")[0]
  return LANGS.find(l => l.code === short)?.code || "en"
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
}