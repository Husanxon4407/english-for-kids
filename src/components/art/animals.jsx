// Original, simple SVG illustrations for the Animal Kingdom words.
import { OUTLINE, stroke } from './common.js'

function Eyes({ y = 90, left = 84, right = 116, r = 7 }) {
  return (
    <g>
      <circle cx={left} cy={y} r={r} fill={OUTLINE} />
      <circle cx={right} cy={y} r={r} fill={OUTLINE} />
      <circle cx={left + 2.5} cy={y - 2.5} r={2.4} fill="#fff" />
      <circle cx={right + 2.5} cy={y - 2.5} r={2.4} fill="#fff" />
    </g>
  )
}

function Cheeks({ y = 108, left = 70, right = 130 }) {
  return (
    <g fill="#f472b6" opacity="0.35">
      <circle cx={left} cy={y} r={8} />
      <circle cx={right} cy={y} r={8} />
    </g>
  )
}

function Cat() {
  return (
    <g>
      <path d="M138 168 Q188 156 172 108" fill="none" stroke={OUTLINE} strokeWidth="18" strokeLinecap="round" />
      <path d="M138 168 Q188 156 172 108" fill="none" stroke="#f59e42" strokeWidth="11" strokeLinecap="round" />
      <ellipse cx="100" cy="160" rx="44" ry="30" fill="#f59e42" {...stroke} />
      <ellipse cx="100" cy="166" rx="24" ry="18" fill="#fcd9a8" />
      <polygon points="58,78 56,30 94,54" fill="#f59e42" {...stroke} />
      <polygon points="142,78 144,30 106,54" fill="#f59e42" {...stroke} />
      <polygon points="64,64 63,42 82,55" fill="#f9a8c4" />
      <polygon points="136,64 137,42 118,55" fill="#f9a8c4" />
      <circle cx="100" cy="95" r="48" fill="#f59e42" {...stroke} />
      <path d="M88 52 L92 66 M100 49 L100 64 M112 52 L108 66" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="100" cy="114" rx="22" ry="15" fill="#fcd9a8" />
      <Eyes y={92} left={81} right={119} r={7.5} />
      <Cheeks y={110} left={68} right={132} />
      <path d="M93 106 L107 106 L100 114 Z" fill="#f472b6" {...stroke} strokeWidth="2.5" />
      <path d="M100 114 Q93 124 86 118 M100 114 Q107 124 114 118" fill="none" {...stroke} strokeWidth="3" />
      <path d="M68 110 L36 104 M68 117 L36 122 M132 110 L164 104 M132 117 L164 122" {...stroke} strokeWidth="2.5" />
      <ellipse cx="82" cy="187" rx="13" ry="8" fill="#fcd9a8" {...stroke} strokeWidth="3" />
      <ellipse cx="118" cy="187" rx="13" ry="8" fill="#fcd9a8" {...stroke} strokeWidth="3" />
    </g>
  )
}

function Dog() {
  return (
    <g>
      <path d="M138 160 Q172 146 164 116" fill="none" stroke={OUTLINE} strokeWidth="16" strokeLinecap="round" />
      <path d="M138 160 Q172 146 164 116" fill="none" stroke="#c58b52" strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="100" cy="162" rx="44" ry="30" fill="#c58b52" {...stroke} />
      <ellipse cx="100" cy="168" rx="24" ry="17" fill="#f1d6b6" />
      <circle cx="100" cy="92" r="46" fill="#e8c39e" {...stroke} />
      <ellipse cx="119" cy="84" rx="15" ry="17" fill="#c58b52" />
      <ellipse cx="56" cy="96" rx="15" ry="32" transform="rotate(18 56 96)" fill="#8b5a2b" {...stroke} />
      <ellipse cx="144" cy="96" rx="15" ry="32" transform="rotate(-18 144 96)" fill="#8b5a2b" {...stroke} />
      <Eyes y={86} left={83} right={117} />
      <ellipse cx="100" cy="114" rx="24" ry="17" fill="#fff5e6" {...stroke} strokeWidth="3" />
      <ellipse cx="100" cy="105" rx="9" ry="6.5" fill={OUTLINE} />
      <path d="M95 122 Q100 138 105 122 Z" fill="#f87171" {...stroke} strokeWidth="2.5" />
      <path d="M100 111 L100 118 M100 118 Q92 126 85 119 M100 118 Q108 126 115 119" fill="none" {...stroke} strokeWidth="3" />
      <ellipse cx="82" cy="188" rx="13" ry="8" fill="#e8c39e" {...stroke} strokeWidth="3" />
      <ellipse cx="118" cy="188" rx="13" ry="8" fill="#e8c39e" {...stroke} strokeWidth="3" />
    </g>
  )
}

function Cow() {
  return (
    <g>
      <ellipse cx="100" cy="166" rx="46" ry="28" fill="#fff" {...stroke} />
      <ellipse cx="80" cy="160" rx="13" ry="9" fill={OUTLINE} />
      <ellipse cx="124" cy="172" rx="10" ry="7" fill={OUTLINE} />
      <path d="M70 58 Q60 36 72 26" fill="none" stroke={OUTLINE} strokeWidth="13" strokeLinecap="round" />
      <path d="M70 58 Q60 36 72 26" fill="none" stroke="#f5e6c8" strokeWidth="7" strokeLinecap="round" />
      <path d="M130 58 Q140 36 128 26" fill="none" stroke={OUTLINE} strokeWidth="13" strokeLinecap="round" />
      <path d="M130 58 Q140 36 128 26" fill="none" stroke="#f5e6c8" strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="46" cy="78" rx="20" ry="10" transform="rotate(-20 46 78)" fill="#fff" {...stroke} />
      <ellipse cx="154" cy="78" rx="20" ry="10" transform="rotate(20 154 78)" fill="#fff" {...stroke} />
      <ellipse cx="46" cy="78" rx="11" ry="5" transform="rotate(-20 46 78)" fill="#f9b8c4" />
      <ellipse cx="154" cy="78" rx="11" ry="5" transform="rotate(20 154 78)" fill="#f9b8c4" />
      <ellipse cx="100" cy="94" rx="42" ry="46" fill="#fff" {...stroke} />
      <path d="M108 52 Q132 50 138 74 Q134 92 116 84 Q104 76 108 52 Z" fill={OUTLINE} />
      <Eyes y={90} left={82} right={118} />
      <ellipse cx="100" cy="124" rx="33" ry="21" fill="#f9b8c4" {...stroke} />
      <ellipse cx="89" cy="122" rx="4.5" ry="6" fill={OUTLINE} />
      <ellipse cx="111" cy="122" rx="4.5" ry="6" fill={OUTLINE} />
      <path d="M90 134 Q100 140 110 134" fill="none" {...stroke} strokeWidth="3" />
      <rect x="72" y="184" width="18" height="12" rx="4" fill="#6b4f3a" {...stroke} strokeWidth="3" />
      <rect x="110" y="184" width="18" height="12" rx="4" fill="#6b4f3a" {...stroke} strokeWidth="3" />
    </g>
  )
}

function Duck() {
  return (
    <g>
      <ellipse cx="100" cy="176" rx="86" ry="14" fill="#9fd8f5" />
      <path d="M30 176 Q45 168 60 176 T90 176 T120 176 T150 176 T172 176" fill="none" stroke="#60b8e6" strokeWidth="3" strokeLinecap="round" />
      <polygon points="156,128 186,106 176,146" fill="#fcd34d" {...stroke} />
      <ellipse cx="112" cy="142" rx="58" ry="36" fill="#fcd34d" {...stroke} />
      <ellipse cx="122" cy="140" rx="30" ry="18" transform="rotate(-10 122 140)" fill="#f5b82e" {...stroke} strokeWidth="3" />
      <circle cx="78" cy="84" r="34" fill="#fcd34d" {...stroke} />
      <path d="M76 52 Q72 40 82 42 Q80 34 90 40" fill="none" {...stroke} strokeWidth="3" />
      <path d="M48 86 Q22 90 30 102 Q46 108 60 98 Z" fill="#fb923c" {...stroke} />
      <path d="M34 98 Q46 98 56 95" fill="none" {...stroke} strokeWidth="2.5" />
      <circle cx="72" cy="76" r="7" fill={OUTLINE} />
      <circle cx="74.5" cy="73.5" r="2.4" fill="#fff" />
      <circle cx="88" cy="96" r="7" fill="#f472b6" opacity="0.35" />
    </g>
  )
}

function Bird() {
  return (
    <g>
      <path d="M14 172 Q100 160 188 166" fill="none" stroke="#7c5132" strokeWidth="11" strokeLinecap="round" />
      <ellipse cx="34" cy="160" rx="14" ry="7" transform="rotate(-25 34 160)" fill="#6cc04a" />
      <ellipse cx="170" cy="156" rx="14" ry="7" transform="rotate(25 170 156)" fill="#6cc04a" />
      <polygon points="146,118 188,100 182,138" fill="#3b82f6" {...stroke} />
      <path d="M86 160 L82 172 M96 160 L96 172 M116 160 L112 172 M126 160 L126 172" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
      <circle cx="104" cy="110" r="52" fill="#60a5fa" {...stroke} />
      <ellipse cx="100" cy="128" rx="32" ry="27" fill="#dbeafe" />
      <ellipse cx="146" cy="116" rx="18" ry="28" transform="rotate(20 146 116)" fill="#3b82f6" {...stroke} strokeWidth="3" />
      <path d="M98 60 Q90 40 102 44 Q104 32 114 46 Q118 40 116 60" fill="#60a5fa" {...stroke} strokeWidth="3" />
      <Eyes y={98} left={86} right={116} r={7} />
      <path d="M92 108 L110 108 L101 121 Z" fill="#fb923c" {...stroke} strokeWidth="3" />
      <Cheeks y={114} left={74} right={128} />
    </g>
  )
}

function Lion() {
  const mane = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2
    return { x: 100 + Math.cos(a) * 54, y: 92 + Math.sin(a) * 54 }
  })
  return (
    <g>
      <path d="M134 176 Q172 178 170 150" fill="none" stroke={OUTLINE} strokeWidth="12" strokeLinecap="round" />
      <path d="M134 176 Q172 178 170 150" fill="none" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
      <circle cx="170" cy="146" r="9" fill="#b45309" {...stroke} strokeWidth="3" />
      <ellipse cx="100" cy="172" rx="40" ry="24" fill="#fbbf24" {...stroke} />
      {mane.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="22" fill="#d97706" {...stroke} />
      ))}
      <circle cx="100" cy="92" r="54" fill="#d97706" />
      <circle cx="68" cy="54" r="13" fill="#fbbf24" {...stroke} />
      <circle cx="132" cy="54" r="13" fill="#fbbf24" {...stroke} />
      <circle cx="100" cy="96" r="44" fill="#fcd34d" {...stroke} />
      <Eyes y={88} left={84} right={116} />
      <Cheeks y={106} left={70} right={130} />
      <ellipse cx="100" cy="116" rx="21" ry="15" fill="#fef3c7" />
      <path d="M92 106 L108 106 L100 115 Z" fill="#7c2d12" {...stroke} strokeWidth="2.5" />
      <path d="M100 115 Q93 125 86 119 M100 115 Q107 125 114 119" fill="none" {...stroke} strokeWidth="3" />
      <ellipse cx="84" cy="192" rx="12" ry="7" fill="#fbbf24" {...stroke} strokeWidth="3" />
      <ellipse cx="116" cy="192" rx="12" ry="7" fill="#fbbf24" {...stroke} strokeWidth="3" />
    </g>
  )
}

export const animalArt = { cat: Cat, dog: Dog, cow: Cow, duck: Duck, bird: Bird, lion: Lion }
