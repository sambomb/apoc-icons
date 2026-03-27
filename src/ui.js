import { EVENTS, ICONS, DAY_KEYS } from "./events.js"
import { getLocal, formatTime, toggleFormat, is24h } from "./calctime.js"
import { T, CURRENT_LANG } from "./translate.js"
import { GUIDE_GROUPS, GUIDE_SETS, GUIDE_MAP, GUIDE_STATS } from "./guides.js"
import { DAY_IDS_BY_INDEX, MENU_GROUPS, HERO_FACTION_MENU, getGuidePath, getHomePath } from "./routes.js"
import { displayedToBasePoints, POINT_EXAMPLES } from "./points.js"

const SERVER_OFFSET = "UTC-2"
const DONATE_URL = "https://www.paypal.com/donate/?hosted_button_id=EQ4XU8W5PWUBA"
const BASE_URL = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.BASE_URL)
  ? import.meta.env.BASE_URL
  : "/"

let currentFilter = "all"

export function initUI(){
  const timeBtn = document.getElementById("timeBtn")

  timeBtn.onclick = ()=>{
    toggleFormat()
    setTimeButton()
    updateAll()
  }

  buildStaticShell()
  setTimeButton()
  buildTable()
  fillCells()
  applyTranslations()
  hookFilters()
  hookMenu()
  hookGuideRouting()
  showAutoTranslationNotice()
  updateAll()

  setInterval(updateAll,1000)
}

function textOr(value, fallback){
  return value || fallback
}

function escapeHtml(value){
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function guideTitle(guide){
  return T.guideTitles?.[guide.id] || guide.title
}

function guideSummary(guide){
  return T.guideSummaries?.[guide.id] || guide.summary
}

function formatGuideLinks(ids){
  return ids
    .map((id) => GUIDE_MAP[id])
    .filter(Boolean)
    .map((guide) => `<a class="guide-link-chip" href="${getGuidePath(guide.id)}">${escapeHtml(guideTitle(guide))}</a>`)
    .join("")
}

function renderGuideCard(guide){
  const heroTierClass = guide.id.startsWith("hero-")
    ? guide.tier === "S-Type"
      ? "hero-tier-s"
      : guide.tier === "A-Type"
        ? "hero-tier-a"
        : "hero-tier-b"
    : ""

  const factionMeta = guide.id.startsWith("hero-") && guide.faction
    ? `
      <span class="hero-faction-chip">
        ${escapeHtml(guide.faction)}
      </span>
    `
    : ""

  return `
    <a class="guide-card ${heroTierClass}" href="${getGuidePath(guide.id)}">
      <span class="guide-card-badge">${escapeHtml(guide.badge)}</span>
      ${factionMeta}
      <h3>${escapeHtml(guideTitle(guide))}</h3>
      <p>${escapeHtml(guideSummary(guide))}</p>
      <span class="guide-card-cta">${escapeHtml(textOr(T.guideOpen, "Open page"))}</span>
    </a>
  `
}

function renderGuideCollection(group){
  const guides = GUIDE_SETS[group.id]

  return `
    <section class="guide-collection">
      <div class="collection-heading">
        <div>
          <p class="section-kicker">${escapeHtml(textOr(T.guideKicker, "Field Notes"))}</p>
          <h3>${escapeHtml(group.title)}</h3>
        </div>
        <p>${escapeHtml(group.description)}</p>
      </div>
      <div class="guide-card-grid">
        ${guides.map(renderGuideCard).join("")}
      </div>
    </section>
  `
}

function buildStaticShell(){
  renderTopMenu()

  document.getElementById("statEventsCount").textContent = String(GUIDE_STATS.eventTypes)
  document.getElementById("statDaysCount").textContent = String(GUIDE_STATS.days)
  document.getElementById("statResourcesCount").textContent = String(GUIDE_STATS.resources)

  document.getElementById("guideCollections").innerHTML = GUIDE_GROUPS
    .map(renderGuideCollection)
    .join("")

  renderPointNotice()
  renderDonatePanel()
}

function withBase(path){
  const normalizedBase = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`
  return `${normalizedBase}${String(path).replace(/^\/+/, "")}`
}

function renderDonatePanel(){
  const donatePanel = document.getElementById("donatePanel")
  if(!donatePanel) return

  donatePanel.innerHTML = `
    <div class="donate-copy">
      <p class="section-kicker">Support</p>
      <h2>Support this project</h2>
      <p>If this guide helps your gameplay, consider supporting maintenance through PayPal.</p>
      <a class="donate-link" href="${DONATE_URL}" target="_blank" rel="noopener noreferrer">Donate with PayPal</a>
    </div>
    <a class="donate-qr-link" href="${DONATE_URL}" target="_blank" rel="noopener noreferrer" aria-label="Donate via PayPal QR code">
      <img class="donate-qr" src="${withBase("donate.png")}" alt="PayPal donation QR code">
    </a>
  `
}

function renderTopMenu(){
  const menuRoot = document.getElementById("siteMenu")
  if(!menuRoot) return

  const renderGroupItems = (group) => {
    if(group.id !== "heroes"){
      return group.items.map((item) => {
        const guide = GUIDE_MAP[item.id]
        const title = guide ? guideTitle(guide) : item.id
        return `<li><a class="submenu-link" href="${getGuidePath(item.id)}">${escapeHtml(title)}</a></li>`
      }).join("")
    }

    const introItem = group.items.find((item) => item.id === "resource-heroes")
    const introGuide = introItem ? GUIDE_MAP[introItem.id] : null
    const introTitle = introGuide ? guideTitle(introGuide) : "Heroes"

    const factionHtml = HERO_FACTION_MENU.map((faction) => {
      const heroLinks = faction.heroIds
        .map((heroId) => {
          const heroGuide = GUIDE_MAP[heroId]
          if(!heroGuide) return ""
          const tierClass = heroGuide.tier === "S-Type"
            ? "tier-s"
            : heroGuide.tier === "A-Type"
              ? "tier-a"
              : "tier-b"
          return `<li><a class="submenu-link hero-submenu-link ${tierClass}" href="${getGuidePath(heroId)}"><span>${escapeHtml(guideTitle(heroGuide))}</span></a></li>`
        })
        .join("")

      return `
        <li class="submenu-divider" role="presentation"></li>
        <li class="submenu-faction-title" role="presentation">${escapeHtml(faction.title)}</li>
        ${heroLinks}
      `
    }).join("")

    return `
      <li><a class="submenu-link" href="${getGuidePath("resource-heroes")}">${escapeHtml(introTitle)}</a></li>
      ${factionHtml}
    `
  }

  menuRoot.innerHTML = MENU_GROUPS.map((group) => {
    if(group.id === "calendar"){
      return `
        <li class="menu-group single">
          <a class="menu-link" href="${getHomePath()}">${escapeHtml(textOr(T.navCalendar, "Calendar"))}</a>
        </li>
      `
    }

    return `
      <li class="menu-group">
        <button class="menu-link menu-toggle" type="button">${escapeHtml(textOr(T[group.titleKey], group.id))}</button>
        <ul class="submenu">
          ${renderGroupItems(group)}
        </ul>
      </li>
    `
  }).join("")
}

function renderPointNotice(){
  const formula = textOr(T.pointFormula, "Base = round(Displayed / 2.17), minimum 1")
  const examples = POINT_EXAMPLES
    .map((example) => {
      const base = displayedToBasePoints(example.shown)
      return `<li>${escapeHtml(example.label)}: ${example.shown} -> ${base} ${escapeHtml(textOr(T.pointBaseLabel, "base"))}</li>`
    })
    .join("")

  document.getElementById("pointsNotice").innerHTML = `
    <div>
      <p class="section-kicker">${escapeHtml(textOr(T.pointNoticeKicker, "Score Reading"))}</p>
      <h2>${escapeHtml(textOr(T.pointNoticeTitle, "Displayed points are boosted values"))}</h2>
      <p>${escapeHtml(textOr(T.pointNoticeBody, "Use the displayed score to compute the original base score: Base = round(Displayed / 2.17), minimum 1."))}</p>
    </div>
    <div class="points-math">
      <div class="formula-pill">${escapeHtml(formula)}</div>
      <ul>${examples}</ul>
    </div>
  `
}

function showAutoTranslationNotice(){
  if(window.CURRENT_LANG === "auto" || (window.localStorage && localStorage.getItem("lang") === "auto")){
    let notice = document.getElementById("autoTransNotice")
    if(!notice){
      notice = document.createElement("div")
      notice.id = "autoTransNotice"
      notice.className = "auto-translate-notice"
      notice.innerText = "Automatic translation via Google Translate"
      document.body.insertBefore(notice, document.body.firstChild)
    }
  } else {
    const notice = document.getElementById("autoTransNotice")
    if(notice) notice.remove()
  }
}

function setTimeButton(){
  const btn = document.getElementById("timeBtn")
  const t24 = T.timeFormat24 || "24H"
  const t12 = T.timeFormat12 || "12H"
  btn.textContent = is24h() ? t24 : t12
}

function formatClockParts(hour, minute){
  const hh = String(hour).padStart(2, "0")
  const mm = String(minute).padStart(2, "0")

  if(is24h()) return `${hh}:${mm}`

  const h12 = hour % 12 === 0 ? 12 : hour % 12
  const suffix = hour >= 12 ? "PM" : "AM"
  return `${String(h12).padStart(2, "0")}:${mm} ${suffix}`
}

function updateAll(){
  fillCells()
  updateCurrent()
  updateAlert()
  highlightNow()
  updateNext()
}

function parseServerOffset(offset){
  if(typeof offset === "number") return offset * 3600000

  if(typeof offset === "string"){
    let normalized = offset.trim().toUpperCase()

    if(normalized.startsWith("UTC")){
      normalized = normalized.substring(3)
    }

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
  const offsetMs = parseServerOffset(SERVER_OFFSET)
  return new Date(now.getTime() + offsetMs)
}

function getEventType(eventName){
  if(eventName.includes("Army")) return "army"
  if(eventName.includes("Vehicle")) return "vehicle"
  if(eventName.includes("Shelter")) return "shelter"
  if(eventName.includes("Science")) return "science"
  if(eventName.includes("Hero")) return "hero"
  return "all"
}

function buildTable(){
  const head = document.getElementById("tableHead")
  const body = document.getElementById("tableBody")

  head.innerHTML = `
    <th>${T.time}</th>
    ${T.days.map((d,i)=>`
      <th data-day="${i}">
        <a class="day-link" href="${getGuidePath(DAY_IDS_BY_INDEX[i])}">
          ${(T.dayLabel || "Day")} ${i} - ${d}
          <div class="day-title">${T.dayTitles[DAY_KEYS[i]]}</div>
        </a>
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

function fillCells(){
  const nowApoc = getApocNow()
  const offsetMs = parseServerOffset(SERVER_OFFSET)
  const nowApocDay = nowApoc.getUTCDay()
  const currentSlotStart = Math.floor(nowApoc.getUTCHours()/4)*4

  document.querySelectorAll(".cell").forEach(cell => {
    const day = Number(cell.dataset.day)
    const hour = Number(cell.dataset.hour)
    const ev = EVENTS[hour/4][day]
    const eventType = getEventType(ev)

    let dayDiff = day - nowApocDay
    if(dayDiff < 0) dayDiff += 7

    if(dayDiff === 0 && hour < currentSlotStart){
      dayDiff = 7
    }

    const occurrenceApoc = new Date(nowApoc)
    occurrenceApoc.setUTCHours(hour, 0, 0, 0)
    occurrenceApoc.setUTCDate(nowApoc.getUTCDate() + dayDiff)

    const occurrenceLocal = new Date(occurrenceApoc.getTime() - offsetMs)

    const localDateStr = occurrenceLocal.toLocaleDateString(CURRENT_LANG, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })
    const localTimeStr = formatTime(occurrenceLocal, CURRENT_LANG)
    const shieldHtml = day === 6
      ? `<img src="/zcalendar/shield.png" class="radar-icon shield-icon" alt="Shield">`
      : ""
    const dayGuideLink = getGuidePath(DAY_IDS_BY_INDEX[day])

    cell.dataset.event = eventType

    cell.innerHTML = `
      <a class="cell-link" href="${dayGuideLink}">
        <div class="cell-date">
          ${localDateStr} ${localTimeStr}
        </div>
        <div class="cell-icons">
          <img src="${getIcon(day,hour)}" class="radar-icon" alt="Event state icon">
          ${shieldHtml}
        </div>
        <div class="cell-event">
          ${T.events[ev]}
        </div>
      </a>
    `
  })
}

function updateCurrent(){
  const now = getApocNow()
  const day = now.getUTCDay()
  const row = Math.floor(now.getUTCHours()/4)
  const ev = EVENTS[row][day]

  document.getElementById("currentEventBar").innerText =
    `${T.current}: ${T.events[ev]}`
}

function highlightNow(){
  const now = getApocNow()
  const day = now.getUTCDay()
  const hour = now.getUTCHours()
  const row = Math.floor(hour/4)*4

  document.querySelectorAll(".cell").forEach(c=>{
    c.classList.remove("active","today-col")
  })

  document.querySelectorAll(`[data-day="${day}"]`).forEach(c=>c.classList.add("today-col"))

  const active = document.querySelector(`.cell[data-day="${day}"][data-hour="${row}"]`)
  if(active) active.classList.add("active")
}

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
  const apocStr = formatClockParts(currentHour, currentMin)

  document.getElementById("timeInfo").innerText =
    `${T.localLabel}: ${localStr} | ${T.apocLabel}: ${apocStr} | ${T.nextLabel}: ${String(diffHours).padStart(2,"0")}:${String(diffMinutes).padStart(2,"0")}`
}

function updateAlert(){
  const now = getApocNow()
  const d = now.getUTCDay()
  const h = now.getUTCHours()
  const isRed = getIcon(d,h) === ICONS.red
  const el = document.getElementById("alertBar")

  el.innerText = isRed ? T.alert : ""
  el.className = isRed ? "alert active" : "alert"
}

function getIcon(day,hour){
  if(day===0) return ICONS.red
  if(day===3 && hour>=16) return ICONS.red
  if(day===4) return ICONS.red
  if(day===6 && hour>=16) return ICONS.red
  if(day===1 || day===5) return ICONS.gold

  return ICONS.white
}

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

    if(currentFilter === "all"){
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

function hookMenu(){
  document.querySelectorAll(".menu-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest(".menu-group")
      if(group) group.classList.toggle("open")
    })
  })
}

function hookGuideRouting(){
  window.addEventListener("hashchange", renderRoute)
  renderRoute()
}

function renderRoute(){
  const rawHash = window.location.hash.replace(/^#/, "")
  const detailSection = document.getElementById("guideDetailSection")
  const guideId = rawHash.startsWith("guide/") ? rawHash.slice(6) : ""

  document.querySelectorAll(".guide-card").forEach((card) => {
    const isActive = card.getAttribute("href") === `#guide/${guideId}`
    card.classList.toggle("active", isActive)
  })

  if(!guideId || !GUIDE_MAP[guideId]){
    detailSection.hidden = true
    return
  }

  const guide = GUIDE_MAP[guideId]
  detailSection.hidden = false
  document.getElementById("guideDetail").innerHTML = `
    <div class="guide-detail-head">
      <div>
        <p class="section-kicker">${escapeHtml(guide.badge)}</p>
        <h2>${escapeHtml(guideTitle(guide))}</h2>
        <p class="guide-detail-summary">${escapeHtml(guideSummary(guide))}</p>
      </div>
      <a class="guide-back-link" href="#guides">${escapeHtml(textOr(T.guideBack, "Back to guide lists"))}</a>
    </div>
    <div class="guide-section-grid">
      ${guide.sections.map((section) => `
        <section class="guide-detail-card">
          <h3>${escapeHtml(section.title)}</h3>
          <ul>
            ${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </section>
      `).join("")}
    </div>
    <div class="guide-footer-blocks">
      <div class="guide-meta-card">
        <h3>${escapeHtml(textOr(T.guideRelated, "Related pages"))}</h3>
        <div class="guide-link-row">${formatGuideLinks(guide.related)}</div>
      </div>
      <div class="guide-meta-card">
        <h3>${escapeHtml(textOr(T.guideSources, "Source base"))}</h3>
        <ul>
          ${guide.sources.map((source) => `<li>${escapeHtml(source)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `

  detailSection.scrollIntoView({ behavior: "smooth", block: "start" })
}

function applyTranslations(){
  const f = T.filters

  document.title = textOr(T.appTitle, "ZCalendar")
  document.getElementById("heroEyebrow").textContent = textOr(T.heroEyebrow, "Last Z planning board")
  document.getElementById("heroTitle").textContent = textOr(T.appTitle, "ZCalendar")
  document.getElementById("heroIntro").textContent = textOr(T.heroIntro, "Track Apocalypse Time rotations and open guide pages for each event type, each day and the systems around them.")
  renderTopMenu()
  document.getElementById("statEventsLabel").textContent = textOr(T.statEvents, "Event types")
  document.getElementById("statDaysLabel").textContent = textOr(T.statDays, "Day pages")
  document.getElementById("statResourcesLabel").textContent = textOr(T.statResources, "Support pages")
  document.getElementById("calendarHeading").textContent = textOr(T.calendarHeading, "Apocalypse rotation")
  document.getElementById("calendarIntro").textContent = textOr(T.calendarIntro, "Use the live table to see the current slot, the next slot and the local date for every 4-hour cycle.")
  document.getElementById("guidesHeading").textContent = textOr(T.guidesHeading, "Guide pages")
  document.getElementById("guidesIntro").textContent = textOr(T.guidesIntro, "Open the pages below for event-type strategy, day planning and system references built from community sources.")
  document.getElementById("sourcesHeading").textContent = textOr(T.sourcesHeading, "Source base")
  document.getElementById("sourcesBody").textContent = textOr(T.sourcesBody, "This guide hub is written as original summaries based on community references from Last Z Wiki, Fandom, LastZData and Sardinha's notes. Reconfirm live values in-game because server rules and seasonal content can change.")

  document.querySelector('[data-filter="all"]').textContent = f.all
  document.querySelector('[data-filter="army"]').textContent = f.army
  document.querySelector('[data-filter="hero"]').textContent = f.hero
  document.querySelector('[data-filter="shelter"]').textContent = f.shelter
  document.querySelector('[data-filter="vehicle"]').textContent = f.vehicle
  document.querySelector('[data-filter="science"]').textContent = f.science

  renderPointNotice()
  renderRoute()
}