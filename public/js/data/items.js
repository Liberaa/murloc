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
  chain_mail:       { id:'chain_mail',       name:'Chain Mail',       icon:'🧥',  type:'armor',   slot:'chest',   quality:'common',   value:40,  stats:{def:10, hp:20},    desc:'Interlocked iron rings.',     class:['warrior'] },
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
};
