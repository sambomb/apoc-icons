
import {loadLang,detectLang,buildLangSelect} from "./translate.js";
import {initUI} from "./ui.js";

(async()=>{
 try {
   const lang=detectLang();
   await loadLang(lang);
   buildLangSelect();
   initUI();
 } catch(err) {
   console.error("Erro ao inicializar aplicação:", err);
   // Fallback completo para inglês se algo falhar
   await loadLang("en");
   initUI();
 }
})();
