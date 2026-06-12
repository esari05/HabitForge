import { getRedis, SUBS_KEY } from './_lib.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  try {
    const redis = getRedis()
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const { sub, time, remove } = body || {}

    if (!sub?.endpoint) return res.status(400).json({ error: 'Subscription fehlt' })

    if (remove) {
      await redis.hdel(SUBS_KEY, sub.endpoint)
      return res.status(200).json({ ok: true, removed: true })
    }

    await redis.hset(SUBS_KEY, {
      [sub.endpoint]: JSON.stringify({ sub, time: time || '08:00' }),
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
