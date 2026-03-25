import './styles.css'
import { detectLang, loadLang, buildLangSelect } from './translate.js'
import { initUI } from './ui.js'

async function init(){
  const lang = detectLang()
  await loadLang(lang)
  buildLangSelect()
  initUI()
}

init()