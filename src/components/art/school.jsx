// Drawings for School Bag.
import { OUTLINE, stroke } from './common.js'

const thin = { ...stroke, strokeWidth: 3 }
const Shadow = ({ y = 184, rx = 60 }) => <ellipse cx="100" cy={y} rx={rx} ry="7" fill="#000" opacity="0.1" />

function Bag() {
  return (
    <g>
      <Shadow />
      <path d="M70 46 Q70 18 100 18 Q130 18 130 46" fill="none" stroke={OUTLINE} strokeWidth="11" strokeLinecap="round" />
      <path d="M70 46 Q70 18 100 18 Q130 18 130 46" fill="none" stroke="#1d4ed8" strokeWidth="6" strokeLinecap="round" />
      <rect x="40" y="42" width="120" height="140" rx="30" fill="#3b82f6" {...stroke} />
      <path d="M40 92 Q100 112 160 92" fill="#2563eb" {...thin} />
      <rect x="62" y="118" width="76" height="50" rx="14" fill="#60a5fa" {...thin} />
      <path d="M62 136 L138 136" {...thin} />
      <circle cx="100" cy="100" r="7" fill="#fde047" {...thin} />
    </g>
  )
}

function Book() {
  return (
    <g>
      <Shadow />
      <path d="M30 44 L100 58 L170 44 L170 164 L100 178 L30 164 Z" fill="#fff" {...stroke} />
      <path d="M100 58 L100 178" {...thin} />
      <path d="M24 52 L24 172 L100 186 L176 172 L176 52" fill="none" stroke="#ef4444" strokeWidth="9" strokeLinejoin="round" />
      <path d="M44 74 L86 82 M44 94 L86 102 M44 114 L80 121 M114 82 L156 74 M114 102 L156 94 M114 121 L150 114" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

function Pencil() {
  return (
    <g transform="rotate(-40 100 100)">
      <rect x="30" y="84" width="118" height="32" fill="#facc15" {...stroke} />
      <path d="M30 95 L148 95 M30 105 L148 105" stroke="#eab308" strokeWidth="3" />
      <path d="M148 84 L182 100 L148 116 Z" fill="#fde68a" {...stroke} />
      <path d="M170 94 L182 100 L170 106 Z" fill={OUTLINE} />
      <rect x="14" y="84" width="18" height="32" rx="4" fill="#f9a8d4" {...stroke} />
      <rect x="28" y="84" width="8" height="32" fill="#cbd5e1" {...thin} />
    </g>
  )
}

function Pen() {
  return (
    <g transform="rotate(-40 100 100)">
      <rect x="22" y="86" width="132" height="28" rx="12" fill="#6366f1" {...stroke} />
      <rect x="40" y="76" width="50" height="10" rx="4" fill="#cbd5e1" {...thin} />
      <path d="M154 90 L184 100 L154 110 Z" fill="#cbd5e1" {...stroke} />
      <circle cx="184" cy="100" r="3" fill="#1e3a8a" />
      <rect x="22" y="86" width="20" height="28" rx="10" fill="#4338ca" {...thin} />
    </g>
  )
}

function Crayon() {
  return (
    <g transform="rotate(-40 100 100)">
      <rect x="26" y="82" width="124" height="36" rx="6" fill="#f97316" {...stroke} />
      <rect x="62" y="82" width="56" height="36" fill="#fff7ed" {...thin} />
      <path d="M70 100 Q80 90 90 100 T110 100" fill="none" stroke="#f97316" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M150 86 L180 100 L150 114 Z" fill="#f97316" {...stroke} />
    </g>
  )
}

function Eraser() {
  return (
    <g>
      <Shadow rx={70} />
      <path d="M30 124 L70 80 L170 80 L130 124 Z" fill="#fbcfe8" {...stroke} />
      <path d="M30 124 L130 124 L130 160 L30 160 Z" fill="#f472b6" {...stroke} />
      <path d="M130 124 L170 80 L170 116 L130 160 Z" fill="#db2777" {...stroke} />
      <path d="M30 124 L80 124 L80 160 L30 160 Z" fill="#60a5fa" {...thin} />
      <path d="M150 168 Q160 172 166 166 M140 176 Q150 180 156 174" fill="none" stroke="#f9a8d4" strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

function Ruler() {
  return (
    <g transform="rotate(-20 100 100)">
      <rect x="10" y="74" width="180" height="52" rx="6" fill="#facc15" {...stroke} />
      {Array.from({ length: 17 }, (_, i) => (
        <path key={i} d={`M${20 + i * 10} 74 L${20 + i * 10} ${i % 2 ? 86 : 96}`} stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
      ))}
    </g>
  )
}

function Scissors() {
  return (
    <g>
      <path d="M100 104 L34 30" stroke={OUTLINE} strokeWidth="18" strokeLinecap="round" />
      <path d="M100 104 L34 30" stroke="#cbd5e1" strokeWidth="11" strokeLinecap="round" />
      <path d="M100 104 L166 30" stroke={OUTLINE} strokeWidth="18" strokeLinecap="round" />
      <path d="M100 104 L166 30" stroke="#e2e8f0" strokeWidth="11" strokeLinecap="round" />
      <circle cx="100" cy="104" r="7" fill="#64748b" {...thin} />
      <path d="M100 104 L74 128 M100 104 L126 128" stroke={OUTLINE} strokeWidth="12" strokeLinecap="round" />
      <circle cx="64" cy="150" r="26" fill="none" stroke={OUTLINE} strokeWidth="18" />
      <circle cx="64" cy="150" r="26" fill="none" stroke="#ef4444" strokeWidth="11" />
      <circle cx="136" cy="150" r="26" fill="none" stroke={OUTLINE} strokeWidth="18" />
      <circle cx="136" cy="150" r="26" fill="none" stroke="#ef4444" strokeWidth="11" />
    </g>
  )
}

function Glue() {
  return (
    <g>
      <Shadow rx={46} />
      <path d="M92 16 L108 16 L112 50 L88 50 Z" fill="#f97316" {...stroke} />
      <rect x="76" y="48" width="48" height="20" rx="5" fill="#f97316" {...stroke} />
      <path d="M56 80 Q56 66 70 66 L130 66 Q144 66 144 80 L144 176 Q144 186 134 186 L66 186 Q56 186 56 176 Z" fill="#fff" {...stroke} />
      <rect x="66" y="100" width="68" height="52" rx="10" fill="#a78bfa" {...thin} />
      <path d="M84 126 Q100 108 116 126 Q100 142 84 126 Z" fill="#fff" />
      <path d="M100 16 Q96 4 104 2" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
    </g>
  )
}

function Paint() {
  const blobs = [
    [64, 80, '#ef4444'],
    [100, 62, '#facc15'],
    [138, 80, '#3b82f6'],
    [58, 120, '#22c55e'],
  ]
  return (
    <g>
      <Shadow rx={74} />
      <path d="M100 30 C40 30 14 70 18 112 C22 152 60 176 100 172 C120 170 120 150 136 148 C160 146 186 140 186 104 C186 60 150 30 100 30 Z" fill="#d6a461" {...stroke} />
      <ellipse cx="132" cy="124" rx="14" ry="11" fill="#fef3c7" {...thin} />
      {blobs.map(([x, y, c]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="16" fill={c} {...thin} />
      ))}
      <path d="M96 150 L176 46" stroke="#92400e" strokeWidth="9" strokeLinecap="round" />
      <path d="M96 150 Q84 168 70 170 Q76 154 90 142 Z" fill="#a855f7" {...thin} />
    </g>
  )
}

export const schoolArt = {
  bag: Bag,
  book: Book,
  pencil: Pencil,
  pen: Pen,
  crayon: Crayon,
  eraser: Eraser,
  ruler: Ruler,
  scissors: Scissors,
  glue: Glue,
  paint: Paint,
}
