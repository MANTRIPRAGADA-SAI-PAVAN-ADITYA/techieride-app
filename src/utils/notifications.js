// ─── PUSH NOTIFICATION UTILITIES ──────────────────────────────────────────────

export const requestPushPermission = async () => {
  if (!('Notification' in window)) return 'unsupported'
  if (Notification.permission === 'granted') return 'granted'
  if (Notification.permission === 'denied') return 'denied'
  const result = await Notification.requestPermission()
  return result
}

export const showPushNotification = (title, body, options = {}) => {
  if (Notification.permission !== 'granted') return
  const opts = {
    body,
    icon: '/icons/icon.svg',
    badge: '/icons/icon.svg',
    vibrate: [100, 50, 100],
    tag: options.tag || 'techieride',
    renotify: true,
    ...options,
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(reg => reg.showNotification(title, opts))
      .catch(() => new Notification(title, opts))
  } else {
    new Notification(title, opts)
  }
}

export const updateAppBadge = (count) => {
  if (!('setAppBadge' in navigator)) return
  if (count > 0) navigator.setAppBadge(count).catch(() => {})
  else navigator.clearAppBadge().catch(() => {})
}

// ─── NOTIFICATION TYPES ────────────────────────────────────────────────────────

export const NOTIF_TYPES = {
  MEMBER_REQUEST:   'member_request',
  MEMBER_APPROVED:  'member_approved',
  RIDE_POSTED:      'ride_posted',
  RIDE_CANCELLED:   'ride_cancelled',
  ACTIVITY_POSTED:  'activity_posted',
  DONATION:         'donation',
  BROADCAST:        'broadcast',
  RIDE_FLAGGED:     'ride_flagged',
}

export const makeNotification = (type, payload) => ({
  id: `n-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
  type,
  ...payload,
  time: new Date().toISOString(),
  unread: true,
})

export const formatNotifTime = (iso) => {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}
