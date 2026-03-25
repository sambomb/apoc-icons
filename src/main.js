
import './styles.css';
import { loadLang, buildLangSelect, LANG } from './translate.js';
import { buildTable, updateCalendar, toggleTimeFormat } from './ui.js';
import { hookMobile } from './mobile.js';

async function init(){
  await loadLang(LANG);
  buildLangSelect();
  buildTable();
  hookMobile();
  await updateCalendar();
  setInterval(updateCalendar,1000);
  document.getElementById("timeBtn").onclick = toggleTimeFormat;
}
init();
