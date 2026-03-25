
export const APOC_TIMES = [0,4,8,12,16,20];
export const APOC_OFFSET_MINUTES = -120;

export function getApocNow(){
  return new Date(Date.now() + APOC_OFFSET_MINUTES * 60000);
}

export function getCurrentSlot(){
  const apoc = getApocNow();
  const h = apoc.getHours();
  for(let i=0;i<APOC_TIMES.length;i++){
    if(h >= APOC_TIMES[i] && h < APOC_TIMES[i] + 4){
      return { day: apoc.getDay(), index: i };
    }
  }
  return { day: apoc.getDay(), index: 0 };
}

export function getCountdown(){
  const apoc = getApocNow();
  const slot = getCurrentSlot();
  let nextHour = APOC_TIMES[slot.index] + 4;
  let target = new Date(apoc);
  if(nextHour >= 24){
    target.setDate(target.getDate()+1);
    nextHour = nextHour % 24;
  }
  target.setHours(nextHour,0,0,0);
  const diff = target - apoc;
  return {
    h: Math.floor(diff/3600000),
    m: Math.floor((diff%3600000)/60000),
    s: Math.floor((diff%60000)/1000)
  };
}

export function formatTime(date, use24h=true){
  return new Date(date).toLocaleTimeString([],{
    hour:'2-digit', minute:'2-digit', hour12:!use24h
  });
}
