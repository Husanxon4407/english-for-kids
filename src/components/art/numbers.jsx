// Number Hill pictures: a big numeral with the same number of stars to count.
import { numbers } from '../../data/numbers.js'
import { OUTLINE, stroke } from './common.js'

function starPoints(cx, cy, outer = 14, inner = 6.2) {
  return Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 ? inner : outer
    const a = (Math.PI / 5) * i - Math.PI / 2
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
}

function NumberCard({ count, hex }) {
  const gap = 29
  const first = 100 - ((count - 1) * gap) / 2
  return (
    <g>
      <text
        x="100"
        y="124"
        textAnchor="middle"
        fontSize="138"
        fontWeight="800"
        fill={hex}
        stroke={OUTLINE}
        strokeWidth="5"
        strokeLinejoin="round"
        paintOrder="stroke"
      >
        {count}
      </text>
      {Array.from({ length: count }, (_, i) => (
        <polygon key={i} points={starPoints(first + i * gap, 168)} fill="#fbbf24" {...stroke} strokeWidth="3" />
      ))}
    </g>
  )
}

export const numberArt = Object.fromEntries(numbers.map((n) => [n.id, () => <NumberCard count={n.count} hex={n.hex} />]))
