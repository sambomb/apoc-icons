import { GUIDE_GROUPS, GENERAL_RESOURCE_GUIDES } from "./guides-general-category.js"
import { ITEM_RESOURCE_GUIDES } from "./guides-items.js"
import { EVENT_TYPE_GUIDES, DAY_GUIDES, MISSION_RESOURCE_GUIDES, ENEMY_RESOURCE_GUIDES } from "./guides-missions.js"
import { HERO_RESOURCE_GUIDES } from "./guides-heroes.js"

export { GUIDE_GROUPS }

export const GUIDE_SETS = {
  eventTypes: EVENT_TYPE_GUIDES,
  days: DAY_GUIDES,
  resources: [
    ...GENERAL_RESOURCE_GUIDES,
    ...ITEM_RESOURCE_GUIDES,
    ...MISSION_RESOURCE_GUIDES,
    ...ENEMY_RESOURCE_GUIDES,
    ...HERO_RESOURCE_GUIDES
  ]
}

export const ALL_GUIDES = [
  ...GUIDE_SETS.eventTypes,
  ...GUIDE_SETS.days,
  ...GUIDE_SETS.resources
]

export const GUIDE_MAP = Object.fromEntries(ALL_GUIDES.map((guide) => [guide.id, guide]))

export const GUIDE_STATS = {
  eventTypes: GUIDE_SETS.eventTypes.length,
  days: GUIDE_SETS.days.length,
  resources: GUIDE_SETS.resources.length
}
