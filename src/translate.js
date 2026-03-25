export let T = {}

const LANGS = ["en","pt-BR"]

export async function loadLang(lang){
  try {
    T = (await import(`./translations/${lang}.js`)).default
  } catch {
    T = (await import(`./translations/en.js`)).default
  }
  localStorage.setItem("lang", lang)
}

export function detectLang(){
  return localStorage.getItem("lang") || navigator.language || "en"
}

export function buildLangSelect(){
  const sel = document.getElementById("langSelect")

  sel.innerHTML = LANGS.map(l=>`<option value="${l}">${l}</option>`).join("")
  sel.value = detectLang()

  sel.onchange = async ()=>{
    await loadLang(sel.value)
    location.reload()
  }
}