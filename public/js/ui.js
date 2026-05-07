// UI controller
const UI = (() => {
  let overlayOpen = false;
  let toastTimer = null;

  // ===== HUD =====
  function updateHUD() {
    const p = Player.get();
    if (!p) return;
    const maxHp = Player.totalStat('maxHp');
    const maxMp = Player.totalStat('maxMp');

    document.getElementById('hud-name').textContent = p.name;
    document.getElementById('hud-level').textContent = 'Lv.' + p.level;
    setBar('bar-hp', p.hp, maxHp);
    setBar('bar-mp', p.mp, maxMp);
    setBar('bar-xp', p.xp, p.xpToNext);
    document.getElementById('val-hp').textContent = `${p.hp}/${maxHp}`;
    document.getElementById('val-mp').textContent = `${p.mp}/${maxMp}`;
    document.getElementById('val-xp').textContent = `${p.xp}/${p.xpToNext}`;
    document.getElementById('val-gold').textContent = p.gold;
    // Portrait
    const icons = { warrior: '⚔️', mage: '🔮', rogue: '🗡️' };
    document.getElementById('portrait-icon').style.background =
      p.spec === 'warrior' ? 'radial-gradient(circle, #ff9944, #cc4400)' :
      p.spec === 'mage'    ? 'radial-gradient(circle, #4488ff, #001166)' :
                             'radial-gradient(circle, #cc88ff, #330066)';
    document.getElementById('portrait-icon').textContent = icons[p.spec] || '';
    document.getElementById('portrait-icon').style.fontSize = '28px';
    document.getElementById('portrait-icon').style.textAlign = 'center';
    document.getElementById('portrait-icon').style.lineHeight = '64px';
  }

  function setBar(id, cur, max) {
    const el = document.getElementById(id);
    if (el) el.style.width = Math.max(0, Math.min(100, (cur / max) * 100)) + '%';
  }

  // ===== OVERLAYS =====
  function closeAll() {
    ['overlay-inventory','overlay-talents','overlay-quests','overlay-map','overlay-shop','overlay-dialog'].forEach(id => {
      document.getElementById(id).classList.add('hidden');
    });
    overlayOpen = false;
    Game.setOverlayOpen(false);
  }

  function openInventory() {
    closeAll();
    renderInventory();
    document.getElementById('overlay-inventory').classList.remove('hidden');
    overlayOpen = true;
    Game.setOverlayOpen(true);
  }

  function renderInventory() {
    const p = Player.get();
    document.getElementById('inv-gold').textContent = p.gold;
    const grid = document.getElementById('inventory-grid');
    grid.innerHTML = '';

    // Equipped slots first
    const slots = ['weapon','chest','head','offhand','ring','neck','feet','hands'];
    slots.forEach(slot => {
      const itemId = p.equipped[slot];
      const div = document.createElement('div');
      div.className = 'inv-slot equipped';
      div.title = slot;
      if (itemId) {
        const item = ITEMS[itemId];
        div.innerHTML = `${item.icon}<div style="position:absolute;top:2px;left:4px;font-size:9px;color:#88aaff">${slot}</div>`;
        div.className += ' item-quality-' + item.quality;
        div.addEventListener('click', () => { Player.unequipItem(slot); renderInventory(); updateHUD(); });
        div.addEventListener('mouseover', (e) => showTooltip(itemId, e));
        div.addEventListener('mouseout', hideTooltip);
      } else {
        div.innerHTML = `<div style="font-size:9px;color:#444">${slot}</div>`;
      }
      grid.appendChild(div);
    });

    // Inventory items
    p.inventory.forEach(entry => {
      const item = ITEMS[entry.itemId];
      if (!item) return;
      const div = document.createElement('div');
      div.className = 'inv-slot item-quality-' + (item.quality || 'common');
      div.innerHTML = `${item.icon}${entry.qty > 1 ? `<div class="item-qty">${entry.qty}</div>` : ''}`;
      div.addEventListener('click', () => {
        if (item.slot) {
          const result = Player.equipItem(entry.itemId);
          if (!result) toast('Cannot equip: wrong class or slot!');
        } else if (item.type === 'consumable' && item.effect) {
          if (item.effect.hp) {
            p.hp = Math.min(Player.totalStat('maxHp'), p.hp + item.effect.hp);
            Player.removeFromInventory(entry.itemId);
            toast(`Used ${item.name}: +${item.effect.hp} HP`);
          }
          if (item.effect.mp) {
            p.mp = Math.min(Player.totalStat('maxMp'), p.mp + item.effect.mp);
            Player.removeFromInventory(entry.itemId);
            toast(`Used ${item.name}: +${item.effect.mp} MP`);
          }
        }
        renderInventory(); updateHUD();
      });
      div.addEventListener('mouseover', (e) => showTooltip(entry.itemId, e));
      div.addEventListener('mouseout', hideTooltip);
      grid.appendChild(div);
    });
  }

  function showTooltip(itemId, e) {
    const item = ITEMS[itemId];
    if (!item) return;
    const tt = document.getElementById('item-tooltip');
    tt.classList.remove('hidden');
    const rarityClass = 'rarity-' + (item.quality || 'common');
    tt.innerHTML = `
      <div class="tooltip-name ${rarityClass}">${item.icon} ${item.name}</div>
      <div class="tooltip-type">${item.type}${item.slot ? ' — ' + item.slot : ''}</div>
      ${item.stats ? `<div class="tooltip-stats">${Object.entries(item.stats).map(([k,v]) => `+${v} ${k.toUpperCase()}`).join('<br>')}</div>` : ''}
      ${item.desc ? `<div class="tooltip-desc">"${item.desc}"</div>` : ''}
      <div class="tooltip-value">● ${item.value} gold</div>
    `;
    tt.style.left = (e.clientX + 14) + 'px';
    tt.style.top = Math.min(e.clientY - 10, window.innerHeight - 200) + 'px';
  }

  function hideTooltip() {
    document.getElementById('item-tooltip').classList.add('hidden');
  }

  function openTalents() {
    closeAll();
    renderTalents();
    document.getElementById('overlay-talents').classList.remove('hidden');
    overlayOpen = true;
    Game.setOverlayOpen(true);
  }

  function renderTalents() {
    const p = Player.get();
    document.getElementById('talent-points-info').textContent =
      `Talent Points: ${p.talentPoints} | Class: ${p.spec.charAt(0).toUpperCase() + p.spec.slice(1)}`;

    const tree = TALENT_TREES[p.spec];
    const container = document.getElementById('talent-tree');
    container.innerHTML = '';

    tree.forEach((tier, ti) => {
      const tierDiv = document.createElement('div');
      tierDiv.className = 'talent-tier';
      const tierLabel = document.createElement('div');
      tierLabel.style.cssText = 'width:100%;color:#888;font-size:12px;margin-bottom:4px;';
      tierLabel.textContent = `Tier ${ti + 1}`;
      tierDiv.appendChild(tierLabel);

      tier.nodes.forEach(node => {
        const rank = p.talentsLearned[node.id] || 0;
        const maxRank = node.maxRank;
        const reqsMet = !node.requires || node.requires.every(r => (p.talentsLearned[r] || 0) > 0);
        const learned = rank >= maxRank;
        const available = reqsMet && rank < maxRank && p.talentPoints > 0;
        const locked = !reqsMet;

        const div = document.createElement('div');
        div.className = 'talent-node ' + (learned ? 'learned' : available ? 'available' : 'locked');
        div.innerHTML = `
          <div class="talent-icon">${node.icon}</div>
          <div class="talent-name">${node.name}</div>
          <div class="talent-desc">${node.desc}</div>
          <div class="talent-rank">${rank}/${maxRank}</div>
        `;
        if (available) {
          div.addEventListener('click', () => {
            const result = Player.learnTalent(node.id);
            if (result.ok) { toast(`Learned: ${node.name}!`); renderTalents(); updateHUD(); }
            else toast(result.msg);
          });
        }
        tierDiv.appendChild(div);
      });
      container.appendChild(tierDiv);
    });
  }

  function openQuests() {
    closeAll();
    renderQuests();
    document.getElementById('overlay-quests').classList.remove('hidden');
    overlayOpen = true;
    Game.setOverlayOpen(true);
  }

  function renderQuests() {
    const p = Player.get();
    const container = document.getElementById('quest-list');
    container.innerHTML = '';
    const detail = document.getElementById('quest-detail');
    detail.innerHTML = '<div style="color:#666;font-size:13px;">Select a quest.</div>';

    // Wrap in layout
    const panel = document.getElementById('overlay-quests').querySelector('.overlay-panel');
    if (!panel.querySelector('.quest-layout')) {
      panel.style.flexDirection = 'column';
      const inner = document.createElement('div');
      inner.className = 'quest-layout';
      inner.style.cssText = 'display:flex;flex:1;min-height:0;overflow:hidden;';
      inner.appendChild(document.getElementById('quest-list'));
      inner.appendChild(document.getElementById('quest-detail'));
      panel.appendChild(inner);
    }

    // Active quests
    p.activeQuests.forEach(qid => {
      const quest = QUESTS[qid];
      if (!quest) return;
      const div = document.createElement('div');
      div.className = 'quest-entry active-quest';
      div.textContent = quest.title;
      div.addEventListener('click', () => showQuestDetail(qid));
      container.appendChild(div);
    });

    // Completed quests
    p.completedQuests.forEach(qid => {
      const quest = QUESTS[qid];
      if (!quest) return;
      const div = document.createElement('div');
      div.className = 'quest-entry completed-quest';
      div.textContent = '✓ ' + quest.title;
      div.addEventListener('click', () => showQuestDetail(qid));
      container.appendChild(div);
    });

    if (!p.activeQuests.length && !p.completedQuests.length) {
      container.innerHTML = '<div style="color:#666;font-size:13px;padding:8px;">No quests yet.</div>';
    }
  }

  function showQuestDetail(questId) {
    const quest = QUESTS[questId];
    const p = Player.get();
    if (!quest) return;
    const isComplete = p.completedQuests.includes(questId);
    const detail = document.getElementById('quest-detail');
    const objs = quest.objectives.map(o => {
      const done = o.current >= o.count;
      return `<div class="quest-obj ${done?'done':'pending'}">${done?'✓':''} ${o.label.replace(/\d+\/\d+/, `${o.current}/${o.count}`)}</div>`;
    }).join('');

    const rewards = quest.rewards;
    const rewardStr = [
      rewards.xp ? `${rewards.xp} XP` : '',
      rewards.gold ? `${rewards.gold} Gold` : '',
      rewards.items ? rewards.items.map(id => ITEMS[id]?.name || id).join(', ') : ''
    ].filter(Boolean).join(' · ');

    const allDone = quest.objectives.every(o => o.current >= o.count);

    detail.innerHTML = `
      <div class="quest-detail-title">${quest.title}${isComplete ? ' <span style="color:#44cc44">✓ Completed</span>' : ''}</div>
      <div class="quest-detail-desc">${quest.desc}</div>
      <div class="quest-objectives"><strong style="color:#ffd700">Objectives:</strong><br>${objs}</div>
      <div class="quest-rewards"><strong>Rewards:</strong> ${rewardStr}</div>
      ${allDone && !isComplete ? `<button class="btn-wow" style="margin-top:12px;font-size:13px;padding:7px 18px;" onclick="UI.turnInQuest('${questId}')">Turn In Quest</button>` : ''}
    `;
  }

  function turnInQuest(questId) {
    const p = Player.get();
    if (!Player.checkQuestComplete(questId)) { toast("Objectives not complete!"); return; }
    const quest = Player.completeQuest(questId);
    if (!quest) return;
    toast(`Quest Complete: ${quest.title}!`);
    renderQuests();
    updateHUD();

    // Check if follow-up quest available
    if (quest.followUp && !p.completedQuests.includes(quest.followUp) && !p.activeQuests.includes(quest.followUp)) {
      setTimeout(() => {
        const followup = QUESTS[quest.followUp];
        if (followup && confirm(`New quest available: ${followup.title}. Accept?`)) {
          Player.acceptQuest(quest.followUp);
          toast(`Quest accepted: ${followup.title}`);
          renderQuests();
        }
      }, 300);
    }

    if (quest.finale) {
      setTimeout(() => showFinale(), 1000);
    }
  }

  function showFinale() {
    document.body.innerHTML = `
      <div style="position:fixed;inset:0;background:#000;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:24px;">
        <div style="font-size:60px;color:#ffd700;text-shadow:0 0 30px #ff8800;font-family:Georgia;letter-spacing:8px;font-variant:small-caps;">VICTORY!</div>
        <div style="font-size:24px;color:#e8d5a0;font-family:Georgia;">Arak'zoth has been defeated!</div>
        <div style="font-size:18px;color:#a08040;font-family:Georgia;">The world is saved. You are a legend.</div>
        <button onclick="location.reload()" style="margin-top:20px;background:linear-gradient(180deg,#5a3a00,#2e1a00);border:2px solid #ffd700;color:#ffd700;font-family:Georgia;font-size:18px;padding:12px 36px;cursor:pointer;border-radius:3px;">Play Again</button>
      </div>`;
  }

  function openMap() {
    closeAll();
    renderMap();
    document.getElementById('overlay-map').classList.remove('hidden');
    overlayOpen = true;
    Game.setOverlayOpen(true);
  }

  function renderMap() {
    const p = Player.get();
    const container = document.getElementById('world-map-display');
    container.innerHTML = '';

    ZONES.forEach(zone => {
      const isUnlocked = p.level >= zone.unlockLevel;
      const isCurrent = p.zone === zone.id;
      const div = document.createElement('div');
      div.className = 'map-zone' + (isUnlocked ? '' : ' locked') + (isCurrent ? ' current-zone' : '');
      div.innerHTML = `
        <div class="zone-badge">${zone.icon}</div>
        <div class="map-zone-name">${zone.name}</div>
        <div class="map-zone-level">Levels ${zone.levelRange[0]}–${zone.levelRange[1]}</div>
        <div class="map-zone-desc">${isUnlocked ? zone.desc : `Requires level ${zone.unlockLevel}`}</div>
        ${isCurrent ? '<div style="color:#ffd700;font-size:12px;margin-top:6px;">● You are here</div>' : ''}
        ${zone.bossDefeated ? '<div style="color:#44cc44;font-size:12px;margin-top:4px;">✓ Boss slain</div>' : ''}
      `;
      if (isUnlocked && !isCurrent) {
        div.style.cursor = 'pointer';
        div.addEventListener('click', () => { closeAll(); Game.changeZone(zone.id); });
      }
      container.appendChild(div);
    });
  }

  // ===== QUEST NPC STATE =====
  function getNpcQuestState(npc) {
    const p = Player.get();
    if (!p || !npc) return null;
    const npcQuests = Object.values(QUESTS).filter(q => q.giverNpc === npc.id);

    const readyQuest = npcQuests.find(q => p.activeQuests.includes(q.id) && Player.checkQuestComplete(q.id));
    if (readyQuest) return { marker:'?', color:'#ffd700', state:'ready', questId:readyQuest.id };

    const activeQuest = npcQuests.find(q => p.activeQuests.includes(q.id));
    if (activeQuest) return { marker:'?', color:'#ffffff', state:'active', questId:activeQuest.id };

    const dialogQuestId = npc.dialog && DIALOGS[npc.dialog]?.acceptQuest;
    if (dialogQuestId && !p.activeQuests.includes(dialogQuestId) && !p.completedQuests.includes(dialogQuestId)) {
      return { marker:'!', color:'#ffff00', state:'available', questId:dialogQuestId };
    }

    const followUp = npcQuests.find(q =>
      !p.activeQuests.includes(q.id) &&
      !p.completedQuests.includes(q.id) &&
      Object.values(QUESTS).some(prev => prev.followUp === q.id && p.completedQuests.includes(prev.id))
    );
    if (followUp) return { marker:'!', color:'#ffff00', state:'available', questId:followUp.id };

    return null;
  }

  function interactQuestNpc(npc) {
    const questState = getNpcQuestState(npc);
    if (questState?.state === 'ready') {
      turnInQuest(questState.questId);
      closeAll();
      return;
    }
    if (questState?.state === 'active') {
      toast(`${QUESTS[questState.questId]?.title || 'Quest'} is still in progress.`);
      return;
    }
    if (questState?.state === 'available' && DIALOGS[npc.dialog]?.acceptQuest !== questState.questId) {
      const quest = QUESTS[questState.questId];
      if (quest && confirm(`Accept quest: ${quest.title}?`)) {
        Player.acceptQuest(questState.questId);
        toast(`Quest accepted: ${quest.title}`);
      }
      return;
    }
    if (npc.dialog) showDialog(npc.dialog);
  }

  // ===== DIALOG =====
  function showDialog(dialogId) {
    const dialog = DIALOGS[dialogId];
    if (!dialog) return;

    document.getElementById('dialog-npc-name').textContent = dialog.npc;
    document.getElementById('dialog-portrait').textContent = dialog.portrait;
    document.getElementById('dialog-text').textContent = dialog.lines[0];

    const actions = document.getElementById('dialog-actions');
    actions.innerHTML = '';

    if (dialog.acceptQuest) {
      const p = Player.get();
      const canAccept = p && !p.activeQuests.includes(dialog.acceptQuest) && !p.completedQuests.includes(dialog.acceptQuest);
      const acceptBtn = document.createElement('button');
      acceptBtn.className = 'btn-wow';
      acceptBtn.style.fontSize = '13px';
      acceptBtn.style.padding = '7px 16px';
      acceptBtn.textContent = 'Accept Quest';
      acceptBtn.disabled = !canAccept;
      acceptBtn.addEventListener('click', () => {
        const ok = Player.acceptQuest(dialog.acceptQuest);
        if (ok) toast(`Quest accepted: ${QUESTS[dialog.acceptQuest]?.title}`);
        else toast('Quest already accepted or completed.');
        closeAll();
      });
      actions.appendChild(acceptBtn);
    }

    const declineBtn = document.createElement('button');
    declineBtn.className = 'btn-wow btn-secondary';
    declineBtn.style.fontSize = '13px';
    declineBtn.style.padding = '7px 16px';
    declineBtn.textContent = dialog.declineText || 'Goodbye';
    declineBtn.addEventListener('click', closeAll);
    actions.appendChild(declineBtn);

    document.getElementById('overlay-dialog').classList.remove('hidden');
    overlayOpen = true;
    Game.setOverlayOpen(true);
  }

  // ===== LEVEL UP =====
  function showLevelUp(level, statGains) {
    document.getElementById('levelup-number').textContent = level;
    const goldLine = statGains.gold ? `<br>+${statGains.gold} Gold` : '';
    document.getElementById('levelup-stats').innerHTML =
      `+${statGains.hp} Max HP &nbsp; +${statGains.mp} Max MP<br>+${Math.floor(statGains.atk)} ATK &nbsp; +${Math.floor(statGains.def)} DEF<br>+1 Talent Point${goldLine}`;
    document.getElementById('overlay-levelup').classList.remove('hidden');
    overlayOpen = true;
    Game.setOverlayOpen(true);
  }

  function closeLevelUp() {
    document.getElementById('overlay-levelup').classList.add('hidden');
    overlayOpen = false;
    Game.setOverlayOpen(false);
  }

  // ===== TOAST =====
  function toast(msg, duration=3000) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    if (toastTimer) clearTimeout(toastTimer);
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = '';
    toastTimer = setTimeout(() => el.classList.add('hidden'), duration);
  }

  return {
    updateHUD, closeAll, openInventory, openTalents, openQuests, openMap,
    showDialog, showLevelUp, closeLevelUp, toast, turnInQuest, renderInventory,
    getNpcQuestState, interactQuestNpc,
    get overlayOpen() { return overlayOpen; }
  };
})();
