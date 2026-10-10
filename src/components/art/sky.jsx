// Original illustrations for Sunny Sky.
import { OUTLINE, stroke } from './common.js'

const CLOUD =
  'M50 150 Q18 150 20 120 Q22 96 48 94 Q50 60 88 58 Q116 56 128 80 Q162 72 172 104 Q192 110 186 132 Q182 150 156 150 Z'

function Sun() {
  return (
    <g>
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d="M100 6 L112 34 L88 34 Z" fill="#fb923c" {...stroke} strokeWidth="3" transform={`rotate(${i * 36} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="56" fill="#fde047" {...stroke} />
      <circle cx="82" cy="92" r="6" fill={OUTLINE} />
      <circle cx="118" cy="92" r="6" fill={OUTLINE} />
      <circle cx="70" cy="108" r="8" fill="#fb923c" opacity="0.5" />
      <circle cx="130" cy="108" r="8" fill="#fb923c" opacity="0.5" />
      <path d="M84 108 Q100 126 116 108" fill="none" {...stroke} strokeWidth="3.5" />
    </g>
  )
}

function Moon() {
  return (
    <g>
      <path d="M124 22 A80 80 0 1 0 178 138 A62 62 0 1 1 124 22 Z" fill="#fde68a" {...stroke} />
      <path d="M62 96 Q70 104 78 96" fill="none" {...stroke} strokeWidth="3.5" />
      <path d="M72 124 Q82 134 94 128" fill="none" {...stroke} strokeWidth="3.5" />
      <circle cx="58" cy="116" r="7" fill="#fb923c" opacity="0.4" />
      {[
        [150, 60, 1],
        [172, 96, 0.7],
        [136, 104, 0.6],
      ].map(([x, y, s]) => (
        <path
          key={x}
          d="M0 -14 L4 -4 L14 0 L4 4 L0 14 L-4 4 L-14 0 L-4 -4 Z"
          fill="#fff"
          {...stroke}
          strokeWidth="2.5"
          transform={`translate(${x} ${y}) scale(${s})`}
        />
      ))}
    </g>
  )
}

function Cloud() {
  return (
    <g>
      <path d={CLOUD} fill="#fff" {...stroke} />
      <circle cx="84" cy="108" r="5.5" fill={OUTLINE} />
      <circle cx="120" cy="108" r="5.5" fill={OUTLINE} />
      <circle cx="70" cy="122" r="8" fill="#f9a8d4" opacity="0.55" />
      <circle cx="134" cy="122" r="8" fill="#f9a8d4" opacity="0.55" />
      <path d="M92 122 Q102 132 112 122" fill="none" {...stroke} strokeWidth="3.5" />
    </g>
  )
}

function Rain() {
  return (
    <g>
      {[
        [48, 128],
        [84, 146],
        [120, 128],
        [156, 146],
        [66, 170],
        [138, 170],
      ].map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d="M0 -16 Q11 0 11 8 A11 11 0 0 1 -11 8 Q-11 0 0 -16 Z"
          fill="#38bdf8"
          {...stroke}
          strokeWidth="3"
          transform={`translate(${x} ${y})`}
        />
      ))}
      <path d={CLOUD} fill="#94a3b8" {...stroke} transform="translate(0 -44)" />
      <path d="M52 62 Q56 40 80 38" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
    </g>
  )
}

function Snow() {
  const arm = 'M100 100 L100 22 M100 44 L82 28 M100 44 L118 28 M100 68 L86 56 M100 68 L114 56'
  const arms = [0, 60, 120, 180, 240, 300]
  return (
    <g>
      {arms.map((a) => (
        <path key={a} d={arm} fill="none" {...stroke} strokeWidth="15" transform={`rotate(${a} 100 100)`} />
      ))}
      {arms.map((a) => (
        <path key={a} d={arm} fill="none" stroke="#7dd3fc" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" transform={`rotate(${a} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="13" fill="#fff" {...stroke} />
    </g>
  )
}

function Rainbow() {
  const bands = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7']
  return (
    <g>
      <path d="M12 150 A88 88 0 0 1 188 150 L130 150 A30 30 0 0 0 70 150 Z" fill="none" {...stroke} strokeWidth="6" />
      {bands.map((hex, i) => {
        const r = 83 - i * 9.6
        return <path key={hex} d={`M${100 - r} 150 A${r} ${r} 0 0 1 ${100 + r} 150`} fill="none" stroke={hex} strokeWidth="10" />
      })}
      {[36, 164].map((x) => (
        <g key={x} transform={`translate(${x} 152)`}>
          <path d="M-30 18 Q-40 18 -38 6 Q-36 -6 -22 -4 Q-18 -20 0 -18 Q16 -20 22 -6 Q38 -8 38 8 Q38 18 26 18 Z" fill="#fff" {...stroke} />
        </g>
      ))}
    </g>
  )
}

export const skyArt = { sun: Sun, moon: Moon, cloud: Cloud, rain: Rain, snow: Snow, rainbow: Rainbow }
