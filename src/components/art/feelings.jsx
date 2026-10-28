// Drawings for Feelings Village: one round, friendly face showing each
// feeling, with a clear sign of it (tears, steam, Zzz...) for children who
// cannot read faces well yet.
import { OUTLINE, stroke } from './common.js'

const thin = { ...stroke, strokeWidth: 3 }
const line = { fill: 'none', ...stroke, strokeWidth: 4.5 }

function Face({ color = '#fde047', children }) {
  return (
    <g>
      <ellipse cx="100" cy="186" rx="52" ry="6" fill="#000" opacity="0.1" />
      <circle cx="100" cy="104" r="74" fill={color} {...stroke} />
      {children}
    </g>
  )
}

function Eyes({ y = 92, r = 9, dx = 28, look = 0 }) {
  return [100 - dx, 100 + dx].map((x) => (
    <g key={x}>
      <circle cx={x + look} cy={y} r={r} fill={OUTLINE} />
      <circle cx={x + look + r * 0.35} cy={y - r * 0.35} r={r * 0.33} fill="#fff" />
    </g>
  ))
}

const Cheeks = ({ opacity = 0.35, r = 11 }) => (
  <>
    <circle cx="56" cy="120" r={r} fill="#f472b6" opacity={opacity} />
    <circle cx="144" cy="120" r={r} fill="#f472b6" opacity={opacity} />
  </>
)

function Happy() {
  return (
    <Face>
      <Eyes />
      <Cheeks />
      <path d="M62 118 Q100 162 138 118 Z" fill="#7a2840" {...thin} />
      <path d="M78 140 Q100 152 122 140 Q100 132 78 140 Z" fill="#fb7185" />
    </Face>
  )
}

function Sad() {
  return (
    <Face color="#93c5fd">
      <path d="M58 70 L86 78 M142 70 L114 78" {...line} />
      <Eyes y={96} />
      <path d="M70 146 Q100 120 130 146" {...line} />
      <path d="M72 108 Q64 124 70 134 Q78 140 82 130 Q82 120 72 108 Z" fill="#38bdf8" {...thin} />
    </Face>
  )
}

function Angry() {
  return (
    <Face color="#f87171">
      <path d="M56 66 L88 84 M144 66 L112 84" {...line} strokeWidth="6" />
      <Eyes y={98} r={8} />
      <path d="M70 144 Q100 124 130 144" {...line} />
      <path d="M36 40 Q30 24 42 18 M164 40 Q170 24 158 18 M100 20 Q94 8 104 2" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
    </Face>
  )
}

function Scared() {
  return (
    <Face color="#c4b5fd">
      <path d="M58 64 Q72 52 86 64 M114 64 Q128 52 142 64" {...line} />
      <circle cx="72" cy="92" r="15" fill="#fff" {...thin} />
      <circle cx="128" cy="92" r="15" fill="#fff" {...thin} />
      <circle cx="72" cy="94" r="6" fill={OUTLINE} />
      <circle cx="128" cy="94" r="6" fill={OUTLINE} />
      <path d="M72 140 Q79 130 86 140 Q93 150 100 140 Q107 130 114 140 Q121 150 128 140" {...line} />
      <path d="M156 60 Q148 76 156 84 Q164 76 156 60 Z" fill="#38bdf8" {...thin} />
    </Face>
  )
}

function Surprised() {
  return (
    <Face>
      <path d="M58 58 Q72 46 86 58 M114 58 Q128 46 142 58" {...line} />
      <circle cx="72" cy="88" r="13" fill="#fff" {...thin} />
      <circle cx="128" cy="88" r="13" fill="#fff" {...thin} />
      <circle cx="72" cy="88" r="6" fill={OUTLINE} />
      <circle cx="128" cy="88" r="6" fill={OUTLINE} />
      <ellipse cx="100" cy="138" rx="14" ry="18" fill="#7a2840" {...thin} />
      <Cheeks opacity={0.25} />
    </Face>
  )
}

function Sleepy() {
  return (
    <Face color="#fde68a">
      <path d="M58 96 Q72 106 86 96 M114 96 Q128 106 142 96" {...line} />
      <ellipse cx="100" cy="138" rx="12" ry="10" fill="#7a2840" {...thin} />
      <Cheeks opacity={0.25} />
      <text x="136" y="50" fontSize="30" fontWeight="900" fill="#6366f1" fontFamily="sans-serif">
        Z
      </text>
      <text x="158" y="28" fontSize="22" fontWeight="900" fill="#818cf8" fontFamily="sans-serif">
        z
      </text>
    </Face>
  )
}

function Hungry() {
  return (
    <Face>
      <Eyes />
      <Cheeks />
      <path d="M66 124 Q100 156 134 124" {...line} />
      <path d="M100 136 Q112 136 116 128 Q120 144 106 148 Q98 146 100 136 Z" fill="#fb7185" {...thin} />
      <path d="M126 140 Q122 156 128 160 Q134 156 126 140 Z" fill="#7dd3fc" {...thin} />
      <path d="M22 108 L22 160 M14 108 L14 124 Q14 132 22 132 Q30 132 30 124 L30 108" fill="none" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
    </Face>
  )
}

function Excited() {
  const star = (x, y, s) => `M${x} ${y - s} l${s * 0.3} ${s * 0.7} ${s * 0.7} ${s * 0.3} -${s * 0.7} ${s * 0.3} -${s * 0.3} ${s * 0.7} -${s * 0.3} -${s * 0.7} -${s * 0.7} -${s * 0.3} ${s * 0.7} -${s * 0.3} z`
  return (
    <Face color="#fda4af">
      <path d={star(72, 90, 14)} fill="#fde047" {...thin} />
      <path d={star(128, 90, 14)} fill="#fde047" {...thin} />
      <path d="M58 116 Q100 170 142 116 Z" fill="#7a2840" {...thin} />
      <path d="M76 142 Q100 156 124 142 Q100 132 76 142 Z" fill="#fb7185" />
      <path d={star(28, 36, 10)} fill="#fbbf24" />
      <path d={star(172, 40, 12)} fill="#fbbf24" />
      <path d={star(166, 168, 8)} fill="#fbbf24" />
    </Face>
  )
}

function Shy() {
  return (
    <Face color="#fecdd3">
      <path d="M58 98 Q72 90 86 98 M114 98 Q128 90 142 98" {...line} />
      <Cheeks opacity={0.6} r={14} />
      <path d="M90 136 Q100 142 110 136" {...line} />
      <path d="M52 118 L60 112 M56 126 L64 120 M136 112 L144 118 M140 120 L148 126" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />
      <circle cx="36" cy="150" r="20" fill="#fcd9b8" {...stroke} />
      <circle cx="164" cy="150" r="20" fill="#fcd9b8" {...stroke} />
    </Face>
  )
}

function Sick() {
  return (
    <Face color="#bbf7d0">
      <path d="M58 92 Q72 84 86 92 M114 92 Q128 84 142 92" {...line} />
      <path d="M74 140 Q86 132 100 140 Q114 148 126 140" {...line} />
      <g transform="rotate(-30 120 140)">
        <rect x="110" y="126" width="64" height="12" rx="6" fill="#fff" {...thin} />
        <circle cx="174" cy="132" r="9" fill="#ef4444" {...thin} />
        <path d="M120 132 L160 132" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      </g>
      <path d="M150 52 Q144 64 150 70 Q156 64 150 52 Z" fill="#38bdf8" {...thin} />
    </Face>
  )
}

export const feelingArt = {
  happy: Happy,
  sad: Sad,
  angry: Angry,
  scared: Scared,
  surprised: Surprised,
  sleepy: Sleepy,
  hungry: Hungry,
  excited: Excited,
  shy: Shy,
  sick: Sick,
}
