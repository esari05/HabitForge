export default function handler(req, res) {
  const key = process.env.VAPID_PUBLIC_KEY
  if (!key) return res.status(500).json({ error: 'VAPID_PUBLIC_KEY fehlt in den Vercel Environment Variables' })
  res.status(200).json({ key })
}
