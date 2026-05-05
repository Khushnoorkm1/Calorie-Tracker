import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const TABS = [
  { path: '/', icon: '⚡', label: 'Today' },
  { path: '/scan', icon: '📷', label: 'Scan', primary: true },
  { path: '/diary', icon: '📒', label: 'Diary' },
  { path: '/profile', icon: '👤', label: 'Profile' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav style={{
      display: 'flex', alignItems: 'center',
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '8px 8px max(8px, env(safe-area-inset-bottom))',
      gap: '4px',
      flexShrink: 0,
    }}>
      {TABS.map(tab => {
        const active = pathname === tab.path
        if (tab.primary) {
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              style={{
                flex: 1,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '3px',
                padding: '4px 0',
              }}
            >
              <div style={{
                width: '52px', height: '52px',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
                borderRadius: '18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px',
                boxShadow: '0 4px 20px rgba(168,224,99,0.35)',
                transform: active ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.2s',
              }}>📷</div>
              <span style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 600 }}>Scan</span>
            </button>
          )
        }
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '4px',
              padding: '8px 0',
              opacity: active ? 1 : 0.4,
              transition: 'opacity 0.2s',
            }}
          >
            <span style={{ fontSize: '22px', lineHeight: 1 }}>{tab.icon}</span>
            <span style={{
              fontSize: '10px',
              color: active ? 'var(--accent)' : 'var(--text-muted)',
              fontWeight: active ? 600 : 400,
            }}>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
