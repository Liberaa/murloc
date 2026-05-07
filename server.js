const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Save/load game state (in-memory for simplicity)
const saves = {};

app.post('/api/save', (req, res) => {
  const { slot, data } = req.body;
  saves[slot] = data;
  res.json({ ok: true });
});

app.get('/api/load/:slot', (req, res) => {
  const data = saves[req.params.slot];
  if (data) res.json({ ok: true, data });
  else res.json({ ok: false });
});

app.listen(PORT, () => {
  console.log(`Murloc RPG running at http://localhost:${PORT}`);
});
