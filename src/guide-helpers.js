export function textOr(value, fallback){
  return value || fallback
}

export function escapeHtml(value){
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

export function formatTemplate(template, values){
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    String(template)
  )
}

export function withBasePath(path, baseUrl){
  if(/^https?:\/\//i.test(String(path))) return String(path)
  const normalizedBase = String(baseUrl || "/").endsWith("/") ? String(baseUrl || "/") : `${String(baseUrl || "/")}/`
  return `${normalizedBase}${String(path).replace(/^\/+/, "")}`
}

export function stripSourceAttribution(text){
  return String(text)
    .replace(/\(\s*validated from[^)]*\)/gi, "")
    .replace(/\bSource-backed\b\s*/gi, "")
    .replace(/\bfrom (Last ?Z\.GG|Last ?Z Wiki|Fandom|public sources?)\b/gi, "")
    .replace(/\busing\s+(Last ?Z\.GG|Last ?Z(?:\.Wiki| Wiki)|Fandom|LastZData|Sardinha)[^.,;)]*/gi, "")
    .replace(/\b(Currently\s+)?(?:Fandom|Last ?Z\.GG|Last ?Z(?:\.Wiki| Wiki)|LastZData|Sardinha(?: guide| index)?(?: Day \d+)?)\s+(raw category data\s+)?(lists?|describes?|documents?|recommends?|highlights?|identifies?|includes?|groups?|notes?|calls?|shows?|summarizes?|places?|confirms?)\b/gi, "Current references $3")
    .replace(/\bPublic sources\b/gi, "Current references")
    .replace(/\bpublic hero pages\b/gi, "available hero pages")
    .replace(/\bpublic detailed skill page\b/gi, "detailed skill page")
    .replace(/\bfetched public\b/gi, "available")
    .replace(/\bsource-backed\b/gi, "")
    .replace(/\bCurrent references\s+is\b/gi, "Current reference is")
    .replace(/\s+\./g, ".")
    .replace(/\s+,/g, ",")
    .replace(/\s{2,}/g, " ")
    .trim()
}

export function shouldHideSourceSection(title){
  return /(how to use this page|source notes|skill notes from sources|source base|base de fontes)/i.test(String(title))
}

export function shouldHideSourceItem(item){
  return /(from Last ?Z\.GG|Last ?Z Wiki|Fandom|public source|fetched public|source-backed|fontes? da comunidade)/i.test(String(item))
}

function escapeRegex(value){
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

const GUIDE_MENTION_LINKS = [
  { term: "Modification Blueprints", id: "resource-blueprints" },
  { term: "Golden Wrenches", id: "resource-wrenches" },
  { term: "Workshop Golden Keys", id: "resource-wrenches" },
  { term: "Skill Books", id: "resource-skill-books" },
  { term: "Power Cores", id: "resource-power-cores" },
  { term: "Enhancement Alloys", id: "resource-enhancement-alloys" },
  { term: "Badges", id: "resource-badges" },
  { term: "Diamonds", id: "resource-diamonds" },
  { term: "Prime Recruits", id: "resource-prime-recruits" },
  { term: "Exclusive Equipment Fragments", id: "resource-exclusive-equipment-fragments" },
  { term: "Hero Fragments", id: "resource-hero-fragments" },
  { term: "Refugees", id: "resource-refugees" },
  { term: "Construction Speedups", id: "resource-construction-speedups" },
  { term: "Research Speedups", id: "resource-research-speedups" },
  { term: "Training Speedups", id: "resource-training-speedups" },
  { term: "Intercity Trades", id: "resource-intercity-trades" },
  { term: "Intercity Trade", id: "resource-intercity-trades" },
  { term: "Bounty", id: "resource-bounty" },
  { term: "Laura", id: "hero-laura" },
  { term: "Mia", id: "hero-mia" },
  { term: "Boomer", id: "enemy-boomer" },
  { term: "Zombie", id: "enemy-zombie" },
  { term: "Radar", id: "resource-radar" }
]

export function linkifyText(text, guideMap, getGuidePath){
  let html = escapeHtml(text)

  html = html.replace(/https?:\/\/[^\s<]+/gi, (url) => (
    `<a class="guide-link-chip inline-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a>`
  ))

  GUIDE_MENTION_LINKS.forEach(({ term, id }) => {
    const guide = guideMap[id]
    if(!guide) return
    const re = new RegExp(`\\b${escapeRegex(term)}\\b`, "gi")
    html = html.replace(re, (match) => `<a class="guide-link-chip inline-link" href="${getGuidePath(id)}">${match}</a>`)
  })

  return html
}

export async function translateText(text, lang){
  const raw = String(text || "").trim()
  if(!raw || lang === "en" || lang === "auto") return raw

  const hash = Array.from(raw).reduce((acc, ch) => ((acc * 31) + ch.charCodeAt(0)) >>> 0, 7)
  const cacheKey = `guide-i18n:${lang}:${hash}`
  const cached = localStorage.getItem(cacheKey)
  if(cached) return cached

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(raw)}`
    const resp = await fetch(url)
    const data = await resp.json()
    const translated = data?.[0]?.map((chunk) => chunk?.[0] || "").join("").trim() || raw
    localStorage.setItem(cacheKey, translated)
    return translated
  } catch {
    return raw
  }
}

export async function localizeGuideContent(guide, lang){
  if(lang === "en" || lang === "auto") return guide

  const sections = await Promise.all((guide.sections || []).map(async (section) => {
    const title = await translateText(section.title, lang)
    const items = await Promise.all((section.items || []).map((item) => translateText(item, lang)))
    return { ...section, title, items }
  }))

  return {
    ...guide,
    summary: await translateText(guide.summary, lang),
    sections
  }
}

export function guideTitle(guide, t){
  return t.guideTitles?.[guide.id] || guide.title
}

export function guideSummary(guide, t){
  if(guide.id.startsWith("hero-") && !guide.useGuideSections){
    return formatTemplate(
      textOr(t.heroSummaryTemplate, "{name} profile and planning notes for Hero Initiative and long-term roster growth."),
      { name: guide.title }
    )
  }
  return stripSourceAttribution(t.guideSummaries?.[guide.id] || guide.summary)
}

export function getHeroInitials(name){
  return String(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("")
}

export function getGuideSections(guide, t){
  if(guide.useGuideSections) return guide.sections
  if(!guide.id.startsWith("hero-")) return guide.sections

  const sections = [
    {
      title: textOr(t.heroSectionProfile, "Profile snapshot"),
      items: [
        formatTemplate(textOr(t.heroProfileType, "Type in source list: {tier}."), { tier: guide.tier }),
        formatTemplate(textOr(t.heroProfileFaction, "Faction: {faction}."), { faction: guide.faction }),
        textOr(t.heroProfileStars, "Use this page to track star level, equipment breakpoints and daily upgrade targets."),
        textOr(t.heroProfileMainMarch, "Keep your main march heroes ahead of side rosters during Hero Initiative spending windows.")
      ]
    }
  ]

  if(guide.skillBullets && guide.skillBullets.length > 0){
    sections.push({
      title: textOr(t.heroSectionSkills, "Skill planning"),
      items: guide.skillBullets
    })
  } else {
    sections.push({
      title: textOr(t.heroSectionSkills, "Skill planning"),
      items: [
        textOr(t.heroSkillsCore, "Prioritize the core combat skill used in your main lineup before spreading books across backup heroes."),
        textOr(t.heroSkillsPassive, "Permanent passives and march-impact skills usually give better long-term value than niche utility upgrades."),
        textOr(t.heroSkillsBooks, "Save books and fragments for Hero Initiative so skill upgrades contribute to both power growth and event score.")
      ]
    })
  }

  sections.push({
    title: textOr(t.heroSectionPower, "Power model checklist"),
    items: [
      textOr(t.heroPowerLevel, "Hero strength comes from level, stars, skill levels and exclusive equipment."),
      textOr(t.heroPowerBonuses, "Vehicle boosts, tech, buildings and lineup synergy also change total march performance."),
      textOr(t.heroPowerBatch, "Batch upgrades during event windows so one resource push completes multiple objectives.")
    ]
  })

  return sections
}
