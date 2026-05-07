// Items database
const ITEMS = {
  // Consumables
  health_potion:    { id:'health_potion',    name:'Health Potion',    icon:'🧪', type:'consumable', quality:'common',   value:10,  desc:'Restores 50 HP.',          effect:{hp:50} },
  mana_potion:      { id:'mana_potion',      name:'Mana Potion',      icon:'🔵', type:'consumable', quality:'common',   value:10,  desc:'Restores 30 MP.',          effect:{mp:30} },
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
};
