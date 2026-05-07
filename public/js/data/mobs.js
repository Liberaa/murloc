// Monster database
const MOBS = {
  // === ZONE 1: Greenwood Vale (lv 1-5) ===
  forest_rat: {
    id:'forest_rat', name:'Forest Rat', icon:'🐀', level:1,
    hp:18, atk:3, def:1, xp:25, gold:[0,2],
    loot:[{id:'bread',chance:0.3}],
    skills:[], aiType:'basic',
    color:'#8B6914'
  },
  goblin_scout: {
    id:'goblin_scout', name:'Goblin Scout', icon:'👺', level:2,
    hp:28, atk:5, def:2, xp:40, gold:[1,4],
    loot:[{id:'bandage',chance:0.25},{id:'health_potion',chance:0.1}],
    skills:[{id:'stab',name:'Stab',dmg:8,type:'physical',mp:0}],
    aiType:'basic', color:'#4a7a4a'
  },
  forest_wolf: {
    id:'forest_wolf', name:'Forest Wolf', icon:'🐺', level:3,
    hp:40, atk:8, def:3, xp:60, gold:[1,5],
    loot:[{id:'health_potion',chance:0.2}],
    skills:[{id:'bite',name:'Bite',dmg:12,type:'physical',mp:0,effect:'bleed'}],
    aiType:'aggressive', color:'#6a6a8a'
  },
  giant_spider: {
    id:'giant_spider', name:'Giant Spider', icon:'🕷️', level:4,
    hp:50, atk:10, def:4, xp:28, gold:[2,6],
    loot:[{id:'antidote',chance:0.4},{id:'mana_potion',chance:0.1}],
    skills:[{id:'poison',name:'Venom Bite',dmg:8,type:'poison',mp:0,effect:'poison'}],
    aiType:'basic', color:'#4a2a6a'
  },
  // BOSS zone 1
  alpha_wolf: {
    id:'alpha_wolf', name:'Alpha Wolf', icon:'🐺', level:5,
    hp:180, atk:18, def:8, xp:120, gold:[15,30],
    loot:[{id:'iron_sword',chance:0.4},{id:'leather_armor',chance:0.3},{id:'bronze_daggers',chance:0.3},{id:'ring_vitality',chance:0.15}],
    skills:[
      {id:'howl',name:'Fearsome Howl',dmg:0,type:'debuff',mp:0,effect:'reduce_atk'},
      {id:'lunge',name:'Savage Lunge',dmg:28,type:'physical',mp:0}
    ],
    aiType:'boss', boss:true, color:'#8a4a2a'
  },

  // === ZONE 2: Ashfen Marshes (lv 5-10) ===
  bog_lurker: {
    id:'bog_lurker', name:'Bog Lurker', icon:'🐊', level:1,
    hp:24, atk:4, def:1, xp:30, gold:[1,3],
    loot:[{id:'bread',chance:0.25},{id:'health_potion',chance:0.08}],
    skills:[{id:'drag',name:'Drag Under',dmg:7,type:'physical',mp:0}],
    aiType:'basic', color:'#3a5a2a'
  },
  swamp_troll: {
    id:'swamp_troll', name:'Swamp Troll', icon:'👹', level:2,
    hp:36, atk:6, def:2, xp:42, gold:[2,5],
    loot:[{id:'bandage',chance:0.25},{id:'health_potion',chance:0.1}],
    skills:[
      {id:'regen',name:'Regenerate',dmg:-8,type:'heal',mp:0},
      {id:'club',name:'Club Smash',dmg:10,type:'physical',mp:0}
    ],
    aiType:'defensive', color:'#5a7a3a'
  },
  venomfang_serpent: {
    id:'venomfang_serpent', name:'Venomfang Serpent', icon:'🐍', level:3,
    hp:42, atk:8, def:3, xp:55, gold:[2,6],
    loot:[{id:'antidote',chance:0.35},{id:'mana_potion',chance:0.08}],
    skills:[
      {id:'venom_strike',name:'Venom Strike',dmg:8,type:'poison',mp:0,effect:'poison'},
      {id:'coil',name:'Constrict',dmg:11,type:'physical',mp:0}
    ],
    aiType:'aggressive', color:'#2a6a2a'
  },
  marsh_wraith: {
    id:'marsh_wraith', name:'Marsh Wraith', icon:'👻', level:3,
    hp:38, atk:9, def:2, xp:60, gold:[3,7],
    loot:[{id:'mana_potion',chance:0.18}],
    skills:[
      {id:'drain',name:'Life Drain',dmg:10,type:'magic',mp:0,lifesteal:true},
      {id:'terror',name:'Spectral Terror',dmg:0,type:'debuff',mp:0,effect:'reduce_def'}
    ],
    aiType:'magic', color:'#4a4a8a'
  },
  // BOSS zone 2
  bogmother: {
    id:'bogmother', name:"Bogmother, Marsh Queen", icon:'🧟', level:4,
    hp:150, atk:14, def:7, xp:180, gold:[24,42],
    loot:[{id:'steel_sword',chance:0.4},{id:'arcane_staff',chance:0.3},{id:'shadow_blades',chance:0.3},{id:'amulet_power',chance:0.2}],
    skills:[
      {id:'plague',name:'Plague Cloud',dmg:18,type:'poison',mp:0,effect:'poison'},
      {id:'summon_lurker',name:'Summon Lurker',dmg:0,type:'summon',mp:0},
      {id:'bog_slam',name:'Bog Slam',dmg:22,type:'physical',mp:0}
    ],
    aiType:'boss', boss:true, color:'#3a6a2a'
  },

  // === WEST ZONE: Moonfall Hollow (lv 2-5) ===
  moon_moth: {
    id:'moon_moth', name:'Moon Moth', icon:'M', level:2,
    hp:34, atk:6, def:2, xp:42, gold:[2,5],
    loot:[{id:'mana_potion',chance:0.12},{id:'bread',chance:0.25}],
    skills:[{id:'dust',name:'Glitter Dust',dmg:8,type:'magic',mp:0,effect:'reduce_atk'}],
    aiType:'magic', color:'#9db7ff'
  },
  thorn_pouncer: {
    id:'thorn_pouncer', name:'Thorn Pouncer', icon:'P', level:3,
    hp:48, atk:10, def:3, xp:62, gold:[3,7],
    loot:[{id:'bandage',chance:0.22},{id:'smoke_bomb',chance:0.08}],
    skills:[
      {id:'thorn_rake',name:'Thorn Rake',dmg:12,type:'physical',mp:0,effect:'bleed'},
      {id:'leap',name:'Leaping Bite',dmg:14,type:'physical',mp:0}
    ],
    aiType:'aggressive', color:'#476b2f'
  },
  hollow_cultist: {
    id:'hollow_cultist', name:'Hollow Cultist', icon:'C', level:4,
    hp:56, atk:13, def:4, xp:82, gold:[5,10],
    loot:[{id:'health_potion',chance:0.18},{id:'antidote',chance:0.2}],
    skills:[
      {id:'moon_hex',name:'Moon Hex',dmg:0,type:'debuff',mp:0,effect:'reduce_def'},
      {id:'ritual_bolt',name:'Ritual Bolt',dmg:18,type:'magic',mp:0}
    ],
    aiType:'magic', color:'#4c336b'
  },
  starved_treant: {
    id:'starved_treant', name:'Starved Treant', icon:'T', level:5,
    hp:90, atk:17, def:9, xp:105, gold:[7,14],
    loot:[{id:'greater_health_potion',chance:0.08},{id:'gloves_grip',chance:0.08}],
    skills:[
      {id:'root_slam',name:'Root Slam',dmg:24,type:'physical',mp:0},
      {id:'bark_mend',name:'Bark Mend',dmg:-18,type:'heal',mp:0}
    ],
    aiType:'defensive', color:'#5f4a24'
  },
  lunar_stag: {
    id:'lunar_stag', name:'Aurelion, Lunar Stag', icon:'S', level:6,
    hp:320, atk:26, def:12, xp:520, gold:[80,140],
    loot:[
      {id:'moonlit_cloak',chance:0.45},
      {id:'hollowthorn_ring',chance:0.4},
      {id:'eclipse_blade',chance:0.22},
      {id:'moonwell_scepter',chance:0.22},
      {id:'nightlord_wraps',chance:0.2},
      {id:'umbral_cloak',chance:0.18},
      {id:'starfall_crown',chance:0.08}
    ],
    skills:[
      {id:'moon_charge',name:'Moon Charge',dmg:38,type:'physical',mp:0,effect:'stun'},
      {id:'star_burst',name:'Star Burst',dmg:34,type:'magic',mp:0},
      {id:'lunar_grace',name:'Lunar Grace',dmg:-45,type:'heal',mp:0},
      {id:'silver_howl',name:'Silver Howl',dmg:0,type:'debuff',mp:0,effect:'reduce_all'}
    ],
    aiType:'boss', boss:true, color:'#d7d9ff', phases:[
      {hpPct:0.45, msg:'Aurelion lowers its antlers and calls down moonlight!', atkMult:1.35}
    ]
  },

  // === BOSS ONLY: Staffbreaker Peaks (lv 6-9) ===
  spark_ogre_magus: {
    id:'spark_ogre_magus', name:'Brakka, Spark Ogre Magus', icon:'B', level:6,
    hp:360, atk:28, def:12, xp:520, gold:[90,150],
    loot:[{id:'staff_of_unfair_sparks',chance:0.55},{id:'moonwell_scepter',chance:0.25},{id:'violet_warplate',chance:0.24},{id:'archon_grips',chance:0.22},{id:'greater_mana_potion',chance:0.5}],
    skills:[
      {id:'spark_clap',name:'Spark Clap',dmg:38,type:'magic',mp:0},
      {id:'ogre_focus',name:'Ogre Focus',dmg:-50,type:'heal',mp:0},
      {id:'static_bonk',name:'Static Bonk',dmg:42,type:'physical',mp:0,effect:'stun'}
    ],
    aiType:'boss', boss:true, color:'#6e4aa8', phases:[
      {hpPct:0.5, msg:'Brakka shakes sparks from the staff!', atkMult:1.25}
    ]
  },
  glass_dragon_adept: {
    id:'glass_dragon_adept', name:'Vyr, Glass Dragon Adept', icon:'V', level:8,
    hp:500, atk:36, def:16, xp:760, gold:[130,220],
    loot:[{id:'staff_of_boss_tears',chance:0.38},{id:'staff_of_unfair_sparks',chance:0.35},{id:'spellstorm_robes',chance:0.28},{id:'astral_treads',chance:0.24},{id:'heroic_mana_potion',chance:0.45}],
    skills:[
      {id:'glassfire',name:'Glassfire',dmg:56,type:'fire',mp:0},
      {id:'mirror_hex',name:'Mirror Hex',dmg:0,type:'debuff',mp:0,effect:'reduce_def'},
      {id:'shatter_cast',name:'Shatter Cast',dmg:68,type:'magic',mp:0}
    ],
    aiType:'boss', boss:true, color:'#6ed3ff', phases:[
      {hpPct:0.55, msg:'Vyr fractures into spell-bright reflections!', atkMult:1.35}
    ]
  },
  worldroot_archmage: {
    id:'worldroot_archmage', name:'Eldra, Worldroot Archmage', icon:'E', level:10,
    hp:760, atk:48, def:20, xp:1250, gold:[220,360],
    loot:[{id:'worldroot_archstaff',chance:0.28},{id:'staff_of_boss_tears',chance:0.5},{id:'voidbound_orb',chance:0.32},{id:'royal_boss_chain',chance:0.3},{id:'starfall_crown',chance:0.12}],
    skills:[
      {id:'rooted_starfall',name:'Rooted Starfall',dmg:78,type:'magic',mp:0},
      {id:'ancient_barrier',name:'Ancient Barrier',dmg:0,type:'buff',mp:0,effect:'reflect'},
      {id:'worldroot_mend',name:'Worldroot Mend',dmg:-90,type:'heal',mp:0},
      {id:'archmage_curse',name:'Archmage Curse',dmg:0,type:'debuff',mp:0,effect:'reduce_all'}
    ],
    aiType:'boss', boss:true, color:'#2f8a62', phases:[
      {hpPct:0.66, msg:'Eldra drinks power from the Worldroot!', atkMult:1.25},
      {hpPct:0.33, msg:'The archstaff blooms with impossible magic!', atkMult:1.5}
    ]
  },

  // === BOSS ONLY: Titan Crown Arena (lv 20) ===
  iron_titan_king: {
    id:'iron_titan_king', name:'Mordax, Iron Titan King', icon:'K', level:20,
    hp:2800, atk:95, def:48, xp:3500, gold:[600,900],
    loot:[{id:'mythic_heartplate',chance:0.45},{id:'titanbreaker_greatstaff',chance:0.25},{id:'eternity_chain',chance:0.28},{id:'heroic_health_potion',chance:0.7}],
    skills:[
      {id:'titan_cleave',name:'Titan Cleave',dmg:145,type:'physical',mp:0},
      {id:'crownquake',name:'Crownquake',dmg:120,type:'physical',mp:0,effect:'stun'},
      {id:'royal_armor',name:'Royal Armor',dmg:0,type:'buff',mp:0,effect:'reflect'}
    ],
    aiType:'boss', boss:true, color:'#8c7b5a', phases:[
      {hpPct:0.55, msg:'Mordax raises the titan crown and the arena shakes!', atkMult:1.35}
    ]
  },
  void_star_queen: {
    id:'void_star_queen', name:'Nysera, Void Star Queen', icon:'Q', level:20,
    hp:2400, atk:105, def:34, xp:3800, gold:[650,980],
    loot:[{id:'stormgod_handwraps',chance:0.42},{id:'crown_of_twenty_kings',chance:0.22},{id:'mythic_star_signet',chance:0.35},{id:'heroic_mana_potion',chance:0.7}],
    skills:[
      {id:'void_starfall',name:'Void Starfall',dmg:155,type:'magic',mp:0},
      {id:'queen_hex',name:'Queen Hex',dmg:0,type:'debuff',mp:0,effect:'reduce_all'},
      {id:'star_mending',name:'Star Mending',dmg:-180,type:'heal',mp:0}
    ],
    aiType:'boss', boss:true, color:'#5d37a8', phases:[
      {hpPct:0.6, msg:'Nysera opens a crown of void stars!', atkMult:1.3},
      {hpPct:0.3, msg:'The queen turns the sky hostile!', atkMult:1.5}
    ]
  },
  chrono_dragon_lord: {
    id:'chrono_dragon_lord', name:'Vaelux, Chrono Dragon Lord', icon:'D', level:20,
    hp:3200, atk:112, def:42, xp:4500, gold:[800,1200],
    loot:[{id:'titanbreaker_greatstaff',chance:0.5},{id:'crown_of_twenty_kings',chance:0.35},{id:'eternity_chain',chance:0.4},{id:'mythic_star_signet',chance:0.38}],
    skills:[
      {id:'time_breath',name:'Time Breath',dmg:170,type:'magic',mp:0,effect:'reduce_def'},
      {id:'ancient_claw',name:'Ancient Claw',dmg:150,type:'physical',mp:0},
      {id:'rewind_scales',name:'Rewind Scales',dmg:-220,type:'heal',mp:0},
      {id:'chrono_lock',name:'Chrono Lock',dmg:120,type:'magic',mp:0,effect:'stun'}
    ],
    aiType:'boss', boss:true, color:'#3158c9', phases:[
      {hpPct:0.7, msg:'Vaelux rewinds its wounds and accelerates time!', atkMult:1.25},
      {hpPct:0.35, msg:'Time fractures around the dragon lord!', atkMult:1.6}
    ]
  },

  // === ZONE 3: Ironspire Ruins (lv 3-6) ===
  stone_golem: {
    id:'stone_golem', name:'Stone Golem', icon:'🗿', level:3,
    hp:50, atk:10, def:5, xp:70, gold:[4,8],
    loot:[{id:'plate_armor',chance:0.1},{id:'iron_helm',chance:0.15}],
    skills:[{id:'slam',name:'Ground Slam',dmg:15,type:'physical',mp:0}],
    aiType:'defensive', color:'#7a7a8a'
  },
  dark_knight: {
    id:'dark_knight', name:'Dark Knight', icon:'🧟', level:4,
    hp:65, atk:13, def:7, xp:90, gold:[5,10],
    loot:[{id:'champions_blade',chance:0.1},{id:'tower_shield',chance:0.15},{id:'elixir_strength',chance:0.3}],
    skills:[
      {id:'dark_slash',name:'Dark Slash',dmg:20,type:'physical',mp:0},
      {id:'shield_bash',name:'Shield Bash',dmg:12,type:'physical',mp:0,effect:'stun'}
    ],
    aiType:'aggressive', color:'#2a2a4a'
  },
  fire_elemental: {
    id:'fire_elemental', name:'Fire Elemental', icon:'🔥', level:5,
    hp:58, atk:16, def:4, xp:105, gold:[6,12],
    loot:[{id:'arcane_robes',chance:0.1},{id:'orb_of_power',chance:0.12}],
    skills:[
      {id:'fireball',name:'Fireball',dmg:24,type:'fire',mp:0},
      {id:'flame_aura',name:'Flame Aura',dmg:12,type:'fire',mp:0}
    ],
    aiType:'magic', color:'#cc4400'
  },
  shadow_assassin: {
    id:'shadow_assassin', name:'Shadow Assassin', icon:'🥷', level:6,
    hp:55, atk:18, def:5, xp:115, gold:[7,14],
    loot:[{id:'assassin_daggers',chance:0.1},{id:'shadow_leathers',chance:0.12}],
    skills:[
      {id:'backstab',name:'Backstab',dmg:28,type:'physical',mp:0},
      {id:'smoke',name:'Vanish',dmg:0,type:'buff',mp:0,effect:'evade'}
    ],
    aiType:'aggressive', color:'#2a1a3a'
  },
  // BOSS zone 3
  the_iron_lich: {
    id:'the_iron_lich', name:'The Iron Lich', icon:'💀', level:7,
    hp:260, atk:24, def:11, xp:400, gold:[60,100],
    loot:[{id:'void_scepter',chance:0.35},{id:'amulet_power',chance:0.25},{id:'boots_haste',chance:0.3},{id:'violet_signet',chance:0.22},{id:'spellstorm_robes',chance:0.18}],
    skills:[
      {id:'death_bolt',name:'Death Bolt',dmg:34,type:'magic',mp:0},
      {id:'dark_ritual',name:'Dark Ritual',dmg:-45,type:'heal',mp:0},
      {id:'bone_storm',name:'Bone Storm',dmg:28,type:'magic',mp:0},
      {id:'curse',name:'Wither Curse',dmg:0,type:'debuff',mp:0,effect:'reduce_all'}
    ],
    aiType:'boss', boss:true, color:'#4a2a6a', phases:[
      {hpPct:0.5, msg:'The Iron Lich enters his second phase!', atkMult:1.5}
    ]
  },

  // === ZONE 4: Throne of Chaos (lv 6-9) ===
  chaos_demon: {
    id:'chaos_demon', name:'Chaos Demon', icon:'😈', level:6,
    hp:75, atk:20, def:8, xp:130, gold:[9,18],
    loot:[{id:'health_potion',chance:0.5},{id:'mana_potion',chance:0.4}],
    skills:[
      {id:'chaos_slash',name:'Chaos Slash',dmg:30,type:'magic',mp:0},
      {id:'inferno',name:'Inferno',dmg:24,type:'fire',mp:0}
    ],
    aiType:'aggressive', color:'#8a1a1a'
  },
  void_stalker: {
    id:'void_stalker', name:'Void Stalker', icon:'👾', level:7,
    hp:88, atk:23, def:7, xp:155, gold:[11,22],
    loot:[{id:'elixir_strength',chance:0.3}],
    skills:[
      {id:'void_rip',name:'Void Rip',dmg:36,type:'magic',mp:0},
      {id:'phase_shift',name:'Phase Shift',dmg:0,type:'buff',mp:0,effect:'evade'}
    ],
    aiType:'magic', color:'#1a1a5a'
  },
  infernal_guardian: {
    id:'infernal_guardian', name:'Infernal Guardian', icon:'🔱', level:9,
    hp:125, atk:28, def:13, xp:190, gold:[14,28],
    loot:[{id:'amulet_power',chance:0.15},{id:'gloves_grip',chance:0.3}],
    skills:[
      {id:'infernal_smash',name:'Infernal Smash',dmg:44,type:'physical',mp:0},
      {id:'magma_shield',name:'Magma Shield',dmg:0,type:'buff',mp:0,effect:'reflect'}
    ],
    aiType:'defensive', color:'#8a3a00'
  },
  // FINAL BOSS
  chaos_lord: {
    id:'chaos_lord', name:'Arak\'zoth, Lord of Chaos', icon:'👹', level:10,
    hp:520, atk:36, def:16, xp:900, gold:[140,240],
    loot:[{id:'void_scepter',chance:1},{id:'assassin_daggers',chance:0.8},{id:'champions_blade',chance:0.8},{id:'violet_warplate',chance:0.35},{id:'royal_boss_chain',chance:0.32},{id:'voidbound_orb',chance:0.28}],
    skills:[
      {id:'chaos_nova',name:'Chaos Nova',dmg:55,type:'magic',mp:0},
      {id:'soul_crush',name:'Soul Crush',dmg:70,type:'magic',mp:0},
      {id:'dark_heal',name:'Dark Restoration',dmg:-75,type:'heal',mp:0},
      {id:'chaos_storm',name:'Chaos Storm',dmg:45,type:'fire',mp:0},
      {id:'void_bolt',name:'Void Bolt',dmg:58,type:'magic',mp:0}
    ],
    aiType:'boss', boss:true, finalBoss:true, color:'#6a0a0a', phases:[
      {hpPct:0.66, msg:"Arak'zoth roars: 'You dare challenge me?!'", atkMult:1.3},
      {hpPct:0.33, msg:"Arak'zoth unleashes his true form!", atkMult:1.6}
    ]
  },

  // === ZONE 5: Sunken Abyss (lv 9-12) ===
  drowned_sailor: {
    id:'drowned_sailor', name:'Drowned Sailor', icon:'S', level:9,
    hp:120, atk:30, def:12, xp:210, gold:[18,34],
    loot:[{id:'greater_health_potion',chance:0.35},{id:'tidewalker_boots',chance:0.08}],
    skills:[
      {id:'rusty_hook',name:'Rusty Hook',dmg:45,type:'physical',mp:0,effect:'bleed'},
      {id:'cold_grip',name:'Cold Grip',dmg:36,type:'magic',mp:0,effect:'reduce_atk'}
    ],
    aiType:'aggressive', color:'#2b6f7f'
  },
  coral_guardian: {
    id:'coral_guardian', name:'Coral Guardian', icon:'G', level:10,
    hp:165, atk:34, def:18, xp:250, gold:[22,40],
    loot:[{id:'tideplate_cuirass',chance:0.08},{id:'leviathan_charm',chance:0.06},{id:'heroic_health_potion',chance:0.18}],
    skills:[
      {id:'reef_wall',name:'Reef Wall',dmg:0,type:'buff',mp:0,effect:'reflect'},
      {id:'coral_crush',name:'Coral Crush',dmg:55,type:'physical',mp:0}
    ],
    aiType:'defensive', color:'#b64f6f'
  },
  abyssal_mage: {
    id:'abyssal_mage', name:'Abyssal Mage', icon:'M', level:11,
    hp:130, atk:38, def:10, xp:275, gold:[24,44],
    loot:[{id:'stormcaller_rod',chance:0.08},{id:'astralweave_robes',chance:0.08},{id:'heroic_mana_potion',chance:0.22}],
    skills:[
      {id:'tidal_bolt',name:'Tidal Bolt',dmg:60,type:'magic',mp:0},
      {id:'mind_sink',name:'Mind Sink',dmg:0,type:'debuff',mp:0,effect:'reduce_def'},
      {id:'deep_mending',name:'Deep Mending',dmg:-60,type:'heal',mp:0}
    ],
    aiType:'magic', color:'#215a9a'
  },
  tide_assassin: {
    id:'tide_assassin', name:'Tide Assassin', icon:'A', level:11,
    hp:135, atk:41, def:11, xp:290, gold:[26,46],
    loot:[{id:'reefrazor_twins',chance:0.08},{id:'duskstalker_jacket',chance:0.08},{id:'smoke_bomb',chance:0.2}],
    skills:[
      {id:'undertow_stab',name:'Undertow Stab',dmg:64,type:'physical',mp:0,effect:'poison'},
      {id:'mist_vanish',name:'Mist Vanish',dmg:0,type:'buff',mp:0,effect:'evade'}
    ],
    aiType:'aggressive', color:'#17324c'
  },
  pearl_colossus: {
    id:'pearl_colossus', name:'Pearl Colossus', icon:'C', level:12,
    hp:220, atk:46, def:22, xp:340, gold:[32,58],
    loot:[{id:'crown_of_depths',chance:0.09},{id:'pearl_of_focus',chance:0.08},{id:'storm_elixir',chance:0.18}],
    skills:[
      {id:'shellquake',name:'Shellquake',dmg:72,type:'physical',mp:0,effect:'stun'},
      {id:'pearl_flash',name:'Pearl Flash',dmg:58,type:'magic',mp:0,effect:'reduce_atk'}
    ],
    aiType:'defensive', color:'#d6d6c2'
  },
  abyss_leviathan: {
    id:'abyss_leviathan', name:'Thalrassa, Abyss Leviathan', icon:'L', level:13,
    hp:850, atk:55, def:24, xp:1500, gold:[260,420],
    loot:[{id:'sunken_trident',chance:0.65},{id:'stormcaller_rod',chance:0.55},{id:'reefrazor_twins',chance:0.55},{id:'crown_of_depths',chance:0.4},{id:'leviathan_charm',chance:0.45},{id:'astral_treads',chance:0.4},{id:'nightlord_wraps',chance:0.36},{id:'umbral_cloak',chance:0.34},{id:'voidbound_orb',chance:0.32}],
    skills:[
      {id:'maelstrom',name:'Maelstrom',dmg:70,type:'magic',mp:0},
      {id:'crushing_depths',name:'Crushing Depths',dmg:85,type:'physical',mp:0,effect:'stun'},
      {id:'abyssal_roar',name:'Abyssal Roar',dmg:0,type:'debuff',mp:0,effect:'reduce_all'},
      {id:'ancient_regen',name:'Ancient Regeneration',dmg:-100,type:'heal',mp:0},
      {id:'black_tide',name:'Black Tide',dmg:65,type:'poison',mp:0,effect:'poison'}
    ],
    aiType:'boss', boss:true, color:'#05263d', phases:[
      {hpPct:0.7, msg:'Thalrassa dives, then erupts in a wall of black water!', atkMult:1.25},
      {hpPct:0.35, msg:'The abyss answers Thalrassa with a final storm!', atkMult:1.55}
    ]
  }
};
