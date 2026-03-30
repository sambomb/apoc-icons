export const DAY_IDS_BY_INDEX = [
  "day-peace",
  "day-vehicle",
  "day-shelter",
  "day-science",
  "day-hero",
  "day-growth",
  "day-enemy"
]

export const HERO_FACTION_MENU = [
  {
    id: "blood-rose",
    title: "Blood Rose",
    heroIds: [
      "hero-katrina",
      "hero-sophia",
      "hero-selena",
      "hero-oliveira",
      "hero-vivian",
      "hero-miranda",
      "hero-ava",
      "hero-audrey",
      "hero-giselle"
    ]
  },
  {
    id: "wings-of-dawn",
    title: "Wings of Dawn",
    heroIds: [
      "hero-laura",
      "hero-amelia",
      "hero-scarlett",
      "hero-fiona",
      "hero-isabella",
      "hero-christina",
      "hero-angelina",
      "hero-natalie"
    ]
  },
  {
    id: "order-guard",
    title: "Order Guard",
    heroIds: [
      "hero-chinatsu",
      "hero-mia",
      "hero-evelyn",
      "hero-maria",
      "hero-elizabeth",
      "hero-leah",
      "hero-athena",
      "hero-william"
    ]
  }
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
  { id: "resource-intercity-trades", path: "missions/intercity-trades.html", group: "missions" },

  { id: "resource-shield", path: "items/shield.html", group: "items" },
  { id: "resource-wrenches", path: "items/golden-wrenches.html", group: "items" },
  { id: "resource-blueprints", path: "items/modification-blueprints.html", group: "items" },
  { id: "resource-skill-books", path: "items/skill-books.html", group: "items" },
  { id: "resource-power-cores", path: "items/power-cores.html", group: "items" },
  { id: "resource-enhancement-alloys", path: "items/enhancement-alloys.html", group: "items" },
  { id: "resource-badges", path: "items/badges.html", group: "items" },
  { id: "resource-diamonds", path: "items/diamonds.html", group: "items" },
  { id: "resource-prime-recruits", path: "items/prime-recruits.html", group: "items" },
  { id: "resource-exclusive-equipment-fragments", path: "items/exclusive-equipment-fragments.html", group: "items" },
  { id: "resource-hero-fragments", path: "items/hero-fragments.html", group: "items" },
  { id: "resource-refugees", path: "items/refugees.html", group: "items" },
  { id: "resource-construction-speedups", path: "items/construction-speedups.html", group: "items" },
  { id: "resource-research-speedups", path: "items/research-speedups.html", group: "items" },
  { id: "resource-training-speedups", path: "items/training-speedups.html", group: "items" },

  { id: "resource-heroes", path: "heroes/index.html", group: "heroes" },

  { id: "hero-katrina", path: "heroes/blood-rose/katrina.html", group: "heroes" },
  { id: "hero-sophia", path: "heroes/blood-rose/sophia.html", group: "heroes" },
  { id: "hero-laura", path: "heroes/wings-of-dawn/laura.html", group: "heroes" },
  { id: "hero-chinatsu", path: "heroes/order-guard/chinatsu.html", group: "heroes" },
  { id: "hero-mia", path: "heroes/order-guard/mia.html", group: "heroes" },
  { id: "hero-oliveira", path: "heroes/blood-rose/oliveira.html", group: "heroes" },
  { id: "hero-amelia", path: "heroes/wings-of-dawn/amelia.html", group: "heroes" },
  { id: "hero-scarlett", path: "heroes/wings-of-dawn/scarlett.html", group: "heroes" },
  { id: "hero-evelyn", path: "heroes/order-guard/evelyn.html", group: "heroes" },
  { id: "hero-selena", path: "heroes/blood-rose/selena.html", group: "heroes" },
  { id: "hero-vivian", path: "heroes/blood-rose/vivian.html", group: "heroes" },
  { id: "hero-miranda", path: "heroes/blood-rose/miranda.html", group: "heroes" },
  { id: "hero-fiona", path: "heroes/wings-of-dawn/fiona.html", group: "heroes" },
  { id: "hero-elizabeth", path: "heroes/order-guard/elizabeth.html", group: "heroes" },
  { id: "hero-maria", path: "heroes/order-guard/maria.html", group: "heroes" },
  { id: "hero-isabella", path: "heroes/wings-of-dawn/isabella.html", group: "heroes" },
  { id: "hero-leah", path: "heroes/order-guard/leah.html", group: "heroes" },
  { id: "hero-ava", path: "heroes/blood-rose/ava.html", group: "heroes" },
  { id: "hero-christina", path: "heroes/wings-of-dawn/christina.html", group: "heroes" },
  { id: "hero-athena", path: "heroes/order-guard/athena.html", group: "heroes" },
  { id: "hero-audrey", path: "heroes/blood-rose/audrey.html", group: "heroes" },
  { id: "hero-william", path: "heroes/order-guard/william.html", group: "heroes" },
  { id: "hero-angelina", path: "heroes/wings-of-dawn/angelina.html", group: "heroes" },
  { id: "hero-natalie", path: "heroes/wings-of-dawn/natalie.html", group: "heroes" },
  { id: "hero-giselle", path: "heroes/blood-rose/giselle.html", group: "heroes" },

  { id: "resource-general-tips", path: "systems/general-tips.html", group: "systems" },
  { id: "resource-buildings", path: "systems/buildings.html", group: "systems" },
  { id: "resource-sources", path: "systems/sources.html", group: "systems" },

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

export function getGuidesHubPath(){
  return withBase("guides.html")
}

export function getGuidePath(guideId){
  return withBase(ROUTE_MAP[guideId] || "index.html")
}
