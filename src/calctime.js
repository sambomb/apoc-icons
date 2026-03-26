const SERVER_OFFSET = -2

export function getApoc(){

  const now = new Date()
  const utc = now.getTime() + now.getTimezoneOffset()*60000
  const server = new Date(utc + SERVER_OFFSET*3600000)

  let h = server.getHours()
  let m = server.getMinutes()
  let s = server.getSeconds()

  if(s >= 30) m++
  if(m === 60){ m=0; h++ }
  if(h === 24) h=0

  return { h, m }
}

export function formatLocalTime(date, lang){

  return new Intl.DateTimeFormat(lang, {
    hour:"2-digit",
    minute:"2-digit",
    second:"2-digit"
  }).format(date)
}