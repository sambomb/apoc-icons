import { GUIDE_SETS } from "./guides-general.js"

const MISSION_RESOURCE_IDS = new Set([
  "resource-radar",
  "resource-bounty",
  "resource-intercity-trades"
])

export const EVENT_TYPE_GUIDES = GUIDE_SETS.eventTypes
export const DAY_GUIDES = GUIDE_SETS.days

export const MISSION_RESOURCE_GUIDES = GUIDE_SETS.resources.filter((guide) => MISSION_RESOURCE_IDS.has(guide.id))

export const ENEMY_RESOURCE_GUIDES = GUIDE_SETS.resources.filter((guide) => guide.id.startsWith("enemy-"))
