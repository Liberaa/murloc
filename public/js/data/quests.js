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
    rewards: { xp:200, gold:50, items:['iron_sword','chain_mail'] },
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
