// Drawings for Under the Sea. (The whale is drawn with the alphabet song.)
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

const Smile = ({ x, y, w = 10 }) => <path d={`M${x - w} ${y} Q${x} ${y + w} ${x + w} ${y}`} fill="none" {...thin} />
const Cheek = ({ x, y }) => <circle cx={x} cy={y} r="7" fill="#f472b6" opacity="0.35" />

function Bubbles({ x = 170, y = 40 }) {
  return (
    <g fill="none" stroke="#38bdf8" strokeWidth="3">
      <circle cx={x} cy={y} r="8" />
      <circle cx={x + 10} cy={y - 18} r="5" />
      <circle cx={x - 4} cy={y - 30} r="3.5" />
    </g>
  )
}

function Shark() {
  return (
    <g>
      <path d="M98 54 L118 14 L134 60 Z" fill="#64748b" {...stroke} />
      <path d="M160 100 L196 66 L188 110 L196 150 L160 118 Z" fill="#64748b" {...stroke} />
      <path d="M8 112 C20 66 96 50 164 98 L164 120 C100 164 30 156 8 112 Z" fill="#94a3b8" {...stroke} />
      <path d="M12 118 C40 150 110 154 164 120 C110 140 50 140 12 118 Z" fill="#fff" />
      <path d="M86 132 L108 158 L112 128 Z" fill="#64748b" {...thin} />
      <Eye x={46} y={100} />
      <path d="M22 122 Q40 134 62 124" fill="none" {...thin} />
      <path d="M72 96 Q76 106 72 116 M82 96 Q86 106 82 116" fill="none" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

function Octopus() {
  const legs = [36, 62, 88, 112, 138, 164]
  return (
    <g>
      {legs.map((x, i) => (
        <path
          key={x}
          d={`M${80 + i * 8} 118 Q${x} 150 ${x + (i % 2 ? 12 : -12)} 184`}
          fill="none"
          stroke="#ec4899"
          strokeWidth="18"
          strokeLinecap="round"
        />
      ))}
      <path d="M40 104 C40 40 160 40 160 104 C160 130 132 136 100 136 C68 136 40 130 40 104 Z" fill="#f472b6" {...stroke} />
      <Eye x={80} y={98} r={9} />
      <Eye x={120} y={98} r={9} />
      <Smile x={100} y={116} w={10} />
      <Cheek x={64} y={116} />
      <Cheek x={136} y={116} />
      <circle cx="120" cy="58" r="6" fill="#fbcfe8" />
      <circle cx="80" cy="66" r="4" fill="#fbcfe8" />
    </g>
  )
}

function Crab() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={`M60 ${120 + i * 14} L${24 - i * 4} ${140 + i * 16}`} stroke="#ea580c" strokeWidth="8" strokeLinecap="round" />
          <path d={`M140 ${120 + i * 14} L${176 + i * 4} ${140 + i * 16}`} stroke="#ea580c" strokeWidth="8" strokeLinecap="round" />
        </g>
      ))}
      <path d="M58 104 L36 70 M142 104 L164 70" stroke="#ea580c" strokeWidth="9" strokeLinecap="round" />
      <path d="M36 70 C10 64 14 30 38 28 L44 48 L54 34 C66 46 56 72 36 70 Z" fill="#f97316" {...stroke} />
      <path d="M164 70 C190 64 186 30 162 28 L156 48 L146 34 C134 46 144 72 164 70 Z" fill="#f97316" {...stroke} />
      <path d="M86 92 L80 66 M114 92 L120 66" stroke={OUTLINE} strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="100" cy="128" rx="58" ry="40" fill="#f97316" {...stroke} />
      <circle cx="80" cy="62" r="10" fill="#fff" {...thin} />
      <circle cx="120" cy="62" r="10" fill="#fff" {...thin} />
      <circle cx="82" cy="63" r="4.5" fill={OUTLINE} />
      <circle cx="122" cy="63" r="4.5" fill={OUTLINE} />
      <Smile x={100} y={130} w={14} />
      <Cheek x={66} y={128} />
      <Cheek x={134} y={128} />
    </g>
  )
}

function Starfish() {
  const points = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    const r = i % 2 ? 36 : 84
    return `${100 + Math.cos(a) * r},${108 + Math.sin(a) * r}`
  }).join(' ')
  return (
    <g>
      <polygon points={points} fill="#fbbf24" {...stroke} strokeWidth="5" />
      {[[100, 44], [158, 90], [138, 160], [62, 160], [42, 90]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="4" fill="#f59e0b" />
      ))}
      <Eye x={86} y={102} />
      <Eye x={114} y={102} />
      <Smile x={100} y={118} w={10} />
    </g>
  )
}

function Jellyfish() {
  return (
    <g>
      {[64, 84, 104, 124, 140].map((x, i) => (
        <path key={x} d={`M${x} 110 q${i % 2 ? 12 : -12} 18 0 36 q${i % 2 ? -12 : 12} 18 0 36`} fill="none" stroke="#a78bfa" strokeWidth="7" strokeLinecap="round" />
      ))}
      <path d="M36 112 C36 40 164 40 164 112 Q148 104 132 114 Q116 104 100 114 Q84 104 68 114 Q52 104 36 112 Z" fill="#c4b5fd" {...stroke} />
      <Eye x={82} y={86} />
      <Eye x={118} y={86} />
      <Smile x={100} y={98} w={9} />
      <Cheek x={66} y={98} />
      <Cheek x={134} y={98} />
      <ellipse cx="74" cy="60" rx="7" ry="12" transform="rotate(-30 74 60)" fill="#fff" opacity="0.6" />
    </g>
  )
}

function Turtle() {
  return (
    <g>
      <ellipse cx="54" cy="150" rx="18" ry="12" fill="#86efac" {...stroke} />
      <ellipse cx="146" cy="150" rx="18" ry="12" fill="#86efac" {...stroke} />
      <circle cx="170" cy="96" r="24" fill="#86efac" {...stroke} />
      <path d="M24 130 C24 70 140 62 156 120 Z" fill="#16a34a" {...stroke} />
      <path d="M50 104 L72 86 L98 92 L104 118 L76 126 Z M104 118 L98 92 L124 86 L142 110" fill="none" stroke="#bbf7d0" strokeWidth="4" strokeLinejoin="round" />
      <path d="M20 130 L160 124" {...stroke} />
      <path d="M22 130 L8 140" stroke={OUTLINE} strokeWidth="4" strokeLinecap="round" />
      <Eye x={176} y={90} r={5} />
      <path d="M166 104 Q174 110 182 104" fill="none" {...thin} />
    </g>
  )
}

function Dolphin() {
  return (
    <g>
      <path d="M92 52 L104 22 L120 56 Z" fill="#3b82f6" {...stroke} />
      <path d="M150 124 L186 112 L176 140 L194 160 L152 146 Z" fill="#3b82f6" {...stroke} />
      <path d="M14 100 L34 92 C50 60 100 46 140 72 C160 86 166 108 156 140 C120 150 70 138 40 112 L16 112 Q8 106 14 100 Z" fill="#60a5fa" {...stroke} />
      <path d="M40 112 C70 132 120 142 154 138 C120 130 80 122 52 104 Z" fill="#dbeafe" />
      <path d="M90 112 L102 140 L112 116 Z" fill="#3b82f6" {...thin} />
      <Eye x={58} y={92} r={6} />
      <path d="M18 106 Q30 112 44 108" fill="none" {...thin} />
      <Bubbles x={30} y={60} />
    </g>
  )
}

function Seahorse() {
  return (
    <g>
      <path d="M96 64 C120 60 132 84 120 108 C108 132 120 150 132 152 C148 154 150 172 134 180 C112 190 90 170 90 146 C90 124 104 112 96 96" fill="#fbbf24" {...stroke} />
      <path d="M64 52 C64 30 96 22 112 38 L150 34 L148 50 L116 56 C120 76 104 88 84 84 C70 80 64 66 64 52 Z" fill="#fbbf24" {...stroke} />
      <path d="M82 30 L76 14 L90 22 L94 8 L102 24" fill="#f59e0b" {...thin} />
      <path d="M96 100 L78 110 L96 118" fill="#f59e0b" {...thin} />
      <path d="M100 74 L114 76 M100 96 L116 98 M96 122 L108 126" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
      <Eye x={88} y={50} r={6} />
      <Cheek x={80} y={66} />
      <Bubbles x={164} y={84} />
    </g>
  )
}

function Shell() {
  return (
    <g>
      <path d="M100 178 L70 158 L84 158 Z M100 178 L130 158 L116 158 Z" fill="#fda4af" {...thin} />
      <path d="M100 168 C40 160 20 118 30 90 C40 56 70 34 100 34 C130 34 160 56 170 90 C180 118 160 160 100 168 Z" fill="#fecdd3" {...stroke} />
      {[-60, -36, -12, 12, 36, 60].map((dx) => (
        <path key={dx} d={`M100 166 Q${100 + dx * 1.1} 110 ${100 + dx * 1.15} ${dx === -60 || dx === 60 ? 70 : 42}`} fill="none" stroke="#fb7185" strokeWidth="4" strokeLinecap="round" />
      ))}
      <ellipse cx="72" cy="78" rx="8" ry="14" transform="rotate(-25 72 78)" fill="#fff" opacity="0.6" />
    </g>
  )
}

export const seaArt = {
  shark: Shark,
  octopus: Octopus,
  crab: Crab,
  starfish: Starfish,
  jellyfish: Jellyfish,
  turtle: Turtle,
  dolphin: Dolphin,
  seahorse: Seahorse,
  shell: Shell,
}
