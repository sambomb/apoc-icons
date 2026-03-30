import { GUIDE_SETS } from "./guides-general.js"

const RESOURCE_HERO_SYSTEM_ID = "resource-heroes"

export const HERO_RESOURCE_GUIDES = GUIDE_SETS.resources.filter((guide) => (
  guide.id === RESOURCE_HERO_SYSTEM_ID || guide.id.startsWith("hero-")
))
