import { escapeHtml } from "./guide-helpers.js"
import { TextRenderer } from "./text-renderer.js"

/**
 * Renderizador de tabelas de pontos
 * Responsável por renderizar tabelas de score com suporte a bonus e múltiplas linguagens
 */

export class ScoreTableRenderer {
  /**
   * @param {Object} config Configuração
   * @param {TextRenderer} config.textRenderer - Instância de TextRenderer
   * @param {Object} config.translations - Objeto de traduções
   */
  constructor(config = {}) {
    this.textRenderer = config.textRenderer
    this.translations = config.translations || {}
  }

  /**
   * Renderizar cabeçalho da tabela de pontos
   * @returns {string} HTML do thead
   */
  renderTableHead() {
    return `
      <thead>
        <tr>
          <th>${escapeHtml(this.translations.scoreAction || "Action")}</th>
          <th>${escapeHtml(this.translations.scoreBase || "Base points")}</th>
          <th>${escapeHtml(this.translations.scoreDisplayed || "Estimate")}</th>
        </tr>
      </thead>
    `
  }

  /**
   * Renderizar linha da tabela de pontos
   * @param {Object} entry - Entrada com { action, basePoints }
   * @param {number} bonus - Percentual de bonus (default 0)
   * @returns {string} HTML da linha
   */
  renderTableRow(entry, bonus = 0) {
    const action = this.textRenderer.renderTextWithLinks(entry.action)
    const basePoints = entry.basePoints
    const estimate = bonus > 0 ? Math.round(basePoints * (1 + bonus / 100)) : basePoints

    return `
      <tr data-base-points="${basePoints}">
        <td>${action}</td>
        <td>${basePoints}</td>
        <td class="score-estimate-value">${estimate}</td>
      </tr>
    `
  }

  /**
   * Renderizar corpo da tabela de pontos
   * @param {Array} entries - Lista de { action, basePoints }
   * @param {number} bonus - Percentual de bonus (default 0)
   * @returns {string} HTML do tbody
   */
  renderTableBody(entries, bonus = 0) {
    const rows = entries.map((entry) => this.renderTableRow(entry, bonus)).join("")

    return `<tbody>${rows}</tbody>`
  }

  /**
   * Renderizar tabela completa de pontos
   * @param {Object} options Opções
   * @param {string} options.title - Título da seção
   * @param {Array} options.entries - Lista de entradas
   * @param {number} options.bonus - Percentual de bonus
   * @param {boolean} options.enableBonusInput - Se deve incluir input de bonus
   * @param {string} options.bonusInputId - ID do input de bonus
   * @returns {string} HTML da seção completa
   */
  renderFullTable(options = {}) {
    const {
      title = "Score table",
      entries = [],
      bonus = 0,
      enableBonusInput = false,
      bonusInputId = "bonusPercentInputMain"
    } = options

    const bonusSection = enableBonusInput
      ? `
        <div class="bonus-control">
          <label for="${escapeHtml(bonusInputId)}">
            ${escapeHtml(this.translations.bonusPercentLabel || "Bonus points (%)")}
          </label>
          <input
            id="${escapeHtml(bonusInputId)}"
            class="bonus-percent-input"
            type="number"
            min="0"
            step="0.1"
            value="${bonus}"
          >
        </div>
      `
      : ""

    return `
      <section class="guide-detail-card">
        <h3>${escapeHtml(this.translations.scoreSectionTitle || title)}</h3>
        ${bonusSection}
        <table class="score-table">
          ${this.renderTableHead()}
          ${this.renderTableBody(entries, bonus)}
        </table>
      </section>
    `
  }

  /**
   * Hook para calcular bonus dinamicamente
   * @param {string} bonusInputId - ID do input de bonus
   * @param {Function} onBonusChange - Callback quando bonus muda
   */
  hookBonusCalculator(bonusInputId = "bonusPercentInputMain", onBonusChange) {
    const bonusInput = document.getElementById(bonusInputId)
    if (!bonusInput) return

    const updateEstimates = () => {
      const bonusPercent = parseFloat(bonusInput.value) || 0
      document.querySelectorAll("table.score-table tbody tr").forEach((row) => {
        const basePoints = parseInt(row.dataset.basePoints, 10)
        if (isNaN(basePoints)) return

        const estimate = bonusPercent > 0 ? Math.round(basePoints * (1 + bonusPercent / 100)) : basePoints
        const estimateCell = row.querySelector(".score-estimate-value")
        if (estimateCell) {
          estimateCell.textContent = estimate
        }
      })

      if (onBonusChange) {
        onBonusChange(bonusPercent)
      }
    }

    bonusInput.addEventListener("input", updateEstimates)
    bonusInput.addEventListener("change", updateEstimates)
  }

  /**
   * Retornar novo renderer com translations atualizado
   */
  withTranslations(translations) {
    return new ScoreTableRenderer({
      textRenderer: this.textRenderer,
      translations
    })
  }
}
