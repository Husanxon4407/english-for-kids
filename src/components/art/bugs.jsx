// Drawings for Bug Garden: friendly little bugs with big eyes.
import { OUTLINE, stroke } from './common.js'

const thin = { ...stroke, strokeWidth: 3 }

function Eye({ x, y, r = 7 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={OUTLINE} />
      <circle cx={x + r * 0.35} cy={y - r * 0.35} r={r * 0.35} fill="#fff" />
    </g>
  )
}

const Smile = ({ x, y, w = 9 }) => <path d={`M${x - w} ${y} Q${x} ${y + w} ${x + w} ${y}`} fill="none" {...thin} />

// Two feelers with little balls on the ends.
function Feelers({ x, y, spread = 22, height = 30 }) {
  return (
    <g>
      <path d={`M${x - 8} ${y} Q${x - spread} ${y - height * 0.6} ${x - spread - 6} ${y - height}`} fill="none" {...thin} />
      <path d={`M${x + 8} ${y} Q${x + spread} ${y - height * 0.6} ${x + spread + 6} ${y - height}`} fill="none" {...thin} />
      <circle cx={x - spread - 6} cy={y - height} r="5" fill={OUTLINE} />
      <circle cx={x + spread + 6} cy={y - height} r="5" fill={OUTLINE} />
    </g>
  )
}

function Bee() {
  return (
    <g>
      <ellipse cx="76" cy="62" rx="28" ry="38" transform="rotate(-25 76 62)" fill="#e0f2fe" {...thin} opacity="0.95" />
      <ellipse cx="124" cy="62" rx="28" ry="38" transform="rotate(25 124 62)" fill="#e0f2fe" {...thin} opacity="0.95" />
      <path d="M160 120 L184 124 L162 132 Z" fill={OUTLINE} />
      <ellipse cx="108" cy="124" rx="58" ry="44" fill="#facc15" {...stroke} />
      <path d="M96 82 Q86 124 96 166 L116 166 Q104 124 116 82 Z M132 88 Q124 124 134 160 Q146 154 152 144 Q144 124 148 100 Q142 92 132 88 Z" fill={OUTLINE} />
      <circle cx="56" cy="116" r="32" fill="#facc15" {...stroke} />
      <Feelers x={56} y={88} spread={14} height={26} />
      <Eye x={46} y={110} r={6} />
      <Eye x={68} y={110} r={6} />
      <Smile x={57} y={126} w={8} />
    </g>
  )
}

function Butterfly() {
  return (
    <g>
      <path d="M96 96 C60 30 10 40 22 92 C28 112 60 112 96 104 Z" fill="#f472b6" {...stroke} />
      <path d="M104 96 C140 30 190 40 178 92 C172 112 140 112 104 104 Z" fill="#f472b6" {...stroke} />
      <path d="M96 108 C60 112 32 140 50 162 C66 178 90 150 96 120 Z" fill="#a78bfa" {...stroke} />
      <path d="M104 108 C140 112 168 140 150 162 C134 178 110 150 104 120 Z" fill="#a78bfa" {...stroke} />
      <circle cx="58" cy="78" r="10" fill="#fde047" />
      <circle cx="142" cy="78" r="10" fill="#fde047" />
      <circle cx="66" cy="142" r="7" fill="#fff" opacity="0.8" />
      <circle cx="134" cy="142" r="7" fill="#fff" opacity="0.8" />
      <ellipse cx="100" cy="120" rx="10" ry="44" fill="#6b4f3a" {...thin} />
      <circle cx="100" cy="70" r="14" fill="#6b4f3a" {...thin} />
      <Feelers x={100} y={58} spread={10} height={28} />
      <circle cx="95" cy="68" r="2.8" fill="#fff" />
      <circle cx="105" cy="68" r="2.8" fill="#fff" />
    </g>
  )
}

function Ant() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${94 + i * 14} 128 L${76 + i * 22} 170`} stroke={OUTLINE} strokeWidth="5" strokeLinecap="round" />
      ))}
      <ellipse cx="152" cy="118" rx="34" ry="28" fill="#dc2626" {...stroke} />
      <ellipse cx="108" cy="120" rx="20" ry="16" fill="#dc2626" {...stroke} />
      <circle cx="60" cy="102" r="30" fill="#dc2626" {...stroke} />
      <Feelers x={58} y={74} spread={16} height={34} />
      <Eye x={48} y={98} r={6} />
      <Eye x={70} y={98} r={6} />
      <Smile x={59} y={114} w={8} />
    </g>
  )
}

function Ladybug() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={`M60 ${110 + i * 24} L36 ${116 + i * 30}`} stroke={OUTLINE} strokeWidth="5" strokeLinecap="round" />
          <path d={`M140 ${110 + i * 24} L164 ${116 + i * 30}`} stroke={OUTLINE} strokeWidth="5" strokeLinecap="round" />
        </g>
      ))}
      <path d="M40 120 C40 74 160 74 160 120 C160 168 128 184 100 184 C72 184 40 168 40 120 Z" fill="#ef4444" {...stroke} />
      <path d="M100 82 L100 184" {...stroke} />
      {[[70, 116], [130, 116], [76, 152], [124, 152]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="11" fill={OUTLINE} />
      ))}
      <path d="M58 82 C58 44 142 44 142 82 Z" fill={OUTLINE} {...stroke} />
      <Feelers x={100} y={50} spread={20} height={24} />
      <circle cx="84" cy="66" r="9" fill="#fff" />
      <circle cx="116" cy="66" r="9" fill="#fff" />
      <circle cx="86" cy="67" r="4.5" fill={OUTLINE} />
      <circle cx="118" cy="67" r="4.5" fill={OUTLINE} />
    </g>
  )
}

function Spider() {
  return (
    <g>
      <path d="M100 6 L100 66" stroke="#94a3b8" strokeWidth="3" />
      {[-1, 1].map((side) =>
        [0, 1, 2, 3].map((i) => (
          <path
            key={`${side}${i}`}
            d={`M${100 + side * 30} ${100 + i * 12} Q${100 + side * (62 + i * 4)} ${72 + i * 18} ${100 + side * (80 + i * 4)} ${112 + i * 22}`}
            fill="none"
            stroke={OUTLINE}
            strokeWidth="6"
            strokeLinecap="round"
          />
        )),
      )}
      <circle cx="100" cy="116" r="44" fill="#7c3aed" {...stroke} />
      <circle cx="84" cy="108" r="12" fill="#fff" {...thin} />
      <circle cx="116" cy="108" r="12" fill="#fff" {...thin} />
      <circle cx="86" cy="110" r="5.5" fill={OUTLINE} />
      <circle cx="118" cy="110" r="5.5" fill={OUTLINE} />
      <Smile x={100} y={130} w={11} />
      <circle cx="68" cy="128" r="7" fill="#f472b6" opacity="0.4" />
      <circle cx="132" cy="128" r="7" fill="#f472b6" opacity="0.4" />
    </g>
  )
}

function Snail() {
  return (
    <g>
      <path d="M20 160 C20 144 40 140 60 140 L150 140 Q176 140 176 120 L176 84 Q176 70 164 70 Q152 70 152 84 L152 108 Q150 126 136 130 L30 160 Z" fill="#fcd34d" {...stroke} />
      <path d="M14 166 L140 166 Q160 166 168 150 Q140 160 18 158 Z" fill="#fcd34d" {...stroke} />
      <path d="M156 72 L148 44 M172 72 L182 46" stroke={OUTLINE} strokeWidth="4" strokeLinecap="round" />
      <circle cx="148" cy="42" r="6" fill={OUTLINE} />
      <circle cx="182" cy="44" r="6" fill={OUTLINE} />
      <circle cx="90" cy="102" r="56" fill="#d97706" {...stroke} />
      <path d="M90 102 m-8 0 a8 8 0 1 1 16 0 a18 18 0 1 1 -32 0 a28 28 0 1 1 56 0 a38 38 0 1 1 -76 0" fill="none" stroke="#fde68a" strokeWidth="6" strokeLinecap="round" />
      <Eye x={162} y={98} r={5} />
      <path d="M154 114 Q164 122 174 112" fill="none" {...thin} />
    </g>
  )
}

function Worm() {
  return (
    <g>
      <path d="M20 170 L180 170" stroke="#92400e" strokeWidth="8" strokeLinecap="round" opacity="0.4" />
      <path d="M30 150 C40 110 70 110 80 150 C90 186 120 186 130 140 C136 104 148 80 166 78" fill="none" stroke={OUTLINE} strokeWidth="36" strokeLinecap="round" />
      <path d="M30 150 C40 110 70 110 80 150 C90 186 120 186 130 140 C136 104 148 80 166 78" fill="none" stroke="#fb7185" strokeWidth="28" strokeLinecap="round" />
      {[[46, 124], [74, 132], [104, 170], [128, 152], [140, 104]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill="#e11d48" opacity="0.6" />
      ))}
      <Eye x={160} y={74} r={5} />
      <Eye x={176} y={76} r={5} />
      <Smile x={168} y={86} w={7} />
    </g>
  )
}

function Caterpillar() {
  const parts = [40, 64, 88, 112, 136]
  return (
    <g>
      {parts.map((x, i) => (
        <g key={x}>
          <path d={`M${x} 148 L${x - 4} 166 M${x + 6} 148 L${x + 10} 166`} stroke={OUTLINE} strokeWidth="4" strokeLinecap="round" />
          <circle cx={x} cy={i % 2 ? 128 : 120} r="22" fill={i % 2 ? '#84cc16' : '#a3e635'} {...stroke} />
        </g>
      ))}
      <circle cx="160" cy="100" r="28" fill="#84cc16" {...stroke} />
      <Feelers x={160} y={74} spread={14} height={26} />
      <Eye x={150} y={96} r={6} />
      <Eye x={172} y={96} r={6} />
      <Smile x={161} y={110} w={8} />
      <circle cx="144" cy="110" r="6" fill="#f472b6" opacity="0.4" />
    </g>
  )
}

function Dragonfly() {
  return (
    <g>
      <ellipse cx="60" cy="72" rx="52" ry="16" transform="rotate(-18 60 72)" fill="#cffafe" {...thin} />
      <ellipse cx="140" cy="72" rx="52" ry="16" transform="rotate(18 140 72)" fill="#cffafe" {...thin} />
      <ellipse cx="62" cy="104" rx="46" ry="14" transform="rotate(12 62 104)" fill="#cffafe" {...thin} />
      <ellipse cx="138" cy="104" rx="46" ry="14" transform="rotate(-12 138 104)" fill="#cffafe" {...thin} />
      <path d="M100 96 L100 186" stroke={OUTLINE} strokeWidth="18" strokeLinecap="round" />
      <path d="M100 96 L100 186" stroke="#06b6d4" strokeWidth="11" strokeLinecap="round" />
      <ellipse cx="100" cy="88" rx="14" ry="20" fill="#0891b2" {...thin} />
      <circle cx="100" cy="56" r="20" fill="#06b6d4" {...stroke} />
      <circle cx="90" cy="52" r="8" fill="#fff" {...thin} />
      <circle cx="110" cy="52" r="8" fill="#fff" {...thin} />
      <circle cx="91" cy="53" r="4" fill={OUTLINE} />
      <circle cx="111" cy="53" r="4" fill={OUTLINE} />
      <Smile x={100} y={64} w={6} />
    </g>
  )
}

function Beetle() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={`M62 ${104 + i * 24} L36 ${100 + i * 34}`} stroke={OUTLINE} strokeWidth="5" strokeLinecap="round" />
          <path d={`M138 ${104 + i * 24} L164 ${100 + i * 34}`} stroke={OUTLINE} strokeWidth="5" strokeLinecap="round" />
        </g>
      ))}
      <path d="M50 116 C50 76 150 76 150 116 C150 162 126 184 100 184 C74 184 50 162 50 116 Z" fill="#4f46e5" {...stroke} />
      <path d="M100 86 L100 184" {...stroke} />
      <ellipse cx="78" cy="112" rx="8" ry="16" transform="rotate(-15 78 112)" fill="#a5b4fc" opacity="0.7" />
      <path d="M66 86 C66 50 134 50 134 86 Z" fill="#312e81" {...stroke} />
      <path d="M84 52 Q70 30 58 30 M116 52 Q130 30 142 30" fill="none" {...stroke} />
      <circle cx="86" cy="70" r="8" fill="#fff" />
      <circle cx="114" cy="70" r="8" fill="#fff" />
      <circle cx="87" cy="71" r="4" fill={OUTLINE} />
      <circle cx="115" cy="71" r="4" fill={OUTLINE} />
    </g>
  )
}

export const bugArt = {
  bee: Bee,
  butterfly: Butterfly,
  ant: Ant,
  ladybug: Ladybug,
  spider: Spider,
  snail: Snail,
  worm: Worm,
  caterpillar: Caterpillar,
  dragonfly: Dragonfly,
  beetle: Beetle,
}
