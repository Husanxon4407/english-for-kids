// Big letter tiles for the alphabet song.
import { OUTLINE } from './common.js'

const INKS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ec4899']

function Letter({ letter, ink }) {
  return (
    <text
      x="100"
      y="150"
      textAnchor="middle"
      fontSize="150"
      fontWeight="800"
      fill={ink}
      stroke={OUTLINE}
      strokeWidth="5"
      strokeLinejoin="round"
      paintOrder="stroke"
    >
      {letter.toUpperCase()}
    </text>
  )
}

export const letterArt = Object.fromEntries(
  'abcdefghijklmnopqrstuvwxyz'.split('').map((letter, i) => [`letter-${letter}`, () => <Letter letter={letter} ink={INKS[i % INKS.length]} />]),
)
