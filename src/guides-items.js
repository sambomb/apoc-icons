import { GUIDE_SETS } from "./guides-general.js"

const ITEM_RESOURCE_IDS = new Set([
  "resource-shield",
  "resource-wrenches",
  "resource-blueprints",
  "resource-skill-books",
  "resource-power-cores",
  "resource-enhancement-alloys",
  "resource-badges",
  "resource-diamonds",
  "resource-prime-recruits",
  "resource-exclusive-equipment-fragments",
  "resource-hero-fragments",
  "resource-refugees",
  "resource-construction-speedups",
  "resource-research-speedups",
  "resource-training-speedups"
])

export const ITEM_RESOURCE_GUIDES = GUIDE_SETS.resources.filter((guide) => ITEM_RESOURCE_IDS.has(guide.id))
