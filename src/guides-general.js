import { POINT_EXAMPLES, displayedToBasePoints } from "./points.js"

const withBase = (example) => ({
  ...example,
  base: displayedToBasePoints(example.shown)
})

const HERO_ENTRIES = [
  {
    id: "hero-katrina",
    name: "Katrina",
    tier: "S-Type",
    faction: "Blood Rose",
    image: "https://lastzwiki.com/img-heroe-katrina2.webp",
    role: "Blood Rose / DEF",
    priority: "Critical priority on LastZ.GG.",
    summary: "Source-backed Katrina profile using Last Z Wiki faction/image data and LastZ.GG investment guidance.",
    skillBullets: [
      "LastZ.GG lists Katrina as the best overall hero and the first investment for most players.",
      "Primary effect highlighted by LastZ.GG: DEF boost plus a troop HP passive.",
      "Last Z Wiki beginner guide notes Katrina is obtained free at Stage 14 and is worth investing in for long-term use."
    ],
    related: ["resource-heroes", "type-hero", "day-hero", "enemy-boomer", "day-vehicle", "type-vehicle"]
  },
  {
    id: "hero-sophia",
    name: "Sophia",
    tier: "S-Type",
    faction: "Blood Rose",
    image: "https://lastzwiki.com/img-heroe-sofia2.webp",
    role: "Blood Rose / SUP",
    priority: "Critical priority on LastZ.GG.",
    summary: "Source-backed Sophia profile focused on construction value and early-game progression impact.",
    skillBullets: [
      "LastZ.GG highlights Sophia as non-negotiable for progression because she gives 90 minutes of free construction and a 40% construction speed buff.",
      "Last Z Wiki beginner guide lists her base construction benefit as +90 free build minutes and +33% construction speed.",
      "The same guide lists star progression notes: +15 free minutes at 1 star, +10% construction speed at 2 stars, +60 free minutes at 3 stars, -5% resource cost at 4 stars, and -10% resource cost at 5 stars."
    ]
  },
  {
    id: "hero-laura",
    name: "Laura",
    tier: "S-Type",
    faction: "Wings of Dawn",
    image: "https://lastzwiki.com/img-heroe-laura2.webp",
    role: "Wings of Dawn / ATK",
    priority: "Critical priority on LastZ.GG.",
    summary: "Source-backed Laura profile using Fandom faction data and LastZ.GG radar-event guidance.",
    skillBullets: [
      "Fandom raw category data places Laura under Wings of Dawn.",
      "LastZ.GG calls Laura a core attacker for Wings of Dawn builds.",
      "Primary passive highlighted by LastZ.GG: 20 free radar events per day, plus attack value for Wings-focused progression."
    ],
    related: ["resource-heroes", "type-hero", "day-hero", "resource-radar", "type-vehicle", "day-vehicle"]
  },
  {
    id: "hero-chinatsu",
    name: "Chinatsu",
    tier: "S-Type",
    faction: "Order Guard",
    image: "https://lastzwiki.com/img-heroe-chinatsu2.webp",
    role: "Guard of Order / SUP",
    priority: "High priority on LastZ.GG.",
    summary: "Source-backed Chinatsu profile focused on Alliance Duel optimization.",
    skillBullets: [
      "LastZ.GG lists Chinatsu as a high-priority support hero for Guard of Order.",
      "Key effect called out by LastZ.GG: up to +55% Alliance Duel bonus points when the relevant skill is maxed.",
      "LastZ.GG also notes her passive works from the bench, making her valuable even when not deployed in the march."
    ],
    related: ["resource-heroes", "type-hero", "day-hero", "day-vehicle", "day-shelter", "day-science", "day-enemy", "day-growth"]
  },
  {
    id: "hero-mia",
    name: "Mia",
    tier: "S-Type",
    faction: "Order Guard",
    image: "https://lastzwiki.com/img-heroe-mia2.webp",
    role: "Guard of Order / SUP",
    priority: "High priority on LastZ.GG.",
    summary: "Source-backed Mia profile focused on gathering efficiency and daily farming value.",
    skillBullets: [
      "LastZ.GG identifies Mia as the best gathering hero among the currently exposed basics pages.",
      "Main effects highlighted there: stronger haul size and faster march speed for resource runs.",
      "The site explicitly recommends Mia for daily farm efficiency rather than frontline war value."
    ]
  },
  {
    id: "hero-oliveira",
    name: "Oliveira",
    tier: "S-Type",
    faction: "Blood Rose",
    image: "https://lastzwiki.com/img-heroe-oliveira2.webp",
    priority: "Situational / early-game priority on LastZ.GG.",
    summary: "Source-backed Oliveira profile using Last Z Wiki hero listing and LastZ.GG priority grouping.",
    skillBullets: [
      "Last Z Wiki lists Oliveira under the Rosa faction, which maps to Blood Rose.",
      "LastZ.GG places Oliveira in the situational / early-game group rather than the top-priority hero core.",
      "Accessible source pages did not expose a detailed skill breakdown for Oliveira, so this page uses only the currently visible source-backed role guidance."
    ]
  },
  {
    id: "hero-amelia",
    name: "Amelia",
    tier: "S-Type",
    faction: "Wings of Dawn",
    image: "https://lastzwiki.com/img-heroe-emilia2.webp",
    sourceAlias: "Emilia",
    role: "Wings of Dawn / SUP",
    priority: "High priority on LastZ.GG.",
    summary: "Source-backed Amelia profile using Fandom faction data and the Last Z Wiki Emilia image reference as the closest exposed hero card asset.",
    skillBullets: [
      "Fandom raw category data places Amelia under Wings of Dawn.",
      "LastZ.GG describes Amelia as Sophia's research-speed mirror: 90 free research minutes plus a 40% research speed boost.",
      "LastZ.GG recommends getting Amelia to 3 stars quickly to improve dual-lab efficiency."
    ]
  },
  {
    id: "hero-scarlett",
    name: "Scarlett",
    tier: "S-Type",
    faction: "Wings of Dawn",
    image: "https://lastzwiki.com/img-heroe-scarlett2.webp",
    priority: "Situational / early-game priority on LastZ.GG.",
    summary: "Source-backed Scarlett profile using Last Z Wiki faction placement and LastZ.GG priority grouping.",
    skillBullets: [
      "Last Z Wiki lists Scarlett under Alba, which maps to Wings of Dawn.",
      "LastZ.GG places Scarlett in the situational / early-game bucket rather than the core must-have list.",
      "Accessible source pages did not expose a detailed skill line for Scarlett on the currently available hero pages."
    ]
  },
  {
    id: "hero-evelyn",
    name: "Evelyn",
    tier: "S-Type",
    faction: "Order Guard",
    image: "https://lastzwiki.com/img-heroe-evelyn2.webp",
    priority: "Situational / early-game priority on LastZ.GG.",
    summary: "Source-backed Evelyn profile using Last Z Wiki faction placement and LastZ.GG priority grouping.",
    skillBullets: [
      "Last Z Wiki places Evelyn under Guardian, which maps to Guard of Order / Order Guard.",
      "LastZ.GG groups Evelyn with situational heroes instead of the main upgrade-first list.",
      "No detailed skill breakdown was exposed for Evelyn in the accessible source pages gathered for this build."
    ]
  },
  {
    id: "hero-selena",
    name: "Selena",
    tier: "S-Type",
    faction: "Blood Rose",
    image: "https://lastzwiki.com/img-heroe-selena2.webp",
    priority: "Source-backed faction available; detailed skill notes not exposed on the fetched hero sources.",
    summary: "Source-backed Selena profile using Last Z Wiki faction/image data.",
    skillBullets: [
      "Last Z Wiki lists Selena under Rosa, which maps to Blood Rose.",
      "Accessible source pages did not expose a detailed skill breakdown for Selena.",
      "Use this page as a source-backed faction/image reference until a fuller public skill page is available."
    ]
  },
  {
    id: "hero-vivian",
    name: "Vivian",
    tier: "A-Type",
    faction: "Blood Rose",
    image: "https://lastzwiki.com/img-heroe-vivian2.webp",
    priority: "Situational / early-game priority on LastZ.GG.",
    summary: "Source-backed Vivian profile using Last Z Wiki faction placement and LastZ.GG priority grouping.",
    skillBullets: [
      "Last Z Wiki lists Vivian under Rosa, which maps to Blood Rose.",
      "LastZ.GG groups Vivian under other situational / early-game heroes.",
      "No detailed skill line was exposed for Vivian in the accessible source pages."
    ]
  },
  {
    id: "hero-miranda",
    name: "Miranda",
    tier: "A-Type",
    faction: "Blood Rose",
    image: "https://lastzwiki.com/img-heroe-miranda2.webp",
    priority: "Situational / early-game priority on LastZ.GG.",
    summary: "Source-backed Miranda profile using Last Z Wiki faction placement and LastZ.GG priority grouping.",
    skillBullets: [
      "Last Z Wiki lists Miranda under Rosa, which maps to Blood Rose.",
      "LastZ.GG includes Miranda in the situational / early-game hero group.",
      "Accessible hero pages did not expose a detailed Miranda skill breakdown."
    ]
  },
  {
    id: "hero-fiona",
    name: "Fiona",
    tier: "A-Type",
    faction: "Wings of Dawn",
    image: "https://lastzwiki.com/img-heroe-fiona2.webp",
    priority: "Strong beginner option from Last Z Wiki; situational group on LastZ.GG.",
    summary: "Source-backed Fiona profile using Last Z Wiki beginner guidance and faction placement.",
    skillBullets: [
      "Last Z Wiki lists Fiona under Alba, which maps to Wings of Dawn.",
      "The beginner guide calls Fiona an excellent early-game option for Formation 1 if you recruit her through the Club.",
      "LastZ.GG currently groups Fiona outside the top must-have list, so treat her as a strong progression option but not a universal first-priority hero."
    ]
  },
  {
    id: "hero-elizabeth",
    name: "Elizabeth",
    tier: "A-Type",
    faction: "Order Guard",
    image: "https://lastzwiki.com/img-heroe-elizabeth2.webp",
    priority: "Situational / early-game priority on LastZ.GG.",
    summary: "Source-backed Elizabeth profile using Last Z Wiki faction placement and LastZ.GG grouping.",
    skillBullets: [
      "Last Z Wiki places Elizabeth under Guardian, mapping to Order Guard.",
      "LastZ.GG groups Elizabeth with situational / early-game heroes rather than the core investment list.",
      "No detailed skill breakdown was exposed for Elizabeth in the accessible source set."
    ]
  },
  {
    id: "hero-maria",
    name: "Maria",
    tier: "A-Type",
    faction: "Order Guard",
    image: "https://lastzwiki.com/img-heroe-maria2.webp",
    priority: "Situational / early-game priority on LastZ.GG.",
    summary: "Source-backed Maria profile using Last Z Wiki faction placement and LastZ.GG grouping.",
    skillBullets: [
      "Last Z Wiki places Maria under Guardian, mapping to Order Guard.",
      "LastZ.GG groups Maria under situational / early-game heroes.",
      "No detailed source-exposed skill line was available for Maria in the fetched public pages."
    ]
  },
  {
    id: "hero-isabella",
    name: "Isabella",
    tier: "A-Type",
    faction: "Wings of Dawn",
    image: "https://lastzwiki.com/img-heroe-isabella2.webp",
    priority: "Situational / early-game priority on LastZ.GG.",
    summary: "Source-backed Isabella profile using Last Z Wiki faction placement and LastZ.GG grouping.",
    skillBullets: [
      "Last Z Wiki places Isabella under Alba, mapping to Wings of Dawn.",
      "LastZ.GG includes Isabella in the situational / early-game hero group.",
      "No detailed skill breakdown was surfaced for Isabella from the accessible public hero pages."
    ]
  },
  {
    id: "hero-leah",
    name: "Leah",
    tier: "A-Type",
    faction: "Order Guard",
    image: "https://lastzwiki.com/img-heroe-leah2.webp",
    priority: "Situational / early-game priority on LastZ.GG.",
    summary: "Source-backed Leah profile using Last Z Wiki faction placement and LastZ.GG grouping.",
    skillBullets: [
      "Last Z Wiki places Leah under Guardian, mapping to Order Guard.",
      "LastZ.GG groups Leah outside the must-have list.",
      "Detailed public skill data for Leah was not exposed in the pages fetched for this build."
    ]
  },
  {
    id: "hero-ava",
    name: "Ava",
    tier: "A-Type",
    faction: "Blood Rose",
    image: "https://lastzwiki.com/img-heroe-eva2.webp",
    sourceAlias: "Eva",
    priority: "Situational / early-game priority on LastZ.GG.",
    summary: "Source-backed Ava profile using Fandom faction data and the Last Z Wiki Eva image reference as the closest exposed public hero card asset.",
    skillBullets: [
      "Fandom raw category data places Ava under Blood Rose.",
      "LastZ.GG groups Ava in the situational / early-game hero list.",
      "Accessible hero pages did not expose a detailed skill line for Ava beyond that public grouping."
    ]
  },
  {
    id: "hero-christina",
    name: "Christina",
    tier: "A-Type",
    faction: "Wings of Dawn",
    image: "https://lastzwiki.com/img-heroe-cristina2.webp",
    sourceAlias: "Cristina",
    priority: "Situational / early-game priority on LastZ.GG.",
    summary: "Source-backed Christina profile using Last Z Wiki faction placement and the Cristina image reference.",
    skillBullets: [
      "Last Z Wiki places Cristina under Alba, mapping Christina to Wings of Dawn.",
      "LastZ.GG includes Christina in the situational / early-game hero pool.",
      "No detailed skill breakdown for Christina was exposed in the accessible source pages."
    ]
  },
  {
    id: "hero-athena",
    name: "Athena",
    tier: "B-Type",
    faction: "Order Guard",
    image: "https://lastzwiki.com/img-heroe-atenea2.webp",
    sourceAlias: "Atenea",
    priority: "Situational / early-game priority on LastZ.GG.",
    summary: "Source-backed Athena profile using Last Z Wiki faction placement and the Atenea image reference.",
    skillBullets: [
      "Last Z Wiki places Atenea under Guardian, mapping Athena to Order Guard.",
      "LastZ.GG groups Athena in the situational / early-game group.",
      "Accessible source pages did not expose a detailed Athena skill breakdown."
    ]
  },
  {
    id: "hero-audrey",
    name: "Audrey",
    tier: "B-Type",
    faction: "Blood Rose",
    image: "https://lastzwiki.com/img-heroe-audrey2.webp",
    priority: "Situational / early-game priority on LastZ.GG.",
    summary: "Source-backed Audrey profile using Last Z Wiki faction placement and LastZ.GG grouping.",
    skillBullets: [
      "Last Z Wiki places Audrey under Rosa, mapping to Blood Rose.",
      "LastZ.GG groups Audrey with situational / early-game heroes.",
      "Detailed skill data for Audrey was not exposed in the accessible public pages fetched here."
    ]
  },
  {
    id: "hero-william",
    name: "William",
    tier: "B-Type",
    faction: "Order Guard",
    image: "https://lastzwiki.com/img-heroe-william2.webp",
    priority: "Starter hero in Last Z Wiki beginner guide.",
    summary: "Source-backed William profile using beginner-guide advice and Last Z Wiki faction placement.",
    skillBullets: [
      "Last Z Wiki lists William under Guardian, mapping to Order Guard.",
      "The beginner guide describes William as a basic starter hero useful only in the early game.",
      "That same guide recommends not investing valuable long-term resources into William compared with better A- and S-rank heroes."
    ]
  },
  {
    id: "hero-angelina",
    name: "Angelina",
    tier: "B-Type",
    faction: "Wings of Dawn",
    image: "https://lastzwiki.com/img-heroe-angelina2.webp",
    priority: "Starter hero in Last Z Wiki beginner guide.",
    summary: "Source-backed Angelina profile using beginner-guide advice and Last Z Wiki faction placement.",
    skillBullets: [
      "Last Z Wiki places Angelina under Alba, mapping to Wings of Dawn.",
      "The beginner guide describes Angelina as a basic starter hero used to clear early zombie and tutorial stages.",
      "The same guide explicitly recommends avoiding heavy long-term investment in Angelina once stronger heroes are available."
    ]
  },
  {
    id: "hero-natalie",
    name: "Natalie",
    tier: "B-Type",
    faction: "Wings of Dawn",
    image: "https://lastzwiki.com/img-heroe-natalia2%20(1).webp",
    sourceAlias: "Natalia / Nathalie",
    priority: "Situational / early-game priority on LastZ.GG.",
    summary: "Source-backed Natalie profile using Last Z Wiki faction placement and LastZ.GG grouping.",
    skillBullets: [
      "Last Z Wiki lists Natalia under Alba, mapping Natalie to Wings of Dawn.",
      "LastZ.GG lists Nathalie in the situational / early-game hero group.",
      "No detailed skill breakdown was exposed for Natalie/Nathalie in the currently accessible source pages."
    ]
  },
  {
    id: "hero-giselle",
    name: "Giselle",
    tier: "B-Type",
    faction: "Blood Rose",
    image: "https://lastzwiki.com/img-heroe-giselle2.webp",
    priority: "Situational / early-game priority on LastZ.GG.",
    summary: "Source-backed Giselle profile using Last Z Wiki faction placement and LastZ.GG grouping.",
    skillBullets: [
      "Last Z Wiki places Giselle under Rosa, mapping to Blood Rose.",
      "LastZ.GG groups Giselle with situational / early-game heroes.",
      "Accessible public pages did not expose a detailed skill breakdown for Giselle."
    ]
  }
]

function buildHeroSections(hero){
  const aliasNote = hero.sourceAlias
    ? `Naming note: this hero can also appear as ${hero.sourceAlias} in some community pages.`
    : null

  const roleHint = hero.role
    ? hero.role.split("/")[1]?.trim()?.toLowerCase() || "combat"
    : "combat"

  const skillBreakdown = [
    `Skill 1 (Active): main ${roleHint} cast used at the start of fights or key combat turns.`,
    "Skill 2 (Passive): core stat boost that improves this hero's baseline march performance.",
    "Skill 3 (Passive): secondary passive focused on lineup efficiency such as damage, toughness or utility.",
    "Skill 4 (Advanced): late skill layer that amplifies the hero identity and is best upgraded after core breakpoints.",
    "For exact skill names, scaling and unlock details, validate on Fandom Heroes pages: https://lastzshooterrun.fandom.com/wiki/Heroes"
  ]

  return [
    {
      title: "Profile snapshot",
      items: [
        `Type in current guide set: ${hero.tier}.`,
        `Faction: ${hero.faction}.`,
        hero.role ? `Role: ${hero.role}.` : "Role: review in-game role details before spending skill books.",
        "Priority: invest first in heroes from your main march and event objective.",
        aliasNote
      ].filter(Boolean)
    },
    {
      title: "Skill notes",
      items: (hero.skillBullets || []).map((item) => String(item)
        .replace(/LastZ\.GG/gi, "community references")
        .replace(/profile\.gg/gi, "community references")
      )
    },
    {
      title: "Skill breakdown (slot by slot)",
      items: skillBreakdown
    },
    {
      title: "Upgrade checklist",
      items: [
        "Use this page to keep one main formation priority, then expand side formations after core breakpoints.",
        "When detailed skill values are unclear, validate in-game before expensive fragment or book decisions.",
        "Recheck the live hero screen in-game before making expensive fragment or book decisions."
      ]
    }
  ]
}

const HERO_GUIDES = HERO_ENTRIES.map((hero, index) => ({
  id: hero.id,
  group: "resources",
  badge: "Hero",
  title: hero.name,
  tier: hero.tier,
  faction: hero.faction,
  image: hero.image,
  heroOrder: index,
  useGuideSections: true,
  summary: hero.summary,
  sections: buildHeroSections(hero),
  related: hero.related || ["resource-heroes", "type-hero", "day-hero"],
  sources: [
    "Last Z Wiki: heroes.html",
    "Fandom: Category:Heroes and hero raw category pages"
  ]
}))

const ENEMY_GUIDES = [
  {
    id: "enemy-boomer",
    group: "resources",
    badge: "Enemy",
    title: "Boomer",
    image: "enemies/boomer.png",
    summary: "Generic world enemy in the Lv.1-10 range, with high scoring value in Mod Vehicle Boost.",
    sections: [
      {
        title: "Classification and level scope",
        items: [
          "Boomer is treated here as a generic enemy category used for routine event scoring.",
          "Reconciled level scope: Boomer Lv.1 to Lv.10.",
          "Mod Vehicle Boost rewards are mapped by level bands and expanded in the table below by individual level."
        ]
      },
      {
        title: "Practical use in Day 1",
        items: [
          "Fuel should be focused on Boomer routes you can clear with confidence.",
          "Use alliance rally coordination to reduce failed attempts and fuel waste.",
          "When available, align kills with 08:00 and 20:00 Full Preparedness windows for dual progress."
        ]
      }
    ],
    related: ["day-vehicle", "type-vehicle", "enemy-units", "hero-katrina", "hero-chinatsu"],
    sources: ["Fandom: Full Preparedness", "Sardinha Day 1", "LastZ.GG: Alliance Duel guide"]
  },
  {
    id: "enemy-zombie",
    group: "resources",
    badge: "Enemy",
    title: "Zombie",
    image: "enemies/zombie.png",
    summary: "Generic world enemy in the Lv.1-30 range with reconciled reward values by level.",
    sections: [
      {
        title: "Classification and level scope",
        items: [
          "Zombie is treated here as the generic world baseline enemy.",
          "Reconciled level scope: Zombie Lv.1 to Lv.30.",
          "Reward values come from Fandom level ranges and are expanded to each level in the table below."
        ]
      },
      {
        title: "Efficiency notes",
        items: [
          "Good for routine progression and steady farming routines.",
          "In Mod Vehicle Boost, compare points-per-fuel against Boomer before spending heavily.",
          "Public sources do not provide a stable per-level power table; in-game power can vary by season/server modifiers."
        ]
      }
    ],
    related: ["enemy-units", "day-vehicle"],
    sources: ["Fandom: Full Preparedness", "LastZ.Wiki: Temporada 3", "LastZ.GG: Alliance Duel guide"]
  },
  {
    id: "enemy-berserk-zombie",
    group: "resources",
    badge: "Enemy",
    title: "Berserk Zombie",
    image: "enemies/berserk-zombie.png",
    summary: "Special mission enemy, not part of the generic Zombie/Boomer farm loop.",
    sections: [
      {
        title: "Classification",
        items: [
          "Berserk is treated as a mission-specific special enemy.",
          "Do not mix Berserk planning with generic Zombie/Boomer route planning.",
          "Use dedicated mission timing and recovery planning when Berserk appears."
        ]
      },
      {
        title: "Risk control",
        items: [
          "Check hospital room and healing speedups before chaining fights.",
          "Avoid engaging during exposed city windows when you cannot support losses.",
          "Use alliance cover if your march power is near the threshold."
        ]
      }
    ],
    related: ["enemy-units", "day-enemy"],
    sources: ["User screenshots", "Community play patterns", "LastZ.GG: Season 2 notes"]
  },
  {
    id: "enemy-bloods-goons",
    group: "resources",
    badge: "Enemy",
    title: "Bloods' Goons",
    image: "enemies/bloods-goons.png",
    summary: "Generic enemy target category prioritized by route safety and reward quality.",
    sections: [
      {
        title: "Classification",
        items: [
          "Blood Goon is treated as a generic enemy category in this guide set.",
          "Priority should be based on real route safety and reward checks, not assumed rarity.",
          "Keep logs of attempts and losses to decide if this target outperforms your standard farm cycle."
        ]
      },
      {
        title: "Route planning",
        items: [
          "Engage when reward value and risk profile beat your normal target cycle.",
          "Keep return timings aligned with alliance protection windows.",
          "Log your outcomes so target priority can be tuned weekly."
        ]
      }
    ],
    related: ["enemy-units", "day-enemy"],
    sources: ["User screenshots", "Community play patterns", "LastZ.GG: event and combat guides"]
  },
  {
    id: "enemy-fury-lord",
    group: "resources",
    badge: "Enemy",
    title: "Fury Lord",
    image: "enemies/furylord.png",
    summary: "Special event boss with damage-based contribution and server-wide impact.",
    sections: [
      {
        title: "Classification",
        items: [
          "Fury Lord is treated as a special event boss, not a generic map target.",
          "Damage contribution quality matters more than random participation volume.",
          "LastZ.GG highlights SVS relevance through top damage contribution."
        ]
      },
      {
        title: "Event execution",
        items: [
          "Use your strongest combat formation; avoid gathering-oriented lineups.",
          "Coordinate concentrated hits on the same target to maximize effective damage.",
          "Synchronize attempts with alliance command and return-time safety."
        ]
      }
    ],
    related: ["enemy-units", "day-enemy"],
    sources: ["LastZ.GG: Tyrant & Furylord guide", "LastZ.Wiki: Eventos", "LastZ.Wiki: Temporada 3"]
  }
]

export const GUIDE_SETS = {
  eventTypes: [
    {
      id: "type-vehicle",
      group: "eventTypes",
      badge: "Event Type",
      title: "Mod Vehicle Boost",
      summary: "Best scoring window for vehicle materials, Boomer fuel and saved radar claims that feed vehicle progress.",
      sections: [
        {
          title: "What scores",
          items: [
            "Fandom lists Modification Blueprints at +4 base points each and Golden Wrenches at +600 base points each.",
            "Boomer rallies are a better fuel-to-points play than ordinary creeps in the community day guide.",
            "Community tips also recommend saving Laura-generated radar tasks for this day when possible."
          ]
        },
        {
          title: "Preparation",
          items: [
            "Bank blueprints, wrenches and fuel through the week instead of dripping them out early.",
            "Track Boomer levels you can clear reliably so fuel is not wasted on failed hits.",
            "Keep a shortlist of fast claims and upgrades for the two high-yield windows mentioned in the community guide."
          ]
        },
        {
          title: "Source notes",
          items: [
            "Workshop Golden Keys (Golden Wrenches) score +600 base points each on Day 1 — one of the highest per-item scores available.",
            "Key armament unlocks listed by Last Z Wiki are Cheetah at level 20, Hercules at 70, Double Cannons at 105, Snowplow at 130 and Destroyer at 145."
          ]
        }
      ],
      related: ["resource-wrenches", "resource-blueprints", "resource-radar"],
      sources: ["Fandom: Full Preparedness", "Last Z Wiki: Armament Workshop", "Sardinha guide: Day 1"]
    },
    {
      id: "type-shelter",
      group: "eventTypes",
      badge: "Event Type",
      title: "Shelter Upgrade",
      summary: "Construction day rewards finished building power and construction speedups, so queue discipline matters more than raw spending.",
      sections: [
        {
          title: "What scores",
          items: [
            "Fandom summarizes the day around structure power gains, construction completions and construction speedups.",
            "Building finishes are more valuable when they convert a long queue into immediate power right after reset.",
            "Diamond packs count too, but the efficient route is usually finishing prebuilt timers."
          ]
        },
        {
          title: "Preparation",
          items: [
            "Pre-stage long upgrades so the last chunk can be finished on Shelter day.",
            "Keep builder slots synchronized with alliance help and any server construction buffs.",
            "Do not burn short speedups on low-value buildings when a high-power headquarters chain is about to unlock."
          ]
        },
        {
          title: "Execution",
          items: [
            "Claim alliance help first, then use speedups only on the remaining critical path.",
            "Open resource boxes late if your HQ level is still climbing and box value can improve.",
            "If Sophia or a second builder is part of your account plan, use them to compress this day further."
          ]
        }
      ],
      related: ["day-shelter", "type-army"],
      sources: ["Fandom: Full Preparedness", "Last Z Wiki: Beginner tips"]
    },
    {
      id: "type-science",
      group: "eventTypes",
      badge: "Event Type",
      title: "Age of Science",
      summary: "Research day is about converting badges and speedups into clean tech power spikes without wasting premium research windows.",
      sections: [
        {
          title: "What scores",
          items: [
            "Fandom lists tech power gains and research speedups as the core scoring levers.",
            "Last Z Wiki documents 9 laboratory categories and more than 160 researches, so planning a chain matters more than one isolated upgrade.",
            "The weekly rose shown on Last Z Wiki can add temporary research improvement, so line up heavy pushes with that buff when available."
          ]
        },
        {
          title: "Preparation",
          items: [
            "Stack badges, alliance helps and speedups before reset instead of starting long research early.",
            "Prioritize research that unlocks the next bottleneck instead of marginal side stats.",
            "Keep one short research ready to finish immediately for fast first chest progress."
          ]
        },
        {
          title: "Useful references",
          items: [
            "Last Z Wiki lists late-game badge sinks like Recharge Shield at 219,000 total badges for 20 levels in the T10 section.",
            "Research categories include peace shield, alliance, combat, field, heroes and army, so day value depends on your current account stage."
          ]
        }
      ],
      related: ["day-science", "resource-shield"],
      sources: ["Fandom: Full Preparedness", "Last Z Wiki: Laboratory"]
    },
    {
      id: "type-hero",
      group: "eventTypes",
      badge: "Event Type",
      title: "Hero Initiative",
      summary: "Hero day rewards recruitment, experience and fragments, so it is the cleanest place to convert saved tickets into formation power.",
      sections: [
        {
          title: "What scores",
          items: [
            "Fandom lists Prime Recruitment, hero EXP consumption and diamond packs as the base scoring hooks.",
            "Hero power comes from level, stars, skills, equipment, modified vehicle bonuses, structures and technologies.",
            "Last Z Wiki also recommends faction alignment, noting that five heroes from the same faction can push troop attack much higher."
          ]
        },
        {
          title: "Preparation",
          items: [
            "Hold prime recruit tickets, orange fragments and skill books for this day unless an urgent formation break point is needed.",
            "Pre-sort your target formation so tickets are spent toward one real troop upgrade, not random collection progress.",
            "Move best equipment into the formation that gets used most, then rotate pieces later if caravan or secondary troops need them."
          ]
        },
        {
          title: "Roster context",
          items: [
            "Fandom groups heroes into S, A and B types, with S-type carrying the strongest long-term returns.",
            "Community examples from Last Z Wiki highlight Blood Rose, Wings of Dawn and Order Guard formations as common structure anchors."
          ]
        }
      ],
      related: ["day-hero", "resource-heroes"],
      sources: ["Fandom: Full Preparedness", "Fandom: Heroes", "Last Z Wiki: Heroes"]
    },
    {
      id: "type-army",
      group: "eventTypes",
      badge: "Event Type",
      title: "Army Expansion",
      summary: "Training day is won by batching troop upgrades, promotion chains and hospital-safe tempo instead of constant trickle training.",
      sections: [
        {
          title: "What scores",
          items: [
            "Fandom describes the day around troop training, troop promotion and training speedups.",
            "Point value scales by troop level, so higher-tier batches should be protected for the correct window.",
            "Large queues are easier to finish efficiently when alliance help and barracks timing are synchronized."
          ]
        },
        {
          title: "Preparation",
          items: [
            "Pretrain lower-value units only if they are feeders for a larger promotion burst later.",
            "Leave enough healing and hospital room so PvP spillover does not force bad decisions during your training push.",
            "Short speedups are ideal for chest breakpoints; long speedups are better for one or two major queue finishes."
          ]
        },
        {
          title: "Risk control",
          items: [
            "Do not expose fresh training stock during hostile periods if Enemy Buster or cross-state pressure is near.",
            "Set auto return before offensive marches so your city is not empty when you need to manage queues."
          ]
        }
      ],
      related: ["day-enemy", "resource-shield"],
      sources: ["Fandom: Full Preparedness", "Last Z Wiki: combat tips"]
    }
  ],
  days: [
    {
      id: "day-peace",
      group: "days",
      badge: "Day Guide",
      title: "Sunday: Peace Time",
      summary: "Use the calm day only for setup: bank radar, stage queues and lock your week before scoring starts.",
      sections: [
        {
          title: "Best use of the day",
          items: [
            "Cap radar stacks without claiming low-value tasks too early.",
            "Queue research, buildings and troop prep so each one finishes on its matching day.",
            "Audit shield timers and relocation plans before kill-focused days start."
          ]
        },
        {
          title: "Recommended setup",
          items: [
            "Record which materials belong to vehicle, science, hero and army days.",
            "Keep fuel, speedups and recruit tickets separated by purpose instead of spending opportunistically.",
            "Use shared alliance notes for Boomer targets, truck routes and bounty timing."
          ]
        },
        {
          title: "Radar claim alert windows",
          items: [
            "Do not collect stacked Radar rewards from 00:00-07:59 and 12:00-19:59 Apocalypse Time.",
            "Prefer collecting Radar rewards during 08:00-11:59 and 20:00-23:59 Apocalypse Time when your plan needs score conversion windows."
          ]
        }
      ],
      related: ["resource-radar", "resource-shield"],
      sources: ["Calendar structure from current ZCalendar week", "Fandom: Full Preparedness"]
    },
    {
      id: "day-vehicle",
      group: "days",
      badge: "Day Guide",
      title: "Monday: Day 1 - Mod Vehicle Boost",
      summary: "Spend saved vehicle resources only on Day 1 and convert fuel into consistent Boomer points.",
      sections: [
        {
          title: "Priority actions",
          items: [
            "Spend saved Modification Blueprints and Golden Wrenches first because they are deterministic points.",
            "Use Laura-related radar missions and stored radar claims only after Day 1 turns live.",
            "Use Mia gathering cycles before reset to sustain your blueprint stock for Day 1.",
            "Favor Boomer rallies you can clear consistently over low-return creep farming."
          ]
        },
        {
          title: "Tips",
          items: [
            "Collect Modification Blueprints, Golden Wrenches and Fuel during the week and spend on Day 1.",
            "Prioritize the windows 08:00-11:59 and 20:00-23:59 Apocalypse Time for concentrated scoring.",
            "Stack Radar Events for up to 32h before 00:00 Apocalypse Time, then complete without immediate claim until scoring windows.",
            "At Radar Intensity 7+, refresh is 8 events every 8h, so stacking before reset is a major advantage.",
            "Laura can generate extra Radar Events; save those claims for Day 1.",
            "Use fuel mainly on Boomers you can defeat reliably; creep points per fuel are usually weaker than Boomer routes."
          ]
        },
        {
          title: "Radar claim alert windows",
          items: [
            "Do not collect stacked Radar rewards from 00:00-07:59 and 12:00-19:59 Apocalypse Time.",
            "Prefer collecting Radar rewards during 08:00-11:59 and 20:00-23:59 Apocalypse Time for Day 1 scoring bursts."
          ]
        },
        {
          title: "Radar mission handling",
          items: [
            "Before reset, complete radar tasks but leave them unclaimed so they can be released on Day 1 windows.",
            "Only claim stacked radar missions when the scoring window is active to avoid leaking points."
          ]
        }
      ],
      related: ["type-vehicle", "resource-wrenches", "resource-blueprints", "hero-laura", "hero-mia", "enemy-boomer"],
      sources: ["Sardinha guide: Day 1", "Fandom: Full Preparedness", "Fandom: Radar"]
    },
    {
      id: "day-shelter",
      group: "days",
      badge: "Day Guide",
      title: "Tuesday: Day 2 - Shelter Upgrade",
      summary: "Construction day: finish staged timers, push core buildings and spend speedups only on high-return upgrades.",
      sections: [
        {
          title: "Priority actions",
          items: [
            "Finish long timers that were intentionally parked near completion.",
            "Use alliance help before spending speedups.",
            "Push buildings that unlock the next research, troop or economic bottleneck."
          ]
        },
        {
          title: "Do not forget",
          items: [
            "Resource boxes become more valuable as HQ climbs, so only open what the push really needs.",
            "Builder efficiency matters more than vanity upgrades on this day."
          ]
        }
      ],
      related: ["type-shelter", "resource-buildings"],
      sources: ["Sardinha index: Day 2", "Fandom: Full Preparedness"]
    },
    {
      id: "day-science",
      group: "days",
      badge: "Day Guide",
      title: "Wednesday: Day 3 - Age of Science",
      summary: "Research day should be pre-planned: badges, helps and speedups must already be queued before reset.",
      sections: [
        {
          title: "Priority actions",
          items: [
            "Close one short research immediately for early chest momentum.",
            "Spend larger badge chunks only on tech lines that unlock a real next step.",
            "Take advantage of research buffs such as weekly rose or government roles whenever they line up."
          ]
        },
        {
          title: "Reference areas",
          items: [
            "Laboratory categories on Last Z Wiki cover alliance, heroes, army, field, combat and peace shield among others.",
            "Late-game badge drains are large enough that saving for the correct day is usually worth more than daily trickle upgrades."
          ]
        }
      ],
      related: ["type-science", "resource-shield"],
      sources: ["Sardinha index: Day 3", "Last Z Wiki: Laboratory"]
    },
    {
      id: "day-hero",
      group: "days",
      badge: "Day Guide",
      title: "Thursday: Day 4 - Hero Initiative",
      summary: "Convert saved tickets, EXP and fragments into one focused combat spike instead of spreading upgrades.",
      sections: [
        {
          title: "Priority actions",
          items: [
            "Spend prime tickets, hero EXP and fragment upgrades on the formation you actually field.",
            "Level skills and attach your best equipment after the recruit burst so the gains stack cleanly.",
            "Use same-faction alignment when possible to keep formation bonuses efficient."
          ]
        },
        {
          title: "Common mistake",
          items: [
            "Sprinkling EXP across many heroes gives weaker event value than finishing one meaningful breakpoint.",
            "Do not forget that vehicle modification, structures and technologies also raise hero power globally."
          ]
        }
      ],
      related: ["type-hero", "resource-heroes"],
      sources: ["Sardinha index: Day 4", "Fandom: Heroes"]
    },
    {
      id: "day-growth",
      group: "days",
      badge: "Day Guide",
      title: "Friday: Day 5 - Holistic Growth",
      summary: "Use Day 5 as a controlled maintenance window: economy, boxes, buffs and setup for Day 6 safety.",
      sections: [
        {
          title: "Priority actions",
          items: [
            "Use server buffs, alliance help and stored boxes to smooth progression gaps.",
            "Review armor rotation, farm account logistics and alliance technology donation habits.",
            "Catch up on infrastructure that improves the next two event days instead of chasing isolated power."
          ]
        },
        {
          title: "Useful community tips",
          items: [
            "Last Z Wiki recommends saving golden resource boxes until higher HQ levels for better value.",
            "Holding the alliance donation button is faster and earns points more efficiently than tapping repeatedly.",
            "Radar stacking can be prepared here so claims are released on the exact event windows where they score better.",
            "Refresh and verify Peace Shield timers on Day 5 so you enter Day 6 with safe coverage."
          ]
        },
        {
          title: "Radar claim alert windows",
          items: [
            "Do not collect stacked Radar rewards from 00:00-07:59 and 12:00-19:59 Apocalypse Time.",
            "Prefer collecting Radar rewards during 08:00-11:59 and 20:00-23:59 Apocalypse Time when preparing Day 6 transitions."
          ]
        }
      ],
      related: ["resource-radar", "resource-bounty", "resource-intercity-trades"],
      sources: ["Sardinha index: Day 5", "Last Z Wiki: tips page"]
    },
    {
      id: "day-enemy",
      group: "days",
      badge: "Day Guide",
      title: "Saturday: Day 6 - Enemy Buster",
      summary: "Final day is controlled aggression: offense timing, shield discipline and alliance-coordinated rallies.",
      sections: [
        {
          title: "Priority actions",
          items: [
            "Fight only when your hospital, march times and alliance response are under control.",
            "Enable auto return before attacks so troops are not stranded after combat.",
            "Batch healing with alliance help instead of dumping the whole hospital at once."
          ]
        },
        {
          title: "Event-grade coordination",
          items: [
            "For special bosses, join existing rallies first to reduce march dead time and increase total participation.",
            "Use Engage Offline when available to keep rally participation active during absences.",
            "For Fury Lord-style events, prioritize high-damage formations and coordinated focus fire."
          ]
        },
        {
          title: "Defense rules",
          items: [
            "Carry over the Day 5 shield check: do not start Day 6 with uncertain Peace Shield coverage.",
            "Refresh shield coverage before going offline or before cross-state windows intensify.",
            "Track attacker coordinates from alliance intelligence and shared recon reports."
          ]
        }
      ],
      related: ["resource-shield", "type-army"],
      sources: ["Sardinha index: Day 6", "LastZ.GG: Tyrant & Furylord guide", "LastZ.Wiki: Eventos"]
    }
  ],
  resources: [
    {
      id: "resource-general-tips",
      group: "resources",
      badge: "Reference",
      title: "General Tips",
      summary: "High-impact practical tips reconciled from Last Z Wiki pages for weekly planning, spending discipline and risk control.",
      sections: [
        {
          title: "Daily and weekly discipline",
          items: [
            "Use event-day specialization: spend each resource on its strongest scoring day instead of daily trickle spending.",
            "Save high-value boxes and premium materials for planned pushes where they unlock real progression.",
            "Keep a fixed reset routine: radar stack check, queue check, shield check and alliance coordination."
          ]
        },
        {
          title: "Combat and safety habits",
          items: [
            "Never launch risky fights without checking hospital space, march return and nearby alliance support.",
            "Treat Peace Shield as scheduled risk control, not emergency panic usage.",
            "Track your server-specific event behavior and update your own playbook each week."
          ]
        }
      ],
      related: ["day-peace", "day-growth", "resource-shield"],
      sources: ["Last Z Wiki: Useful tips", "Last Z Wiki: Beginner tips", "Community practice notes"]
    },
    {
      id: "resource-sources",
      group: "resources",
      badge: "Reference",
      title: "All Sources",
      summary: "Central list of references used in this project.",
      sections: [
        {
          title: "Main websites",
          items: [
            "Last Z Wiki: https://lastzwiki.com",
            "Last Z Wiki Buildings: https://lastzwiki.com/en/buildings.html",
            "Last Z Fandom: https://last-z-survival.fandom.com",
            "LastZ.GG: https://lastz.gg",
            "LastZData: https://lastzdata.com",
            "Sardinha Last Z: https://sites.google.com/view/sardinhalastz"
          ]
        },
        {
          title: "Community references mentioned in guides",
          items: [
            "Sardinha Day guides (Day 1 to Day 6): https://sites.google.com/view/sardinhalastz",
            "Community play patterns and user screenshots: internal community references without a public URL in this repository."
          ]
        }
      ],
      related: ["resource-general-tips", "resource-buildings", "resource-heroes"],
      sources: ["Consolidated from guide references"]
    },
    {
      id: "resource-buildings",
      group: "resources",
      badge: "System",
      title: "Buildings Overview",
      summary: "Practical building priorities adapted from Last Z Wiki building references, focused on progression bottlenecks.",
      sections: [
        {
          title: "Core upgrade priorities",
          items: [
            "Headquarters path comes first because it gates most systems, research and higher-tier training options.",
            "Keep builder usage tight: prioritize buildings that unlock the next meaningful upgrade chain.",
            "Avoid spending speedups on low-impact side upgrades during core progression windows."
          ]
        },
        {
          title: "Synergy with event days",
          items: [
            "Pre-stage long construction timers so final completions land on Shelter Upgrade day.",
            "Align building goals with lab and troop bottlenecks to avoid idle days between event types.",
            "Review resource and prerequisite costs before reset so construction decisions are fast and deliberate."
          ]
        }
      ],
      related: ["type-shelter", "day-shelter", "type-science"],
      sources: ["Last Z Wiki: Buildings", "Last Z Wiki: Beginner tips"]
    },
    {
      id: "resource-radar",
      group: "resources",
      badge: "System",
      title: "Radar",
      summary: "Radar is both a scouting building and a mission bank, so its upgrade path matters for information quality and for event timing.",
      sections: [
        {
          title: "Verified facts",
          items: [
            "Fandom lists Radar unlock at Headquarters level 3 and associates Laura with the system.",
            "Higher Radar levels increase scouting speed and gradually reveal more report detail, including lootable resources, defending hero data and reinforcement details.",
            "Radar Intensity is separate from building level and controls how many missions refresh every 8 hours and how many can stack."
          ]
        },
        {
          title: "Important thresholds",
          items: [
            "At Intensity 7, the table shows 8 events refreshed every 8 hours with a max stack of 14.",
            "At Intensity 16, the stack reaches 32 while refresh remains 8 every 8 hours.",
            "Community guidance recommends filling stacks before event days and claiming only when the correct scoring window opens."
          ]
        }
      ],
      related: ["day-peace", "day-vehicle", "hero-laura"],
      sources: ["Fandom: Radar", "Sardinha guide: Day 1"]
    },
    {
      id: "resource-shield",
      group: "resources",
      badge: "Item",
      title: "Shield / Peace Shield",
      summary: "Shield discipline is part research, part timing and part alliance awareness. Treat it as risk management, not as an afterthought.",
      sections: [
        {
          title: "What the sources confirm",
          items: [
            "Last Z Wiki lists Peace Shield as one of the laboratory categories and also shows Recharge Shield inside the T10 section.",
            "Recharge Shield is shown at 20 levels and 219,000 total badges in the laboratory table.",
            "Enemy-focused days are when shield mistakes cost the most, especially if your queues and resources are exposed."
          ]
        },
        {
          title: "Practical checklist",
          items: [
            "Refresh shields before sleep, work hours or any long period away from the game.",
            "Do not let red alert periods tempt you into claiming radar or exposing stored resources casually.",
            "Coordinate with alliance intelligence so shield drops happen only when support is ready."
          ]
        }
      ],
      related: ["day-enemy", "type-science"],
      sources: ["Last Z Wiki: Laboratory", "Current calendar alert behavior"]
    },
    {
      id: "resource-heroes",
      group: "resources",
      badge: "System",
      title: "Heroes",
      summary: "Hero growth is not only about pulls. The biggest gains come from stacking the full power model around your main formation.",
      sections: [
        {
          title: "Verified facts",
          items: [
            "Fandom describes three hero types: S, A and B.",
            "Hero power combines level, stars, skills, equipment, vehicle bonuses, structures and technologies.",
            "Last Z Wiki groups endgame rosters around Blood Rose, Wings of Dawn and Order Guard examples."
          ]
        },
        {
          title: "Community tips worth keeping",
          items: [
            "A full same-faction troop can push attack much higher according to the Last Z Wiki tips page.",
            "Rotate top armor into the troop you are actively using instead of leaving premium pieces idle.",
            "Prioritize upgrades by real march usage to avoid spreading resources across low-value heroes."
          ]
        }
      ],
      related: [
        "type-hero",
        "day-hero",
        "hero-katrina",
        "hero-sophia",
        "hero-laura",
        "hero-vivian",
        "hero-athena"
      ],
      sources: ["Fandom: Heroes", "Last Z Wiki: Heroes", "Last Z Wiki: tips page"]
    },
    {
      id: "resource-wrenches",
      group: "resources",
      badge: "Item",
      title: "Workshop Golden Keys",
      summary: "Workshop Golden Keys (also called Golden Wrenches) are premium Mod Vehicle Boost spend and should be hoarded for the correct scoring window.",
      sections: [
        {
          title: "Why they matter",
          items: [
            "Fandom lists each Workshop Golden Key at +600 base points during Mod Vehicle Boost.",
            "That makes them one of the cleanest ways to secure chest progress when you do not want RNG from combat targets.",
            "The item appears as \"Golden Wrenches\" in some community sources and \"Workshop Golden Keys\" in others — both names refer to the same item."
          ]
        },
        {
          title: "How to manage them",
          items: [
            "Track your stock separately from Modification Blueprints.",
            "Spend only when Day 1 (Mod Vehicle Boost) is live unless a server-specific emergency requires otherwise.",
            "Plan consumption around armament upgrade milestones in the workshop."
          ]
        }
      ],
      related: ["type-vehicle", "resource-blueprints"],
      sources: ["Fandom: Full Preparedness", "Last Z Wiki: Workshop"]
    },
    {
      id: "resource-blueprints",
      group: "resources",
      badge: "Item",
      title: "Modification Blueprints",
      summary: "Blueprints are the steady vehicle material. They score lightly per unit, but they are reliable and easy to sequence with bigger vehicle pushes.",
      sections: [
        {
          title: "Verified facts",
          items: [
            "Fandom lists each consumed Modification Blueprint at +4 base points during Mod Vehicle Boost.",
            "Event ranking rewards on Fandom also include additional Modification Blueprints for top placements.",
            "Community advice is to collect through the week and unload them on the correct vehicle day."
          ]
        },
        {
          title: "Practical use",
          items: [
            "Use blueprints to smooth chest breakpoints when you do not want to overspend wrenches.",
            "Mia is one of the best gathering heroes to sustain blueprint farming before Day 1 spend windows.",
            "Bundle blueprint spending with Boomer pushes and saved radar claims to keep the whole day coherent.",
            "Keep a small reserve if your account still unlocks regular vehicle breakpoints outside event days."
          ]
        }
      ],
      related: ["type-vehicle", "day-vehicle", "hero-mia"],
      sources: ["Fandom: Full Preparedness", "Sardinha guide: Day 1"]
    },
    {
      id: "resource-skill-books",
      group: "resources",
      badge: "Item",
      title: "Skill Books",
      summary: "Skill Books are best saved for Hero Initiative bursts where one focused upgrade path gives better score efficiency.",
      sections: [
        {
          title: "Why they matter",
          items: [
            "Skill Books directly convert into hero progression during Hero Initiative.",
            "Focused upgrades on your main lineup usually outperform spreading books across many side heroes."
          ]
        },
        {
          title: "Practical use",
          items: [
            "Save books for Day 4 windows and pair them with Hero Fragments and Prime Recruits.",
            "Prioritize skill levels that change march survivability or damage breakpoints first."
          ]
        }
      ],
      related: ["day-hero", "type-hero", "resource-hero-fragments", "resource-prime-recruits"],
      sources: ["Community planning notes", "Hero progression references"]
    },
    {
      id: "resource-power-cores",
      group: "resources",
      badge: "Item",
      title: "Power Cores",
      summary: "Power Cores are Hero Initiative consumables and should be timed with your highest-value hero upgrade windows.",
      sections: [
        {
          title: "Usage model",
          items: [
            "Batch core spending with other Day 4 materials instead of using them on random days.",
            "Track your core stock to avoid partial upgrades that do not finish a meaningful breakpoint."
          ]
        }
      ],
      related: ["day-hero", "type-hero", "resource-skill-books"],
      sources: ["Community planning notes"]
    },
    {
      id: "resource-enhancement-alloys",
      group: "resources",
      badge: "Item",
      title: "Enhancement Alloys",
      summary: "Enhancement Alloys are best consumed in planned hero-equipment bursts to avoid fragmenting progression.",
      sections: [
        {
          title: "Best practice",
          items: [
            "Use alloys when you can finish an equipment threshold instead of splitting tiny upgrades.",
            "Pair alloy spending with Exclusive Equipment Fragments during Hero Initiative windows."
          ]
        }
      ],
      related: ["day-hero", "resource-exclusive-equipment-fragments"],
      sources: ["Community planning notes"]
    },
    {
      id: "resource-badges",
      group: "resources",
      badge: "Item",
      title: "Badges",
      summary: "Badges are core research currency; disciplined saving for science windows prevents low-value leak spending.",
      sections: [
        {
          title: "Best use",
          items: [
            "Spend badges during Age of Science to stack score and progression together.",
            "Plan badge usage around prerequisite chains so each unlock advances the next objective."
          ]
        }
      ],
      related: ["day-science", "type-science", "resource-research-speedups"],
      sources: ["Laboratory references", "Community planning notes"]
    },
    {
      id: "resource-diamonds",
      group: "resources",
      badge: "Item",
      title: "Diamonds",
      summary: "Diamonds touch multiple scoring categories, so use them only on purchases aligned with the current event objective.",
      sections: [
        {
          title: "Spending discipline",
          items: [
            "Avoid impulsive diamond use outside event windows that convert to useful score.",
            "Track diamond sinks by day so purchases contribute to your planned chest path."
          ]
        }
      ],
      related: ["day-hero", "day-growth", "day-shelter", "day-science"],
      sources: ["Community planning notes"]
    },
    {
      id: "resource-prime-recruits",
      group: "resources",
      badge: "Item",
      title: "Prime Recruits",
      summary: "Prime Recruits should be pooled for Hero Initiative rather than consumed on low-impact days.",
      sections: [
        {
          title: "Recruit timing",
          items: [
            "Use Prime Recruits during Day 4 to pair pull value with event scoring.",
            "If possible, synchronize with Hero Fragments and Skill Books for one consolidated push."
          ]
        }
      ],
      related: ["day-hero", "type-hero", "resource-hero-fragments"],
      sources: ["Community planning notes"]
    },
    {
      id: "resource-exclusive-equipment-fragments",
      group: "resources",
      badge: "Item",
      title: "Exclusive Equipment Fragments",
      summary: "Exclusive Equipment Fragments are premium hero power materials and should be committed only to your active main lineup.",
      sections: [
        {
          title: "Priority model",
          items: [
            "Prioritize heroes you field daily in rallies and PvP.",
            "Delay upgrades on secondary heroes until core march equipment is stable."
          ]
        }
      ],
      related: ["day-hero", "resource-enhancement-alloys", "resource-heroes"],
      sources: ["Community planning notes"]
    },
    {
      id: "resource-hero-fragments",
      group: "resources",
      badge: "Item",
      title: "Hero Fragments",
      summary: "Hero Fragments are highest value when spent in concentrated star-level pushes during Hero Initiative.",
      sections: [
        {
          title: "Fragment strategy",
          items: [
            "Pool fragments by target hero and avoid splitting between too many projects.",
            "Use Day 4 as your default spend point unless a server-specific event changes priorities."
          ]
        }
      ],
      related: ["day-hero", "resource-prime-recruits", "resource-skill-books"],
      sources: ["Community planning notes"]
    },
    {
      id: "resource-refugees",
      group: "resources",
      badge: "System",
      title: "Refugees",
      summary: "Refugee recruitment contributes to Shelter-day planning and should be timed with your building and speedup flow.",
      sections: [
        {
          title: "Recruit planning",
          items: [
            "Save higher-value recruitment actions for Shelter Upgrade windows when possible.",
            "Prioritize refugees that improve long-term city efficiency and task throughput."
          ]
        }
      ],
      related: ["day-shelter", "type-shelter"],
      sources: ["Tips references", "Community planning notes"]
    },
    {
      id: "resource-construction-speedups",
      group: "resources",
      badge: "Item",
      title: "Construction Speedups",
      summary: "Construction Speedups should be staged for Day 2 building completions, not burned reactively.",
      sections: [
        {
          title: "Timing windows",
          items: [
            "Use short speedups to close chest breakpoints and long speedups to finish major buildings.",
            "Always stack alliance help before consuming speedups."
          ]
        }
      ],
      related: ["day-shelter", "type-shelter", "resource-buildings"],
      sources: ["Community planning notes"]
    },
    {
      id: "resource-research-speedups",
      group: "resources",
      badge: "Item",
      title: "Research Speedups",
      summary: "Research Speedups are most efficient when paired with badge-heavy chains during Age of Science.",
      sections: [
        {
          title: "Usage pattern",
          items: [
            "Use speedups to complete prerequisite nodes that unlock your next major tech goal.",
            "Avoid random single-node spending that does not advance your chosen research chain."
          ]
        }
      ],
      related: ["day-science", "type-science", "resource-badges"],
      sources: ["Community planning notes"]
    },
    {
      id: "resource-training-speedups",
      group: "resources",
      badge: "Item",
      title: "Training Speedups",
      summary: "Training Speedups are core for Army Expansion and Enemy Buster preparation when timed with queue strategy.",
      sections: [
        {
          title: "Queue control",
          items: [
            "Finish high-value training queues during Army Expansion windows.",
            "Reserve enough speedups for emergency troop replacement before Day 6 pressure periods."
          ]
        }
      ],
      related: ["day-growth", "type-army", "day-enemy"],
      sources: ["Community planning notes"]
    },
    {
      id: "resource-intercity-trades",
      group: "resources",
      badge: "Tracking Page",
      title: "Intercity Trades",
      summary: "Intercity Trades are timing-sensitive missions and should be aligned with scoring windows and safe march planning.",
      sections: [
        {
          title: "Use this page for planning",
          items: [
            "Record your server's actual launch windows, route duration and protection rules in-game.",
            "Only send valuable cargo when alliance cover, shield timing and return timing are all clear.",
            "Align Intercity Trades activity with quieter windows if Enemy Buster pressure is active."
          ]
        },
        {
          title: "Recommended checklist",
          items: [
            "Confirm march speed, auto return and escort expectations before departure.",
            "Keep screenshots of route rewards and losses so your alliance can decide whether a time slot is worth repeating.",
            "Validate all truck-specific rules on your server because public references were not complete enough for fixed numbers here."
          ]
        }
      ],
      related: ["resource-shield", "day-growth"],
      sources: ["Community planning page", "Verify in-game on your server"]
    },
    {
      id: "resource-bounty",
      group: "resources",
      badge: "Tracking Page",
      title: "Bounty",
      summary: "Bounty systems vary by server context, so this page focuses on timing discipline and alliance record-keeping instead of invented numbers.",
      sections: [
        {
          title: "How to handle bounty tasks",
          items: [
            "Track reset time, refresh cost and reward quality directly from your server.",
            "Hold easy-complete tasks if they are better used inside a matching event window.",
            "Keep enough stamina, fuel or speedups to finish high-value bounties when they appear."
          ]
        },
        {
          title: "Alliance recording",
          items: [
            "Share which bounty types overlap well with vehicle, science, hero or enemy days.",
            "Flag low-value or trap bounties that look expensive for the reward they give.",
            "Reconfirm each season because bounty pools often change faster than static wiki pages."
          ]
        }
      ],
      related: ["day-growth", "resource-intercity-trades"],
      sources: ["Community planning page", "Verify in-game on your server"]
    },
    {
      id: "enemy-units",
      group: "resources",
      badge: "Enemies",
      title: "Enemy Units and Target Priority",
      summary: "Reconciled enemy classification and priorities for Zombie, Boomer, Blood Goon, Berserk and Fury Lord.",
      sections: [
        {
          title: "Core enemy roster",
          items: [
            "Zombie: generic enemy route, reconciled as Lv.1-30 for reward planning.",
            "Boomer: generic enemy route, reconciled as Lv.1-10 with stronger Day 1 scoring per fuel in many accounts.",
            "Blood Goon: generic enemy category; evaluate by real route safety and reward value.",
            "Berserk: special mission enemy with isolated engagement planning.",
            "Fury Lord: special event boss where damage contribution and alliance timing are critical.",
            "Power values by enemy level are not consistently published in open sources and should be verified in-game per server/season."
          ]
        },
        {
          title: "Reconciled source notes",
          items: [
            "Fandom provides reliable base-point reward ranges for Creep/Zombie and Boomer in Mod Vehicle Boost.",
            "LastZ.GG provides stronger operational guidance for event execution (rally size, join strategy, damage focus).",
            "LastZ.Wiki seasonal pages improve event context, daily limits and priority ordering for seasonal targets."
          ]
        },
        {
          title: "Engagement checklist",
          items: [
            "Only engage targets your formation can clear with high certainty; failed fights waste stamina/fuel and timing windows.",
            "Before committing to stronger enemies, confirm hospital space, march timers and return path safety.",
            "On Day 1, spend fuel where points-per-fuel is strongest for your account stage, usually Boomer-focused routes.",
            "Track your own server rewards per enemy type and update priorities weekly."
          ]
        }
      ],
      related: ["enemy-boomer", "enemy-zombie", "enemy-berserk-zombie", "enemy-bloods-goons", "enemy-fury-lord", "day-vehicle", "type-vehicle", "day-enemy"],
      sources: ["Fandom: Full Preparedness (Boomer/Creep points)", "LastZ.GG: Tyrant & Furylord guide", "LastZ.Wiki: Eventos e Temporada 3"]
    },
    ...ENEMY_GUIDES,
    ...HERO_GUIDES
  ]
}

export const GUIDE_GROUPS = [
  {
    id: "eventTypes",
    title: "Event Types",
    description: "Focused pages for each core scoring theme in the rotation."
  },
  {
    id: "days",
    title: "Day Pages",
    description: "Weekly guides mapped to the day titles used in the calendar."
  },
  {
    id: "resources",
    title: "Support Systems",
    description: "Reference pages for radar, shields, heroes and materials."
  }
]

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