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

/** Correct answer: a bright, bouncy run of notes up to a sparkle. */
export const chime = () =>
  play([[659, 0, 0.14, 0.11, 'triangle'], [784, 0.09, 0.14, 0.11, 'triangle'], [988, 0.18, 0.16, 0.11, 'triangle'], [1319, 0.28, 0.4, 0.09], [1976, 0.3, 0.3, 0.04]])

/** Picking something up / selecting. */
export const pop = () => play([[620, 0, 0.07, 0.1, 'triangle'], [880, 0.05, 0.1, 0.07, 'triangle']])

/** Turning a card over. */
export const flip = () => play([[392, 0, 0.09, 0.08, 'triangle'], [587, 0.05, 0.1, 0.07, 'triangle']])

/** End of a game. */
export const fanfare = () =>
  play([[523, 0, 0.2], [659, 0.15, 0.2], [784, 0.3, 0.2], [1047, 0.45, 0.5, 0.1]])

// Story sounds.
/** Eating: three soft crunches. */
export const munch = () => play([[180, 0, 0.09, 0.14, 'square'], [150, 0.22, 0.09, 0.14, 'square'], [170, 0.44, 0.09, 0.14, 'square']])

/** A jump or a bounce: two quick rising notes. */
export const boing = () => play([[300, 0, 0.12, 0.1, 'triangle'], [600, 0.09, 0.2, 0.09, 'triangle']])

/** Knock, knock. */
export const knock = () => play([[140, 0, 0.1, 0.2, 'triangle'], [140, 0.25, 0.1, 0.2, 'triangle']])
