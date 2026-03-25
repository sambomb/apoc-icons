// supports fractional timezone offset (ex: +5:30 = 330)
const APOC_OFFSET_MINUTES = -120

const APOC_TIMES=[0,4,8,12,16,20]

function getApocNow(){
  return new Date(Date.now() + APOC_OFFSET_MINUTES * 60000)
}

function getCurrentSlot(){
  let apoc=getApocNow()
  let h=apoc.getHours()

  for(let i=0;i<APOC_TIMES.length;i++){
    if(h>=APOC_TIMES[i] && h<APOC_TIMES[i]+4){
      return {day:apoc.getDay(),index:i}
    }
  }
}

function getCountdown(){
  let apoc=getApocNow()
  let slot=getCurrentSlot()

  let nextHour=APOC_TIMES[slot.index]+4
  let target=new Date(apoc)
  target.setHours(nextHour,0,0,0)

  if(nextHour>=24){
    target.setDate(target.getDate()+1)
    target.setHours(0,0,0,0)
  }

  let diff=target-apoc

  return {
    h:Math.floor(diff/3600000),
    m:Math.floor((diff%3600000)/60000)
  }
}

function formatTime(d,use24h){
  return d.toLocaleTimeString([],{
    hour:'2-digit',
    minute:'2-digit',
    hour12:!use24h
  })
}
