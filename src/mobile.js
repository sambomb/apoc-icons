
import { EVENTS, ICONS } from './events.js';
import { getCurrentSlot, formatTime, APOC_TIMES } from './calctime.js';
import { T } from './translate.js';
import { use24h } from './ui.js';

let currentMobileDay = new Date().getDay();
let startX = 0;

function renderMobile(){
  const container = document.getElementById("mobileDay");
  if(!container) return;
  container.innerHTML = "";
  const slot = getCurrentSlot();

  for(let r=0;r<6;r++){
    const raw = EVENTS[currentMobileDay][r];
    const event = (T.events && T.events[raw]) || raw;

    const div = document.createElement("div");
    div.className = "mobileCell";
    if(currentMobileDay===slot.day && r===slot.index){
      div.classList.add("active");
    }
    const time = formatTime(new Date().setHours(APOC_TIMES[r],0,0,0), use24h);

    div.innerHTML = `
      <img src="${ICONS.white}" width="18"><br>
      ${time}<br>
      ${event}
    `;
    container.appendChild(div);
  }
}

export function hookMobile(){
  document.addEventListener("touchstart", e=>{ startX = e.touches[0].clientX; });
  document.addEventListener("touchend", e=>{
    const delta = startX - e.changedTouches[0].clientX;
    if(Math.abs(delta) < 40) return;
    currentMobileDay = delta > 0 ? (currentMobileDay + 1) % 7 : (currentMobileDay + 6) % 7;
    renderMobile();
  });

  const original = window.updateCalendar;
  window.updateCalendar = async ()=>{
    await original();
    renderMobile();
  };
}
