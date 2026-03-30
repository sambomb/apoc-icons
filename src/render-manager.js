import { TextRenderer } from "./text-renderer.js"
import { DayColumnRenderer } from "./day-column-renderer.js"
import { CalendarRenderer } from "./calendar-renderer.js"
import { MenuRenderer } from "./menu-renderer.js"
import { ScoreTableRenderer } from "./score-table-renderer.js"
import { GuideCardRenderer } from "./guide-card-renderer.js"

/**
 * Gerenciador centralizado de renderers
 * Fornece uma interface unificada para todos os renderers do aplicativo
 */

export class RenderManager {
  /**
   * @param {Object} config Configuração
   * @param {Object} config.translations - Objeto de traduções T
   * @param {Function} config.linkifyFn - Função de linkificação
   * @param {Function} config.getGuidePath - Função para obter caminho de guia
   * @param {string} config.currentLang - Linguagem atual
   * @param {string} config.baseUrl - URL base
   * @param {Object} config.events - Eventos do calendário
   * @param {Function} config.getEventType - Função para tipo de evento
   * @param {Function} config.getIcon - Função para ícone
   * @param {string} config.serverOffset - Offset do servidor
   * @param {string} config.dayLabel - Rótulo "Day"
   * @param {Array} config.dayNames - Nomes dos dias
   * @param {Object} config.dayTitles - Títulos dos dias
   * @param {Object} config.guideMap - Mapa de guias
   * @param {Array} config.menuGroups - Grupos do menu
   * @param {Array} config.heroFactionMenu - Menu de heróis por facção
   */
  constructor(config = {}) {
    this.config = config

    this.textRenderer = new TextRenderer({
      translations: config.translations || {},
      linkifyFn: config.linkifyFn,
      getGuidePath: config.getGuidePath,
      currentLang: config.currentLang || "en",
      baseUrl: config.baseUrl || "/"
    })

    this.dayColumnRenderer = new DayColumnRenderer({
      events: config.events || [],
      getEventType: config.getEventType,
      getIcon: config.getIcon,
      getGuidePath: config.getGuidePath,
      textRenderer: this.textRenderer,
      currentLang: config.currentLang || "en",
      serverOffset: config.serverOffset || "UTC-2",
      baseUrl: config.baseUrl || "/",
      dayLabel: config.dayLabel || "Day",
      dayNames: config.dayNames || [],
      dayTitles: config.dayTitles || {}
    })

    this.calendarRenderer = new CalendarRenderer({
      dayColumnRenderer: this.dayColumnRenderer
    })

    this.menuRenderer = new MenuRenderer({
      textRenderer: this.textRenderer,
      guideMap: config.guideMap || {},
      menuGroups: config.menuGroups || [],
      heroFactionMenu: config.heroFactionMenu || [],
      getGuidePath: config.getGuidePath,
      getHomePath: config.getHomePath,
      getGuidesHubPath: config.getGuidesHubPath
    })

    this.scoreTableRenderer = new ScoreTableRenderer({
      textRenderer: this.textRenderer,
      translations: config.translations || {}
    })

    this.guideCardRenderer = new GuideCardRenderer({
      textRenderer: this.textRenderer,
      guideMap: config.guideMap || {},
      getGuidePath: config.getGuidePath,
      baseUrl: config.baseUrl || "/"
    })
  }

  /**
   * Atualizar linguagem de todos os renderers
   */
  updateLanguage(lang) {
    this.config.currentLang = lang
    this.textRenderer = this.textRenderer.withLanguage(lang)

    this.dayColumnRenderer = this.dayColumnRenderer.withLanguage?.(lang)
      ? this.dayColumnRenderer.withLanguage(lang)
      : new DayColumnRenderer({ ...this.config, textRenderer: this.textRenderer })

    this.calendarRenderer = this.calendarRenderer.withDayColumnRenderer(this.dayColumnRenderer)

    this.menuRenderer = this.menuRenderer.withTextRenderer(this.textRenderer)

    this.scoreTableRenderer = this.scoreTableRenderer
      .withTextRenderer(this.textRenderer)
      .withTranslations(this.config.translations || {})

    this.guideCardRenderer = this.guideCardRenderer.withTextRenderer(this.textRenderer)

    return this
  }

  /**
   * Atualizar configuração completa
   */
  updateConfig(newConfig) {
    Object.assign(this.config, newConfig)
    return this.updateLanguage(newConfig.currentLang || this.config.currentLang)
  }

  /**
   * Obter instância de um renderer específico
   */
  get calendar() {
    return this.calendarRenderer
  }

  get menu() {
    return this.menuRenderer
  }

  get scoreTable() {
    return this.scoreTableRenderer
  }

  get guideCard() {
    return this.guideCardRenderer
  }

  get dayColumn() {
    return this.dayColumnRenderer
  }

  get text() {
    return this.textRenderer
  }
}

// Exportar função para criar gerenciador pré-configurado
export function createRenderManager(config) {
  return new RenderManager(config)
}
