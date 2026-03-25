import { EVENTS, ICONS } from './events.js'
import { getCurrentSlot, formatTime, getServerNow } from './calctime.js'
import { T } from './translate.js'
import { use24h } from './ui.js'

let currentMobileDay = new Date().getDay()
let startX = 0

// =============================
// RENDER MOBILE VIEW
// =============================
export function renderMobile(){
  const container = document.getElementById("mobileDay")
  if(!container) return

  container.innerHTML = ""

  const slot = getCurrentSlot()
  const serverNow = getServerNow()

  const TIMES = [0,4,8,12,16,20]

  for(let r=0;r<6;r++){

    const raw = EVENTS[currentMobileDay][r]
    const event = (T.events && T.events[raw]) || raw

    const div = document.createElement("div")
    div.className = "mobileCell"

    if(currentMobileDay === slot.day && r === slot.index){
      div.classList.add("active")
    }

    const base = new Date(serverNow)
    base.setHours(TIMES[r],0,0,0)

    div.innerHTML = `
      <img src="${ICONS.white}" width="18"><br>
      ${formatTime(base, use24h)}<br>
      ${event}
    `

    container.appendChild(div)
  }
}

// =============================
// SWIPE NAVIGATION (UX POLISH)
// =============================
export function hookMobile(){

  document.addEventListener("touchstart", e=>{
    startX = e.touches[0].clientX
  })

  document.addEventListener("touchend", e=>{
    const delta = startX - e.changedTouches[0].clientX

    if(Math.abs(delta) < 50) return

    // swipe feedback animation
    document.body.style.transition = "transform 0.2s ease"
    document.body.style.transform =
      delta > 0 ? "translateX(-20px)" : "translateX(20px)"

    setTimeout(()=>{
      document.body.style.transform = "translateX(0)"
    }, 200)

    currentMobileDay =
      delta > 0
        ? (currentMobileDay + 1) % 7
        : (currentMobileDay + 6) % 7

    renderMobile()
  })

  // hook into main update loop
  const originalUpdate = window.updateCalendar

  window.updateCalendar = async ()=>{
    if(originalUpdate) await originalUpdate()
    renderMobile()
  }
}