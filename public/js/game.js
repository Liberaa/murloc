// Main game controller
const Game = (() => {
  let _inCombat = false;
  let _overlayOpen = false;

  // ===== SCREENS =====
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + id).classList.add('active');
  }

  function showTitle() { showScreen('title'); }
  function showCharCreate() { showScreen('charcreate'); }

  // ===== CHAR CREATE =====
  const CharCreate = (() => {
    let selectedSpec = 'warrior';

    function selectSpec(spec) {
      selectedSpec = spec;
      document.querySelectorAll('.spec-card').forEach(c => c.classList.remove('selected'));
      document.querySelector(`.spec-card[data-spec="${spec}"]`)?.classList.add('selected');
    }

    function confirm() {
      const name = document.getElementById('char-name').value.trim() || 'Hero';
      Player.create(name, selectedSpec);
      Game.startWorld();
    }

    return { selectSpec, confirm };
  })();

  // Expose CharCreate globally
  window.CharCreate = CharCreate;

  // ===== WORLD =====
  function startWorld() {
    showScreen('world');
    World.init();
    World.loadZone(Player.get().zone);
    UI.updateHUD();
    document.getElementById('zone-name').textContent = ZONES.find(z => z.id === Player.get().zone)?.name || '';
  }

  function changeZone(zoneId, entryX) {
    const p = Player.get();
    const zone = ZONES.find(z => z.id === zoneId);
    if (!zone) return;
    if (p.level < zone.unlockLevel) { UI.toast(`Requires level ${zone.unlockLevel}!`); return; }
    p.zone = zoneId;
    p.x = entryX !== undefined ? entryX : 150;
    p.y = 350;
    World.loadZone(zoneId);
    document.getElementById('zone-name').textContent = zone.name;
    UI.updateHUD();
  }

  // ===== COMBAT =====
  function startCombat(mobId) {
    if (_inCombat) return;
    _inCombat = true;
    World.stop();
    showScreen('combat');

    Combat.start(mobId,
      (result) => onCombatWin(result),
      () => onCombatLose()
    );
  }

  function onCombatWin(result) {
    _inCombat = false;
    const p = Player.get();

    // Check if any quest completes
    const justCompleted = [];
    p.activeQuests.forEach(qid => {
      if (Player.checkQuestComplete(qid)) justCompleted.push(qid);
    });

    // Check boss defeated
    const zone = ZONES.find(z => z.id === p.zone);
    if (zone && MOBS[result.enemy.id]?.boss) {
      zone.bossDefeated = true;
      UI.toast(`Boss defeated: ${result.enemy.name}!`);
    }

    // Level up notification
    if (result.leveled) {
      setTimeout(() => {
        UI.showLevelUp(p.level, { hp: 18, mp: 14, atk: 2, def: 1 });
      }, 200);
    }

    // Quest completion notifications
    justCompleted.forEach(qid => {
      const quest = QUESTS[qid];
      if (quest) setTimeout(() => UI.toast(`Quest ready to turn in: ${quest.title}!`), result.leveled ? 3000 : 500);
    });

    exitCombat(true);
  }

  function onCombatLose() {
    _inCombat = false;
    const p = Player.get();
    // Respawn at half HP
    p.hp = Math.floor(Player.totalStat('maxHp') * 0.5);
    p.mp = Math.floor(Player.totalStat('maxMp') * 0.5);
    UI.toast("You were defeated... respawning.");
    exitCombat(false);
  }

  function exitCombat(won) {
    showScreen('world');
    const p = Player.get();
    if (won) {
      World.resume();
    } else {
      p.x = 300; p.y = 350;
      World.loadZone(p.zone, true); // fromDeath=true gives spawn immunity
    }
    UI.updateHUD();
  }

  // ===== SAVE / LOAD =====
  function saveGame() {
    localStorage.setItem('murloc_save', Player.toSave());
    UI.toast("Game saved!");
  }

  function loadGame() {
    const saved = localStorage.getItem('murloc_save');
    if (!saved || saved === 'null') { alert("No save found. Start a new game."); showTitle(); return; }
    try {
      const parsed = JSON.parse(saved);
      if (!parsed || !parsed.name) { alert("No save found. Start a new game."); showTitle(); return; }
      Player.fromSave(saved);
      startWorld();
    } catch(e) {
      alert("Save data corrupt. Starting new game."); showTitle();
    }
  }

  // ===== FLAGS =====
  function isOverlayOpen() { return _overlayOpen; }
  function setOverlayOpen(v) { _overlayOpen = v; }
  function isInCombat() { return _inCombat; }

  // Clear corrupted saves on startup
  (() => {
    const s = localStorage.getItem('murloc_save');
    if (s) {
      try { const d = JSON.parse(s); if (!d || !d.name) localStorage.removeItem('murloc_save'); }
      catch { localStorage.removeItem('murloc_save'); }
    }
  })();


  // Keyboard save
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 's') { e.preventDefault(); if (Player.get()) saveGame(); }
  });

  return {
    showTitle, showCharCreate, startWorld, changeZone,
    startCombat, exitCombat,
    isOverlayOpen, setOverlayOpen, isInCombat,
    saveGame, loadGame
  };
})();

// Make CharCreate accessible on Game
window.Game = Game;
