import { loadLang, buildLangSelect, T, detectLang } from "./translate.js"
import { GUIDE_MAP } from "./guides.js"
import { DAY_IDS_BY_INDEX, MENU_GROUPS, HERO_FACTION_MENU, getGuidePath, getHomePath, getGuidesHubPath } from "./routes.js"
import { SCORE_TABLE } from "./points.js"
import { EVENTS, DAY_KEYS } from "./events.js"
import { getEventType, getIcon, getApocNow, formatClockParts } from "./calendar-utils.js"
import { createRenderManager } from "./render-manager.js"
import { getLocal, formatTime, toggleFormat, is24h } from "./calctime.js"
import {
  textOr,
  escapeHtml,
  withBasePath,
  stripSourceAttribution,
  shouldHideSourceSection,
  shouldHideSourceItem,
  linkifyText as sharedLinkifyText,
  localizeGuideContent as sharedLocalizeGuideContent,
  guideTitle as sharedGuideTitle,
  guideSummary as sharedGuideSummary,
  getHeroInitials,
  getGuideSections as sharedGetGuideSections
} from "./guide-helpers.js"

const DONATE_URL = "https://www.paypal.com/donate/?hosted_button_id=EQ4XU8W5PWUBA"
const ISSUES_URL = "https://github.com/sambomb/zcalendar/issues"
const BASE_URL = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.BASE_URL)
  ? import.meta.env.BASE_URL
  : "/"
const SERVER_OFFSET = "UTC-2"

let renderManager = null
let pageTimer = null

function getDayTitlesArray(){
  return DAY_KEYS.map((key) => T.dayTitles?.[key] || "")
}

function initRenderManager(){
  const config = {
    translations: T,
    linkifyFn: (text) => sharedLinkifyText(text, GUIDE_MAP, getGuidePath),
    getGuidePath,
    getHomePath,
    getGuidesHubPath,
    currentLang: localStorage.getItem("lang") || detectLang() || "en",
    baseUrl: BASE_URL,
    events: EVENTS,
    getEventType,
    getIcon,
    serverOffset: "UTC-2",
    dayLabel: safeText(T.dayLabel, "Day"),
    dayNames: T.days || [],
    dayTitles: getDayTitlesArray(),
    guideMap: GUIDE_MAP,
    menuGroups: MENU_GROUPS,
    heroFactionMenu: HERO_FACTION_MENU
  }

  if(!renderManager){
    renderManager = createRenderManager(config)
    return
  }

  renderManager.updateConfig(config)
}

function attachMenuToggleHandlers(menuRoot){
  if(!menuRoot) return
  menuRoot.querySelectorAll(".menu-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.closest(".menu-group")
      if(group) group.classList.toggle("open")
    })
  })
}

function ensureTimeButton(){
  const controls = document.querySelector(".guide-page-top .controls")
  if(!controls) return null

  let button = document.getElementById("timeBtn")
  if(!button){
    button = document.createElement("button")
    button.id = "timeBtn"
    button.type = "button"
    controls.insertBefore(button, controls.firstChild)
  }

  return button
}

function setTimeButton(){
  const button = ensureTimeButton()
  if(!button) return
  button.textContent = is24h()
    ? safeText(T.timeFormat24, "24H")
    : safeText(T.timeFormat12, "12H")
}

async function rerenderCurrentGuide(){
  const guideId = document.body.dataset.guideId || ""
  await renderGuidePage(guideId)
  hookBonusCalculator()
  updateDayPageStatus(guideId)
}

function bindTimeButton(){
  const button = ensureTimeButton()
  if(!button) return

  button.onclick = async () => {
    toggleFormat()
    setTimeButton()
    await rerenderCurrentGuide()
  }
}

function getNextRadarCountdown(currentHour, currentMin){
  const radarHours = [0, 8, 16]

  let nextHour = Math.ceil((currentHour + currentMin / 60) / 4) * 4
  if(nextHour === 24) nextHour = 0

  while(!radarHours.includes(nextHour)){
    nextHour = (nextHour + 4) % 24
  }

  return {
    minutes: (60 - currentMin) % 60,
    hours: (() => {
      let diffHours = (nextHour - currentHour + 24) % 24
      if(((60 - currentMin) % 60) !== 0) diffHours--
      if(diffHours < 0) diffHours = 23
      return diffHours
    })()
  }
}

function updateDayPageStatus(guideId){
  if(!renderManager) return

  const dayIndex = DAY_IDS_BY_INDEX.indexOf(guideId)
  const currentBar = document.getElementById("currentEventBar")
  const timeInfo = document.getElementById("timeInfo")
  if(dayIndex < 0 && !currentBar && !timeInfo) return

  const now = getApocNow(SERVER_OFFSET)
  const currentDay = now.getUTCDay()
  const currentHour = now.getUTCHours()
  const currentMinute = now.getUTCMinutes()
  const row = Math.floor(currentHour / 4)
  const liveEvent = EVENTS[row]?.[currentDay]

  if(currentBar && liveEvent){
    const viewedDayLabel = DAY_IDS_BY_INDEX[dayIndex] === guideId
      ? `${safeText(T.dayLabel, "Day")} ${dayIndex}`
      : ""
    const livePrefix = currentDay === dayIndex
      ? safeText(T.current, "Current Event")
      : `${safeText(T.current, "Current Event")} (${safeText(T.dayLabel, "Day")} ${currentDay})`
    currentBar.textContent = `${livePrefix}: ${T.events?.[liveEvent] || liveEvent}${viewedDayLabel && currentDay === dayIndex ? "" : ""}`
  }

  if(timeInfo){
    const local = getLocal()
    const localStr = formatTime(local, renderManager.text.currentLang)
    const apocStr = formatClockParts(currentHour, currentMinute)
    const radarCountdown = getNextRadarCountdown(currentHour, currentMinute)
    const nextRadarText = `Next Radar: ${String(radarCountdown.hours).padStart(2, "0")}:${String(radarCountdown.minutes).padStart(2, "0")}`
    const pmSegs = [
      `${escapeHtml(safeText(T.localLabel, "Local Time"))}: ${escapeHtml(localStr)}`,
      `${escapeHtml(safeText(T.apocLabel, "Apocalypse Time"))}: ${escapeHtml(apocStr)}`,
      `${escapeHtml(nextRadarText)}`
    ]
    timeInfo.innerHTML = pmSegs
      .map((s, i) => `<span class="time-info-seg">${s}${i < pmSegs.length - 1 ? " | " : ""}</span>`)
      .join("")
  }

  renderManager.calendar.highlightCurrentDayAndHour(currentDay, currentHour)
}

function startDayPageStatusUpdates(guideId){
  if(pageTimer) window.clearInterval(pageTimer)
  updateDayPageStatus(guideId)
  pageTimer = window.setInterval(() => updateDayPageStatus(guideId), 1000)
}

function safeText(value, fallback){
  return textOr(value, fallback)
}

function guideTitle(guide){
  return sharedGuideTitle(guide, T)
}

function guideSummary(guide){
  return sharedGuideSummary(guide, T)
}

function linkifyText(text){
  return sharedLinkifyText(text, GUIDE_MAP, getGuidePath)
}

function getPortraitHtml(guide){
  if(guide.image){
    const heroImageClass = guide.id.startsWith("hero-") ? " hero-portrait-zoom" : ""
    const naturalImageGuides = new Set(["resource-change-server", "resource-hide-trucks"])
    const naturalSizeClass = naturalImageGuides.has(guide.id) ? " guide-portrait-wrap-natural" : ""
    return `<div class="guide-portrait-wrap${naturalSizeClass}"><img class="guide-portrait${heroImageClass}" src="${withBase(guide.image)}" alt="${escapeHtml(guideTitle(guide))}"></div>`
  }

  if(!guide.id.startsWith("hero-")) return ""

  const tierClass = guide.tier === "S-Type"
    ? "hero-tier-s"
    : guide.tier === "A-Type"
      ? "hero-tier-a"
      : "hero-tier-b"

  return `
    <div class="guide-portrait-wrap hero-portrait-wrap ${tierClass}" aria-label="${escapeHtml(guideTitle(guide))}">
      <div class="guide-avatar hero-avatar-large">${escapeHtml(getHeroInitials(guide.title))}</div>
    </div>
  `
}

function getGuideSections(guide){
  return sharedGetGuideSections(guide, T)
}

function roundBonusPoints(basePoints, bonusPercent){
  const factor = 1 + bonusPercent / 100
  return Math.round(basePoints * factor)
}

function withBase(path){
  return withBasePath(path, BASE_URL)
}

function renderMenu(activeGuideId){
  const menuRoot = document.getElementById("siteMenu")
  if(!menuRoot) return

  if(renderManager){
    renderManager.menu.updateMenuDOM(menuRoot, activeGuideId)
    attachMenuToggleHandlers(menuRoot)
    return
  }

  const renderGroupItems = (group) => {
    if(group.id !== "heroes"){
      const defaultItems = group.items.map((item) => {
        const guide = GUIDE_MAP[item.id]
        const title = guide ? guideTitle(guide) : item.id
        const activeClass = item.id === activeGuideId ? "active" : ""
        return `<li><a class="submenu-link ${activeClass}" href="${getGuidePath(item.id)}">${escapeHtml(title)}</a></li>`
      }).join("")

      if(group.id === "systems"){
        const guidesLabel = safeText(T.navGuides, "Guide Hub")
        const guidesItem = `<li><a class="submenu-link" href="${getGuidesHubPath()}">${escapeHtml(guidesLabel)}</a></li>`
        return `${guidesItem}${defaultItems}`
      }

      return defaultItems
    }

    const introItem = group.items.find((item) => item.id === "resource-heroes")
    const introGuide = introItem ? GUIDE_MAP[introItem.id] : null
    const introTitle = introGuide ? guideTitle(introGuide) : "Heroes"
    const introActive = introItem?.id === activeGuideId ? "active" : ""

    const factionHtml = HERO_FACTION_MENU.map((faction) => {
      const heroLinks = faction.heroIds
        .map((heroId) => {
          const heroGuide = GUIDE_MAP[heroId]
          if(!heroGuide) return ""
          const activeClass = heroId === activeGuideId ? "active" : ""
          const tierClass = heroGuide.tier === "S-Type"
            ? "tier-s"
            : heroGuide.tier === "A-Type"
              ? "tier-a"
              : "tier-b"
          return `<li><a class="submenu-link hero-submenu-link ${tierClass} ${activeClass}" href="${getGuidePath(heroId)}">${escapeHtml(guideTitle(heroGuide))}</a></li>`
        })
        .join("")

      return `
        <li class="submenu-divider" role="presentation"></li>
        <li class="submenu-faction-title" role="presentation">${escapeHtml(faction.title)}</li>
        ${heroLinks}
      `
    }).join("")

    return `
      <li><a class="submenu-link ${introActive}" href="${getGuidePath("resource-heroes")}">${escapeHtml(introTitle)}</a></li>
      ${factionHtml}
    `
  }

  const html = MENU_GROUPS.map((group) => {
    if(group.id === "calendar"){
      return `
        <li class="menu-group single">
          <a class="menu-link" href="${getHomePath()}">${escapeHtml(safeText(T.navCalendar, "Calendar"))}</a>
        </li>
      `
    }

    return `
      <li class="menu-group">
        <button class="menu-link menu-toggle" type="button">${escapeHtml(safeText(T[group.titleKey], group.id))}</button>
        <ul class="submenu">
          ${renderGroupItems(group)}
        </ul>
      </li>
    `
  }).join("")

  menuRoot.innerHTML = html
  attachMenuToggleHandlers(menuRoot)
}

async function localizeGuideContent(guide){
  const lang = localStorage.getItem("lang") || detectLang() || "en"
  return sharedLocalizeGuideContent(guide, lang)
}

async function renderGuidePage(guideId){
  const content = document.getElementById("guidePageContent")
  if(!content) return

  const baseGuide = GUIDE_MAP[guideId]
  const guide = baseGuide ? await localizeGuideContent(baseGuide) : null
  if(!guide){
    content.innerHTML = `<h1>${escapeHtml(safeText(T.pageNotFound, "Guide not found"))}</h1>`
    return
  }

  const scoreSection = SCORE_TABLE[guideId]
  const scoreHtml = scoreSection && renderManager
    ? renderManager.scoreTable.renderFullTable({
      title: safeText(T.scoreSectionTitle, "Score table (base points)"),
      entries: scoreSection.entries,
      enableBonusInput: Boolean(scoreSection.enableBonusInput),
      bonusInputId: "bonusPercentInputMain"
    })
    : ""

  const guideImageHtml = getPortraitHtml(guide)
  const shouldSanitizeSources = guide.id !== "resource-sources"
  const guideSections = getGuideSections(guide)
    .filter((section) => !shouldSanitizeSources || !shouldHideSourceSection(section.title))
    .map((section) => {
      const sanitizedItems = (section.items || [])
        .map((item) => shouldSanitizeSources ? stripSourceAttribution(item) : item)
        .filter((item) => item && (!shouldSanitizeSources || !shouldHideSourceItem(item)))

      const hasTable = section.table
        && Array.isArray(section.table.headers)
        && Array.isArray(section.table.rows)
        && section.table.headers.length > 0
        && section.table.rows.length > 0

      return {
        ...section,
        title: shouldSanitizeSources ? stripSourceAttribution(section.title) : section.title,
        items: sanitizedItems,
        table: hasTable ? section.table : null
      }
    })
    .filter((section) => (section.items && section.items.length > 0) || section.table)

  const relatedSection = renderManager
    ? renderManager.guideCard.renderRelatedSection(guide.related)
    : ""

  const dayIndex = DAY_IDS_BY_INDEX.indexOf(guideId)
  const dayCalendarHtml = renderManager && dayIndex >= 0
    ? (() => {
      const calendar = renderManager.calendar.renderSingleDayCalendar(dayIndex, guideId)
      const title = escapeHtml(safeText(T.calendarHeading, "Alliance Duel schedule"))
      return `
        <section class="guide-detail-card">
          <h3>${title}</h3>
          <div id="topBar">
            <div id="currentEventBar"></div>
          </div>
          <div class="table-wrap">
            <table>
              <thead>${calendar.head}</thead>
              <tbody>${calendar.body}</tbody>
            </table>
          </div>
          <div id="timeInfo"></div>
        </section>
      `
    })()
    : ""

  content.innerHTML = `
    <article class="guide-page-article">
      <header class="guide-page-header">
        <p class="section-kicker">${escapeHtml(guide.badge)}</p>
        <h1>${escapeHtml(guideTitle(guide))}</h1>
        <p>${escapeHtml(guideSummary(guide))}</p>
        ${guideImageHtml}
      </header>

      <section class="guide-section-grid">
        ${guideSections.map((section) => renderManager
          ? renderManager.text.renderGuideSectionCard(section, { useLinks: true })
          : `
            <section class="guide-detail-card">
              <h3>${escapeHtml(section.title)}</h3>
              <ul>${section.items.map((item) => `<li>${linkifyText(item)}</li>`).join("")}</ul>
            </section>
          `
        ).join("")}
      </section>

      ${dayCalendarHtml}

      ${scoreHtml}

      <section class="guide-footer-blocks">
        ${relatedSection}
      </section>
    </article>
  `
}

function hookBonusCalculator(){
  const inputs = Array.from(document.querySelectorAll(".bonus-percent-input"))
  if(inputs.length === 0) return null

  const rows = Array.from(document.querySelectorAll(".score-table tbody tr[data-base-points]"))
  const update = (value, source) => {
    const bonusPercent = Number(value)
    const safeBonus = Number.isFinite(bonusPercent) ? bonusPercent : 0

    inputs.forEach((input) => {
      if(source && input === source) return
      input.value = String(safeBonus)
    })

    rows.forEach((row) => {
      const basePoints = Number(row.dataset.basePoints)
      const output = row.querySelector(".score-estimate-value")
      if(!output || !Number.isFinite(basePoints)) return
      output.textContent = String(roundBonusPoints(basePoints, safeBonus))
    })
  }

  inputs.forEach((input) => {
    input.addEventListener("input", () => update(input.value, input))
  })

  update(inputs[0].value, inputs[0])
  return update
}

function renderPointConverter(guideId, updateBonus){
  const section = document.querySelector(".point-converter")
  if(!section) return
  section.remove()
}

function renderDonationPanel(){
  const shell = document.querySelector(".guide-page-shell")
  if(!shell) return

  const existing = document.getElementById("guideDonatePanel")
  if(existing) existing.remove()

  const panel = document.createElement("section")
  panel.id = "guideDonatePanel"
  panel.className = "donate-panel guide-donate"
  panel.innerHTML = `
    <div class="donate-copy">
      <p class="section-kicker">${escapeHtml(safeText(T.donateKicker, "Support"))}</p>
      <h2>${escapeHtml(safeText(T.donateTitle, "Support this project"))}</h2>
      <p>${escapeHtml(safeText(T.donateBody, "If this page helped, you can support updates and maintenance through PayPal."))}</p>
      <div class="donate-actions">
        <a class="donate-link" href="${DONATE_URL}" target="_blank" rel="noopener noreferrer">${escapeHtml(safeText(T.donateCta, "Donate with PayPal"))}</a>
        <a class="donate-link bug-report-link" href="${ISSUES_URL}" target="_blank" rel="noopener noreferrer">${escapeHtml(safeText(T.bugReportCta, "Report a bug"))}</a>
      </div>
    </div>
    <a class="donate-qr-link" href="${DONATE_URL}" target="_blank" rel="noopener noreferrer" aria-label="Donate via PayPal QR code">
      <img class="donate-qr" src="${withBase("donate.png")}" alt="PayPal donation QR code">
    </a>
  `

  const converter = document.querySelector(".point-converter")
  if(converter && converter.parentElement === shell){
    shell.insertBefore(panel, converter.nextSibling)
    return
  }

  shell.appendChild(panel)
}

async function init(){
  await loadLang(localStorage.getItem("lang") || detectLang() || "en")

  buildLangSelect()
  initRenderManager()
  setTimeButton()
  bindTimeButton()

  const pageBrand = document.getElementById("pageBrand")
  if(pageBrand) pageBrand.textContent = safeText(T.appTitle, "ZCalendar")

  const guideId = document.body.dataset.guideId || ""
  renderMenu(guideId)
  await renderGuidePage(guideId)
  const bonusUpdater = hookBonusCalculator()
  renderPointConverter(guideId, bonusUpdater)
  renderDonationPanel()
  startDayPageStatusUpdates(guideId)
}

init().catch((error) => {
  console.error("Page init failed", error)
})