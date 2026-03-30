import { escapeHtml, getHeroInitials, withBasePath } from "./guide-helpers.js"
import { TextRenderer } from "./text-renderer.js"

/**
 * Renderizador de cards de guias
 * Responsável por renderizar cards de guia e detalhes de guias
 */

export class GuideCardRenderer {
  /**
   * @param {Object} config Configuração
   * @param {TextRenderer} config.textRenderer - Instância de TextRenderer
   * @param {Object} config.guideMap - Mapa de guias
   * @param {Function} config.getGuidePath - Função para obter caminho de guia
   * @param {string} config.baseUrl - URL base para assets
   */
  constructor(config = {}) {
    this.textRenderer = config.textRenderer
    this.guideMap = config.guideMap || {}
    this.getGuidePath = config.getGuidePath || ((id) => `/guide/${id}`)
    this.baseUrl = config.baseUrl || "/"
  }

  /**
   * Obter classe de tier do herói
   * @param {string} tier - Tier do herói (S-Type, A-Type, B-Type)
   * @returns {string} Classe CSS
   */
  getTierClass(tier) {
    switch (tier) {
      case "S-Type":
        return "hero-tier-s"
      case "A-Type":
        return "hero-tier-a"
      default:
        return "hero-tier-b"
    }
  }

  /**
   * Renderizar portrait de um guia
   * @param {Object} guide - Dados do guia
   * @returns {string} HTML do portrait
   */
  renderPortrait(guide) {
    if (guide.image) {
      const src = withBasePath(guide.image, this.baseUrl)
      const title = this.textRenderer.getText(`guideTitles.${guide.id}`) || guide.title
      return `<div class="guide-card-portrait-wrap"><img class="guide-card-portrait" src="${escapeHtml(src)}" alt="${escapeHtml(title)}"></div>`
    }

    if (!guide.id.startsWith("hero-")) return ""

    const tierClass = this.getTierClass(guide.tier)
    const initials = getHeroInitials(guide.title)

    return `<div class="guide-card-portrait-wrap hero-card-portrait-wrap ${tierClass}"><div class="guide-avatar">${escapeHtml(initials)}</div></div>`
  }

  /**
   * Renderizar card de guia
   * @param {Object} guide - Dados do guia
   * @returns {string} HTML do card
   */
  renderGuideCard(guide) {
    const heroTierClass = guide.id.startsWith("hero-") ? this.getTierClass(guide.tier) : ""

    const factionMeta =
      guide.id.startsWith("hero-") && guide.faction
        ? `
      <span class="hero-faction-chip">
        ${escapeHtml(guide.faction)}
      </span>
    `
        : ""

    const title = this.textRenderer.getText(`guideTitles.${guide.id}`) || guide.title
    const summary = this.textRenderer.getText(`guideSummaries.${guide.id}`) || guide.summary
    const guideOpenText = this.textRenderer.getText("guideOpen", "Open page")

    const href = this.getGuidePath(guide.id)
    const portrait = this.renderPortrait(guide)

    return `
      <a class="guide-card ${heroTierClass}" href="${escapeHtml(href)}">
        ${portrait}
        <span class="guide-card-badge">${escapeHtml(guide.badge)}</span>
        ${factionMeta}
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(summary)}</p>
        <span class="guide-card-cta">${escapeHtml(guideOpenText)}</span>
      </a>
    `
  }

  /**
   * Renderizar portrait detalhado de um guia
   * @param {Object} guide - Dados do guia
   * @returns {string} HTML do portrait
   */
  renderDetailPortrait(guide) {
    if (guide.image) {
      const src = withBasePath(guide.image, this.baseUrl)
      const title = this.textRenderer.getText(`guideTitles.${guide.id}`) || guide.title
      return `<div class="guide-portrait-wrap"><img class="guide-portrait" src="${escapeHtml(src)}" alt="${escapeHtml(title)}"></div>`
    }

    if (!guide.id.startsWith("hero-")) return ""

    const tierClass = this.getTierClass(guide.tier)
    const initials = getHeroInitials(guide.title)
    const title = this.textRenderer.getText(`guideTitles.${guide.id}`) || guide.title

    return `
      <div class="guide-portrait-wrap hero-portrait-wrap ${tierClass}" aria-label="${escapeHtml(title)}">
        <div class="guide-avatar hero-avatar-large">${escapeHtml(initials)}</div>
      </div>
    `
  }

  /**
   * Renderizar header detalhado de um guia
   * @param {Object} guide - Dados do guia
   * @returns {string} HTML do header
   */
  renderDetailHeader(guide) {
    const title = this.textRenderer.getText(`guideTitles.${guide.id}`) || guide.title
    const summary = this.textRenderer.getText(`guideSummaries.${guide.id}`) || guide.summary
    const portrait = this.renderDetailPortrait(guide)

    return `
      <header class="guide-page-header">
        <p class="section-kicker">${escapeHtml(guide.badge)}</p>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(summary)}</p>
        ${portrait}
      </header>
    `
  }

  /**
   * Renderizar chip de link de guia relacionado
   * @param {string} guideId - ID do guia
   * @returns {string} HTML do chip
   */
  renderGuideLink(guideId) {
    const guide = this.guideMap[guideId]
    if (!guide) return ""

    const title = this.textRenderer.getText(`guideTitles.${guideId}`) || guide.title
    const href = this.getGuidePath(guideId)

    return `<a class="guide-link-chip" href="${escapeHtml(href)}">${escapeHtml(title)}</a>`
  }

  /**
   * Renderizar seção de links relacionados
   * @param {Array} relatedIds - IDs dos guias relacionados
   * @returns {string} HTML da seção
   */
  renderRelatedSection(relatedIds) {
    const relatedLinks = relatedIds
      .map((id) => this.renderGuideLink(id))
      .filter(Boolean)
      .join("")

    if (!relatedLinks) return ""

    const guideRelatedText = this.textRenderer.getText("guideRelated", "Related pages")

    return `
      <article class="guide-meta-card">
        <h3>${escapeHtml(guideRelatedText)}</h3>
        <div class="guide-link-row">${relatedLinks}</div>
      </article>
    `
  }

  /**
   * Retornar novo renderer com textRenderer atualizado
   */
  withTextRenderer(textRenderer) {
    return new GuideCardRenderer({
      textRenderer,
      guideMap: this.guideMap,
      getGuidePath: this.getGuidePath,
      baseUrl: this.baseUrl
    })
  }
}
