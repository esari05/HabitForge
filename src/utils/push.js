const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = window.atob(base64)
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)))
}

export const pushSupported = () =>
  'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window

export const subscribeToPush = async (reminderTime) => {
  if (!pushSupported()) throw new Error('Push wird auf diesem Gerät nicht unterstützt')

  const perm = await Notification.requestPermission()
  if (perm !== 'granted') throw new Error('Benachrichtigungen wurden nicht erlaubt')

  const reg = await navigator.serviceWorker.ready

  const vapidRes = await fetch('/api/vapid')
  if (!vapidRes.ok) throw new Error('Server nicht eingerichtet (VAPID Key fehlt)')
  const { key } = await vapidRes.json()

  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(key),
  })

  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sub: sub.toJSON(), time: reminderTime }),
  })
  if (!res.ok) throw new Error('Subscription konnte nicht gespeichert werden')

  return sub
}

export const updatePushTime = async (reminderTime) => {
  if (!pushSupported()) return
  const reg = await navigator.serviceWorker.ready
  const sub = await reg.pushManager.getSubscription()
  if (!sub) return
  await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sub: sub.toJSON(), time: reminderTime }),
  })
}

export const unsubscribeFromPush = async () => {
  if (!pushSupported()) return
  const reg = await navigator.serviceWorker.ready
  const sub = await reg.pushManager.getSubscription()
  if (!sub) return
  await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sub: sub.toJSON(), remove: true }),
  }).catch(() => {})
  await sub.unsubscribe()
}
