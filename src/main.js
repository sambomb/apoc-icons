import './styles.css'

import { loadLang, buildLangSelect, LANG } from './translate.js'
import { buildTable, updateCalendar, toggleTimeFormat } from './ui.js'
import { renderMobile } from './mobile.js'

// =============================
// INIT
// =============================
async function init() {
  // Load language
  await loadLang(LANG)

  // Build UI
  buildLangSelect()
  buildTable()

  // Initial render
  await updateCalendar()
  renderMobile()

  // =============================
  // TIME FORMAT TOGGLE
  // =============================
  document.getElementById("timeBtn").onclick = () => {
    toggleTimeFormat()
    updateCalendar()
    renderMobile()
  }

  // =============================
  // AUTO UPDATE LOOP (REAL-TIME)
  // =============================
  setInterval(() => {
    updateCalendar()
    renderMobile()
  }, 1000)
}

// =============================
// START APP
// =============================
init()