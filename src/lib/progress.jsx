import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { MEDAL_RANK } from './settings.js'

// Progress lives in this browser's localStorage. That is fine for a
// single-device prototype, but it is not a secure or synced account system.
const STORAGE_KEY = 'wordland.v2'
const OLD_KEY = 'wordland.progress.v1' // single-child format from earlier versions

// Families whose device is set to Uzbek get the Uzbek helper from the start.
function defaultHelper() {
  return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('uz') ? 'uz' : 'off'
}

// One child's progress.
const EMPTY = {
  stars: 0,
  // Per word: { seen, correct, wrong, recent, lastSeen } — tracked by
  // vocabulary item, not just by game. `recent` holds the last few
  // recognition results (true = right on the first try).
  words: {},
  // How many times each activity was completed, e.g. { 'animals:listen': 2 }.
  activities: {},
  // Best Star-challenge medal per world, e.g. { animals: 'silver' }.
  medals: {},
  // `helper` is the spoken language help: 'off' or 'uz' (Uzbek). `music` is the
  // soft background music; `sound` switches everything off.
  // `speechOnline` lets the Parrot game check speaking with the browser's online
  // service when the device cannot do it by itself.
  settings: { difficulty: 'explorer', sound: true, music: true, voiceSpeed: 'normal', helper: defaultHelper(), speechOnline: true },
}

// Profile pictures children recognize instantly — no names needed.
export const AVATARS = ['lion', 'cat', 'duck', 'dog', 'bird', 'cow', 'teddy', 'apple']

const RECENT_LIMIT = 5
const NEW_WORD = { seen: 0, correct: 0, wrong: 0, recent: [], lastSeen: null }

const newId = () => Math.random().toString(36).slice(2, 10)

function withDefaults(data = {}) {
  return { ...EMPTY, ...data, settings: { ...EMPTY.settings, ...data.settings } }
}

function freshStore(firstChildData) {
  const id = newId()
  return {
    profiles: [{ id, label: 'Child 1', avatar: 'lion' }],
    activeId: id,
    data: { [id]: withDefaults(firstChildData) },
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const store = JSON.parse(raw)
      if (store.profiles?.length && store.data) return store
    }
    // Move progress from the earlier single-child version into the first profile.
    const old = localStorage.getItem(OLD_KEY)
    return freshStore(old ? JSON.parse(old) : undefined)
  } catch {
    return freshStore()
  }
}

function save(store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // Storage can be blocked (private mode etc.) — the app still works, it just won't remember.
  }
}

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [store, setStore] = useState(load)

  useEffect(() => save(store), [store])

  // Change the active child's progress.
  const update = useCallback((change) => {
    setStore((s) => ({ ...s, data: { ...s.data, [s.activeId]: change(withDefaults(s.data[s.activeId])) } }))
  }, [])

  const updateWord = useCallback(
    (id, change) =>
      update((p) => {
        const word = { ...NEW_WORD, ...p.words[id] }
        return { ...p, words: { ...p.words, [id]: { ...change(word), lastSeen: Date.now() } } }
      }),
    [update],
  )

  // Actions never change identity, so they are safe to use inside effects.
  const actions = useMemo(
    () => ({
      addStars: (n = 1) => update((p) => ({ ...p, stars: p.stars + n })),
      markSeen: (id) => updateWord(id, (w) => ({ ...w, seen: w.seen + 1 })),
      // One result per question: was the word recognized on the first try?
      recordAnswer: (id, firstTry) =>
        updateWord(id, (w) => ({
          ...w,
          correct: w.correct + (firstTry ? 1 : 0),
          wrong: w.wrong + (firstTry ? 0 : 1),
          recent: [...w.recent, firstTry].slice(-RECENT_LIMIT),
        })),
      recordActivity: (id) =>
        update((p) => ({ ...p, activities: { ...p.activities, [id]: (p.activities[id] || 0) + 1 } })),
      // Keeps the best medal: a later, weaker result never takes one away.
      recordMedal: (worldId, medal) =>
        update((p) =>
          MEDAL_RANK[medal] > (MEDAL_RANK[p.medals[worldId]] || 0) ? { ...p, medals: { ...p.medals, [worldId]: medal } } : p,
        ),
      setSetting: (key, value) => update((p) => ({ ...p, settings: { ...p.settings, [key]: value } })),
      // Clears this child's stars and word progress but keeps their settings.
      resetProgress: () => update((p) => ({ ...EMPTY, settings: p.settings })),

      // --- profiles (managed by a grown-up) ---
      switchProfile: (id) => setStore((s) => (s.data[id] ? { ...s, activeId: id } : s)),
      addProfile: () =>
        setStore((s) => {
          const id = newId()
          const used = new Set(s.profiles.map((p) => p.avatar))
          const avatar = AVATARS.find((a) => !used.has(a)) || AVATARS[0]
          const profile = { id, label: `Child ${s.profiles.length + 1}`, avatar }
          return { ...s, profiles: [...s.profiles, profile], data: { ...s.data, [id]: withDefaults() } }
        }),
      updateProfile: (id, changes) =>
        setStore((s) => ({ ...s, profiles: s.profiles.map((p) => (p.id === id ? { ...p, ...changes } : p)) })),
      removeProfile: (id) =>
        setStore((s) => {
          if (s.profiles.length <= 1) return s
          const profiles = s.profiles.filter((p) => p.id !== id)
          const data = { ...s.data }
          delete data[id]
          return { profiles, data, activeId: s.activeId === id ? profiles[0].id : s.activeId }
        }),
    }),
    [update, updateWord],
  )

  const api = useMemo(
    () => ({
      // The active child's progress — the games only ever see this.
      progress: withDefaults(store.data[store.activeId]),
      profiles: store.profiles,
      activeProfile: store.profiles.find((p) => p.id === store.activeId),
      ...actions,
    }),
    [store, actions],
  )

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  return useContext(ProgressContext)
}
