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
    console.error("Language file missing:", key)
    return
  }
  const mod = await modules[key]()
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
  if(saved) return saved

  const nav = (navigator.language || "en").toLowerCase()

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

  // UI direction support for RTL languages
  document.documentElement.setAttribute("dir", ["ar","ur"].includes(current) ? "rtl" : "ltr")
}

export function isRtl(){
  return ["ar","ur"].includes(CURRENT_LANG)
}
