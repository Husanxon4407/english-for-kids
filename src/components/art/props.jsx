// Things the stories need on their stages that no world teaches as a word.
import { OUTLINE, stroke } from './common.js'

function Bush() {
  return (
    <g>
      <ellipse cx="100" cy="182" rx="88" ry="10" fill="#000" opacity="0.1" />
      <circle cx="52" cy="138" r="44" fill="#22c55e" {...stroke} />
      <circle cx="148" cy="138" r="44" fill="#22c55e" {...stroke} />
      <circle cx="100" cy="112" r="56" fill="#4ade80" {...stroke} />
      <path d="M14 150 Q14 182 50 182 L150 182 Q186 182 186 150 Z" fill="#22c55e" />
      <path d="M8 156 Q10 184 48 184 L152 184 Q190 184 192 156" fill="none" {...stroke} />
      {[[70, 96], [128, 90], [100, 132], [48, 146], [156, 148]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="7" fill="#f472b6" stroke={OUTLINE} strokeWidth="2.5" />
      ))}
      <path d="M78 70 Q92 60 104 66" fill="none" stroke="#bbf7d0" strokeWidth="5" strokeLinecap="round" />
    </g>
  )
}

// The flames flicker, so the cake looks alive on the stage.
function Flame({ x }) {
  return (
    <path d={`M${x} 34 Q${x + 9} 48 ${x} 56 Q${x - 9} 48 ${x} 34 Z`} fill="#fbbf24" stroke="#f97316" strokeWidth="2.5">
      <animateTransform attributeName="transform" type="scale" values="1 1;1.1 0.86;0.92 1.08;1 1" dur="0.5s" additive="sum" repeatCount="indefinite" />
    </path>
  )
}

function Cake() {
  return (
    <g>
      <ellipse cx="100" cy="182" rx="76" ry="9" fill="#000" opacity="0.1" />
      <path d="M30 120 L30 168 Q100 190 170 168 L170 120 Z" fill="#f9a8d4" {...stroke} />
      <ellipse cx="100" cy="120" rx="70" ry="18" fill="#fce7f3" {...stroke} />
      <path d="M30 138 Q44 150 58 138 Q72 150 86 138 Q100 150 114 138 Q128 150 142 138 Q156 150 170 138" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      {[[60, '#60a5fa'], [100, '#4ade80'], [140, '#fbbf24']].map(([x, color]) => (
        <g key={x}>
          <rect x={x - 6} y="62" width="12" height="54" rx="4" fill={color} {...stroke} strokeWidth="3" />
          <path d={`M${x} 62 L${x} 54`} stroke={OUTLINE} strokeWidth="3" strokeLinecap="round" />
          <g style={{ transformOrigin: `${x}px 56px` }}>
            <Flame x={x} />
          </g>
        </g>
      ))}
      {[[50, 160, '#ef4444'], [86, 166, '#38bdf8'], [124, 166, '#a78bfa'], [156, 158, '#fbbf24']].map(([x, y, color]) => (
        <circle key={x} cx={x} cy={y} r="5" fill={color} />
      ))}
    </g>
  )
}

function Basket() {
  return (
    <g>
      <ellipse cx="100" cy="180" rx="74" ry="9" fill="#000" opacity="0.1" />
      <path d="M44 96 Q100 10 156 96" fill="none" stroke={OUTLINE} strokeWidth="16" strokeLinecap="round" />
      <path d="M44 96 Q100 10 156 96" fill="none" stroke="#d97706" strokeWidth="9" strokeLinecap="round" />
      <path d="M28 96 L172 96 L156 172 L44 172 Z" fill="#f59e0b" {...stroke} />
      <path d="M36 120 L164 120 M40 146 L160 146" stroke="#b45309" strokeWidth="5" />
      <path d="M70 96 L76 172 M100 96 L100 172 M130 96 L124 172" stroke="#b45309" strokeWidth="5" />
      {/* a red-and-white cloth peeking out */}
      <path d="M40 96 Q60 74 84 92 Q104 70 126 90 Q146 72 162 96 Z" fill="#fff" {...stroke} strokeWidth="3" />
      <path d="M60 86 L66 96 M100 80 L104 96 M136 84 L140 96" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
    </g>
  )
}

function Gift() {
  return (
    <g>
      <ellipse cx="100" cy="180" rx="66" ry="9" fill="#000" opacity="0.1" />
      <rect x="40" y="92" width="120" height="84" rx="8" fill="#60a5fa" {...stroke} />
      <rect x="32" y="74" width="136" height="28" rx="8" fill="#93c5fd" {...stroke} />
      <rect x="90" y="74" width="20" height="102" fill="#f472b6" {...stroke} strokeWidth="3" />
      <path d="M100 74 Q70 36 58 56 Q50 74 100 74 Q150 74 142 56 Q130 36 100 74 Z" fill="#f472b6" {...stroke} />
      <circle cx="100" cy="72" r="9" fill="#ec4899" {...stroke} strokeWidth="3" />
    </g>
  )
}

function PartyHat() {
  return (
    <g>
      <path d="M100 18 L150 176 Q100 192 50 176 Z" fill="#a78bfa" {...stroke} />
      <path d="M86 62 L114 62 L122 88 L78 88 Z M70 112 L130 112 L139 140 L61 140 Z" fill="#fde047" />
      <path d="M100 18 L150 176 Q100 192 50 176 Z" fill="none" {...stroke} />
      <circle cx="100" cy="18" r="15" fill="#f472b6" {...stroke} />
      {[[80, 160], [118, 158], [100, 100]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="5" fill="#fff" />
      ))}
    </g>
  )
}

export const propArt = { bush: Bush, cake: Cake, basket: Basket, gift: Gift, partyhat: PartyHat }
