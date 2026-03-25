
export const LANGS = ["en","pt-br","pt-pt","es","it","ru","ko","ja","hi","zh","ar","bn","ur","id","de","sw","mr","fr"];
export let LANG = localStorage.getItem("lang") || detectLang();
export let T = {};

function detectLang(){
  let l = navigator.language.toLowerCase();
  if(l.includes("-")) l = l.split("-")[0];
  return LANGS.includes(l) ? l : "en";
}

export async function loadLang(lang){
  try{
    const mod = await import(`./translations/${lang}.js`);
    T = mod.default || {};
  }catch{ T = {}; }
}

export function buildLangSelect(){
  const select = document.getElementById("langSelect");
  if(!select) return;
  select.innerHTML = "";
  LANGS.forEach(l=>{
    const opt = document.createElement("option");
    opt.value = l; opt.text = l.toUpperCase();
    if(l===LANG) opt.selected = true;
    select.appendChild(opt);
  });
  select.onchange = async ()=>{
    LANG = select.value;
    localStorage.setItem("lang", LANG);
    await loadLang(LANG);
    location.reload();
  };
}
