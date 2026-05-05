import React, { createContext, useContext, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import ScanScreen from './pages/ScanScreen'
import ResultScreen from './pages/ResultScreen'
import DiaryScreen from './pages/DiaryScreen'
import ProfileScreen from './pages/ProfileScreen'
import BottomNav from './components/BottomNav'
import ApiKeySetup from './components/ApiKeySetup'

export const AppContext = createContext(null)

export function useApp() { return useContext(AppContext) }

const GOALS = { calories: 2000, protein: 150, carbs: 250, fat: 65 }

export default function App() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('calai_key') || '')
  const [diary, setDiary] = useState(() => {
    try { return JSON.parse(localStorage.getItem('calai_diary') || '[]') } catch { return [] }
  })
  const [scanResult, setScanResult] = useState(null)

  useEffect(() => {
    localStorage.setItem('calai_diary', JSON.stringify(diary))
  }, [diary])

  const saveApiKey = (key) => {
    setApiKey(key)
    localStorage.setItem('calai_key', key)
  }

  const addToDiary = (entry) => {
    const today = new Date().toDateString()
    setDiary(prev => [{
      ...entry,
      id: Date.now(),
      date: today,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }, ...prev].slice(0, 100))
  }

  const removeFromDiary = (id) => {
    setDiary(prev => prev.filter(e => e.id !== id))
  }

  // Today's totals
  const today = new Date().toDateString()
  const todayEntries = diary.filter(e => e.date === today)
  const todayTotals = todayEntries.reduce((acc, e) => ({
    calories: acc.calories + (e.calories || 0),
    protein: acc.protein + (e.protein || 0),
    carbs: acc.carbs + (e.carbs || 0),
    fat: acc.fat + (e.fat || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

  if (!apiKey) {
    return <ApiKeySetup onSave={saveApiKey} />
  }

  return (
    <AppContext.Provider value={{ apiKey, diary, todayEntries, todayTotals, goals: GOALS, scanResult, setScanResult, addToDiary, removeFromDiary }}>
      <BrowserRouter>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/scan" element={<ScanScreen />} />
              <Route path="/result" element={<ResultScreen />} />
              <Route path="/diary" element={<DiaryScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Routes>
            <Route path="/scan" element={null} />
            <Route path="/result" element={null} />
            <Route path="*" element={<BottomNav />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  )
}
