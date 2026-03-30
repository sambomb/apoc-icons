import { escapeHtml, withBasePath, formatTime as helperFormatTime } from "./guide-helpers.js"
import { TextRenderer } from "./text-renderer.js"

/**
 * Parse server offset string like "UTC-2" into milliseconds
 */
function parseServerOffset(offsetStr) {
  const match = offsetStr.match(/UTC([+-]\d+)/)
  if (!match) return 0
  return parseInt(match[1], 10) * 60 * 60 * 1000
}

/**
 * Get apocalypse time now (UTC)
 */
function getApocNow() {
  return new Date()
}

export class DayColumnRenderer {
  /**
   * Classe responsável por renderizar colunas de dias do calendário
   * Reutilizável para calendário principal e páginas individuais de dias
   * @param {Object} config Configuração
   * @param {Object} config.events - Objeto com eventos por hora e dia
   * @param {Function} config.getEventType - Função para obter tipo de evento
   * @param {Function} config.getIcon - Função para obter ícone
   * @param {Function} config.getGuidePath - Função para obter caminho de guias
   * @param {Object} config.textRenderer - Instância de TextRenderer
   * @param {string} config.currentLang - Linguagem atual
   * @param {string} config.serverOffset - Offset do servidor (ex: "UTC-2")
   * @param {string} config.baseUrl - URL base para assets
   * @param {string} config.dayLabel - Rótulo para "Day" na linguagem atual
   * @param {Array} config.dayNames - Nomes dos dias ("Monday", "Tuesday", etc)
   * @param {Array} config.dayTitles - Títulos dos dias
   */
  constructor(config = {}) {
    this.events = config.events || []
    this.getEventType = config.getEventType || ((ev) => "unknown")
    this.getIcon = config.getIcon || ((day, hour) => "")
    this.getGuidePath = config.getGuidePath || ((id) => `/guide/${id}`)
    this.textRenderer =
      config.textRenderer || new TextRenderer({ currentLang: config.currentLang })
    this.currentLang = config.currentLang || "en"
    this.serverOffset = config.serverOffset || "UTC-2"
    this.baseUrl = config.baseUrl || "/"
    this.dayLabel = config.dayLabel || "Day"
    this.dayNames = config.dayNames || []
    this.dayTitles = config.dayTitles || {}
  }

  /**
   * Renderizar header da coluna de um dia
   * @param {number} dayIndex - Índice do dia (0-6)
   * @param {string} dayGuideLinkId - ID do guia do dia para o link
   * @returns {string} HTML do header
   */
  renderDayHeader(dayIndex, dayGuideLinkId) {
    const dayName = this.dayNames[dayIndex] || `Day ${dayIndex}`
    const dayTitle = this.dayTitles[dayIndex] || ""
    const href = this.getGuidePath(dayGuideLinkId)

    return `
      <th data-day="${dayIndex}">
        <a class="day-link" href="${escapeHtml(href)}">
          ${escapeHtml(this.dayLabel)} ${dayIndex} - ${escapeHtml(dayName)}
          <div class="day-title">${escapeHtml(dayTitle)}</div>
        </a>
      </th>
    `
  }

  /**
   * Renderizar célula de um horário e dia
   * @param {number} dayIndex - Índice do dia (0-6)
   * @param {number} hour - Hora (0-23)
   * @param {string} dayGuideLinkId - ID do guia do dia para links das células
   * @returns {string} HTML da célula
   */
  renderDayCell(dayIndex, hour, dayGuideLinkId) {
    const slotIndex = Math.floor(hour / 4)
    const ev = this.events[slotIndex]?.[dayIndex]

    if (ev === undefined) {
      return `<td class="cell" data-day="${dayIndex}" data-hour="${hour}"></td>`
    }

    const eventType = this.getEventType(ev)
    const iconSrc = this.getIcon(dayIndex, hour)
    const iconClass = "radar-icon"
    const shieldHtml =
      dayIndex === 6
        ? `<img src="${this.withBase("shield.png")}" class="radar-icon shield-icon" alt="Shield">`
        : ""

    const dayGuideLink = this.getGuidePath(dayGuideLinkId)
    const eventName = this.textRenderer.getText(`events.${ev}`) || `Event ${ev}`

    // Calculate local date and time
    const nowApoc = getApocNow()
    const offsetMs = parseServerOffset(this.serverOffset)
    const nowApocDay = nowApoc.getUTCDay()
    let dayDiff = dayIndex - nowApocDay

    if (dayDiff < 0) dayDiff += 7

    const currentSlotStart = Math.floor(nowApoc.getUTCHours() / 4) * 4
    if (dayDiff === 0 && hour < currentSlotStart) {
      dayDiff = 7
    }

    const occurrenceApoc = new Date(nowApoc)
    occurrenceApoc.setUTCHours(hour, 0, 0, 0)
    occurrenceApoc.setUTCDate(nowApoc.getUTCDate() + dayDiff)

    const occurrenceLocal = new Date(occurrenceApoc.getTime() - offsetMs)
    const localDateStr = occurrenceLocal.toLocaleDateString(this.currentLang, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })

    // Format time using the language
    const hours = String(occurrenceLocal.getHours()).padStart(2, "0")
    const minutes = String(occurrenceLocal.getMinutes()).padStart(2, "0")
    const localTimeStr = `${hours}:${minutes}`

    return `
      <td class="cell" data-day="${dayIndex}" data-hour="${hour}" data-event="${eventType}">
        <a class="cell-link" href="${escapeHtml(dayGuideLink)}">
          <div class="cell-date">
            ${escapeHtml(localDateStr)} ${escapeHtml(localTimeStr)}
          </div>
          <div class="cell-icons">
            <img src="${escapeHtml(iconSrc)}" class="${iconClass}" alt="Event state icon">
            ${shieldHtml}
          </div>
          <div class="cell-event">
            ${this.textRenderer.renderText(eventName)}
          </div>
        </a>
      </td>
    `
  }

  /**
   * Renderizar uma linha do calendário (para um horário específico)
   * @param {number} hour - Hora (múltiplo de 4: 0, 4, 8, etc)
   * @param {Array<string>} dayGuideIds - IDs dos guias de cada dia (0-6)
   * @param {Array<number>} daysToRender - Quais dias renderizar (default: [0,1,2,3,4,5,6])
   * @returns {string} HTML da linha
   */
  renderDayRow(hour, dayGuideIds, daysToRender = [0, 1, 2, 3, 4, 5, 6]) {
    const timeStr = String(hour).padStart(2, "0") + ":00"
    let row = `<tr><td>${escapeHtml(timeStr)}</td>`

    for (const dayIndex of daysToRender) {
      row += this.renderDayCell(dayIndex, hour, dayGuideIds[dayIndex])
    }

    row += "</tr>"
    return row
  }

  /**
   * Renderizar calendário simplificado para um único dia
   * Mostra 6 linhas (horários) para aquele dia específico
   * @param {number} dayIndex - Índice do dia (0-6)
   * @param {string} dayGuideLinkId - ID do guia do dia
   * @returns {Object} { head: string, body: string }
   */
  renderSingleDayCalendar(dayIndex, dayGuideLinkId) {
    const head = this.renderDayHeader(dayIndex, dayGuideLinkId)

    let body = ""
    for (let r = 0; r < 6; r++) {
      const hour = r * 4
      body += this.renderDayRow(hour, [dayGuideLinkId], [0])
    }

    return {
      head: `<tr><th></th>${head}</tr>`,
      body
    }
  }

  /**
   * Renderizar calendário completo (todos os 7 dias)
   * @param {Array<string>} dayGuideIds - IDs dos guias de cada dia (0-6)
   * @returns {Object} { head: string, body: string }
   */
  renderFullCalendar(dayGuideIds) {
    let head = "<tr><th></th>"
    for (let d = 0; d < 7; d++) {
      head += this.renderDayHeader(d, dayGuideIds[d])
    }
    head += "</tr>"

    let body = ""
    for (let r = 0; r < 6; r++) {
      const hour = r * 4
      body += this.renderDayRow(hour, dayGuideIds)
    }

    return {
      head,
      body
    }
  }

  /**
   * Helper para resolver URL de assets
   */
  withBase(path) {
    return withBasePath(path, this.baseUrl)
  }

  /**
   * Criar novo renderer com linguagem atualizada
   */
  withLanguage(lang) {
    const textRenderer = this.textRenderer.withLanguage(lang)
    return new DayColumnRenderer({
      events: this.events,
      getEventType: this.getEventType,
      getIcon: this.getIcon,
      getGuidePath: this.getGuidePath,
      textRenderer,
      currentLang: lang,
      serverOffset: this.serverOffset,
      baseUrl: this.baseUrl,
      dayLabel: this.dayLabel,
      dayNames: this.dayNames,
      dayTitles: this.dayTitles
    })
  }
}
