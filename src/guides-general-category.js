import { GUIDE_GROUPS, GUIDE_SETS } from "./guides-general.js"

const GENERAL_RESOURCE_IDS = new Set([
  "resource-general-tips",
  "resource-sources",
  "resource-buildings",
  "resource-change-server",
  "resource-hide-trucks"
])

export { GUIDE_GROUPS }

export const GENERAL_RESOURCE_GUIDES = GUIDE_SETS.resources.filter((guide) => GENERAL_RESOURCE_IDS.has(guide.id))
