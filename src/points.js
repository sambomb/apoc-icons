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
  "day-vehicle": {
    title: "Day 1 points",
    enableBonusInput: true,
    entries: [
      { action: "Consume 1 Modification Blueprints", basePoints: 20 },
      { action: "Consume 1 golden wrenches", basePoints: 4977 },
      { action: "Complete 1 radar events", basePoints: 4977 },
      { action: "Start a team-up and kill a Lv.1-2 Boomer", basePoints: 1567 },
      { action: "Start a team-up and kill a Lv.3-4 Boomer", basePoints: 1706 },
      { action: "Start a team-up and kill a Lv.5-6 Boomer", basePoints: 1797 },
      { action: "Start a team-up and kill a Lv.7-8 Boomer", basePoints: 1889 },
      { action: "Start a team-up and kill a Lv.9-10 Boomer", basePoints: 1982 },
      { action: "Kill 1 Lv.1-3 zombie", basePoints: 80 },
      { action: "Kill 1 Lv.4-6 zombie", basePoints: 160 },
      { action: "Kill 1 Lv.7-9 zombie", basePoints: 241 }
    ]
  },
  "day-shelter": {
    title: "Day 2 points",
    enableBonusInput: true,
    entries: [
      { action: "Use 1-min Construction Speedup", basePoints: 40 },
      { action: "Increase Structure power by 10 points", basePoints: 1 },
      { action: "Perform 1 orange [Bounty Missions]", basePoints: 60184 },
      { action: "Recruit 1 Orange refugee", basePoints: 40138 },
      { action: "Recruit 1 Purple refugee", basePoints: 10000 },
      { action: "Recruit 1 Blue refugee", basePoints: 1982 },
      { action: "Buy packs containing Diamonds [1 Diamonds]", basePoints: 14 }
    ]
  },
  "day-science": {
    title: "Day 3 points",
    enableBonusInput: true,
    entries: [
      { action: "Use 1-min Research Speedup", basePoints: 30 },
      { action: "Increase Tech Power by 10 Points", basePoints: 1 },
      { action: "Consume 1 Badges", basePoints: 40 },
      { action: "Do 1 orange [Intercity Trades]", basePoints: 75253 },
      { action: "Buy packs containing Diamonds [1 Diamonds]", basePoints: 14 }
    ]
  },
  "day-hero": {
    title: "Day 4 points",
    enableBonusInput: true,
    entries: [
      { action: "Consume 1 Orange Hero Fragments", basePoints: 4977 },
      { action: "Consume 1 Purple hero fragments", basePoints: 1751 },
      { action: "Consume 1 Blue hero fragments", basePoints: 461 },
      { action: "Spend 1 Exclusive Equipment Fragments", basePoints: 4977 },
      { action: "Perform 1 Prime Recruits", basePoints: 461 },
      { action: "Consume 1 Power Cores", basePoints: 401 },
      { action: "Consume 1 Orange Equipment as Promotion material", basePoints: 301106 },
      { action: "Consume 10 Enhancement Alloys", basePoints: 3 },
      { action: "Consume 1 Orange Skill Books", basePoints: 10 },
      { action: "Buy packs containing Diamonds [1 Diamonds]", basePoints: 14 }
    ]
  },
  "type-vehicle": {
    title: "Mod Vehicle Boost",
    disableConversion: true,
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
    disableConversion: true,
    entries: [
      { action: "Increase Structure Power by 10", basePoints: 1 },
      { action: "Use 1-min Construction Speedup", basePoints: 10 }
    ]
  },
  "type-science": {
    title: "Age of Science",
    disableConversion: true,
    entries: [
      { action: "Increase Tech Power by 10", basePoints: 1 },
      { action: "Use 1-min Research Speedup", basePoints: 10 }
    ]
  },
  "type-hero": {
    title: "Hero Initiative",
    disableConversion: true,
    entries: [
      { action: "Perform 1 Prime Recruit", basePoints: 400 },
      { action: "Consume 2,000 Hero EXP", basePoints: 1 }
    ]
  },
  "type-army": {
    title: "Army Expansion",
    disableConversion: true,
    entries: [
      { action: "Train and assemble 1 Lv. 1 Unit", basePoints: 55 }
    ]
  },
  "day-growth": {
    title: "Day 5 points",
    enableBonusInput: true,
    entries: [
      { action: "Use a total of 1 min of Speedups", basePoints: 87 },
      { action: "Increase Structure power by 10 points", basePoints: 2 },
      { action: "Increase Tech Power by 10 points", basePoints: 2 },
      { action: "Complete 1 radar events", basePoints: 10800 },
      { action: "Train and assemble 1 Lv.1 Unit", basePoints: 100 },
      { action: "Train and assemble 1 Lv.2 Unit", basePoints: 152 },
      { action: "Train and assemble 1 Lv.3 Unit", basePoints: 200 },
      { action: "Train and assemble 1 Lv.4 Unit", basePoints: 252 },
      { action: "Train and assemble 1 Lv.5 Unit", basePoints: 304 },
      { action: "Train and assemble 1 Lv.6 Unit", basePoints: 348 },
      { action: "Train and assemble 1 Lv.7 Unit", basePoints: 400 },
      { action: "Train and assemble 1 Lv.8 Unit", basePoints: 457 },
      { action: "Train and assemble 1 Lv.9 Unit", basePoints: 500 },
      { action: "Train and assemble 1 Lv.10 Unit", basePoints: 555 },
      { action: "Buy packs containing Diamonds [1 Diamonds]", basePoints: 30 },
      {
        action: "Promote Units (points = target level points - source level points)",
        basePoints: 0
      }
    ]
  },
  "day-enemy": {
    title: "Day 6 points",
    enableBonusInput: true,
    entries: [
      { action: "Use a total of 1 mins of Speedups", basePoints: 10 },
      { action: "Perform 1 orange [Bounty Missions]", basePoints: 12028 },
      { action: "Do 1 orange [Intercity Trades]", basePoints: 15023 },

      { action: "Defeat 1 Lv.1 Unit", basePoints: 12 },
      { action: "Defeat 1 Lv.2 Unit", basePoints: 18 },
      { action: "Defeat 1 Lv.3 Unit", basePoints: 24 },
      { action: "Defeat 1 Lv.4 Unit", basePoints: 30 },
      { action: "Defeat 1 Lv.5 Unit", basePoints: 36 },
      { action: "Defeat 1 Lv.6 Unit", basePoints: 43 },
      { action: "Defeat 1 Lv.7 Unit", basePoints: 49 },
      { action: "Defeat 1 Lv.8 Unit", basePoints: 55 },
      { action: "Defeat 1 Lv.9 Unit", basePoints: 61 },
      { action: "Defeat 1 Lv.10 Unit", basePoints: 68 },

      { action: "Defeat 1 Lv.1 Unit of the Duel Alliance to Get Extra Points", basePoints: 24 },
      { action: "Defeat 1 Lv.2 Unit of the Duel Alliance to Get Extra Points", basePoints: 36 },
      { action: "Defeat 1 Lv.3 Unit of the Duel Alliance to Get Extra Points", basePoints: 48 },
      { action: "Defeat 1 Lv.4 Unit of the Duel Alliance to Get Extra Points", basePoints: 60 },
      { action: "Defeat 1 Lv.5 Unit of the Duel Alliance to Get Extra Points", basePoints: 72 },
      { action: "Defeat 1 Lv.6 Unit of the Duel Alliance to Get Extra Points", basePoints: 86 },
      { action: "Defeat 1 Lv.7 Unit of the Duel Alliance to Get Extra Points", basePoints: 98 },
      { action: "Defeat 1 Lv.8 Unit of the Duel Alliance to Get Extra Points", basePoints: 110 },
      { action: "Defeat 1 Lv.9 Unit of the Duel Alliance to Get Extra Points", basePoints: 122 },
      { action: "Defeat 1 Lv.10 Unit of the Duel Alliance to Get Extra Points", basePoints: 136 },

      { action: "1 of My Lv.1 Units Killed", basePoints: 6 },
      { action: "1 of My Lv.2 Units Killed", basePoints: 9 },
      { action: "1 of My Lv.3 Units Killed", basePoints: 12 },
      { action: "1 of My Lv.4 Units Killed", basePoints: 15 },
      { action: "1 of My Lv.5 Units Killed", basePoints: 18 },
      { action: "1 of My Lv.6 Units Killed", basePoints: 22 },
      { action: "1 of My Lv.7 Units Killed", basePoints: 25 },
      { action: "1 of My Lv.8 Units Killed", basePoints: 28 },
      { action: "1 of My Lv.9 Units Killed", basePoints: 31 },
      { action: "1 of My Lv.10 Units Killed", basePoints: 34 }
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