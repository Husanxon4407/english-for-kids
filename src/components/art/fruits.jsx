// Original fruit illustrations. Kept face-free and realistic in shape so
// children can link them to the real fruit at home.
import { stroke } from './common.js'

function Shine({ cx, cy, rx = 9, ry = 16, rotate = -20 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${rotate} ${cx} ${cy})`} fill="#fff" opacity="0.55" />
}

function Leaf({ cx, cy, rotate = -25, rx = 20, ry = 10 }) {
  return (
    <g transform={`rotate(${rotate} ${cx} ${cy})`}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#4ade80" {...stroke} strokeWidth="3" />
      <path d={`M${cx - rx + 4} ${cy} L${cx + rx - 4} ${cy}`} stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  )
}

function Apple() {
  return (
    <g>
      <path d="M100 62 Q97 40 108 26" fill="none" stroke="#7c4a1e" strokeWidth="7" strokeLinecap="round" />
      <Leaf cx={128} cy={42} />
      <path
        d="M100 64 C62 42 26 74 38 124 C48 166 80 184 100 170 C120 184 152 166 162 124 C174 74 138 42 100 64 Z"
        fill="#ef4444"
        {...stroke}
      />
      <Shine cx={66} cy={98} />
    </g>
  )
}

function Banana() {
  return (
    <g>
      <path d="M46 62 C40 130 90 172 168 150 L172 138 C110 146 70 112 74 58 Z" fill="#facc15" {...stroke} />
      <path d="M58 70 C58 120 96 150 150 146" fill="none" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
      <path d="M46 62 L50 36 L70 38 L74 58 Z" fill="#a3a33a" {...stroke} strokeWidth="3" />
      <circle cx="170" cy="144" r="6" fill="#5b3a1a" />
    </g>
  )
}

function Orange() {
  const dots = [
    [70, 100], [92, 86], [120, 92], [140, 112], [76, 130], [104, 118], [128, 140], [96, 152], [62, 118], [114, 162],
  ]
  return (
    <g>
      <circle cx="100" cy="112" r="64" fill="#fb923c" {...stroke} />
      {dots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="#ea7317" />
      ))}
      <circle cx="100" cy="52" r="5" fill="#65a30d" />
      <Leaf cx={120} cy={42} rotate={-15} rx={18} ry={9} />
      <Shine cx={72} cy={84} rx={10} ry={17} rotate={35} />
    </g>
  )
}

function Strawberry() {
  const seeds = [
    [76, 92], [100, 88], [124, 92], [64, 116], [88, 112], [112, 112], [136, 116], [78, 138], [100, 136], [122, 138], [90, 158], [110, 158],
  ]
  return (
    <g>
      <path
        d="M100 182 C40 150 32 84 66 70 C80 64 92 70 100 72 C108 70 120 64 134 70 C168 84 160 150 100 182 Z"
        fill="#ef4444"
        {...stroke}
      />
      {seeds.map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="3" ry="4.5" fill="#fde047" />
      ))}
      <path
        d="M100 76 L76 64 L90 58 L72 44 L94 48 L100 30 L106 48 L128 44 L110 58 L124 64 Z"
        fill="#22c55e"
        {...stroke}
        strokeWidth="3"
      />
      <Shine cx={72} cy={100} rx={7} ry={13} rotate={20} />
    </g>
  )
}

function Grapes() {
  const grapes = [
    [68, 80], [100, 76], [132, 80], [84, 110], [116, 110], [52, 108], [148, 108], [68, 138], [100, 140], [132, 138], [84, 166], [116, 166],
  ]
  return (
    <g>
      <path d="M100 66 Q98 44 110 30" fill="none" stroke="#7c4a1e" strokeWidth="7" strokeLinecap="round" />
      <Leaf cx={130} cy={42} rotate={-30} />
      {grapes.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="19" fill="#8b5cf6" {...stroke} strokeWidth="3.5" />
          <circle cx={x - 6} cy={y - 6} r="4.5" fill="#fff" opacity="0.5" />
        </g>
      ))}
    </g>
  )
}

function Pear() {
  return (
    <g>
      <path d="M100 52 Q98 36 106 24" fill="none" stroke="#7c4a1e" strokeWidth="7" strokeLinecap="round" />
      <Leaf cx={124} cy={36} rotate={-20} rx={17} ry={9} />
      <path
        d="M100 50 C84 50 80 78 76 94 C50 116 50 180 100 180 C150 180 150 116 124 94 C120 78 116 50 100 50 Z"
        fill="#a3e635"
        {...stroke}
      />
      <Shine cx={74} cy={130} rx={9} ry={18} rotate={15} />
    </g>
  )
}

export const fruitArt = { apple: Apple, banana: Banana, orange: Orange, strawberry: Strawberry, grapes: Grapes, pear: Pear }
