// Starter hub and extra dialog scripts for expanded quest NPCs.
Object.assign(QUESTS, {
  q_marsh_road: {
    id: 'q_marsh_road',
    title: 'Road to Ashfen',
    giverNpc: 'guard_leo',
    zone: 'greenwood',
    desc: 'Guard Leo keeps Greenwood safe, but the road into Ashfen Marshes needs clearing before trade can move again.',
    objectives: [
      { id:'kill_lurkers_road', type:'kill', mob:'bog_lurker', count:3, current:0, label:'Kill Bog Lurkers (0/3)' }
    ],
    rewards: { xp:120, gold:45, items:['health_potion','bandage'] },
    followUp: null
  },
  q_moonfall_hunt: {
    id: 'q_moonfall_hunt',
    title: 'Silver Things in the Hollow',
    giverNpc: 'warden_selene',
    zone: 'moonfall_hollow',
    desc: 'Warden Selene has watched strange beasts gather under the moon west of Greenwood. Thin their numbers before they spill toward town.',
    objectives: [
      { id:'kill_moon_moths', type:'kill', mob:'moon_moth', count:3, current:0, label:'Kill Moon Moths (0/3)' },
      { id:'kill_pouncers', type:'kill', mob:'thorn_pouncer', count:3, current:0, label:'Kill Thorn Pouncers (0/3)' }
    ],
    rewards: { xp:220, gold:70, items:['greater_health_potion'] },
    followUp: 'q_lunar_stag'
  },
  q_lunar_stag: {
    id: 'q_lunar_stag',
    title: 'The Antlers of Moonlight',
    giverNpc: 'warden_selene',
    zone: 'moonfall_hollow',
    desc: 'Aurelion, the Lunar Stag, has woken in the heart of the hollow. Defeat it before the old magic turns hostile.',
    objectives: [
      { id:'kill_cultists_hollow', type:'kill', mob:'hollow_cultist', count:3, current:0, label:'Kill Hollow Cultists (0/3)' },
      { id:'kill_treants_hollow', type:'kill', mob:'starved_treant', count:2, current:0, label:'Kill Starved Treants (0/2)' },
      { id:'kill_lunar_stag', type:'kill', mob:'lunar_stag', count:1, current:0, label:'Defeat Aurelion (0/1)' }
    ],
    rewards: { xp:650, gold:160, items:['moonlit_cloak','hollowthorn_ring'] },
    followUp: null
  },
  q_titan_crown_arena: {
    id: 'q_titan_crown_arena',
    title: 'Crowns for the Crownless',
    giverNpc: 'legend_keeper_oria',
    zone: 'staffbreaker_peaks',
    desc: 'Legend Keeper Oria wants proof that the level 20 arena bosses can bleed. Bring down the rulers of the Titan Crown Arena.',
    objectives: [
      { id:'kill_iron_titan_king', type:'kill', mob:'iron_titan_king', count:1, current:0, label:'Defeat Mordax (0/1)' },
      { id:'kill_void_star_queen', type:'kill', mob:'void_star_queen', count:1, current:0, label:'Defeat Nysera (0/1)' },
      { id:'kill_chrono_dragon_lord', type:'kill', mob:'chrono_dragon_lord', count:1, current:0, label:'Defeat Vaelux (0/1)' }
    ],
    rewards: { xp:6500, gold:2500, items:['crown_of_twenty_kings','titanbreaker_greatstaff'] },
    followUp: null
  }
});

Object.assign(DIALOGS, {
  start_quest_marsh_road: {
    npc: 'Guard Leo',
    portrait: 'G',
    lines: [
      "Greenwood itself is safe. No rats, no ambushes, no nonsense inside the village line.",
      "The trouble starts east on the road to Ashfen Marshes.",
      "Clear a few lurkers from the road and trade can move again."
    ],
    acceptQuest: 'q_marsh_road',
    declineText: 'Not yet.'
  },
  start_quest_moonfall: {
    npc: 'Warden Selene',
    portrait: 'S',
    lines: [
      "West of Greenwood, the hollow glows even when the moon is gone.",
      "The beasts there are not ordinary, and the old stag at its heart guards relics people whisper about.",
      "Help me contain the hollow before its magic reaches the village."
    ],
    acceptQuest: 'q_moonfall_hunt',
    declineText: 'Not now.'
  },
  start_quest_titan_crown: {
    npc: 'Legend Keeper Oria',
    portrait: 'L',
    lines: [
      "You found the first boss zone. Good. That means you are either brave or testing.",
      "Further west waits the Titan Crown Arena: three level 20 bosses, each carrying relics that should probably be illegal.",
      "Defeat them, and I will name you crownless no longer."
    ],
    acceptQuest: 'q_titan_crown_arena',
    declineText: 'I need more power.'
  },
  start_quest_ratcatcher: {
    npc: 'Ranger Elowen',
    portrait: 'R',
    lines: [
      "The forest looks calm until you check the cellars.",
      "Rats, scouts, stolen grain. Small trouble becomes big trouble if nobody handles it.",
      "Clear them out for me?"
    ],
    acceptQuest: 'q_ratcatcher',
    declineText: 'Later.'
  },
  start_quest_wraithlight: {
    npc: 'Reed Scout Toma',
    portrait: 'T',
    lines: [
      "I followed blue lights through the reeds last night.",
      "They were not lanterns. They were wraiths, and the serpents gathered behind them.",
      "Help me break that trail before it reaches the village."
    ],
    acceptQuest: 'q_wraithlight',
    declineText: 'Not yet.'
  },
  start_quest_shadow_pages: {
    npc: 'Archivist Ren',
    portrait: 'A',
    lines: [
      "The ruins still keep records, even after everything else rotted.",
      "The assassins are tearing pages from the Black Archive.",
      "Recover what you can. Burn what you must."
    ],
    acceptQuest: 'q_shadow_pages',
    declineText: 'Another time.'
  },
  start_quest_abyss: {
    npc: 'Captain Nere',
    portrait: 'N',
    lines: [
      "Welcome to the Sunken Abyss. Keep your blade dry if you can.",
      "The drowned patrols are moving again, and coral guardians block the lower roads.",
      "Put them down and I will show you the deeper route."
    ],
    acceptQuest: 'q_abyss_patrol',
    declineText: 'I need air.'
  },
  start_quest_leviathan: {
    npc: 'Tide-Seer Luma',
    portrait: 'L',
    lines: [
      "The abyss dreams with one enormous eye open.",
      "Thalrassa rises when the pearl colossi begin to march.",
      "Break the march, then face the leviathan before the surface cracks."
    ],
    acceptQuest: 'q_leviathan_rises',
    declineText: 'I am not ready.'
  }
});

// Extra high-tier talent rows for longer progression.
TALENT_TREES.warrior.push({
  tier: 5,
  nodes: [
    { id:'wt_titan_grip', name:'Titan Grip', icon:'G', maxRank:2, requires:['wt_warlord'],
      desc:'Increases attack by 12% and max HP by 60 per rank.',
      effect: (p) => { p.bonusAtkPct = (p.bonusAtkPct||0) + 0.12; p.bonusMaxHp = (p.bonusMaxHp||0) + 60; }
    },
    { id:'wt_earthshaker', name:'Earthshaker', icon:'E', maxRank:1, requires:['wt_warlord'],
      desc:'Unlocks Earthshaker: 260% ATK and stuns the enemy.',
      effect: (p) => { p.skills.push({id:'earthshaker',name:'Earthshaker',icon:'E',type:'attack',dmgMult:2.6,mp:42,cooldown:5,cd:0,effect:'stun',desc:'260% ATK and stun.'}); }
    },
    { id:'wt_last_stand', name:'Last Stand', icon:'L', maxRank:1, requires:['wt_warlord'],
      desc:'Unlocks Last Stand: reduce incoming damage by 75% for 3 turns.',
      effect: (p) => { p.skills.push({id:'last_stand',name:'Last Stand',icon:'L',type:'buff',buffDef:0.75,duration:3,mp:35,cooldown:7,cd:0,desc:'Reduce damage taken 75% for 3 turns.'}); }
    }
  ]
});

TALENT_TREES.mage.push({
  tier: 5,
  nodes: [
    { id:'mt_storm_focus', name:'Storm Focus', icon:'S', maxRank:2, requires:['mt_archmage'],
      desc:'Increases INT by 12% and max MP by 50 per rank.',
      effect: (p) => { p.bonusIntPct = (p.bonusIntPct||0) + 0.12; p.bonusMaxMp = (p.bonusMaxMp||0) + 50; }
    },
    { id:'mt_chain_lightning', name:'Chain Lightning', icon:'C', maxRank:1, requires:['mt_archmage'],
      desc:'Unlocks Chain Lightning: 260% INT as magic damage.',
      effect: (p) => { p.spells.push({id:'chain_lightning',name:'Chain Lightning',icon:'C',type:'magic',dmgMult:2.6,mp:48,cooldown:4,cd:0,desc:'260% INT as magic damage.'}); }
    },
    { id:'mt_time_lock', name:'Time Lock', icon:'T', maxRank:1, requires:['mt_archmage'],
      desc:'Unlocks Time Lock: 120% INT and stuns the enemy.',
      effect: (p) => { p.spells.push({id:'time_lock',name:'Time Lock',icon:'T',type:'magic',dmgMult:1.2,mp:38,cooldown:5,cd:0,effect:'stun',desc:'120% INT and stun.'}); }
    }
  ]
});

TALENT_TREES.rogue.push({
  tier: 5,
  nodes: [
    { id:'rt_master_duelist', name:'Master Duelist', icon:'D', maxRank:2, requires:['rt_death_mark'],
      desc:'Increases AGI by 12% and lifesteal by 6 per rank.',
      effect: (p) => { p.bonusAgiPct = (p.bonusAgiPct||0) + 0.12; p.lifeSteal = (p.lifeSteal||0) + 6; }
    },
    { id:'rt_killing_spree', name:'Killing Spree', icon:'K', maxRank:1, requires:['rt_death_mark'],
      desc:'Unlocks Killing Spree: 5 hits for 55% ATK each.',
      effect: (p) => { p.skills.push({id:'killing_spree',name:'Killing Spree',icon:'K',type:'multihit',hits:5,dmgMult:0.55,mp:36,cooldown:5,cd:0,desc:'5 hits at 55% ATK each.'}); }
    },
    { id:'rt_blackout', name:'Blackout', icon:'B', maxRank:1, requires:['rt_death_mark'],
      desc:'Unlocks Blackout: vanish and guarantee your next crit.',
      effect: (p) => { p.skills.push({id:'blackout',name:'Blackout',icon:'B',type:'buff',evade:true,nextCrit:true,mp:32,cooldown:6,cd:0,desc:'Dodge next attack. Next hit crits.'}); }
    }
  ]
});
