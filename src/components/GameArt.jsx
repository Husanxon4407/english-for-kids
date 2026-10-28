// Characters and props for the Feed Bobo, Peekaboo and Parrot games (and the
// little moving pictures on their activity cards).
import { OUTLINE, stroke } from './art/common.js'

const thin = { ...stroke, strokeWidth: 3 }

/**
 * The parrot from the Parrot game. `mood`: 'idle', 'listen' (head tilted, ear
 * out), 'talk' (beak open), 'happy' (wings up) or 'think' (a little shrug).
 */
export function Parrot({ mood = 'idle', className = '', style }) {
  const wingsUp = mood === 'happy'
  const beakOpen = mood === 'talk' || mood === 'happy'
  const tilt = mood === 'listen' ? -12 : mood === 'think' ? 8 : 0
  return (
    <svg viewBox="0 0 200 220" className={className} style={style} role="img" aria-label="parrot">
      <ellipse cx="100" cy="212" rx="50" ry="6" fill="#000" opacity="0.1" />
      <path d="M40 196 L160 196" stroke="#92400e" strokeWidth="12" strokeLinecap="round" />
      {/* tail */}
      <path d="M88 168 L74 210 L92 206 L100 172 M112 168 L126 210 L108 206 L100 172" fill="#2563eb" {...thin} />
      {/* wings */}
      <g transform={wingsUp ? 'rotate(70 62 110)' : undefined}>
        <path d="M66 96 C34 110 30 150 52 176 C64 160 74 132 76 108 Z" fill="#16a34a" {...stroke} />
      </g>
      <g transform={wingsUp ? 'rotate(-70 138 110)' : undefined}>
        <path d="M134 96 C166 110 170 150 148 176 C136 160 126 132 124 108 Z" fill="#16a34a" {...stroke} />
      </g>
      {/* body */}
      <path d="M100 74 C64 74 56 116 60 146 C64 176 82 190 100 190 C118 190 136 176 140 146 C144 116 136 74 100 74 Z" fill="#22c55e" {...stroke} />
      <path d="M100 112 C80 112 76 140 80 160 C84 178 94 184 100 184 C106 184 116 178 120 160 C124 140 120 112 100 112 Z" fill="#fde047" />
      <path d="M84 192 L80 200 M92 192 L92 200 M108 192 L108 200 M116 192 L120 200" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
      {/* head */}
      <g transform={`rotate(${tilt} 100 92)`}>
        <path d="M86 26 Q80 6 92 4 Q96 16 98 26 M100 24 Q102 2 114 6 Q110 18 106 28" fill="#ef4444" {...thin} />
        <circle cx="100" cy="62" r="40" fill="#ef4444" {...stroke} />
        <ellipse cx="82" cy="56" rx="14" ry="16" fill="#fff" {...thin} />
        <circle cx="84" cy="56" r="6.5" fill={OUTLINE} />
        <circle cx="86" cy="53" r="2.2" fill="#fff" />
        <ellipse cx="120" cy="56" rx="14" ry="16" fill="#fff" {...thin} />
        <circle cx="118" cy="56" r="6.5" fill={OUTLINE} />
        <circle cx="120" cy="53" r="2.2" fill="#fff" />
        <path d="M86 74 Q100 64 114 74 Q112 92 100 98 Q88 92 86 74 Z" fill="#facc15" {...stroke} />
        {beakOpen ? (
          <path d="M90 92 Q100 112 110 92 Q100 98 90 92 Z" fill="#f59e0b" {...thin} />
        ) : (
          <path d="M92 90 Q100 96 108 90" fill="none" {...thin} />
        )}
        <circle cx="68" cy="76" r="7" fill="#fb7185" opacity="0.5" />
        <circle cx="132" cy="76" r="7" fill="#fb7185" opacity="0.5" />
      </g>
    </svg>
  )
}

const DOOR_COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7', '#ec4899']

/** A little door, painted in one of a few bright colours. */
export function Door({ index = 0, className = '' }) {
  const color = DOOR_COLORS[index % DOOR_COLORS.length]
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="96" height="96" rx="10" fill={color} stroke={OUTLINE} strokeWidth="4" />
      <rect x="14" y="12" width="72" height="32" rx="6" fill="#fff" opacity="0.25" />
      <rect x="14" y="54" width="72" height="34" rx="6" fill="#fff" opacity="0.25" />
      <circle cx="80" cy="50" r="6" fill="#fde047" stroke={OUTLINE} strokeWidth="3" />
    </svg>
  )
}
