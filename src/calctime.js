
let use24h = true;

export function toggleFormat(){ use24h = !use24h }
export function is24h(){ return use24h }

export function getLocal(){ return new Date() }

export function formatTime(d,lang){
 return new Intl.DateTimeFormat(lang,{hour:"2-digit",minute:"2-digit",hour12:!use24h}).format(d)
}

export function formatDate(d,lang){
 return new Intl.DateTimeFormat(lang,{day:"numeric",month:"short"}).format(d)
}
