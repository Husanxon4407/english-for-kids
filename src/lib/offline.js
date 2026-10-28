// Saving WordLand on the device. On the first visit every file the app needs
// (the app, Bobo's and the Uzbek voices, the stories, the background music) is
// downloaded quietly in the background and kept; from then on the service
// worker (public/sw.js) plays it all from the device — at once, and without
// internet. Songs are big, so they are saved when first played, or all at once
// last, after everything else (or at once from the Grown-ups corner). A new
// version only downloads what changed.
import { useSyncExternalStore } from 'react'
import { voiceFetching } from './audio.js'

const CACHE = 'wordland-files'
const LIST = 'offline-files.json'
const PARALLEL = 2
const START_AFTER = 4000 // let the first screen and Bobo's first lines load first

let status = { state: 'idle', saved: 0, total: 0, songsSaved: 0, songsTotal: 0, songsBytes: 0 }
const listeners = new Set()
function set(change) {
  status = { ...status, ...change }
  listeners.forEach((listener) => listener())
}

/** { state: 'idle' | 'saving' | 'ready' | 'unsupported', saved, total (bytes), songs... } */
export function useOffline() {
  return useSyncExternalStore(
    (listener) => (listeners.add(listener), () => listeners.delete(listener)),
    () => status,
  )
}

const supported = typeof window !== 'undefined' && 'serviceWorker' in navigator && 'caches' in window
const base = () => new URL('./', document.baseURI).href
// index.html is kept under the app's own address, which is what a visit asks for.
const urlOf = (path) => (path === 'index.html' ? base() : new URL(path, base()).href)
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let list = null
async function loadList(cache) {
  try {
    const response = await fetch(urlOf(LIST), { cache: 'no-store' })
    if (!response.ok) throw new Error(response.statusText)
    await cache.put(urlOf(LIST), response.clone())
    return response.json()
  } catch {
    const saved = await cache.match(urlOf(LIST)) // offline: the list saved last time
    return saved ? saved.json() : null
  }
}

// Download the files that are not saved yet, a couple at a time. It pauses
// while Bobo is fetching what he is about to say, so he is never kept waiting.
async function save(cache, entries, onSaved) {
  const saved = new Set((await cache.keys()).map((request) => request.url))
  const todo = entries.filter((entry) => !saved.has(urlOf(entry.path)))
  entries.filter((entry) => saved.has(urlOf(entry.path))).forEach((entry) => onSaved(entry))
  async function worker() {
    while (todo.length) {
      while (voiceFetching()) await wait(400)
      const entry = todo.shift()
      try {
        const response = await fetch(urlOf(entry.path), { cache: 'no-cache' })
        if (response.ok) {
          await cache.put(urlOf(entry.path), response)
          onSaved(entry)
        }
      } catch {
        // offline or a hiccup: it is tried again on the next visit
      }
    }
  }
  await Promise.all(Array.from({ length: PARALLEL }, worker))
}

async function saveEverything() {
  const cache = await caches.open(CACHE)
  list = await loadList(cache)
  if (!list) return set({ state: 'idle' })
  const total = list.files.reduce((sum, f) => sum + f.size, 0)
  const songsBytes = list.songs.reduce((sum, f) => sum + f.size, 0)
  set({ state: 'saving', saved: 0, total, songsTotal: list.songs.length, songsBytes })
  let bytes = 0
  await save(cache, list.files, (entry) => set({ saved: (bytes += entry.size) }))

  // Forget files an older version needed (songs stay until they change).
  const keep = new Set([...list.files, ...list.songs].map((entry) => urlOf(entry.path)).concat(urlOf(LIST)))
  for (const request of await cache.keys()) if (!keep.has(request.url)) await cache.delete(request)

  const have = new Set((await cache.keys()).map((request) => request.url))
  set({ state: bytes >= total ? 'ready' : 'idle', songsSaved: list.songs.filter((entry) => have.has(urlOf(entry.path))).length })
  // Last of all, quietly, the songs.
  if (bytes >= total) await saveSongs()
}

/** Save all the songs too (about 25 MB), for playing them without internet. */
let songsSaving = null
export function saveSongs() {
  if (!supported || !list) return Promise.resolve()
  songsSaving ||= caches.open(CACHE).then((cache) => {
    let count = 0
    return save(cache, list.songs, () => set({ songsSaved: ++count }))
  })
  return songsSaving.finally(() => (songsSaving = null))
}

/** Start the service worker and the quiet background download. */
export function startOffline() {
  if (!supported || !import.meta.env.PROD) return set({ state: 'unsupported' })
  navigator.serviceWorker.register(urlOf('sw.js')).catch(() => {})
  navigator.storage?.persist?.().catch(() => {}) // ask the browser not to clear it when space is short
  setTimeout(() => saveEverything().catch(() => set({ state: 'idle' })), START_AFTER)
}
