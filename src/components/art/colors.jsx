// Rainbow Land pictures: a paint splat in each color, plus a star "target"
// used by the color-matching game (outline only until it is painted).
import { colors } from '../../data/colors.js'
import { stroke } from './common.js'

const SPLAT =
  'M100 34 C126 32 136 54 156 50 C178 46 182 76 166 88 C154 98 174 116 164 136 C154 156 130 148 120 164 C110 180 84 180 78 162 C70 144 44 158 34 138 C24 118 46 108 40 92 C34 74 22 58 42 46 C62 36 76 36 100 34 Z'

const STAR = 'M100 22 L122 72 L176 76 L134 112 L148 166 L100 138 L52 166 L66 112 L24 76 L78 72 Z'

function Splat({ hex }) {
  return (
    <g>
      <path d={SPLAT} fill={hex} {...stroke} />
      <circle cx="170" cy="150" r="9" fill={hex} {...stroke} strokeWidth="3" />
      <circle cx="34" cy="170" r="7" fill={hex} {...stroke} strokeWidth="3" />
      <circle cx="160" cy="34" r="6" fill={hex} {...stroke} strokeWidth="3" />
      <ellipse cx="74" cy="76" rx="12" ry="20" transform="rotate(35 74 76)" fill="#fff" opacity="0.4" />
    </g>
  )
}

function StarTarget({ hex, filled }) {
  return (
    <path
      d={STAR}
      fill={filled ? hex : '#fff'}
      stroke={hex}
      strokeWidth={filled ? 6 : 9}
      strokeDasharray={filled ? undefined : '14 10'}
      strokeLinejoin="round"
    />
  )
}

export const colorArt = Object.fromEntries(
  colors.map((c) => [
    c.id,
    ({ variant }) =>
      variant === 'target' || variant === 'target-filled' ? (
        <StarTarget hex={c.hex} filled={variant === 'target-filled'} />
      ) : (
        <Splat hex={c.hex} />
      ),
  ]),
)
