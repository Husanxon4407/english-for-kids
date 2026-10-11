// Drawings for the words added when every world grew from six to ten.
import { OUTLINE, stroke } from './common.js'

const thin = { ...stroke, strokeWidth: 3 }
const SKIN = '#fcd9b8'

function Eyes({ points, r = 6 }) {
  return points.map(([x, y]) => (
    <g key={`${x}-${y}`}>
      <circle cx={x} cy={y} r={r} fill={OUTLINE} />
      <circle cx={x + r * 0.35} cy={y - r * 0.35} r={r * 0.35} fill="#fff" />
    </g>
  ))
}

const Smile = ({ x = 100, y, w = 12 }) => <path d={`M${x - w} ${y} Q${x} ${y + w} ${x + w} ${y}`} fill="none" {...thin} />

// --- Animal Kingdom ---------------------------------------------------------
function Horse() {
  return (
    <g>
      <path d="M70 60 L62 22 L90 46 Z M130 60 L138 22 L110 46 Z" fill="#b45309" {...stroke} />
      <path d="M100 30 Q140 30 150 70 Q160 100 146 120" fill="none" stroke="#78350f" strokeWidth="16" strokeLinecap="round" />
      <path d="M62 66 Q62 42 100 42 Q138 42 138 66 L132 120 Q134 176 100 176 Q66 176 68 120 Z" fill="#d97706" {...stroke} />
      <path d="M88 44 Q100 20 112 44 Q108 70 100 78 Q92 70 88 44 Z" fill="#78350f" {...thin} />
      <path d="M70 136 Q72 176 100 176 Q128 176 130 136 Q100 124 70 136 Z" fill="#fde2c8" {...thin} />
      <Eyes points={[[82, 100], [118, 100]]} r={7} />
      <circle cx="90" cy="150" r="4" fill={OUTLINE} />
      <circle cx="110" cy="150" r="4" fill={OUTLINE} />
      <Smile y={160} w={9} />
    </g>
  )
}

function Monkey() {
  return (
    <g>
      <circle cx="42" cy="92" r="24" fill="#92400e" {...stroke} />
      <circle cx="158" cy="92" r="24" fill="#92400e" {...stroke} />
      <circle cx="42" cy="92" r="12" fill="#fcd9a8" />
      <circle cx="158" cy="92" r="12" fill="#fcd9a8" />
      <circle cx="100" cy="100" r="62" fill="#92400e" {...stroke} />
      <path d="M100 56 C76 40 50 58 56 88 C40 120 66 150 100 150 C134 150 160 120 144 88 C150 58 124 40 100 56 Z" fill="#fcd9a8" />
      <Eyes points={[[80, 88], [120, 88]]} r={8} />
      <ellipse cx="100" cy="112" rx="7" ry="4" fill={OUTLINE} />
      <path d="M78 124 Q100 146 122 124" fill="none" {...stroke} strokeWidth="3.5" />
      <circle cx="66" cy="112" r="8" fill="#f472b6" opacity="0.35" />
      <circle cx="134" cy="112" r="8" fill="#f472b6" opacity="0.35" />
      <path d="M92 40 Q100 24 108 40" fill="none" stroke="#92400e" strokeWidth="6" strokeLinecap="round" />
    </g>
  )
}

function Elephant() {
  return (
    <g>
      <path d="M52 62 C6 50 2 124 40 138 C52 124 56 96 52 62 Z M148 62 C194 50 198 124 160 138 C148 124 144 96 148 62 Z" fill="#94a3b8" {...stroke} />
      <path d="M48 76 C22 76 22 118 42 124 Z M152 76 C178 76 178 118 158 124 Z" fill="#fbcfe8" />
      <path d="M100 34 C60 34 46 66 50 100 C52 126 70 138 84 138 L84 164 Q84 186 104 186 Q124 186 122 168" fill="#cbd5e1" {...stroke} />
      <path d="M100 34 C140 34 154 66 150 100 C148 126 130 138 116 138 L116 150" fill="#cbd5e1" {...stroke} />
      <path d="M84 138 L116 138 L116 152 Q116 172 104 172 Q100 172 100 164 L100 138 Z" fill="#cbd5e1" />
      <path d="M86 150 L114 150 M86 162 L100 162" {...thin} strokeWidth="2.5" />
      <Eyes points={[[76, 90], [124, 90]]} r={7} />
      <circle cx="62" cy="108" r="8" fill="#f472b6" opacity="0.4" />
      <circle cx="138" cy="108" r="8" fill="#f472b6" opacity="0.4" />
    </g>
  )
}

// --- Fruit Garden -----------------------------------------------------------
function Watermelon() {
  return (
    <g>
      <path d="M14 76 A86 86 0 0 0 186 76 Z" fill="#22c55e" {...stroke} />
      <path d="M28 76 A72 72 0 0 0 172 76 Z" fill="#f0fdf4" />
      <path d="M38 76 A62 62 0 0 0 162 76 Z" fill="#f43f5e" />
      {[[70, 96], [100, 92], [130, 96], [84, 118], [116, 118], [100, 138]].map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="4" ry="6.5" fill={OUTLINE} />
      ))}
      <path d="M14 76 L186 76" {...stroke} />
    </g>
  )
}

function Lemon() {
  return (
    <g>
      <ellipse cx="100" cy="184" rx="52" ry="6" fill="#000" opacity="0.1" />
      <path d="M30 104 C30 60 70 42 104 44 C132 44 150 54 166 74 L186 70 L178 96 C184 136 152 164 104 164 C64 164 44 150 34 132 L16 130 Z" fill="#fde047" {...stroke} />
      <ellipse cx="78" cy="78" rx="12" ry="22" transform="rotate(50 78 78)" fill="#fff" opacity="0.6" />
      <path d="M150 50 Q170 24 190 34 Q178 56 156 58 Z" fill="#4ade80" {...thin} />
      <Eyes points={[[86, 106], [122, 106]]} r={5.5} />
      <Smile x={104} y={120} w={10} />
    </g>
  )
}

function Cherry() {
  return (
    <g>
      <path d="M66 118 Q76 54 122 28 Q122 70 136 110" fill="none" stroke="#15803d" strokeWidth="6" strokeLinecap="round" />
      <path d="M122 28 Q156 14 178 34 Q156 54 122 28 Z" fill="#4ade80" {...thin} />
      <circle cx="62" cy="142" r="38" fill="#e11d48" {...stroke} />
      <circle cx="138" cy="134" r="38" fill="#f43f5e" {...stroke} />
      <ellipse cx="48" cy="128" rx="7" ry="12" transform="rotate(30 48 128)" fill="#fff" opacity="0.6" />
      <ellipse cx="124" cy="120" rx="7" ry="12" transform="rotate(30 124 120)" fill="#fff" opacity="0.6" />
    </g>
  )
}

function Pineapple() {
  return (
    <g>
      <path d="M100 76 L78 20 L96 46 L100 8 L104 46 L122 20 Z" fill="#22c55e" {...stroke} />
      <path d="M100 82 L60 44 L88 62 Z M100 82 L140 44 L112 62 Z" fill="#4ade80" {...thin} />
      <ellipse cx="100" cy="130" rx="54" ry="62" fill="#fbbf24" {...stroke} />
      <path d="M56 100 L132 180 M70 82 L150 160 M96 70 L154 128 M144 100 L68 180 M130 82 L50 160 M104 70 L46 128" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

// --- Toy Town ---------------------------------------------------------------
function Robot() {
  return (
    <g>
      <path d="M100 30 L100 12" {...stroke} />
      <circle cx="100" cy="10" r="8" fill="#ef4444" {...thin} />
      <rect x="20" y="104" width="22" height="54" rx="10" fill="#94a3b8" {...stroke} />
      <rect x="158" y="104" width="22" height="54" rx="10" fill="#94a3b8" {...stroke} />
      <rect x="66" y="162" width="24" height="30" rx="8" fill="#64748b" {...stroke} />
      <rect x="110" y="162" width="24" height="30" rx="8" fill="#64748b" {...stroke} />
      <rect x="46" y="96" width="108" height="74" rx="16" fill="#38bdf8" {...stroke} />
      <rect x="54" y="28" width="92" height="66" rx="18" fill="#7dd3fc" {...stroke} />
      <circle cx="80" cy="58" r="12" fill="#fff" {...thin} />
      <circle cx="120" cy="58" r="12" fill="#fff" {...thin} />
      <circle cx="80" cy="58" r="5" fill={OUTLINE} />
      <circle cx="120" cy="58" r="5" fill={OUTLINE} />
      <path d="M82 80 L118 80" {...stroke} />
      <circle cx="78" cy="124" r="9" fill="#fde047" {...thin} />
      <circle cx="100" cy="124" r="9" fill="#f472b6" {...thin} />
      <circle cx="122" cy="124" r="9" fill="#4ade80" {...thin} />
      <rect x="68" y="144" width="64" height="12" rx="6" fill="#fff" {...thin} />
    </g>
  )
}

function Drum() {
  return (
    <g>
      <path d="M22 28 L92 76 M178 28 L108 76" stroke="#a16207" strokeWidth="8" strokeLinecap="round" />
      <circle cx="20" cy="26" r="11" fill="#fde047" {...thin} />
      <circle cx="180" cy="26" r="11" fill="#fde047" {...thin} />
      <path d="M30 90 L30 156 Q30 182 100 182 Q170 182 170 156 L170 90 Z" fill="#ef4444" {...stroke} />
      <path d="M30 104 L66 164 L100 110 L134 164 L170 104" fill="none" stroke="#fde047" strokeWidth="5" strokeLinejoin="round" />
      <path d="M30 156 Q30 182 100 182 Q170 182 170 156" fill="none" stroke="#fbbf24" strokeWidth="9" />
      <path d="M30 156 Q30 182 100 182 Q170 182 170 156" fill="none" {...thin} transform="translate(0 5)" />
      <ellipse cx="100" cy="90" rx="70" ry="24" fill="#fef3c7" {...stroke} />
    </g>
  )
}

function Balloon() {
  return (
    <g>
      <path d="M100 132 Q84 158 104 174 Q120 186 100 198" fill="none" {...thin} />
      <path d="M100 12 C56 12 38 50 42 80 C46 110 80 128 100 132 C120 128 154 110 158 80 C162 50 144 12 100 12 Z" fill="#f43f5e" {...stroke} />
      <path d="M90 132 L110 132 L104 144 L96 144 Z" fill="#e11d48" {...thin} />
      <ellipse cx="74" cy="52" rx="10" ry="20" transform="rotate(25 74 52)" fill="#fff" opacity="0.6" />
      <Eyes points={[[84, 78], [116, 78]]} r={5.5} />
      <Smile y={92} w={10} />
    </g>
  )
}

// --- My Little Home ---------------------------------------------------------
function Sofa() {
  return (
    <g>
      <rect x="40" y="166" width="14" height="18" rx="5" fill="#a16207" {...thin} />
      <rect x="146" y="166" width="14" height="18" rx="5" fill="#a16207" {...thin} />
      <path d="M38 60 Q38 42 58 42 L142 42 Q162 42 162 60 L162 130 L38 130 Z" fill="#a78bfa" {...stroke} />
      <path d="M100 46 L100 124" {...thin} />
      <rect x="34" y="118" width="132" height="44" rx="12" fill="#c4b5fd" {...stroke} />
      <path d="M12 104 Q12 84 30 84 Q48 84 48 104 L48 170 L12 170 Z M152 104 Q152 84 170 84 Q188 84 188 104 L188 170 L152 170 Z" fill="#8b5cf6" {...stroke} />
      <rect x="62" y="84" width="34" height="34" rx="8" fill="#fde047" transform="rotate(-10 79 101)" {...thin} />
    </g>
  )
}

function Clock() {
  return (
    <g>
      <path d="M52 44 L28 22 M148 44 L172 22" stroke={OUTLINE} strokeWidth="10" strokeLinecap="round" />
      <circle cx="30" cy="26" r="20" fill="#f87171" {...stroke} />
      <circle cx="170" cy="26" r="20" fill="#f87171" {...stroke} />
      <path d="M62 170 L48 190 M138 170 L152 190" stroke={OUTLINE} strokeWidth="9" strokeLinecap="round" />
      <circle cx="100" cy="108" r="74" fill="#f87171" {...stroke} />
      <circle cx="100" cy="108" r="58" fill="#fff" {...thin} />
      {[0, 90, 180, 270].map((a) => (
        <path key={a} d="M100 58 L100 68" {...stroke} transform={`rotate(${a} 100 108)`} />
      ))}
      <path d="M100 108 L100 70 M100 108 L128 122" {...stroke} strokeWidth="5" />
      <circle cx="100" cy="108" r="6" fill={OUTLINE} />
    </g>
  )
}

function Bath() {
  return (
    <g>
      {[[58, 40, 16], [84, 26, 12], [112, 38, 18], [140, 28, 11], [36, 58, 10]].map(([x, y, r]) => (
        <circle key={x} cx={x} cy={y} r={r} fill="#e0f2fe" {...thin} />
      ))}
      <path d="M160 96 L160 54 Q160 36 176 36 Q190 36 190 50" fill="none" {...stroke} strokeWidth="7" />
      <rect x="50" y="170" width="16" height="20" rx="6" fill="#94a3b8" {...thin} />
      <rect x="134" y="170" width="16" height="20" rx="6" fill="#94a3b8" {...thin} />
      <path d="M22 96 L178 96 L170 140 Q164 176 126 176 L74 176 Q36 176 30 140 Z" fill="#fff" {...stroke} />
      <path d="M36 110 Q60 100 84 110 T132 110 T166 110" fill="none" stroke="#7dd3fc" strokeWidth="6" strokeLinecap="round" />
      <rect x="10" y="84" width="180" height="16" rx="8" fill="#bae6fd" {...stroke} />
      <path d="M84 66 Q100 50 116 66 Q118 80 100 82 Q82 80 84 66 Z" fill="#fde047" {...thin} />
      <circle cx="94" cy="66" r="3" fill={OUTLINE} />
      <path d="M114 68 L126 70 L114 74 Z" fill="#fb923c" {...thin} strokeWidth="2" />
    </g>
  )
}

// --- My Body ----------------------------------------------------------------
// A child's face, used for "head" and (with long hair) for "hair".
function Face({ y = 0 }) {
  return (
    <g transform={`translate(0 ${y})`}>
      <circle cx="42" cy="110" r="14" fill={SKIN} {...stroke} />
      <circle cx="158" cy="110" r="14" fill={SKIN} {...stroke} />
      <circle cx="100" cy="106" r="60" fill={SKIN} {...stroke} />
      <Eyes points={[[78, 104], [122, 104]]} r={7} />
      <circle cx="66" cy="124" r="10" fill="#f472b6" opacity="0.4" />
      <circle cx="134" cy="124" r="10" fill="#f472b6" opacity="0.4" />
      <path d="M96 118 Q100 124 104 118" fill="none" {...thin} />
      <Smile y={132} w={16} />
    </g>
  )
}

function Head() {
  return (
    <g>
      <path d="M72 162 L72 196 L128 196 L128 162 Z" fill={SKIN} {...stroke} />
      <Face />
      <path d="M42 96 Q44 42 100 42 Q156 42 158 96 Q140 66 100 70 Q60 66 42 96 Z" fill="#92400e" {...stroke} />
    </g>
  )
}

function Hair() {
  return (
    <g>
      <path d="M34 108 Q26 30 100 28 Q174 30 166 108 L176 186 Q150 196 132 176 L132 120 L68 120 L68 176 Q50 196 24 186 Z" fill="#f59e0b" {...stroke} />
      <Face y={6} />
      <path d="M40 104 Q46 44 100 46 Q154 44 160 104 Q136 76 100 80 Q64 76 40 104 Z" fill="#f59e0b" {...stroke} />
      <path d="M148 52 l10 -14 l6 16 l16 4 l-14 10 l2 16 l-14 -9 Z" fill="#f472b6" {...thin} />
    </g>
  )
}

function Arms() {
  return (
    <g>
      <path d="M64 96 L22 44 M136 96 L178 44" stroke={OUTLINE} strokeWidth="34" strokeLinecap="round" />
      <path d="M64 96 L22 44 M136 96 L178 44" stroke={SKIN} strokeWidth="26" strokeLinecap="round" />
      <circle cx="20" cy="40" r="18" fill={SKIN} {...stroke} />
      <circle cx="180" cy="40" r="18" fill={SKIN} {...stroke} />
      <path d="M60 80 Q60 68 74 68 L126 68 Q140 68 140 80 L146 190 L54 190 Z" fill="#38bdf8" {...stroke} />
      <path d="M84 68 Q100 86 116 68" fill={SKIN} {...thin} />
      <path d="M100 108 l6 13 l14 2 l-10 9 l3 14 l-13 -7 l-13 7 l3 -14 l-10 -9 l14 -2 Z" fill="#fde047" {...thin} />
    </g>
  )
}

function Legs() {
  return (
    <g>
      <path d="M44 14 L156 14 L150 74 L50 74 Z" fill="#3b82f6" {...stroke} />
      <path d="M100 30 L100 74" {...thin} />
      <rect x="54" y="70" width="34" height="84" rx="14" fill={SKIN} {...stroke} />
      <rect x="112" y="70" width="34" height="84" rx="14" fill={SKIN} {...stroke} />
      <path d="M54 140 L88 140 L88 152 Q88 160 80 160 L62 160 Q54 160 54 152 Z M112 140 L146 140 L146 152 Q146 160 138 160 L120 160 Q112 160 112 152 Z" fill="#fff" {...thin} />
      <path d="M34 186 Q32 160 56 158 L88 158 Q94 158 94 166 L94 186 Z M106 186 L106 166 Q106 158 112 158 L144 158 Q168 160 166 186 Z" fill="#ef4444" {...stroke} />
    </g>
  )
}

// --- Shape Castle -----------------------------------------------------------
function Arrow() {
  return (
    <g>
      <path d="M14 78 L106 78 L106 40 L188 100 L106 160 L106 122 L14 122 Z" fill="#fb923c" {...stroke} />
      <Eyes points={[[72, 94], [102, 94]]} r={5} />
      <Smile x={87} y={104} w={9} />
    </g>
  )
}

function Cross() {
  return (
    <g>
      <path d="M72 18 L128 18 L128 72 L182 72 L182 128 L128 128 L128 182 L72 182 L72 128 L18 128 L18 72 L72 72 Z" fill="#4ade80" {...stroke} />
      <Eyes points={[[86, 94], [114, 94]]} r={5} />
      <Smile y={106} w={10} />
    </g>
  )
}

// --- Sunny Sky --------------------------------------------------------------
function Wind() {
  return (
    <g>
      <path d="M22 132 Q-2 132 4 108 Q8 90 28 90 Q32 62 62 62 Q84 62 92 82 Q116 78 122 102 Q126 132 96 132 Z" fill="#fff" {...stroke} />
      <Eyes points={[[48, 100], [76, 100]]} r={5} />
      <circle cx="92" cy="112" r="9" fill="none" {...thin} />
      <path d="M108 100 L176 100 Q194 100 194 84 Q194 70 180 70 Q168 70 168 82 M104 120 L160 120 M110 140 L170 140 Q186 140 186 154 Q186 166 174 166" fill="none" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
      <path d="M40 160 Q56 150 72 160 M30 180 Q52 168 74 180" fill="none" stroke="#7dd3fc" strokeWidth="6" strokeLinecap="round" />
    </g>
  )
}

function Lightning() {
  return (
    <g>
      <path d="M40 102 Q10 102 14 74 Q18 52 42 52 Q46 20 82 20 Q110 20 120 42 Q152 36 160 64 Q182 70 176 90 Q172 104 150 102 Z" fill="#64748b" {...stroke} />
      <Eyes points={[[78, 66], [112, 66]]} r={5.5} />
      <path d="M84 82 Q95 74 106 82" fill="none" {...thin} />
      <path d="M108 96 L70 142 L98 142 L80 192 L138 126 L108 126 L126 96 Z" fill="#fde047" {...stroke} />
    </g>
  )
}

function Snowman() {
  return (
    <g>
      <ellipse cx="100" cy="188" rx="64" ry="7" fill="#000" opacity="0.1" />
      <path d="M56 116 L20 92 M144 116 L180 92" stroke="#92400e" strokeWidth="7" strokeLinecap="round" />
      <circle cx="100" cy="140" r="48" fill="#fff" {...stroke} />
      <circle cx="100" cy="72" r="36" fill="#fff" {...stroke} />
      <rect x="70" y="14" width="60" height="30" rx="5" fill="#334155" {...stroke} />
      <rect x="58" y="40" width="84" height="10" rx="5" fill="#334155" {...stroke} />
      <path d="M66 100 Q100 116 134 100 L138 112 Q100 128 62 112 Z" fill="#ef4444" {...thin} />
      <Eyes points={[[88, 66], [112, 66]]} r={5} />
      <path d="M100 76 L126 82 L100 88 Z" fill="#fb923c" {...thin} />
      <circle cx="100" cy="132" r="5" fill={OUTLINE} />
      <circle cx="100" cy="152" r="5" fill={OUTLINE} />
    </g>
  )
}

export const moreArt = {
  horse: Horse,
  monkey: Monkey,
  elephant: Elephant,
  watermelon: Watermelon,
  lemon: Lemon,
  cherry: Cherry,
  pineapple: Pineapple,
  robot: Robot,
  drum: Drum,
  balloon: Balloon,
  sofa: Sofa,
  clock: Clock,
  bath: Bath,
  head: Head,
  hair: Hair,
  arms: Arms,
  legs: Legs,
  arrow: Arrow,
  cross: Cross,
  wind: Wind,
  lightning: Lightning,
  snowman: Snowman,
}
