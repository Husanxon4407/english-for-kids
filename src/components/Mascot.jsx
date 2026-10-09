// Bobo — WordLand's original mascot: a round, friendly sprout creature.

const OUTLINE = '#1f3b3a'
const stroke = { stroke: OUTLINE, strokeWidth: 4, strokeLinejoin: 'round', strokeLinecap: 'round' }

export function Bobo({ talking = false, waving = false, className = '' }) {
  return (
    <svg viewBox="0 0 200 220" className={className} role="img" aria-label="Bobo">
      <ellipse cx="100" cy="210" rx="56" ry="7" fill="#000" opacity="0.12" />

      {/* sprout */}
      <path d="M100 52 Q98 34 104 22" fill="none" {...stroke} />
      <ellipse cx="90" cy="24" rx="14" ry="8" transform="rotate(25 90 24)" fill="#6cc04a" {...stroke} strokeWidth="3" />
      <ellipse cx="117" cy="20" rx="14" ry="8" transform="rotate(-25 117 20)" fill="#86d75f" {...stroke} strokeWidth="3" />

      {/* ears */}
      <circle cx="46" cy="66" r="18" fill="#2ec4b6" {...stroke} />
      <circle cx="154" cy="66" r="18" fill="#2ec4b6" {...stroke} />
      <circle cx="46" cy="66" r="8" fill="#ffb4c8" />
      <circle cx="154" cy="66" r="8" fill="#ffb4c8" />

      {/* feet */}
      <ellipse cx="74" cy="198" rx="20" ry="11" fill="#22a99c" {...stroke} />
      <ellipse cx="126" cy="198" rx="20" ry="11" fill="#22a99c" {...stroke} />

      {/* left arm */}
      <ellipse cx="32" cy="138" rx="13" ry="25" transform="rotate(25 32 138)" fill="#2ec4b6" {...stroke} />

      {/* right arm (waves) */}
      <g className={waving ? 'bobo-wave' : ''} style={{ transformOrigin: '160px 128px' }}>
        <ellipse
          cx="174"
          cy={waving ? 104 : 138}
          rx="13"
          ry="25"
          transform={waving ? 'rotate(30 174 104)' : 'rotate(-25 174 138)'}
          fill="#2ec4b6"
          {...stroke}
        />
      </g>

      {/* body */}
      <ellipse cx="100" cy="126" rx="70" ry="76" fill="#2ec4b6" {...stroke} />
      <ellipse cx="100" cy="152" rx="44" ry="40" fill="#d4f7f1" />

      {/* eyes */}
      <ellipse cx="76" cy="104" rx="17" ry="20" fill="#fff" {...stroke} strokeWidth="3" />
      <ellipse cx="124" cy="104" rx="17" ry="20" fill="#fff" {...stroke} strokeWidth="3" />
      <circle cx="79" cy="108" r="9" fill={OUTLINE} />
      <circle cx="121" cy="108" r="9" fill={OUTLINE} />
      <circle cx="82" cy="104" r="3.2" fill="#fff" />
      <circle cx="124" cy="104" r="3.2" fill="#fff" />

      {/* cheeks */}
      <circle cx="56" cy="130" r="9" fill="#ff8fab" opacity="0.55" />
      <circle cx="144" cy="130" r="9" fill="#ff8fab" opacity="0.55" />

      {/* mouth */}
      {talking ? (
        <g className="bobo-talk" style={{ transformOrigin: '100px 134px' }}>
          <ellipse cx="100" cy="136" rx="13" ry="11" fill="#7a2840" {...stroke} strokeWidth="3" />
          <ellipse cx="100" cy="141" rx="7" ry="4" fill="#ff8fab" />
        </g>
      ) : (
        <path d="M84 130 Q100 148 116 130" fill="none" {...stroke} />
      )}
    </svg>
  )
}

/**
 * Bobo with an optional speech bubble. The bubble text is for grown-ups and
 * early readers only — everything Bobo says is also spoken aloud.
 */
export default function Mascot({ talking, waving, bubble, size = 'md', onClick, className = '' }) {
  const sizes = {
    sm: 'w-20 sm:w-24',
    md: 'w-36 sm:w-44',
    lg: 'w-48 sm:w-60 lg:w-72',
  }
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {bubble && (
        <div className="relative mb-3 max-w-xs rounded-3xl bg-white px-5 py-3 text-center text-lg font-bold text-slate-700 shadow-md sm:text-xl">
          {bubble}
          <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white" />
        </div>
      )}
      <button
        type="button"
        onClick={onClick}
        aria-label="Bobo"
        className={`${sizes[size]} animate-float rounded-full transition-transform active:scale-95`}
      >
        <Bobo talking={talking} waving={waving} className="h-auto w-full drop-shadow-lg" />
      </button>
    </div>
  )
}
