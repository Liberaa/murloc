// World exploration — canvas rendering and movement
const World = (() => {
  let canvas, ctx, miniCanvas, miniCtx;
  let keys = {};
  let animFrame = null;
  let lastTime = 0;
  let interactTarget = null;
  let worldMobs = [];
  let spawnImmunity = 0;
  let zoneTransitionCooldown = 0;
  let initialized = false;

  const PLAYER_SPEED = 460;
  const PLAYER_SIZE = 24;
  const MOB_SIZE = 22;
  const WORLD_W = 800;
  const WORLD_H = 440;
  const GROUND_Y = 350; // fixed y for player and mobs
  const ZONE_TRANSITION_LOCK = 0.25;

  function init() {
    if (initialized) return; // prevent duplicate listeners
    initialized = true;

    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    miniCanvas = document.getElementById('minimap');
    miniCanvas.width = 160;
    miniCanvas.height = 160;
    miniCtx = miniCanvas.getContext('2d');

    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('keydown', e => {
      const k = e.key.toLowerCase();
      keys[k] = true;
      if (k === 'e' && interactTarget) interact();
      // Only open panels when in world screen
      if (document.getElementById('screen-world').classList.contains('active')) {
        if (k === 'i') UI.openInventory();
        if (k === 't') UI.openTalents();
        if (k === 'q') UI.openQuests();
        if (k === 'm') UI.openMap();
        if (k === 'x') devLevelUp();
      }
    });

    window.addEventListener('keyup', e => {
      keys[e.key.toLowerCase()] = false;
    });

    window.addEventListener('blur', clearMovementKeys);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearMovementKeys();
    });
  }

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function devLevelUp() {
    const p = Player.get();
    if (!p) return;
    Player.gainXP(p.xpToNext - p.xp);
    const gains = Player.getLastLevelGains();
    Player.fullHeal();
    UI.updateHUD();
    UI.toast(`Cheat: level ${p.level}${gains?.gold ? `, +${gains.gold} gold` : ''}!`);
  }

  // fromDeath=true gives immunity so the player doesn't instantly re-fight after respawn
  function loadZone(zoneId, fromDeath = false) {
    const zone = ZONES.find(z => z.id === zoneId);
    if (!zone) return;
    clearMovementKeys();
    worldMobs = [];
    spawnImmunity = fromDeath ? 2 : 0;
    placeEncounters(zone);
    document.getElementById('zone-name').textContent = zone.name;
    if (animFrame) cancelAnimationFrame(animFrame);
    lastTime = 0;
    animFrame = requestAnimationFrame(loop);
  }

  function resume() {
    // After combat win: don't reset encounters, just restart the loop
    spawnImmunity = 0;
    if (animFrame) cancelAnimationFrame(animFrame);
    lastTime = 0;
    animFrame = requestAnimationFrame(loop);
  }

  // Basic mob pool — level 1-3, always beatable from the start
  function placeEncounters(zone) {
    if (!zone.mobs || !zone.mobs.length) return;
    if (zone.bossOnly) {
      const points = zone.spawnPoints || [];
      zone.mobs.forEach((mobId, i) => {
        const point = points[i] || { x: 180 + i * 180 };
        addEncounter(point.x, mobId);
      });
      return;
    }
    const count = zone.id === 'greenwood' ? 2 : 3;
    const points = [...(zone.spawnPoints || [])].sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(count, points.length); i++) {
      addEncounter(points[i].x, pickZoneMob(zone));
    }
  }

  function pickZoneMob(zone) {
    const weights = zone.mobWeights || zone.mobs.map(() => 1);
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    let roll = Math.random() * total;
    for (let i = 0; i < zone.mobs.length; i++) {
      roll -= weights[i] || 1;
      if (roll <= 0) return zone.mobs[i];
    }
    return zone.mobs[0];
  }

  function addEncounter(x, mobId) {
    const template = MOBS[mobId];
    if (!template) return;
    worldMobs.push({
      id: mobId,
      name: template.name,
      icon: template.icon,
      x, y: GROUND_Y,
      level: template.level,
      color: template.color || '#888',
      boss: template.boss || false,
      uid: Math.random().toString(36).slice(2)
    });
  }

  // ===== GAME LOOP =====
  function loop(now) {
    // Always schedule next frame first so the loop never stops
    animFrame = requestAnimationFrame(loop);

    const dt = lastTime === 0 ? 0 : Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    try {
      update(dt);
    } catch (e) {
      console.error('update error:', e);
    }
    try {
      draw();
    } catch (e) {
      console.error('draw error:', e);
    }
  }

  function update(dt) {
    if (Game.isOverlayOpen() || Game.isInCombat()) return;
    if (spawnImmunity > 0) spawnImmunity -= dt;
    updatePlayer(dt);
    checkInteractions();
    if (spawnImmunity <= 0) checkMobCollision();
  }

  function updatePlayer(dt) {
    const p = Player.get();
    if (!p) return;

    if (zoneTransitionCooldown > 0) {
      zoneTransitionCooldown = Math.max(0, zoneTransitionCooldown - dt);
      p.y = GROUND_Y;
      return;
    }

    let dx = 0;
    if (keys['arrowleft']  || keys['a']) dx -= 1;
    if (keys['arrowright'] || keys['d']) dx += 1;

    if (dx !== 0) {
      p.x = Math.max(PLAYER_SIZE, Math.min(WORLD_W - PLAYER_SIZE, p.x + dx * PLAYER_SPEED * dt));
    }
    p.y = GROUND_Y;

    // Auto zone transition at screen edges
    const zone = ZONES.find(z => z.id === p.zone);
    if (!zone) return;

    if (p.x <= PLAYER_SIZE) {
      const exit = zone.exits.find(e => e.x <= 100);
      if (exit) tryZoneTransition(exit, false);
    } else if (p.x >= WORLD_W - PLAYER_SIZE) {
      const exit = zone.exits.find(e => e.x >= 700);
      if (exit) tryZoneTransition(exit, true);
    }
  }

  function tryZoneTransition(exit, wentRight) {
    const destZone = ZONES.find(z => z.id === exit.toZone);
    if (!destZone) return;
    const p = Player.get();
    if (p.level < (destZone.unlockLevel || 1)) {
      UI.toast(`Requires level ${destZone.unlockLevel} to enter ${destZone.name}!`);
      zoneTransitionCooldown = 2;
      return;
    }
    clearMovementKeys();
    zoneTransitionCooldown = ZONE_TRANSITION_LOCK;
    const entryX = wentRight ? PLAYER_SIZE + 40 : WORLD_W - PLAYER_SIZE - 40;
    Game.changeZone(exit.toZone, entryX);
  }

  function clearMovementKeys() {
    keys['arrowleft'] = false;
    keys['a'] = false;
    keys['arrowright'] = false;
    keys['d'] = false;
  }

  function checkInteractions() {
    const p = Player.get();
    if (!p) return;
    const zone = ZONES.find(z => z.id === p.zone);
    if (!zone) return;

    let nearest = null;
    let nearestDistX = 70;

    // NPC interaction by x-proximity (player moves only on x-axis)
    zone.npcs.forEach(npc => {
      const distX = Math.abs(p.x - npc.x);
      if (distX < nearestDistX) { nearestDistX = distX; nearest = { type: 'npc', data: npc }; }
    });

    if (zone.boss && !zone.bossDefeated) {
      const distX = Math.abs(p.x - WORLD_W / 2);
      if (distX < 60) nearest = { type: 'boss', data: { mobId: zone.boss } };
    }

    interactTarget = nearest;
    const prompt = document.getElementById('interact-prompt');
    if (nearest) prompt.classList.remove('hidden');
    else prompt.classList.add('hidden');
  }

  function checkMobCollision() {
    if (Game.isInCombat()) return;
    const p = Player.get();
    if (!p) return;
    for (let i = 0; i < worldMobs.length; i++) {
      const mob = worldMobs[i];
      if (Math.hypot(p.x - mob.x, p.y - mob.y) < PLAYER_SIZE + MOB_SIZE - 6) {
        const mobId = mob.id;
        worldMobs.splice(i, 1);
        Game.startCombat(mobId);
        return;
      }
    }
  }

  function interact() {
    if (!interactTarget) return;
    const { type, data } = interactTarget;
    if (type === 'npc') {
      if (data.type === 'shop') Shop.open(data.shopId);
      else if (data.type === 'quest') UI.interactQuestNpc(data);
    } else if (type === 'boss') {
      Game.startCombat(data.mobId);
    }
  }

  // ===== DRAWING =====
  function draw() {
    const p = Player.get();
    if (!p) return;
    const zone = ZONES.find(z => z.id === p.zone);
    if (!zone) return;

    const W = canvas.width, H = canvas.height;
    const sx = W / WORLD_W, sy = H / WORLD_H;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, zone.bgColor);
    grad.addColorStop(1, zone.groundColor);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Ground grid
    ctx.strokeStyle = zone.accent + '33';
    ctx.lineWidth = 1;
    const gs = 48 * sx;
    for (let x = 0; x < W; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 60 * sy; y < H; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    // Ground strip
    ctx.fillStyle = zone.groundColor + 'bb';
    ctx.fillRect(0, H - 90 * sy, W, 90 * sy);

    // Central tower
    drawTower(sx, sy);

    // Zone decor
    drawDecor(zone, sx, sy);

    // Zone edge transition arrows
    drawEdgeArrows(zone, p, sx, sy);

    // Boss
    drawBoss(zone, p, sx, sy);

    // NPCs
    drawNPCs(zone, p, sx, sy);

    // Mobs
    drawMobs(sx, sy);

    // Player
    drawPlayer(p, sx, sy);

    // Minimap
    drawMinimap(zone, p);
  }

  function drawTower(sx, sy) {
    const cx = (WORLD_W / 2) * sx;
    const cy = 80 * sy;
    const tw = 65 * sx, th = 130 * sy;

    // Base
    ctx.fillStyle = '#5a4a3a';
    ctx.fillRect(cx - tw / 2, cy - th * 0.3, tw, th);
    ctx.fillStyle = '#3a2a1a';
    ctx.fillRect(cx - tw / 2 + 4 * sx, cy - th * 0.3 + 4 * sy, tw - 8 * sx, th - 4 * sy);

    // Door arch
    ctx.fillStyle = '#1a0800';
    ctx.beginPath();
    const dw = tw * 0.35, dh = th * 0.28;
    const dx = cx, dy2 = cy - th * 0.3 + th * 0.72;
    ctx.arc(dx, dy2, dw / 2, Math.PI, 0);
    ctx.lineTo(dx + dw / 2, dy2 + dh * 0.6);
    ctx.lineTo(dx - dw / 2, dy2 + dh * 0.6);
    ctx.closePath();
    ctx.fill();

    // Roof triangle
    ctx.fillStyle = '#6a5a3a';
    ctx.beginPath();
    ctx.moveTo(cx - tw / 2 - 12 * sx, cy - th * 0.3);
    ctx.lineTo(cx, cy - th * 0.3 - 45 * sy);
    ctx.lineTo(cx + tw / 2 + 12 * sx, cy - th * 0.3);
    ctx.closePath();
    ctx.fill();
  }

  function drawDecor(zone, sx, sy) {
    if (zone.tileLayout === 'forest') {
      [[90, 200], [660, 185], [75, 355], [715, 325], [495, 385]].forEach(([x, y]) => drawTree(x * sx, y * sy, sx));
    } else if (zone.tileLayout === 'swamp') {
      [[140, 330], [390, 360], [590, 310]].forEach(([x, y]) => {
        ctx.fillStyle = 'rgba(20,50,10,0.45)';
        ctx.beginPath(); ctx.ellipse(x * sx, y * sy, 38 * sx, 18 * sy, 0, 0, Math.PI * 2); ctx.fill();
      });
    } else if (zone.tileLayout === 'ruins') {
      [[95, 225], [675, 235], [115, 365], [655, 345]].forEach(([x, y]) => {
        ctx.fillStyle = '#4a4a5a'; ctx.fillRect(x * sx - 10 * sx, y * sy, 20 * sx, 60 * sy);
        ctx.fillStyle = '#3a3a4a'; ctx.fillRect(x * sx - 15 * sx, y * sy, 30 * sx, 12 * sy);
      });
    } else if (zone.tileLayout === 'chaos') {
      [[95, 205], [675, 205]].forEach(([x, y]) => {
        ctx.fillStyle = '#3a0000'; ctx.fillRect(x * sx - 9 * sx, y * sy, 18 * sx, 80 * sy);
        ctx.fillStyle = 'rgba(255,80,0,0.55)';
        ctx.beginPath(); ctx.ellipse(x * sx, y * sy, 13 * sx, 28 * sy, 0, 0, Math.PI * 2); ctx.fill();
      });
    } else if (zone.tileLayout === 'abyss') {
      [[120, 250], [310, 205], [505, 250], [690, 215]].forEach(([x, y]) => {
        ctx.fillStyle = 'rgba(80,190,210,0.25)';
        ctx.beginPath(); ctx.arc(x * sx, y * sy, 24 * sx, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#0b5364';
        ctx.fillRect(x * sx - 5 * sx, y * sy, 10 * sx, 64 * sy);
      });
      [[210, 375], [455, 365], [620, 385]].forEach(([x, y]) => {
        ctx.fillStyle = 'rgba(210,235,230,0.35)';
        ctx.beginPath(); ctx.arc(x * sx, y * sy, 16 * sx, 0, Math.PI * 2); ctx.fill();
      });
    } else if (zone.tileLayout === 'moonfall') {
      [[90, 215], [230, 365], [590, 230], [710, 360]].forEach(([x, y]) => {
        ctx.fillStyle = '#24344f';
        ctx.fillRect(x * sx - 5 * sx, y * sy, 10 * sx, 42 * sy);
        ctx.fillStyle = 'rgba(170,185,255,0.32)';
        ctx.beginPath(); ctx.arc(x * sx, y * sy, 24 * sx, 0, Math.PI * 2); ctx.fill();
      });
      [[350, 190], [470, 170], [530, 260]].forEach(([x, y]) => {
        ctx.fillStyle = 'rgba(230,235,255,0.5)';
        ctx.beginPath(); ctx.arc(x * sx, y * sy, 3 * sx, 0, Math.PI * 2); ctx.fill();
      });
    } else if (zone.tileLayout === 'peaks') {
      [[125, 340], [300, 290], [500, 320], [690, 275]].forEach(([x, y]) => {
        ctx.fillStyle = '#38265c';
        ctx.beginPath();
        ctx.moveTo(x * sx - 36 * sx, y * sy + 42 * sy);
        ctx.lineTo(x * sx, y * sy - 34 * sy);
        ctx.lineTo(x * sx + 42 * sx, y * sy + 42 * sy);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(210,150,255,0.35)';
        ctx.stroke();
      });
      [[250, 190], [410, 160], [610, 200]].forEach(([x, y]) => {
        ctx.strokeStyle = 'rgba(200,120,255,0.55)';
        ctx.lineWidth = 2 * sx;
        ctx.beginPath();
        ctx.moveTo(x * sx, y * sy - 18 * sy);
        ctx.lineTo(x * sx, y * sy + 18 * sy);
        ctx.stroke();
      });
    } else if (zone.tileLayout === 'arena') {
      ctx.strokeStyle = 'rgba(255,179,71,0.45)';
      ctx.lineWidth = 3 * sx;
      ctx.beginPath();
      ctx.ellipse((WORLD_W / 2) * sx, 315 * sy, 280 * sx, 82 * sy, 0, 0, Math.PI * 2);
      ctx.stroke();
      [[145, 245], [375, 205], [615, 245]].forEach(([x, y]) => {
        ctx.fillStyle = '#4a260a';
        ctx.fillRect(x * sx - 15 * sx, y * sy, 30 * sx, 95 * sy);
        ctx.fillStyle = '#ffb347';
        ctx.beginPath();
        ctx.arc(x * sx, y * sy - 8 * sy, 18 * sx, 0, Math.PI * 2);
        ctx.fill();
      });
      [[245, 370], [505, 370]].forEach(([x, y]) => {
        ctx.fillStyle = 'rgba(255,220,120,0.25)';
        ctx.beginPath(); ctx.arc(x * sx, y * sy, 40 * sx, 0, Math.PI * 2); ctx.fill();
      });
    }
  }

  function drawTree(x, y, sx) {
    ctx.fillStyle = '#3a2a10';
    ctx.fillRect(x - 4 * sx, y, 8 * sx, 28 * sx);
    ctx.fillStyle = '#2a5a1a';
    ctx.beginPath(); ctx.arc(x, y, 22 * sx, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#3a7a2a';
    ctx.beginPath(); ctx.arc(x - 5 * sx, y - 5 * sx, 14 * sx, 0, Math.PI * 2); ctx.fill();
  }

  function drawNPCs(zone, p, sx, sy) {
    zone.npcs.forEach(npc => {
      const wx = npc.x * sx, wy = (GROUND_Y - 15) * sy;
      const near = Math.abs(p.x - npc.x) < 70;

      // Shadow (use arc, not ellipse, for max compatibility)
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath(); ctx.arc(wx, wy + 16 * sy, 10 * sx, 0, Math.PI * 2); ctx.fill();

      // Body circle
      ctx.fillStyle = near ? '#ffee88' : '#ccaa44';
      ctx.beginPath(); ctx.arc(wx, wy, 15 * sx, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 1.5; ctx.stroke();

      // Icon
      ctx.font = `${18 * sx}px serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(npc.icon, wx, wy);

      // Name
      ctx.fillStyle = '#ffd700'; ctx.font = `bold ${10 * sx}px Georgia`;
      ctx.fillText(npc.name, wx, wy - 26 * sy);

      // Quest/shop marker
      const questMarker = npc.type === 'quest' ? UI.getNpcQuestState(npc) : null;
      if (questMarker || npc.type === 'shop') {
        ctx.fillStyle = questMarker ? questMarker.color : '#44ff88';
        ctx.font = `bold ${14 * sx}px serif`;
        ctx.fillText(questMarker ? questMarker.marker : '$', wx, wy - 38 * sy);
      }
    });
  }

  function drawEdgeArrows(zone, p, sx, sy) {
    zone.exits.forEach(exit => {
      const destZone = ZONES.find(z => z.id === exit.toZone);
      if (!destZone) return;
      const locked = p.level < destZone.unlockLevel;
      const isLeft = exit.x <= 100;
      const ax = isLeft ? 28 * sx : (WORLD_W - 28) * sx;
      const ay = GROUND_Y * sy;
      const pw = 50 * sx, ph = 72 * sy;

      // Panel
      ctx.fillStyle = locked ? 'rgba(20,30,40,0.82)' : 'rgba(0,40,110,0.82)';
      ctx.strokeStyle = locked ? '#445566' : '#4499dd';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.rect(ax - pw / 2, ay - ph / 2, pw, ph);
      ctx.fill(); ctx.stroke();

      // Arrow
      ctx.fillStyle = locked ? '#667788' : '#ffffff';
      ctx.font = `bold ${20 * sx}px Georgia`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(isLeft ? '◀' : '▶', ax, ay - 16 * sy);

      // Zone name (first word)
      ctx.fillStyle = locked ? '#778899' : '#88ccff';
      ctx.font = `${8 * sx}px Georgia`;
      ctx.fillText(destZone.name.split(' ')[0], ax, ay + 2 * sy);

      if (locked) {
        ctx.fillStyle = '#ff7755';
        ctx.font = `${8 * sx}px Georgia`;
        ctx.fillText(`Lv.${destZone.unlockLevel}`, ax, ay + 16 * sy);
      }
    });
  }

  function drawBoss(zone, p, sx, sy) {
    if (!zone.boss || zone.bossDefeated) return;
    const bossTemplate = MOBS[zone.boss];
    if (!bossTemplate) return;
    const bx = (WORLD_W / 2) * sx, by = (GROUND_Y - 28) * sy;

    // Glow
    const g = ctx.createRadialGradient(bx, by, 0, bx, by, 48 * sx);
    g.addColorStop(0, 'rgba(200,0,0,0.35)'); g.addColorStop(1, 'transparent');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(bx, by, 48 * sx, 0, Math.PI * 2); ctx.fill();

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath(); ctx.arc(bx, by + 22 * sy, 18 * sx, 0, Math.PI * 2); ctx.fill();

    // Body
    const near = Math.abs(p.x - WORLD_W / 2) < 60;
    ctx.fillStyle = near ? '#ff5555' : '#cc1111';
    ctx.beginPath(); ctx.arc(bx, by, 24 * sx, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#ff3333'; ctx.lineWidth = 2.5; ctx.stroke();

    ctx.font = `${28 * sx}px serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(bossTemplate.icon, bx, by);

    ctx.fillStyle = '#ff4444'; ctx.font = `bold ${11 * sx}px Georgia`;
    ctx.fillText('⚠ BOSS: ' + bossTemplate.name, bx, by - 40 * sy);
  }

  function drawMobs(sx, sy) {
    worldMobs.forEach(mob => {
      const wx = mob.x * sx, wy = mob.y * sy;

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath(); ctx.arc(wx, wy + 12 * sy, 9 * sx, 0, Math.PI * 2); ctx.fill();

      // Body
      ctx.fillStyle = mob.color;
      ctx.beginPath(); ctx.arc(wx, wy, 13 * sx, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#ffffff33'; ctx.lineWidth = 1; ctx.stroke();

      // Icon
      ctx.font = `${15 * sx}px serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(mob.icon, wx, wy);

      // Level + name
      ctx.fillStyle = '#ffaa88'; ctx.font = `${8 * sx}px Georgia`;
      ctx.fillText(`Lv.${mob.level} ${mob.name}`, wx, wy - 20 * sy);
    });
  }

  function drawPlayer(p, sx, sy) {
    const wx = p.x * sx, wy = p.y * sy;
    const colors = { warrior: '#ff6633', mage: '#4488ff', rogue: '#aa44ff' };
    const icons  = { warrior: '⚔️',      mage: '🔮',      rogue: '🗡️' };
    const col = colors[p.spec] || '#4488ff';

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath(); ctx.arc(wx, wy + 16 * sy, 12 * sx, 0, Math.PI * 2); ctx.fill();

    // Body
    ctx.fillStyle = col;
    ctx.beginPath(); ctx.arc(wx, wy, 15 * sx, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.stroke();

    // Icon
    ctx.font = `${17 * sx}px serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(icons[p.spec] || '⚔️', wx, wy);

    // Name
    ctx.fillStyle = '#ffd700'; ctx.font = `bold ${10 * sx}px Georgia`;
    ctx.fillText(p.name, wx, wy - 26 * sy);

    // HP bar
    const maxHp = Player.totalStat('maxHp');
    const barW = 38 * sx, barH = 5 * sy;
    ctx.fillStyle = '#222';
    ctx.fillRect(wx - barW / 2, wy - 34 * sy, barW, barH);
    ctx.fillStyle = p.hp / maxHp > 0.5 ? '#22cc44' : p.hp / maxHp > 0.25 ? '#cc8800' : '#cc2222';
    ctx.fillRect(wx - barW / 2, wy - 34 * sy, barW * Math.max(0, p.hp / maxHp), barH);
  }

  function drawMinimap(zone, p) {
    const mw = 160, mh = 160;
    miniCtx.clearRect(0, 0, mw, mh);
    const sx = mw / WORLD_W, sy = mh / WORLD_H;

    miniCtx.fillStyle = zone.groundColor + 'cc';
    miniCtx.fillRect(0, 0, mw, mh);

    // Mobs (red dots)
    worldMobs.forEach(mob => {
      miniCtx.fillStyle = '#ff6644';
      miniCtx.fillRect(mob.x * sx - 2, mob.y * sy - 2, 4, 4);
    });

    // NPCs (yellow)
    zone.npcs.forEach(npc => {
      miniCtx.fillStyle = '#ffff44';
      miniCtx.fillRect(npc.x * sx - 2, npc.y * sy - 2, 4, 4);
    });

    // Exits — blue bars on left/right edges
    zone.exits.forEach(exit => {
      const isLeft = exit.x <= 100;
      miniCtx.fillStyle = '#44aaff';
      miniCtx.fillRect(isLeft ? 0 : mw - 4, GROUND_Y * sy - 6, 4, 12);
    });

    // Player (white dot)
    miniCtx.fillStyle = '#ffffff';
    miniCtx.beginPath(); miniCtx.arc(p.x * sx, p.y * sy, 4, 0, Math.PI * 2); miniCtx.fill();

    // Zone label
    miniCtx.fillStyle = 'rgba(255,215,0,0.85)';
    miniCtx.font = '9px Georgia';
    miniCtx.textAlign = 'center';
    miniCtx.fillText(zone.name, mw / 2, mh - 4);
  }

  function stop() {
    if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
  }

  function removeMobFromWorld(uid) {
    worldMobs = worldMobs.filter(m => m.uid !== uid);
  }

  return { init, loadZone, resume, stop, interact, removeMobFromWorld };
})();
