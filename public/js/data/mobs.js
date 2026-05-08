// Monster database
const MOBS = {
  // === ZONE 1: Greenwood Vale (lv 1-5) ===
  forest_rat: {
    id:'forest_rat', name:'Forest Rat', icon:'🐀', level:1,
    hp:18, atk:3, def:1, xp:25, gold:[0,2],
    loot:[{id:'bread',chance:0.3}],
    skills:[], aiType:'basic',
    color:'#8B6914', sprite:'enemies/enemy_06.png'
  },
  goblin_scout: {
    id:'goblin_scout', name:'Goblin Scout', icon:'👺', level:2,
    hp:28, atk:5, def:2, xp:40, gold:[1,4],
    loot:[{id:'bandage',chance:0.25},{id:'health_potion',chance:0.1}],
    skills:[{id:'stab',name:'Stab',dmg:8,type:'physical',mp:0}],
    aiType:'basic', color:'#4a7a4a', sprite:'enemies/enemy_05.png'
  },
  forest_wolf: {
    id:'forest_wolf', name:'Forest Wolf', icon:'🐺', level:3,
    hp:40, atk:8, def:3, xp:60, gold:[1,5],
    loot:[{id:'health_potion',chance:0.2}],
    skills:[{id:'bite',name:'Bite',dmg:12,type:'physical',mp:0,effect:'bleed'}],
    aiType:'aggressive', color:'#6a6a8a', sprite:'enemies/enemy_08.png'
  },
  giant_spider: {
    id:'giant_spider', name:'Giant Spider', icon:'🕷️', level:4,
    hp:50, atk:10, def:4, xp:28, gold:[2,6],
    loot:[{id:'antidote',chance:0.4},{id:'mana_potion',chance:0.1}],
    skills:[{id:'poison',name:'Venom Bite',dmg:8,type:'poison',mp:0,effect:'poison'}],
    aiType:'basic', color:'#4a2a6a', sprite:'enemies/enemy_20.png'
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
    aiType:'boss', boss:true, color:'#8a4a2a', sprite:'enemies/enemy_09.png'
  },

  // === ZONE 2: Ashfen Marshes (lv 5-10) ===
  bog_lurker: {
    id:'bog_lurker', name:'Bog Lurker', icon:'🐊', level:1,
    hp:24, atk:4, def:1, xp:30, gold:[1,3],
    loot:[{id:'bread',chance:0.25},{id:'health_potion',chance:0.08}],
    skills:[{id:'drag',name:'Drag Under',dmg:7,type:'physical',mp:0}],
    aiType:'basic', color:'#3a5a2a', sprite:'enemies/enemy_10.png'
  },
  swamp_troll: {
    id:'swamp_troll', name:'Swamp Troll', icon:'👹', level:2,
    hp:36, atk:6, def:2, xp:42, gold:[2,5],
    loot:[{id:'bandage',chance:0.25},{id:'health_potion',chance:0.1}],
    skills:[
      {id:'regen',name:'Regenerate',dmg:-8,type:'heal',mp:0},
      {id:'club',name:'Club Smash',dmg:10,type:'physical',mp:0}
    ],
    aiType:'defensive', color:'#5a7a3a', sprite:'enemies/enemy_07.png'
  },
  venomfang_serpent: {
    id:'venomfang_serpent', name:'Venomfang Serpent', icon:'🐍', level:3,
    hp:42, atk:8, def:3, xp:55, gold:[2,6],
    loot:[{id:'antidote',chance:0.35},{id:'mana_potion',chance:0.08}],
    skills:[
      {id:'venom_strike',name:'Venom Strike',dmg:8,type:'poison',mp:0,effect:'poison'},
      {id:'coil',name:'Constrict',dmg:11,type:'physical',mp:0}
    ],
    aiType:'aggressive', color:'#2a6a2a', sprite:'enemies/enemy_15.png'
  },
  marsh_wraith: {
    id:'marsh_wraith', name:'Marsh Wraith', icon:'👻', level:3,
    hp:38, atk:9, def:2, xp:60, gold:[3,7],
    loot:[{id:'mana_potion',chance:0.18}],
    skills:[
      {id:'drain',name:'Life Drain',dmg:10,type:'magic',mp:0,lifesteal:true},
      {id:'terror',name:'Spectral Terror',dmg:0,type:'debuff',mp:0,effect:'reduce_def'}
    ],
    aiType:'magic', color:'#4a4a8a', sprite:'enemies/enemy_31.png'
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
    aiType:'boss', boss:true, color:'#3a6a2a', sprite:'enemies/enemy_03.png'
  },

  // === WEST ZONE: Moonfall Hollow (lv 2-5) ===
  moon_moth: {
    id:'moon_moth', name:'Moon Moth', icon:'M', level:2,
    hp:34, atk:6, def:2, xp:42, gold:[2,5],
    loot:[{id:'mana_potion',chance:0.12},{id:'bread',chance:0.25}],
    skills:[{id:'dust',name:'Glitter Dust',dmg:8,type:'magic',mp:0,effect:'reduce_atk'}],
    aiType:'magic', color:'#9db7ff', sprite:'enemies/enemy_01.png'
  },
  thorn_pouncer: {
    id:'thorn_pouncer', name:'Thorn Pouncer', icon:'P', level:3,
    hp:48, atk:10, def:3, xp:62, gold:[3,7],
    loot:[{id:'bandage',chance:0.22},{id:'smoke_bomb',chance:0.08}],
    skills:[
      {id:'thorn_rake',name:'Thorn Rake',dmg:12,type:'physical',mp:0,effect:'bleed'},
      {id:'leap',name:'Leaping Bite',dmg:14,type:'physical',mp:0}
    ],
    aiType:'aggressive', color:'#476b2f', sprite:'enemies/enemy_14.png'
  },
  hollow_cultist: {
    id:'hollow_cultist', name:'Hollow Cultist', icon:'C', level:4,
    hp:56, atk:13, def:4, xp:82, gold:[5,10],
    loot:[{id:'health_potion',chance:0.18},{id:'antidote',chance:0.2}],
    skills:[
      {id:'moon_hex',name:'Moon Hex',dmg:0,type:'debuff',mp:0,effect:'reduce_def'},
      {id:'ritual_bolt',name:'Ritual Bolt',dmg:18,type:'magic',mp:0}
    ],
    aiType:'magic', color:'#4c336b', sprite:'enemies/enemy_02.png'
  },
  starved_treant: {
    id:'starved_treant', name:'Starved Treant', icon:'T', level:5,
    hp:90, atk:17, def:9, xp:105, gold:[7,14],
    loot:[{id:'greater_health_potion',chance:0.08},{id:'gloves_grip',chance:0.08}],
    skills:[
      {id:'root_slam',name:'Root Slam',dmg:24,type:'physical',mp:0},
      {id:'bark_mend',name:'Bark Mend',dmg:-18,type:'heal',mp:0}
    ],
    aiType:'defensive', color:'#5f4a24', sprite:'enemies/enemy_21.png'
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
    aiType:'boss', boss:true, color:'#d7d9ff', sprite:'enemies/enemy_16.png', phases:[
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
    aiType:'boss', boss:true, color:'#6e4aa8', sprite:'enemies/enemy_07.png', phases:[
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
    aiType:'boss', boss:true, color:'#6ed3ff', sprite:'enemies/enemy_11.png', phases:[
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
    aiType:'boss', boss:true, color:'#2f8a62', sprite:'enemies/enemy_16.png', phases:[
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
    aiType:'boss', boss:true, color:'#8c7b5a', sprite:'enemies/enemy_30.png', phases:[
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
    aiType:'boss', boss:true, color:'#5d37a8', sprite:'enemies/enemy_32.png', phases:[
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
    aiType:'boss', boss:true, color:'#3158c9', sprite:'enemies/enemy_25.png', phases:[
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
    aiType:'defensive', color:'#7a7a8a', sprite:'enemies/enemy_04.png'
  },
  dark_knight: {
    id:'dark_knight', name:'Dark Knight', icon:'🧟', level:4,
    hp:65, atk:13, def:7, xp:90, gold:[5,10],
    loot:[{id:'champions_blade',chance:0.1},{id:'tower_shield',chance:0.15},{id:'elixir_strength',chance:0.3}],
    skills:[
      {id:'dark_slash',name:'Dark Slash',dmg:20,type:'physical',mp:0},
      {id:'shield_bash',name:'Shield Bash',dmg:12,type:'physical',mp:0,effect:'stun'}
    ],
    aiType:'aggressive', color:'#2a2a4a', sprite:'enemies/enemy_24.png'
  },
  fire_elemental: {
    id:'fire_elemental', name:'Fire Elemental', icon:'🔥', level:5,
    hp:58, atk:16, def:4, xp:105, gold:[6,12],
    loot:[{id:'arcane_robes',chance:0.1},{id:'orb_of_power',chance:0.12}],
    skills:[
      {id:'fireball',name:'Fireball',dmg:24,type:'fire',mp:0},
      {id:'flame_aura',name:'Flame Aura',dmg:12,type:'fire',mp:0}
    ],
    aiType:'magic', color:'#cc4400', sprite:'enemies/enemy_13.png'
  },
  shadow_assassin: {
    id:'shadow_assassin', name:'Shadow Assassin', icon:'🥷', level:6,
    hp:55, atk:18, def:5, xp:115, gold:[7,14],
    loot:[{id:'assassin_daggers',chance:0.1},{id:'shadow_leathers',chance:0.12}],
    skills:[
      {id:'backstab',name:'Backstab',dmg:28,type:'physical',mp:0},
      {id:'smoke',name:'Vanish',dmg:0,type:'buff',mp:0,effect:'evade'}
    ],
    aiType:'aggressive', color:'#2a1a3a', sprite:'enemies/enemy_12.png'
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
    aiType:'boss', boss:true, color:'#4a2a6a', sprite:'enemies/enemy_29.png', phases:[
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
    aiType:'aggressive', color:'#8a1a1a', sprite:'enemies/enemy_17.png'
  },
  void_stalker: {
    id:'void_stalker', name:'Void Stalker', icon:'👾', level:7,
    hp:88, atk:23, def:7, xp:155, gold:[11,22],
    loot:[{id:'elixir_strength',chance:0.3}],
    skills:[
      {id:'void_rip',name:'Void Rip',dmg:36,type:'magic',mp:0},
      {id:'phase_shift',name:'Phase Shift',dmg:0,type:'buff',mp:0,effect:'evade'}
    ],
    aiType:'magic', color:'#1a1a5a', sprite:'enemies/enemy_26.png'
  },
  infernal_guardian: {
    id:'infernal_guardian', name:'Infernal Guardian', icon:'🔱', level:9,
    hp:125, atk:28, def:13, xp:190, gold:[14,28],
    loot:[{id:'amulet_power',chance:0.15},{id:'gloves_grip',chance:0.3}],
    skills:[
      {id:'infernal_smash',name:'Infernal Smash',dmg:44,type:'physical',mp:0},
      {id:'magma_shield',name:'Magma Shield',dmg:0,type:'buff',mp:0,effect:'reflect'}
    ],
    aiType:'defensive', color:'#8a3a00', sprite:'enemies/enemy_22.png'
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
    aiType:'boss', boss:true, finalBoss:true, color:'#6a0a0a', sprite:'enemies/enemy_25.png', phases:[
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
    aiType:'aggressive', color:'#2b6f7f', sprite:'enemies/enemy_28.png'
  },
  coral_guardian: {
    id:'coral_guardian', name:'Coral Guardian', icon:'G', level:10,
    hp:165, atk:34, def:18, xp:250, gold:[22,40],
    loot:[{id:'tideplate_cuirass',chance:0.08},{id:'leviathan_charm',chance:0.06},{id:'heroic_health_potion',chance:0.18}],
    skills:[
      {id:'reef_wall',name:'Reef Wall',dmg:0,type:'buff',mp:0,effect:'reflect'},
      {id:'coral_crush',name:'Coral Crush',dmg:55,type:'physical',mp:0}
    ],
    aiType:'defensive', color:'#b64f6f', sprite:'enemies/enemy_11.png'
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
    aiType:'magic', color:'#215a9a', sprite:'enemies/enemy_26.png'
  },
  tide_assassin: {
    id:'tide_assassin', name:'Tide Assassin', icon:'A', level:11,
    hp:135, atk:41, def:11, xp:290, gold:[26,46],
    loot:[{id:'reefrazor_twins',chance:0.08},{id:'duskstalker_jacket',chance:0.08},{id:'smoke_bomb',chance:0.2}],
    skills:[
      {id:'undertow_stab',name:'Undertow Stab',dmg:64,type:'physical',mp:0,effect:'poison'},
      {id:'mist_vanish',name:'Mist Vanish',dmg:0,type:'buff',mp:0,effect:'evade'}
    ],
    aiType:'aggressive', color:'#17324c', sprite:'enemies/enemy_18.png'
  },
  pearl_colossus: {
    id:'pearl_colossus', name:'Pearl Colossus', icon:'C', level:12,
    hp:220, atk:46, def:22, xp:340, gold:[32,58],
    loot:[{id:'crown_of_depths',chance:0.09},{id:'pearl_of_focus',chance:0.08},{id:'storm_elixir',chance:0.18}],
    skills:[
      {id:'shellquake',name:'Shellquake',dmg:72,type:'physical',mp:0,effect:'stun'},
      {id:'pearl_flash',name:'Pearl Flash',dmg:58,type:'magic',mp:0,effect:'reduce_atk'}
    ],
    aiType:'defensive', color:'#d6d6c2', sprite:'enemies/enemy_27.png'
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
    aiType:'boss', boss:true, color:'#05263d', sprite:'enemies/enemy_20.png', phases:[
      {hpPct:0.7, msg:'Thalrassa dives, then erupts in a wall of black water!', atkMult:1.25},
      {hpPct:0.35, msg:'The abyss answers Thalrassa with a final storm!', atkMult:1.55}
    ]
  },

  // === GLOOMCRAG CAVERNS (lv 3-7) ===
  cave_bat: {
    id:'cave_bat', name:'Cave Bat', icon:'🦇', level:3,
    hp:30, atk:7, def:2, xp:48, gold:[1,4],
    loot:[{id:'bandage',chance:0.2},{id:'mushroom_brew',chance:0.07}],
    skills:[{id:'screech',name:'Screech',dmg:0,type:'debuff',mp:0,effect:'reduce_atk'}],
    aiType:'aggressive', color:'#3a2a4a', sprite:'enemies/enemy_15.png'
  },
  crystal_crawler: {
    id:'crystal_crawler', name:'Crystal Crawler', icon:'🦀', level:4,
    hp:58, atk:9, def:8, xp:68, gold:[2,6],
    loot:[{id:'cave_pearl_ring',chance:0.06},{id:'health_potion',chance:0.15}],
    skills:[{id:'crystal_shell',name:'Crystal Shell',dmg:0,type:'buff',mp:0,effect:'reflect'}],
    aiType:'defensive', color:'#4a6a9a', sprite:'enemies/enemy_11.png'
  },
  gloom_gnoll: {
    id:'gloom_gnoll', name:'Gloom Gnoll', icon:'👺', level:5,
    hp:72, atk:14, def:5, xp:92, gold:[4,9],
    loot:[{id:'health_potion',chance:0.15},{id:'gloom_carapace',chance:0.04}],
    skills:[
      {id:'gnoll_rend',name:'Gnoll Rend',dmg:18,type:'physical',mp:0,effect:'bleed'},
      {id:'gnoll_howl',name:'Pack Howl',dmg:0,type:'debuff',mp:0,effect:'reduce_def'}
    ],
    aiType:'aggressive', color:'#5a4a2a', sprite:'enemies/enemy_23.png'
  },
  deep_mushroom_shaman: {
    id:'deep_mushroom_shaman', name:'Mushroom Shaman', icon:'🍄', level:6,
    hp:62, atk:15, def:4, xp:110, gold:[5,11],
    loot:[{id:'mushroom_brew',chance:0.3},{id:'mana_potion',chance:0.2}],
    skills:[
      {id:'spore_cloud',name:'Spore Cloud',dmg:16,type:'poison',mp:0,effect:'poison'},
      {id:'mycelium_heal',name:'Mycelium Heal',dmg:-22,type:'heal',mp:0}
    ],
    aiType:'magic', color:'#7a5a3a', sprite:'enemies/enemy_21.png'
  },
  cave_mimic: {
    id:'cave_mimic', name:'??? CHEST ???', icon:'📦', level:5,
    hp:90, atk:20, def:6, xp:200, gold:[45,90],
    encounterMsg: "You reach for what looked like a chest. It reaches back.",
    loot:[{id:'mimic_key',chance:1},{id:'cave_pearl_ring',chance:0.28},{id:'elixir_strength',chance:0.45}],
    skills:[
      {id:'chomp',name:'Chomp!',dmg:28,type:'physical',mp:0,effect:'stun'},
      {id:'lid_slam',name:'Lid Slam',dmg:22,type:'physical',mp:0}
    ],
    aiType:'aggressive', color:'#8a6a2a', sprite:'enemies/enemy_27.png'
  },
  tiny_murloc: {
    id:'tiny_murloc', name:'Mrggl', icon:'🐟', level:1,
    hp:6, atk:1, def:0, xp:1, gold:[0,0],
    encounterMsg: "A tiny fish-man stares up at you. 'Mrggl?' This seems wrong.",
    loot:[{id:'mrggl_idol',chance:0.04},{id:'bread',chance:1}],
    skills:[],
    aiType:'basic', color:'#4a9a4a', sprite:'enemies/enemy_06.png'
  },
  grubtha_cave_matriarch: {
    id:'grubtha_cave_matriarch', name:'Grubtha, Cave Matriarch', icon:'🕷️', level:7,
    hp:390, atk:28, def:14, xp:640, gold:[100,165],
    loot:[
      {id:'crystal_spire_shard',chance:0.45},
      {id:'gloom_carapace',chance:0.38},
      {id:'cave_charm',chance:0.35},
      {id:'cave_pearl_ring',chance:0.32},
      {id:'greater_health_potion',chance:0.65}
    ],
    skills:[
      {id:'web_trap',name:'Web Trap',dmg:0,type:'debuff',mp:0,effect:'reduce_atk'},
      {id:'venom_lunge',name:'Venom Lunge',dmg:36,type:'poison',mp:0,effect:'poison'},
      {id:'silk_shield',name:'Silk Shield',dmg:0,type:'buff',mp:0,effect:'reflect'},
      {id:'eight_leg_sweep',name:'Eight-Leg Sweep',dmg:44,type:'physical',mp:0,effect:'stun'}
    ],
    aiType:'boss', boss:true, color:'#2a1a3a', sprite:'enemies/enemy_20.png', phases:[
      {hpPct:0.5, msg:"Grubtha sheds her carapace — she's faster now!", atkMult:1.4}
    ]
  },

  // === CINDERPEAK FORGE (lv 7-11) ===
  fire_imp: {
    id:'fire_imp', name:'Fire Imp', icon:'😈', level:7,
    hp:74, atk:22, def:6, xp:135, gold:[8,17],
    loot:[{id:'health_potion',chance:0.3},{id:'mana_potion',chance:0.25}],
    skills:[
      {id:'imp_spark',name:'Imp Spark',dmg:28,type:'fire',mp:0},
      {id:'cackling_jig',name:'Cackling Jig',dmg:0,type:'debuff',mp:0,effect:'reduce_def'}
    ],
    aiType:'aggressive', color:'#cc4400', sprite:'enemies/enemy_19.png'
  },
  lava_salamander: {
    id:'lava_salamander', name:'Lava Salamander', icon:'🦎', level:8,
    hp:115, atk:26, def:9, xp:175, gold:[12,23],
    loot:[{id:'magma_pick',chance:0.04},{id:'health_potion',chance:0.2}],
    skills:[
      {id:'lava_breath',name:'Lava Breath',dmg:32,type:'fire',mp:0},
      {id:'molten_skin',name:'Molten Skin',dmg:-30,type:'heal',mp:0}
    ],
    aiType:'defensive', color:'#aa3300', sprite:'enemies/enemy_13.png'
  },
  cinder_golem: {
    id:'cinder_golem', name:'Cinder Golem', icon:'🗿', level:9,
    hp:170, atk:30, def:16, xp:225, gold:[16,30],
    loot:[{id:'ashplate',chance:0.06},{id:'greater_health_potion',chance:0.2}],
    skills:[
      {id:'cinder_slam',name:'Cinder Slam',dmg:46,type:'physical',mp:0},
      {id:'ember_shield',name:'Ember Shield',dmg:0,type:'buff',mp:0,effect:'reflect'}
    ],
    aiType:'defensive', color:'#6a3a00', sprite:'enemies/enemy_04.png'
  },
  magma_wraith: {
    id:'magma_wraith', name:'Magma Wraith', icon:'👻', level:10,
    hp:132, atk:34, def:8, xp:255, gold:[18,35],
    loot:[{id:'emberstone_wand',chance:0.05},{id:'mana_potion',chance:0.25}],
    skills:[
      {id:'lava_drain',name:'Lava Drain',dmg:38,type:'magic',mp:0,lifesteal:true},
      {id:'magma_hex',name:'Magma Hex',dmg:0,type:'debuff',mp:0,effect:'reduce_all'}
    ],
    aiType:'magic', color:'#aa2200', sprite:'enemies/enemy_32.png'
  },
  embrix_ashen_drake: {
    id:'embrix_ashen_drake', name:'Embrix, Ashen Drake', icon:'🐉', level:11,
    hp:830, atk:52, def:22, xp:1420, gold:[245,410],
    loot:[
      {id:'magma_pick',chance:0.5},
      {id:'emberstone_wand',chance:0.5},
      {id:'cinder_fangs',chance:0.5},
      {id:'ashplate',chance:0.42},
      {id:'lava_band',chance:0.4},
      {id:'heat_cloak',chance:0.38},
      {id:'heroic_health_potion',chance:0.65}
    ],
    skills:[
      {id:'ash_breath',name:'Ash Breath',dmg:68,type:'fire',mp:0},
      {id:'wing_buffet',name:'Wing Buffet',dmg:54,type:'physical',mp:0,effect:'stun'},
      {id:'drake_fire_heal',name:'Drake Healing Fire',dmg:-80,type:'heal',mp:0},
      {id:'inferno_claw',name:'Inferno Claw',dmg:72,type:'fire',mp:0,effect:'reduce_def'}
    ],
    aiType:'boss', boss:true, color:'#5a1500', sprite:'enemies/enemy_22.png', phases:[
      {hpPct:0.6, msg:'Embrix roars and the forge erupts — it\'s getting HOT!', atkMult:1.3},
      {hpPct:0.3, msg:"The drake's scales glow white-hot. Probably fine.", atkMult:1.5}
    ]
  }
};
