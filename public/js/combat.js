// Combat system
const Combat = (() => {
  let enemy = null;
  let combatLog = [];
  let playerTurn = true;
  let combatOver = false;

  let statusEffects = { player: [], enemy: [] }; // [{type, val, turns}]
  let onWin = null;
  let onLose = null;
  let enemyCurrentHp = 0;
  let enemyMaxHp = 0;
  let stunned = { player: false, enemy: false };
  let evading = { player: false, enemy: false };
  let nextCrit = { player: false, enemy: false };
  let damageAmp = { player: 0, enemy: 0 };  // extra % dmg taken
  let reflect = { enemy: false };
  let skillCooldowns = {};

  function start(mobId, winCb, loseCb) {
    const mobTemplate = MOBS[mobId];
    enemy = JSON.parse(JSON.stringify(mobTemplate));
    enemyCurrentHp = enemy.hp;
    enemyMaxHp = enemy.hp;
    onWin = winCb;
    onLose = loseCb;
    combatLog = [];
    combatOver = false;
    playerTurn = true;
    enemyPhase = 0;
    statusEffects = { player: [], enemy: [] };
    stunned = { player: false, enemy: false };
    evading = { player: false, enemy: false };
    nextCrit = { player: false, enemy: false };
    damageAmp = { player: 0, enemy: 0 };
    reflect = { enemy: false };
    skillCooldowns = {};

    // Init player skill CDs
    const p = Player.get();
    [...p.skills, ...p.spells].forEach(s => { skillCooldowns[s.id] = 0; });

    renderCombatScreen();
    addLog(`You encounter ${enemy.name}!`, 'system');
    addLog('Choose your action.', 'system');

    // Show main menu
    showMainMenu();
  }

  function renderCombatScreen() {
    const p = Player.get();
    document.getElementById('combat-player-name').textContent = p.name;
    document.getElementById('combat-enemy-name').textContent = enemy.name;

    // Set sprite classes
    const ps = document.getElementById('combat-player-sprite');
    ps.className = 'combat-sprite sprite-' + p.spec;

    // Set enemy sprite color via inline style
    const es = document.getElementById('combat-enemy-sprite');
    es.className = 'combat-sprite enemy-sprite';
    es.style.filter = `hue-rotate(${enemy.hueRotate||0}deg)`;

    updateBars();
  }

  function updateBars() {
    const p = Player.get();
    const maxHp = Player.totalStat('maxHp');
    const maxMp = Player.totalStat('maxMp');

    setBar('cbar-player-hp', p.hp, maxHp);
    setBar('cbar-player-mp', p.mp, maxMp);
    document.getElementById('cbar-player-hp-val').textContent = `${p.hp}/${maxHp}`;
    document.getElementById('cbar-player-mp-val').textContent = `${p.mp}/${maxMp}`;

    setBar('cbar-enemy-hp', enemyCurrentHp, enemyMaxHp);
    document.getElementById('cbar-enemy-hp-val').textContent = `${enemyCurrentHp}/${enemyMaxHp}`;

    // HUD bars
    UI.updateHUD();
  }

  function setBar(id, cur, max) {
    const el = document.getElementById(id);
    if (el) el.style.width = Math.max(0, (cur / max) * 100) + '%';
  }

  function addLog(msg, cls='system') {
    combatLog.unshift({ msg, cls });
    if (combatLog.length > 20) combatLog.pop();
    renderLog();
  }

  function renderLog() {
    const box = document.getElementById('combat-log-text');
    box.innerHTML = combatLog.map(e => `<div class="log-${e.cls}">${e.msg}</div>`).join('');
  }

  // ===== MENUS =====
  function showMainMenu() {
    if (combatOver) return;
    document.getElementById('combat-main-menu').classList.remove('hidden');
    document.getElementById('combat-sub-menu').classList.add('hidden');
    document.getElementById('combat-sub-menu').innerHTML = '';

  }

  function showSkills() {
    const p = Player.get();
    if (!p) return;
    const sub = document.getElementById('combat-sub-menu');
    document.getElementById('combat-main-menu').classList.add('hidden');
    sub.classList.remove('hidden');
    if (!p.skills.length) {
      sub.innerHTML = '<div style="color:#888;padding:8px;">No skills yet. Learn talents!</div><button class="combat-btn combat-btn-back" onclick="Combat.showMainMenu()">← Back</button>';
      return;
    }
    sub.innerHTML = p.skills.map(s => {
      const cd = skillCooldowns[s.id] || 0;
      const canUse = p.mp >= s.mp && cd === 0;
      return `<button class="combat-btn" onclick="Combat.useSkill('${s.id}')" ${canUse?'':'disabled'}>
        ${s.icon} ${s.name} <small style="color:#888">(${s.mp}MP${cd>0?' CD:'+cd:''})</small>
      </button>`;
    }).join('') + '<button class="combat-btn combat-btn-back" onclick="Combat.showMainMenu()">← Back</button>';
  }

  function showSpells() {
    const p = Player.get();
    if (!p) return;
    const sub = document.getElementById('combat-sub-menu');
    document.getElementById('combat-main-menu').classList.add('hidden');
    sub.classList.remove('hidden');
    if (!p.spells.length) {
      sub.innerHTML = '<div style="color:#888;padding:8px;">No spells yet. Learn talents!</div><button class="combat-btn combat-btn-back" onclick="Combat.showMainMenu()">← Back</button>';
      return;
    }
    sub.innerHTML = p.spells.map(s => {
      const cd = skillCooldowns[s.id] || 0;
      const canUse = p.mp >= s.mp && cd === 0;
      return `<button class="combat-btn" onclick="Combat.useSpell('${s.id}')" ${canUse?'':'disabled'}>
        ${s.icon} ${s.name} <small style="color:#888">(${s.mp}MP${cd>0?' CD:'+cd:''})</small>
      </button>`;
    }).join('') + '<button class="combat-btn combat-btn-back" onclick="Combat.showMainMenu()">← Back</button>';
  }

  function showItems() {
    const p = Player.get();
    if (!p) return;
    const sub = document.getElementById('combat-sub-menu');
    document.getElementById('combat-main-menu').classList.add('hidden');
    sub.classList.remove('hidden');
    const consumables = p.inventory.filter(e => {
      const item = ITEMS[e.itemId];
      return item && item.type === 'consumable';
    });
    if (!consumables.length) {
      sub.innerHTML = '<div style="color:#888;padding:8px;">No items.</div><button class="combat-btn combat-btn-back" onclick="Combat.showMainMenu()">← Back</button>';
      return;
    }
    sub.innerHTML = consumables.map(e => {
      const item = ITEMS[e.itemId];
      return `<button class="combat-btn" onclick="Combat.useItem('${e.itemId}')">
        ${item.icon} ${item.name} <small style="color:#888">x${e.qty}</small>
      </button>`;
    }).join('') + '<button class="combat-btn combat-btn-back" onclick="Combat.showMainMenu()">← Back</button>';
  }

  // ===== PLAYER ACTIONS =====
  function playerAction(type) {
    if (!playerTurn || combatOver) return;
    if (stunned.player) {
      addLog('You are stunned!', 'system');
      endPlayerTurn();
      return;
    }
    if (type === 'attack') doPlayerAttack();
  }

  function doPlayerAttack() {
    const p = Player.get();
    let atk = Player.totalStat('atk');
    const crit = isCrit() || nextCrit.player;
    nextCrit.player = false;

    // Apply buffs
    if (p.buffAtkTurns > 0) atk = Math.floor(atk * (1 + p.buffAtk));

    // Damage amp on enemy
    let dmg = calcDmg(atk, enemy.def);
    if (crit) dmg = Math.floor(dmg * 1.8);
    if (damageAmp.enemy > 0) dmg = Math.floor(dmg * (1 + damageAmp.enemy));

    // Check reflect
    if (reflect.enemy) {
      const refDmg = Math.floor(dmg * 0.3);
      damageSelf(refDmg);
      addLog(`The shield reflects ${refDmg} damage back at you!`, 'enemy');
    }

    damageEnemy(dmg, crit ? 'crit' : 'physical');
    addLog(`${crit?'⚡ CRIT! ':''}You attack ${enemy.name} for ${dmg} damage.`, 'player');

    // Lifesteal
    if (p.lifeSteal > 0) {
      const heal = Math.min(p.lifeSteal, Player.totalStat('maxHp') - p.hp);
      if (heal > 0) { p.hp += heal; addLog(`You heal ${heal} HP.`, 'player'); }
    }

    // Attack poison
    if (p.attackPoison > 0) applyStatus('enemy', 'poison', p.attackPoison, 3);

    if (!checkEnemyDead()) endPlayerTurn();
  }

  function useSkill(skillId) {
    if (!playerTurn || combatOver) return;
    const p = Player.get();
    const skill = p.skills.find(s => s.id === skillId);
    if (!skill) return;
    if (p.mp < skill.mp) { addLog("Not enough MP!", 'system'); return; }
    if ((skillCooldowns[skillId]||0) > 0) { addLog("Skill on cooldown!", 'system'); return; }

    p.mp = Math.max(0, p.mp - skill.mp);
    skillCooldowns[skillId] = skill.cooldown || 0;

    if (skill.type === 'attack') {
      let atk = Player.totalStat('atk');
      if (p.buffAtkTurns > 0) atk = Math.floor(atk * (1 + p.buffAtk));
      let dmg = calcDmg(Math.floor(atk * skill.dmgMult), enemy.def);
      const crit = isCrit() || skill.firstCrit || nextCrit.player;
      nextCrit.player = false;
      if (crit) dmg = Math.floor(dmg * 1.8);
      if (damageAmp.enemy > 0) dmg = Math.floor(dmg * (1 + damageAmp.enemy));
      damageEnemy(dmg, crit ? 'crit' : 'physical');
      addLog(`${crit?'⚡ CRIT! ':''}${skill.icon} ${skill.name}: ${dmg} damage!`, 'player');

    } else if (skill.type === 'multihit') {
      let totalDmg = 0;
      for (let i = 0; i < skill.hits; i++) {
        let atk = Player.totalStat('atk');
        let dmg = calcDmg(Math.floor(atk * skill.dmgMult), enemy.def);
        damageEnemy(dmg, 'physical', false);
        totalDmg += dmg;
      }
      addLog(`${skill.icon} ${skill.name}: ${skill.hits} hits for ${totalDmg} total!`, 'player');

    } else if (skill.type === 'buff') {
      if (skill.buffAtk) { p.buffAtk = skill.buffAtk; p.buffAtkTurns = skill.duration; }
      if (skill.buffDef) { p.buffDef = skill.buffDef; p.buffDefTurns = skill.duration; }
      if (skill.evade) evading.player = true;
      if (skill.nextCrit) nextCrit.player = true;
      addLog(`${skill.icon} ${skill.name} activated!`, 'player');

    } else if (skill.type === 'debuff') {
      if (skill.effect === 'reduce_atk') applyStatus('enemy', 'atk_down', 0.2, 2);
      if (skill.effect === 'reduce_def') applyStatus('enemy', 'def_down', 0.2, 2);
      if (skill.effect === 'stun') stunned.enemy = true;
      if (skill.dmgAmp) { damageAmp.enemy = skill.dmgAmp; setTimeout(() => { damageAmp.enemy = 0; }, skill.duration * 3000); }
      addLog(`${skill.icon} ${skill.name}!`, 'player');

    } else if (skill.type === 'dot') {
      applyStatus('enemy', 'bleed', skill.dotDmg, skill.dotTurns);
      addLog(`${skill.icon} ${skill.name}: bleed applied!`, 'player');
    }

    showMainMenu();
    updateBars();
    if (!checkEnemyDead()) endPlayerTurn();
  }

  function useSpell(spellId) {
    if (!playerTurn || combatOver) return;
    const p = Player.get();
    const spell = p.spells.find(s => s.id === spellId);
    if (!spell) return;
    if (p.mp < spell.mp) { addLog("Not enough MP!", 'system'); return; }
    if ((skillCooldowns[spellId]||0) > 0) { addLog("Spell on cooldown!", 'system'); return; }

    p.mp = Math.max(0, p.mp - spell.mp);
    skillCooldowns[spellId] = spell.cooldown || 0;

    if (spell.type === 'fire' || spell.type === 'magic') {
      let spellPower = Player.totalStat('int');
      let dmg = Math.floor(spellPower * spell.dmgMult);
      const crit = isCrit() || nextCrit.player;
      nextCrit.player = false;
      if (crit) dmg = Math.floor(dmg * 1.8);
      if (damageAmp.enemy > 0) dmg = Math.floor(dmg * (1 + damageAmp.enemy));
      if (spell.effect === 'stun') stunned.enemy = true;
      damageEnemy(dmg, crit ? 'crit' : spell.type);
      addLog(`${crit?'⚡ CRIT! ':''}${spell.icon} ${spell.name}: ${dmg} damage!`, 'player');
      if (spell.restoreMp) { p.mp = Math.min(Player.totalStat('maxMp'), p.mp + spell.restoreMp); addLog(`Restored ${spell.restoreMp} MP.`, 'player'); }

    } else if (spell.type === 'buff') {
      if (spell.nextCrit) nextCrit.player = true;
      addLog(`${spell.icon} ${spell.name} activated!`, 'player');
    }

    showMainMenu();
    updateBars();
    if (!checkEnemyDead()) endPlayerTurn();
  }

  function useItem(itemId) {
    if (!playerTurn || combatOver) return;
    const p = Player.get();
    const item = ITEMS[itemId];
    if (!item) return;
    if (!Player.hasItem(itemId)) return;

    if (item.effect) {
      if (item.effect.hp) {
        const heal = Math.min(item.effect.hp, Player.totalStat('maxHp') - p.hp);
        p.hp += heal;
        addLog(`${item.icon} ${item.name}: restored ${heal} HP.`, 'player');
      }
      if (item.effect.mp) {
        const mana = Math.min(item.effect.mp, Player.totalStat('maxMp') - p.mp);
        p.mp += mana;
        addLog(`${item.icon} ${item.name}: restored ${mana} MP.`, 'player');
      }
      if (item.effect.flee) {
        Player.removeFromInventory(itemId);
        flee();
        return;
      }
    }
    Player.removeFromInventory(itemId);
    showMainMenu();
    updateBars();
    endPlayerTurn();
  }

  function flee() {
    if (combatOver) return;
    const chance = 0.5 + (Player.totalStat('agi') - enemy.level * 2) * 0.01;
    if (Math.random() < Math.max(0.2, Math.min(0.8, chance))) {
      addLog("You fled from combat!", 'system');
      combatOver = true;
      setTimeout(() => Game.exitCombat(false), 1500);
    } else {
      addLog("You failed to flee!", 'system');
      endPlayerTurn();
    }
  }

  // ===== ENEMY TURN =====
  function enemyTurn() {
    if (combatOver) return;
    // Tick status effects first
    tickStatusEffects();

    if (combatOver) return;

    if (stunned.enemy) {
      addLog(`${enemy.name} is stunned!`, 'system');
      stunned.enemy = false;
      endEnemyTurn();
      return;
    }

    // Check boss phase transitions
    checkBossPhase();

    // MP regen for player (mages)
    const p = Player.get();
    if (p.mpRegen > 0) {
      p.mp = Math.min(Player.totalStat('maxMp'), p.mp + p.mpRegen);
    }

    // Enemy AI
    doEnemyAI();
  }

  function doEnemyAI() {
    const hpPct = enemyCurrentHp / enemyMaxHp;
    const roll = Math.random();

    // Boss and magic enemies use skills more often
    const skillChance = enemy.aiType === 'boss' ? 0.55 : enemy.aiType === 'magic' ? 0.45 : 0.3;

    if (enemy.skills && enemy.skills.length && roll < skillChance) {
      // Filter usable skills
      const usable = enemy.skills.filter(s => {
        if (s.type === 'heal' && hpPct > 0.5) return false; // only heal below 50%
        return true;
      });
      if (usable.length) {
        const skill = usable[Math.floor(Math.random() * usable.length)];
        doEnemySkill(skill);
        return;
      }
    }
    doEnemyBasicAttack();
  }

  function doEnemyBasicAttack() {
    const p = Player.get();
    if (evading.player) {
      evading.player = false;
      addLog(`${enemy.name} attacks — you dodge!`, 'enemy');
      endEnemyTurn();
      return;
    }
    let dmg = calcDmg(enemy.atk, Player.totalStat('def'));
    // Apply player buff def reduction
    if (p.buffDefTurns > 0) dmg = Math.floor(dmg * (1 - p.buffDef));
    if (dmg < 1) dmg = 1;
    p.hp = Math.max(0, p.hp - dmg);
    addLog(`${enemy.name} attacks you for ${dmg} damage.`, 'enemy');
    spawnDamageNumber(dmg, 'physical', false);
    updateBars();
    if (p.hp <= 0) { combatOver = true; addLog("You have been defeated...", 'system'); setTimeout(() => onLose && onLose(), 2000); }
    else endEnemyTurn();
  }

  function doEnemySkill(skill) {
    const p = Player.get();
    if (skill.type === 'heal') {
      const healAmt = Math.abs(skill.dmg);
      enemyCurrentHp = Math.min(enemyMaxHp, enemyCurrentHp + healAmt);
      addLog(`${enemy.name} uses ${skill.name} and heals ${healAmt} HP!`, 'enemy');
      spawnDamageNumber(healAmt, 'heal', true);
      updateBars();
      endEnemyTurn();
      return;
    }
    if (skill.type === 'buff') {
      if (skill.effect === 'evade') evading.enemy = true;
      if (skill.effect === 'reflect') reflect.enemy = true;
      addLog(`${enemy.name} uses ${skill.name}!`, 'enemy');
      endEnemyTurn();
      return;
    }
    if (skill.type === 'debuff') {
      if (skill.effect === 'reduce_atk') applyStatus('player', 'atk_down', 0.2, 2);
      if (skill.effect === 'reduce_def') applyStatus('player', 'def_down', 0.2, 2);
      if (skill.effect === 'reduce_all') { applyStatus('player', 'atk_down', 0.15, 3); applyStatus('player', 'def_down', 0.15, 3); }
      addLog(`${enemy.name} uses ${skill.name}!`, 'enemy');
      endEnemyTurn();
      return;
    }

    // Damage skill
    if (evading.player) {
      evading.player = false;
      addLog(`${enemy.name} uses ${skill.name} — you dodge!`, 'enemy');
      endEnemyTurn();
      return;
    }
    let dmg = Math.max(1, skill.dmg + Math.floor(enemy.atk * 0.3) - Math.floor(Player.totalStat('def') * 0.5));
    if (skill.lifesteal) { enemyCurrentHp = Math.min(enemyMaxHp, enemyCurrentHp + Math.floor(dmg * 0.5)); }
    if (skill.effect === 'poison') applyStatus('player', 'poison', 8, 3);
    if (skill.effect === 'stun') stunned.player = true;
    if (p.buffDefTurns > 0) dmg = Math.floor(dmg * (1 - p.buffDef));
    p.hp = Math.max(0, p.hp - dmg);
    addLog(`${enemy.name} uses ${skill.name} for ${dmg} damage!`, 'enemy');
    spawnDamageNumber(dmg, skill.type === 'poison' ? 'magic' : 'physical', false);
    updateBars();
    if (p.hp <= 0) { combatOver = true; addLog("You have been defeated...", 'system'); setTimeout(() => onLose && onLose(), 2000); }
    else endEnemyTurn();
  }

  function checkBossPhase() {
    if (!enemy.phases) return;
    const hpPct = enemyCurrentHp / enemyMaxHp;
    enemy.phases.forEach((phase) => {
      if (!phase._triggered && hpPct <= phase.hpPct) {
        phase._triggered = true;
        addLog(phase.msg, 'system');
        if (phase.atkMult) enemy.atk = Math.floor(enemy.atk * phase.atkMult);
        // Show boss phase flash
        const scene = document.getElementById('combat-bg');
        scene.style.background = 'radial-gradient(ellipse, #3a0000, #0a0000)';
        setTimeout(() => { scene.style.background = ''; }, 500);
      }
    });
  }

  // ===== STATUS EFFECTS =====
  function applyStatus(target, type, val, turns) {
    statusEffects[target].push({ type, val, turns });
  }

  function tickStatusEffects() {
    const p = Player.get();
    ['player','enemy'].forEach(target => {
      const effects = statusEffects[target];
      const toRemove = [];
      effects.forEach((eff, i) => {
        if (eff.type === 'poison' || eff.type === 'bleed') {
          const dmg = eff.val;
          if (target === 'player') {
            p.hp = Math.max(0, p.hp - dmg);
            addLog(`Poison deals ${dmg} damage to you!`, 'enemy');
            if (p.hp <= 0) { combatOver = true; setTimeout(() => onLose && onLose(), 1500); }
          } else {
            damageEnemy(dmg, 'magic', false);
            addLog(`Bleed deals ${dmg} damage to ${enemy.name}!`, 'player');
          }
        } else if (eff.type === 'atk_down') {
          if (target === 'enemy') enemy.atk = Math.floor(enemy.atk * 0.95);
        } else if (eff.type === 'def_down') {
          if (target === 'enemy') enemy.def = Math.floor(enemy.def * 0.95);
        }
        eff.turns--;
        if (eff.turns <= 0) toRemove.push(i);
      });
      toRemove.reverse().forEach(i => effects.splice(i, 1));
    });
    // Tick player buffs
    if (p.buffAtkTurns > 0) p.buffAtkTurns--;
    if (p.buffDefTurns > 0) p.buffDefTurns--;
    // Tick skill cooldowns
    Object.keys(skillCooldowns).forEach(id => { if (skillCooldowns[id] > 0) skillCooldowns[id]--; });
    updateBars();
    if (checkEnemyDead()) return;
  }

  // ===== DAMAGE / HELPERS =====
  function calcDmg(atk, def) {
    const base = Math.max(1, atk - Math.floor(def * 0.6));
    return Math.floor(base * (0.85 + Math.random() * 0.3));
  }

  function isCrit() {
    return Math.random() * 100 < Player.totalStat('crit');
  }

  function damageEnemy(dmg, type='physical', showNum=true) {
    enemyCurrentHp = Math.max(0, enemyCurrentHp - dmg);
    if (showNum) spawnDamageNumber(dmg, type, true);
    updateBars();
  }

  function damageSelf(dmg) {
    const p = Player.get();
    p.hp = Math.max(0, p.hp - dmg);
    updateBars();
  }

  function spawnDamageNumber(dmg, type, isEnemy) {
    const container = document.getElementById('damage-numbers');
    const el = document.createElement('div');
    const isCritVal = type === 'crit';
    el.className = `dmg-num ${isCritVal ? 'dmg-crit' : type === 'heal' ? 'dmg-heal' : type === 'fire' ? 'dmg-fire' : type === 'magic' ? 'dmg-magic' : 'dmg-physical'}`;
    el.textContent = (type === 'heal' ? '+' : '-') + dmg;
    const x = isEnemy ? (60 + Math.random() * 20) : (20 + Math.random() * 20);
    el.style.left = x + '%';
    el.style.top = (30 + Math.random() * 20) + '%';
    container.appendChild(el);
    setTimeout(() => el.remove(), 1300);
  }

  function checkEnemyDead() {
    if (enemyCurrentHp <= 0) {
      combatOver = true;
      addLog(`${enemy.name} is defeated!`, 'player');
      handleVictory();
      return true;
    }
    return false;
  }

  function handleVictory() {
    const p = Player.get();
    // XP
    const xp = enemy.xp;
    const leveled = Player.gainXP(xp);
    addLog(`Gained ${xp} XP!`, 'loot');

    // Gold
    const [minG, maxG] = enemy.gold;
    const gold = minG + Math.floor(Math.random() * (maxG - minG + 1));
    p.gold += gold;
    addLog(`Looted ${gold} gold!`, 'loot');

    // Loot items
    const lootedItems = [];
    if (enemy.loot) {
      enemy.loot.forEach(drop => {
        if (Math.random() < drop.chance) {
          Player.addToInventory(drop.id);
          lootedItems.push(ITEMS[drop.id].name);
        }
      });
    }
    if (lootedItems.length) addLog(`Found: ${lootedItems.join(', ')}`, 'loot');

    // Quest kills
    Player.recordKill(enemy.id);

    setTimeout(() => {
      if (onWin) onWin({ xp, gold, items: lootedItems, leveled, enemy });
    }, 1800);
  }

  function endPlayerTurn() {
    playerTurn = false;
    showMainMenu();
    setTimeout(enemyTurn, 900);
  }

  function endEnemyTurn() {
    playerTurn = true;
    // Reset reflect after one turn
    reflect.enemy = false;
    showMainMenu();
    updateBars();
  }

  return { start, playerAction, showSkills, showSpells, showItems, useSkill, useSpell, useItem, flee, showMainMenu };
})();
