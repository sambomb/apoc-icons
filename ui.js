let use24h=true

function toggleTimeFormat(){use24h=!use24h}

function buildTable(){

let header=document.getElementById("tableHeader")
header.innerHTML="<th>Time</th>"

for(let i=0;i<7;i++) header.innerHTML+=`<th>${i}</th>`

let body=document.getElementById("tableBody")

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

async function updateCalendar(){

let now=new Date()
let apoc=getApocNow()
let slot=getCurrentSlot()
let cd=getCountdown()

let cells=document.querySelectorAll(".timeCell")
let index=0

for(let r=0;r<6;r++){
for(let c=0;c<7;c++){

let raw=EVENTS[c][r]
let event=await translateEvent(raw)

cells[index].innerText=event

if(c===slot.day && r===slot.index)
cells[index].classList.add("activeEvent")

index++
}}

document.getElementById("currentEventBar").innerText=
event=await translateEvent(EVENTS[slot.day][slot.index])

document.getElementById("timeInfo").innerText=
`Local ${formatTime(now,use24h)} | Apoc ${formatTime(apoc,use24h)} | ${cd.h}h ${cd.m}m`
}

async function init(){
await loadLang(LANG)
buildTable()
setInterval(updateCalendar,1000)
updateCalendar()
}

init()
