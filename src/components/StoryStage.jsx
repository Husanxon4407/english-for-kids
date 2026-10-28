import { useEffect, useRef, useState } from 'react'
import Scene from './Scenes.jsx'
import ItemArt from './ItemArt.jsx'
import { Bobo } from './Mascot.jsx'

// How long an actor takes to get to its new place: walking, or running.
const MOVE = 1.1
const RUN = 0.65

// Who has legs or wings: these walk, run or fly when they change place.
// Everything else (food, toys, the sun) simply glides.
const ALIVE = new Set(['bobo', 'cat', 'dog', 'cow', 'duck', 'bird', 'lion', 'monkey', 'elephant', 'horse', 'fish'])

// Things that belong in the air never get a shadow on the ground.
const AIR = new Set(['sun', 'moon', 'cloud', 'rainbow', 'star', 'kite', 'balloon', 'lightning', 'hat', 'one', 'two', 'three', 'umbrella'])

const ENTER = {
  left: 'wl-enter-left 1.1s ease-out',
  right: 'wl-enter-right 1.1s ease-out',
  top: 'wl-enter-top 0.9s ease-out',
  rise: 'wl-rise-in 1.4s ease-out',
  fall: 'wl-fall-in 0.9s ease-in',
  grow: 'wl-grow-in 1.6s ease-out',
  pop: 'wl-bounce-in 0.5s ease-out',
}

// What an actor keeps doing during its beat.
const ACT = {
  hop: 'wl-hop 0.7s ease-in-out infinite',
  bounce: 'wl-hop-high 0.8s ease-in-out infinite',
  dance: 'wl-dance 0.9s ease-in-out infinite',
  wiggle: 'wl-wiggle 0.5s ease-in-out infinite',
  sway: 'wl-sway 3s ease-in-out infinite',
  joy: 'wl-joy 1s ease-in-out infinite',
  spin: 'wl-spin-around 1.4s ease-in-out infinite',
  shiver: 'wl-shiver 0.18s linear infinite',
  nod: 'wl-nod 0.8s ease-in-out infinite',
  no: 'wl-no 1s ease-in-out 2',
  peek: 'wl-peek 2.6s ease-in-out infinite',
  chew: 'wl-chew 0.3s ease-in-out infinite',
  knock: 'wl-knock 1.2s ease-in-out infinite',
  fly: 'wl-flap 0.45s ease-in-out infinite',
  yawn: 'wl-yawn 2.4s ease-in-out infinite',
  glow: 'wl-glow 2s ease-in-out infinite',
  roll: 'wl-spin 1.2s linear infinite',
}

// Little pictures in a thought bubble over an actor's head (viewBox 40 x 40).
const FEELINGS = {
  love: <path d="M20 31 C4 20 8 8 20 15 C32 8 36 20 20 31 Z" fill="#fb7185" />,
  ask: (
    <text x="20" y="31" textAnchor="middle" fontSize="28" fontWeight="900" fill="#3b82f6">
      ?
    </text>
  ),
  wow: (
    <text x="20" y="31" textAnchor="middle" fontSize="28" fontWeight="900" fill="#f97316">
      !
    </text>
  ),
  happy: (
    <g fill="none" stroke="#3b2f2f" strokeWidth="3" strokeLinecap="round">
      <circle cx="20" cy="20" r="13" fill="#fde047" />
      <path d="M14 22 Q20 29 26 22" />
      <circle cx="15" cy="16" r="1" fill="#3b2f2f" />
      <circle cx="25" cy="16" r="1" fill="#3b2f2f" />
    </g>
  ),
  sad: <path d="M20 8 Q30 22 26 28 Q20 34 14 28 Q10 22 20 8 Z" fill="#60a5fa" />,
  sleepy: (
    <text x="20" y="30" textAnchor="middle" fontSize="22" fontWeight="900" fill="#6366f1">
      z
    </text>
  ),
  hungry: (
    <g stroke="#3b2f2f" strokeWidth="3" strokeLinecap="round">
      <path d="M13 8 L13 32 M9 8 L9 16 Q13 20 17 16 L17 8" fill="none" />
      <path d="M27 32 L27 8 Q33 12 31 22 L27 22" fill="#e2e8f0" />
    </g>
  ),
  music: (
    <g fill="#ec4899">
      <ellipse cx="14" cy="28" rx="6" ry="4.5" />
      <rect x="18" y="8" width="3" height="20" />
      <path d="M18 8 Q30 10 28 20 Q26 14 18 14 Z" />
    </g>
  ),
  idea: (
    <g stroke="#3b2f2f" strokeWidth="2.5">
      <circle cx="20" cy="17" r="10" fill="#fde047" />
      <rect x="15" y="26" width="10" height="7" rx="2" fill="#cbd5e1" />
    </g>
  ),
}

function Feeling({ feel, delay }) {
  const icon = FEELINGS[feel]
  if (!icon) return null
  return (
    <div
      className="pointer-events-none absolute bottom-[98%] left-1/2 z-10 w-[46%] min-w-6"
      style={{ animation: `wl-feel 0.5s ease-out ${delay}s both` }}
    >
      <div style={{ animation: 'wl-feel-float 1.6s ease-in-out infinite' }}>
        <svg viewBox="0 0 40 46" className="h-auto w-full drop-shadow" aria-hidden="true">
          <path d="M20 2 C34 2 39 10 39 20 C39 32 30 38 20 38 L14 45 L14 37 C6 35 1 28 1 20 C1 10 6 2 20 2 Z" fill="#fff" />
          {icon}
        </svg>
      </div>
    </div>
  )
}

// Crumbs that fly off while something is being eaten.
function Crumbs({ delay }) {
  return Array.from({ length: 7 }, (_, i) => {
    const angle = Math.PI * (0.15 + (i / 6) * 0.7)
    return (
      <span
        key={i}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[9%] w-[9%] rounded-full"
        style={{
          backgroundColor: i % 2 ? '#fbbf24' : '#f97316',
          '--dx': `${Math.cos(angle) * 120 * (i % 2 ? 1 : -1)}%`,
          '--dy': `${-Math.sin(angle) * 140}%`,
          animation: `wl-crumb 0.7s ease-out ${delay + (i % 3) * 0.35}s both`,
        }}
      />
    )
  })
}

// Something an actor holds or wears: it moves along with them. Its x, y and
// size are in percent of the actor's own box; `back` puts it behind them.
function Held({ thing }) {
  const { id, x = 50, y = 50, size = 50, rot = 0, eaten, delay = 0 } = thing
  return (
    <div className={`absolute ${thing.back ? '-z-10' : ''}`} style={{ left: `${x}%`, top: `${y}%`, width: `${size}%`, transform: `translate(-50%, -50%) rotate(${rot}deg)` }}>
      <div style={eaten ? { animation: `wl-chomp 1.6s ease-in ${delay}s forwards` } : undefined}>
        <ItemArt id={id} className="h-auto w-full drop-shadow-sm" />
      </div>
      {eaten && <Crumbs delay={delay} />}
    </div>
  )
}

function Zzz() {
  return ['0s', '0.8s', '1.6s'].map((delay) => (
    <span
      key={delay}
      className="pointer-events-none absolute right-0 top-0 text-[150%] font-extrabold text-white drop-shadow"
      style={{ animation: `wl-zzz 2.4s ease-out ${delay} infinite` }}
    >
      z
    </span>
  ))
}

function Actor({ actor, talking }) {
  const { id, x, y, size, from = 'pop', act, flip, gone, eaten, delay = 0, feel, hold = [], mood, run } = actor
  const isBobo = id === 'bobo'
  const move = run ? RUN : MOVE

  // When an actor with legs comes in from the side or changes place, it walks
  // (or runs, or flies) there.
  const last = useRef(null)
  const [steps, setSteps] = useState(() => (ALIVE.has(id) && (from === 'left' || from === 'right') ? 1 : 0))
  useEffect(() => {
    if (last.current && (Math.abs(last.current.x - x) > 1 || Math.abs(last.current.y - y) > 1) && ALIVE.has(id)) setSteps((n) => n + 1)
    last.current = { x, y }
  }, [x, y, id])
  const flying = y < 40 && !isBobo
  const stepping = steps > 0 && `${flying ? 'wl-flap 0.3s' : run ? 'wl-run 0.22s' : 'wl-walk 0.42s'} ease-in-out ${delay}s ${Math.ceil(move / (run ? 0.22 : 0.42))}`

  // Bobo's picture has its own shadow.
  const grounded = !isBobo && !AIR.has(id) && y >= 45 && !gone && !eaten
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        // An actor that is `gone` shrinks to nothing where it stands: hidden, or flown away.
        width: `${gone ? 0 : size}%`,
        opacity: gone ? 0 : 1,
        transform: 'translate(-50%, -50%)',
        transition: ['left', 'top', 'width', 'opacity'].map((p) => `${p} ${move}s ${p === 'opacity' ? 'ease-in' : 'ease-in-out'} ${delay}s`).join(', '),
        // Whoever stands lower on the stage is nearer, so is drawn in front.
        zIndex: Math.round(y),
      }}
    >
      <div className="relative" style={{ animation: `${ENTER[from]} ${delay}s both` }}>
        {grounded && <div className="absolute inset-x-[14%] -bottom-[3%] h-[9%] rounded-[50%] bg-slate-900/15 blur-[2px]" />}
        <div style={eaten ? { animation: `wl-chomp 1.6s ease-in ${delay + move}s forwards` } : undefined}>
          <div key={steps} style={{ animation: stepping || undefined }}>
            <div className="relative" style={{ animation: ACT[act] && `${ACT[act]} ${actor.actAt || 0}s`, transform: act === 'sleep' ? 'rotate(8deg)' : undefined }}>
              <div className="relative isolate" style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
                {isBobo ? (
                  <Bobo talking={talking && actor.talk} waving={act === 'wave'} mood={mood} className="h-auto w-full drop-shadow-md" />
                ) : (
                  <ItemArt id={id} className="h-auto w-full drop-shadow-md" />
                )}
                {hold.map((thing) => (
                  <Held key={thing.id} thing={thing} />
                ))}
              </div>
              {act === 'sleep' && <Zzz />}
              {feel && <Feeling key={feel} feel={feel} delay={actor.feelAt ?? delay + 0.4} />}
            </div>
          </div>
        </div>
        {eaten && <Crumbs delay={delay + move} />}
      </div>
    </div>
  )
}

// Effects drawn over the whole stage (viewBox 400 x 300).
function Rain() {
  return (
    <>
      <rect width="400" height="300" fill="#475569" opacity="0.28" />
      {Array.from({ length: 26 }, (_, i) => (
        <path key={i} d={`M${(i * 53) % 400} -20 l-6 22`} stroke="#bfdbfe" strokeWidth="3" strokeLinecap="round">
          <animateTransform attributeName="transform" type="translate" from="0 0" to="-40 340" dur={`${0.7 + (i % 4) * 0.12}s`} begin={`-${(i % 7) * 0.13}s`} repeatCount="indefinite" />
        </path>
      ))}
      {/* splashes on the grass */}
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={`s${i}`} cx={30 + i * 48} cy={250 + (i % 3) * 16} rx="2" ry="1" fill="none" stroke="#dbeafe" strokeWidth="2">
          <animate attributeName="rx" values="2;14" dur="0.8s" begin={`${(i % 4) * 0.2}s`} repeatCount="indefinite" />
          <animate attributeName="ry" values="1;4" dur="0.8s" begin={`${(i % 4) * 0.2}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0" dur="0.8s" begin={`${(i % 4) * 0.2}s`} repeatCount="indefinite" />
        </ellipse>
      ))}
    </>
  )
}

function Rising({ count, seconds, children }) {
  return Array.from({ length: count }, (_, i) => (
    <g key={i}>
      <g transform={`translate(${30 + ((i * 97) % 340)} 0) scale(${0.8 + (i % 3) * 0.25})`}>{children(i)}</g>
      <animateTransform attributeName="transform" type="translate" from="0 330" to="0 -40" dur={`${seconds + (i % 3)}s`} begin={`-${i * 0.9}s`} repeatCount="indefinite" />
    </g>
  ))
}

const HEART = 'M0 6 C-14 -8 -8 -18 0 -9 C8 -18 14 -8 0 6 Z'

function Hearts() {
  return <Rising count={7} seconds={4}>{(i) => <path d={HEART} fill={i % 2 ? '#fb7185' : '#f472b6'} stroke="#fff" strokeWidth="1.5" />}</Rising>
}

function Notes() {
  const colors = ['#f472b6', '#38bdf8', '#fbbf24', '#4ade80']
  return (
    <Rising count={7} seconds={4}>
      {(i) => (
        <g fill={colors[i % colors.length]}>
          <ellipse cx="-4" cy="6" rx="6" ry="4.5" />
          <rect x="0.5" y="-14" width="2.5" height="20" />
          <path d="M0.5 -14 Q12 -12 10 -2 Q8 -8 0.5 -8 Z" />
        </g>
      )}
    </Rising>
  )
}

function Sparkle() {
  return Array.from({ length: 12 }, (_, i) => {
    const x = 20 + ((i * 83) % 360)
    const y = 16 + ((i * 47) % 150)
    return (
      <path key={i} d={`M${x} ${y - 9} L${x + 2.5} ${y - 2.5} L${x + 9} ${y} L${x + 2.5} ${y + 2.5} L${x} ${y + 9} L${x - 2.5} ${y + 2.5} L${x - 9} ${y} L${x - 2.5} ${y - 2.5} Z`} fill={i % 2 ? '#fff' : '#fde047'}>
        <animate attributeName="opacity" values="0;1;0" dur="1.6s" begin={`${(i % 6) * 0.25}s`} repeatCount="indefinite" />
      </path>
    )
  })
}

function Confetti() {
  const colors = ['#f87171', '#fbbf24', '#4ade80', '#60a5fa', '#c084fc', '#f472b6']
  return Array.from({ length: 28 }, (_, i) => (
    <rect key={i} x={(i * 71) % 400} y="-12" width="7" height="11" rx="2" fill={colors[i % colors.length]}>
      <animateTransform attributeName="transform" type="translate" from="0 0" to={`${(i % 5) * 12 - 24} 330`} dur={`${2.6 + (i % 5) * 0.4}s`} begin={`-${(i % 9) * 0.4}s`} repeatCount="indefinite" />
    </rect>
  ))
}

// Coloured party lights that sweep over the dance floor.
function Lights() {
  const colors = ['#f472b6', '#60a5fa', '#fde047', '#4ade80']
  return colors.map((color, i) => (
    <g key={color} opacity="0.2">
      <path d="M0 0 L-60 320 L60 320 Z" fill={color} transform={`translate(${60 + i * 95} -10)`}>
        <animateTransform attributeName="transform" type="rotate" values={`-25 0 0;25 0 0;-25 0 0`} dur={`${2.4 + i * 0.5}s`} additive="sum" repeatCount="indefinite" />
      </path>
    </g>
  ))
}

const FX = { rain: Rain, hearts: Hearts, notes: Notes, sparkle: Sparkle, confetti: Confetti, lights: Lights }

/**
 * One moment of a story: the backdrop, the effects and the actors. Actors
 * are keyed by id, so from one beat to the next they walk or glide to their
 * new places instead of jumping. `camera` ([x, y, zoom]) moves in close to
 * whatever the sentence is about.
 */
export default function StoryStage({ scene, actors, fx = [], camera = [50, 50, 1], talking }) {
  // Always in the same order, so an actor already on the stage is never
  // re-inserted (which would restart whatever it is doing).
  const ordered = [...actors].sort((a, b) => (a.key || a.id).localeCompare(b.key || b.id))
  const [cx, cy, zoom] = camera
  return (
    <div className="stage-motion absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ transform: `scale(${zoom})`, transformOrigin: `${cx}% ${cy}%`, transition: 'transform 1.6s ease-in-out' }}
      >
        <div key={scene} className="absolute inset-0" style={{ animation: 'wl-fade-in 0.7s ease-out both' }}>
          <Scene name={scene} className="absolute inset-0 h-full w-full" />
        </div>
        {ordered.map((actor) => (
          <Actor key={actor.key || actor.id} actor={actor} talking={talking} />
        ))}
      </div>
      {fx.length > 0 && (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 z-[200] h-full w-full" aria-hidden="true">
          {fx.map((name) => {
            const Effect = FX[name]
            return Effect ? <Effect key={name} /> : null
          })}
        </svg>
      )}
    </div>
  )
}
