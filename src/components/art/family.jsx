// Drawings for My Family: the same friendly person, told apart by age, hair
// and clothes, so a child can point at "grandma" or "my brother".
import { OUTLINE, stroke } from './common.js'

const thin = { ...stroke, strokeWidth: 3 }
const SKIN = '#fcd9b8'

// Hair styles, drawn behind (`back`) or over (`top`) a head at (0, 0), r 40.
const HAIR = {
  long: {
    back: <path d="M-44 -6 Q-46 -46 0 -48 Q46 -46 44 -6 L48 58 Q24 64 0 60 Q-24 64 -48 58 Z" fill="#7c2d12" {...stroke} />,
    top: <path d="M-40 -6 Q-36 -44 0 -44 Q38 -44 40 -6 Q22 -26 -4 -24 Q-26 -24 -40 -6 Z" fill="#7c2d12" {...thin} />,
  },
  short: {
    top: <path d="M-40 -4 Q-42 -46 0 -46 Q42 -46 40 -4 Q36 -24 20 -28 Q0 -22 -20 -28 Q-36 -24 -40 -4 Z" fill="#292524" {...thin} />,
  },
  spiky: {
    top: <path d="M-40 -2 L-38 -30 L-26 -38 L-22 -52 L-8 -42 L2 -56 L12 -42 L26 -52 L28 -36 L40 -28 L40 -2 Q20 -22 0 -20 Q-20 -22 -40 -2 Z" fill="#b45309" {...thin} />,
  },
  pigtails: {
    back: (
      <>
        <ellipse cx="-50" cy="6" rx="14" ry="24" fill="#92400e" {...stroke} />
        <ellipse cx="50" cy="6" rx="14" ry="24" fill="#92400e" {...stroke} />
        <path d="M-50 -20 l-10 -8 0 16 z M-50 -20 l10 -8 0 16 z M50 -20 l-10 -8 0 16 z M50 -20 l10 -8 0 16 z" fill="#ec4899" {...thin} />
      </>
    ),
    top: <path d="M-40 -4 Q-40 -44 0 -44 Q40 -44 40 -4 Q30 -30 0 -28 Q-30 -30 -40 -4 Z" fill="#92400e" {...thin} />,
  },
  bun: {
    back: <circle cx="0" cy="-48" r="18" fill="#d1d5db" {...stroke} />,
    top: <path d="M-40 -2 Q-40 -44 0 -44 Q40 -44 40 -2 Q32 -26 0 -26 Q-32 -26 -40 -2 Z" fill="#d1d5db" {...thin} />,
  },
  grandpa: {
    top: <path d="M-40 4 Q-44 -18 -32 -26 Q-30 -8 -38 4 Z M40 4 Q44 -18 32 -26 Q30 -8 38 4 Z" fill="#e5e7eb" {...thin} />,
  },
  curl: {
    top: <path d="M0 -40 Q-10 -54 2 -58 Q12 -56 6 -48" fill="none" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />,
  },
}

/** A head with a face, centred at (x, y); `s` scales it. */
function Head({ x = 100, y = 80, s = 1, hair, glasses, beard, mustache, lips, earrings, pacifier }) {
  const h = HAIR[hair] || {}
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {h.back}
      {earrings && (
        <>
          <circle cx="-40" cy="16" r="5" fill="#fde047" {...thin} />
          <circle cx="40" cy="16" r="5" fill="#fde047" {...thin} />
        </>
      )}
      <circle cx="0" cy="0" r="40" fill={SKIN} {...stroke} />
      {beard && <path d="M-36 8 Q-34 46 0 48 Q34 46 36 8 Q20 22 0 20 Q-20 22 -36 8 Z" fill="#292524" {...thin} />}
      {h.top}
      <circle cx="-14" cy="2" r="5" fill={OUTLINE} />
      <circle cx="14" cy="2" r="5" fill={OUTLINE} />
      <circle cx="-12" cy="0" r="1.7" fill="#fff" />
      <circle cx="16" cy="0" r="1.7" fill="#fff" />
      {glasses && (
        <g fill="none" stroke={OUTLINE} strokeWidth="3">
          <circle cx="-14" cy="2" r="11" />
          <circle cx="14" cy="2" r="11" />
          <path d="M-3 2 L3 2" />
        </g>
      )}
      <circle cx="-24" cy="16" r="6" fill="#f472b6" opacity="0.35" />
      <circle cx="24" cy="16" r="6" fill="#f472b6" opacity="0.35" />
      {mustache && <path d="M-16 20 Q-8 12 0 18 Q8 12 16 20 Q8 24 0 20 Q-8 24 -16 20 Z" fill={mustache} {...thin} />}
      {pacifier ? (
        <>
          <circle cx="0" cy="22" r="9" fill="#f9a8d4" {...thin} />
          <circle cx="0" cy="22" r="3.5" fill="#fff" />
        </>
      ) : (
        <path d="M-10 22 Q0 32 10 22" fill="none" stroke={lips ? '#e11d48' : OUTLINE} strokeWidth="3.5" strokeLinecap="round" />
      )}
    </g>
  )
}

/** Shoulders and top below a head of radius 40 at (x, y). */
function Body({ x = 100, y = 80, s = 1, color, collar, buttons, dress }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={dress ? 'M-30 34 L-56 120 L56 120 L30 34 Q0 46 -30 34 Z' : 'M-58 120 Q-60 50 -22 38 Q0 46 22 38 Q60 50 58 120 Z'} fill={color} {...stroke} />
      {collar && <path d="M-22 38 L0 58 L22 38" fill="#fff" {...thin} />}
      {buttons && [70, 90, 110].map((by) => <circle key={by} cx="0" cy={by} r="3.5" fill={OUTLINE} />)}
    </g>
  )
}

function Mom() {
  return (
    <g>
      <Body color="#ec4899" y={86} />
      <Head y={84} hair="long" lips earrings />
    </g>
  )
}

function Dad() {
  return (
    <g>
      <Body color="#3b82f6" y={86} collar buttons />
      <Head y={84} hair="short" beard mustache="#292524" />
    </g>
  )
}

function Baby() {
  return (
    <g>
      <path d="M38 196 Q30 120 100 112 Q170 120 162 196 Z" fill="#fde047" {...stroke} />
      <path d="M70 150 Q100 166 130 150" fill="none" stroke="#fff" strokeWidth="5" strokeDasharray="3 9" strokeLinecap="round" />
      <Head y={86} s={1.15} hair="curl" pacifier />
    </g>
  )
}

function Brother() {
  return (
    <g>
      <Body color="#22c55e" y={100} s={0.9} />
      <path d="M86 150 L100 166 L114 150" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <Head y={96} s={0.92} hair="spiky" />
    </g>
  )
}

function Sister() {
  return (
    <g>
      <Body color="#a855f7" y={100} s={0.9} dress />
      <Head y={96} s={0.92} hair="pigtails" />
    </g>
  )
}

function Grandma() {
  return (
    <g>
      <Body color="#c4b5fd" y={88} buttons />
      <Head y={86} hair="bun" glasses lips />
    </g>
  )
}

function Grandpa() {
  return (
    <g>
      <Body color="#92400e" y={88} collar />
      <Head y={86} hair="grandpa" glasses mustache="#e5e7eb" />
    </g>
  )
}

function Family() {
  return (
    <g>
      <path d="M100 28 C92 16 74 20 76 34 C78 46 100 56 100 56 C100 56 122 46 124 34 C126 20 108 16 100 28 Z" fill="#f43f5e" {...thin} />
      <Body x={56} y={104} s={0.55} color="#ec4899" />
      <Head x={56} y={102} s={0.55} hair="long" lips />
      <Body x={144} y={104} s={0.55} color="#3b82f6" collar />
      <Head x={144} y={102} s={0.55} hair="short" beard mustache="#292524" />
      <Body x={84} y={136} s={0.42} color="#a855f7" dress />
      <Head x={84} y={134} s={0.42} hair="pigtails" />
      <Body x={118} y={136} s={0.42} color="#22c55e" />
      <Head x={118} y={134} s={0.42} hair="spiky" />
    </g>
  )
}

function Friend() {
  return (
    <g>
      <Body x={64} y={98} s={0.62} color="#f97316" />
      <Head x={64} y={96} s={0.62} hair="spiky" />
      <Body x={136} y={98} s={0.62} color="#06b6d4" dress />
      <Head x={136} y={96} s={0.62} hair="pigtails" />
      <path d="M86 150 Q100 140 114 150" fill="none" stroke={OUTLINE} strokeWidth="15" strokeLinecap="round" />
      <path d="M86 150 Q100 140 114 150" fill="none" stroke={SKIN} strokeWidth="9" strokeLinecap="round" />
      <path d="M100 30 C94 22 82 24 84 34 C86 42 100 48 100 48 C100 48 114 42 116 34 C118 24 106 22 100 30 Z" fill="#f43f5e" {...thin} />
    </g>
  )
}

export const familyArt = {
  mom: Mom,
  dad: Dad,
  baby: Baby,
  brother: Brother,
  sister: Sister,
  grandma: Grandma,
  grandpa: Grandpa,
  family: Family,
  friend: Friend,
}
