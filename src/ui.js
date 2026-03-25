
import { getApocNow, getCurrentSlot, getCountdown, formatTime, APOC_TIMES } from './calctime.js';
import { EVENTS, ICONS } from './events.js';
import { T } from './translate.js';

export let use24h = true;
export function toggleTimeFormat(){ use24h = !use24h; }

export function buildTable(){
  const body = document.getElementById("tableBody");
  body.innerHTML = "";
  for(let r=0;r<6;r++){
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${APOC_TIMES[r]}:00</td>`;
    for(let c=0;c<7;c++){
      const td = document.createElement("td");
      td.className="timeCell";
      tr.appendChild(td);
    }
    body.appendChild(tr);
  }
}

export async function updateCalendar(){
  const now = new Date();
  const apoc = getApocNow();
  const slot = getCurrentSlot();
  const cd = getCountdown();

  const cells = document.querySelectorAll(".timeCell");
  let index = 0;
  let alert=false;

  for(let r=0;r<6;r++){
    for(let c=0;c<7;c++){
      const hour = APOC_TIMES[r];
      const base = new Date(); base.setHours(hour,0,0,0);

      let icon="white";
      if(c===0)icon="red";
      else if(c===1)icon="gold";
      else if(c===3 && hour>=16)icon="red";
      else if(c===4)icon="red";
      else if(c===5)icon="gold";
      else if(c===6 && hour>=16)icon="red";

      const raw = EVENTS[c][r];
      const event = (T.events && T.events[raw]) || raw;

      const cell = cells[index];
      cell.className="timeCell";
      cell.innerHTML = `
        <img src="${ICONS[icon]}" width="16"><br>
        ${formatTime(base,use24h)}<br>
        ${event}
      `;

      if(c===slot.day) cell.classList.add("currentColumn");
      if(c===slot.day && r===slot.index){
        cell.classList.add("activeEvent");
        if(icon==="red") alert=true;
      }
      if(icon==="red") cell.classList.add("redEvent");

      index++;
    }
  }

  const ce = (T.events && T.events[EVENTS[slot.day][slot.index]]) || EVENTS[slot.day][slot.index];
  document.getElementById("currentEventBar").innerText = `${T.current||"Current Event"}: ${ce}`;
  document.getElementById("timeInfo").innerText =
    `Local ${formatTime(now,use24h)} | Apoc ${formatTime(apoc,use24h)} | ${cd.h}h ${cd.m}m`;
  document.getElementById("alertBar").innerText =
    alert ? (T.alert||"Do not claim radar missions") : "";
}
