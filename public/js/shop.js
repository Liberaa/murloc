// Shop system
const Shop = (() => {
  let currentShopId = null;

  function open(shopId) {
    currentShopId = shopId;
    const shop = SHOPS[shopId];
    if (!shop) return;

    document.getElementById('shop-title').textContent = shop.name;
    render();
    document.getElementById('overlay-shop').classList.remove('hidden');
    Game.setOverlayOpen(true);
  }

  function render() {
    const shop = SHOPS[currentShopId];
    if (!shop) return;
    const p = Player.get();
    document.getElementById('shop-gold').textContent = p.gold;

    const container = document.getElementById('shop-items');
    container.innerHTML = '';
    shop.items.forEach(itemId => {
      const item = ITEMS[itemId];
      if (!item) return;
      const canAfford = p.gold >= item.value;
      const wrongClass = item.class && !item.class.includes(p.spec);

      const div = document.createElement('div');
      div.className = 'shop-item' + (canAfford ? '' : ' cant-afford');
      div.title = item.desc || '';
      div.innerHTML = `
        <div class="shop-item-icon">${item.icon}</div>
        <div class="shop-item-name ${getRarityClass(item.quality)}">${item.name}</div>
        ${item.stats ? `<div class="shop-item-stats">${formatStats(item.stats)}</div>` : ''}
        ${wrongClass ? `<div style="color:#cc4444;font-size:11px;">${p.spec} only ✗</div>` : ''}
        <div class="shop-item-price"><span class="gold-icon">●</span> ${item.value}</div>
      `;
      if (canAfford && !wrongClass) {
        div.addEventListener('click', () => buyItem(itemId));
      }
      container.appendChild(div);
    });
  }

  function buyItem(itemId) {
    const p = Player.get();
    const item = ITEMS[itemId];
    if (!item) return;
    if (p.gold < item.value) { UI.toast("Not enough gold!"); return; }
    p.gold -= item.value;
    Player.addToInventory(itemId);
    UI.toast(`Purchased ${item.name}!`);
    render();
    UI.updateHUD();
  }

  function getRarityClass(quality) {
    return 'rarity-' + (quality || 'common');
  }

  function formatStats(stats) {
    return Object.entries(stats)
      .map(([k, v]) => `+${v} ${k.toUpperCase()}`)
      .join(' ');
  }

  return { open };
})();
