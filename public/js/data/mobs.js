// Monster database
const MOBS = {
  // === ZONE 1: Greenwood Vale (lv 1-5) ===
  forest_rat: {
    id:'forest_rat', name:'Forest Rat', icon:'🐀', level:1,
    hp:18, atk:3, def:1, xp:8, gold:[0,2],
    loot:[{id:'bread',chance:0.3}],
    skills:[], aiType:'basic',
    color:'#8B6914'
  },
  goblin_scout: {
    id:'goblin_scout', name:'Goblin Scout', icon:'👺', level:2,
    hp:28, atk:5, def:2, xp:14, gold:[1,4],
    loot:[{id:'bandage',chance:0.25},{id:'health_potion',chance:0.1}],
    skills:[{id:'stab',name:'Stab',dmg:8,type:'physical',mp:0}],
    aiType:'basic', color:'#4a7a4a'
  },
  forest_wolf: {
    id:'forest_wolf', name:'Forest Wolf', icon:'🐺', level:3,
    hp:40, atk:8, def:3, xp:20, gold:[1,5],
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
    id:'bog_lurker', name:'Bog Lurker', icon:'🐊', level:5,
    hp:70, atk:14, def:7, xp:38, gold:[3,8],
    loot:[{id:'health_potion',chance:0.3}],
    skills:[{id:'drag',name:'Drag Under',dmg:16,type:'physical',mp:0}],
    aiType:'basic', color:'#3a5a2a'
  },
  swamp_troll: {
    id:'swamp_troll', name:'Swamp Troll', icon:'👹', level:7,
    hp:110, atk:18, def:10, xp:55, gold:[4,10],
    loot:[{id:'elixir_strength',chance:0.2},{id:'iron_shield',chance:0.1}],
    skills:[
      {id:'regen',name:'Regenerate',dmg:-20,type:'heal',mp:0},
      {id:'club',name:'Club Smash',dmg:25,type:'physical',mp:0}
    ],
    aiType:'defensive', color:'#5a7a3a'
  },
  venomfang_serpent: {
    id:'venomfang_serpent', name:'Venomfang Serpent', icon:'🐍', level:8,
    hp:90, atk:20, def:8, xp:60, gold:[5,12],
    loot:[{id:'antidote',chance:0.5},{id:'mana_potion',chance:0.2}],
    skills:[
      {id:'venom_strike',name:'Venom Strike',dmg:18,type:'poison',mp:0,effect:'poison'},
      {id:'coil',name:'Constrict',dmg:22,type:'physical',mp:0}
    ],
    aiType:'aggressive', color:'#2a6a2a'
  },
  marsh_wraith: {
    id:'marsh_wraith', name:'Marsh Wraith', icon:'👻', level:9,
    hp:80, atk:22, def:5, xp:68, gold:[6,14],
    loot:[{id:'mana_potion',chance:0.35}],
    skills:[
      {id:'drain',name:'Life Drain',dmg:20,type:'magic',mp:0,lifesteal:true},
      {id:'terror',name:'Spectral Terror',dmg:0,type:'debuff',mp:0,effect:'reduce_def'}
    ],
    aiType:'magic', color:'#4a4a8a'
  },
  // BOSS zone 2
  bogmother: {
    id:'bogmother', name:"Bogmother, Marsh Queen", icon:'🧟', level:10,
    hp:450, atk:28, def:14, xp:300, gold:[40,70],
    loot:[{id:'steel_sword',chance:0.4},{id:'arcane_staff',chance:0.3},{id:'shadow_blades',chance:0.3},{id:'amulet_power',chance:0.2}],
    skills:[
      {id:'plague',name:'Plague Cloud',dmg:35,type:'poison',mp:0,effect:'poison'},
      {id:'summon_lurker',name:'Summon Lurker',dmg:0,type:'summon',mp:0},
      {id:'bog_slam',name:'Bog Slam',dmg:45,type:'physical',mp:0}
    ],
    aiType:'boss', boss:true, color:'#3a6a2a'
  },

  // === ZONE 3: Ironspire Ruins (lv 10-18) ===
  stone_golem: {
    id:'stone_golem', name:'Stone Golem', icon:'🗿', level:11,
    hp:180, atk:28, def:20, xp:95, gold:[8,16],
    loot:[{id:'plate_armor',chance:0.1},{id:'iron_helm',chance:0.15}],
    skills:[{id:'slam',name:'Ground Slam',dmg:40,type:'physical',mp:0}],
    aiType:'defensive', color:'#7a7a8a'
  },
  dark_knight: {
    id:'dark_knight', name:'Dark Knight', icon:'🧟', level:13,
    hp:200, atk:32, def:18, xp:115, gold:[10,20],
    loot:[{id:'champions_blade',chance:0.1},{id:'tower_shield',chance:0.15},{id:'elixir_strength',chance:0.3}],
    skills:[
      {id:'dark_slash',name:'Dark Slash',dmg:45,type:'physical',mp:0},
      {id:'shield_bash',name:'Shield Bash',dmg:30,type:'physical',mp:0,effect:'stun'}
    ],
    aiType:'aggressive', color:'#2a2a4a'
  },
  fire_elemental: {
    id:'fire_elemental', name:'Fire Elemental', icon:'🔥', level:15,
    hp:170, atk:36, def:10, xp:130, gold:[12,22],
    loot:[{id:'arcane_robes',chance:0.1},{id:'orb_of_power',chance:0.12}],
    skills:[
      {id:'fireball',name:'Fireball',dmg:50,type:'fire',mp:0},
      {id:'flame_aura',name:'Flame Aura',dmg:20,type:'fire',mp:0}
    ],
    aiType:'magic', color:'#cc4400'
  },
  shadow_assassin: {
    id:'shadow_assassin', name:'Shadow Assassin', icon:'🥷', level:16,
    hp:160, atk:42, def:12, xp:140, gold:[14,24],
    loot:[{id:'assassin_daggers',chance:0.1},{id:'shadow_leathers',chance:0.12}],
    skills:[
      {id:'backstab',name:'Backstab',dmg:65,type:'physical',mp:0},
      {id:'smoke',name:'Vanish',dmg:0,type:'buff',mp:0,effect:'evade'}
    ],
    aiType:'aggressive', color:'#2a1a3a'
  },
  // BOSS zone 3
  the_iron_lich: {
    id:'the_iron_lich', name:'The Iron Lich', icon:'💀', level:18,
    hp:900, atk:48, def:22, xp:600, gold:[100,160],
    loot:[{id:'void_scepter',chance:0.35},{id:'amulet_power',chance:0.25},{id:'boots_haste',chance:0.3}],
    skills:[
      {id:'death_bolt',name:'Death Bolt',dmg:70,type:'magic',mp:0},
      {id:'dark_ritual',name:'Dark Ritual',dmg:-100,type:'heal',mp:0},
      {id:'bone_storm',name:'Bone Storm',dmg:55,type:'magic',mp:0},
      {id:'curse',name:'Wither Curse',dmg:0,type:'debuff',mp:0,effect:'reduce_all'}
    ],
    aiType:'boss', boss:true, color:'#4a2a6a', phases:[
      {hpPct:0.5, msg:'The Iron Lich enters his second phase!', atkMult:1.5}
    ]
  },

  // === ZONE 4: Throne of Chaos (lv 18-25) ===
  chaos_demon: {
    id:'chaos_demon', name:'Chaos Demon', icon:'😈', level:19,
    hp:260, atk:52, def:24, xp:180, gold:[18,30],
    loot:[{id:'health_potion',chance:0.5},{id:'mana_potion',chance:0.4}],
    skills:[
      {id:'chaos_slash',name:'Chaos Slash',dmg:65,type:'magic',mp:0},
      {id:'inferno',name:'Inferno',dmg:55,type:'fire',mp:0}
    ],
    aiType:'aggressive', color:'#8a1a1a'
  },
  void_stalker: {
    id:'void_stalker', name:'Void Stalker', icon:'👾', level:21,
    hp:300, atk:58, def:20, xp:220, gold:[22,36],
    loot:[{id:'elixir_strength',chance:0.3}],
    skills:[
      {id:'void_rip',name:'Void Rip',dmg:75,type:'magic',mp:0},
      {id:'phase_shift',name:'Phase Shift',dmg:0,type:'buff',mp:0,effect:'evade'}
    ],
    aiType:'magic', color:'#1a1a5a'
  },
  infernal_guardian: {
    id:'infernal_guardian', name:'Infernal Guardian', icon:'🔱', level:23,
    hp:380, atk:65, def:30, xp:270, gold:[28,45],
    loot:[{id:'amulet_power',chance:0.15},{id:'gloves_grip',chance:0.3}],
    skills:[
      {id:'infernal_smash',name:'Infernal Smash',dmg:90,type:'physical',mp:0},
      {id:'magma_shield',name:'Magma Shield',dmg:0,type:'buff',mp:0,effect:'reflect'}
    ],
    aiType:'defensive', color:'#8a3a00'
  },
  // FINAL BOSS
  chaos_lord: {
    id:'chaos_lord', name:'Arak\'zoth, Lord of Chaos', icon:'👹', level:25,
    hp:2000, atk:80, def:35, xp:2000, gold:[300,500],
    loot:[{id:'void_scepter',chance:1},{id:'assassin_daggers',chance:0.8},{id:'champions_blade',chance:0.8}],
    skills:[
      {id:'chaos_nova',name:'Chaos Nova',dmg:100,type:'magic',mp:0},
      {id:'soul_crush',name:'Soul Crush',dmg:130,type:'magic',mp:0},
      {id:'dark_heal',name:'Dark Restoration',dmg:-150,type:'heal',mp:0},
      {id:'chaos_storm',name:'Chaos Storm',dmg:85,type:'fire',mp:0},
      {id:'void_bolt',name:'Void Bolt',dmg:110,type:'magic',mp:0}
    ],
    aiType:'boss', boss:true, finalBoss:true, color:'#6a0a0a', phases:[
      {hpPct:0.66, msg:"Arak'zoth roars: 'You dare challenge me?!'", atkMult:1.3},
      {hpPct:0.33, msg:"Arak'zoth unleashes his true form!", atkMult:1.6}
    ]
  }
};
