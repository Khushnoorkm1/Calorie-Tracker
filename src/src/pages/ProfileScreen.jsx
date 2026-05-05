import React, { useContext, useState } from 'react'
import { AppContext } from '../App'

export default function ProfileScreen() {
  const { diary, todayTotals, goals } = useContext(AppContext)
  const [showKeyEdit, setShowKeyEdit] = useState(false)
  const [newKey, setNewKey] = useState('')

  // Weekly stats
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - i * 86400000).toDateString()
    const entries = diary.filter(e => e.date === d)
    return {
      label: new Date(Date.now() - i * 86400000).toLocaleDateString('en-US', { weekday: 'short' }),
      calories: entries.reduce((s, e) => s + (e.calories || 0), 0),
      entries: entries.length,
    }
  }).reverse()

  const totalMeals = diary.length
  const avgCals = diary.length > 0
    ? Math.round(diary.reduce((s, e) => s + (e.calories || 0), 0) / Math.max(new Set(diary.map(e => e.date)).size, 1))
    : 0

  const maxCal = Math.max(...last7.map(d => d.calories), goals.calories)

  const handleSaveKey = () => {
    if (newKey.startsWith('sk-ant-')) {
      localStorage.setItem('calai_key', newKey)
      setShowKeyEdit(false)
      window.location.reload()
    }
  }

  return (
    <div className="scroll-y" style={{ height: '100%', background: 'var(--bg)' }}>
      <div style={{
        padding: '52px 24px 20px',
        background: 'linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)',
        textAlign: 'center',
      }}>
        <div style={{
          width: '72px', height: '72px',
          background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
          borderRadius: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '36px', margin: '0 auto 12px',
          boxShadow: '0 8px 30px rgba(168,224,99,0.3)',
        }}>🥗</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>
          My <span style={{ color: 'var(--accent)' }}>Profile</span>
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Nutrition tracker</p>
      </div>

      <div style={{ padding: '0 24px 100px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          {[
            { label: 'Total Meals', value: totalMeals, icon: '🍽️', color: 'var(--accent)' },
            { label: 'Avg Kcal', value: avgCals, icon: '⚡', color: 'var(--accent2)' },
            { label: 'Today', value: Math.round(todayTotals.calories), icon: '📅', color: '#60a5fa' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '14px 10px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Weekly Bar Chart */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '18px',
          marginBottom: '16px',
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>
            7-Day Calories
          </h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '80px' }}>
            {last7.map((d, i) => {
              const h = maxCal > 0 ? (d.calories / maxCal) * 80 : 0
              const isToday = i === 6
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{d.calories > 0 ? Math.round(d.calories) : ''}</div>
                  <div style={{
                    width: '100%',
                    height: `${Math.max(h, d.calories > 0 ? 4 : 0)}px`,
                    background: isToday ? 'var(--accent)' : 'var(--surface3)',
                    borderRadius: '4px 4px 0 0',
                    position: 'relative',
                    minHeight: '2px',
                    transition: 'height 0.6s ease',
                  }}>
                    {/* Goal line indicator */}
                    {d.calories > goals.calories && (
                      <div style={{
                        position: 'absolute', bottom: `${(goals.calories / maxCal) * 80}px`,
                        left: 0, right: 0, height: '1px',
                        background: 'var(--accent3)', opacity: 0.6,
                      }} />
                    )}
                  </div>
                  <div style={{ fontSize: '9px', color: isToday ? 'var(--accent)' : 'var(--text-dim)', fontWeight: isToday ? 700 : 400 }}>
                    {d.label}
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
            <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '2px' }} />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Today</span>
            <div style={{ width: '8px', height: '8px', background: 'var(--surface3)', borderRadius: '2px', marginLeft: '8px' }} />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Past days</span>
          </div>
        </div>

        {/* Goals */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '18px',
          marginBottom: '16px',
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Daily Goals</h3>
          {[
            { label: 'Calories', value: 2000, unit: 'kcal', color: 'var(--accent)' },
            { label: 'Protein', value: 150, unit: 'g', color: '#60a5fa' },
            { label: 'Carbs', value: 250, unit: 'g', color: '#f5c842' },
            { label: 'Fat', value: 65, unit: 'g', color: '#fb923c' },
          ].map(g => (
            <div key={g.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{g.label}</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: g.color }}>{g.value} {g.unit}</span>
            </div>
          ))}
          <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>
            Custom goals coming soon
          </p>
        </div>

        {/* API Key */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '18px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showKeyEdit ? '14px' : '0' }}>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700 }}>API Key</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Anthropic Claude API</p>
            </div>
            <button
              onClick={() => setShowKeyEdit(s => !s)}
              style={{
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '12px', color: 'var(--accent)',
                cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600,
              }}
            >{showKeyEdit ? 'Cancel' : 'Update'}</button>
          </div>
          {showKeyEdit && (
            <div>
              <input
                type="password"
                placeholder="sk-ant-api03-..."
                value={newKey}
                onChange={e => setNewKey(e.target.value)}
                style={{
                  width: '100%', background: 'var(--surface2)',
                  border: '1px solid var(--border)', borderRadius: '10px',
                  padding: '11px 14px', color: 'var(--text)', fontSize: '13px',
                  outline: 'none', marginBottom: '10px', fontFamily: 'var(--font-body)',
                }}
              />
              <button
                onClick={handleSaveKey}
                style={{
                  width: '100%', padding: '11px',
                  background: 'var(--accent)', border: 'none',
                  borderRadius: '10px', color: '#0c0f0a',
                  fontWeight: 700, fontSize: '13px',
                  cursor: 'pointer', fontFamily: 'var(--font-display)',
                }}
              >Save Key</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
