// Bobo — WordLand's original mascot: a round, friendly sprout creature.
import { useCelebration } from '../lib/celebrate.js'

const OUTLINE = '#1f3b3a'
const stroke = { stroke: OUTLINE, strokeWidth: 4, strokeLinejoin: 'round', strokeLinecap: 'round' }

// `mood` changes Bobo's face in the stories: happy (the default), wow, sad,
// sleepy, or eat (chewing with full cheeks). `arms` is "up" or "clap".
export function Bobo({ talking = false, waving = false, mood = 'happy', arms, className = '' }) {
  const wow = mood === 'wow'
  const sad = mood === 'sad'
  const sleepy = mood === 'sleepy'
  const eating = mood === 'eat'
  const clapping = arms === 'clap'
  const armsDrawing = (
    <>
      {/* left arm: up in the air, or clapping in front */}
      <g style={{ animation: clapping ? 'wl-clap-l 0.5s ease-in-out infinite' : undefined }}>
        <ellipse
          cx={arms === 'up' ? 24 : clapping ? 74 : 32}
          cy={arms === 'up' ? 72 : clapping ? 150 : 138}
          rx="13"
          ry="25"
          transform={arms === 'up' ? 'rotate(-20 24 72)' : clapping ? 'rotate(-55 74 150)' : 'rotate(25 32 138)'}
          fill="#2ec4b6"
          {...stroke}
        />
      </g>

      {/* right arm (waves) */}
      <g
        className={waving && !arms ? 'bobo-wave' : ''}
        style={{ transformOrigin: '160px 128px', animation: clapping ? 'wl-clap-r 0.5s ease-in-out infinite' : undefined }}
      >
        <ellipse
          cx={arms === 'up' ? 176 : clapping ? 126 : 174}
          cy={arms === 'up' ? 72 : waving && !arms ? 104 : clapping ? 150 : 138}
          rx="13"
          ry="25"
          transform={
            arms === 'up' ? 'rotate(20 176 72)' : clapping ? 'rotate(55 126 150)' : waving ? 'rotate(30 174 104)' : 'rotate(-25 174 138)'
          }
          fill="#2ec4b6"
          {...stroke}
        />
      </g>
    </>
  )
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

      {!clapping && armsDrawing}

      {/* body */}
      <ellipse cx="100" cy="126" rx="70" ry="76" fill="#2ec4b6" {...stroke} />
      <ellipse cx="100" cy="152" rx="44" ry="40" fill="#d4f7f1" />
      {/* clapping hands meet in front of the tummy */}
      {clapping && armsDrawing}

      {/* eyes */}
      {sleepy ? (
        <path d="M62 106 Q76 116 90 106 M110 106 Q124 116 138 106" fill="none" {...stroke} />
      ) : (
        <>
          <ellipse cx="76" cy="104" rx="17" ry={wow ? 22 : 20} fill="#fff" {...stroke} strokeWidth="3" />
          <ellipse cx="124" cy="104" rx="17" ry={wow ? 22 : 20} fill="#fff" {...stroke} strokeWidth="3" />
          <circle cx="79" cy={sad ? 112 : 108} r={wow ? 6.5 : 9} fill={OUTLINE} />
          <circle cx="121" cy={sad ? 112 : 108} r={wow ? 6.5 : 9} fill={OUTLINE} />
          <circle cx="82" cy={sad ? 108 : 104} r="3.2" fill="#fff" />
          <circle cx="124" cy={sad ? 108 : 104} r="3.2" fill="#fff" />
        </>
      )}
      {/* eyebrows: raised in surprise, tilted when sad */}
      {(wow || sad) && (
        <path d={wow ? 'M60 74 Q76 64 90 72 M110 72 Q124 64 140 74' : 'M62 84 L90 78 M110 78 L138 84'} fill="none" {...stroke} />
      )}

      {/* cheeks */}
      <circle cx="56" cy="130" r={eating ? 15 : 9} fill="#ff8fab" opacity="0.55" />
      <circle cx="144" cy="130" r={eating ? 15 : 9} fill="#ff8fab" opacity="0.55" />

      {/* mouth */}
      {eating ? (
        <g style={{ transformOrigin: '100px 136px', animation: 'wl-chew 0.3s ease-in-out infinite' }}>
          <path d="M84 134 Q92 128 100 134 Q108 140 116 134" fill="none" {...stroke} />
        </g>
      ) : wow && !talking ? (
        <ellipse cx="100" cy="138" rx="9" ry="11" fill="#7a2840" {...stroke} strokeWidth="3" />
      ) : sad && !talking ? (
        <path d="M86 142 Q100 128 114 142" fill="none" {...stroke} />
      ) : talking ? (
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
  // Bobo jumps for joy whenever the child gets something right.
  const cheers = useCelebration()
  const sizes = {
    sm: 'w-20 phone:w-12 tiny:w-11 sm:w-24 short:w-14',
    md: 'w-36 sm:w-44 short:w-24',
    // Never taller than about a third of the screen, so the buttons under Bobo stay in view.
    lg: 'w-48 max-w-[34dvh] sm:w-60 lg:w-72 short:w-32',
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
        <span key={cheers} className="block" style={cheers ? { animation: 'wl-hop-high 0.5s ease-in-out 3' } : undefined}>
          <Bobo talking={talking} waving={waving || cheers > 0} className="h-auto w-full drop-shadow-lg" />
        </span>
      </button>
    </div>
  )
}
