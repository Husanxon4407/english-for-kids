import { useCallback, useEffect, useRef, useState } from 'react'
import { say, sayAll, stop } from './audio.js'

/**
 * Speak lines and know when speaking is happening (to animate Bobo's mouth,
 * pulse the replay button, etc). Stops speech when the screen unmounts.
 */
export function useSpeaker() {
  const [speaking, setSpeaking] = useState(false)
  const latest = useRef(0)

  const speak = useCallback(async (lines, options) => {
    const id = ++latest.current
    setSpeaking(true)
    try {
      if (Array.isArray(lines)) await sayAll(lines, options)
      else await say(lines, options)
    } finally {
      if (id === latest.current) setSpeaking(false)
    }
  }, [])

  useEffect(() => stop, [])

  return { speaking, speak }
}
