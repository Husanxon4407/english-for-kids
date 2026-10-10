// Original illustrations for My Body. Pairs are drawn once and mirrored.
import { OUTLINE, stroke } from './common.js'

const SKIN = '#fcd9b8'
const SKIN_SHADE = '#f0b98d'

const Mirrored = ({ children }) => (
  <>
    {children}
    <g transform="translate(200 0) scale(-1 1)">{children}</g>
  </>
)

function Eyes() {
  return (
    <Mirrored>
      <path d="M22 70 Q52 48 84 66" fill="none" {...stroke} strokeWidth="7" />
      <ellipse cx="54" cy="116" rx="34" ry="30" fill="#fff" {...stroke} />
      <circle cx="58" cy="118" r="18" fill="#38bdf8" {...stroke} strokeWidth="3" />
      <circle cx="58" cy="118" r="9" fill={OUTLINE} />
      <circle cx="52" cy="110" r="5" fill="#fff" />
      <path d="M24 96 L14 86 M36 88 L30 76 M52 84 L50 72" {...stroke} strokeWidth="3.5" />
    </Mirrored>
  )
}

function Nose() {
  return (
    <g>
      <circle cx="42" cy="122" r="16" fill="#f9a8d4" opacity="0.45" />
      <circle cx="158" cy="122" r="16" fill="#f9a8d4" opacity="0.45" />
      <path
        d="M100 28 Q90 84 66 116 Q50 140 72 152 Q86 158 100 152 Q114 158 128 152 Q150 140 134 116 Q110 84 100 28 Z"
        fill={SKIN}
        {...stroke}
      />
      <ellipse cx="84" cy="140" rx="8" ry="5" fill={SKIN_SHADE} {...stroke} strokeWidth="3" />
      <ellipse cx="116" cy="140" rx="8" ry="5" fill={SKIN_SHADE} {...stroke} strokeWidth="3" />
      <path d="M96 60 Q90 92 80 108" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
    </g>
  )
}

function Mouth() {
  return (
    <g>
      <path d="M28 84 Q100 62 172 84 Q166 164 100 166 Q34 164 28 84 Z" fill="#9f1239" {...stroke} />
      <path d="M40 84 Q100 70 160 84 L156 104 Q100 92 44 104 Z" fill="#fff" {...stroke} strokeWidth="3" />
      <path d="M74 78 L74 97 M100 76 L100 94 M126 78 L126 97" {...stroke} strokeWidth="2.5" />
      <path d="M62 150 Q100 116 138 150 Q118 164 100 164 Q82 164 62 150 Z" fill="#fb7185" {...stroke} strokeWidth="3" />
      <path d="M28 84 Q100 62 172 84" fill="none" {...stroke} stroke="#e11d48" strokeWidth="9" />
      <path d="M28 84 Q100 62 172 84" fill="none" {...stroke} strokeWidth="3" transform="translate(0 -5)" />
    </g>
  )
}

function Ears() {
  return (
    <Mirrored>
      <path
        d="M84 48 C52 24 16 52 22 100 C26 138 54 162 76 150 C90 142 88 124 80 112 Z"
        fill={SKIN}
        {...stroke}
      />
      <path d="M72 66 C52 52 36 72 40 100 C42 118 54 130 64 126" fill="none" {...stroke} stroke={SKIN_SHADE} strokeWidth="7" />
      <path d="M58 96 Q66 104 60 114" fill="none" {...stroke} strokeWidth="3" />
    </Mirrored>
  )
}

function Hands() {
  return (
    <Mirrored>
      <rect x="10" y="108" width="16" height="42" rx="8" transform="rotate(-32 18 129)" fill={SKIN} {...stroke} />
      {[
        [26, 62],
        [40, 46],
        [54, 52],
        [68, 70],
      ].map(([x, y]) => (
        <rect key={x} x={x} y={y} width="13" height={130 - y} rx="6.5" fill={SKIN} {...stroke} />
      ))}
      <rect x="24" y="104" width="59" height="62" rx="20" fill={SKIN} {...stroke} />
      <rect x="27" y="104" width="53" height="20" fill={SKIN} />
      <path d="M38 134 Q52 144 70 132" fill="none" {...stroke} stroke={SKIN_SHADE} strokeWidth="3.5" />
    </Mirrored>
  )
}

function Feet() {
  return (
    <Mirrored>
      <path
        d="M34 96 Q28 62 56 60 Q88 60 88 100 Q88 126 80 150 Q74 180 56 180 Q36 180 36 150 Q38 124 34 96 Z"
        fill={SKIN}
        {...stroke}
      />
      {[
        [78, 44, 12],
        [58, 36, 9],
        [42, 40, 8],
        [29, 50, 7],
        [20, 64, 6],
      ].map(([cx, cy, r]) => (
        <circle key={cx} cx={cx} cy={cy} r={r} fill={SKIN} {...stroke} />
      ))}
      <ellipse cx="58" cy="154" rx="12" ry="14" fill={SKIN_SHADE} opacity="0.6" />
      <ellipse cx="60" cy="92" rx="16" ry="14" fill={SKIN_SHADE} opacity="0.6" />
    </Mirrored>
  )
}

export const bodyArt = { eyes: Eyes, nose: Nose, mouth: Mouth, ears: Ears, hands: Hands, feet: Feet }
