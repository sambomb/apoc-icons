export const DISPLAY_TO_BASE_DIVISOR = 2.17

export const POINT_EXAMPLES = [
  { label: "Example from requirement", shown: 217 },
  { label: "Army sample", shown: 74 }
]

const ZOMBIE_LEVEL_REWARD = [
  ...Array.from({ length: 3 }, (_, i) => ({ level: i + 1, basePoints: 840 })),
  ...Array.from({ length: 3 }, (_, i) => ({ level: i + 4, basePoints: 860 })),
  ...Array.from({ length: 3 }, (_, i) => ({ level: i + 7, basePoints: 880 })),
  ...Array.from({ length: 3 }, (_, i) => ({ level: i + 10, basePoints: 900 })),
  ...Array.from({ length: 3 }, (_, i) => ({ level: i + 13, basePoints: 920 })),
  ...Array.from({ length: 3 }, (_, i) => ({ level: i + 16, basePoints: 940 })),
  ...Array.from({ length: 3 }, (_, i) => ({ level: i + 19, basePoints: 960 })),
  ...Array.from({ length: 3 }, (_, i) => ({ level: i + 22, basePoints: 980 })),
  ...Array.from({ length: 6 }, (_, i) => ({ level: i + 25, basePoints: 1000 }))
]

const BOOMER_LEVEL_REWARD = [
  ...Array.from({ length: 2 }, (_, i) => ({ level: i + 1, basePoints: 1600 })),
  ...Array.from({ length: 2 }, (_, i) => ({ level: i + 3, basePoints: 1700 })),
  ...Array.from({ length: 2 }, (_, i) => ({ level: i + 5, basePoints: 1800 })),
  ...Array.from({ length: 2 }, (_, i) => ({ level: i + 7, basePoints: 1900 })),
  ...Array.from({ length: 2 }, (_, i) => ({ level: i + 9, basePoints: 2000 }))
]

export const SCORE_TABLE = {
  "type-vehicle": {
    title: "Mod Vehicle Boost",
    entries: [
      { action: "Consume 1 Modification Blueprint", basePoints: 4 },
      { action: "Consume 1 Golden Wrench", basePoints: 600 },
      { action: "Group kill Boomer Lv. 1-2", basePoints: 1600 },
      { action: "Group kill Boomer Lv. 3-4", basePoints: 1700 },
      { action: "Group kill Boomer Lv. 5-6", basePoints: 1800 },
      { action: "Group kill Boomer Lv. 7-8", basePoints: 1900 },
      { action: "Group kill Boomer Lv. 9-10", basePoints: 2000 }
    ]
  },
  "type-shelter": {
    title: "Shelter Upgrade",
    entries: [
      { action: "Increase Structure Power by 10", basePoints: 1 },
      { action: "Use 1-min Construction Speedup", basePoints: 10 }
    ]
  },
  "type-science": {
    title: "Age of Science",
    entries: [
      { action: "Increase Tech Power by 10", basePoints: 1 },
      { action: "Use 1-min Research Speedup", basePoints: 10 }
    ]
  },
  "type-hero": {
    title: "Hero Initiative",
    entries: [
      { action: "Perform 1 Prime Recruit", basePoints: 400 },
      { action: "Consume 2,000 Hero EXP", basePoints: 1 }
    ]
  },
  "type-army": {
    title: "Army Expansion",
    entries: [
      { action: "Train and assemble 1 Lv. 1 Unit", basePoints: 55 }
    ]
  },
  "enemy-zombie": {
    title: "Zombie Lv. 1-30",
    entries: ZOMBIE_LEVEL_REWARD.map((row) => ({
      action: `Zombie Lv. ${row.level} (Power: source variance by season/server)` ,
      basePoints: row.basePoints
    }))
  },
  "enemy-boomer": {
    title: "Boomer Lv. 1-10",
    entries: BOOMER_LEVEL_REWARD.map((row) => ({
      action: `Boomer Lv. ${row.level} (Power: source variance by season/server)`,
      basePoints: row.basePoints
    }))
  }
}

export function displayedToBasePoints(displayedPoints){
  const normalized = Number(displayedPoints)
  if(Number.isNaN(normalized) || normalized <= 0) return 1
  return Math.max(1, Math.round(normalized / DISPLAY_TO_BASE_DIVISOR))
}

export function withDisplayedEstimate(basePoints){
  const base = Number(basePoints)
  if(Number.isNaN(base) || base <= 0){
    return { base: 1, displayed: Math.round(DISPLAY_TO_BASE_DIVISOR) }
  }

  return {
    base,
    displayed: Math.round(base * DISPLAY_TO_BASE_DIVISOR)
  }
}