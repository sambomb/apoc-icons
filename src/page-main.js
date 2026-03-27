import { loadLang, buildLangSelect, T } from "./translate.js"
import { GUIDE_MAP } from "./guides.js"
import { MENU_GROUPS, HERO_FACTION_MENU, getGuidePath, getHomePath } from "./routes.js"
import { SCORE_TABLE, DISPLAY_TO_BASE_DIVISOR } from "./points.js"

const DONATE_URL = "https://www.paypal.com/donate/?hosted_button_id=EQ4XU8W5PWUBA"
const BASE_URL = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.BASE_URL)
  ? import.meta.env.BASE_URL
  : "/"

function safeText(value, fallback){
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

function roundBonusPoints(basePoints, bonusPercent){
  const factor = 1 + bonusPercent / 100
  return Math.round(basePoints * factor)
}

function withBase(path){
  const normalizedBase = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`
  return `${normalizedBase}${String(path).replace(/^\/+/, "")}`
}

function renderMenu(activeGuideId){
  const menuRoot = document.getElementById("siteMenu")
  if(!menuRoot) return

  const renderGroupItems = (group) => {
    if(group.id !== "heroes"){
      return group.items.map((item) => {
        const guide = GUIDE_MAP[item.id]
        const title = guide ? guideTitle(guide) : item.id
        const activeClass = item.id === activeGuideId ? "active" : ""
        return `<li><a class="submenu-link ${activeClass}" href="${getGuidePath(item.id)}">${escapeHtml(title)}</a></li>`
      }).join("")
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
  menuRoot.querySelectorAll(".menu-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.closest(".menu-group")
      if(group) group.classList.toggle("open")
    })
  })
}

function renderGuidePage(guideId){
  const content = document.getElementById("guidePageContent")
  if(!content) return

  const guide = GUIDE_MAP[guideId]
  if(!guide){
    content.innerHTML = `<h1>${escapeHtml(safeText(T.pageNotFound, "Guide not found"))}</h1>`
    return
  }

  const scoreSection = SCORE_TABLE[guideId]
  const showDisplayedEstimate = !scoreSection?.disableConversion
  const hasBonusInput = Boolean(scoreSection?.enableBonusInput)
  const displayedHeader = showDisplayedEstimate
    ? `<th>${escapeHtml(safeText(T.scoreDisplayed, "Displayed estimate"))}</th>`
    : ""
  const bonusHeader = hasBonusInput
    ? `<th>${escapeHtml(safeText(T.scoreWithBonus, "With bonus (displayed)"))}</th>`
    : ""
  const scoreHtml = scoreSection
    ? `
      <section class="guide-detail-card">
        <h3>${escapeHtml(safeText(T.scoreSectionTitle, "Score table (base points)"))}</h3>
        ${hasBonusInput ? `
          <div class="bonus-control">
            <label for="bonusPercentInputMain">${escapeHtml(safeText(T.bonusPercentLabel, "Bonus points (%)"))}</label>
            <input id="bonusPercentInputMain" class="bonus-percent-input" type="number" min="0" step="0.1" value="0">
          </div>
        ` : ""}
        <table class="score-table">
          <thead>
            <tr>
              <th>${escapeHtml(safeText(T.scoreAction, "Action"))}</th>
              <th>${escapeHtml(safeText(T.scoreBase, "Base points"))}</th>
              ${displayedHeader}
              ${bonusHeader}
            </tr>
          </thead>
          <tbody>
            ${scoreSection.entries.map((entry) => `
              <tr data-base-points="${entry.basePoints}">
                <td>${escapeHtml(entry.action)}</td>
                <td>${entry.basePoints}</td>
                ${showDisplayedEstimate ? `<td>${Math.round(entry.basePoints * DISPLAY_TO_BASE_DIVISOR)}</td>` : ""}
                ${hasBonusInput ? `<td class="score-bonus-value">${Math.round(entry.basePoints * DISPLAY_TO_BASE_DIVISOR)}</td>` : ""}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </section>
    `
    : ""

  const guideImageHtml = guide.image
    ? `<div class="guide-portrait-wrap"><img class="guide-portrait" src="${withBase(guide.image)}" alt="${escapeHtml(guideTitle(guide))}"></div>`
    : ""

  const relatedLinks = guide.related
    .map((id) => {
      const related = GUIDE_MAP[id]
      if(!related) return ""
      return `<a class="guide-link-chip" href="${getGuidePath(id)}">${escapeHtml(guideTitle(related))}</a>`
    })
    .join("")

  content.innerHTML = `
    <article class="guide-page-article">
      <header class="guide-page-header">
        <p class="section-kicker">${escapeHtml(guide.badge)}</p>
        <h1>${escapeHtml(guideTitle(guide))}</h1>
        <p>${escapeHtml(guideSummary(guide))}</p>
        ${guideImageHtml}
      </header>

      <section class="guide-section-grid">
        ${guide.sections.map((section) => `
          <section class="guide-detail-card">
            <h3>${escapeHtml(section.title)}</h3>
            <ul>${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </section>
        `).join("")}
      </section>

      ${scoreHtml}

      <section class="guide-footer-blocks">
        <article class="guide-meta-card">
          <h3>${escapeHtml(safeText(T.guideRelated, "Related pages"))}</h3>
          <div class="guide-link-row">${relatedLinks}</div>
        </article>
        <article class="guide-meta-card">
          <h3>${escapeHtml(safeText(T.guideSources, "Source base"))}</h3>
          <ul>${guide.sources.map((source) => `<li>${escapeHtml(source)}</li>`).join("")}</ul>
        </article>
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
      const output = row.querySelector(".score-bonus-value")
      if(!output || !Number.isFinite(basePoints)) return
      const bonusBase = roundBonusPoints(basePoints, safeBonus)
      output.textContent = String(Math.round(bonusBase * DISPLAY_TO_BASE_DIVISOR))
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

  const scoreSection = SCORE_TABLE[guideId]
  if(!scoreSection?.enableBonusInput || !updateBonus){
    section.hidden = true
    return
  }

  const title = document.getElementById("converterTitle")
  const help = document.getElementById("converterHelp")
  const form = document.getElementById("pointConverterForm")
  const input = document.getElementById("displayedPointsInput")
  const button = document.getElementById("converterButton")
  const label = document.getElementById("basePointsLabel")
  const output = document.getElementById("basePointsOutput")

  if(!form || !input || !output) return

  section.hidden = false
  if(title) title.textContent = safeText(T.converterTitle, "Bonus converter")
  if(help) help.textContent = safeText(T.bonusConverterHelp, "Adjust bonus (%) to update the table values.")
  if(button) button.textContent = safeText(T.converterButton, "Apply")
  if(label) label.textContent = safeText(T.bonusPercentLabel, "Bonus points (%)") + ":"

  input.min = "0"
  input.step = "0.1"
  input.value = "0"
  input.setAttribute("aria-label", safeText(T.bonusPercentLabel, "Bonus points (%)"))

  const apply = () => {
    updateBonus(input.value)
    output.textContent = `${input.value}%`
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault()
    apply()
  })

  input.addEventListener("input", apply)
  apply()
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
      <p class="section-kicker">Support</p>
      <h2>Support this project</h2>
      <p>If this page helped, you can support updates and maintenance through PayPal.</p>
      <a class="donate-link" href="${DONATE_URL}" target="_blank" rel="noopener noreferrer">Donate with PayPal</a>
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
  await loadLang("en")
  const savedLang = localStorage.getItem("lang")
  if(savedLang && savedLang !== "en"){
    await loadLang(savedLang)
  }

  buildLangSelect()

  const pageBrand = document.getElementById("pageBrand")
  if(pageBrand) pageBrand.textContent = safeText(T.appTitle, "ZCalendar")

  const guideId = document.body.dataset.guideId || ""
  renderMenu(guideId)
  renderGuidePage(guideId)
  const bonusUpdater = hookBonusCalculator()
  renderPointConverter(guideId, bonusUpdater)
  renderDonationPanel()
}

init().catch((error) => {
  console.error("Page init failed", error)
})