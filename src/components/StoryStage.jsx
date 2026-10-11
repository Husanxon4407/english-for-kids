import Scene from './Scenes.jsx'
import ItemArt from './ItemArt.jsx'
import { Bobo } from './Mascot.jsx'

// How long an actor takes to glide to its new place.
const MOVE = '1.1s'

const ENTER = {
  left: 'wl-enter-left 1.1s ease-out both',
  right: 'wl-enter-right 1.1s ease-out both',
  top: 'wl-enter-top 0.9s ease-out both',
  pop: 'wl-bounce-in 0.5s ease-out both',
}

const ACT = {
  hop: 'wl-hop 0.7s ease-in-out infinite',
  bounce: 'wl-hop-high 0.8s ease-in-out infinite',
  dance: 'wl-dance 0.9s ease-in-out infinite',
  wiggle: 'wl-wiggle 0.5s ease-in-out infinite',
  sway: 'wl-sway 3s ease-in-out infinite',
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
  const { id, x, y, size, from = 'pop', act, flip, gone, delay = 0 } = actor
  const isBobo = id === 'bobo'
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        // An actor that is `gone` shrinks to nothing where it stands: eaten or hidden.
        width: `${gone ? 0 : size}%`,
        opacity: gone ? 0 : 1,
        transform: 'translate(-50%, -50%)',
        transition: `left ${MOVE} ease-in-out, top ${MOVE} ease-in-out, width ${MOVE} ease-in-out, opacity ${MOVE} ease-in`,
        transitionDelay: `${delay}s`,
        // Whoever stands lower on the stage is nearer, so is drawn in front.
        zIndex: Math.round(y),
      }}
    >
      <div style={{ animation: ENTER[from] }}>
        <div className="relative" style={{ animation: ACT[act], transform: act === 'sleep' ? 'rotate(8deg)' : undefined }}>
          <div style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
            {isBobo ? (
              <Bobo talking={talking} waving={act === 'wave' || act === 'hop'} className="h-auto w-full drop-shadow-md" />
            ) : (
              <ItemArt id={id} className="h-auto w-full drop-shadow-md" />
            )}
          </div>
          {act === 'sleep' && <Zzz />}
        </div>
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

const FX = { rain: Rain, hearts: Hearts, notes: Notes, sparkle: Sparkle, confetti: Confetti }

/**
 * One moment of a story: the backdrop, the effects and the actors. Actors
 * are keyed by id, so from one beat to the next they glide to their new
 * places instead of jumping.
 */
export default function StoryStage({ scene, actors, fx = [], talking }) {
  // Always in the same order, so an actor already on the stage is never
  // re-inserted (which would restart whatever it is doing).
  const ordered = [...actors].sort((a, b) => (a.key || a.id).localeCompare(b.key || b.id))
  return (
    <div className="stage-motion absolute inset-0 overflow-hidden">
      <div key={scene} className="absolute inset-0" style={{ animation: 'wl-fade-in 0.7s ease-out both' }}>
        <Scene name={scene} className="absolute inset-0 h-full w-full" />
      </div>
      {ordered.map((actor) => (
        <Actor key={actor.key || actor.id} actor={actor} talking={talking} />
      ))}
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
