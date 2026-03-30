import { loadLang, detectLang, buildLangSelect, T, CURRENT_LANG } from "./translate.js"
import { GUIDE_GROUPS, GUIDE_SETS, GUIDE_MAP } from "./guides.js"
import { MENU_GROUPS, HERO_FACTION_MENU, getGuidePath, getHomePath, getGuidesHubPath } from "./routes.js"
import { createRenderManager } from "./render-manager.js"
import { textOr, escapeHtml, withBasePath, guideTitle as sharedGuideTitle, guideSummary as sharedGuideSummary, localizeGuideContent as sharedLocalizeGuideContent, getHeroInitials } from "./guide-helpers.js"

const DONATE_URL = "https://www.paypal.com/donate/?hosted_button_id=EQ4XU8W5PWUBA"
const ISSUES_URL = "https://github.com/sambomb/zcalendar/issues"
const BASE_URL = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.BASE_URL)
  ? import.meta.env.BASE_URL
  : "/"

let renderManager = null

function withBase(path){
  return withBasePath(path, BASE_URL)
}

function setupRenderManager(){
  const config = {
    translations: T,
    getGuidePath,
    getHomePath,
    getGuidesHubPath,
    currentLang: CURRENT_LANG || localStorage.getItem("lang") || "en",
    baseUrl: BASE_URL,
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

function attachMenuToggleHandlers(){
  document.querySelectorAll(".menu-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest(".menu-group")
      if(group) group.classList.toggle("open")
    })
  })
}

function guideTitle(guide){
  return sharedGuideTitle(guide, T)
}

function guideSummary(guide){
  return sharedGuideSummary(guide, T)
}

async function localizeGuideContent(guide){
  const lang = CURRENT_LANG || localStorage.getItem("lang") || "en"
  return sharedLocalizeGuideContent(guide, lang)
}

function renderGuidePortrait(guide){
  if(guide.image){
    const heroImageClass = guide.id.startsWith("hero-") ? " hero-portrait-zoom" : ""
    return `<div class="guide-card-portrait-wrap"><img class="guide-card-portrait${heroImageClass}" src="${withBase(guide.image)}" alt="${escapeHtml(guideTitle(guide))}"></div>`
  }

  if(!guide.id.startsWith("hero-")) return ""

  const tierClass = guide.tier === "S-Type"
    ? "hero-tier-s"
    : guide.tier === "A-Type"
      ? "hero-tier-a"
      : "hero-tier-b"

  return `<div class="guide-card-portrait-wrap hero-card-portrait-wrap ${tierClass}"><div class="guide-avatar">${escapeHtml(getHeroInitials(guide.title))}</div></div>`
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
    ? `<span class="hero-faction-chip">${escapeHtml(guide.faction)}</span>`
    : ""

  return `
    <a class="guide-card ${heroTierClass}" href="${getGuidePath(guide.id)}">
      ${renderGuidePortrait(guide)}
      <span class="guide-card-badge">${escapeHtml(guide.badge)}</span>
      ${factionMeta}
      <h3>${escapeHtml(guideTitle(guide))}</h3>
      <p>${escapeHtml(guideSummary(guide))}</p>
      <span class="guide-card-cta">${escapeHtml(textOr(T.guideOpen, "Open page"))}</span>
    </a>
  `
}

async function renderGuideCollections(){
  const host = document.getElementById("guideCollections")
  if(!host) return

  const localizedSets = {}
  for(const [groupId, guides] of Object.entries(GUIDE_SETS)){
    localizedSets[groupId] = await Promise.all(guides.map((g) => localizeGuideContent(g)))
  }

  host.innerHTML = GUIDE_GROUPS.map((group) => {
    const guides = localizedSets[group.id] || []
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
  }).join("")
}

function renderTopMenu(){
  const menuRoot = document.getElementById("siteMenu")
  if(!menuRoot || !renderManager) return

  renderManager.menu.updateMenuDOM(menuRoot, "")
  attachMenuToggleHandlers()
}

function renderDonatePanel(){
  const donatePanel = document.getElementById("donatePanel")
  if(!donatePanel) return

  donatePanel.innerHTML = `
    <div class="donate-copy">
      <p class="section-kicker">${escapeHtml(textOr(T.donateKicker, "Support"))}</p>
      <h2>${escapeHtml(textOr(T.donateTitle, "Support this project"))}</h2>
      <p>${escapeHtml(textOr(T.donateBodyHome, "If this guide helps your gameplay, consider supporting maintenance through PayPal."))}</p>
      <div class="donate-actions">
        <a class="donate-link" href="${DONATE_URL}" target="_blank" rel="noopener noreferrer">${escapeHtml(textOr(T.donateCta, "Donate with PayPal"))}</a>
        <a class="donate-link bug-report-link" href="${ISSUES_URL}" target="_blank" rel="noopener noreferrer">${escapeHtml(textOr(T.bugReportCta, "Report a bug"))}</a>
      </div>
    </div>
    <a class="donate-qr-link" href="${DONATE_URL}" target="_blank" rel="noopener noreferrer" aria-label="Donate via PayPal QR code">
      <img class="donate-qr" src="${withBase("donate.png")}" alt="PayPal donation QR code">
    </a>
  `
}

function applyTranslations(){
  document.title = textOr(T.guidesHeading, "Guide pages")
  const pageBrand = document.getElementById("pageBrand")
  if(pageBrand) pageBrand.textContent = textOr(T.appTitle, "ZCalendar")

  const heading = document.getElementById("guidesHeading")
  if(heading) heading.textContent = textOr(T.guidesHeading, "Guide pages")

  const intro = document.getElementById("guidesIntro")
  if(intro) intro.textContent = textOr(T.guidesIntro, "Open the pages below for event-type strategy, day planning and system references built from community sources.")

  const kicker = document.getElementById("guidesKicker")
  if(kicker) kicker.textContent = textOr(T.guidesKicker, "Guide Hub")
}

async function init(){
  const preferredLang = localStorage.getItem("lang") || detectLang() || "en"
  await loadLang(preferredLang)

  buildLangSelect()
  setupRenderManager()
  applyTranslations()
  renderTopMenu()
  await renderGuideCollections()
  renderDonatePanel()
}

init().catch(async () => {
  await loadLang("en")
  buildLangSelect()
  setupRenderManager()
  applyTranslations()
  renderTopMenu()
  await renderGuideCollections()
  renderDonatePanel()
})
