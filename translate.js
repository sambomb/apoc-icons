let LANG=localStorage.getItem("lang")||"en"
let T={}

// Load base translation
async function loadLang(lang){
  return new Promise(res=>{
    let s=document.createElement("script")
    s.src=`translations/${lang}.js`
    s.onload=()=>{
      T=window[`TRANSLATIONS_${lang.toUpperCase()}`]||{}
      res()
    }
    document.body.appendChild(s)
  })
}

// AUTO TRANSLATE FALLBACK
async function autoTranslate(text){

  let cacheKey="tr_"+LANG+"_"+text
  let cached=localStorage.getItem(cacheKey)
  if(cached)return cached

  try{
    let res=await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${LANG}`
    )
    let data=await res.json()
    let translated=data.responseData.translatedText

    localStorage.setItem(cacheKey,translated)
    return translated

  }catch{
    return text
  }
}

// SAFE TRANSLATION
async function translateEvent(text){
  if(T.events && T.events[text]) return T.events[text]
  return await autoTranslate(text)
}
