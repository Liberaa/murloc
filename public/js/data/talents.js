// Talent trees per class
const TALENT_TREES = {
  warrior: [
    // Tier 1 (lv 1+)
    {
      tier: 1,
      nodes: [
        { id:'wt_heavy_strikes', name:'Heavy Strikes', icon:'⚔️', maxRank:3, requires:null,
          desc:'Increases physical attack by 8% per rank.',
          effect: (p, rank) => { p.bonusAtkPct = (p.bonusAtkPct||0) + 0.08; }
        },
        { id:'wt_iron_skin', name:'Iron Skin', icon:'🛡️', maxRank:3, requires:null,
          desc:'Increases armor/defense by 10% per rank.',
          effect: (p, rank) => { p.bonusDefPct = (p.bonusDefPct||0) + 0.10; }
        },
        { id:'wt_vitality', name:'Warrior Vitality', icon:'❤️', maxRank:3, requires:null,
          desc:'Increases max HP by 40 per rank.',
          effect: (p, rank) => { p.bonusMaxHp = (p.bonusMaxHp||0) + 40; }
        }
      ]
    },
    // Tier 2 (requires 2 points in tier 1)
    {
      tier: 2,
      nodes: [
        { id:'wt_battle_cry', name:'Battle Cry', icon:'📯', maxRank:1, requires:['wt_heavy_strikes'],
          desc:'Unlocks Battle Cry skill: boost ATK by 30% for 3 turns.',
          effect: (p) => { p.skills.push({id:'battle_cry',name:'Battle Cry',icon:'📯',type:'buff',buffAtk:0.3,duration:3,mp:10,cooldown:5,cd:0,desc:'Boost ATK 30% for 3 turns.'}); }
        },
        { id:'wt_taunt', name:'Taunt', icon:'😤', maxRank:1, requires:['wt_iron_skin'],
          desc:'Unlocks Taunt skill: force enemy to attack you, reduce enemy ATK 20%.',
          effect: (p) => { p.skills.push({id:'taunt',name:'Taunt',icon:'😤',type:'debuff',effect:'reduce_atk',mp:8,cooldown:4,cd:0,desc:'Reduce enemy ATK 20% for 2 turns.'}); }
        },
        { id:'wt_regen_strikes', name:'Regen Strikes', icon:'💚', maxRank:2, requires:['wt_vitality'],
          desc:'Each attack heals you for 4 HP per rank.',
          effect: (p, rank) => { p.lifeSteal = (p.lifeSteal||0) + 4; }
        }
      ]
    },
    // Tier 3
    {
      tier: 3,
      nodes: [
        { id:'wt_whirlwind', name:'Whirlwind', icon:'🌪️', maxRank:1, requires:['wt_battle_cry','wt_taunt'],
          desc:'Unlocks Whirlwind: deal 150% ATK damage.',
          effect: (p) => { p.skills.push({id:'whirlwind',name:'Whirlwind',icon:'🌪️',type:'attack',dmgMult:1.5,mp:20,cooldown:3,cd:0,desc:'Deal 150% ATK damage.'}); }
        },
        { id:'wt_shield_wall', name:'Shield Wall', icon:'🏰', maxRank:1, requires:['wt_taunt'],
          desc:'Unlocks Shield Wall: reduce incoming damage by 60% for 2 turns.',
          effect: (p) => { p.skills.push({id:'shield_wall',name:'Shield Wall',icon:'🏰',type:'buff',buffDef:0.6,duration:2,mp:15,cooldown:6,cd:0,desc:'Reduce damage taken 60% for 2 turns.'}); }
        }
      ]
    },
    // Tier 4 (capstone)
    {
      tier: 4,
      nodes: [
        { id:'wt_warlord', name:'Warlord', icon:'👑', maxRank:1, requires:['wt_whirlwind','wt_shield_wall'],
          desc:'Unlocks Warlord Stance: permanently +20% ATK and DEF.',
          effect: (p) => { p.bonusAtkPct = (p.bonusAtkPct||0) + 0.2; p.bonusDefPct = (p.bonusDefPct||0) + 0.2; p.skills.push({id:'execute',name:'Execute',icon:'💀',type:'attack',dmgMult:2.0,mp:30,cooldown:4,cd:0,desc:'Deal 200% ATK. Extra damage below 25% HP.'}); }
        }
      ]
    }
  ],

  mage: [
    {
      tier: 1,
      nodes: [
        { id:'mt_arcane_mind', name:'Arcane Mind', icon:'🧠', maxRank:3, requires:null,
          desc:'Increases spell power (INT) by 8% per rank.',
          effect: (p, rank) => { p.bonusIntPct = (p.bonusIntPct||0) + 0.08; }
        },
        { id:'mt_mana_pool', name:'Mana Pool', icon:'💧', maxRank:3, requires:null,
          desc:'Increases max MP by 30 per rank.',
          effect: (p, rank) => { p.bonusMaxMp = (p.bonusMaxMp||0) + 30; }
        },
        { id:'mt_glass_cannon', name:'Glass Cannon', icon:'💥', maxRank:2, requires:null,
          desc:'INT +15% but DEF -10% per rank.',
          effect: (p, rank) => { p.bonusIntPct = (p.bonusIntPct||0) + 0.15; p.bonusDefPct = (p.bonusDefPct||0) - 0.10; }
        }
      ]
    },
    {
      tier: 2,
      nodes: [
        { id:'mt_fireball', name:'Fireball Mastery', icon:'🔥', maxRank:1, requires:['mt_arcane_mind'],
          desc:'Unlocks Fireball: deals 160% INT as fire damage.',
          effect: (p) => { p.spells.push({id:'fireball',name:'Fireball',icon:'🔥',type:'fire',dmgMult:1.6,mp:18,cooldown:2,cd:0,desc:'Deal 160% INT as fire.'}); }
        },
        { id:'mt_frost_nova', name:'Frost Nova', icon:'❄️', maxRank:1, requires:['mt_mana_pool'],
          desc:'Unlocks Frost Nova: freeze enemy for 1 turn, deal 100% INT.',
          effect: (p) => { p.spells.push({id:'frost_nova',name:'Frost Nova',icon:'❄️',type:'magic',dmgMult:1.0,mp:20,cooldown:3,cd:0,effect:'stun',desc:'Freeze enemy for 1 turn.'}); }
        },
        { id:'mt_mana_regen', name:'Mana Flow', icon:'🌊', maxRank:2, requires:['mt_mana_pool'],
          desc:'Regenerate 5 MP per turn in combat per rank.',
          effect: (p, rank) => { p.mpRegen = (p.mpRegen||0) + 5; }
        }
      ]
    },
    {
      tier: 3,
      nodes: [
        { id:'mt_inferno', name:'Inferno', icon:'🌋', maxRank:1, requires:['mt_fireball'],
          desc:'Unlocks Inferno: massive AoE fire, 220% INT.',
          effect: (p) => { p.spells.push({id:'inferno',name:'Inferno',icon:'🌋',type:'fire',dmgMult:2.2,mp:40,cooldown:5,cd:0,desc:'Devastating fire, 220% INT.'}); }
        },
        { id:'mt_blink', name:'Blink', icon:'⚡', maxRank:1, requires:['mt_frost_nova'],
          desc:'Unlocks Blink: teleport, guarantees next spell crits.',
          effect: (p) => { p.spells.push({id:'blink',name:'Blink',icon:'⚡',type:'buff',nextCrit:true,mp:15,cooldown:4,cd:0,desc:'Next spell guaranteed crit.'}); }
        }
      ]
    },
    {
      tier: 4,
      nodes: [
        { id:'mt_archmage', name:'Archmage', icon:'🔮', maxRank:1, requires:['mt_inferno','mt_blink'],
          desc:'Unlocks Arcane Surge: deal 300% INT, restore 40 MP.',
          effect: (p) => { p.bonusIntPct = (p.bonusIntPct||0) + 0.25; p.spells.push({id:'arcane_surge',name:'Arcane Surge',icon:'🔮',type:'magic',dmgMult:3.0,mp:50,cooldown:6,cd:0,desc:'300% INT damage, restore 40 MP.', restoreMp:40}); }
        }
      ]
    }
  ],

  rogue: [
    {
      tier: 1,
      nodes: [
        { id:'rt_quick_hands', name:'Quick Hands', icon:'🤚', maxRank:3, requires:null,
          desc:'Increases AGI (crit chance/damage) by 8% per rank.',
          effect: (p, rank) => { p.bonusAgiPct = (p.bonusAgiPct||0) + 0.08; }
        },
        { id:'rt_shadowstep', name:'Shadow Step', icon:'👣', maxRank:2, requires:null,
          desc:'10% chance per rank to dodge attacks.',
          effect: (p, rank) => { p.dodgeChance = (p.dodgeChance||0) + 0.10; }
        },
        { id:'rt_venomous', name:'Venomous Blades', icon:'☠️', maxRank:2, requires:null,
          desc:'Your attacks apply poison (5 dmg/turn) per rank adds +3 poison.',
          effect: (p, rank) => { p.attackPoison = (p.attackPoison||0) + 5; }
        }
      ]
    },
    {
      tier: 2,
      nodes: [
        { id:'rt_backstab', name:'Backstab', icon:'🗡️', maxRank:1, requires:['rt_quick_hands'],
          desc:'Unlocks Backstab: deal 180% ATK, guaranteed crit if first attack.',
          effect: (p) => { p.skills.push({id:'backstab',name:'Backstab',icon:'🗡️',type:'attack',dmgMult:1.8,mp:12,cooldown:2,cd:0,firstCrit:true,desc:'180% ATK, crits if used first.'}); }
        },
        { id:'rt_vanish', name:'Vanish', icon:'💨', maxRank:1, requires:['rt_shadowstep'],
          desc:'Unlocks Vanish: dodge next attack and next hit is guaranteed crit.',
          effect: (p) => { p.skills.push({id:'vanish',name:'Vanish',icon:'💨',type:'buff',evade:true,nextCrit:true,mp:15,cooldown:5,cd:0,desc:'Dodge next attack. Next hit crits.'}); }
        },
        { id:'rt_fan_blades', name:'Fan of Blades', icon:'🔪', maxRank:1, requires:['rt_venomous'],
          desc:'Unlocks Fan of Blades: hit 3 times for 60% ATK each.',
          effect: (p) => { p.skills.push({id:'fan_blades',name:'Fan of Blades',icon:'🔪',type:'multihit',hits:3,dmgMult:0.6,mp:14,cooldown:2,cd:0,desc:'3 hits at 60% ATK each.'}); }
        }
      ]
    },
    {
      tier: 3,
      nodes: [
        { id:'rt_shadow_strike', name:'Shadow Strike', icon:'🌑', maxRank:1, requires:['rt_backstab','rt_vanish'],
          desc:'Unlocks Shadow Strike: 240% ATK from the shadows.',
          effect: (p) => { p.skills.push({id:'shadow_strike',name:'Shadow Strike',icon:'🌑',type:'attack',dmgMult:2.4,mp:25,cooldown:4,cd:0,desc:'Devastating shadow blow, 240% ATK.'}); }
        },
        { id:'rt_hemorrhage', name:'Hemorrhage', icon:'🩸', maxRank:1, requires:['rt_fan_blades'],
          desc:'Unlocks Hemorrhage: cause massive bleed (20 dmg/turn for 5 turns).',
          effect: (p) => { p.skills.push({id:'hemorrhage',name:'Hemorrhage',icon:'🩸',type:'dot',dotDmg:20,dotTurns:5,mp:18,cooldown:4,cd:0,desc:'Bleed 20/turn for 5 turns.'}); }
        }
      ]
    },
    {
      tier: 4,
      nodes: [
        { id:'rt_death_mark', name:'Death Mark', icon:'💀', maxRank:1, requires:['rt_shadow_strike','rt_hemorrhage'],
          desc:'Unlocks Death Mark: mark enemy, all damage +40% for 4 turns.',
          effect: (p) => { p.skills.push({id:'death_mark',name:'Death Mark',icon:'💀',type:'debuff',dmgAmp:0.4,duration:4,mp:30,cooldown:6,cd:0,desc:'Enemy takes 40% more damage for 4 turns.'}); }
        }
      ]
    }
  ]
};
