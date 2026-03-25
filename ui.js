let use24h=true
let currentFilter="all"

function toggleTimeFormat(){
  use24h=!use24h
}

function buildTable(){

  let header=document.getElementById("tableHeader")
  header.innerHTML="<th>Time</th>"

  for(let i=0;i<7;i++){
    header.innerHTML+=`<th>${i}</th>`
  }

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

function buildFilters(){
  let f=document.getElementById("eventFilters")
  f.innerHTML=""

  let list=["all","Army","Hero","Shelter","Vehicle","Science"]

  list.forEach(l=>{
    let b=document.createElement("button")
    b.innerText=l
    b.onclick=()=>filterEvents(l)
    f.appendChild(b)
  })
}

function filterEvents(type){
  currentFilter=type

  document.querySelectorAll(".timeCell").forEach(c=>{
    if(type==="all"){c.style.opacity=1;return}
    c.style.opacity=c.innerText.includes(type)?1:0.2
  })
}

function updateCalendar(){

  let now=new Date()
  let apoc=getApocNow()
  let slot=getCurrentSlot()
  let cd=getCountdown()

  let cells=document.querySelectorAll(".timeCell")
  let index=0

  for(let r=0;r<6;r++){
    for(let c=0;c<7;c++){

      let event=EVENTS[c][r]

      cells[index].innerHTML=event

      if(c===slot.day && r===slot.index){
        cells[index].classList.add("activeEvent")
      }

      index++
    }
  }

  document.getElementById("currentEventBar").innerText=
    T.current+": "+EVENTS[slot.day][slot.index]

  document.getElementById("timeInfo").innerText=
    `Local ${formatTime(now,use24h)} | Apoc ${formatTime(apoc,use24h)} | ${cd.h}h ${cd.m}m`

}

async function init(){
  await loadLang(LANG)
  buildLangMenu()
  buildFilters()
  buildTable()

  setInterval(updateCalendar,1000)
  updateCalendar()
}

init()
