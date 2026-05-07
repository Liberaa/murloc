// Quest definitions
const QUESTS = {
  // Zone 1 quests
  q_wolf_hunt: {
    id: 'q_wolf_hunt',
    title: 'Wolf Problem',
    giverNpc: 'guard_leo',
    zone: 'greenwood',
    desc: 'Guard Leo is worried about the wolf packs growing too bold near the village. He needs you to thin their numbers.',
    objectives: [
      { id:'kill_wolves', type:'kill', mob:'forest_wolf', count:5, current:0, label:'Kill Forest Wolves (0/5)' }
    ],
    rewards: { xp:80, gold:20, items:['health_potion','health_potion'] },
    followUp: 'q_alpha_hunt'
  },
  q_alpha_hunt: {
    id: 'q_alpha_hunt',
    title: 'The Alpha',
    giverNpc: 'guard_leo',
    zone: 'greenwood',
    desc: 'The wolf packs are led by a massive Alpha Wolf deep in the forest. Bring it down and the forest will be safe.',
    objectives: [
      { id:'kill_alpha', type:'kill', mob:'alpha_wolf', count:1, current:0, label:'Defeat the Alpha Wolf (0/1)' }
    ],
    rewards: { xp:2000, gold:50, items:['iron_sword','chain_mail'] },
    followUp: null
  },
  q_spider_silk: {
    id: 'q_spider_silk',
    title: 'Silk for the Market',
    giverNpc: 'merchant_mira',
    zone: 'greenwood',
    desc: 'Mira needs spider silk for her trade goods. The giant spiders in the eastern forest are full of it.',
    objectives: [
      { id:'kill_spiders', type:'kill', mob:'giant_spider', count:4, current:0, label:'Kill Giant Spiders (0/4)' }
    ],
    rewards: { xp:60, gold:30, items:['mana_potion','bandage'] },
    followUp: null
  },

  // Zone 2 quests
  q_swamp_cleanup: {
    id: 'q_swamp_cleanup',
    title: 'Swamp Cleansing',
    giverNpc: 'elder_finn',
    zone: 'ashfen',
    desc: 'The marshes have become overrun with bog lurkers and trolls. Elder Finn asks you to reduce their numbers.',
    objectives: [
      { id:'kill_lurkers', type:'kill', mob:'bog_lurker', count:4, current:0, label:'Kill Bog Lurkers (0/4)' },
      { id:'kill_trolls', type:'kill', mob:'swamp_troll', count:3, current:0, label:'Kill Swamp Trolls (0/3)' }
    ],
    rewards: { xp:250, gold:70, items:['elixir_strength'] },
    followUp: 'q_bogmother'
  },
  q_bogmother: {
    id: 'q_bogmother',
    title: 'The Marsh Queen',
    giverNpc: 'elder_finn',
    zone: 'ashfen',
    desc: 'A massive creature, the Bogmother, rules the deep marsh. She must be defeated to restore peace.',
    objectives: [
      { id:'kill_bogmother', type:'kill', mob:'bogmother', count:1, current:0, label:'Defeat the Bogmother (0/1)' }
    ],
    rewards: { xp:500, gold:120, items:['steel_sword','arcane_staff'] },
    followUp: null
  },
  q_venom_cure: {
    id: 'q_venom_cure',
    title: 'Antidote Ingredients',
    giverNpc: 'alchemist_ada',
    zone: 'ashfen',
    desc: "Ada needs venom from the Venomfang Serpents to brew a powerful antidote for the village's plague.",
    objectives: [
      { id:'kill_serpents', type:'kill', mob:'venomfang_serpent', count:5, current:0, label:'Kill Venomfang Serpents (0/5)' }
    ],
    rewards: { xp:180, gold:55, items:['mana_potion','mana_potion','antidote'] },
    followUp: null
  },

  // Zone 3 quests
  q_ruins_guardian: {
    id: 'q_ruins_guardian',
    title: 'Guardians of the Ruin',
    giverNpc: 'knight_vara',
    zone: 'ironspire',
    desc: 'The Ironspire Ruins were once a great fortress. Now stone golems protect its secrets. Knight Vara needs them cleared.',
    objectives: [
      { id:'kill_golems', type:'kill', mob:'stone_golem', count:4, current:0, label:'Kill Stone Golems (0/4)' },
      { id:'kill_knights', type:'kill', mob:'dark_knight', count:3, current:0, label:'Kill Dark Knights (0/3)' }
    ],
    rewards: { xp:500, gold:150, items:['plate_armor'] },
    followUp: 'q_iron_lich'
  },
  q_iron_lich: {
    id: 'q_iron_lich',
    title: 'The Iron Lich',
    giverNpc: 'knight_vara',
    zone: 'ironspire',
    desc: 'The Iron Lich sits at the heart of the ruins, an undead warlord who must be destroyed before he raises an army.',
    objectives: [
      { id:'kill_lich', type:'kill', mob:'the_iron_lich', count:1, current:0, label:'Defeat the Iron Lich (0/1)' }
    ],
    rewards: { xp:1000, gold:300, items:['void_scepter','amulet_power'] },
    followUp: null
  },
  q_elemental_chaos: {
    id: 'q_elemental_chaos',
    title: 'Elemental Fury',
    giverNpc: 'blacksmith_borin',
    zone: 'ironspire',
    desc: 'Fire elementals have taken over Borin\'s forge site. Drive them away so he can reclaim it.',
    objectives: [
      { id:'kill_elementals', type:'kill', mob:'fire_elemental', count:4, current:0, label:'Kill Fire Elementals (0/4)' }
    ],
    rewards: { xp:360, gold:110, items:['elixir_strength','gloves_grip'] },
    followUp: null
  },

  // Zone 4 quests
  q_prophecy: {
    id: 'q_prophecy',
    title: 'The Prophecy',
    giverNpc: 'oracle_zyn',
    zone: 'chaos_throne',
    desc: "Oracle Zyn has foreseen the end — Arak'zoth must be slain before he tears open the void. This is your destiny.",
    objectives: [
      { id:'kill_demons', type:'kill', mob:'chaos_demon', count:5, current:0, label:'Kill Chaos Demons (0/5)' },
      { id:'kill_voids', type:'kill', mob:'void_stalker', count:3, current:0, label:'Kill Void Stalkers (0/3)' }
    ],
    rewards: { xp:800, gold:200, items:['health_potion','mana_potion','elixir_strength'] },
    followUp: 'q_final_boss'
  },
  q_final_boss: {
    id: 'q_final_boss',
    title: "Arak'zoth Must Fall",
    giverNpc: 'oracle_zyn',
    zone: 'chaos_throne',
    desc: "The time has come. Arak'zoth, Lord of Chaos, awaits you on his throne. End his reign — or die trying.",
    objectives: [
      { id:'kill_chaos_lord', type:'kill', mob:'chaos_lord', count:1, current:0, label:"Defeat Arak'zoth (0/1)" }
    ],
    rewards: { xp:5000, gold:1000, items:['void_scepter','assassin_daggers','champions_blade'] },
    followUp: null,
    finale: true
  },

  // Extra side quests
  q_ratcatcher: {
    id: 'q_ratcatcher',
    title: 'Rats in the Rootcellar',
    giverNpc: 'ranger_elowen',
    zone: 'greenwood',
    desc: 'Ranger Elowen wants the old rootcellar cleared before the rats spread into the grain stores.',
    objectives: [
      { id:'kill_rats', type:'kill', mob:'forest_rat', count:6, current:0, label:'Kill Forest Rats (0/6)' },
      { id:'kill_scouts', type:'kill', mob:'goblin_scout', count:3, current:0, label:'Kill Goblin Scouts (0/3)' }
    ],
    rewards: { xp:90, gold:35, items:['boots_haste'] },
    followUp: null
  },
  q_wraithlight: {
    id: 'q_wraithlight',
    title: 'Lights in the Mire',
    giverNpc: 'reed_scout',
    zone: 'ashfen',
    desc: 'Reed Scout Toma has marked strange lights drifting through the marsh. They are wraiths, and they are getting closer.',
    objectives: [
      { id:'kill_wraiths', type:'kill', mob:'marsh_wraith', count:4, current:0, label:'Kill Marsh Wraiths (0/4)' },
      { id:'kill_serpents_extra', type:'kill', mob:'venomfang_serpent', count:3, current:0, label:'Kill Venomfang Serpents (0/3)' }
    ],
    rewards: { xp:260, gold:80, items:['greater_mana_potion','orb_of_power'] },
    followUp: null
  },
  q_shadow_pages: {
    id: 'q_shadow_pages',
    title: 'Pages of the Black Archive',
    giverNpc: 'archivist_ren',
    zone: 'ironspire',
    desc: 'Archivist Ren believes the assassins are carrying pages from a forbidden archive. Take them back by force.',
    objectives: [
      { id:'kill_assassins_archive', type:'kill', mob:'shadow_assassin', count:4, current:0, label:'Kill Shadow Assassins (0/4)' },
      { id:'kill_elementals_archive', type:'kill', mob:'fire_elemental', count:3, current:0, label:'Kill Fire Elementals (0/3)' }
    ],
    rewards: { xp:620, gold:180, items:['sapphire_ring','greater_health_potion'] },
    followUp: null
  },

  // Zone 5 quests
  q_abyss_patrol: {
    id: 'q_abyss_patrol',
    title: 'The Drowned Patrol',
    giverNpc: 'captain_nere',
    zone: 'sunken_abyss',
    desc: 'Captain Nere asks you to put down the drowned sailors and their coral sentries before they breach the upper caverns.',
    objectives: [
      { id:'kill_drowned', type:'kill', mob:'drowned_sailor', count:5, current:0, label:'Kill Drowned Sailors (0/5)' },
      { id:'kill_coral_guardians', type:'kill', mob:'coral_guardian', count:3, current:0, label:'Kill Coral Guardians (0/3)' }
    ],
    rewards: { xp:1100, gold:320, items:['heroic_health_potion','tidewalker_boots'] },
    followUp: 'q_abyss_mages'
  },
  q_abyss_mages: {
    id: 'q_abyss_mages',
    title: 'Silence the Deep Choir',
    giverNpc: 'captain_nere',
    zone: 'sunken_abyss',
    desc: 'The abyssal mages are singing the drowned kingdom awake. Silence them before the whole ruin rises.',
    objectives: [
      { id:'kill_abyss_mages', type:'kill', mob:'abyssal_mage', count:4, current:0, label:'Kill Abyssal Mages (0/4)' },
      { id:'kill_tide_assassins', type:'kill', mob:'tide_assassin', count:4, current:0, label:'Kill Tide Assassins (0/4)' }
    ],
    rewards: { xp:1350, gold:420, items:['storm_elixir','pearl_of_focus'] },
    followUp: null
  },
  q_leviathan_rises: {
    id: 'q_leviathan_rises',
    title: 'When the Leviathan Rises',
    giverNpc: 'tide_seer',
    zone: 'sunken_abyss',
    desc: 'Tide-Seer Luma has seen Thalrassa wake beneath the city. Break the colossi and face the leviathan.',
    objectives: [
      { id:'kill_pearl_colossi', type:'kill', mob:'pearl_colossus', count:3, current:0, label:'Kill Pearl Colossi (0/3)' },
      { id:'kill_leviathan', type:'kill', mob:'abyss_leviathan', count:1, current:0, label:'Defeat Thalrassa (0/1)' }
    ],
    rewards: { xp:4500, gold:1200, items:['crown_of_depths','leviathan_charm','storm_elixir'] },
    followUp: null
  }
};

// NPC dialog scripts
const DIALOGS = {
  start_quest_wolf: {
    npc: 'Guard Leo',
    portrait: '💂',
    lines: [
      "Adventurer! Thank the gods you've arrived. The wolves have been attacking our farmers.",
      "I need someone brave enough to thin their numbers — and deal with their Alpha.",
      "Will you help us?"
    ],
    acceptQuest: 'q_wolf_hunt',
    declineText: 'Not right now.'
  },
  start_quest_swamp: {
    npc: 'Elder Finn',
    portrait: '👴',
    lines: [
      "The marshes are cursed, traveler. Bog lurkers drag people under every night.",
      "And the trolls... they grow bolder each moon.",
      "Please, will you cleanse the swamp of these beasts?"
    ],
    acceptQuest: 'q_swamp_cleanup',
    declineText: 'Not right now.'
  },
  start_quest_ruins: {
    npc: 'Knight Vara',
    portrait: '⚔️',
    lines: [
      "The Ironspire was once a great fortress of our order. Now it's overrun.",
      "Golems walk its halls, dark knights guard its gates — and worse things lurk within.",
      "Help me reclaim it. Clear the guardians and face what lies at the center."
    ],
    acceptQuest: 'q_ruins_guardian',
    declineText: 'Not right now.'
  },
  start_quest_chaos: {
    npc: 'Oracle Zyn',
    portrait: '🔮',
    lines: [
      "I have seen your destiny written in the void, hero.",
      "Arak'zoth stirs in his throne. His demons flood into our world.",
      "You must face him. Prove yourself first — slay his demon guards. Then face the Lord of Chaos himself."
    ],
    acceptQuest: 'q_prophecy',
    declineText: 'I need more time.'
  }
};
