import { useEffect } from 'react'
import { StarIcon } from './Icons.jsx'
import { celebrate } from '../lib/celebrate.js'

const CONFETTI = ['#f87171', '#fbbf24', '#4ade80', '#60a5fa', '#c084fc', '#f472b6', '#fb923c', '#2dd4bf']

/**
 * The reward for a right answer: a star floats up out of a burst of
 * confetti, and Bobo dances. Place inside a `relative` box.
 */
export default function StarPop() {
  useEffect(() => {
    celebrate()
  }, [])

  return (
    <>
      {CONFETTI.map((color, i) => {
        const angle = (Math.PI * 2 * i) / CONFETTI.length + 0.4
        return (
          <span
            key={color}
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-3 w-2 rounded-sm"
            style={{
              backgroundColor: color,
              '--dx': `${Math.cos(angle) * 90}px`,
              '--dy': `${Math.sin(angle) * 90}px`,
              animation: 'wl-burst 0.8s ease-out forwards',
            }}
          />
        )
      })}
      <span className="animate-star-pop pointer-events-none absolute left-1/2 top-0 z-10">
        <StarIcon className="h-14 w-14 drop-shadow-md" />
      </span>
    </>
  )
}
