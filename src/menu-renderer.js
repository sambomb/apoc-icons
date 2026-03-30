import { escapeHtml } from "./guide-helpers.js"
import { TextRenderer } from "./text-renderer.js"

/**
 * Renderizador de menu de navegação
 * Responsável por renderizar menu principal e submenus
 */

export class MenuRenderer {
  /**
   * @param {Object} config Configuração
   * @param {TextRenderer} config.textRenderer - Instância de TextRenderer
   * @param {Object} config.guideMap - Mapa de guias
   * @param {Array} config.menuGroups - Configuração dos grupos do menu
   * @param {Array} config.heroFactionMenu - Configuração de heróis por facção
   * @param {Function} config.getGuidePath - Função para obter caminho de guia
   */
  constructor(config = {}) {
    this.textRenderer = config.textRenderer
    this.guideMap = config.guideMap || {}
    this.menuGroups = config.menuGroups || []
    this.heroFactionMenu = config.heroFactionMenu || []
    this.getGuidePath = config.getGuidePath || ((id) => `/guide/${id}`)
    this.translations = config.textRenderer?.translations || {}
  }

  /**
   * Renderizar um item do menu
   * @param {Object} item - Configuração do item
   * @param {string} activeGuideId - ID do guia ativo (para marcar como ativo)
   * @returns {string} HTML do item
   */
  renderMenuItem(item, activeGuideId = "") {
    const guide = this.guideMap[item.id]
    const title = guide ? this.textRenderer.getText(`guideTitles.${item.id}`) || guide.title : item.id
    const activeClass = item.id === activeGuideId ? "active" : ""
    const href = this.getGuidePath(item.id)

    return `<li><a class="submenu-link ${activeClass}" href="${escapeHtml(href)}">${escapeHtml(title)}</a></li>`
  }

  /**
   * Renderizar itens de um grupo de heróis
   * @param {Object} group - Grupo de menu
   * @param {string} activeGuideId - ID do guia ativo
   * @returns {string} HTML dos itens
   */
  renderGroupItems(group, activeGuideId = "") {
    if (group.id !== "heroes") {
      return group.items
        .map((item) => this.renderMenuItem(item, activeGuideId))
        .join("")
    }

    // Renderizar introdução de heróis
    const introItem = group.items.find((item) => item.id === "resource-heroes")
    const introGuide = introItem ? this.guideMap[introItem.id] : null
    const introTitle = introGuide
      ? this.textRenderer.getText(`guideTitles.resource-heroes`) || introGuide.title
      : "Heroes"
    const introActive = introItem?.id === activeGuideId ? "active" : ""

    // Renderizar heróis por facção
    const factionHtml = this.heroFactionMenu
      .map((faction) => {
        const heroLinks = faction.heroIds
          .map((heroId) => {
            const heroGuide = this.guideMap[heroId]
            if (!heroGuide) return ""
            const activeClass = heroId === activeGuideId ? "active" : ""
            const tierClass =
              heroGuide.tier === "S-Type"
                ? "tier-s"
                : heroGuide.tier === "A-Type"
                  ? "tier-a"
                  : "tier-b"
            const heroTitle = this.textRenderer.getText(`guideTitles.${heroId}`) || heroGuide.title
            const href = this.getGuidePath(heroId)
            return `<li><a class="submenu-link hero-submenu-link ${tierClass} ${activeClass}" href="${escapeHtml(href)}"><span>${escapeHtml(heroTitle)}</span></a></li>`
          })
          .join("")

        return `
          <li class="submenu-divider" role="presentation"></li>
          <li class="submenu-faction-title" role="presentation">${escapeHtml(faction.title)}</li>
          ${heroLinks}
        `
      })
      .join("")

    return `
      <li><a class="submenu-link ${introActive}" href="${this.getGuidePath("resource-heroes")}">${escapeHtml(introTitle)}</a></li>
      ${factionHtml}
    `
  }

  /**
   * Renderizar um grupo do menu
   * @param {Object} group - Configuração do grupo
   * @param {string} activeGuideId - ID do guia ativo
   * @returns {string} HTML do grupo
   */
  renderMenuGroup(group, activeGuideId = "") {
    if (group.id === "calendar") {
      const calendarLabel = this.translations.navCalendar || "Calendar"
      return `
        <li class="menu-group single">
          <a class="menu-link" href="/">${escapeHtml(calendarLabel)}</a>
        </li>
      `
    }

    const groupTitle = this.translations[group.titleKey] || group.id
    const groupItems = this.renderGroupItems(group, activeGuideId)

    return `
      <li class="menu-group">
        <button class="menu-link menu-toggle" type="button">${escapeHtml(groupTitle)}</button>
        <ul class="submenu">
          ${groupItems}
        </ul>
      </li>
    `
  }

  /**
   * Renderizar menu completo
   * @param {string} activeGuideId - ID do guia ativo
   * @returns {string} HTML do menu completo
   */
  renderFullMenu(activeGuideId = "") {
    return this.menuGroups
      .map((group) => this.renderMenuGroup(group, activeGuideId))
      .join("")
  }

  /**
   * Atualizar menu DOM
   * @param {HTMLElement} menuElement - Element para colocar o menu
   * @param {string} activeGuideId - ID do guia ativo
   */
  updateMenuDOM(menuElement, activeGuideId = "") {
    if (menuElement) {
      menuElement.innerHTML = this.renderFullMenu(activeGuideId)
    }
  }

  /**
   * Retornar novo renderer com translations atualizado
   */
  withTextRenderer(textRenderer) {
    return new MenuRenderer({
      textRenderer,
      guideMap: this.guideMap,
      menuGroups: this.menuGroups,
      heroFactionMenu: this.heroFactionMenu,
      getGuidePath: this.getGuidePath
    })
  }
}
