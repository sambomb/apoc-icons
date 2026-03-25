import './styles.css'

import { loadLang, buildLangSelect, LANG } from './translate.js'
import { buildTable, updateCalendar, toggleTimeFormat } from './ui.js'
import { hookMobile } from './mobile.js'

// ---------- APP INIT ----------
async function init(){

console.log("🚀 Vite App starting")

await loadLang(LANG)

buildLangSelect()
buildTable()

hookMobile()

await updateCalendar()

setInterval(updateCalendar,1000)

// button
document.getElementById("timeBtn").onclick = toggleTimeFormat
}

init()
