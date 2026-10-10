// Original furniture illustrations for My Little Home.
import { OUTLINE, stroke } from './common.js'

const WOOD = '#c98a3c'
const WOOD_DARK = '#a16207'

function Bed() {
  return (
    <g>
      <ellipse cx="100" cy="180" rx="84" ry="7" fill="#000" opacity="0.1" />
      <rect x="18" y="58" width="20" height="120" rx="8" fill={WOOD} {...stroke} />
      <rect x="164" y="100" width="18" height="78" rx="8" fill={WOOD} {...stroke} />
      <rect x="30" y="118" width="142" height="38" rx="8" fill="#fff" {...stroke} />
      <rect x="40" y="94" width="50" height="30" rx="13" fill="#bae6fd" {...stroke} />
      <path d="M82 118 Q128 104 172 116 L172 148 Q172 156 164 156 L82 156 Z" fill="#f472b6" {...stroke} />
      <path d="M82 118 Q128 104 172 116 L172 128 Q128 116 82 130 Z" fill="#fbcfe8" {...stroke} strokeWidth="3" />
      {[104, 130, 156].map((x, i) => (
        <circle key={x} cx={x} cy={i % 2 ? 146 : 140} r="5" fill="#fff" opacity="0.8" />
      ))}
    </g>
  )
}

function Chair() {
  return (
    <g>
      <ellipse cx="100" cy="184" rx="56" ry="6" fill="#000" opacity="0.1" />
      <rect x="58" y="120" width="14" height="62" rx="5" fill={WOOD_DARK} {...stroke} />
      <rect x="128" y="120" width="14" height="62" rx="5" fill={WOOD_DARK} {...stroke} />
      <path d="M56 112 L56 36 Q56 22 70 22 L130 22 Q144 22 144 36 L144 112 Z" fill={WOOD} {...stroke} />
      <rect x="72" y="38" width="16" height="58" rx="7" fill="#fef3c7" {...stroke} strokeWidth="3" />
      <rect x="112" y="38" width="16" height="58" rx="7" fill="#fef3c7" {...stroke} strokeWidth="3" />
      <rect x="44" y="104" width="112" height="24" rx="10" fill="#ef4444" {...stroke} />
      <path d="M56 112 Q100 106 144 112" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
    </g>
  )
}

function Table() {
  return (
    <g>
      <ellipse cx="100" cy="184" rx="76" ry="6" fill="#000" opacity="0.1" />
      <rect x="36" y="104" width="16" height="78" rx="6" fill={WOOD_DARK} {...stroke} />
      <rect x="148" y="104" width="16" height="78" rx="6" fill={WOOD_DARK} {...stroke} />
      <rect x="14" y="88" width="172" height="24" rx="10" fill={WOOD} {...stroke} />
      <path d="M26 96 L150 96" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.45" />
      {/* A little flower in a vase, so the table is clearly a table. */}
      <path d="M100 62 L100 40" {...stroke} stroke="#16a34a" strokeWidth="5" />
      {[0, 72, 144, 216, 288].map((a) => (
        <circle key={a} cx="100" cy="24" r="8" fill="#f472b6" transform={`rotate(${a} 100 34)`} />
      ))}
      <circle cx="100" cy="34" r="7" fill="#facc15" {...stroke} strokeWidth="2.5" />
      <path d="M86 88 L90 60 L110 60 L114 88 Z" fill="#38bdf8" {...stroke} />
    </g>
  )
}

function Door() {
  return (
    <g>
      <rect x="40" y="14" width="120" height="172" rx="10" fill="#fde68a" {...stroke} />
      <rect x="52" y="26" width="96" height="160" rx="6" fill="#ef4444" {...stroke} />
      <path d="M68 76 L68 58 Q68 40 100 40 Q132 40 132 58 L132 76 Z" fill="#bae6fd" {...stroke} strokeWidth="3" />
      <path d="M100 40 L100 76" {...stroke} strokeWidth="3" />
      <rect x="66" y="90" width="68" height="34" rx="5" fill="#dc2626" {...stroke} strokeWidth="3" />
      <rect x="66" y="134" width="68" height="38" rx="5" fill="#dc2626" {...stroke} strokeWidth="3" />
      <circle cx="136" cy="112" r="8" fill="#facc15" {...stroke} strokeWidth="3" />
    </g>
  )
}

function Window() {
  return (
    <g>
      <rect x="30" y="24" width="140" height="136" rx="10" fill={WOOD} {...stroke} />
      <rect x="44" y="38" width="112" height="108" rx="4" fill="#7dd3fc" {...stroke} strokeWidth="3" />
      <circle cx="132" cy="62" r="13" fill="#fde047" />
      <path d="M52 132 Q60 112 78 118 Q84 102 104 110 Q118 106 122 124 Q134 124 134 136 L134 146 L52 146 Z" fill="#fff" opacity="0.9" />
      <path d="M100 38 L100 146 M44 92 L156 92" {...stroke} stroke={WOOD_DARK} strokeWidth="7" />
      <path d="M44 38 Q72 60 50 146 L44 146 Z" fill="#f472b6" {...stroke} strokeWidth="3" />
      <path d="M156 38 Q128 60 150 146 L156 146 Z" fill="#f472b6" {...stroke} strokeWidth="3" />
      <rect x="20" y="156" width="160" height="16" rx="7" fill={WOOD_DARK} {...stroke} />
    </g>
  )
}

function Lamp() {
  return (
    <g>
      <circle cx="100" cy="76" r="70" fill="#fde047" opacity="0.28" />
      <ellipse cx="100" cy="182" rx="46" ry="6" fill="#000" opacity="0.1" />
      <rect x="93" y="100" width="14" height="66" rx="5" fill="#94a3b8" {...stroke} />
      <path d="M62 180 Q62 160 100 160 Q138 160 138 180 Z" fill="#64748b" {...stroke} />
      <path d="M70 30 L130 30 L156 108 L44 108 Z" fill="#fbbf24" {...stroke} />
      <path d="M76 42 L64 96" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.55" />
      <path d="M118 108 L118 132" {...stroke} strokeWidth="3" />
      <circle cx="118" cy="136" r="5" fill={OUTLINE} />
    </g>
  )
}

export const homeArt = { bed: Bed, chair: Chair, table: Table, door: Door, window: Window, lamp: Lamp }
