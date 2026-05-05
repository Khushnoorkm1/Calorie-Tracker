import React, { useState } from 'react'

export default function ApiKeySetup({ onSave }) {
  const [key, setKey] = useState('')
  const [err, setErr] = useState('')

  const handleSave = () => {
    if (!key.startsWith('sk-ant-')) {
      setErr('Key must start with sk-ant-...')
      return
    }
    onSave(key.trim())
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      maxWidth: '430px', maxHeight: '932px',
      background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 28px',
      fontFamily: 'var(--font-body)',
    }}>
      {/* Logo */}
      <div style={{
        width: '80px', height: '80px',
        background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
        borderRadius: '28px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '40px',
        marginBottom: '28px',
        boxShadow: '0 0 40px rgba(168,224,99,0.3)',
      }}>🍎</div>

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 800, marginBottom: '8px', textAlign: 'center', color: 'var(--text)' }}>
        Cal<span style={{ color: 'var(--accent)' }}>AI</span>
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', marginBottom: '36px', lineHeight: 1.6 }}>
        Snap any meal — AI instantly counts<br />your calories and macros.
      </p>

      <div style={{ width: '100%', marginBottom: '12px' }}>
        <label style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
          ANTHROPIC API KEY
        </label>
        <input
          type="password"
          placeholder="sk-ant-api03-..."
          value={key}
          onChange={e => { setKey(e.target.value); setErr('') }}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          style={{
            width: '100%',
            background: 'var(--surface)',
            border: `1.5px solid ${err ? 'var(--accent3)' : 'var(--border)'}`,
            borderRadius: '14px',
            padding: '14px 16px',
            color: 'var(--text)',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        {err && <p style={{ color: 'var(--accent3)', fontSize: '12px', marginTop: '6px' }}>{err}</p>}
      </div>

      <button
        onClick={handleSave}
        style={{
          width: '100%',
          padding: '15px',
          background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
          borderRadius: '14px',
          border: 'none',
          color: '#0c0f0a',
          fontSize: '15px',
          fontWeight: 700,
          cursor: 'pointer',
          marginBottom: '20px',
          fontFamily: 'var(--font-display)',
          letterSpacing: '0.3px',
        }}
      >
        Get Started →
      </button>

      <p style={{ fontSize: '11px', color: 'var(--text-dim)', textAlign: 'center', lineHeight: 1.6 }}>
        Your key is stored locally on your device only.<br />
        Get a free key at{' '}
        <a href="https://console.anthropic.com" target="_blank" rel="noreferrer"
          style={{ color: 'var(--accent)', textDecoration: 'none' }}>
          console.anthropic.com
        </a>
      </p>
    </div>
  )
}
