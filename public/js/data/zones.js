// Zone definitions
const ZONES = [
  {
    id: 'greenwood',
    name: 'Greenwood Vale',
    desc: 'A peaceful forest hiding dangerous creatures.',
    levelRange: [1, 5],
    unlockLevel: 1,
    bgColor: '#1a3a1a',
    groundColor: '#2d5a2d',
    accent: '#4a8a4a',
    icon: '🌲',
    mobs: ['forest_rat','goblin_scout','forest_wolf','giant_spider'],
    mobWeights: [3, 3, 2, 1],
    boss: 'alpha_wolf',
    bossDefeated: false,
    npcs: [
      { id:'guard_leo', name:'Guard Leo', icon:'💂', x:200, y:250, dialog:'start_quest_wolf', type:'quest' },
      { id:'merchant_mira', name:'Mira the Merchant', icon:'👩', x:380, y:220, type:'shop', shopId:'shop_greenwood' }
    ],
    exits: [
      { label:'→ Ashfen Marshes', toZone:'ashfen', x:750, y:300, unlockLevel:5 }
    ],
    shopId: 'shop_greenwood',
    tileLayout: 'forest',
    spawnPoints: [{x:100,y:300},{x:200,y:350},{x:350,y:280},{x:500,y:320},{x:600,y:290}]
  },
  {
    id: 'ashfen',
    name: 'Ashfen Marshes',
    desc: 'Dark swamps teeming with poisonous life.',
    levelRange: [5, 10],
    unlockLevel: 1,
    bgColor: '#1a2a12',
    groundColor: '#2a3e1a',
    accent: '#3a5a2a',
    icon: '🌿',
    mobs: ['bog_lurker','swamp_troll','venomfang_serpent','marsh_wraith'],
    mobWeights: [3, 2, 2, 1],
    boss: 'bogmother',
    bossDefeated: false,
    npcs: [
      { id:'elder_finn', name:'Elder Finn', icon:'👴', x:200, y:260, dialog:'start_quest_swamp', type:'quest' },
      { id:'alchemist_ada', name:'Alchemist Ada', icon:'👩‍🔬', x:380, y:230, type:'shop', shopId:'shop_ashfen' }
    ],
    exits: [
      { label:'← Greenwood Vale', toZone:'greenwood', x:50, y:300, unlockLevel:1 },
      { label:'→ Ironspire Ruins', toZone:'ironspire', x:750, y:300, unlockLevel:10 }
    ],
    shopId: 'shop_ashfen',
    tileLayout: 'swamp',
    spawnPoints: [{x:120,y:310},{x:250,y:360},{x:400,y:290},{x:540,y:340},{x:650,y:300}]
  },
  {
    id: 'ironspire',
    name: 'Ironspire Ruins',
    desc: 'Ancient ruins haunted by dark forces.',
    levelRange: [10, 18],
    unlockLevel: 1,
    bgColor: '#0a0a1a',
    groundColor: '#1a1a2e',
    accent: '#3a3a5a',
    icon: '🏚️',
    mobs: ['stone_golem','dark_knight','fire_elemental','shadow_assassin'],
    mobWeights: [2, 2, 2, 1],
    boss: 'the_iron_lich',
    bossDefeated: false,
    npcs: [
      { id:'knight_vara', name:'Knight Vara', icon:'⚔️', x:200, y:250, dialog:'start_quest_ruins', type:'quest' },
      { id:'blacksmith_borin', name:'Borin the Smith', icon:'🧙‍♂️', x:390, y:225, type:'shop', shopId:'shop_ironspire' }
    ],
    exits: [
      { label:'← Ashfen Marshes', toZone:'ashfen', x:50, y:300, unlockLevel:1 },
      { label:'→ Throne of Chaos', toZone:'chaos_throne', x:750, y:300, unlockLevel:18 }
    ],
    shopId: 'shop_ironspire',
    tileLayout: 'ruins',
    spawnPoints: [{x:130,y:300},{x:280,y:350},{x:420,y:280},{x:560,y:330},{x:680,y:295}]
  },
  {
    id: 'chaos_throne',
    name: 'Throne of Chaos',
    desc: 'The seat of Arak\'zoth. Pure darkness and fire.',
    levelRange: [18, 25],
    unlockLevel: 1,
    bgColor: '#1a0000',
    groundColor: '#2e0800',
    accent: '#6a1a00',
    icon: '🔥',
    mobs: ['chaos_demon','void_stalker','infernal_guardian'],
    mobWeights: [3, 2, 1],
    boss: 'chaos_lord',
    bossDefeated: false,
    npcs: [
      { id:'oracle_zyn', name:'Oracle Zyn', icon:'🔮', x:200, y:250, dialog:'start_quest_chaos', type:'quest' },
      { id:'vendor_chaos', name:'Chaos Vendor', icon:'👺', x:390, y:225, type:'shop', shopId:'shop_chaos' }
    ],
    exits: [
      { label:'← Ironspire Ruins', toZone:'ironspire', x:50, y:300, unlockLevel:1 }
    ],
    shopId: 'shop_chaos',
    tileLayout: 'chaos',
    spawnPoints: [{x:150,y:310},{x:300,y:360},{x:450,y:300},{x:600,y:340},{x:700,y:290}]
  }
];

// Shops per zone
const SHOPS = {
  shop_greenwood: {
    name: "Mira's General Store",
    items: ['health_potion','mana_potion','bandage','bread','antidote','iron_sword','iron_shield','chain_mail','iron_helm','oak_staff','mage_robes','mage_hat','bronze_daggers','leather_armor','rogue_hood']
  },
  shop_ashfen: {
    name: "Ada's Alchemy",
    items: ['health_potion','mana_potion','elixir_strength','antidote','bandage','steel_sword','tower_shield','plate_armor','arcane_staff','orb_of_power','shadow_blades','boots_haste','gloves_grip']
  },
  shop_ironspire: {
    name: "Borin's Smithy",
    items: ['elixir_strength','health_potion','mana_potion','champions_blade','tower_shield','plate_armor','iron_helm','void_scepter','arcane_robes','assassin_daggers','shadow_leathers','ring_vitality','amulet_power','boots_haste','gloves_grip']
  },
  shop_chaos: {
    name: 'Chaos Bazaar',
    items: ['elixir_strength','health_potion','mana_potion','void_scepter','amulet_power','ring_vitality','boots_haste','gloves_grip','champions_blade','assassin_daggers','arcane_robes']
  }
};
