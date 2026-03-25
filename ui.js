let use24h=true
let currentFilter="all"

function toggleTimeFormat(){
use24h=!use24h
}

// FILTER
function filterEvents(type){
currentFilter=type

document.querySelectorAll("#eventFilters button").forEach(b=>b.classList.remove("active"))
document.getElementById("btn"+type.charAt(0).toUpperCase()+type.slice(1)).classList.add("active")

document.querySelectorAll(".timeCell").forEach(c=>{
if(type==="all"){c.style.opacity=1;return}
c.style.opacity=c.innerText.toLowerCase().includes(type.toLowerCase())?1:0.2
})
}

// TABLE
function buildTable(){

let header=document.getElementById("tableHeader")
header.innerHTML="<th>Time</th>"

for(let i=0;i<7;i++){
header.innerHTML+=`<th>${i}</th>`
}

let body=document.getElementById("tableBody")
body.innerHTML=""

for(let r=0;r<6;r++){
let tr=document.createElement("tr")
tr.innerHTML=`<td>${APOC_TIMES[r]}:00</td>`

for(let c=0;c<7;c++){
let td=document.createElement("td")
td.className="timeCell"
tr.appendChild(td)
}
body.appendChild(tr)
}
}

// MOBILE
function renderMobile(data){

let container=document.getElementById("mobileCards")
container.innerHTML=""

data.forEach(d=>{
let div=document.createElement("div")
div.className="card"

if(d.active)div.classList.add("active")
if(d.red)div.classList.add("red")

div.innerHTML=`
<div class="time">${d.time}</div>
<div class="event">${d.event}</div>
`

container.appendChild(div)
})
}

// UPDATE
async function updateCalendar(){

let now=new Date()
let apoc=getApocNow()
let slot=getCurrentSlot()
let cd=getCountdown()

let cells=document.querySelectorAll(".timeCell")
let mobileData=[]
let index=0

for(let r=0;r<6;r++){
for(let c=0;c<7;c++){

let raw=EVENTS[c][r]
let event=await translateEvent(raw)

cells[index].innerText=event

let active=(c===slot.day && r===slot.index)

if(active)cells[index].classList.add("activeEvent")

mobileData.push({
time: formatTime(new Date().setHours(APOC_TIMES[r],0,0,0),use24h),
event,
active,
red:(c===0||c===4)
})

index++
}}

// MOBILE RENDER
renderMobile(mobileData)

// HEADER
let currentEvent=await translateEvent(EVENTS[slot.day][slot.index])

document.getElementById("currentEventBar").innerText=
`${T.current||"Current"}: ${currentEvent}`

document.getElementById("timeInfo").innerText=
`Local ${formatTime(now,use24h)} | Apoc ${formatTime(apoc,use24h)} | ${cd.h}h ${cd.m}m`

filterEvents(currentFilter)
}

// INIT
async function init(){

await loadLang(LANG)

buildLangMenu()
buildTable()
applyUI()

setInterval(updateCalendar,1000)
updateCalendar()
}

init()
