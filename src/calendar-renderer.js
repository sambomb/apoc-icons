import { escapeHtml } from "./guide-helpers.js"
import { DayColumnRenderer } from "./day-column-renderer.js"

/**
 * Módulo de renderização de calendário
 * Responsável por renderizar o calendário principal e tabelas de eventos
 */

export class CalendarRenderer {
  /**
   * @param {Object} config Configuração
   * @param {DayColumnRenderer} config.dayColumnRenderer - Renderer para colunas de dias
   * @param {Function} config.onCellClick - Callback quando uma célula é clicada
   */
  constructor(config = {}) {
    this.dayColumnRenderer = config.dayColumnRenderer
    this.onCellClick = config.onCellClick
  }

  /**
   * Renderizar tabela de calendário completa
   * @param {Array<string>} dayGuideIds - IDs dos guias para cada dia (0-6)
   * @returns {Object} { head: string, body: string }
   */
  renderFullCalendarTable(dayGuideIds) {
    return this.dayColumnRenderer.renderFullCalendar(dayGuideIds)
  }

  /**
   * Renderizar calendário simplificado para um dia específico
   * @param {number} dayIndex - Índice do dia (0-6)
   * @param {string} dayGuideLinkId - ID do guia do dia
   * @returns {Object} { head: string, body: string }
   */
  renderSingleDayCalendar(dayIndex, dayGuideLinkId) {
    return this.dayColumnRenderer.renderSingleDayCalendar(dayIndex, dayGuideLinkId)
  }

  /**
   * Atualizar calendário DOM com HTML renderizado
   * @param {HTMLElement} headElement - Element para colocar o head da tabela
   * @param {HTMLElement} bodyElement - Element para colocar o body da tabela
   * @param {Object} calendar - Resultado de renderFullCalendarTable ou renderSingleDayCalendar
   */
  updateCalendarDOM(headElement, bodyElement, calendar) {
    if (headElement) {
      headElement.innerHTML = calendar.head
    }

    if (bodyElement) {
      bodyElement.innerHTML = calendar.body
    }
  }

  /**
   * Aplicar estilos de destaque ao calendário
   * @param {number} currentDay - Dia atual (0-6)
   * @param {number} currentHour - Hora atual
   */
  highlightCurrentDayAndHour(currentDay, currentHour) {
    const row = Math.floor(currentHour / 4) * 4

    // Remover destaques antigos
    document.querySelectorAll(".cell").forEach((c) => {
      c.classList.remove("active", "today-col")
    })

    // Adicionar novo destaque
    document.querySelectorAll(`[data-day="${currentDay}"]`).forEach((c) => c.classList.add("today-col"))

    const active = document.querySelector(`.cell[data-day="${currentDay}"][data-hour="${row}"]`)
    if (active) active.classList.add("active")
  }

  /**
   * Retornar novo renderer com configuração atualizada
   */
  withDayColumnRenderer(dayColumnRenderer) {
    return new CalendarRenderer({
      dayColumnRenderer,
      onCellClick: this.onCellClick
    })
  }
}
