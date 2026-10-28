// Drawings for Dino Valley: friendly, round dinosaurs (never scary), each
// with the one feature that tells it apart — horns, back plates, wings, a
// long neck, big teeth.
import { OUTLINE, stroke } from './common.js'

const thin = { ...stroke, strokeWidth: 3 }
const Shadow = ({ y = 184, rx = 66 }) => <ellipse cx="100" cy={y} rx={rx} ry="7" fill="#000" opacity="0.1" />

function Eye({ x, y, r = 6 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={OUTLINE} />
      <circle cx={x + r * 0.35} cy={y - r * 0.35} r={r * 0.35} fill="#fff" />
    </g>
  )
}

const Leg = ({ x, y = 150, color, w = 18, h = 32 }) => <rect x={x} y={y} width={w} height={h} rx={w / 2} fill={color} {...stroke} />

function Dinosaur() {
  return (
    <g>
      <Shadow />
      <path d="M140 132 Q180 136 194 112 Q182 150 140 156 Z" fill="#4ade80" {...stroke} />
      <Leg x={64} color="#22c55e" />
      <Leg x={122} color="#22c55e" />
      <path d="M52 132 Q50 96 96 96 Q140 96 148 130 Q146 160 100 162 Q54 162 52 132 Z" fill="#4ade80" {...stroke} />
      <path d="M70 108 Q62 70 60 36 Q60 18 78 18 Q98 18 98 34 Q96 44 84 44 Q80 72 88 100" fill="#4ade80" {...stroke} />
      <Eye x={80} y={30} r={5} />
      <path d="M86 38 Q92 40 96 36" fill="none" {...thin} />
      {[[86, 120], [110, 112], [122, 134], [98, 140]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="6" fill="#16a34a" opacity="0.6" />
      ))}
    </g>
  )
}

function Trex() {
  return (
    <g>
      <Shadow />
      <path d="M60 124 Q22 128 8 158 Q38 150 66 150 Z" fill="#f97316" {...stroke} />
      <Leg x={70} y={146} color="#ea580c" w={22} h={36} />
      <Leg x={112} y={146} color="#ea580c" w={22} h={36} />
      <path d="M56 130 Q56 84 104 82 Q142 84 146 126 Q144 160 100 162 Q58 160 56 130 Z" fill="#f97316" {...stroke} />
      <path d="M120 108 L132 118 L126 122" fill="none" stroke={OUTLINE} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M90 84 Q86 30 128 24 Q178 22 182 54 Q184 76 160 80 L120 82 Q102 92 90 84 Z" fill="#f97316" {...stroke} />
      <path d="M128 66 L180 62" {...thin} />
      <path d="M134 66 l4 7 4 -7 4 7 4 -7 4 7 4 -7 4 7 4 -7" fill="#fff" stroke={OUTLINE} strokeWidth="2" strokeLinejoin="round" />
      <Eye x={136} y={42} r={7} />
      <circle cx="172" cy="44" r="3" fill={OUTLINE} />
      <circle cx="118" cy="58" r="7" fill="#f472b6" opacity="0.35" />
    </g>
  )
}

function Triceratops() {
  return (
    <g>
      <Shadow />
      <path d="M56 132 Q22 134 10 152 Q38 154 60 150 Z" fill="#fb923c" {...stroke} />
      <Leg x={62} color="#ea580c" w={20} />
      <Leg x={100} color="#ea580c" w={20} />
      <path d="M50 134 Q50 92 100 92 Q140 92 146 130 Q144 162 98 162 Q52 162 50 134 Z" fill="#fb923c" {...stroke} />
      <path d="M118 68 Q132 26 168 36 Q190 52 182 92 Q160 120 132 112 Z" fill="#fdba74" {...stroke} />
      {[[136, 46], [158, 44], [176, 62], [178, 86]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill="#f97316" />
      ))}
      <path d="M120 84 Q118 120 150 132 Q178 134 186 118 Q190 98 168 86 Q144 74 120 84 Z" fill="#fb923c" {...stroke} />
      <path d="M150 84 L156 52 L164 84 M168 88 L184 60 L180 92" fill="#fff7ed" {...thin} />
      <path d="M184 114 L198 104 L190 122" fill="#fff7ed" {...thin} />
      <Eye x={150} y={100} r={6} />
      <path d="M162 120 Q172 124 180 118" fill="none" {...thin} />
    </g>
  )
}

function Stegosaurus() {
  const plates = [[58, 96], [80, 78], [104, 72], [128, 80], [148, 98]]
  return (
    <g>
      <Shadow />
      {plates.map(([x, y]) => (
        <path key={x} d={`M${x - 14} ${y + 20} L${x} ${y - 16} L${x + 14} ${y + 20} Z`} fill="#f59e0b" {...stroke} />
      ))}
      <path d="M150 130 Q182 128 192 104 L196 112 Q186 144 150 152 Z" fill="#a3e635" {...stroke} />
      <path d="M186 104 L194 90 M194 110 L200 100" stroke={OUTLINE} strokeWidth="4" strokeLinecap="round" />
      <Leg x={66} color="#65a30d" />
      <Leg x={118} color="#65a30d" />
      <path d="M44 136 Q44 98 100 96 Q152 98 156 136 Q152 162 100 162 Q48 162 44 136 Z" fill="#a3e635" {...stroke} />
      <path d="M52 128 Q28 120 16 130 Q8 144 22 150 Q40 152 54 144 Z" fill="#a3e635" {...stroke} />
      <Eye x={26} y={134} r={5} />
      <path d="M12 144 Q18 148 24 146" fill="none" {...thin} />
    </g>
  )
}

function Pterodactyl() {
  return (
    <g>
      <path d="M96 96 L14 54 Q20 92 40 108 Q60 104 76 116 Z" fill="#a78bfa" {...stroke} />
      <path d="M104 96 L186 54 Q180 92 160 108 Q140 104 124 116 Z" fill="#a78bfa" {...stroke} />
      <ellipse cx="100" cy="112" rx="24" ry="34" fill="#8b5cf6" {...stroke} />
      <path d="M90 140 L84 160 M110 140 L116 160" stroke={OUTLINE} strokeWidth="5" strokeLinecap="round" />
      <path d="M84 60 Q100 30 130 44 L160 52 L128 60 Q114 72 96 80 Q80 76 84 60 Z" fill="#8b5cf6" {...stroke} />
      <path d="M90 52 L66 28 L98 46" fill="#c4b5fd" {...thin} />
      <Eye x={104} y={54} r={5} />
    </g>
  )
}

function DinoEgg() {
  return (
    <g>
      <Shadow rx={50} />
      <path d="M100 18 C58 18 38 86 38 122 C38 162 66 182 100 182 C134 182 162 162 162 122 C162 86 142 18 100 18 Z" fill="#fef3c7" {...stroke} />
      {[[78, 64, 9], [120, 52, 7], [134, 104, 11], [70, 120, 12], [108, 148, 9], [96, 92, 6]].map(([x, y, r]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill="#86efac" />
      ))}
      <path d="M48 104 L70 92 L84 108 L102 90 L118 106 L136 92 L156 104" fill="none" {...stroke} />
      <ellipse cx="74" cy="56" rx="8" ry="16" transform="rotate(20 74 56)" fill="#fff" opacity="0.7" />
    </g>
  )
}

function Bone() {
  return (
    <g>
      <Shadow rx={70} />
      <g transform="rotate(-25 100 100)">
        <rect x="46" y="86" width="108" height="28" rx="10" fill="#fafaf9" {...stroke} />
        {[[40, 82], [40, 118], [160, 82], [160, 118]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="20" fill="#fafaf9" {...stroke} />
        ))}
        <rect x="44" y="88" width="112" height="24" fill="#fafaf9" />
      </g>
    </g>
  )
}

function Volcano() {
  return (
    <g>
      <path d="M62 52 Q48 36 58 22 Q74 10 86 26 Q100 6 118 22 Q136 14 140 34 Q154 44 140 58" fill="#94a3b8" opacity="0.8" {...thin} />
      <path d="M14 182 L76 66 L124 66 L186 182 Z" fill="#a16207" {...stroke} />
      <path d="M76 66 L124 66 L116 82 Q108 74 100 86 Q92 74 84 82 Z" fill="#ef4444" {...thin} />
      <path d="M96 84 Q90 120 70 136 Q84 136 92 124 Q96 150 84 168 Q104 150 104 120 Q110 134 120 136 Q106 116 104 84 Z" fill="#f97316" {...thin} />
      <path d="M80 60 Q86 40 94 54 M108 54 Q116 36 122 58" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
    </g>
  )
}

// A big three-toed print, seen from above.
function Footprint() {
  const toe = (angle) => (
    <g transform={`rotate(${angle} 100 126)`}>
      <path d="M86 112 Q84 70 100 40 Q116 70 114 112 Z" fill="#92400e" {...stroke} />
      <path d="M94 50 L100 30 L106 50 Z" fill={OUTLINE} />
    </g>
  )
  return (
    <g>
      {toe(-42)}
      {toe(0)}
      {toe(42)}
      <ellipse cx="100" cy="136" rx="36" ry="30" fill="#92400e" {...stroke} />
    </g>
  )
}

function Fossil() {
  return (
    <g>
      <path d="M22 70 Q24 30 70 26 L150 24 Q184 28 184 70 L180 150 Q176 182 134 182 L60 182 Q18 180 20 140 Z" fill="#d6d3d1" {...stroke} />
      <path d="M100 104 m-6 0 a6 6 0 1 1 12 0 a16 16 0 1 1 -32 0 a26 26 0 1 1 52 0 a36 36 0 1 1 -72 0 a46 46 0 1 1 92 0" fill="none" stroke="#78716c" strokeWidth="6" strokeLinecap="round" />
      {[[42, 50], [160, 52], [48, 160], [156, 158]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="4" fill="#a8a29e" />
      ))}
    </g>
  )
}

export const dinoArt = {
  dinosaur: Dinosaur,
  trex: Trex,
  triceratops: Triceratops,
  stegosaurus: Stegosaurus,
  pterodactyl: Pterodactyl,
  egg: DinoEgg,
  bone: Bone,
  volcano: Volcano,
  footprint: Footprint,
  fossil: Fossil,
}
