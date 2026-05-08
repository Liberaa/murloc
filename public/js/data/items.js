// Items database
const ITEMS = {
  // Consumables
  health_potion:    { id:'health_potion',    name:'Health Potion',    icon:'🧪', type:'consumable', quality:'common',   value:10,  desc:'Restores 50 HP.',          effect:{hp:50} },
  mana_potion:      { id:'mana_potion',      name:'Mana Potion',      icon:'🔵', type:'consumable', quality:'common',   value:10,  desc:'Restores 300 MP.',          effect:{mp:300} },
  elixir_strength:  { id:'elixir_strength',  name:'Elixir of Might', icon:'💪', type:'consumable', quality:'uncommon', value:40,  desc:'Restores 120 HP.',         effect:{hp:120} },
  bandage:          { id:'bandage',          name:'Bandage',          icon:'🩹', type:'consumable', quality:'common',   value:5,   desc:'Restores 30 HP out of combat.', effect:{hp:30} },
  antidote:         { id:'antidote',         name:'Antidote',         icon:'🍵', type:'consumable', quality:'common',   value:8,   desc:'Cures poison.',            effect:{cure_poison:true} },
  bread:            { id:'bread',            name:'Bread',            icon:'🍞', type:'consumable', quality:'common',   value:2,   desc:'Restores 15 HP.',          effect:{hp:15} },

  // Warrior Gear
  iron_sword:       { id:'iron_sword',       name:'Iron Sword',       icon:'⚔️',  type:'weapon',  slot:'weapon',  quality:'common',   value:30,  stats:{atk:8},            desc:'A sturdy iron blade.',        class:['warrior'] },
  steel_sword:      { id:'steel_sword',      name:'Steel Sword',      icon:'🗡️',  type:'weapon',  slot:'weapon',  quality:'uncommon', value:90,  stats:{atk:18},           desc:'Fine steel forged in fury.',  class:['warrior'] },
  champions_blade:  { id:'champions_blade',  name:"Champion's Blade", icon:'⚔️',  type:'weapon',  slot:'weapon',  quality:'rare',     value:250, stats:{atk:35, str:5},    desc:'Wielded by arena champions.', class:['warrior'] },
  iron_shield:      { id:'iron_shield',      name:'Iron Shield',      icon:'🛡️',  type:'armor',   slot:'offhand', quality:'common',   value:25,  stats:{def:6},            desc:'Solid iron protection.',      class:['warrior'] },
  tower_shield:     { id:'tower_shield',     name:'Tower Shield',     icon:'🛡️',  type:'armor',   slot:'offhand', quality:'uncommon', value:80,  stats:{def:14},           desc:'Massive defensive tower.',    class:['warrior'] },
  chain_mail:       { id:'chain_mail',       name:'Chain Mail',       icon:'🧥',  type:'armor',   slot:'chest',   quality:'common',   value:40,  stats:{def:10, hp:20},    desc:'Interlocked iron rings.' },
  plate_armor:      { id:'plate_armor',      name:'Plate Armor',      icon:'🦺',  type:'armor',   slot:'chest',   quality:'uncommon', value:120, stats:{def:22, hp:40},    desc:'Heavy battle plate.',         class:['warrior'] },
  iron_helm:        { id:'iron_helm',        name:'Iron Helm',        icon:'⛑️',  type:'armor',   slot:'head',    quality:'common',   value:20,  stats:{def:5},            desc:'Protects the skull.',         class:['warrior'] },

  // Mage Gear
  oak_staff:        { id:'oak_staff',        name:'Oak Staff',        icon:'🪄',  type:'weapon',  slot:'weapon',  quality:'common',   value:28,  stats:{atk:5, int:8},    desc:'A simple oak staff.',         class:['mage'] },
  arcane_staff:     { id:'arcane_staff',     name:'Arcane Staff',     icon:'🔮',  type:'weapon',  slot:'weapon',  quality:'uncommon', value:95,  stats:{atk:8, int:18},   desc:'Crackling with arcane power.',class:['mage'] },
  void_scepter:     { id:'void_scepter',     name:'Void Scepter',     icon:'🌀',  type:'weapon',  slot:'weapon',  quality:'rare',     value:260, stats:{atk:12, int:36, mp:30}, desc:'Torn from the void itself.', class:['mage'] },
  mage_robes:       { id:'mage_robes',       name:'Mage Robes',       icon:'👘',  type:'armor',   slot:'chest',   quality:'common',   value:35,  stats:{def:4, int:6, mp:20}, desc:'Enchanted cloth robes.',   class:['mage'] },
  arcane_robes:     { id:'arcane_robes',     name:'Arcane Robes',     icon:'🧙',  type:'armor',   slot:'chest',   quality:'uncommon', value:110, stats:{def:8, int:14, mp:40}, desc:'Woven with arcane thread.', class:['mage'] },
  mage_hat:         { id:'mage_hat',         name:"Mage's Hat",       icon:'🎩',  type:'armor',   slot:'head',    quality:'common',   value:18,  stats:{int:5, mp:15},    desc:'Pointy and magical.',         class:['mage'] },
  orb_of_power:     { id:'orb_of_power',     name:'Orb of Power',     icon:'💎',  type:'armor',   slot:'offhand', quality:'uncommon', value:75,  stats:{int:10, mp:25},   desc:'Focuses arcane energies.',    class:['mage'] },

  // Rogue Gear
  bronze_daggers:   { id:'bronze_daggers',   name:'Bronze Daggers',   icon:'🔪',  type:'weapon',  slot:'weapon',  quality:'common',   value:26,  stats:{atk:7, agi:5},    desc:'Twin bronze daggers.',        class:['rogue'] },
  shadow_blades:    { id:'shadow_blades',    name:'Shadow Blades',    icon:'🗡️',  type:'weapon',  slot:'weapon',  quality:'uncommon', value:88,  stats:{atk:16, agi:10},  desc:'Forged in shadow magic.',     class:['rogue'] },
  assassin_daggers: { id:'assassin_daggers', name:"Assassin's Fangs", icon:'🔪',  type:'weapon',  slot:'weapon',  quality:'rare',     value:240, stats:{atk:28, agi:16, crit:10}, desc:'Coated in venom.', class:['rogue'] },
  leather_armor:    { id:'leather_armor',    name:'Leather Armor',    icon:'🧥',  type:'armor',   slot:'chest',   quality:'common',   value:32,  stats:{def:7, agi:4},    desc:'Supple leather protection.',  class:['rogue'] },
  shadow_leathers:  { id:'shadow_leathers',  name:'Shadow Leathers',  icon:'🥷',  type:'armor',   slot:'chest',   quality:'uncommon', value:105, stats:{def:14, agi:10},  desc:'Woven from darkness itself.', class:['rogue'] },
  rogue_hood:       { id:'rogue_hood',       name:'Rogue Hood',       icon:'🪖',  type:'armor',   slot:'head',    quality:'common',   value:18,  stats:{def:4, agi:4},    desc:'Conceal your identity.',      class:['rogue'] },
  smoke_bomb:       { id:'smoke_bomb',       name:'Smoke Bomb',       icon:'💨',  type:'consumable', quality:'common', value:12, desc:'Escape from combat.', effect:{flee:true} },

  // Accessories (any class)
  ring_vitality:    { id:'ring_vitality',    name:'Ring of Vitality', icon:'💍',  type:'armor',   slot:'ring',    quality:'uncommon', value:60,  stats:{hp:50},            desc:'A ruby ring pulsing with life.' },
  amulet_power:     { id:'amulet_power',     name:'Amulet of Power',  icon:'📿',  type:'armor',   slot:'neck',    quality:'rare',     value:180, stats:{atk:8, def:8, hp:30}, desc:'Ancient talisman of might.' },
  boots_haste:      { id:'boots_haste',      name:'Boots of Haste',   icon:'👢',  type:'armor',   slot:'feet',    quality:'uncommon', value:70,  stats:{agi:8, def:5},    desc:'You move like lightning.' },
  gloves_grip:      { id:'gloves_grip',      name:'Battle Gloves',    icon:'🥊',  type:'armor',   slot:'hands',   quality:'common',   value:25,  stats:{atk:4, def:3},    desc:'Reinforced combat gloves.' },
  // Mid-game weapons and armor
  coral_cutlass:    { id:'coral_cutlass',    name:'Coral Cutlass',     icon:'C', type:'weapon', slot:'weapon', quality:'uncommon', value:130, stats:{atk:22, agi:4}, desc:'A curved blade edged with hardened coral.', class:['warrior','rogue'] },
  tide_staff:       { id:'tide_staff',       name:'Tidecaller Staff',  icon:'T', type:'weapon', slot:'weapon', quality:'uncommon', value:140, stats:{atk:7, int:24, mp:35}, desc:'A staff that hums with sea magic.', class:['mage'] },
  frost_axe:        { id:'frost_axe',        name:'Frostforged Axe',   icon:'A', type:'weapon', slot:'weapon', quality:'rare', value:310, stats:{atk:42, def:8}, desc:'Cold iron with a bite like winter.', class:['warrior'] },
  glacier_wand:     { id:'glacier_wand',     name:'Glacier Wand',      icon:'W', type:'weapon', slot:'weapon', quality:'rare', value:300, stats:{atk:9, int:42, mp:50}, desc:'A wand capped with never-melting ice.', class:['mage'] },
  nightfang:        { id:'nightfang',        name:'Nightfang',         icon:'N', type:'weapon', slot:'weapon', quality:'rare', value:305, stats:{atk:34, agi:22, crit:12}, desc:'A silent dagger from the northern passes.', class:['rogue'] },
  scale_vest:       { id:'scale_vest',       name:'Reefscale Vest',    icon:'V', type:'armor', slot:'chest', quality:'uncommon', value:135, stats:{def:16, hp:45, agi:5}, desc:'Flexible armor made from bright sea scales.' },
  frost_cloak:      { id:'frost_cloak',      name:'Frostguard Cloak',  icon:'K', type:'armor', slot:'neck', quality:'rare', value:220, stats:{def:12, hp:70, mp:20}, desc:'A heavy cloak lined against mountain winds.' },
  sapphire_ring:    { id:'sapphire_ring',    name:'Sapphire Band',     icon:'S', type:'armor', slot:'ring', quality:'rare', value:210, stats:{int:14, mp:45, crit:5}, desc:'A ring that sharpens focus and spellwork.' },
  titan_gauntlets:  { id:'titan_gauntlets',  name:'Titan Gauntlets',   icon:'G', type:'armor', slot:'hands', quality:'rare', value:240, stats:{atk:12, def:12, str:6}, desc:'Heavy gloves sized for heroic work.' },

  // Utility consumables
  greater_health_potion: { id:'greater_health_potion', name:'Greater Health Potion', icon:'H', type:'consumable', quality:'uncommon', value:35, desc:'Restores 150 HP.', effect:{hp:150} },
  greater_mana_potion:   { id:'greater_mana_potion',   name:'Greater Mana Potion',   icon:'M', type:'consumable', quality:'uncommon', value:35, desc:'Restores 180 MP.', effect:{mp:180} },
  heroic_health_potion:  { id:'heroic_health_potion',  name:'Heroic Health Potion',  icon:'H', type:'consumable', quality:'rare', value:85, desc:'Restores 320 HP.', effect:{hp:320} },
  heroic_mana_potion:    { id:'heroic_mana_potion',    name:'Heroic Mana Potion',    icon:'M', type:'consumable', quality:'rare', value:85, desc:'Restores 360 MP.', effect:{mp:360} },
  storm_elixir:          { id:'storm_elixir',          name:'Storm Elixir',          icon:'E', type:'consumable', quality:'rare', value:120, desc:'Restores 220 HP and 180 MP.', effect:{hp:220, mp:180} },

  // End-game weapons and armor
  sunken_trident:        { id:'sunken_trident',        name:'Sunken Trident',        icon:'T', type:'weapon', slot:'weapon', quality:'rare', value:420, stats:{atk:52, def:10, hp:60}, desc:'A royal spear pulled from a drowned empire.', class:['warrior'] },
  stormcaller_rod:       { id:'stormcaller_rod',       name:'Stormcaller Rod',       icon:'R', type:'weapon', slot:'weapon', quality:'rare', value:430, stats:{atk:12, int:58, mp:90, crit:6}, desc:'Lightning crawls over its silver runes.', class:['mage'] },
  reefrazor_twins:       { id:'reefrazor_twins',       name:'Reefrazor Twins',       icon:'D', type:'weapon', slot:'weapon', quality:'rare', value:425, stats:{atk:44, agi:30, crit:16}, desc:'Paired blades made for quick tidewater kills.', class:['rogue'] },
  tideplate_cuirass:     { id:'tideplate_cuirass',     name:'Tideplate Cuirass',     icon:'P', type:'armor', slot:'chest', quality:'rare', value:360, stats:{def:34, hp:120, str:8}, desc:'Heavy plate sealed against crushing pressure.', class:['warrior'] },
  astralweave_robes:     { id:'astralweave_robes',     name:'Astralweave Robes',     icon:'A', type:'armor', slot:'chest', quality:'rare', value:350, stats:{def:14, int:28, mp:120}, desc:'Cloth that catches starlight in its seams.', class:['mage'] },
  duskstalker_jacket:    { id:'duskstalker_jacket',    name:'Duskstalker Jacket',    icon:'J', type:'armor', slot:'chest', quality:'rare', value:350, stats:{def:24, agi:24, crit:8}, desc:'Quiet armor for hunters who strike at dusk.', class:['rogue'] },
  crown_of_depths:       { id:'crown_of_depths',       name:'Crown of Depths',       icon:'C', type:'armor', slot:'head', quality:'rare', value:280, stats:{def:12, int:18, hp:80, mp:60}, desc:'A barnacled crown that still remembers command.' },
  leviathan_charm:       { id:'leviathan_charm',       name:'Leviathan Charm',       icon:'L', type:'armor', slot:'neck', quality:'rare', value:320, stats:{atk:16, def:16, hp:90}, desc:'A tooth from something that swallowed ships.' },
  pearl_of_focus:        { id:'pearl_of_focus',        name:'Pearl of Focus',        icon:'O', type:'armor', slot:'offhand', quality:'rare', value:300, stats:{int:24, mp:85, crit:7}, desc:'A perfect pearl used to focus spellcraft.', class:['mage'] },
  tidewalker_boots:      { id:'tidewalker_boots',      name:'Tidewalker Boots',      icon:'B', type:'armor', slot:'feet', quality:'rare', value:255, stats:{agi:18, def:10, hp:40}, desc:'Sure footing, even on slick stone.' },

  // Westfall Hollow boss rewards
  moonlit_cloak:         { id:'moonlit_cloak',         name:'Moonlit Cloak',         icon:'C', type:'armor', slot:'neck', quality:'rare', value:180, stats:{def:9, agi:8, mp:25}, desc:'A cloak that glows softly under moonlight.' },
  hollowthorn_ring:      { id:'hollowthorn_ring',      name:'Hollowthorn Ring',      icon:'R', type:'armor', slot:'ring', quality:'rare', value:190, stats:{atk:7, def:6, hp:35}, desc:'A thorny silver ring from the old hollow.' },
  eclipse_blade:         { id:'eclipse_blade',         name:'Eclipse Blade',         icon:'E', type:'weapon', slot:'weapon', quality:'epic', value:360, stats:{atk:38, agi:12, crit:8}, desc:'A black-edged blade bright along one side.', class:['warrior','rogue'] },
  moonwell_scepter:      { id:'moonwell_scepter',      name:'Moonwell Scepter',      icon:'M', type:'weapon', slot:'weapon', quality:'epic', value:360, stats:{atk:8, int:36, mp:60, crit:6}, desc:'A scepter filled with pale lunar water.', class:['mage'] },
  starfall_crown:        { id:'starfall_crown',        name:'Starfall Crown',        icon:'L', type:'armor', slot:'head', quality:'legendary', value:700, stats:{atk:14, def:14, int:18, agi:14, hp:90, mp:90, crit:10}, desc:'A legendary crown set with a fallen star.' },

  // Epic boss armor and accessories
  violet_warplate:       { id:'violet_warplate',       name:'Violet Warplate',       icon:'P', type:'armor', slot:'chest', quality:'epic', value:520, stats:{def:30, atk:12, hp:120}, desc:'Purple plate polished with boss blood.' },
  spellstorm_robes:      { id:'spellstorm_robes',      name:'Spellstorm Robes',      icon:'R', type:'armor', slot:'chest', quality:'epic', value:520, stats:{def:16, int:34, mp:140, crit:8}, desc:'Robes that crackle when a boss gets nervous.', class:['mage'] },
  nightlord_wraps:       { id:'nightlord_wraps',       name:'Nightlord Wraps',       icon:'W', type:'armor', slot:'hands', quality:'epic', value:430, stats:{atk:14, agi:18, crit:10}, desc:'Soft gloves for extremely loud backstabs.' },
  archon_grips:          { id:'archon_grips',          name:'Archon Grips',          icon:'G', type:'armor', slot:'hands', quality:'epic', value:440, stats:{def:14, int:18, mp:55}, desc:'Gloves that hold spell power like a clenched fist.' },
  umbral_cloak:          { id:'umbral_cloak',          name:'Umbral Cloak',          icon:'U', type:'armor', slot:'neck', quality:'epic', value:470, stats:{def:18, agi:14, hp:80, crit:6}, desc:'A cloak that drinks nearby torchlight.' },
  royal_boss_chain:      { id:'royal_boss_chain',      name:'Royal Boss Chain',      icon:'N', type:'armor', slot:'neck', quality:'epic', value:500, stats:{atk:16, int:16, hp:90, mp:70}, desc:'A neckpiece taken from someone too important.' },
  violet_signet:         { id:'violet_signet',         name:'Violet Signet',         icon:'V', type:'armor', slot:'ring', quality:'epic', value:460, stats:{atk:10, def:10, int:10, agi:10, crit:8}, desc:'A signet stamped with a tiny angry crown.' },
  astral_treads:         { id:'astral_treads',         name:'Astral Treads',         icon:'A', type:'armor', slot:'feet', quality:'epic', value:420, stats:{agi:20, def:12, mp:55}, desc:'Boots that step half an inch above reality.' },
  voidbound_orb:         { id:'voidbound_orb',         name:'Voidbound Orb',         icon:'O', type:'armor', slot:'offhand', quality:'epic', value:540, stats:{int:32, mp:120, crit:12}, desc:'A purple orb that whispers winning numbers.', class:['mage'] },

  // Starter hub epic vendor gear
  adventurer_kingsword:  { id:'adventurer_kingsword',  name:'Adventurer Kingsword',  icon:'K', type:'weapon', slot:'weapon', quality:'epic', value:210, stats:{atk:26, def:6, hp:45}, desc:'A flashy sword sold to heroes with excellent taste.', class:['warrior'] },
  violet_apprentice_staff:{ id:'violet_apprentice_staff', name:'Violet Apprentice Staff', icon:'A', type:'weapon', slot:'weapon', quality:'epic', value:210, stats:{atk:7, int:30, mp:85, crit:6}, desc:'A beginner staff with suspiciously advanced power.', class:['mage'] },
  lucky_shadow_daggers:  { id:'lucky_shadow_daggers',  name:'Lucky Shadow Daggers', icon:'D', type:'weapon', slot:'weapon', quality:'epic', value:205, stats:{atk:24, agi:18, crit:10}, desc:'Twin daggers that seem to find weak spots by themselves.', class:['rogue'] },
  violet_hero_chest:    { id:'violet_hero_chest',    name:'Violet Hero Chestguard', icon:'C', type:'armor', slot:'chest', quality:'epic', value:200, stats:{def:24, hp:90, atk:8}, desc:'A chestguard that makes level-one confidence look reasonable.' },
  quicksilver_gloves:    { id:'quicksilver_gloves',    name:'Quicksilver Gloves',    icon:'Q', type:'armor', slot:'hands', quality:'epic', value:185, stats:{atk:9, agi:12, crit:6}, desc:'Fast gloves for fast decisions.' },
  brightstar_charm:      { id:'brightstar_charm',      name:'Brightstar Charm',      icon:'B', type:'armor', slot:'neck', quality:'epic', value:195, stats:{int:14, def:8, hp:55, mp:55}, desc:'A charm that shines brighter when danger gets closer.' },
  ridiculous_godstaff:   { id:'ridiculous_godstaff',   name:'Ridiculous Godstaff',   icon:'X', type:'weapon', slot:'weapon', quality:'legendary', value:5000, stats:{atk:100, int:7000, mp:5000, crit:100}, desc:'For testing. Frostbolt goes from spell to weather event.', class:['mage'] },

  // Boss-only OP staffs
  staff_of_unfair_sparks: { id:'staff_of_unfair_sparks', name:'Staff of Unfair Sparks', icon:'S', type:'weapon', slot:'weapon', quality:'epic', value:900, stats:{atk:20, int:95, mp:180, crit:18}, desc:'Absolutely not balanced. Beautifully so.', class:['mage'] },
  staff_of_boss_tears:    { id:'staff_of_boss_tears',    name:'Staff of Boss Tears',    icon:'T', type:'weapon', slot:'weapon', quality:'legendary', value:1600, stats:{atk:28, int:145, mp:280, crit:25}, desc:'Every boss in the valley hates this staff.', class:['mage'] },
  worldroot_archstaff:    { id:'worldroot_archstaff',    name:'Worldroot Archstaff',    icon:'W', type:'weapon', slot:'weapon', quality:'legendary', value:2200, stats:{atk:35, int:190, mp:420, hp:160, crit:35}, desc:'A ridiculous archstaff grown from the root of the world.', class:['mage'] },

  // Level 20 boss-zone rewards
  titanbreaker_greatstaff:{ id:'titanbreaker_greatstaff', name:'Titanbreaker Greatstaff', icon:'T', type:'weapon', slot:'weapon', quality:'legendary', value:4200, stats:{atk:55, int:310, mp:650, hp:250, crit:45}, desc:'A huge staff built to crack titan armor.', class:['mage'] },
  crown_of_twenty_kings: { id:'crown_of_twenty_kings', name:'Crown of Twenty Kings', icon:'C', type:'armor', slot:'head', quality:'legendary', value:3600, stats:{atk:32, def:32, int:36, agi:32, hp:220, mp:220, crit:22}, desc:'A crown with one tiny tyrant for every level.' },
  mythic_heartplate:     { id:'mythic_heartplate',     name:'Mythic Heartplate', icon:'H', type:'armor', slot:'chest', quality:'legendary', value:3300, stats:{def:58, atk:28, hp:320, crit:10}, desc:'The armor still beats like a boss heart.' },
  stormgod_handwraps:    { id:'stormgod_handwraps',    name:'Stormgod Handwraps', icon:'S', type:'armor', slot:'hands', quality:'legendary', value:3000, stats:{atk:30, int:30, agi:22, mp:160, crit:18}, desc:'Wraps that make every spell feel overcharged.' },
  eternity_chain:        { id:'eternity_chain',        name:'Eternity Chain', icon:'E', type:'armor', slot:'neck', quality:'legendary', value:3100, stats:{atk:24, def:24, int:28, hp:220, mp:220, crit:14}, desc:'A chain that has already survived tomorrow.' },
  mythic_star_signet:    { id:'mythic_star_signet',    name:'Mythic Star Signet', icon:'R', type:'armor', slot:'ring', quality:'legendary', value:2950, stats:{atk:18, def:18, int:22, agi:18, crit:20}, desc:'A ring bright enough to count as a strategy.' },

  // Gloomcrag consumable
  mushroom_brew:         { id:'mushroom_brew', name:'Mushroom Brew', icon:'🍄', type:'consumable', quality:'uncommon', value:25, desc:'Restores 80 HP and 60 MP. Tastes like the dark.', effect:{hp:80, mp:60} },

  // Gloomcrag gear
  crystal_spire_shard:   { id:'crystal_spire_shard', name:'Crystal Spire Shard', icon:'💎', type:'weapon', slot:'weapon', quality:'rare', value:285, stats:{atk:22, int:22, crit:10}, desc:'A razor shard of cave crystal. Fits every grip.' },
  gloom_carapace:        { id:'gloom_carapace', name:'Gloom Carapace', icon:'🪲', type:'armor', slot:'chest', quality:'rare', value:270, stats:{def:26, hp:90, agi:6}, desc:'Repurposed from something that used to own this cave.' },
  cave_pearl_ring:       { id:'cave_pearl_ring', name:'Cave Pearl Ring', icon:'💍', type:'armor', slot:'ring', quality:'uncommon', value:88, stats:{hp:55, mp:30, def:6}, desc:'A smooth pearl found very deep. Slightly suspicious.' },
  cave_charm:            { id:'cave_charm', name:"Spelunker's Charm", icon:'🕯️', type:'armor', slot:'neck', quality:'rare', value:250, stats:{atk:10, def:10, hp:60, mp:40, crit:6}, desc:"Carried by explorers who came back. Most don't." },

  // Cinderpeak weapons
  magma_pick:            { id:'magma_pick', name:'Magma Pick', icon:'⛏️', type:'weapon', slot:'weapon', quality:'rare', value:355, stats:{atk:46, def:8, str:8}, desc:'A pickaxe heated past usefulness and into power.', class:['warrior'] },
  emberstone_wand:       { id:'emberstone_wand', name:'Emberstone Wand', icon:'🪄', type:'weapon', slot:'weapon', quality:'rare', value:350, stats:{atk:11, int:50, mp:80, crit:8}, desc:'The gemstone in the tip was technically lava yesterday.', class:['mage'] },
  cinder_fangs:          { id:'cinder_fangs', name:'Cinder Fangs', icon:'🔪', type:'weapon', slot:'weapon', quality:'rare', value:345, stats:{atk:38, agi:24, crit:14}, desc:'Blades that retain forge heat for exactly three stabs.', class:['rogue'] },
  ashplate:              { id:'ashplate', name:'Ashplate Cuirass', icon:'🦺', type:'armor', slot:'chest', quality:'rare', value:335, stats:{def:30, hp:100, atk:8}, desc:'Forged in the hottest part of the cave. Cooled eventually.', class:['warrior'] },
  heat_cloak:            { id:'heat_cloak', name:'Heatward Cloak', icon:'🧥', type:'armor', slot:'neck', quality:'rare', value:295, stats:{def:14, hp:80, mp:50, int:10}, desc:'Lined with something that makes fire politely back off.' },
  lava_band:             { id:'lava_band', name:'Lava Band', icon:'💍', type:'armor', slot:'ring', quality:'rare', value:275, stats:{atk:14, def:10, crit:8, hp:50}, desc:'Still warm. Probably fine.' },

  // Easter egg items
  mrggl_idol:            { id:'mrggl_idol', name:"Mrggl's Idol", icon:'🐟', type:'armor', slot:'neck', quality:'legendary', value:999, stats:{atk:20, def:20, int:20, agi:20, crit:15, hp:120, mp:120}, desc:"MRGGLGLGL. Protects its wearer by confusing everyone nearby." },
  mimic_key:             { id:'mimic_key', name:'Suspicious Gold Key', icon:'🗝️', type:'consumable', quality:'uncommon', value:150, desc:"Dropped by a chest that fought back. Restores 1 HP and a lot of questions.", effect:{hp:1} },
  boblin_supply:         { id:'boblin_supply', name:"Boblin's Personal Snacks", icon:'🎒', type:'consumable', quality:'uncommon', value:50, desc:'Restores 250 HP. Tastes like being in the wrong dimension.', effect:{hp:250} },
};
