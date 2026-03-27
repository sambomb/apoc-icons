import { POINT_EXAMPLES, displayedToBasePoints } from "./points.js"

const withBase = (example) => ({
  ...example,
  base: displayedToBasePoints(example.shown)
})

const HERO_ENTRIES = [
  { id: "hero-katrina", name: "Katrina", tier: "S-Type" },
  { id: "hero-sophia", name: "Sophia", tier: "S-Type" },
  { id: "hero-laura", name: "Laura", tier: "S-Type" },
  { id: "hero-chinatsu", name: "Chinatsu", tier: "S-Type" },
  { id: "hero-mia", name: "Mia", tier: "S-Type" },
  { id: "hero-oliveira", name: "Oliveira", tier: "S-Type" },
  { id: "hero-amelia", name: "Amelia", tier: "S-Type" },
  { id: "hero-scarlett", name: "Scarlett", tier: "S-Type" },
  { id: "hero-evelyn", name: "Evelyn", tier: "S-Type" },
  { id: "hero-selena", name: "Selena", tier: "S-Type" },
  { id: "hero-vivian", name: "Vivian", tier: "A-Type" },
  { id: "hero-miranda", name: "Miranda", tier: "A-Type" },
  { id: "hero-fiona", name: "Fiona", tier: "A-Type" },
  { id: "hero-elizabeth", name: "Elizabeth", tier: "A-Type" },
  { id: "hero-maria", name: "Maria", tier: "A-Type" },
  { id: "hero-isabella", name: "Isabella", tier: "A-Type" },
  { id: "hero-leah", name: "Leah", tier: "A-Type" },
  { id: "hero-ava", name: "Ava", tier: "A-Type" },
  { id: "hero-christina", name: "Christina", tier: "A-Type" },
  { id: "hero-athena", name: "Athena", tier: "B-Type" },
  { id: "hero-audrey", name: "Audrey", tier: "B-Type" },
  { id: "hero-william", name: "William", tier: "B-Type" },
  { id: "hero-angelina", name: "Angelina", tier: "B-Type" },
  { id: "hero-natalie", name: "Natalie", tier: "B-Type" },
  { id: "hero-giselle", name: "Giselle", tier: "B-Type" }
]

const HERO_GUIDES = HERO_ENTRIES.map((hero) => ({
  id: hero.id,
  group: "resources",
  badge: "Hero",
  title: hero.name,
  summary: `${hero.name} profile and planning notes for Hero Initiative and long-term roster growth.`,
  sections: [
    {
      title: "Profile snapshot",
      items: [
        `Type in source list: ${hero.tier}.`,
        "Use this page to track your own star level, skill levels and equipment breakpoint progression.",
        "Prioritize upgrades for active march formations before investing in secondary heroes."
      ]
    },
    {
      title: "Power model checklist",
      items: [
        "Hero power is affected by level, stars, skills and equipment.",
        "General bonuses also come from vehicle modification, structures and technologies.",
        "Use Hero Initiative windows to batch upgrades for stronger chest efficiency."
      ]
    }
  ],
  related: ["resource-heroes", "type-hero", "day-hero"],
  sources: ["Fandom: Heroes", "LastZ.GG: Hero guides"]
}))

const ENEMY_GUIDES = [
  {
    id: "enemy-boomer",
    group: "resources",
    badge: "Enemy",
    title: "Boomer",
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
    related: ["day-vehicle", "type-vehicle", "enemy-units"],
    sources: ["Fandom: Full Preparedness", "Sardinha Day 1", "LastZ.GG: Alliance Duel guide"]
  },
  {
    id: "enemy-zombie",
    group: "resources",
    badge: "Enemy",
    title: "Zombie",
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
            "Workshop progression on Last Z Wiki focuses on Golden Keys, which are separate from Golden Wrenches. Keep those inventories separate.",
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
      related: ["day-shelter", "resource-point-rules"],
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
      related: ["day-enemy", "resource-point-rules"],
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
            "Favor Boomer rallies you can clear consistently over low-return creep farming."
          ]
        },
        {
          title: "Tips (validated from Sardinha Day 1)",
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
          title: "Useful base point references (Fandom)",
          items: [
            "Consume 1 Modification Blueprint: +4 base points.",
            "Consume 1 Golden Wrench: +600 base points.",
            "Group kill Boomer Lv.1-2: +1,600; Lv.3-4: +1,700; Lv.5-6: +1,800; Lv.7-8: +1,900; Lv.9-10: +2,000.",
            "Creep kills (Lv.1-30 ranges) appear in the +840 to +1,000 base range, typically less efficient than Boomers for fuel."
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
      related: ["type-vehicle", "resource-wrenches"],
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
      related: ["type-shelter", "resource-point-rules"],
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
        }
      ],
      related: ["resource-radar", "resource-bounty", "resource-interstate-truck"],
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
      related: ["day-peace", "day-vehicle"],
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
            "LastZ.GG highlights hero tier prioritization as critical to avoid spreading resources across low-value upgrades."
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
      sources: ["Fandom: Heroes", "Last Z Wiki: Heroes", "Last Z Wiki: tips page", "LastZ.GG: Hero guides"]
    },
    {
      id: "resource-wrenches",
      group: "resources",
      badge: "Item",
      title: "Golden Wrenches",
      summary: "Golden Wrenches are premium Mod Vehicle Boost spend, so they should usually be hoarded for the correct scoring window.",
      sections: [
        {
          title: "Why they matter",
          items: [
            "Fandom lists each Golden Wrench at +600 base points during Mod Vehicle Boost.",
            "That makes wrenches one of the cleanest ways to secure chest progress when you do not want RNG from combat targets.",
            "Do not confuse Golden Wrenches with Workshop Golden Keys. They serve different systems."
          ]
        },
        {
          title: "How to manage them",
          items: [
            "Track your stock separately from blueprints and keys.",
            "Spend only when the day is live unless a server-specific emergency requires otherwise.",
            "If you are planning for a workshop milestone, calculate wrench usage and key usage independently."
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
            "Bundle blueprint spending with Boomer pushes and saved radar claims to keep the whole day coherent.",
            "Keep a small reserve if your account still unlocks regular vehicle breakpoints outside event days."
          ]
        }
      ],
      related: ["type-vehicle", "day-vehicle"],
      sources: ["Fandom: Full Preparedness", "Sardinha guide: Day 1"]
    },
    {
      id: "resource-interstate-truck",
      group: "resources",
      badge: "Tracking Page",
      title: "Interstate Truck",
      summary: "Public source detail was sparse in the pages retrieved, so this page is a safe planning sheet for cross-state truck runs rather than a hard mechanic table.",
      sections: [
        {
          title: "Use this page for planning",
          items: [
            "Record your server's actual launch windows, route duration and protection rules in-game.",
            "Only send valuable cargo when alliance cover, shield timing and return timing are all clear.",
            "Align truck activity with quieter windows if Enemy Buster or interstate pressure is active."
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
      related: ["day-growth", "resource-point-rules"],
      sources: ["Community planning page", "Verify in-game on your server"]
    },
    {
      id: "resource-point-rules",
      group: "resources",
      badge: "Reference",
      title: "Point Rules and Base Conversion",
      summary: "Displayed values are boosted values, not base values. Use the configured divisor to recover base points with integer rounding.",
      sections: [
        {
          title: "Working formula",
          items: withBase(POINT_EXAMPLES[0]) && [
            "Base points = round(displayed points / 2.17), with a minimum result of 1.",
            "This follows the requested conversion where 217 displayed becomes 100 base.",
            "This is the safest way to compare your results with wiki tables that list base values."
          ]
        },
        {
          title: "Examples from the screenshot",
          items: POINT_EXAMPLES.map((example) => {
            const resolved = withBase(example)
            return `${resolved.label}: ${resolved.shown} shown ≈ ${resolved.base} base`
          })
        },
        {
          title: "How to use it",
          items: [
            "If your shown values look higher than a wiki table, check whether technology, hero skills or temporary buffs are already being added.",
            "Always plan chest targets from base tables first, then add your bonus layer to estimate how many actions you really need."
          ]
        }
      ],
      related: ["type-vehicle", "type-army"],
      sources: ["User-provided screenshot note", "Event tables from Fandom"]
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