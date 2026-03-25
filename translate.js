const LANG_META={
en:{flag:"🇺🇸",name:"English"},
pt:{flag:"🇧🇷",name:"Português"}
}

let LANG=localStorage.getItem("lang")||"en"
let T=null

async function loadLang(lang){
  return new Promise(res=>{
    let s=document.createElement("script")
    s.src=`translations/${lang}.js`
    s.onload=()=>{
      T=window[`TRANSLATIONS_${lang.toUpperCase()}`]
      res()
    }
    document.body.appendChild(s)
  })
}

function buildLangMenu(){
  let m=document.getElementById("langMenu")
  m.innerHTML=""

  for(let k in LANG_META){
    let d=document.createElement("div")
    d.innerText=LANG_META[k].flag+" "+LANG_META[k].name
    d.onclick=async()=>{
      LANG=k
      localStorage.setItem("lang",k)
      await loadLang(k)
      applyUI()
      updateCalendar()
    }
    m.appendChild(d)
  }
}
