import webpush from 'web-push'
import { getRedis, SUBS_KEY, SENT_KEY, viennaNow } from './_lib.js'
import { quotes } from '../src/data/quotes.js'

// Sendet die Erinnerung, wenn die gespeicherte Erinnerungszeit innerhalb
// von ±70 Minuten der aktuellen Wiener Zeit liegt (Vercel Hobby-Crons
// feuern nur 1x täglich und nicht minutengenau). Pro Tag max. 1 Nachricht.
// Test: /api/send-reminder?force=1

export default async function handler(req, res) {
  // Optionaler Schutz: wenn CRON_SECRET gesetzt ist, muss der Header passen
  const secret = process.env.CRON_SECRET
  if (secret && req.headers.authorization !== `Bearer ${secret}` && !req.query?.force) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const pub = process.env.VAPID_PUBLIC_KEY
  const priv = process.env.VAPID_PRIVATE_KEY
  if (!pub || !priv) return res.status(500).json({ error: 'VAPID Keys fehlen' })

  webpush.setVapidDetails(process.env.VAPID_SUBJECT || 'mailto:habitforge@example.com', pub, priv)

  try {
    const redis = getRedis()
    const all = (await redis.hgetall(SUBS_KEY)) || {}
    const lastSent = (await redis.hgetall(SENT_KEY)) || {}
    const { dateKey, minutes: nowMin } = viennaNow()
    const force = req.query?.force === '1'

    const quote = quotes[Math.floor(Date.now() / 86400000) % quotes.length]
    const results = []

    for (const [endpoint, raw] of Object.entries(all)) {
      const entry = typeof raw === 'string' ? JSON.parse(raw) : raw
      const { sub, time } = entry

      if (!force) {
        if (lastSent[endpoint] === dateKey) { results.push({ endpoint: endpoint.slice(-12), skipped: 'heute schon gesendet' }); continue }
        const [h, m] = (time || '08:00').split(':').map(Number)
        const target = h * 60 + m
        if (Math.abs(nowMin - target) > 70) { results.push({ endpoint: endpoint.slice(-12), skipped: `Zeit passt nicht (${time})` }); continue }
      }

      try {
        await webpush.sendNotification(sub, JSON.stringify({
          title: 'HabitForge ⚔️ Quest-Zeit!',
          body: `"${quote.text}" — ${quote.author}`,
        }))
        await redis.hset(SENT_KEY, { [endpoint]: dateKey })
        results.push({ endpoint: endpoint.slice(-12), sent: true })
      } catch (err) {
        if (err.statusCode === 404 || err.statusCode === 410) {
          await redis.hdel(SUBS_KEY, endpoint)
          results.push({ endpoint: endpoint.slice(-12), removed: 'abgelaufen' })
        } else {
          results.push({ endpoint: endpoint.slice(-12), error: err.message })
        }
      }
    }

    return res.status(200).json({ ok: true, viennaTime: `${Math.floor(nowMin/60)}:${String(nowMin%60).padStart(2,'0')}`, results })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
