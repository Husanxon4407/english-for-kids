// Original toy illustrations for Toy Town.
import { OUTLINE, stroke } from './common.js'

function Ball() {
  return (
    <g>
      <ellipse cx="100" cy="182" rx="50" ry="7" fill="#000" opacity="0.1" />
      <circle cx="100" cy="102" r="68" fill="#facc15" />
      <path d="M100 34 A68 68 0 0 0 100 170 C70 140 70 64 100 34 Z" fill="#ef4444" />
      <path d="M100 34 A68 68 0 0 1 100 170 C130 140 130 64 100 34 Z" fill="#3b82f6" />
      <circle cx="100" cy="102" r="68" fill="none" {...stroke} />
      <path d="M100 34 C70 64 70 140 100 170 M100 34 C130 64 130 140 100 170" fill="none" {...stroke} strokeWidth="3" />
      <ellipse cx="66" cy="70" rx="10" ry="18" transform="rotate(35 66 70)" fill="#fff" opacity="0.5" />
    </g>
  )
}

function Car() {
  return (
    <g>
      <path
        d="M24 134 L24 108 Q26 96 40 94 L62 92 L84 64 Q90 58 100 58 L138 58 Q150 58 156 66 L172 92 Q184 96 184 112 L184 134 Z"
        fill="#ef4444"
        {...stroke}
      />
      <path d="M92 68 L118 68 L118 92 L72 92 Z" fill="#bae6fd" {...stroke} strokeWidth="3" />
      <path d="M126 68 L146 68 Q150 68 152 72 L162 92 L126 92 Z" fill="#bae6fd" {...stroke} strokeWidth="3" />
      <path d="M120 96 L120 128" {...stroke} strokeWidth="3" />
      <circle cx="176" cy="110" r="6" fill="#fde047" {...stroke} strokeWidth="2.5" />
      {[62, 148].map((x) => (
        <g key={x}>
          <circle cx={x} cy="136" r="20" fill="#334155" {...stroke} />
          <circle cx={x} cy="136" r="8" fill="#cbd5e1" />
        </g>
      ))}
    </g>
  )
}

function Doll() {
  return (
    <g>
      <circle cx="58" cy="80" r="16" fill="#92400e" {...stroke} strokeWidth="3" />
      <circle cx="142" cy="80" r="16" fill="#92400e" {...stroke} strokeWidth="3" />
      <path d="M62 132 L84 118 M138 132 L116 118" stroke="#fde2c8" strokeWidth="10" strokeLinecap="round" />
      <path d="M100 104 L58 174 Q100 186 142 174 Z" fill="#f472b6" {...stroke} />
      <path d="M70 160 Q100 170 130 160" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="2 8" strokeLinecap="round" />
      <rect x="82" y="174" width="14" height="16" rx="5" fill="#7c3aed" {...stroke} strokeWidth="3" />
      <rect x="104" y="174" width="14" height="16" rx="5" fill="#7c3aed" {...stroke} strokeWidth="3" />
      <circle cx="100" cy="74" r="34" fill="#92400e" {...stroke} />
      <circle cx="100" cy="80" r="27" fill="#fde2c8" />
      <path d="M72 72 Q84 50 100 56 Q116 50 128 72 Q116 62 100 64 Q84 62 72 72 Z" fill="#92400e" />
      <circle cx="90" cy="80" r="4.5" fill={OUTLINE} />
      <circle cx="110" cy="80" r="4.5" fill={OUTLINE} />
      <circle cx="83" cy="91" r="5" fill="#f472b6" opacity="0.4" />
      <circle cx="117" cy="91" r="5" fill="#f472b6" opacity="0.4" />
      <path d="M93 93 Q100 99 107 93" fill="none" {...stroke} strokeWidth="3" />
      <path d="M126 44 L140 36 L141 52 Z M126 44 L116 32 L112 48 Z" fill="#f472b6" {...stroke} strokeWidth="2.5" />
    </g>
  )
}

function Teddy() {
  return (
    <g>
      <circle cx="64" cy="48" r="18" fill="#b7791f" {...stroke} />
      <circle cx="136" cy="48" r="18" fill="#b7791f" {...stroke} />
      <circle cx="64" cy="48" r="8" fill="#f6d7a7" />
      <circle cx="136" cy="48" r="8" fill="#f6d7a7" />
      <ellipse cx="54" cy="142" rx="14" ry="24" transform="rotate(30 54 142)" fill="#b7791f" {...stroke} />
      <ellipse cx="146" cy="142" rx="14" ry="24" transform="rotate(-30 146 142)" fill="#b7791f" {...stroke} />
      <ellipse cx="100" cy="148" rx="44" ry="38" fill="#b7791f" {...stroke} />
      <ellipse cx="100" cy="154" rx="26" ry="24" fill="#f6d7a7" />
      <ellipse cx="72" cy="184" rx="18" ry="12" fill="#b7791f" {...stroke} />
      <ellipse cx="128" cy="184" rx="18" ry="12" fill="#b7791f" {...stroke} />
      <ellipse cx="72" cy="185" rx="9" ry="6" fill="#f6d7a7" />
      <ellipse cx="128" cy="185" rx="9" ry="6" fill="#f6d7a7" />
      <circle cx="100" cy="80" r="40" fill="#b7791f" {...stroke} />
      <ellipse cx="100" cy="94" rx="18" ry="14" fill="#f6d7a7" />
      <ellipse cx="100" cy="88" rx="7" ry="5" fill={OUTLINE} />
      <path d="M100 93 L100 99 M100 99 Q94 104 89 100 M100 99 Q106 104 111 100" fill="none" {...stroke} strokeWidth="2.5" />
      <circle cx="85" cy="74" r="5" fill={OUTLINE} />
      <circle cx="115" cy="74" r="5" fill={OUTLINE} />
      <path d="M100 120 L82 110 L82 130 Z M100 120 L118 110 L118 130 Z" fill="#ef4444" {...stroke} strokeWidth="3" />
      <circle cx="100" cy="120" r="5" fill="#ef4444" {...stroke} strokeWidth="2.5" />
    </g>
  )
}

function Cube({ x, y, s, front, top, side, children }) {
  const d = s * 0.25
  return (
    <g>
      <polygon points={`${x},${y} ${x + d},${y - d} ${x + s + d},${y - d} ${x + s},${y}`} fill={top} {...stroke} strokeWidth="3" />
      <polygon points={`${x + s},${y} ${x + s + d},${y - d} ${x + s + d},${y + s - d} ${x + s},${y + s}`} fill={side} {...stroke} strokeWidth="3" />
      <rect x={x} y={y} width={s} height={s} fill={front} {...stroke} strokeWidth="3" />
      {children}
    </g>
  )
}

function Blocks() {
  return (
    <g>
      <Cube x={28} y={116} s={60} front="#ef4444" top="#f87171" side="#b91c1c">
        <circle cx="58" cy="146" r="14" fill="#fff" opacity="0.85" />
      </Cube>
      <Cube x={96} y={116} s={60} front="#3b82f6" top="#60a5fa" side="#1d4ed8">
        <rect x="113" y="133" width="26" height="26" rx="3" fill="#fff" opacity="0.85" />
      </Cube>
      <Cube x={62} y={50} s={60} front="#facc15" top="#fde047" side="#ca8a04">
        <polygon points="92,62 106,98 78,98" fill="#fff" opacity="0.85" />
      </Cube>
    </g>
  )
}

function Train() {
  return (
    <g>
      <circle cx="54" cy="38" r="10" fill="#e2e8f0" />
      <circle cx="40" cy="24" r="13" fill="#e2e8f0" />
      <circle cx="68" cy="22" r="8" fill="#e2e8f0" />
      <rect x="50" y="52" width="20" height="40" rx="3" fill="#334155" {...stroke} />
      <rect x="44" y="48" width="32" height="10" rx="3" fill="#334155" {...stroke} strokeWidth="3" />
      <rect x="30" y="88" width="90" height="50" rx="8" fill="#ef4444" {...stroke} />
      <rect x="116" y="58" width="58" height="80" rx="6" fill="#3b82f6" {...stroke} />
      <rect x="108" y="48" width="74" height="14" rx="5" fill="#1e3a8a" {...stroke} strokeWidth="3" />
      <rect x="128" y="72" width="34" height="28" rx="4" fill="#bae6fd" {...stroke} strokeWidth="3" />
      <path d="M30 120 L14 140 L30 140 Z" fill="#facc15" {...stroke} strokeWidth="3" />
      <rect x="24" y="136" width="158" height="10" rx="4" fill="#475569" {...stroke} strokeWidth="3" />
      {[56, 100, 152].map((x) => (
        <g key={x}>
          <circle cx={x} cy="154" r={x === 152 ? 22 : 18} fill="#334155" {...stroke} />
          <circle cx={x} cy="154" r="7" fill="#facc15" />
        </g>
      ))}
    </g>
  )
}

export const toyArt = { ball: Ball, car: Car, doll: Doll, teddy: Teddy, blocks: Blocks, train: Train }
