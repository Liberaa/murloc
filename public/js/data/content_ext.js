// Extra dialog scripts for expanded quest NPCs.
Object.assign(DIALOGS, {
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
