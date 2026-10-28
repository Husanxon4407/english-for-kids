// Drawings for Clothes Closet. (The hat is drawn with the alphabet song.)
import { stroke } from './common.js'

const thin = { ...stroke, strokeWidth: 3 }
const Shadow = ({ y = 184, rx = 64 }) => <ellipse cx="100" cy={y} rx={rx} ry="7" fill="#000" opacity="0.1" />

function Shirt() {
  return (
    <g>
      <Shadow />
      <path d="M70 30 L28 52 L12 92 L44 104 L52 86 L52 174 L148 174 L148 86 L156 104 L188 92 L172 52 L130 30 Q100 52 70 30 Z" fill="#3b82f6" {...stroke} />
      <path d="M70 30 Q100 56 130 30" fill="none" {...stroke} />
      <path d="M100 96 l9 18 20 3 -14.5 14 3.5 20 -18 -9.5 -18 9.5 3.5 -20 -14.5 -14 20 -3 z" fill="#fde047" {...thin} />
    </g>
  )
}

function Pants() {
  return (
    <g>
      <Shadow />
      <path d="M50 26 L150 26 L162 176 L114 176 L100 78 L86 176 L38 176 Z" fill="#2563eb" {...stroke} />
      <rect x="50" y="26" width="100" height="18" fill="#1d4ed8" {...thin} />
      <path d="M100 44 L100 78" {...thin} />
      <path d="M62 60 Q74 70 88 62 M138 60 Q126 70 112 62" fill="none" {...thin} />
      <path d="M44 156 L84 156 M116 156 L156 156" stroke="#93c5fd" strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

function Dress() {
  return (
    <g>
      <Shadow />
      <path d="M78 22 L74 62 L126 62 L122 22" fill="#f472b6" {...stroke} />
      <path d="M74 62 L40 168 Q100 186 160 168 L126 62 Z" fill="#ec4899" {...stroke} />
      <path d="M72 74 L128 74" stroke="#fde047" strokeWidth="8" strokeLinecap="round" />
      {[[80, 110], [118, 104], [96, 140], [64, 150], [136, 146]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="6" fill="#fff" opacity="0.85" />
      ))}
      <path d="M44 162 Q100 180 156 162" fill="none" stroke="#fbcfe8" strokeWidth="5" strokeDasharray="2 10" strokeLinecap="round" />
    </g>
  )
}

function Skirt() {
  return (
    <g>
      <Shadow />
      <rect x="62" y="44" width="76" height="20" rx="6" fill="#7c3aed" {...stroke} />
      <path d="M62 64 L26 158 Q100 178 174 158 L138 64 Z" fill="#a78bfa" {...stroke} />
      <path d="M78 66 L58 164 M100 66 L100 170 M122 66 L142 164" fill="none" {...thin} />
      <circle cx="100" cy="54" r="6" fill="#fde047" {...thin} />
    </g>
  )
}

function Sock({ x }) {
  return (
    <g>
      <path d={`M${x - 22} 30 L${x + 18} 30 L${x + 18} 120 Q${x + 18} 136 ${x + 34} 140 L${x + 48} 144 Q${x + 66} 150 ${x + 60} 166 Q${x + 54} 180 ${x + 34} 176 L${x - 2} 168 Q${x - 22} 162 ${x - 22} 140 Z`} fill="#fff" {...stroke} />
      <path d={`M${x - 22} 30 L${x + 18} 30 L${x + 18} 50 L${x - 22} 50 Z`} fill="#22c55e" {...thin} />
      <path d={`M${x - 22} 74 L${x + 18} 74 M${x - 22} 96 L${x + 18} 96`} stroke="#22c55e" strokeWidth="9" />
      <path d={`M${x + 40} 143 Q${x + 66} 150 ${x + 60} 166 Q${x + 54} 180 ${x + 34} 176 Q${x + 38} 158 ${x + 40} 143 Z`} fill="#22c55e" />
    </g>
  )
}

function Socks() {
  return (
    <g>
      <Shadow />
      <Sock x={58} />
      <g transform="translate(66 6)">
        <Sock x={58} />
      </g>
    </g>
  )
}

function Shoe({ dx = 0, dy = 0, color }) {
  return (
    <g transform={`translate(${dx} ${dy})`}>
      <path d="M14 108 Q14 70 40 66 L58 66 Q66 92 92 96 L122 100 Q144 104 144 128 L144 136 L14 136 Z" fill={color} {...stroke} />
      <rect x="10" y="134" width="138" height="14" rx="7" fill="#fff" {...thin} />
      <path d="M58 76 L74 86 M52 86 L68 96 M46 96 L62 106" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

function Shoes() {
  return (
    <g>
      <Shadow y={186} />
      <Shoe dx={6} dy={-14} color="#f97316" />
      <Shoe dx={42} dy={26} color="#fb923c" />
    </g>
  )
}

function Coat() {
  return (
    <g>
      <Shadow />
      <path d="M72 24 L34 46 L18 150 L46 156 L54 100 L54 176 L146 176 L146 100 L154 156 L182 150 L166 46 L128 24 Z" fill="#ef4444" {...stroke} />
      <path d="M72 24 L100 60 L128 24 L114 18 L100 34 L86 18 Z" fill="#b91c1c" {...thin} />
      <path d="M100 60 L100 176" {...thin} />
      {[82, 112, 142].map((y) => (
        <circle key={y} cx="112" cy={y} r="5.5" fill="#fde047" {...thin} />
      ))}
      <path d="M62 132 L88 132 L88 150 L62 150 Z" fill="#b91c1c" {...thin} />
    </g>
  )
}

function Scarf() {
  return (
    <g>
      <Shadow rx={56} />
      <path d="M40 60 Q100 96 160 60 Q166 84 156 96 Q100 126 44 96 Q34 84 40 60 Z" fill="#14b8a6" {...stroke} />
      <path d="M118 102 L150 104 L146 176 L112 172 Z" fill="#14b8a6" {...stroke} />
      <path d="M118 124 L148 126 M116 148 L147 150" stroke="#fde047" strokeWidth="8" />
      <path d="M58 82 Q100 104 142 82" fill="none" stroke="#fde047" strokeWidth="8" strokeLinecap="round" />
      <path d="M112 172 L110 186 M122 174 L121 188 M134 175 L134 189 M145 176 L146 189" stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

function Boot({ dx = 0, color }) {
  return (
    <g transform={`translate(${dx} 0)`}>
      <path d="M20 24 L70 24 L72 116 Q100 118 112 132 Q118 140 116 150 L18 150 Z" fill={color} {...stroke} />
      <rect x="14" y="148" width="106" height="16" rx="6" fill="#78350f" {...thin} />
      <path d="M18 40 L72 40" stroke="#fde68a" strokeWidth="8" />
    </g>
  )
}

function Boots() {
  return (
    <g>
      <Shadow y={178} rx={78} />
      <Boot dx={0} color="#b45309" />
      <Boot dx={66} color="#d97706" />
    </g>
  )
}

export const clothesArt = {
  shirt: Shirt,
  pants: Pants,
  dress: Dress,
  skirt: Skirt,
  socks: Socks,
  shoes: Shoes,
  coat: Coat,
  scarf: Scarf,
  boots: Boots,
}
