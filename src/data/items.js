// ─── Rarity System ─────────────────────────────────────────────
export const RARITIES = {
  C:  { label: 'C',  name: 'Common',    color: '#8A93A8', glow: 'rgba(138,147,168,0.3)',  weight: 40 },
  B:  { label: 'B',  name: 'Brave',     color: '#2EE6A8', glow: 'rgba(46,230,168,0.35)',  weight: 30 },
  A:  { label: 'A',  name: 'Ace',       color: '#4DA6FF', glow: 'rgba(77,166,255,0.4)',   weight: 20 },
  S:  { label: 'S',  name: 'Super',     color: '#C77DFF', glow: 'rgba(199,125,255,0.45)', weight: 8  },
  SS: { label: 'SS', name: 'Legendary', color: '#FFC247', glow: 'rgba(255,194,71,0.55)',  weight: 2  },
}

export const SLOTS = {
  weapon:    { label: 'Waffe',      icon: '⚔️' },
  head:      { label: 'Kopf',       icon: '👒' },
  armor:     { label: 'Rüstung',    icon: '🛡️' },
  accessory: { label: 'Accessoire', icon: '💍' },
}

// ─── Item Pool ─────────────────────────────────────────────────
export const ITEMS = [
  // ── Waffen ──
  { id: 'w_stick',     name: 'Trainings-Stock',        emoji: '🥢', slot: 'weapon', rarity: 'C' },
  { id: 'w_wood',      name: 'Holzschwert',            emoji: '🗡️', slot: 'weapon', rarity: 'C' },
  { id: 'w_pan',       name: 'Bratpfanne des Anfangs', emoji: '🍳', slot: 'weapon', rarity: 'C' },
  { id: 'w_katana',    name: 'Rostiges Katana',        emoji: '⚔️', slot: 'weapon', rarity: 'B' },
  { id: 'w_bow',       name: 'Jägerbogen',             emoji: '🏹', slot: 'weapon', rarity: 'B' },
  { id: 'w_axe',       name: 'Berserker-Axt',          emoji: '🪓', slot: 'weapon', rarity: 'B' },
  { id: 'w_trident',   name: 'Sturmtrident',           emoji: '🔱', slot: 'weapon', rarity: 'A' },
  { id: 'w_hammer',    name: 'Donnerhammer',           emoji: '🔨', slot: 'weapon', rarity: 'A' },
  { id: 'w_flame',     name: 'Flammenklinge',          emoji: '🔥', slot: 'weapon', rarity: 'S' },
  { id: 'w_lightning', name: 'Blitz-Zerteiler',        emoji: '⚡', slot: 'weapon', rarity: 'S' },
  { id: 'w_dragon',    name: 'Drachenzahn-Klinge',     emoji: '🐉', slot: 'weapon', rarity: 'SS' },

  // ── Kopf ──
  { id: 'h_cap',       name: 'Alte Kappe',             emoji: '🧢', slot: 'head', rarity: 'C' },
  { id: 'h_bandana',   name: 'Trainings-Bandana',      emoji: '🎽', slot: 'head', rarity: 'C' },
  { id: 'h_straw',     name: 'Strohhut',               emoji: '👒', slot: 'head', rarity: 'B' },
  { id: 'h_helmet',    name: 'Eisenhelm',              emoji: '⛑️', slot: 'head', rarity: 'B' },
  { id: 'h_tophat',    name: 'Gentleman-Zylinder',     emoji: '🎩', slot: 'head', rarity: 'A' },
  { id: 'h_crown_s',   name: 'Silberkrone',            emoji: '👑', slot: 'head', rarity: 'A' },
  { id: 'h_wizard',    name: 'Hut des Erzmagiers',     emoji: '🧙', slot: 'head', rarity: 'S' },
  { id: 'h_halo',      name: 'Heiligenschein',         emoji: '😇', slot: 'head', rarity: 'S' },
  { id: 'h_kingcrown', name: 'Krone der Meere',        emoji: '👑', slot: 'head', rarity: 'SS' },

  // ── Rüstung ──
  { id: 'a_shirt',     name: 'Trainings-Shirt',        emoji: '👕', slot: 'armor', rarity: 'C' },
  { id: 'a_gi',        name: 'Abgenutzter Kampf-Gi',   emoji: '🥋', slot: 'armor', rarity: 'C' },
  { id: 'a_vest',      name: 'Lederweste',             emoji: '🦺', slot: 'armor', rarity: 'B' },
  { id: 'a_coat',      name: 'Kapitänsmantel',         emoji: '🧥', slot: 'armor', rarity: 'B' },
  { id: 'a_shield',    name: 'Wächterschild',          emoji: '🛡️', slot: 'armor', rarity: 'A' },
  { id: 'a_kimono',    name: 'Seiden-Kimono',          emoji: '👘', slot: 'armor', rarity: 'A' },
  { id: 'a_dragon',    name: 'Drachenschuppen-Panzer', emoji: '🐲', slot: 'armor', rarity: 'S' },
  { id: 'a_galaxy',    name: 'Galaxien-Rüstung',       emoji: '🌌', slot: 'armor', rarity: 'SS' },

  // ── Accessoires ──
  { id: 'x_towel',     name: 'Gym-Handtuch',           emoji: '🧻', slot: 'accessory', rarity: 'C' },
  { id: 'x_bottle',    name: 'Wasserflasche',          emoji: '🧴', slot: 'accessory', rarity: 'C' },
  { id: 'x_beads',     name: 'Glücksperlen',           emoji: '📿', slot: 'accessory', rarity: 'B' },
  { id: 'x_compass',   name: 'Abenteurer-Kompass',     emoji: '🧭', slot: 'accessory', rarity: 'B' },
  { id: 'x_amulet',    name: 'Schutz-Amulett',         emoji: '🧿', slot: 'accessory', rarity: 'A' },
  { id: 'x_ring',      name: 'Ring der Ausdauer',      emoji: '💍', slot: 'accessory', rarity: 'A' },
  { id: 'x_wings',     name: 'Phönix-Feder',           emoji: '🪶', slot: 'accessory', rarity: 'S' },
  { id: 'x_star',      name: 'Gefallener Stern',       emoji: '🌟', slot: 'accessory', rarity: 'SS' },
]

// ─── Avatare ───────────────────────────────────────────────────
export const AVATARS = ['🥷','🧙‍♂️','🦸‍♂️','🦸‍♀️','🥋','🤺','🏴‍☠️','🧝','🐺','🦊','🐉','🤖']

// ─── Drop Logic ────────────────────────────────────────────────
export const rollRarity = () => {
  const total = Object.values(RARITIES).reduce((s, r) => s + r.weight, 0)
  let roll = Math.random() * total
  for (const [key, r] of Object.entries(RARITIES)) {
    roll -= r.weight
    if (roll <= 0) return key
  }
  return 'C'
}

export const rollItem = (ownedIds = []) => {
  const rarity = rollRarity()
  const pool = ITEMS.filter(i => i.rarity === rarity)
  const fresh = pool.filter(i => !ownedIds.includes(i.id))
  const candidates = fresh.length > 0 ? fresh : pool
  return candidates[Math.floor(Math.random() * candidates.length)]
}

export const getItem = (id) => ITEMS.find(i => i.id === id)

export const defaultCharacter = (avatar = '🥷') => ({
  avatar,
  items: [],
  equipped: { weapon: null, head: null, armor: null, accessory: null },
  claimedDrops: 0,
})
