// A tiny signal for "the child just got something right": whatever shows the
// reward calls celebrate(), and Bobo (wherever he is on the screen) dances.
import { useEffect, useState } from 'react'

const listeners = new Set()

export function celebrate() {
  listeners.forEach((listener) => listener())
}

/** Counts celebrations; changes each time one happens (0 = none yet). */
export function useCelebration() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const listener = () => setCount((n) => n + 1)
    listeners.add(listener)
    return () => listeners.delete(listener)
  }, [])
  return count
}
