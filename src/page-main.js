import { loadLang, buildLangSelect, T } from "./translate.js"
import { GUIDE_MAP } from "./guides.js"
import { MENU_GROUPS, getGuidePath, getHomePath } from "./routes.js"
import { SCORE_TABLE, displayedToBasePoints, DISPLAY_TO_BASE_DIVISOR } from "./points.js"

const DONATE_URL = "https://www.paypal.com/donate/?hosted_button_id=QTEZKD4D7MWBU"
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

function withBase(path){
  const normalizedBase = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`
  return `${normalizedBase}${String(path).replace(/^\/+/, "")}`
}

function renderMenu(activeGuideId){
  const menuRoot = document.getElementById("siteMenu")
  if(!menuRoot) return

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
          ${group.items.map((item) => {
            const guide = GUIDE_MAP[item.id]
            const title = guide ? guideTitle(guide) : item.id
            const activeClass = item.id === activeGuideId ? "active" : ""
            return `<li><a class="submenu-link ${activeClass}" href="${getGuidePath(item.id)}">${escapeHtml(title)}</a></li>`
          }).join("")}
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
  const scoreHtml = scoreSection
    ? `
      <section class="guide-detail-card">
        <h3>${escapeHtml(safeText(T.scoreSectionTitle, "Score table (base points)"))}</h3>
        <table class="score-table">
          <thead>
            <tr>
              <th>${escapeHtml(safeText(T.scoreAction, "Action"))}</th>
              <th>${escapeHtml(safeText(T.scoreBase, "Base points"))}</th>
              <th>${escapeHtml(safeText(T.scoreDisplayed, "Displayed estimate"))}</th>
            </tr>
          </thead>
          <tbody>
            ${scoreSection.entries.map((entry) => `
              <tr>
                <td>${escapeHtml(entry.action)}</td>
                <td>${entry.basePoints}</td>
                <td>${Math.round(entry.basePoints * DISPLAY_TO_BASE_DIVISOR)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </section>
    `
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

function renderPointConverter(){
  const form = document.getElementById("pointConverterForm")
  if(!form) return

  const input = document.getElementById("displayedPointsInput")
  const output = document.getElementById("basePointsOutput")

  const update = () => {
    const displayed = Number(input.value)
    const base = displayedToBasePoints(displayed)
    output.textContent = String(base)
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault()
    update()
  })

  input.addEventListener("input", update)
  update()
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
  const converterTitle = document.getElementById("converterTitle")
  if(converterTitle) converterTitle.textContent = safeText(T.converterTitle, "Point converter")
  const converterHelp = document.getElementById("converterHelp")
  if(converterHelp) converterHelp.textContent = safeText(T.pointFormula, "Base = round(Displayed / 2.17), minimum 1")
  const converterButton = document.getElementById("converterButton")
  if(converterButton) converterButton.textContent = safeText(T.converterButton, "Convert")
  const basePointsLabel = document.getElementById("basePointsLabel")
  if(basePointsLabel) basePointsLabel.textContent = safeText(T.scoreBase, "Base points") + ":"

  const guideId = document.body.dataset.guideId || ""
  renderMenu(guideId)
  renderGuidePage(guideId)
  renderPointConverter()
  renderDonationPanel()
}

init().catch((error) => {
  console.error("Page init failed", error)
})