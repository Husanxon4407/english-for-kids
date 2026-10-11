// Pictures for the words the alphabet song sings ("E is for egg...") that the
// worlds do not teach yet, plus a few things the newer songs are about.
import { OUTLINE, stroke } from './common.js'

const thin = { ...stroke, strokeWidth: 3 }

function Dots({ points, r = 6 }) {
  return (
    <g fill={OUTLINE}>
      {points.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
      ))}
    </g>
  )
}

function Egg() {
  return (
    <g>
      <ellipse cx="100" cy="182" rx="48" ry="7" fill="#000" opacity="0.1" />
      <path d="M100 22 C60 22 40 86 40 122 C40 160 68 180 100 180 C132 180 160 160 160 122 C160 86 140 22 100 22 Z" fill="#fff7e6" {...stroke} />
      <ellipse cx="76" cy="74" rx="10" ry="20" transform="rotate(20 76 74)" fill="#fff" />
      <Dots points={[[84, 118], [116, 118]]} />
      <path d="M88 136 Q100 148 112 136" fill="none" {...thin} />
      <circle cx="70" cy="134" r="8" fill="#f472b6" opacity="0.35" />
      <circle cx="130" cy="134" r="8" fill="#f472b6" opacity="0.35" />
    </g>
  )
}

function Fish() {
  return (
    <g>
      <path d="M148 100 L190 64 L184 100 L190 136 Z" fill="#fb923c" {...stroke} />
      <path d="M92 52 Q112 26 132 50 Z M96 148 Q112 172 128 150 Z" fill="#fb923c" {...stroke} />
      <ellipse cx="92" cy="100" rx="72" ry="50" fill="#fdba74" {...stroke} />
      <path d="M96 54 Q118 100 96 146 M124 62 Q140 100 124 138" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" opacity="0.8" />
      <circle cx="56" cy="88" r="13" fill="#fff" {...thin} />
      <circle cx="54" cy="89" r="6" fill={OUTLINE} />
      <path d="M30 112 Q42 122 54 114" fill="none" {...thin} />
      <circle cx="18" cy="60" r="6" fill="#bae6fd" {...thin} />
      <circle cx="30" cy="38" r="9" fill="#bae6fd" {...thin} />
    </g>
  )
}

function Goat() {
  return (
    <g>
      <path d="M70 52 Q52 20 74 12 Q72 34 86 46 Z M130 52 Q148 20 126 12 Q128 34 114 46 Z" fill="#d6c7a8" {...stroke} />
      <path d="M52 84 L20 70 L34 100 Z M148 84 L180 70 L166 100 Z" fill="#f5f0e6" {...stroke} />
      <path d="M56 70 Q56 44 100 44 Q144 44 144 70 L138 124 Q134 156 100 156 Q66 156 62 124 Z" fill="#f5f0e6" {...stroke} />
      <path d="M86 156 L100 190 L114 156 Z" fill="#f5f0e6" {...stroke} />
      <ellipse cx="100" cy="128" rx="26" ry="18" fill="#fde2c8" {...thin} />
      <Dots points={[[80, 88], [120, 88]]} r={7} />
      <Dots points={[[92, 124], [108, 124]]} r={3.5} />
      <path d="M90 136 Q100 144 110 136" fill="none" {...thin} />
    </g>
  )
}

function Hat() {
  return (
    <g>
      <ellipse cx="100" cy="176" rx="76" ry="8" fill="#000" opacity="0.1" />
      <ellipse cx="100" cy="146" rx="88" ry="22" fill="#fbbf24" {...stroke} />
      <path d="M52 146 L58 66 Q60 38 100 38 Q140 38 142 66 L148 146 Q100 162 52 146 Z" fill="#fde047" {...stroke} />
      <path d="M54 124 Q100 140 146 124 L148 146 Q100 162 52 146 Z" fill="#ef4444" {...thin} />
      <path d="M124 118 L150 102 L146 132 Z M124 118 L152 138 L134 142 Z" fill="#ef4444" {...thin} />
    </g>
  )
}

function IceCream() {
  return (
    <g>
      <path d="M62 104 L100 192 L138 104 Z" fill="#f4b860" {...stroke} />
      <path d="M72 112 L118 150 M90 106 L128 138 M128 112 L84 150 M110 106 L74 136" stroke="#c98a2b" strokeWidth="3" strokeLinecap="round" />
      <circle cx="78" cy="88" r="30" fill="#fbcfe8" {...stroke} />
      <circle cx="122" cy="88" r="30" fill="#fef3c7" {...stroke} />
      <circle cx="100" cy="54" r="32" fill="#a7f3d0" {...stroke} />
      <circle cx="100" cy="20" r="11" fill="#ef4444" {...thin} />
      <Dots points={[[90, 52], [110, 52]]} r={4.5} />
      <path d="M92 62 Q100 70 108 62" fill="none" {...thin} />
    </g>
  )
}

// A child in mid-air, arms up.
function Jump() {
  return (
    <g>
      <ellipse cx="100" cy="186" rx="40" ry="6" fill="#000" opacity="0.12" />
      <path d="M34 150 L22 162 M40 170 L24 176 M166 150 L178 162 M160 170 L176 176" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
      <path d="M76 84 L44 46 M124 84 L156 46" stroke="#fde2c8" strokeWidth="14" strokeLinecap="round" />
      <path d="M86 128 L66 158 L52 152 M114 128 L134 158 L148 152" fill="none" stroke="#3b82f6" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="72" y="76" width="56" height="60" rx="18" fill="#fb7185" {...stroke} />
      <circle cx="100" cy="48" r="30" fill="#fde2c8" {...stroke} />
      <path d="M70 44 Q76 14 100 16 Q124 14 130 44 Q112 30 100 34 Q88 30 70 44 Z" fill="#92400e" {...thin} />
      <Dots points={[[90, 50], [110, 50]]} r={4.5} />
      <path d="M90 60 Q100 72 110 60 Z" fill="#7a2840" {...thin} />
    </g>
  )
}

function Kite() {
  return (
    <g>
      <path d="M100 136 Q120 160 96 176 Q78 188 100 198" fill="none" {...thin} />
      <path d="M100 150 l-14 -6 l2 12 Z M104 172 l14 -6 l-2 12 Z" fill="#fbbf24" {...thin} />
      <path d="M100 10 L156 72 L100 136 L44 72 Z" fill="#f87171" {...stroke} />
      <path d="M100 10 L156 72 L100 72 Z" fill="#fbbf24" />
      <path d="M44 72 L100 72 L100 136 Z" fill="#60a5fa" />
      <path d="M100 72 L156 72 L100 136 Z" fill="#4ade80" />
      <path d="M100 10 L156 72 L100 136 L44 72 Z M100 10 L100 136 M44 72 L156 72" fill="none" {...stroke} />
    </g>
  )
}

function Lamb() {
  return (
    <g>
      <rect x="66" y="150" width="14" height="36" rx="6" fill="#57534e" {...thin} />
      <rect x="120" y="150" width="14" height="36" rx="6" fill="#57534e" {...thin} />
      <g fill="#fff" {...stroke}>
        <circle cx="62" cy="122" r="28" />
        <circle cx="100" cy="134" r="30" />
        <circle cx="138" cy="122" r="28" />
        <circle cx="80" cy="96" r="26" />
        <circle cx="122" cy="96" r="26" />
      </g>
      <circle cx="100" cy="118" r="30" fill="#fff" />
      <path d="M62 62 L40 54 L50 78 Z M138 62 L160 54 L150 78 Z" fill="#fde2c8" {...thin} />
      <ellipse cx="100" cy="72" rx="34" ry="32" fill="#fde2c8" {...stroke} />
      <g fill="#fff" {...thin}>
        <circle cx="84" cy="44" r="13" />
        <circle cx="100" cy="38" r="14" />
        <circle cx="116" cy="44" r="13" />
      </g>
      <Dots points={[[87, 70], [113, 70]]} r={5.5} />
      <path d="M94 84 L106 84 L100 91 Z" fill="#f472b6" {...thin} />
      <path d="M92 94 Q100 100 108 94" fill="none" {...thin} />
    </g>
  )
}

// A butterfly net.
function Net() {
  return (
    <g>
      <path d="M124 104 L182 186" stroke="#a16207" strokeWidth="11" strokeLinecap="round" />
      <path d="M26 70 Q30 150 96 164 Q130 140 142 70 Z" fill="#e0f2fe" {...stroke} />
      <path d="M44 74 Q52 132 96 160 M70 74 Q80 124 108 150 M100 74 Q112 110 124 126 M32 96 L138 96 M40 122 L128 122 M62 146 L112 146" fill="none" stroke="#7dd3fc" strokeWidth="3" />
      <ellipse cx="84" cy="70" rx="58" ry="16" fill="#fff" {...stroke} />
      <g transform="translate(150 40) rotate(-15)">
        <path d="M0 0 Q-22 -26 -24 -4 Q-24 12 0 0 Q-18 22 -6 26 Q4 24 0 0 Z" fill="#f472b6" {...thin} />
        <path d="M0 0 Q22 -26 24 -4 Q24 12 0 0 Q18 22 6 26 Q-4 24 0 0 Z" fill="#fb923c" {...thin} />
      </g>
    </g>
  )
}

function Owl() {
  return (
    <g>
      <path d="M40 176 L160 176" stroke="#a16207" strokeWidth="12" strokeLinecap="round" />
      <path d="M52 50 L44 18 L78 38 Z M148 50 L156 18 L122 38 Z" fill="#a16207" {...stroke} />
      <path d="M100 30 C52 30 40 74 40 112 C40 152 66 174 100 174 C134 174 160 152 160 112 C160 74 148 30 100 30 Z" fill="#b45309" {...stroke} />
      <path d="M100 96 C76 96 64 118 64 138 C64 160 82 170 100 170 C118 170 136 160 136 138 C136 118 124 96 100 96 Z" fill="#fde68a" />
      <path d="M78 124 l8 8 l8 -8 M106 124 l8 8 l8 -8 M92 146 l8 8 l8 -8" fill="none" stroke="#d97706" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="76" cy="78" r="26" fill="#fff" {...stroke} />
      <circle cx="124" cy="78" r="26" fill="#fff" {...stroke} />
      <Dots points={[[78, 80], [122, 80]]} r={11} />
      <circle cx="82" cy="76" r="3.5" fill="#fff" />
      <circle cx="126" cy="76" r="3.5" fill="#fff" />
      <path d="M92 94 L108 94 L100 110 Z" fill="#fb923c" {...thin} />
      <path d="M78 176 l-6 10 M86 176 l0 10 M114 176 l0 10 M122 176 l6 10" stroke="#fb923c" strokeWidth="5" strokeLinecap="round" />
    </g>
  )
}

// "P is for pet": a hamster.
function Pet() {
  return (
    <g>
      <ellipse cx="100" cy="184" rx="60" ry="7" fill="#000" opacity="0.1" />
      <circle cx="54" cy="52" r="20" fill="#fdba74" {...stroke} />
      <circle cx="146" cy="52" r="20" fill="#fdba74" {...stroke} />
      <circle cx="54" cy="52" r="9" fill="#fbcfe8" />
      <circle cx="146" cy="52" r="9" fill="#fbcfe8" />
      <path d="M100 36 C46 36 28 84 28 122 C28 160 60 180 100 180 C140 180 172 160 172 122 C172 84 154 36 100 36 Z" fill="#fdba74" {...stroke} />
      <path d="M100 82 C70 82 52 110 52 134 C52 160 74 174 100 174 C126 174 148 160 148 134 C148 110 130 82 100 82 Z" fill="#fff7ed" />
      <Dots points={[[76, 92], [124, 92]]} r={8} />
      <circle cx="79" cy="89" r="2.6" fill="#fff" />
      <circle cx="127" cy="89" r="2.6" fill="#fff" />
      <path d="M93 108 L107 108 L100 116 Z" fill="#f472b6" {...thin} />
      <path d="M100 116 L100 124 M88 126 Q94 132 100 124 Q106 132 112 126" fill="none" {...thin} />
      <circle cx="62" cy="116" r="10" fill="#f472b6" opacity="0.35" />
      <circle cx="138" cy="116" r="10" fill="#f472b6" opacity="0.35" />
      <ellipse cx="74" cy="176" rx="14" ry="8" fill="#fbcfe8" {...thin} />
      <ellipse cx="126" cy="176" rx="14" ry="8" fill="#fbcfe8" {...thin} />
    </g>
  )
}

function Queen() {
  return (
    <g>
      <path d="M48 196 Q48 140 100 140 Q152 140 152 196 Z" fill="#a855f7" {...stroke} />
      <path d="M84 142 L100 164 L116 142 Z" fill="#fde047" {...thin} />
      <path d="M56 96 Q44 150 62 158 L138 158 Q156 150 144 96 Z" fill="#92400e" {...stroke} />
      <circle cx="100" cy="102" r="42" fill="#fde2c8" {...stroke} />
      <path d="M58 98 Q62 60 100 60 Q138 60 142 98 Q120 74 100 78 Q80 74 58 98 Z" fill="#92400e" {...thin} />
      <path d="M58 66 L50 18 L78 44 L100 10 L122 44 L150 18 L142 66 Z" fill="#fbbf24" {...stroke} />
      <circle cx="100" cy="44" r="7" fill="#ef4444" {...thin} />
      <circle cx="70" cy="52" r="5" fill="#38bdf8" {...thin} />
      <circle cx="130" cy="52" r="5" fill="#38bdf8" {...thin} />
      <Dots points={[[84, 104], [116, 104]]} r={5.5} />
      <circle cx="74" cy="118" r="8" fill="#f472b6" opacity="0.4" />
      <circle cx="126" cy="118" r="8" fill="#f472b6" opacity="0.4" />
      <path d="M88 120 Q100 132 112 120" fill="none" {...thin} />
    </g>
  )
}

function Umbrella() {
  return (
    <g>
      <path d="M100 84 L100 168 Q100 188 82 188 Q66 188 66 172" fill="none" stroke={OUTLINE} strokeWidth="12" strokeLinecap="round" />
      <path d="M100 84 L100 168 Q100 188 82 188 Q66 188 66 172" fill="none" stroke="#a16207" strokeWidth="6" strokeLinecap="round" />
      <path d="M12 104 Q16 24 100 22 Q184 24 188 104 Q172 86 144 104 Q122 86 100 104 Q78 86 56 104 Q28 86 12 104 Z" fill="#f87171" {...stroke} />
      <path d="M100 22 Q62 50 56 104 M100 22 Q138 50 144 104 M100 22 L100 104" fill="none" {...thin} />
      <path d="M56 104 Q62 50 100 22 L100 104 Q78 86 56 104 Z" fill="#fbbf24" />
      <path d="M144 104 Q138 50 100 22 L100 104 Q122 86 144 104 Z" fill="#60a5fa" />
      <path d="M12 104 Q16 24 100 22 Q184 24 188 104 Q172 86 144 104 Q122 86 100 104 Q78 86 56 104 Q28 86 12 104 Z M100 22 Q62 50 56 104 M100 22 Q138 50 144 104 M100 22 L100 104" fill="none" {...stroke} />
      <path d="M100 22 L100 10" {...stroke} />
    </g>
  )
}

function Van() {
  return (
    <g>
      <path d="M14 144 L14 64 Q14 50 28 50 L122 50 Q132 50 138 58 L164 92 L178 98 Q188 102 188 114 L188 144 Z" fill="#38bdf8" {...stroke} />
      <path d="M112 62 L128 62 L152 94 L112 94 Z" fill="#e0f2fe" {...thin} />
      <rect x="28" y="62" width="34" height="32" rx="5" fill="#e0f2fe" {...thin} />
      <rect x="68" y="62" width="34" height="32" rx="5" fill="#e0f2fe" {...thin} />
      <path d="M14 114 L188 114" stroke="#fff" strokeWidth="7" />
      <circle cx="182" cy="122" r="6" fill="#fde047" {...thin} />
      {[54, 148].map((x) => (
        <g key={x}>
          <circle cx={x} cy="146" r="21" fill="#334155" {...stroke} />
          <circle cx={x} cy="146" r="8" fill="#cbd5e1" />
        </g>
      ))}
    </g>
  )
}

function Whale() {
  return (
    <g>
      <path d="M96 40 Q84 14 68 22 M96 40 Q104 12 122 20" fill="none" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" />
      <path d="M150 112 Q176 104 170 70 Q190 60 196 76 Q196 60 184 50 Q166 48 160 64 Q150 52 138 60 Q150 70 150 86 Z" fill="#3b82f6" {...stroke} />
      <path d="M8 118 C8 70 50 48 96 48 C138 48 164 78 164 112 C164 150 130 166 92 166 C44 166 8 156 8 118 Z" fill="#60a5fa" {...stroke} />
      <path d="M14 132 C40 154 120 162 158 134 C140 160 110 166 92 166 C50 166 22 158 14 132 Z" fill="#e0f2fe" />
      <path d="M92 124 Q112 138 96 150 Q80 142 92 124 Z" fill="#3b82f6" {...thin} />
      <circle cx="46" cy="104" r="7" fill={OUTLINE} />
      <circle cx="48" cy="102" r="2.4" fill="#fff" />
      <path d="M20 126 Q40 140 62 130" fill="none" {...thin} />
      <path d="M0 182 Q25 172 50 182 T100 182 T150 182 T200 182" fill="none" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
    </g>
  )
}

function Xylophone() {
  const bars = ['#ef4444', '#fb923c', '#fde047', '#4ade80', '#38bdf8', '#a78bfa']
  return (
    <g>
      <path d="M14 76 L186 96 M14 150 L186 130" stroke="#a16207" strokeWidth="9" strokeLinecap="round" />
      {bars.map((color, i) => {
        const x = 20 + i * 28
        const top = 58 + i * 5
        const bottom = 168 - i * 5
        return <rect key={color} x={x} y={top} width="22" height={bottom - top} rx="7" fill={color} {...thin} />
      })}
      <path d="M150 28 L92 62" stroke="#a16207" strokeWidth="6" strokeLinecap="round" />
      <circle cx="158" cy="24" r="13" fill="#f472b6" {...thin} />
      <path d="M52 22 l4 10 l10 2 l-8 6 l2 10 l-8 -6 l-8 6 l2 -10 l-8 -6 l10 -2 Z" fill="#fbbf24" {...thin} strokeWidth="2.5" />
    </g>
  )
}

function YoYo() {
  return (
    <g>
      <path d="M100 6 L100 74" {...thin} />
      <circle cx="100" cy="10" r="8" fill="none" {...thin} />
      <circle cx="100" cy="124" r="62" fill="#22c55e" {...stroke} />
      <circle cx="100" cy="124" r="40" fill="#fde047" {...thin} />
      <path d="M100 96 l8 18 l20 2 l-15 13 l5 20 l-18 -11 l-18 11 l5 -20 l-15 -13 l20 -2 Z" fill="#ef4444" {...thin} />
      <ellipse cx="66" cy="92" rx="8" ry="16" transform="rotate(35 66 92)" fill="#fff" opacity="0.5" />
    </g>
  )
}

function Zebra() {
  return (
    <g>
      <path d="M62 60 L50 22 L84 44 Z M138 60 L150 22 L116 44 Z" fill="#fff" {...stroke} />
      <path d="M92 40 L88 14 L100 30 L112 14 L108 40 Z" fill={OUTLINE} />
      <path d="M56 70 Q56 40 100 40 Q144 40 144 70 L136 130 Q132 170 100 170 Q68 170 64 130 Z" fill="#fff" {...stroke} />
      <path d="M58 76 L78 84 M60 98 L80 102 M142 76 L122 84 M140 98 L120 102 M86 44 L92 62 M114 44 L108 62" stroke={OUTLINE} strokeWidth="7" strokeLinecap="round" />
      <path d="M68 134 Q70 170 100 170 Q130 170 132 134 Q100 122 68 134 Z" fill="#57534e" {...thin} />
      <Dots points={[[82, 100], [118, 100]]} r={7} />
      <circle cx="84.5" cy="97.5" r="2.4" fill="#fff" />
      <circle cx="120.5" cy="97.5" r="2.4" fill="#fff" />
      <Dots points={[[90, 146], [110, 146]]} r={3.5} />
      <path d="M90 156 Q100 162 110 156" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

function Cup() {
  return (
    <g>
      <ellipse cx="96" cy="182" rx="70" ry="9" fill="#e2e8f0" {...thin} />
      <path d="M142 86 Q186 84 182 118 Q178 148 134 146" fill="none" stroke={OUTLINE} strokeWidth="20" strokeLinecap="round" />
      <path d="M142 86 Q186 84 182 118 Q178 148 134 146" fill="none" stroke="#60a5fa" strokeWidth="11" strokeLinecap="round" />
      <path d="M36 62 L156 62 L146 156 Q144 174 124 174 L68 174 Q48 174 46 156 Z" fill="#60a5fa" {...stroke} />
      <ellipse cx="96" cy="62" rx="60" ry="13" fill="#fef3c7" {...stroke} />
      <path d="M78 110 l7 15 l16 2 l-12 11 l3 16 l-14 -8 l-14 8 l3 -16 l-12 -11 l16 -2 Z" fill="#fde047" transform="translate(18 2)" {...thin} />
      <path d="M78 40 Q70 28 80 18 M100 42 Q92 28 102 14 M122 40 Q114 28 124 18" fill="none" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
    </g>
  )
}

export const alphabetArt = {
  egg: Egg,
  fish: Fish,
  goat: Goat,
  hat: Hat,
  icecream: IceCream,
  jump: Jump,
  kite: Kite,
  lamb: Lamb,
  net: Net,
  owl: Owl,
  pet: Pet,
  queen: Queen,
  umbrella: Umbrella,
  van: Van,
  whale: Whale,
  xylophone: Xylophone,
  yoyo: YoYo,
  zebra: Zebra,
  cup: Cup,
}
