import { useState, useEffect } from 'react'
import { Download, X, Smartphone } from 'lucide-react'

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [show, setShow] = useState(false)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) return
    if (localStorage.getItem('tr-install-dismissed')) return

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setTimeout(() => setShow(true), 3000)
    }
    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', () => setInstalled(true))
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const dismiss = () => {
    setShow(false)
    localStorage.setItem('tr-install-dismissed', '1')
  }

  const install = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setInstalled(true)
    setShow(false)
    setDeferredPrompt(null)
  }

  if (!show || installed) return null

  return (
    <div style={{
      position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 999, width: 'calc(100% - 32px)', maxWidth: '420px',
      background: 'var(--surface)', border: '1.5px solid var(--border)',
      borderRadius: '18px', padding: '16px 18px',
      boxShadow: '0 8px 32px rgba(20,161,175,0.18)',
      display: 'flex', alignItems: 'center', gap: '14px',
      animation: 'slideUp 0.3s ease',
    }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg,#14a1af,#0d3c55)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Smartphone size={20} color="white" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text)', marginBottom: '2px' }}>Install TechieRide</div>
        <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Add to home screen for offline access & notifications</div>
      </div>
      <button onClick={install}
        style={{ padding: '8px 14px', borderRadius: '10px', background: 'var(--primary)', border: 'none', color: 'white', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
        <Download size={12} /> Install
      </button>
      <button onClick={dismiss}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', flexShrink: 0 }}>
        <X size={16} />
      </button>
      <style>{`@keyframes slideUp { from { opacity:0; transform:translateX(-50%) translateY(20px) } to { opacity:1; transform:translateX(-50%) translateY(0) } }`}</style>
    </div>
  )
}
