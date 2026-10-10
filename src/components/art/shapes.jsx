// Shape Castle pictures: each shape is a little character with a friendly face.
import { OUTLINE, stroke } from './common.js'

function Face({ cx = 100, cy = 100 }) {
  return (
    <g>
      <circle cx={cx - 16} cy={cy - 6} r="6" fill={OUTLINE} />
      <circle cx={cx + 16} cy={cy - 6} r="6" fill={OUTLINE} />
      <circle cx={cx - 14} cy={cy - 8} r="2" fill="#fff" />
      <circle cx={cx + 18} cy={cy - 8} r="2" fill="#fff" />
      <circle cx={cx - 28} cy={cy + 8} r="7" fill="#fff" opacity="0.45" />
      <circle cx={cx + 28} cy={cy + 8} r="7" fill="#fff" opacity="0.45" />
      <path d={`M${cx - 11} ${cy + 8} Q${cx} ${cy + 20} ${cx + 11} ${cy + 8}`} fill="none" {...stroke} strokeWidth="3.5" />
    </g>
  )
}

function Circle() {
  return (
    <g>
      <circle cx="100" cy="100" r="74" fill="#f87171" {...stroke} />
      <Face />
    </g>
  )
}

function Square() {
  return (
    <g>
      <rect x="30" y="30" width="140" height="140" rx="12" fill="#60a5fa" {...stroke} />
      <Face />
    </g>
  )
}

function Triangle() {
  return (
    <g>
      <path d="M100 22 L180 170 L20 170 Z" fill="#4ade80" {...stroke} />
      <Face cy={124} />
    </g>
  )
}

function Star() {
  return (
    <g>
      <path d="M100 14 L124 70 L184 76 L138 116 L152 176 L100 144 L48 176 L62 116 L16 76 L76 70 Z" fill="#fbbf24" {...stroke} />
      <Face cy={102} />
    </g>
  )
}

function Heart() {
  return (
    <g>
      <path
        d="M100 176 C40 130 18 96 18 68 C18 42 38 24 62 24 C80 24 94 36 100 52 C106 36 120 24 138 24 C162 24 182 42 182 68 C182 96 160 130 100 176 Z"
        fill="#f472b6"
        {...stroke}
      />
      <Face cy={90} />
    </g>
  )
}

function Diamond() {
  return (
    <g>
      <path d="M100 14 L174 100 L100 186 L26 100 Z" fill="#a78bfa" {...stroke} />
      <Face />
    </g>
  )
}

// Two more shapes that only the shapes song shows.
function Rectangle() {
  return (
    <g>
      <rect x="14" y="48" width="172" height="104" rx="12" fill="#fb923c" {...stroke} />
      <Face />
    </g>
  )
}

function Oval() {
  return (
    <g>
      <ellipse cx="100" cy="100" rx="58" ry="80" fill="#2dd4bf" {...stroke} />
      <Face />
    </g>
  )
}

export const shapeArt = {
  circle: Circle,
  square: Square,
  triangle: Triangle,
  star: Star,
  heart: Heart,
  diamond: Diamond,
  rectangle: Rectangle,
  oval: Oval,
}
