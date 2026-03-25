import {
  getServerNow,
  getCurrentSlot,
  getNextEventCountdown,
  formatTime
} from './calctime.js'

import { EVENTS, ICONS } from './events.js'
import { T } from './translate.js'

export let use24h = true

export function toggleTimeFormat(){
  use24h = !use24h
}

// =============================
// BUILD TABLE
// =============================
export function buildTable(){
  const body = document.getElementById("tableBody")
  body.innerHTML = ""

  const TIMES = [0,4,8,12,16,20]

  for(let r=0;r<6;r++){
    const tr = document.createElement("tr")

    tr.innerHTML = `<td>${TIMES[r]}:00</td>`

    for(let c=0;c<7;c++){
      const td = document.createElement("td")
      td.className = "timeCell"
      tr.appendChild(td)
    }

    body.appendChild(tr)
  }
}

// =============================
// UPDATE CALENDAR
// =============================
export async function updateCalendar(){

  const localNow = new Date()
  const serverNow = getServerNow()
  const slot = getCurrentSlot()
  const cd = getNextEventCountdown()

  const TIMES = [0,4,8,12,16,20]

  const cells = document.querySelectorAll(".timeCell")

  let index = 0
  let showAlert = false

  for(let r=0;r<6;r++){
    for(let c=0;c<7;c++){

      const hour = TIMES[r]

      const base = new Date(serverNow)
      base.setHours(hour,0,0,0)

      // =============================
      // ICON LOGIC
      // =============================
      let icon = "white"

      if(c===0) icon="red"
      else if(c===1) icon="gold"
      else if(c===3 && hour>=16) icon="red"
      else if(c===4) icon="red"
      else if(c===5) icon="gold"
      else if(c===6 && hour>=16) icon="red"

      const rawEvent = EVENTS[c][r]
      const event = (T.events && T.events[rawEvent]) || rawEvent

      const cell = cells[index]

      // reset classes
      cell.className = "timeCell"

      // =============================
      // CONTENT
      // =============================
      cell.innerHTML = `
        <img src="${ICONS[icon]}" width="16"><br>
        ${formatTime(base, use24h)}<br>
        ${event}
      `

      // =============================
      // CURRENT DAY COLUMN
      // =============================
      if(c === slot.day){
        cell.classList.add("currentColumn")
      }

      // =============================
      // ACTIVE EVENT
      // =============================
      if(c === slot.day && r === slot.index){

        cell.classList.add("activeEvent")

        // prevent animation stacking (UX polish)
        cell.style.animation = "none"
        cell.offsetHeight
        cell.style.animation = ""

        if(icon === "red"){
          showAlert = true
        }
      }

      // =============================
      // RED STATE
      // =============================
      if(icon === "red"){
        cell.classList.add("redEvent")
      }

      index++
    }
  }

  // =============================
  // CURRENT EVENT BAR
  // =============================
  const currentEvent =
    (T.events && T.events[EVENTS[slot.day][slot.index]]) ||
    EVENTS[slot.day][slot.index]

  document.getElementById("currentEventBar").innerText =
    `${T.current || "Current Event"}: ${currentEvent}`

  // =============================
  // TIME INFO
  // =============================
  document.getElementById("timeInfo").innerText =
    `Local ${formatTime(localNow, use24h)} | Apoc ${formatTime(serverNow, use24h)} | ${cd.hours}h ${cd.minutes}m ${cd.seconds}s`

  // =============================
  // ALERT BAR
  // =============================
  document.getElementById("alertBar").innerText =
    showAlert ? (T.alert || "Do not claim radar missions") : ""
}