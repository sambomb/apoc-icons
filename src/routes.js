export const DAY_IDS_BY_INDEX = [
  "day-peace",
  "day-vehicle",
  "day-shelter",
  "day-science",
  "day-hero",
  "day-growth",
  "day-enemy"
]

export const GUIDE_ROUTES = [
  { id: "day-peace", path: "ad/day-0.html", group: "allianceDuel" },
  { id: "day-vehicle", path: "ad/day-1.html", group: "allianceDuel" },
  { id: "day-shelter", path: "ad/day-2.html", group: "allianceDuel" },
  { id: "day-science", path: "ad/day-3.html", group: "allianceDuel" },
  { id: "day-hero", path: "ad/day-4.html", group: "allianceDuel" },
  { id: "day-growth", path: "ad/day-5.html", group: "allianceDuel" },
  { id: "day-enemy", path: "ad/day-6.html", group: "allianceDuel" },

  { id: "type-vehicle", path: "fp/vehicle-boost.html", group: "fullPreparedness" },
  { id: "type-shelter", path: "fp/shelter-upgrade.html", group: "fullPreparedness" },
  { id: "type-science", path: "fp/age-of-science.html", group: "fullPreparedness" },
  { id: "type-hero", path: "fp/hero-initiative.html", group: "fullPreparedness" },
  { id: "type-army", path: "fp/army-expansion.html", group: "fullPreparedness" },

  { id: "resource-radar", path: "missions/radar.html", group: "missions" },
  { id: "resource-bounty", path: "missions/bounty.html", group: "missions" },
  { id: "resource-interstate-truck", path: "missions/interstate-truck.html", group: "missions" },

  { id: "resource-shield", path: "items/shield.html", group: "items" },
  { id: "resource-wrenches", path: "items/golden-wrenches.html", group: "items" },
  { id: "resource-blueprints", path: "items/modification-blueprints.html", group: "items" },

  { id: "resource-heroes", path: "heroes/index.html", group: "heroes" },

  { id: "hero-katrina", path: "heroes/katrina.html", group: "heroes" },
  { id: "hero-sophia", path: "heroes/sophia.html", group: "heroes" },
  { id: "hero-laura", path: "heroes/laura.html", group: "heroes" },
  { id: "hero-chinatsu", path: "heroes/chinatsu.html", group: "heroes" },
  { id: "hero-mia", path: "heroes/mia.html", group: "heroes" },
  { id: "hero-oliveira", path: "heroes/oliveira.html", group: "heroes" },
  { id: "hero-amelia", path: "heroes/amelia.html", group: "heroes" },
  { id: "hero-scarlett", path: "heroes/scarlett.html", group: "heroes" },
  { id: "hero-evelyn", path: "heroes/evelyn.html", group: "heroes" },
  { id: "hero-selena", path: "heroes/selena.html", group: "heroes" },
  { id: "hero-vivian", path: "heroes/vivian.html", group: "heroes" },
  { id: "hero-miranda", path: "heroes/miranda.html", group: "heroes" },
  { id: "hero-fiona", path: "heroes/fiona.html", group: "heroes" },
  { id: "hero-elizabeth", path: "heroes/elizabeth.html", group: "heroes" },
  { id: "hero-maria", path: "heroes/maria.html", group: "heroes" },
  { id: "hero-isabella", path: "heroes/isabella.html", group: "heroes" },
  { id: "hero-leah", path: "heroes/leah.html", group: "heroes" },
  { id: "hero-ava", path: "heroes/ava.html", group: "heroes" },
  { id: "hero-christina", path: "heroes/christina.html", group: "heroes" },
  { id: "hero-athena", path: "heroes/athena.html", group: "heroes" },
  { id: "hero-audrey", path: "heroes/audrey.html", group: "heroes" },
  { id: "hero-william", path: "heroes/william.html", group: "heroes" },
  { id: "hero-angelina", path: "heroes/angelina.html", group: "heroes" },
  { id: "hero-natalie", path: "heroes/natalie.html", group: "heroes" },
  { id: "hero-giselle", path: "heroes/giselle.html", group: "heroes" },

  { id: "resource-point-rules", path: "systems/point-rules.html", group: "systems" },
  { id: "resource-general-tips", path: "systems/general-tips.html", group: "systems" },
  { id: "resource-buildings", path: "systems/buildings.html", group: "systems" },

  { id: "enemy-units", path: "enemies/units.html", group: "enemies" },
  { id: "enemy-boomer", path: "enemies/boomer.html", group: "enemies" },
  { id: "enemy-zombie", path: "enemies/zombie.html", group: "enemies" },
  { id: "enemy-berserk-zombie", path: "enemies/berserk-zombie.html", group: "enemies" },
  { id: "enemy-bloods-goons", path: "enemies/bloods-goons.html", group: "enemies" },
  { id: "enemy-fury-lord", path: "enemies/fury-lord.html", group: "enemies" }
]

export const MENU_GROUPS = [
  {
    id: "calendar",
    titleKey: "menuCalendar",
    rootPath: "index.html",
    items: []
  },
  {
    id: "allianceDuel",
    titleKey: "menuAllianceDuel",
    items: GUIDE_ROUTES.filter((route) => route.group === "allianceDuel")
  },
  {
    id: "fullPreparedness",
    titleKey: "menuFullPreparedness",
    items: GUIDE_ROUTES.filter((route) => route.group === "fullPreparedness")
  },
  {
    id: "missions",
    titleKey: "menuMissions",
    items: GUIDE_ROUTES.filter((route) => route.group === "missions")
  },
  {
    id: "items",
    titleKey: "menuItems",
    items: GUIDE_ROUTES.filter((route) => route.group === "items")
  },
  {
    id: "systems",
    titleKey: "menuSystems",
    items: GUIDE_ROUTES.filter((route) => route.group === "systems")
  },
  {
    id: "heroes",
    titleKey: "menuHeroes",
    items: GUIDE_ROUTES.filter((route) => route.group === "heroes")
  },
  {
    id: "enemies",
    titleKey: "menuEnemies",
    items: GUIDE_ROUTES.filter((route) => route.group === "enemies")
  }
]

const ROUTE_MAP = Object.fromEntries(GUIDE_ROUTES.map((route) => [route.id, route.path]))

const BASE_URL = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.BASE_URL)
  ? import.meta.env.BASE_URL
  : "/"

function withBase(path){
  const normalizedBase = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`
  return `${normalizedBase}${String(path).replace(/^\/+/, "")}`
}

export function getHomePath(){
  return withBase("index.html")
}

export function getGuidePath(guideId){
  return withBase(ROUTE_MAP[guideId] || "index.html")
}