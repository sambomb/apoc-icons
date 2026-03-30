import { escapeHtml, withBasePath } from "./guide-helpers.js"

export class TextRenderer {
  /**
   * Classe responsável por renderizar textos
   * Integra tradução, hyperlinks e CSS contextual (RTL, fontes específicas)
   * @param {Object} config Configuração
   * @param {Object} config.translations - Objeto de traduções (T)
   * @param {Function} config.linkifyFn - Função para linkificar texto
   * @param {Function} config.getGuidePath - Função para obter caminho de guias
   * @param {string} config.currentLang - Linguagem atual
   * @param {boolean} config.isRTL - Se a linguagem é RTL (right-to-left)
   * @param {string} config.fontClass - Classe CSS para fonte específica
   * @param {string} config.baseUrl - URL base para assets
   */
  constructor(config = {}) {
    this.translations = config.translations || {}
    this.linkifyFn = config.linkifyFn || ((text) => text)
    this.getGuidePath = config.getGuidePath || ((id) => `/guide/${id}`)
    this.currentLang = config.currentLang || "en"
    this.isRTL = config.isRTL || false
    this.fontClass = config.fontClass || ""
    this.baseUrl = config.baseUrl || "/"
    
    this.updateLanguageProperties(this.currentLang)
  }

  /**
   * Atualiza propriedades baseadas na linguagem
   * Determina se é RTL e qual classe de fonte usar
   */
  updateLanguageProperties(lang) {
    this.currentLang = lang
    
    // RTL languages: ar (Arabic), ur (Urdu), he (Hebrew)
    this.isRTL = ["ar", "ur", "he"].includes(lang)
    
    // Specific fonts for certain languages
    const fontMap = {
      "ar": "font-arabic",
      "ur": "font-urdu",
      "hi": "font-hindi",
      "bn": "font-bengali",
      "ja": "font-japanese",
      "ko": "font-korean",
      "zh": "font-chinese"
    }
    
    this.fontClass = fontMap[lang] || ""
  }

  /**
   * Obter texto traduzido com fallback
   */
  getText(key, fallback = "") {
    return this.translations[key] || fallback
  }

  /**
   * Renderizar texto simples com tradução
   */
  renderText(text) {
    return escapeHtml(text)
  }

  /**
   * Renderizar texto com hyperlinks
   */
  renderTextWithLinks(text) {
    return this.linkifyFn(text)
  }

  /**
   * Renderizar span com atributos contextuais de linguagem
   */
  renderSpan(text, options = {}) {
    const { useLinks = false, className = "", title = "" } = options
    const direction = this.isRTL ? 'dir="rtl"' : ""
    const fontClass = this.fontClass ? this.fontClass : ""
    const classes = [
      className,
      fontClass,
      this.isRTL ? "rtl-text" : ""
    ].filter(Boolean).join(" ")
    
    const classAttr = classes ? `class="${classes}"` : ""
    const titleAttr = title ? `title="${escapeHtml(title)}"` : ""
    const renderedText = useLinks ? this.renderTextWithLinks(text) : this.renderText(text)
    
    return `<span ${direction} ${classAttr} ${titleAttr}>${renderedText}</span>`
  }

  /**
   * Renderizar parágrafo com atributos contextuais
   */
  renderParagraph(text, options = {}) {
    const { useLinks = false, className = "" } = options
    const direction = this.isRTL ? 'dir="rtl"' : ""
    const fontClass = this.fontClass ? this.fontClass : ""
    const classes = [
      "rendered-paragraph",
      className,
      fontClass,
      this.isRTL ? "rtl-text" : ""
    ].filter(Boolean).join(" ")
    
    const classAttr = classes ? `class="${classes}"` : ""
    const renderedText = useLinks ? this.renderTextWithLinks(text) : this.renderText(text)
    
    return `<p ${direction} ${classAttr}>${renderedText}</p>`
  }

  /**
   * Renderizar uma lista de itens
   */
  renderList(items, options = {}) {
    const { useLinks = false, className = "" } = options
    const direction = this.isRTL ? 'dir="rtl"' : ""
    const fontClass = this.fontClass ? this.fontClass : ""
    const classes = [
      "rendered-list",
      className,
      fontClass,
      this.isRTL ? "rtl-text" : ""
    ].filter(Boolean).join(" ")
    
    const classAttr = classes ? `class="${classes}"` : ""
    const listItems = items
      .map((item) => {
        const renderedItem = useLinks ? this.renderTextWithLinks(item) : this.renderText(item)
        return `<li>${renderedItem}</li>`
      })
      .join("")
    
    return `<ul ${direction} ${classAttr}>${listItems}</ul>`
  }

  /**
   * Renderizar heading com atributos contextuais
   */
  renderHeading(text, level = 2, options = {}) {
    const { useLinks = false, className = "" } = options
    const tag = `h${Math.max(1, Math.min(6, level))}`
    const direction = this.isRTL ? 'dir="rtl"' : ""
    const fontClass = this.fontClass ? this.fontClass : ""
    const classes = [
      `rendered-heading-${level}`,
      className,
      fontClass,
      this.isRTL ? "rtl-text" : ""
    ].filter(Boolean).join(" ")
    
    const classAttr = classes ? `class="${classes}"` : ""
    const renderedText = useLinks ? this.renderTextWithLinks(text) : this.renderText(text)
    
    return `<${tag} ${direction} ${classAttr}>${renderedText}</${tag}>`
  }

  /**
   * Renderizar seção de guia com título e itens
   */
  renderGuideSectionCard(section, options = {}) {
    const { useLinks = true } = options
    const direction = this.isRTL ? 'dir="rtl"' : ""
    const fontClass = this.fontClass ? this.fontClass : ""
    const cardClass = [fontClass, this.isRTL ? "rtl-text" : ""].filter(Boolean).join(" ")
    
    const title = this.renderHeading(section.title, 3, { useLinks })
    const items = this.renderList(section.items || [], { useLinks })
    
    const cardAttr = cardClass ? `class="guide-detail-card ${cardClass}"` : 'class="guide-detail-card"'
    
    return `
      <section ${direction} ${cardAttr}>
        ${title}
        ${items}
      </section>
    `
  }

  /**
   * Renderizar tabela de pontos com atributos contextuais
   */
  renderScoreTable(entries, options = {}) {
    const { title = "Points Table", useLinks = true, bonus = 0 } = options
    const direction = this.isRTL ? 'dir="rtl"' : ""
    const fontClass = this.fontClass ? this.fontClass : ""
    const tableClass = [fontClass, this.isRTL ? "rtl-text" : ""].filter(Boolean).join(" ")
    
    const rows = entries
      .map((entry) => {
        const action = useLinks ? this.renderTextWithLinks(entry.action) : escapeHtml(entry.action)
        const basePoints = entry.basePoints
        const estimate = bonus > 0 ? Math.round(basePoints * (1 + bonus / 100)) : basePoints
        
        return `
          <tr data-base-points="${basePoints}">
            <td>${action}</td>
            <td>${basePoints}</td>
            <td class="score-estimate-value">${estimate}</td>
          </tr>
        `
      })
      .join("")
    
    const tableAttr = tableClass ? `class="score-table ${tableClass}"` : 'class="score-table"'
    const sectionAttr = tableClass
      ? `class="guide-detail-card ${tableClass}"`
      : 'class="guide-detail-card"'
    
    return `
      <section ${direction} ${sectionAttr}>
        <h3${tableClass ? ` class="${tableClass}"` : ""}>${escapeHtml(title)}</h3>
        <table ${direction} ${tableAttr}>
          <thead>
            <tr>
              <th>Action</th>
              <th>Base points</th>
              <th>Estimate</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </section>
    `
  }

  /**
   * Renderizar link com atributos contextuais
   */
  renderLink(text, href, options = {}) {
    const { className = "", target = "", useLinks = false } = options
    const classes = [className, this.fontClass].filter(Boolean).join(" ")
    const classAttr = classes ? `class="${classes}"` : ""
    const targetAttr = target ? `target="${target}"` : ""
    const relAttr = target === "_blank" ? 'rel="noopener noreferrer"' : ""
    const renderedText = useLinks ? this.renderTextWithLinks(text) : escapeHtml(text)
    
    return `<a href="${escapeHtml(href)}" ${classAttr} ${targetAttr} ${relAttr}>${renderedText}</a>`
  }

  /**
   * Criar contexto de renderização para uma linguagem específica
   */
  withLanguage(lang) {
    const newRenderer = new TextRenderer({
      translations: this.translations,
      linkifyFn: this.linkifyFn,
      getGuidePath: this.getGuidePath,
      currentLang: lang,
      baseUrl: this.baseUrl
    })
    return newRenderer
  }
}
