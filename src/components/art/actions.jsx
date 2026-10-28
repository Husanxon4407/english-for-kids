// Drawings for Action Park: the same child in a different pose for each
// action, with a little sign of it (a ball, water, music notes, a ladder).
import { OUTLINE, stroke } from './common.js'

const thin = { ...stroke, strokeWidth: 3 }
const SKIN = '#fcd9b8'

// An arm or a leg: a thick rounded line with a dark outline under it.
function Limb({ points, color, width = 12 }) {
  const d = `M${points.map(([x, y]) => `${x} ${y}`).join(' L')}`
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={OUTLINE} strokeWidth={width + 7} />
      <path d={d} stroke={color} strokeWidth={width} />
    </g>
  )
}

/**
 * The child: head at (100, 50), body from 74 to 122. Arms start at the
 * shoulders (82 / 118, 82), legs at the hips (90 / 110, 120).
 */
function Kid({ arms, legs, mouth = 'smile', shirt = '#f97316', pants = '#2563eb', tilt = 0, lift = 0, behind, front }) {
  const [la, ra] = arms
  const [ll, rl] = legs
  return (
    <g>
      <ellipse cx="100" cy="186" rx={lift ? 30 : 42} ry="6" fill="#000" opacity="0.12" />
      {behind}
      <g transform={`translate(0 ${-lift}) rotate(${tilt} 100 122)`}>
        <Limb points={ll} color={pants} width={14} />
        <Limb points={rl} color={pants} width={14} />
        {[ll, rl].map((leg) => {
          const [x, y] = leg[leg.length - 1]
          return <ellipse key={`${x}-${y}`} cx={x} cy={y + 3} rx="11" ry="7" fill="#334155" {...thin} />
        })}
        <rect x="78" y="72" width="44" height="52" rx="16" fill={shirt} {...stroke} />
        <Limb points={la} color={SKIN} />
        <Limb points={ra} color={SKIN} />
        <circle cx="100" cy="48" r="26" fill={SKIN} {...stroke} />
        <path d="M74 44 Q76 18 100 20 Q126 18 126 44 Q114 30 100 34 Q86 30 74 44 Z" fill="#92400e" {...thin} />
        <circle cx="90" cy="50" r="4" fill={OUTLINE} />
        <circle cx="110" cy="50" r="4" fill={OUTLINE} />
        <circle cx="82" cy="60" r="5" fill="#f472b6" opacity="0.35" />
        <circle cx="118" cy="60" r="5" fill="#f472b6" opacity="0.35" />
        {mouth === 'open' ? (
          <ellipse cx="100" cy="63" rx="6" ry="7" fill="#7a2840" {...thin} />
        ) : (
          <path d="M91 61 Q100 70 109 61" fill="none" {...thin} />
        )}
      </g>
      {front}
    </g>
  )
}

const Note = ({ x, y, color = '#a855f7' }) => (
  <g>
    <path d={`M${x} ${y} L${x} ${y - 24} L${x + 14} ${y - 28}`} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <ellipse cx={x - 5} cy={y} rx="7" ry="5.5" fill={color} />
  </g>
)

function Ball({ x, y, r = 14 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#fff" {...thin} />
      <path d={`M${x - r * 0.5} ${y - r * 0.3} l${r * 0.5} ${-r * 0.3} ${r * 0.5} ${r * 0.3} -${r * 0.15} ${r * 0.6} h-${r * 0.7} z`} fill={OUTLINE} />
    </g>
  )
}

const Speed = ({ x, y }) => (
  <path d={`M${x} ${y} h-28 M${x + 6} ${y + 14} h-34 M${x} ${y + 28} h-24`} stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
)

function Run() {
  return (
    <Kid
      tilt={10}
      arms={[[[82, 82], [64, 94], [56, 80]], [[118, 82], [134, 100], [148, 94]]]}
      legs={[[[90, 120], [70, 140], [50, 140]], [[110, 120], [128, 146], [124, 176]]]}
      behind={<Speed x={50} y={70} />}
    />
  )
}

function Jump() {
  return (
    <Kid
      lift={18}
      mouth="open"
      shirt="#ec4899"
      arms={[[[82, 82], [68, 62], [60, 40]], [[118, 82], [132, 62], [140, 40]]]}
      legs={[[[90, 120], [76, 138], [86, 154]], [[110, 120], [124, 138], [114, 154]]]}
      front={<path d="M64 182 l-10 -8 M136 182 l10 -8 M100 186 v-8" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />}
    />
  )
}

function Walk() {
  return (
    <Kid
      shirt="#22c55e"
      arms={[[[82, 82], [74, 104], [72, 124]], [[118, 82], [128, 102], [132, 120]]]}
      legs={[[[90, 120], [84, 150], [76, 176]], [[110, 120], [116, 150], [124, 176]]]}
    />
  )
}

function Swim() {
  return (
    <Kid
      shirt="#06b6d4"
      arms={[[[82, 82], [64, 62], [56, 38]], [[118, 82], [138, 96], [150, 112]]]}
      legs={[[[90, 120], [88, 150], [86, 176]], [[110, 120], [112, 150], [114, 176]]]}
      front={
        <g>
          <path d="M0 118 Q25 106 50 118 T100 118 T150 118 T200 118 L200 200 L0 200 Z" fill="#38bdf8" opacity="0.92" />
          <path d="M0 118 Q25 106 50 118 T100 118 T150 118 T200 118" fill="none" stroke="#e0f2fe" strokeWidth="5" strokeLinecap="round" />
          <circle cx="40" cy="30" r="5" fill="#7dd3fc" />
          <circle cx="160" cy="98" r="6" fill="#7dd3fc" />
          <circle cx="172" cy="84" r="4" fill="#7dd3fc" />
        </g>
      }
    />
  )
}

function Dance() {
  return (
    <Kid
      tilt={-6}
      shirt="#a855f7"
      arms={[[[82, 82], [66, 66], [60, 40]], [[118, 82], [138, 98], [122, 112]]]}
      legs={[[[90, 120], [86, 150], [84, 176]], [[110, 120], [132, 136], [152, 128]]]}
      front={
        <>
          <Note x={164} y={58} />
          <Note x={30} y={110} color="#ec4899" />
        </>
      }
    />
  )
}

function Sing() {
  return (
    <Kid
      mouth="open"
      shirt="#facc15"
      arms={[[[82, 82], [68, 98], [56, 88]], [[118, 82], [128, 98], [116, 82]]]}
      legs={[[[90, 120], [88, 150], [86, 176]], [[110, 120], [112, 150], [114, 176]]]}
      front={
        <>
          <rect x="110" y="64" width="10" height="22" rx="4" fill="#334155" {...thin} />
          <circle cx="115" cy="62" r="8" fill="#94a3b8" {...thin} />
          <Note x={150} y={44} />
          <Note x={172} y={84} color="#ec4899" />
        </>
      }
    />
  )
}

function Clap() {
  return (
    <Kid
      mouth="open"
      shirt="#ef4444"
      arms={[[[82, 82], [64, 100], [96, 100]], [[118, 82], [136, 100], [104, 100]]]}
      legs={[[[90, 120], [88, 150], [86, 176]], [[110, 120], [112, 150], [114, 176]]]}
      front={<path d="M100 84 v-10 M84 88 l-9 -7 M116 88 l9 -7 M80 110 l-9 5 M120 110 l9 5" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />}
    />
  )
}

function Climb() {
  return (
    <Kid
      shirt="#84cc16"
      arms={[[[82, 82], [72, 60], [70, 38]], [[118, 82], [128, 66], [130, 64]]]}
      legs={[[[90, 120], [76, 136], [70, 142]], [[110, 120], [124, 148], [130, 168]]]}
      behind={
        <g>
          <path d="M56 6 L56 192 M144 6 L144 192" stroke="#92400e" strokeWidth="10" strokeLinecap="round" />
          {[38, 64, 90, 116, 142, 168].map((y) => (
            <path key={y} d={`M56 ${y} L144 ${y}`} stroke="#b45309" strokeWidth="7" strokeLinecap="round" />
          ))}
        </g>
      }
    />
  )
}

function Kick() {
  return (
    <Kid
      shirt="#3b82f6"
      pants="#1e3a8a"
      arms={[[[82, 82], [66, 96], [56, 110]], [[118, 82], [134, 90], [148, 84]]]}
      legs={[[[90, 120], [88, 150], [86, 176]], [[110, 120], [130, 140], [146, 158]]]}
      front={
        <>
          <Ball x={168} y={152} r={16} />
          <path d="M188 136 l8 -6 M190 152 h10 M188 168 l8 6" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        </>
      }
    />
  )
}

function Throw() {
  return (
    <Kid
      shirt="#14b8a6"
      arms={[[[82, 82], [64, 76], [46, 72]], [[118, 82], [136, 66], [144, 46]]]}
      legs={[[[90, 120], [78, 148], [68, 176]], [[110, 120], [118, 150], [126, 176]]]}
      front={
        <>
          <circle cx="150" cy="34" r="12" fill="#ef4444" {...thin} />
          <path d="M150 22 Q160 34 150 46" fill="none" stroke="#fff" strokeWidth="3" />
          <path d="M42 50 Q30 40 24 26" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="4 7" strokeLinecap="round" />
        </>
      }
    />
  )
}

export const actionArt = {
  run: Run,
  jump: Jump,
  walk: Walk,
  swim: Swim,
  dance: Dance,
  sing: Sing,
  clap: Clap,
  climb: Climb,
  kick: Kick,
  throw: Throw,
}
