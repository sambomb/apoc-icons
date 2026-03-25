```js id="app_core"
// ---------- APP BOOTSTRAP ----------

async function appInit(){

console.log("🚀 App starting...")

// 1. Wait DOM
if(document.readyState !== "complete"){
await new Promise(res => window.addEventListener("load", res))
}

console.log("✅ DOM ready")

// 2. Load language
await loadLang(LANG)

console.log("🌍 Language loaded:", LANG)

// 3. Build UI
buildLangSelect()
buildTable()

console.log("🧱 UI built")

// 4. Hook mobile AFTER UI exists
if(typeof hookMobile === "function"){
hookMobile()
console.log("📱 Mobile hooked")
}

// 5. First render
await updateCalendar()

// 6. Start loop
setInterval(updateCalendar, 1000)

console.log("🔥 App running")
}

// RUN ONLY HERE
appInit()
```
