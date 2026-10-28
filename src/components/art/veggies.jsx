// Drawings for Veggie Patch. Like the fruit, kept face-free and true to shape
// so children can link them to the real vegetables at home.
import { stroke } from './common.js'

const thin = { ...stroke, strokeWidth: 3 }

function Shine({ cx, cy, rx = 8, ry = 15, rotate = -20 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${rotate} ${cx} ${cy})`} fill="#fff" opacity="0.5" />
}

function Carrot() {
  return (
    <g>
      <path d="M100 52 Q84 20 62 18 M100 52 Q100 16 112 8 M100 52 Q122 22 146 26" fill="none" stroke="#16a34a" strokeWidth="11" strokeLinecap="round" />
      <path d="M70 56 Q100 40 130 56 Q128 120 104 188 Q100 194 96 188 Q72 120 70 56 Z" fill="#f97316" {...stroke} />
      <path d="M82 80 L96 82 M104 104 L118 102 M86 124 L98 126 M104 150 L112 148" stroke="#c2410c" strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

function Tomato() {
  return (
    <g>
      <path d="M100 52 C50 46 24 82 32 120 C40 160 72 178 100 178 C128 178 160 160 168 120 C176 82 150 46 100 52 Z" fill="#ef4444" {...stroke} />
      <path d="M100 58 L82 42 L92 62 L66 58 L88 72 L100 66 L112 72 L134 58 L108 62 L118 42 Z" fill="#22c55e" {...thin} />
      <path d="M100 58 Q100 40 108 30" fill="none" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" />
      <Shine cx={64} cy={100} />
    </g>
  )
}

function Potato() {
  return (
    <g>
      <path d="M40 90 C40 52 92 38 132 50 C172 62 178 110 160 140 C140 172 84 178 56 158 C38 144 40 120 40 90 Z" fill="#d6a461" {...stroke} />
      {[[78, 82], [118, 74], [140, 118], [96, 124], [70, 140]].map(([x, y]) => (
        <ellipse key={`${x}${y}`} cx={x} cy={y} rx="5" ry="3.5" fill="#92622e" />
      ))}
      <Shine cx={64} cy={80} rx={7} ry={12} />
    </g>
  )
}

function Corn() {
  const kernels = []
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 4; col++) {
      kernels.push([82 + col * 12 + (row % 2) * 4, 52 + row * 16])
    }
  }
  return (
    <g>
      <path d="M100 44 C70 44 70 150 100 172 C130 150 130 44 100 44 Z" fill="#facc15" {...stroke} />
      {kernels.map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="5" ry="6" fill="#fde047" stroke="#eab308" strokeWidth="2" />
      ))}
      <path d="M100 186 C64 170 44 120 56 74 C68 110 82 144 100 160 Z" fill="#4ade80" {...stroke} />
      <path d="M100 186 C136 170 156 120 144 74 C132 110 118 144 100 160 Z" fill="#22c55e" {...stroke} />
      <path d="M96 44 Q90 24 80 18 M100 44 Q102 22 108 14 M104 44 Q114 28 124 26" fill="none" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

function Cucumber() {
  return (
    <g>
      <path d="M38 150 C20 132 30 108 54 92 L130 42 C154 26 178 34 180 56 C182 74 168 86 150 98 L74 150 C58 160 46 158 38 150 Z" fill="#22c55e" {...stroke} />
      <path d="M50 132 L142 70" stroke="#86efac" strokeWidth="7" strokeLinecap="round" />
      {[[70, 106], [104, 88], [132, 92], [86, 132], [150, 56]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill="#15803d" />
      ))}
      <path d="M176 48 L190 40" stroke="#65a30d" strokeWidth="6" strokeLinecap="round" />
    </g>
  )
}

function Onion() {
  return (
    <g>
      <path d="M100 24 Q94 40 98 56 M100 24 Q112 38 104 56" fill="none" stroke="#65a30d" strokeWidth="6" strokeLinecap="round" />
      <path d="M100 52 C56 60 30 100 40 136 C50 170 80 180 100 180 C120 180 150 170 160 136 C170 100 144 60 100 52 Z" fill="#c084fc" {...stroke} />
      <path d="M100 56 C74 80 70 150 100 178 M100 56 C126 80 130 150 100 178" fill="none" stroke="#a855f7" strokeWidth="3.5" />
      <path d="M86 180 L84 192 M100 182 L100 194 M114 180 L116 192" stroke="#d6a461" strokeWidth="3.5" strokeLinecap="round" />
      <Shine cx={66} cy={112} />
    </g>
  )
}

function Pepper() {
  return (
    <g>
      <path d="M100 52 Q100 28 120 22" fill="none" stroke="#16a34a" strokeWidth="9" strokeLinecap="round" />
      <path d="M100 54 C70 40 38 54 38 92 C38 132 56 176 82 178 Q100 180 104 168 Q110 180 124 178 C150 174 164 132 162 92 C160 54 130 40 100 54 Z" fill="#ef4444" {...stroke} />
      <path d="M100 58 C92 90 92 140 104 168" fill="none" stroke="#b91c1c" strokeWidth="3.5" />
      <path d="M80 50 Q100 64 122 50 L114 44 Q100 52 88 44 Z" fill="#22c55e" {...thin} />
      <Shine cx={64} cy={96} />
    </g>
  )
}

function Broccoli() {
  return (
    <g>
      <path d="M84 116 L74 182 L126 182 L116 116 Z" fill="#a3e635" {...stroke} />
      <path d="M100 120 L100 176 M88 140 L80 128 M112 140 L120 128" stroke="#65a30d" strokeWidth="4" strokeLinecap="round" />
      {[[56, 92, 30], [100, 70, 36], [144, 92, 30], [78, 112, 26], [122, 112, 26]].map(([x, y, r]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill="#16a34a" {...stroke} />
      ))}
      {[[46, 84], [92, 58], [108, 76], [140, 84], [72, 108], [126, 104], [154, 100]].map(([x, y]) => (
        <circle key={`d${x}${y}`} cx={x} cy={y} r="5" fill="#4ade80" />
      ))}
    </g>
  )
}

function Peas() {
  return (
    <g>
      <path d="M22 120 C40 66 122 40 178 70 C160 128 84 156 22 120 Z" fill="#4ade80" {...stroke} />
      {[56, 86, 116, 146].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={112 - i * 10} r="15" fill="#22c55e" {...thin} />
          <circle cx={x - 5} cy={107 - i * 10} r="4" fill="#bbf7d0" />
        </g>
      ))}
      <path d="M22 120 C70 122 128 104 178 70" fill="none" {...thin} />
      <path d="M178 70 Q190 56 186 42" fill="none" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" />
    </g>
  )
}

function Pumpkin() {
  return (
    <g>
      <path d="M100 52 Q96 30 110 18" fill="none" stroke="#65a30d" strokeWidth="10" strokeLinecap="round" />
      <path d="M112 34 Q138 22 150 40 Q132 46 112 34 Z" fill="#4ade80" {...thin} />
      <ellipse cx="62" cy="116" rx="40" ry="58" fill="#f97316" {...stroke} />
      <ellipse cx="138" cy="116" rx="40" ry="58" fill="#f97316" {...stroke} />
      <ellipse cx="100" cy="116" rx="34" ry="62" fill="#fb923c" {...stroke} />
      <Shine cx={86} cy={88} rx={6} ry={16} rotate={0} />
    </g>
  )
}

export const veggieArt = {
  carrot: Carrot,
  tomato: Tomato,
  potato: Potato,
  corn: Corn,
  cucumber: Cucumber,
  onion: Onion,
  pepper: Pepper,
  broccoli: Broccoli,
  peas: Peas,
  pumpkin: Pumpkin,
}
