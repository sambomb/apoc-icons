const LANG_META={
en:{flag:"🇺🇸",name:"English"},
pt:{flag:"🇧🇷",name:"Português"},
es:{flag:"🇪🇸",name:"Español"},
it:{flag:"🇮🇹",name:"Italiano"},
ru:{flag:"🇷🇺",name:"Русский"},
ko:{flag:"🇰🇷",name:"한국어"},
ja:{flag:"🇯🇵",name:"日本語"},
hi:{flag:"🇮🇳",name:"हिन्दी"},

// TOP 15 ADDITIONS
zh:{flag:"🇨🇳",name:"中文"},
ar:{flag:"🇸🇦",name:"العربية"},
bn:{flag:"🇧🇩",name:"বাংলা"},
ur:{flag:"🇵🇰",name:"اردو"},
id:{flag:"🇮🇩",name:"Bahasa Indonesia"},
de:{flag:"🇩🇪",name:"Deutsch"},
sw:{flag:"🇹🇿",name:"Swahili"},
mr:{flag:"🇮🇳",name:"मराठी"}
}

let LANG=localStorage.getItem("lang")||detectLang()
let T={}

// detect browser
function detectLang(){
let l=navigator.language.toLowerCase()
if(l.includes("-")) l=l.split("-")[0]
return LANG_META[l]?l:"en"
}

// load local file
async function loadLang(lang){
return new Promise(res=>{
let s=document.createElement("script")
s.src=`translations/${lang}.js`
s.onload=()=>{
T=window[`TRANSLATIONS_${lang.toUpperCase()}`]||{}
res()
}
s.onerror=()=>{T={};res()}
document.body.appendChild(s)
})
}

// fallback translate
async function autoTranslate(text){

let key="tr_"+LANG+"_"+text
let cached=localStorage.getItem(key)
if(cached)return cached

try{
let res=await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${LANG}`)
let data=await res.json()
let t=data.responseData.translatedText

localStorage.setItem(key,t)
return t

}catch{
return text
}
}

// safe translation
async function translateEvent(text){
if(T.events && T.events[text]) return T.events[text]
return await autoTranslate(text)
}

// APPLY UI TEXTS
function applyUI(){

document.getElementById("btnAll").innerText=T.all || "All"
document.getElementById("btnArmy").innerText=T.army || "Army"
document.getElementById("btnHero").innerText=T.hero || "Hero"
document.getElementById("btnShelter").innerText=T.shelter || "Shelter"
document.getElementById("btnVehicle").innerText=T.vehicle || "Vehicle"
document.getElementById("btnScience").innerText=T.science || "Science"

}

// BUILD MENU
function buildLangMenu(){
let m=document.getElementById("langMenu")
m.innerHTML=""

for(let k in LANG_META){
let d=document.createElement("div")
d.innerHTML=`${LANG_META[k].flag} ${LANG_META[k].name}`

d.onclick=async()=>{
LANG=k
localStorage.setItem("lang",k)
await loadLang(k)
applyUI()
updateCalendar()
buildLangMenu()
}

m.appendChild(d)
}
}

// toggle menu
document.addEventListener("DOMContentLoaded",()=>{
document.getElementById("langBtn").onclick=()=>{
let m=document.getElementById("langMenu")
m.style.display=m.style.display==="block"?"none":"block"
}
})
