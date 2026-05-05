import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import MacroRing from '../components/MacroRing'

const MACRO_CONFIG = [
  { key: 'protein', label: 'Protein', unit: 'g', color: '#60a5fa' },
  { key: 'carbs', label: 'Carbs', unit: 'g', color: '#f5c842' },
  { key: 'fat', label: 'Fat', unit: 'g', color: '#fb923c' },
]

export default function HomeScreen() {
  const navigate = useNavigate()
  const { todayTotals, goals, todayEntries, removeFromDiary } = useContext(AppContext)
  const calPct = Math.min(todayTotals.calories / goals.calories, 1)
  const remaining = Math.max(goals.calories - todayTotals.calories, 0)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="scroll-y" style={{ height: '100%', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{
        padding: '52px 24px 0',
        background: 'linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '3px' }}>{greeting} 👋</p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '30px', fontWeight: 800,
              letterSpacing: '-0.5px', lineHeight: 1.1,
              color: 'var(--text)',
            }}>
              Today's<br /><span style={{ color: 'var(--accent)' }}>Nutrition</span>
            </h1>
          </div>
          <div style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '10px 14px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>ENTRIES</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>{todayEntries.length}</div>
          </div>
        </div>

        {/* Calorie Arc */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '16px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Glow bg */}
          <div style={{
            position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)',
            width: '200px', height: '200px',
            background: 'radial-gradient(circle, rgba(168,224,99,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Big calorie arc */}
            <div style={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0 }}>
              <svg width="110" height="110" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="55" cy="55" r="46" fill="none" stroke="var(--surface2)" strokeWidth="10" />
                <circle
                  cx="55" cy="55" r="46" fill="none"
                  stroke="var(--accent)" strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 46}`}
                  strokeDashoffset={`${2 * Math.PI * 46 * (1 - calPct)}`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s ease', filter: 'drop-shadow(0 0 6px rgba(168,224,99,0.5))' }}
                />
              </svg>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text)', lineHeight: 1 }}>
                  {Math.round(todayTotals.calories)}
                </span>
                <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>kcal eaten</span>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '2px' }}>Goal</div>
                <div style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
                  {goals.calories} <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-muted)' }}>kcal</span>
                </div>
              </div>
              <div style={{
                background: 'var(--surface2)',
                borderRadius: '12px',
                padding: '10px 14px',
                display: 'inline-block',
              }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '1px' }}>Remaining</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: remaining > 0 ? 'var(--accent)' : 'var(--accent3)', fontFamily: 'var(--font-display)' }}>
                  {remaining > 0 ? remaining : Math.abs(remaining)} kcal
                  {remaining <= 0 && <span style={{ fontSize: '11px', color: 'var(--accent3)' }}> over</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Macro Rings */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
          {MACRO_CONFIG.map(m => (
            <MacroRing
              key={m.key}
              value={todayTotals[m.key]}
              goal={goals[m.key]}
              color={m.color}
              label={m.label}
              size={82}
            />
          ))}
        </div>
      </div>

      <div style={{ padding: '0 24px 120px' }}>
        {/* Scan CTA */}
        <button
          onClick={() => navigate('/scan')}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
            border: 'none',
            borderRadius: '18px',
            padding: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            marginBottom: '28px',
            boxShadow: '0 8px 30px rgba(168,224,99,0.25)',
          }}
        >
          <div style={{
            width: '48px', height: '48px',
            background: 'rgba(0,0,0,0.15)',
            borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px', flexShrink: 0,
          }}>📷</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0c0f0a', fontFamily: 'var(--font-display)' }}>
              Snap Your Meal
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
              AI analyzes calories & macros instantly
            </div>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: '20px', color: 'rgba(0,0,0,0.4)' }}>→</div>
        </button>

        {/* Today's Entries */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '14px', color: 'var(--text)' }}>
            Today's Log
          </h2>
          {todayEntries.length === 0 ? (
            <div style={{
              background: 'var(--surface)',
              border: '1px dashed var(--border)',
              borderRadius: '18px',
              padding: '36px 20px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🍽️</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>
                No meals logged yet.<br />Snap your first meal to get started!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {todayEntries.map(entry => (
                <FoodCard key={entry.id} entry={entry} onRemove={() => removeFromDiary(entry.id)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FoodCard({ entry, onRemove }) {
  const healthColor = entry.healthScore >= 7 ? 'var(--accent)' : entry.healthScore >= 5 ? 'var(--accent2)' : 'var(--accent3)'

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      <div style={{
        width: '44px', height: '44px',
        background: 'var(--surface2)',
        borderRadius: '12px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '24px', flexShrink: 0,
      }}>{entry.emoji || '🍽️'}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '3px', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {entry.foodName}
        </div>
        <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
          <span>P: {Math.round(entry.protein)}g</span>
          <span>C: {Math.round(entry.carbs)}g</span>
          <span>F: {Math.round(entry.fat)}g</span>
          <span style={{ color: 'var(--text-dim)' }}>{entry.time}</span>
        </div>
      </div>

      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: 'var(--accent)' }}>
          {Math.round(entry.calories)}
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>kcal</div>
      </div>

      <button
        onClick={onRemove}
        style={{ color: 'var(--text-dim)', fontSize: '16px', padding: '4px', flexShrink: 0 }}
      >✕</button>
    </div>
  )
}
