// Zone definitions
const ZONES = [
  {
    id: 'greenwood',
    name: 'Greenwood Vale',
    desc: 'A peaceful forest hiding dangerous creatures.',
    levelRange: [1, 1],
    unlockLevel: 1,
    bgColor: '#1a3a1a',
    groundColor: '#2d5a2d',
    accent: '#4a8a4a',
    icon: 'T',
    mobs: [],
    mobWeights: [],
    boss: null,
    bossDefeated: true,
    npcs: [
      { id:'guard_leo', name:'Guard Leo', icon:'G', x:240, y:250, dialog:'start_quest_marsh_road', type:'quest', sprite:'npcs/npc_00_06.png' },
      { id:'merchant_mira', name:'Mira the Merchant', icon:'M', x:410, y:220, type:'shop', shopId:'shop_greenwood', sprite:'npcs/npc_04_06.png' },
      { id:'epic_vendor_lyra', name:'Lyra the Epic Vendor', icon:'E', x:570, y:230, type:'shop', shopId:'shop_greenwood_epics', sprite:'npcs/npc_04_09.png' }
    ],
    exits: [
      { label:'<- Moonfall Hollow', toZone:'moonfall_hollow', x:50, y:300, unlockLevel:1 },
      { label:'-> Ashfen Marshes', toZone:'ashfen', x:750, y:300, unlockLevel:1 }
    ],
    shopId: 'shop_greenwood',
    tileLayout: 'forest',
    spawnPoints: [{x:100,y:300},{x:200,y:350},{x:350,y:280},{x:500,y:320},{x:600,y:290}],
    caves: [{ id:'cave_gloomcrag', name:'Gloomcrag Caverns', x:700, toZone:'gloomcrag', entryX:700 }]
  },
  {
    id: 'moonfall_hollow',
    name: 'Moonfall Hollow',
    desc: 'A silver-lit hollow west of Greenwood, full of old magic and rare beasts.',
    levelRange: [2, 5],
    unlockLevel: 1,
    bgColor: '#10182d',
    groundColor: '#182644',
    accent: '#7b8fd8',
    icon: 'H',
    mobs: ['moon_moth','thorn_pouncer','hollow_cultist','starved_treant'],
    mobWeights: [3, 3, 2, 1],
    boss: 'lunar_stag',
    bossDefeated: false,
    npcs: [
      { id:'warden_selene', name:'Warden Selene', icon:'S', x:210, y:250, dialog:'start_quest_moonfall', type:'quest', sprite:'npcs/npc_00_06.png' },
      { id:'relic_broker_nox', name:'Relic Broker Nox', icon:'N', x:430, y:225, type:'shop', shopId:'shop_moonfall', sprite:'npcs/npc_04_03.png' }
    ],
    exits: [
      { label:'<- Staffbreaker Peaks', toZone:'staffbreaker_peaks', x:50, y:300, unlockLevel:1 },
      { label:'-> Greenwood Vale', toZone:'greenwood', x:750, y:300, unlockLevel:1 }
    ],
    shopId: 'shop_moonfall',
    tileLayout: 'moonfall',
    spawnPoints: [{x:120,y:315},{x:255,y:355},{x:395,y:295},{x:540,y:340},{x:675,y:300}]
  },
  {
    id: 'staffbreaker_peaks',
    name: 'Staffbreaker Peaks',
    desc: 'A boss-only ridge where arrogant mages lose their staffs and stronger mages steal them.',
    levelRange: [6, 10],
    unlockLevel: 1,
    bgColor: '#17122e',
    groundColor: '#24183f',
    accent: '#c58bff',
    icon: 'P',
    mobs: ['spark_ogre_magus','glass_dragon_adept','worldroot_archmage'],
    mobWeights: [3, 2, 1],
    boss: null,
    bossOnly: true,
    bossDefeated: true,
    npcs: [
      { id:'legend_keeper_oria', name:'Legend Keeper Oria', icon:'L', x:250, y:245, dialog:'start_quest_titan_crown', type:'quest', sprite:'npcs/npc_04_09.png' }
    ],
    exits: [
      { label:'<- Titan Crown Arena', toZone:'titan_crown_arena', x:50, y:300, unlockLevel:1 },
      { label:'-> Moonfall Hollow', toZone:'moonfall_hollow', x:750, y:300, unlockLevel:1 }
    ],
    shopId: null,
    tileLayout: 'peaks',
    spawnPoints: [{x:145,y:315},{x:330,y:350},{x:555,y:315}]
  },
  {
    id: 'titan_crown_arena',
    name: 'Titan Crown Arena',
    desc: 'A level 20 boss arena where the crowns are heavy and the loot is heavier.',
    levelRange: [20, 20],
    unlockLevel: 1,
    bgColor: '#21120b',
    groundColor: '#38200e',
    accent: '#ffb347',
    icon: 'T',
    mobs: ['iron_titan_king','void_star_queen','chrono_dragon_lord'],
    mobWeights: [1, 1, 1],
    boss: null,
    bossOnly: true,
    bossDefeated: true,
    npcs: [],
    exits: [
      { label:'-> Staffbreaker Peaks', toZone:'staffbreaker_peaks', x:750, y:300, unlockLevel:1 }
    ],
    shopId: null,
    tileLayout: 'arena',
    spawnPoints: [{x:150,y:315},{x:375,y:350},{x:610,y:315}]
  },
  {
    id: 'ashfen',
    name: 'Ashfen Marshes',
    desc: 'A dangerous marsh road just outside Greenwood.',
    levelRange: [1, 3],
    unlockLevel: 1,
    bgColor: '#1a2a12',
    groundColor: '#2a3e1a',
    accent: '#3a5a2a',
    icon: 'W',
    mobs: ['bog_lurker','swamp_troll','venomfang_serpent','marsh_wraith'],
    mobWeights: [5, 2, 2, 1],
    boss: 'bogmother',
    bossDefeated: false,
    npcs: [
      { id:'elder_finn', name:'Elder Finn', icon:'F', x:200, y:260, dialog:'start_quest_swamp', type:'quest', sprite:'npcs/npc_04_00.png' },
      { id:'alchemist_ada', name:'Alchemist Ada', icon:'A', x:380, y:230, type:'shop', shopId:'shop_ashfen', sprite:'npcs/npc_04_06.png' },
      { id:'reed_scout', name:'Reed Scout Toma', icon:'T', x:590, y:245, dialog:'start_quest_wraithlight', type:'quest', sprite:'npcs/npc_00_00.png' }
    ],
    exits: [
      { label:'<- Greenwood Vale', toZone:'greenwood', x:50, y:300, unlockLevel:1 },
      { label:'-> Ironspire Ruins', toZone:'ironspire', x:750, y:300, unlockLevel:1 }
    ],
    shopId: 'shop_ashfen',
    tileLayout: 'swamp',
    spawnPoints: [{x:120,y:310},{x:250,y:360},{x:400,y:290},{x:540,y:340},{x:650,y:300}]
  },
  {
    id: 'ironspire',
    name: 'Ironspire Ruins',
    desc: 'Ancient ruins haunted by dark forces.',
    levelRange: [3, 6],
    unlockLevel: 1,
    bgColor: '#0a0a1a',
    groundColor: '#1a1a2e',
    accent: '#3a3a5a',
    icon: 'I',
    mobs: ['stone_golem','dark_knight','fire_elemental','shadow_assassin'],
    mobWeights: [2, 2, 2, 1],
    boss: 'the_iron_lich',
    bossDefeated: false,
    npcs: [
      { id:'knight_vara', name:'Knight Vara', icon:'V', x:200, y:250, dialog:'start_quest_ruins', type:'quest', sprite:'npcs/npc_00_09.png' },
      { id:'blacksmith_borin', name:'Borin the Smith', icon:'B', x:390, y:225, type:'shop', shopId:'shop_ironspire', sprite:'npcs/npc_00_03.png' },
      { id:'archivist_ren', name:'Archivist Ren', icon:'A', x:590, y:240, dialog:'start_quest_shadow_pages', type:'quest', sprite:'npcs/npc_04_09.png' }
    ],
    exits: [
      { label:'<- Ashfen Marshes', toZone:'ashfen', x:50, y:300, unlockLevel:1 },
      { label:'-> Throne of Chaos', toZone:'chaos_throne', x:750, y:300, unlockLevel:1 }
    ],
    shopId: 'shop_ironspire',
    tileLayout: 'ruins',
    spawnPoints: [{x:130,y:300},{x:280,y:350},{x:420,y:280},{x:560,y:330},{x:680,y:295}],
    caves: [{ id:'cave_cinderpeak', name:'Cinderpeak Forge', x:660, toZone:'cinderpeak', entryX:700 }]
  },
  {
    id: 'chaos_throne',
    name: 'Throne of Chaos',
    desc: 'The seat of Arak\'zoth. Pure darkness and fire.',
    levelRange: [6, 9],
    unlockLevel: 1,
    bgColor: '#1a0000',
    groundColor: '#2e0800',
    accent: '#6a1a00',
    icon: 'F',
    mobs: ['chaos_demon','void_stalker','infernal_guardian'],
    mobWeights: [3, 2, 1],
    boss: 'chaos_lord',
    bossDefeated: false,
    npcs: [
      { id:'oracle_zyn', name:'Oracle Zyn', icon:'Z', x:200, y:250, dialog:'start_quest_chaos', type:'quest', sprite:'npcs/npc_04_09.png' },
      { id:'vendor_chaos', name:'Chaos Vendor', icon:'C', x:390, y:225, type:'shop', shopId:'shop_chaos', sprite:'npcs/npc_04_03.png' }
    ],
    exits: [
      { label:'<- Ironspire Ruins', toZone:'ironspire', x:50, y:300, unlockLevel:1 },
      { label:'-> Sunken Abyss', toZone:'sunken_abyss', x:750, y:300, unlockLevel:1 }
    ],
    shopId: 'shop_chaos',
    tileLayout: 'chaos',
    spawnPoints: [{x:150,y:310},{x:300,y:360},{x:450,y:300},{x:600,y:340},{x:700,y:290}]
  },
  {
    id: 'sunken_abyss',
    name: 'Sunken Abyss',
    desc: 'A drowned kingdom beneath endless black water.',
    levelRange: [9, 12],
    unlockLevel: 1,
    bgColor: '#021520',
    groundColor: '#062b3c',
    accent: '#1b8aa5',
    icon: 'A',
    mobs: ['drowned_sailor','coral_guardian','abyssal_mage','tide_assassin','pearl_colossus'],
    mobWeights: [3, 2, 2, 2, 1],
    boss: 'abyss_leviathan',
    bossDefeated: false,
    npcs: [
      { id:'captain_nere', name:'Captain Nere', icon:'N', x:190, y:250, dialog:'start_quest_abyss', type:'quest', sprite:'npcs/npc_00_09.png' },
      { id:'pearl_vendor', name:'Pearl Vendor Iri', icon:'I', x:385, y:225, type:'shop', shopId:'shop_abyss', sprite:'npcs/npc_04_06.png' },
      { id:'tide_seer', name:'Tide-Seer Luma', icon:'L', x:590, y:245, dialog:'start_quest_leviathan', type:'quest', sprite:'npcs/npc_04_00.png' }
    ],
    exits: [
      { label:'<- Throne of Chaos', toZone:'chaos_throne', x:50, y:300, unlockLevel:1 }
    ],
    shopId: 'shop_abyss',
    tileLayout: 'abyss',
    spawnPoints: [{x:115,y:315},{x:245,y:355},{x:390,y:295},{x:535,y:340},{x:675,y:300}]
  },
  {
    id: 'gloomcrag',
    name: 'Gloomcrag Caverns',
    desc: 'Dark crystal caves beneath Greenwood. Something old and hungry guards the deepest chamber.',
    levelRange: [3, 7],
    unlockLevel: 1,
    bgColor: '#080610',
    groundColor: '#120e1e',
    accent: '#5a3a8a',
    icon: '⛏',
    mobs: ['cave_bat', 'crystal_crawler', 'gloom_gnoll', 'deep_mushroom_shaman', 'cave_mimic', 'tiny_murloc'],
    mobWeights: [4, 3, 2, 2, 1, 1],
    boss: 'grubtha_cave_matriarch',
    bossDefeated: false,
    npcs: [
      { id:'miner_breck', name:'Miner Breck', icon:'⛏', x:185, y:250, dialog:'start_quest_cave_shadows', type:'quest', sprite:'npcs/npc_00_03.png' },
      { id:'crystal_vendor_nix', name:'Nix the Crystal Vendor', icon:'💎', x:560, y:235, type:'shop', shopId:'shop_gloomcrag', sprite:'npcs/npc_04_03.png' },
      { id:'boblin', name:'???', icon:'?', x:720, y:250, dialog:'boblin_dialog', type:'quest', sprite:'npcs/npc_00_00.png' }
    ],
    exits: [
      { label:'<- Cave Exit', toZone:'greenwood', x:50, y:300, unlockLevel:1 }
    ],
    shopId: 'shop_gloomcrag',
    tileLayout: 'cave',
    spawnPoints: [{x:120,y:315},{x:265,y:350},{x:480,y:300},{x:635,y:340}]
  },
  {
    id: 'cinderpeak',
    name: 'Cinderpeak Forge',
    desc: 'A volcanic cave-forge beneath Ironspire, where fire imps and lava beasts guard ancient metal.',
    levelRange: [7, 11],
    unlockLevel: 1,
    bgColor: '#120500',
    groundColor: '#200a00',
    accent: '#cc4400',
    icon: '🔥',
    mobs: ['fire_imp', 'lava_salamander', 'cinder_golem', 'magma_wraith'],
    mobWeights: [3, 3, 2, 2],
    boss: 'embrix_ashen_drake',
    bossDefeated: false,
    npcs: [
      { id:'forge_keeper_hex', name:'Forge Keeper Hex', icon:'🔥', x:205, y:250, dialog:'start_quest_cinder_flames', type:'quest', sprite:'npcs/npc_04_00.png' },
      { id:'cinder_vendor_mox', name:'Mox the Cinder Vendor', icon:'🪙', x:575, y:235, type:'shop', shopId:'shop_cinderpeak', sprite:'npcs/npc_04_06.png' }
    ],
    exits: [
      { label:'<- Forge Exit', toZone:'ironspire', x:50, y:300, unlockLevel:1 }
    ],
    shopId: 'shop_cinderpeak',
    tileLayout: 'cinder',
    spawnPoints: [{x:130,y:315},{x:285,y:345},{x:490,y:305},{x:645,y:335}]
  }
];

// Shops per zone
const SHOPS = {
  shop_greenwood: {
    name: "Mira's General Store",
    items: ['health_potion','mana_potion','bandage','bread','antidote','iron_sword','iron_shield','chain_mail','iron_helm','oak_staff','mage_robes','mage_hat','bronze_daggers','leather_armor','rogue_hood']
  },
  shop_greenwood_epics: {
    name: "Lyra's Epic Starter Gear",
    items: ['adventurer_kingsword','violet_apprentice_staff','lucky_shadow_daggers','violet_hero_chest','quicksilver_gloves','brightstar_charm','ridiculous_godstaff']
  },
  shop_moonfall: {
    name: "Nox's Relics",
    items: ['health_potion','mana_potion','greater_health_potion','greater_mana_potion','moonlit_cloak','hollowthorn_ring','boots_haste','gloves_grip']
  },
  shop_ashfen: {
    name: "Ada's Alchemy",
    items: ['health_potion','mana_potion','elixir_strength','antidote','bandage','steel_sword','tower_shield','plate_armor','arcane_staff','orb_of_power','shadow_blades','boots_haste','gloves_grip','coral_cutlass','tide_staff','scale_vest']
  },
  shop_ironspire: {
    name: "Borin's Smithy",
    items: ['elixir_strength','greater_health_potion','greater_mana_potion','champions_blade','tower_shield','plate_armor','iron_helm','void_scepter','arcane_robes','assassin_daggers','shadow_leathers','ring_vitality','amulet_power','boots_haste','gloves_grip','frost_axe','glacier_wand','nightfang','frost_cloak','sapphire_ring','titan_gauntlets']
  },
  shop_chaos: {
    name: 'Chaos Bazaar',
    items: ['elixir_strength','greater_health_potion','greater_mana_potion','health_potion','mana_potion','void_scepter','amulet_power','ring_vitality','boots_haste','gloves_grip','champions_blade','assassin_daggers','arcane_robes','frost_cloak','sapphire_ring']
  },
  shop_abyss: {
    name: 'Iri\'s Pearl Exchange',
    items: ['heroic_health_potion','heroic_mana_potion','storm_elixir','sunken_trident','stormcaller_rod','reefrazor_twins','tideplate_cuirass','astralweave_robes','duskstalker_jacket','crown_of_depths','leviathan_charm','pearl_of_focus','tidewalker_boots']
  },
  shop_gloomcrag: {
    name: "Nix's Crystal Exchange",
    items: ['mushroom_brew','health_potion','mana_potion','bandage','antidote','cave_pearl_ring','crystal_spire_shard','gloom_carapace','cave_charm']
  },
  shop_cinderpeak: {
    name: "Mox's Forge Goods",
    items: ['heroic_health_potion','heroic_mana_potion','storm_elixir','health_potion','mana_potion','magma_pick','emberstone_wand','cinder_fangs','ashplate','heat_cloak','lava_band']
  }
};
