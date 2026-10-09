// Tiny, soft sound effects made with the Web Audio API (no audio files).
// There is deliberately no "wrong answer" sound — Bobo's voice handles that gently.
import { isMuted } from './audio.js'

let ctx = null

function audioContext() {
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  if (!ctx) ctx = new AC()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(c, freq, start, duration, volume = 0.12, type = 'sine') {
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(volume, start + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration)
  osc.connect(gain).connect(c.destination)
  osc.start(start)
  osc.stop(start + duration + 0.05)
}

function play(notes) {
  if (isMuted()) return
  const c = audioContext()
  if (!c) return
  const t = c.currentTime
  notes.forEach(([freq, offset, duration, volume, type]) => tone(c, freq, t + offset, duration, volume, type))
}

/** Correct answer: a short rising chime. */
export const chime = () => play([[660, 0, 0.18], [880, 0.1, 0.2], [1320, 0.2, 0.35, 0.09]])

/** Picking something up / selecting. */
export const pop = () => play([[520, 0, 0.12, 0.1, 'triangle']])

/** End of a game. */
export const fanfare = () =>
  play([[523, 0, 0.2], [659, 0.15, 0.2], [784, 0.3, 0.2], [1047, 0.45, 0.5, 0.1]])
