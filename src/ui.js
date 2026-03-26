import { EVENTS, ICONS, DAY_KEYS } from "./events.js"
import { getLocal, formatTime, formatDate, toggleFormat, is24h } from "./calctime.js"
import { T, CURRENT_LANG } from "./translate.js"

const SERVER_OFFSET = "UTC-2" // accepts numeric (+2, -2, 5.5), or string (UTC+5:30, +5:30, -0530)

let currentFilter = "all"

export function initUI(){
  const timeBtn = document.getElementById("timeBtn")

  timeBtn.onclick = ()=>{
    toggleFormat()
    setTimeButton()
    updateAll()
  }

  setTimeButton()
  buildTable()
  fillCells()
  applyTranslations()
  hookFilters()

  // Aviso de tradução automática
  showAutoTranslationNotice()

  setInterval(updateAll,1000)
}

function showAutoTranslationNotice(){
  if(window.CURRENT_LANG === "auto" || (window.localStorage && localStorage.getItem("lang") === "auto")){
    let notice = document.getElementById("autoTransNotice")
    if(!notice){
      notice = document.createElement("div")
      notice.id = "autoTransNotice"
      notice.style.cssText = "background:#222;color:#ff0;padding:6px;text-align:center;font-size:13px;"
      notice.innerText = "🌐 Tradução automática via Google Translate"
      document.body.insertBefore(notice, document.body.firstChild)
    }
  } else {
    const notice = document.getElementById("autoTransNotice")
    if(notice) notice.remove()
  }
}

function setTimeButton(){
  const btn = document.getElementById("timeBtn")
  // Fallback seguro para tradução
  let t24 = T.timeFormat24 || "24H"
  let t12 = T.timeFormat12 || "12H"
  btn.textContent = is24h() ? t24 : t12
}

function updateAll(){
  updateCurrent()
  updateAlert()
  highlightNow()
  updateNext()
}

//
// 🔥 CORE: APOCALYPSE TIME ENGINE
//
function parseServerOffset(offset){
  if(typeof offset === "number") return offset * 3600000

  if(typeof offset === "string"){
    let normalized = offset.trim().toUpperCase()

    if(normalized.startsWith("UTC")){
      normalized = normalized.substring(3)
    }

    // Support +5:30, -0530, +5.5
    const reHms = /^([+-])(\d{1,2})(?::?(\d{2}))?$/
    const m = normalized.match(reHms)
    if(m){
      const sign = m[1] === "+" ? 1 : -1
      const hours = Number(m[2])
      const minutes = m[3] ? Number(m[3]) : 0
      return sign * ((hours * 60 + minutes) * 60000)
    }

    const asNum = Number(normalized)
    if(!Number.isNaN(asNum)){
      return asNum * 3600000
    }
  }

  console.warn("Invalid SERVER_OFFSET", offset)
  return 0
}

function getApocNow(){
  const now = new Date()
  const utc = now.getTime() + now.getTimezoneOffset() * 60000
  const offsetMs = parseServerOffset(SERVER_OFFSET)
  return new Date(utc + offsetMs)
}

function getApocDayStart(){
  const apoc = getApocNow()
  const start = new Date(apoc)
  start.setUTCHours(0,0,0,0)
  return start
}

function getEventType(eventName){
  if(eventName.includes("Army")) return "army"
  if(eventName.includes("Vehicle")) return "vehicle"
  if(eventName.includes("Shelter")) return "shelter"
  if(eventName.includes("Science")) return "science"
  if(eventName.includes("Hero")) return "hero"
  return "all"
}

//
// 📊 TABLE
//
function buildTable(){

  const head = document.getElementById("tableHead")
  const body = document.getElementById("tableBody")

  head.innerHTML = `
    <th>${T.time}</th>
    ${T.days.map((d,i)=>`
      <th data-day="${i}">
        ${d}
        <div class="day-title">${T.dayTitles[DAY_KEYS[i]]}</div>
      </th>
    `).join("")}
  `

  body.innerHTML = ""

  for(let r=0;r<6;r++){

    let row = `<tr><td>${String(r*4).padStart(2,"0")}:00</td>`

    for(let d=0;d<7;d++){
      row += `<td class="cell" data-day="${d}" data-hour="${r*4}"></td>`
    }

    row += "</tr>"
    body.innerHTML += row
  }
}

//
// 📅 CELLS (APOC BASED)
//
function fillCells(){

  const baseDate = getApocDayStart();
  const now = new Date();

  document.querySelectorAll(".cell").forEach(cell => {
    const day = +cell.dataset.day;
    const hour = +cell.dataset.hour;
    const ev = EVENTS[hour/4][day];
    const eventType = getEventType(ev);

    // Data UTC do evento (apocalypse calendar)
    let eventDate = new Date(baseDate);
    eventDate.setUTCDate(baseDate.getUTCDate() + day);
    eventDate.setUTCHours(hour, 0, 0, 0);

    // Se o evento já passou, mostrar só para a próxima semana
    if (eventDate < now) {
      eventDate.setUTCDate(eventDate.getUTCDate() + 7);
    }

    // Data/hora local formatada
    const localDateStr = eventDate.toLocaleDateString(CURRENT_LANG, { day: '2-digit', month: '2-digit', year: 'numeric' });
    const localTimeStr = eventDate.toLocaleTimeString(CURRENT_LANG, { hour: '2-digit', minute: '2-digit', hour12: !is24h() });

    cell.dataset.event = eventType;

    cell.innerHTML = `
      <div class="cell-date">
        ${localDateStr} ${localTimeStr}
      </div>
      <img src="${getIcon(day,hour)}" class="radar-icon">
      <div class="cell-event">
        ${T.events[ev]}
      </div>
    `;
  });
}

//
// 🎯 CURRENT EVENT (APOC)
//
function updateCurrent(){

  const now = getApocNow()

  const day = now.getUTCDay()
  const row = Math.floor(now.getUTCHours()/4)

  const ev = EVENTS[row][day]

  document.getElementById("currentEventBar").innerText =
    `${T.current}: ${T.events[ev]}`
}

//
// 📍 HIGHLIGHT (APOC)
//
function highlightNow(){

  const now = getApocNow()

  const day = now.getUTCDay()
  const hour = now.getUTCHours()
  const row = Math.floor(hour/4)*4

  document.querySelectorAll(".cell").forEach(c=>{
    c.classList.remove("active","today-col")
  })

  document.querySelectorAll(`[data-day="${day}"]`)
    .forEach(c=>c.classList.add("today-col"))

  const active = document.querySelector(`.cell[data-day="${day}"][data-hour="${row}"]`)

  if(active) active.classList.add("active")
}

//
// ⏱ NEXT EVENT (APOC)
//
function updateNext(){

  const now = getApocNow()

  const currentHour = now.getUTCHours()
  const currentMin = now.getUTCMinutes()

  let nextHour = Math.ceil((currentHour + currentMin/60)/4)*4
  if(nextHour === 24) nextHour = 0

  let diffMinutes = (60 - currentMin) % 60
  let diffHours = (nextHour - currentHour + 24) % 24
  if(diffMinutes !== 0) diffHours--

  if(diffHours < 0) diffHours = 23

  const local = getLocal()
  const localStr = formatTime(local, CURRENT_LANG)

  document.getElementById("timeInfo").innerText =
    `${T.localLabel}: ${localStr} | ${T.apocLabel}: ${String(currentHour).padStart(2,"0")}:${String(currentMin).padStart(2,"0")} | ${T.nextLabel}: ${String(diffHours).padStart(2,"0")}:${String(diffMinutes).padStart(2,"0")}`
}

//
// 🚨 ALERT (APOC)
//
function updateAlert(){

  const now = getApocNow()

  const d = now.getUTCDay()
  const h = now.getUTCHours()

  const isRed = getIcon(d,h) === ICONS.red

  const el = document.getElementById("alertBar")

  el.innerText = isRed ? T.alert : ""
  el.className = isRed ? "alert active" : "alert"
}

//
// 🎨 ICON RULES
//
function getIcon(day,hour){

  if(day===0) return ICONS.red
  if(day===3 && hour>=16) return ICONS.red
  if(day===4) return ICONS.red
  if(day===6 && hour>=16) return ICONS.red
  if(day===1 || day===5) return ICONS.gold

  return ICONS.white
}

//
// 🎛 FILTER
//
function hookFilters(){

  document.querySelectorAll("#eventFilters button").forEach(btn=>{

    btn.onclick = ()=>{

      currentFilter = btn.dataset.filter

      document.querySelectorAll("#eventFilters button")
        .forEach(b=>b.classList.remove("selected"))

      btn.classList.add("selected")

      applyFilter()
    }
  })
}

function applyFilter(){

  document.querySelectorAll(".cell").forEach(cell=>{

    const eventType = cell.dataset.event || "all"

    if(currentFilter==="all"){
      cell.classList.remove("dim")
      return
    }

    if(eventType === currentFilter){
      cell.classList.remove("dim")
    } else {
      cell.classList.add("dim")
    }
  })
}

//
// 🌍 TRANSLATIONS
//
function applyTranslations(){

  const f = T.filters

  document.querySelector('[data-filter="all"]').textContent = f.all
  document.querySelector('[data-filter="army"]').textContent = f.army
  document.querySelector('[data-filter="hero"]').textContent = f.hero
  document.querySelector('[data-filter="shelter"]').textContent = f.shelter
  document.querySelector('[data-filter="vehicle"]').textContent = f.vehicle
  document.querySelector('[data-filter="science"]').textContent = f.science
}