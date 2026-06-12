import { getRedis } from './_lib.js'

const userKey = (id) => `hf:user:${String(id).toUpperCase().trim()}`

export default async function handler(req, res) {
  try {
    const redis = getRedis()

    if (req.method === 'GET') {
      const id = req.query?.id
      if (!id || id.length < 6) return res.status(400).json({ error: 'Sync-Code fehlt oder ungültig' })
      let data = await redis.get(userKey(id))
      if (!data) return res.status(404).json({ error: 'Kein Spielstand mit diesem Code gefunden' })
      if (typeof data === 'string') { try { data = JSON.parse(data) } catch {} }
      return res.status(200).json({ ok: true, data })
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const { id, data } = body || {}
      if (!id || id.length < 6) return res.status(400).json({ error: 'Sync-Code fehlt' })
      if (!data?.profile) return res.status(400).json({ error: 'Keine Daten' })
      await redis.set(userKey(id), JSON.stringify({ ...data, savedAt: new Date().toISOString() }))
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
