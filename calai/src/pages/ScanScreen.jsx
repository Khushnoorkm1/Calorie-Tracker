import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App'
import { analyzeFood } from '../utils/analyzeFood'

export default function ScanScreen() {
  const navigate = useNavigate()
  const { apiKey, setScanResult } = useApp()
  const [mode, setMode] = useState('upload') // upload | manual
  const [preview, setPreview] = useState(null)
  const [imageData, setImageData] = useState(null)
  const [mimeType, setMimeType] = useState('image/jpeg')
  const [manualText, setManualText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loadingMsg, setLoadingMsg] = useState('')
  const fileRef = useRef()

  const LOADING_MSGS = [
    'Identifying ingredients…',
    'Calculating macros…',
    'Estimating portion size…',
    'Checking nutritional data…',
  ]

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setMimeType(file.type || 'image/jpeg')
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target.result
      setPreview(result)
      setImageData(result.split(',')[1])
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files[0])
  }

  const analyze = async () => {
    setError('')
    setLoading(true)
    let msgIdx = 0
    setLoadingMsg(LOADING_MSGS[0])
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MSGS.length
      setLoadingMsg(LOADING_MSGS[msgIdx])
    }, 1200)

    try {
      const result = await analyzeFood(
        apiKey,
        imageData,
        mimeType,
        mode === 'manual' ? manualText : null
      )
      setScanResult({ ...result, imagePreview: preview })
      navigate('/result')
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.')
    } finally {
      clearInterval(interval)
      setLoading(false)
    }
  }

  const canAnalyze = mode === 'manual' ? manualText.trim().length > 2 : !!imageData

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{
        padding: '52px 20px 16px',
        display: 'flex', alignItems: 'center', gap: '12px',
        flexShrink: 0,
        background: 'linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)',
      }}>
        <button onClick={() => navigate(-1)} style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'var(--surface2)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px',
        }}>‹</button>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800 }}>
            Analyze <span style={{ color: 'var(--accent)' }}>Food</span>
          </h1>
        </div>
      </div>

      {/* Mode Toggle */}
      <div style={{ padding: '0 20px 16px', flexShrink: 0 }}>
        <div style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '4px',
          display: 'flex',
          border: '1px solid var(--border)',
        }}>
          {[
            { id: 'upload', label: '📷 Photo' },
            { id: 'manual', label: '✏️ Type Food' },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => { setMode(m.id); setError('') }}
              style={{
                flex: 1, padding: '9px',
                borderRadius: '9px',
                background: mode === m.id ? 'var(--accent)' : 'transparent',
                color: mode === m.id ? '#0c0f0a' : 'var(--text-muted)',
                fontWeight: 600, fontSize: '13px',
                transition: 'all 0.2s',
                border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >{m.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="scroll-y" style={{ flex: 1, padding: '0 20px' }}>
        {mode === 'upload' ? (
          <div>
            {/* Drop Zone */}
            <div
              onClick={() => !preview && fileRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              style={{
                background: 'var(--surface)',
                border: `2px dashed ${preview ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: preview ? 'default' : 'pointer',
                minHeight: '280px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                marginBottom: '16px',
                transition: 'border-color 0.3s',
              }}
            >
              {preview ? (
                <>
                  <img src={preview} alt="food" style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '320px' }} />
                  <button
                    onClick={(e) => { e.stopPropagation(); setPreview(null); setImageData(null) }}
                    style={{
                      position: 'absolute', top: '12px', right: '12px',
                      background: 'rgba(0,0,0,0.6)',
                      border: 'none', borderRadius: '50%',
                      width: '32px', height: '32px',
                      color: 'white', fontSize: '14px', cursor: 'pointer',
                    }}
                  >✕</button>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ fontSize: '56px', marginBottom: '16px' }}>📸</div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>
                    Upload Food Photo
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Tap to choose from gallery<br />or drag & drop
                  </p>
                </div>
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={e => handleFile(e.target.files[0])}
              style={{ display: 'none' }}
            />

            {/* Quick examples */}
            {!preview && (
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>💡 Works best with:</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Meals on plate', 'Packaged food', 'Restaurant food', 'Snacks & drinks'].map(t => (
                    <span key={t} style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '99px',
                      padding: '5px 12px',
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '20px',
              marginBottom: '14px',
            }}>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.5px', display: 'block', marginBottom: '10px' }}>
                DESCRIBE YOUR FOOD
              </label>
              <textarea
                placeholder="e.g. 2 rotis with dal, or large McDonalds Big Mac with fries…"
                value={manualText}
                onChange={e => setManualText(e.target.value)}
                rows={4}
                style={{
                  width: '100%', background: 'transparent',
                  border: 'none', outline: 'none',
                  color: 'var(--text)', fontSize: '15px',
                  resize: 'none', fontFamily: 'var(--font-body)',
                  lineHeight: 1.6,
                }}
              />
            </div>

            {/* Quick meals */}
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>Quick add:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                '2 eggs scrambled with toast',
                'Chicken biryani, 1 plate',
                'Dal makhani with 2 rotis',
                'Banana and peanut butter',
                'Protein shake with milk',
              ].map(food => (
                <button
                  key={food}
                  onClick={() => setManualText(food)}
                  style={{
                    background: 'var(--surface)',
                    border: `1px solid ${manualText === food ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: '12px',
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: '13px',
                    color: manualText === food ? 'var(--accent)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'var(--font-body)',
                  }}
                >🍽️ {food}</button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div style={{
            background: 'rgba(255,107,107,0.1)',
            border: '1px solid rgba(255,107,107,0.3)',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '14px',
            fontSize: '13px',
            color: 'var(--accent3)',
          }}>⚠️ {error}</div>
        )}

        <div style={{ paddingBottom: '30px' }}>
          <button
            onClick={analyze}
            disabled={!canAnalyze || loading}
            style={{
              width: '100%',
              padding: '16px',
              background: canAnalyze && !loading
                ? 'linear-gradient(135deg, var(--accent), var(--accent-dark))'
                : 'var(--surface2)',
              border: 'none',
              borderRadius: '16px',
              color: canAnalyze && !loading ? '#0c0f0a' : 'var(--text-dim)',
              fontSize: '15px',
              fontWeight: 700,
              cursor: canAnalyze && !loading ? 'pointer' : 'not-allowed',
              fontFamily: 'var(--font-display)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s',
              boxShadow: canAnalyze && !loading ? '0 6px 24px rgba(168,224,99,0.25)' : 'none',
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: '18px', height: '18px',
                  border: '2px solid rgba(0,0,0,0.2)',
                  borderTopColor: '#0c0f0a',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                {loadingMsg}
              </>
            ) : (
              <>⚡ Analyze Now</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
