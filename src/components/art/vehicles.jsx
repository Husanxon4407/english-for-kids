// Drawings for Go Go Wheels. (The van is drawn with the alphabet song.)
import { OUTLINE, stroke } from './common.js'

const thin = { ...stroke, strokeWidth: 3 }

function Wheel({ x, y = 150, r = 20 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#334155" {...stroke} />
      <circle cx={x} cy={y} r={r * 0.4} fill="#cbd5e1" />
    </g>
  )
}

function Bus() {
  return (
    <g>
      <rect x="12" y="44" width="176" height="104" rx="18" fill="#facc15" {...stroke} />
      {[26, 66, 106].map((x) => (
        <rect key={x} x={x} y="58" width="32" height="34" rx="5" fill="#bae6fd" {...thin} />
      ))}
      <rect x="146" y="58" width="30" height="66" rx="5" fill="#bae6fd" {...thin} />
      <path d="M12 108 L146 108" stroke="#f97316" strokeWidth="8" />
      <circle cx="180" cy="132" r="6" fill="#fff" {...thin} />
      <Wheel x={54} />
      <Wheel x={146} />
    </g>
  )
}

function Bike() {
  return (
    <g>
      {[50, 150].map((x) => (
        <g key={x}>
          <circle cx={x} cy="132" r="36" fill="none" stroke={OUTLINE} strokeWidth="9" />
          <circle cx={x} cy="132" r="6" fill={OUTLINE} />
        </g>
      ))}
      <path d="M50 132 L84 74 L136 74 L100 132 Z M100 132 L84 74 M136 74 L150 132 M128 52 L136 74" fill="none" stroke="#22c55e" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M70 66 L98 66" stroke={OUTLINE} strokeWidth="10" strokeLinecap="round" />
      <path d="M118 48 L140 48" stroke={OUTLINE} strokeWidth="8" strokeLinecap="round" />
      <circle cx="100" cy="132" r="9" fill="#fde047" {...thin} />
    </g>
  )
}

function Truck() {
  return (
    <g>
      <rect x="10" y="48" width="112" height="96" rx="8" fill="#ef4444" {...stroke} />
      <path d="M122 76 L162 76 L188 106 L188 144 L122 144 Z" fill="#f87171" {...stroke} />
      <path d="M134 86 L160 86 L176 106 L134 106 Z" fill="#bae6fd" {...thin} />
      <path d="M24 64 L108 64 M24 84 L108 84 M24 104 L108 104" stroke="#fecaca" strokeWidth="5" strokeLinecap="round" />
      <circle cx="184" cy="128" r="5" fill="#fde047" {...thin} />
      <Wheel x={46} />
      <Wheel x={92} />
      <Wheel x={158} />
    </g>
  )
}

function Taxi() {
  return (
    <g>
      <rect x="78" y="30" width="44" height="18" rx="5" fill="#fff" {...thin} />
      <path d="M86 36 L114 36 M86 42 L114 42" stroke={OUTLINE} strokeWidth="2.5" strokeDasharray="4 4" />
      <path d="M18 136 L18 110 Q20 98 34 96 L56 94 L78 60 Q84 50 96 50 L132 50 Q144 50 150 60 L168 94 Q184 98 184 114 L184 136 Z" fill="#facc15" {...stroke} />
      <path d="M86 62 L114 62 L114 94 L66 94 Z" fill="#bae6fd" {...thin} />
      <path d="M122 62 L140 62 Q144 62 146 66 L158 94 L122 94 Z" fill="#bae6fd" {...thin} />
      <path d="M20 116 L182 116" stroke={OUTLINE} strokeWidth="6" strokeDasharray="12 12" />
      <Wheel x={60} y={138} />
      <Wheel x={146} y={138} />
    </g>
  )
}

function Tractor() {
  return (
    <g>
      <path d="M20 104 L20 80 L96 80 L96 104 Z" fill="#22c55e" {...stroke} />
      <path d="M96 40 L150 40 L156 120 L96 120 Z" fill="#16a34a" {...stroke} />
      <rect x="106" y="50" width="38" height="36" rx="4" fill="#bae6fd" {...thin} />
      <path d="M44 80 L44 52" stroke={OUTLINE} strokeWidth="8" strokeLinecap="round" />
      <path d="M38 46 Q44 36 50 46" fill="none" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
      <circle cx="56" cy="146" r="26" fill="#334155" {...stroke} />
      <circle cx="56" cy="146" r="10" fill="#facc15" />
      <circle cx="138" cy="136" r="42" fill="#334155" {...stroke} />
      <circle cx="138" cy="136" r="16" fill="#facc15" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4
        return <circle key={i} cx={138 + Math.cos(a) * 34} cy={136 + Math.sin(a) * 34} r="4" fill="#64748b" />
      })}
    </g>
  )
}

function Plane() {
  return (
    <g>
      <path d="M86 92 L48 30 L72 30 L122 92 Z" fill="#60a5fa" {...stroke} />
      <path d="M86 112 L48 174 L72 174 L122 112 Z" fill="#60a5fa" {...stroke} />
      <path d="M14 102 Q14 84 40 84 L160 84 Q194 86 194 102 Q194 118 160 120 L40 120 Q14 120 14 102 Z" fill="#fff" {...stroke} />
      <path d="M14 102 L6 70 L28 70 L44 86" fill="#ef4444" {...stroke} />
      {[64, 88, 112, 136].map((x) => (
        <circle key={x} cx={x} cy="100" r="6" fill="#bae6fd" {...thin} />
      ))}
      <path d="M164 92 Q182 94 186 102 L166 102 Z" fill="#bae6fd" {...thin} />
    </g>
  )
}

function Boat() {
  return (
    <g>
      <path d="M96 24 L96 116" stroke="#92400e" strokeWidth="7" strokeLinecap="round" />
      <path d="M102 28 Q150 60 152 108 L102 108 Z" fill="#fff" {...stroke} />
      <path d="M90 40 Q60 74 56 108 L90 108 Z" fill="#fde047" {...stroke} />
      <path d="M96 24 L120 32 L96 40 Z" fill="#ef4444" {...thin} />
      <path d="M22 118 L178 118 L156 160 L44 160 Z" fill="#ef4444" {...stroke} />
      <path d="M36 138 L164 138" stroke="#fff" strokeWidth="6" />
      <path d="M0 176 Q25 164 50 176 T100 176 T150 176 T200 176" fill="none" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" />
    </g>
  )
}

function Helicopter() {
  return (
    <g>
      <path d="M20 46 L180 46" stroke={OUTLINE} strokeWidth="9" strokeLinecap="round" />
      <path d="M100 46 L100 70" stroke={OUTLINE} strokeWidth="8" />
      <path d="M118 108 L176 96 L180 118 Z" fill="#a78bfa" {...stroke} />
      <path d="M170 82 L188 120" stroke={OUTLINE} strokeWidth="6" strokeLinecap="round" />
      <path d="M40 112 C40 84 64 68 100 68 C132 68 140 92 140 112 C140 136 118 150 90 150 C60 150 40 136 40 112 Z" fill="#8b5cf6" {...stroke} />
      <path d="M48 108 C50 88 66 78 88 78 L88 112 Z" fill="#bae6fd" {...thin} />
      <path d="M58 150 L52 170 M118 148 L124 170 M34 172 L144 172" fill="none" stroke={OUTLINE} strokeWidth="7" strokeLinecap="round" />
    </g>
  )
}

function Scooter() {
  return (
    <g>
      <path d="M150 142 L130 36" stroke={OUTLINE} strokeWidth="17" strokeLinecap="round" />
      <path d="M150 142 L130 36" stroke="#ec4899" strokeWidth="10" strokeLinecap="round" />
      <path d="M104 34 L156 34" stroke={OUTLINE} strokeWidth="12" strokeLinecap="round" />
      <rect x="26" y="130" width="138" height="20" rx="10" fill="#ec4899" {...stroke} />
      <path d="M40 136 L140 136" stroke="#fbcfe8" strokeWidth="4" strokeLinecap="round" />
      <circle cx="46" cy="160" r="24" fill="#334155" {...stroke} />
      <circle cx="46" cy="160" r="9" fill="#cbd5e1" />
      <circle cx="154" cy="160" r="24" fill="#334155" {...stroke} />
      <circle cx="154" cy="160" r="9" fill="#cbd5e1" />
    </g>
  )
}

export const vehicleArt = {
  bus: Bus,
  bike: Bike,
  truck: Truck,
  taxi: Taxi,
  tractor: Tractor,
  plane: Plane,
  boat: Boat,
  helicopter: Helicopter,
  scooter: Scooter,
}
