import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App'

const MACRO_ITEMS = [
  { key: 'protein', label: 'Protein', unit: 'g', color: '#60a5fa', icon: '💪' },
  { key: 'carbs', label: 'Carbohydrates', unit: 'g', color: '#f5c842', icon: '🌾' },
  { key: 'fat', label: 'Fat', unit: 'g', color: '#fb923c', icon: '🥑' },
  { key: 'fiber', label: 'Fiber', unit: 'g', color: '#a78bfa', icon: '🌿' },
  { key: 'sugar', label: 'Sugar', unit: 'g', color: '#f472b6', icon: '🍬' },
]

export default function ResultScreen() {
  const navigate = useNavigate()
  const { scanResult, addToDiary } = useApp()
  const [added, setAdded] = useState(false)

  if (!scanResult) {
    navigate('/')
    return null
  }

  const r = scanResult
  const healthColor = r.healthScore >= 7 ? 'var(--accent)' : r.healthScore >= 5 ? 'var(--accent2)' : 'var(--accent3)'
  const confidenceColor = { high: 'var(--accent)', medium: 'var(--accent2)', low: 'var(--accent3)' }[r.confidence] || 'var(--accent2)'

  const handleAdd = () => {
    addToDiary(r)
    setAdded(true)
    setTimeout(() => navigate('/'), 1200)
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{
        padding: '52px 20px 16px',
        display: 'flex', alignItems: 'center', gap: '12px',
        flexShrink: 0,
        background: 'linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)',
      }}>
        <button onClick={() => navigate('/scan')} style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'var(--surface2)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
        }}>‹</button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800 }}>
          Analysis <span style={{ color: 'var(--accent)' }}>Results</span>
        </h1>
      </div>

      <div className="scroll-y" style={{ flex: 1, padding: '0 20px' }}>
        {/* Food Identity Card */}
        <div className="fade-up" style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '20px',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: '120px', height: '120px',
            background: 'radial-gradient(circle, rgba(168,224,99,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {r.imagePreview ? (
            <img src={r.imagePreview} alt="food" style={{
              width: '80px', height: '80px', borderRadius: '16px', objectFit: 'cover', flexShrink: 0,
            }} />
          ) : (
            <div style={{
              width: '80px', height: '80px',
              background: 'var(--surface2)', borderRadius: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '44px', flexShrink: 0,
            }}>{r.emoji}</div>
          )}

          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '17px', fontWeight: 800,
              marginBottom: '6px', color: 'var(--text)',
              lineHeight: 1.2,
            }}>{r.emoji} {r.foodName}</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>{r.servingSize}</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{
                background: confidenceColor + '22', color: confidenceColor,
                padding: '3px 10px', borderRadius: '99px', fontSize: '10px', fontWeight: 600,
              }}>
                {r.confidence === 'high' ? '✓' : r.confidence === 'medium' ? '~' : '?'} {r.confidence} confidence
              </span>
              <span style={{
                background: 'var(--surface2)', color: 'var(--text-muted)',
                padding: '3px 10px', borderRadius: '99px', fontSize: '10px',
              }}>🍽️ {r.mealType}</span>
            </div>
          </div>
        </div>

        {/* Big Calorie Number */}
        <div className="fade-up-1" style={{
          background: 'linear-gradient(135deg, #1a2a10, #0f1a09)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '14px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 100%, rgba(168,224,99,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '6px' }}>TOTAL CALORIES</p>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '64px', fontWeight: 800,
            color: 'var(--accent)', lineHeight: 1,
            textShadow: '0 0 40px rgba(168,224,99,0.3)',
            animation: 'count-up 0.5s ease',
          }}>{Math.round(r.calories)}</p>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>kilocalories</p>
        </div>

        {/* Macros Grid */}
        <div className="fade-up-2" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '10px', marginBottom: '14px',
        }}>
          {MACRO_ITEMS.map(m => (
            <div key={m.key} style={{
              background: 'var(--surface)',
              border: `1px solid ${m.color}25`,
              borderRadius: '16px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div style={{
                width: '36px', height: '36px',
                background: m.color + '18',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', flexShrink: 0,
              }}>{m.icon}</div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-display)', color: m.color, lineHeight: 1 }}>
                  {Math.round(r[m.key] || 0)}<span style={{ fontSize: '11px', fontWeight: 400 }}>{m.unit}</span>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{m.label}</div>
              </div>
            </div>
          ))}

          {/* Health Score */}
          <div style={{
            background: 'var(--surface)',
            border: `1px solid ${healthColor}25`,
            borderRadius: '16px',
            padding: '14px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{
              width: '36px', height: '36px',
              background: healthColor + '18',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', flexShrink: 0,
            }}>❤️</div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-display)', color: healthColor, lineHeight: 1 }}>
                {r.healthScore}<span style={{ fontSize: '11px', fontWeight: 400 }}>/10</span>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Health Score</div>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        {r.ingredients?.length > 0 && (
          <div className="fade-up-3" style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '18px',
            padding: '16px',
            marginBottom: '14px',
          }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.5px', marginBottom: '12px' }}>INGREDIENTS DETECTED</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {r.ingredients.map((ing, i) => (
                <span key={i} style={{
                  background: 'var(--surface2)', border: '1px solid var(--border)',
                  borderRadius: '99px', padding: '4px 12px',
                  fontSize: '12px', color: 'var(--text-muted)',
                }}>{ing}</span>
              ))}
            </div>
          </div>
        )}

        {/* Health Tip */}
        {r.healthTip && (
          <div className="fade-up-4" style={{
            background: 'rgba(168,224,99,0.06)',
            border: '1px solid rgba(168,224,99,0.2)',
            borderRadius: '16px',
            padding: '14px 16px',
            marginBottom: '20px',
            display: 'flex', gap: '10px', alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '18px', flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: '13px', color: 'var(--accent)', lineHeight: 1.5 }}>{r.healthTip}</p>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '30px' }}>
          <button
            onClick={handleAdd}
            disabled={added}
            style={{
              padding: '16px',
              background: added ? 'var(--accent)' : 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
              border: 'none', borderRadius: '16px',
              color: '#0c0f0a',
              fontSize: '15px', fontWeight: 700,
              cursor: added ? 'default' : 'pointer',
              fontFamily: 'var(--font-display)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: '0 6px 24px rgba(168,224,99,0.25)',
              transition: 'all 0.3s',
            }}
          >
            {added ? '✓ Added to Diary!' : '+ Add to Food Diary'}
          </button>
          <button
            onClick={() => navigate('/scan')}
            style={{
              padding: '14px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              color: 'var(--text-muted)',
              fontSize: '14px', fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >📷 Scan Another Meal</button>
        </div>
      </div>
    </div>
  )
}
