import { EVENTS, ICONS, DAY_KEYS } from "./events.js"
import { getApoc } from "./calctime.js"
import { T } from "./translate.js"

let currentFilter = "all"

export function initUI(){

  buildTable()
  fillCells()
  applyTranslations()
  hookFilters()

  document.getElementById("timeBtn").onclick = toggleFormat

  setInterval(()=>{
    updateCurrent()
    updateAlert()
  },1000)
}

function buildTable(){

  const head = document.getElementById("tableHead")
  const body = document.getElementById("tableBody")

  head.innerHTML = `
    <th>${T.time}</th>
    ${T.days.map((d,i)=>`
      <th>${d}<br><span class="day-title">${T.dayTitles[DAY_KEYS[i]]}</span></th>
    `).join("")}
  `

  for(let r=0;r<6;r++){
    let tr = `<tr><td>${formatHour(r*4)}</td>`

    for(let d=0;d<7;d++){
      tr += `<td class="cell" data-day="${d}" data-hour="${r*4}"></td>`
    }

    tr += "</tr>"
    body.innerHTML += tr
  }
}

function fillCells(){

  document.querySelectorAll(".cell").forEach(cell=>{

    const day = +cell.dataset.day
    const hour = +cell.dataset.hour

    const ev = EVENTS[hour/4][day]

    cell.innerHTML = `
      <div class="cell-time">${formatHour(hour)}</div>
      <img src="${getIcon(day,hour)}" class="radar-icon">
      <div class="cell-event">${T.events[ev]}</div>
    `
  })
}

function getIcon(day,hour){

  if(day===0) return ICONS.red
  if(day===3 && hour>=16) return ICONS.red
  if(day===4) return ICONS.red
  if(day===6 && hour>=16) return ICONS.red
  if(day===1 || day===5) return ICONS.gold

  return ICONS.white
}

function updateCurrent(){

  const { h, m } = getApoc()
  const row = Math.floor(h/4)
  const col = new Date().getDay()

  const ev = EVENTS[row][col]

  document.getElementById("currentEventBar").innerText =
    `${T.current}: ${T.events[ev]}`

  document.getElementById("timeInfo").innerText =
    `Local ${new Date().toLocaleTimeString()} | Apoc ${formatHour(h)}:${String(m).padStart(2,"0")}`
}

function updateAlert(){

  const { h } = getApoc()
  const d = new Date().getDay()

  const isRed = getIcon(d,h) === ICONS.red

  document.getElementById("alertBar").innerText =
    isRed ? T.alert : ""
}

function hookFilters(){

  document.querySelectorAll("#eventFilters button").forEach(btn=>{
    btn.onclick = ()=>{
      currentFilter = btn.dataset.filter
      applyFilter()
    }
  })
}

function applyFilter(){

  document.querySelectorAll(".cell").forEach(cell=>{
    const text = cell.innerText.toLowerCase()

    cell.style.display =
      currentFilter==="all" || text.includes(currentFilter)
      ? ""
      : "none"
  })
}

function applyTranslations(){

  const f = T.filters

  document.querySelector('[data-filter="all"]').textContent = f.all
  document.querySelector('[data-filter="army"]').textContent = f.army
  document.querySelector('[data-filter="hero"]').textContent = f.hero
  document.querySelector('[data-filter="shelter"]').textContent = f.shelter
  document.querySelector('[data-filter="vehicle"]').textContent = f.vehicle
  document.querySelector('[data-filter="science"]').textContent = f.science
}

function toggleFormat(){
  const btn = document.getElementById("timeBtn")
  btn.innerText = btn.innerText === "24H" ? "AM/PM" : "24H"
}

function formatHour(h){

  const mode = document.getElementById("timeBtn").innerText

  if(mode==="AM/PM"){
    const suffix = h>=12?"PM":"AM"
    const hour = h%12||12
    return `${hour}:00 ${suffix}`
  }

  return `${String(h).padStart(2,"0")}:00`
}