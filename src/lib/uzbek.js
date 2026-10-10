// The Uzbek helper: short recorded Uzbek lines that can be mixed into what
// Bobo says. Every function returns a list (empty when the helper is off or
// a line has no recording), so it can be spread into any list of lines.
import { useMemo } from 'react'
import manifest from '../data/voice-manifest-uz.json'
import { UZ_LINES, UZ_WORDS } from '../data/uzbek.js'
import { useProgress } from './progress.jsx'

/** False until the Uzbek lines have been recorded (`npm run voice:uz`). */
export const UZBEK_AVAILABLE = Object.keys(manifest.lines || {}).length > 0

function clip(text) {
  const file = manifest.lines?.[text]
  return file ? [{ text: '', src: import.meta.env.BASE_URL + file }] : []
}

export function useUzbek() {
  const { progress } = useProgress()
  const on = UZBEK_AVAILABLE && progress.settings.helper === 'uz'
  return useMemo(
    () => ({
      on,
      /** The meaning of a vocabulary item. */
      word: (item) => (on ? clip(UZ_WORDS[item.id]) : []),
      /** An explanation from UZ_LINES, by key. */
      line: (key) => (on ? clip(UZ_LINES[key]) : []),
      /** Any other recorded Uzbek sentence (story lines). */
      text: (uz) => (on ? clip(uz) : []),
    }),
    [on],
  )
}
