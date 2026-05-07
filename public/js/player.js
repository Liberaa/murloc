// Player state and logic
const Player = (() => {
  const BASE_STATS = {
    warrior: { hp:120, mp:40, atk:14, def:8, str:10, agi:4, int:2, crit:5 },
    mage:    { hp:80,  mp:100, atk:6, def:4, str:3, agi:5, int:14, crit:8 },
    rogue:   { hp:95,  mp:60,  atk:12, def:5, str:5, agi:12, int:4, crit:12 }
  };
  const GROWTH = {
    warrior: { hp:18, mp:4,  atk:2.2, def:1.5 },
    mage:    { hp:10, mp:14, atk:1.0, def:0.8 },
    rogue:   { hp:13, mp:7,  atk:1.8, def:1.0 }
  };

  let state = null;

  function create(name, spec) {
    const base = BASE_STATS[spec];
    state = {
      name, spec,
      level: 1,
      xp: 0,
      xpToNext: 100,
      gold: 50,
      // Combat stats
      maxHp: base.hp,
      hp: base.hp,
      maxMp: base.mp,
      mp: base.mp,
      atk: base.atk,
      def: base.def,
      str: base.str,
      agi: base.agi,
      int: base.int,
      crit: base.crit,
      // Bonus accumulators from talents/gear
      bonusAtkPct: 0, bonusDefPct: 0, bonusIntPct: 0,
      bonusAgiPct: 0, bonusMaxHp: 0, bonusMaxMp: 0,
      lifeSteal: 0, dodgeChance: 0, attackPoison: 0, mpRegen: 0,
      // Skills & spells (populated by talents)
      skills: spec === 'warrior' ? [
        {id:'power_strike', name:'Power Strike', icon:'⚔️', type:'attack', dmgMult:1.3, mp:10, cooldown:1, cd:0, desc:'Heavy blow for 130% ATK.'}
      ] : spec === 'rogue' ? [
        {id:'sinister_strike', name:'Sinister Strike', icon:'🗡️', type:'attack', dmgMult:1.4, mp:8, cooldown:1, cd:0, desc:'Swift blow for 140% ATK.'}
      ] : [],
      spells: spec === 'mage' ? [
        {id:'frostbolt', name:'Frostbolt', icon:'❄️', type:'magic', dmgMult:1.5, mp:15, cooldown:1, cd:0, desc:'Frost bolt for 150% INT damage.'}
      ] : [],
      // Equipped items by slot
      equipped: { weapon:null, chest:null, head:null, offhand:null, ring:null, neck:null, feet:null, hands:null },
      // Inventory: array of { itemId, qty }
      inventory: [
        { itemId:'health_potion', qty:2 },
        { itemId:'mana_potion', qty:1 }
      ],
      // Talent points spent: { talentId: rank }
      talentsLearned: {},
      talentPoints: 0,
      lastLevelGains: null,
      // Quest progress
      activeQuests: [],
      completedQuests: [],
      // World position
      zone: 'greenwood',
      x: 150, y: 350,
      // Kill counter for quest objectives
      killCounts: {},
      // Status effects (in combat)
      statusEffects: [],
      // Combat state flags
      evading: false,
      nextCrit: false,
      damageAmp: 0,
      buffAtk: 0,
      buffDef: 0,
      buffAtkTurns: 0,
      buffDefTurns: 0,
    };
    return state;
  }

  function get() { return state; }
  function set(s) { state = s; }

  function totalStat(stat) {
    const p = state;
    const gear = getGearBonus();
    switch(stat) {
      case 'atk': return Math.floor((p.atk + (gear.atk||0)) * (1 + p.bonusAtkPct));
      case 'def': return Math.floor((p.def + (gear.def||0)) * (1 + p.bonusDefPct));
      case 'int': return Math.floor((p.int + (gear.int||0)) * (1 + p.bonusIntPct));
      case 'agi': return Math.floor((p.agi + (gear.agi||0)) * (1 + p.bonusAgiPct));
      case 'maxHp': return p.maxHp + (gear.hp||0) + p.bonusMaxHp;
      case 'maxMp': return p.maxMp + (gear.mp||0) + p.bonusMaxMp;
      case 'crit': return p.crit + (gear.crit||0);
    }
    return 0;
  }

  function getGearBonus() {
    const bonus = {};
    Object.values(state.equipped).forEach(itemId => {
      if (!itemId) return;
      const item = ITEMS[itemId];
      if (!item || !item.stats) return;
      Object.entries(item.stats).forEach(([k,v]) => { bonus[k] = (bonus[k]||0) + v; });
    });
    return bonus;
  }

  function gainXP(amount) {
    state.xp += amount;
    let leveled = false;
    state.lastLevelGains = null;
    while (state.xp >= state.xpToNext) {
      state.xp -= state.xpToNext;
      const gains = levelUp();
      state.lastLevelGains = mergeLevelGains(state.lastLevelGains, gains);
      leveled = true;
    }
    return leveled;
  }

  function levelUp() {
    state.level++;
    state.talentPoints++;
    const g = GROWTH[state.spec];
    const oldMaxHp = totalStat('maxHp');
    const oldMaxMp = totalStat('maxMp');
    state.maxHp += g.hp;
    state.maxMp += g.mp;
    state.atk += g.atk;
    state.def += g.def;
    // Restore some HP/MP on level up
    state.hp = Math.min(state.hp + Math.floor(g.hp * 2), totalStat('maxHp'));
    state.mp = Math.min(state.mp + Math.floor(g.mp * 2), totalStat('maxMp'));
    state.xpToNext = Math.floor(state.xpToNext * 1.4);
    const gold = 50 + state.level * 25;
    state.gold += gold;
    return { hp: Math.floor(g.hp), mp: Math.floor(g.mp), atk: Math.floor(g.atk), def: Math.floor(g.def), gold };
  }

  function mergeLevelGains(total, gains) {
    if (!total) return { ...gains };
    Object.entries(gains).forEach(([k, v]) => { total[k] = (total[k] || 0) + v; });
    return total;
  }

  function getLastLevelGains() {
    return state?.lastLevelGains || null;
  }

  function addToInventory(itemId, qty=1) {
    const existing = state.inventory.find(e => e.itemId === itemId);
    if (existing) existing.qty += qty;
    else state.inventory.push({ itemId, qty });
  }

  function removeFromInventory(itemId, qty=1) {
    const idx = state.inventory.findIndex(e => e.itemId === itemId);
    if (idx === -1) return false;
    state.inventory[idx].qty -= qty;
    if (state.inventory[idx].qty <= 0) state.inventory.splice(idx, 1);
    return true;
  }

  function hasItem(itemId) {
    const e = state.inventory.find(e => e.itemId === itemId);
    return e ? e.qty : 0;
  }

  function equipItem(itemId) {
    const item = ITEMS[itemId];
    if (!item || !item.slot) return false;
    // Check class restriction
    if (item.class && !item.class.includes(state.spec)) return false;
    const old = state.equipped[item.slot];
    state.equipped[item.slot] = itemId;
    removeFromInventory(itemId);
    if (old) addToInventory(old);
    // Recompute hp/mp caps
    const maxHp = totalStat('maxHp');
    const maxMp = totalStat('maxMp');
    if (state.hp > maxHp) state.hp = maxHp;
    if (state.mp > maxMp) state.mp = maxMp;
    return true;
  }

  function unequipItem(slot) {
    const itemId = state.equipped[slot];
    if (!itemId) return false;
    state.equipped[slot] = null;
    addToInventory(itemId);
    return true;
  }

  function learnTalent(talentId) {
    const tree = TALENT_TREES[state.spec];
    let talent = null;
    for (const tier of tree) {
      talent = tier.nodes.find(n => n.id === talentId);
      if (talent) break;
    }
    if (!talent) return { ok:false, msg:'Unknown talent.' };
    if (state.talentPoints < 1) return { ok:false, msg:'No talent points.' };
    const currentRank = state.talentsLearned[talentId] || 0;
    if (currentRank >= talent.maxRank) return { ok:false, msg:'Already at max rank.' };
    // Check requirements
    if (talent.requires) {
      for (const req of talent.requires) {
        if (!(state.talentsLearned[req] > 0)) return { ok:false, msg:'Requires another talent first.' };
      }
    }
    state.talentsLearned[talentId] = currentRank + 1;
    state.talentPoints--;
    // Apply effect (pass current rank)
    if (talent.effect) talent.effect(state, state.talentsLearned[talentId]);
    return { ok:true };
  }

  function recordKill(mobId) {
    state.killCounts[mobId] = (state.killCounts[mobId] || 0) + 1;
    // Update active quest objectives
    state.activeQuests.forEach(qid => {
      const quest = QUESTS[qid];
      if (!quest) return;
      quest.objectives.forEach(obj => {
        if (obj.type === 'kill' && obj.mob === mobId) {
          obj.current = Math.min((obj.current||0) + 1, obj.count);
        }
      });
    });
  }

  function checkQuestComplete(questId) {
    const quest = QUESTS[questId];
    if (!quest) return false;
    return quest.objectives.every(o => o.current >= o.count);
  }

  function completeQuest(questId) {
    const quest = QUESTS[questId];
    if (!quest) return;
    const idx = state.activeQuests.indexOf(questId);
    if (idx !== -1) state.activeQuests.splice(idx, 1);
    state.completedQuests.push(questId);
    // Rewards
    if (quest.rewards.xp) gainXP(quest.rewards.xp);
    if (quest.rewards.gold) state.gold += quest.rewards.gold;
    if (quest.rewards.items) quest.rewards.items.forEach(id => addToInventory(id));
    // Reset objectives for replay safety
    quest.objectives.forEach(o => { o.current = 0; });
    return quest;
  }

  function acceptQuest(questId) {
    if (state.activeQuests.includes(questId)) return false;
    if (state.completedQuests.includes(questId)) return false;
    state.activeQuests.push(questId);
    return true;
  }

  function fullHeal() {
    state.hp = totalStat('maxHp');
    state.mp = totalStat('maxMp');
  }

  function toSave() { return JSON.stringify(state); }
  function fromSave(json) { state = JSON.parse(json); }

  return { create, get, set, totalStat, getGearBonus, gainXP, levelUp, getLastLevelGains, addToInventory,
           removeFromInventory, hasItem, equipItem, unequipItem, learnTalent,
           recordKill, checkQuestComplete, completeQuest, acceptQuest, fullHeal,
           toSave, fromSave };
})();
