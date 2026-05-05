import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'

export default function DiaryScreen() {
  const navigate = useNavigate()
  const { diary, removeFromDiary } = useContext(AppContext)

  // Group by date
  const grouped = diary.reduce((acc, entry) => {
    if (!acc[entry.date]) acc[entry.date] = []
    acc[entry.date].push(entry)
    return acc
  }, {})
  const dates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a))

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    if (dateStr === today) return 'Today'
    if (dateStr === yesterday) return 'Yesterday'
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{
        padding: '52px 24px 16px', flexShrink: 0,
        background: 'linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)',
      }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, marginBottom: '4px' }}>
          Food <span style={{ color: 'var(--accent2)' }}>Diary</span>
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{diary.length} total entries</p>
      </div>

      <div className="scroll-y" style={{ flex: 1, padding: '0 20px 20px' }}>
        {dates.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>📒</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Diary is empty</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>
              Analyze your first meal to start tracking!
            </p>
            <button onClick={() => navigate('/scan')} style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
              border: 'none', borderRadius: '14px', padding: '13px 28px',
              color: '#0c0f0a', fontWeight: 700, fontSize: '14px',
              cursor: 'pointer', fontFamily: 'var(--font-display)',
            }}>📷 Scan Food</button>
          </div>
        ) : (
          <div style={{ paddingBottom: '20px' }}>
            {dates.map(date => {
              const entries = grouped[date]
              const dayTotal = entries.reduce((s, e) => s + (e.calories || 0), 0)
              return (
                <div key={date} style={{ marginBottom: '24px' }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: '10px',
                  }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text)' }}>
                      {formatDate(date)}
                    </h3>
                    <span style={{
                      background: 'var(--accent)' + '18',
                      color: 'var(--accent)',
                      padding: '3px 12px',
                      borderRadius: '99px', fontSize: '12px', fontWeight: 700,
                    }}>{Math.round(dayTotal)} kcal</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {entries.map(entry => (
                      <DiaryRow key={entry.id} entry={entry} onRemove={() => removeFromDiary(entry.id)} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function DiaryRow({ entry, onRemove }) {
  const [showDetail, setShowDetail] = useState(false)
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '14px',
      overflow: 'hidden',
    }}>
      <div
        onClick={() => setShowDetail(s => !s)}
        style={{
          padding: '12px 14px',
          display: 'flex', alignItems: 'center', gap: '12px',
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: '40px', height: '40px',
          background: 'var(--surface2)', borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px', flexShrink: 0,
        }}>{entry.emoji || '🍽️'}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {entry.foodName}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {entry.time} · {entry.mealType}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', color: 'var(--accent)' }}>
            {Math.round(entry.calories)}
          </div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>kcal</div>
        </div>
        <span style={{ color: 'var(--text-dim)', fontSize: '12px', flexShrink: 0 }}>{showDetail ? '▲' : '▼'}</span>
      </div>

      {showDetail && (
        <div style={{
          borderTop: '1px solid var(--border)',
          padding: '12px 14px',
          background: 'var(--surface2)',
        }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '10px', flexWrap: 'wrap' }}>
            {[
              { label: 'Protein', value: entry.protein, color: '#60a5fa' },
              { label: 'Carbs', value: entry.carbs, color: '#f5c842' },
              { label: 'Fat', value: entry.fat, color: '#fb923c' },
              { label: 'Fiber', value: entry.fiber, color: '#a78bfa' },
            ].map(m => (
              <div key={m.label}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: m.color }}>{Math.round(m.value || 0)}g</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{m.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{entry.servingSize}</span>
            <button
              onClick={onRemove}
              style={{ fontSize: '12px', color: 'var(--accent3)', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
            >Remove</button>
          </div>
        </div>
      )}
    </div>
  )
}
