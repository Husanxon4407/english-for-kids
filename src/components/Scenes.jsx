// Story backdrops. Each fills a 4:3 stage (viewBox 400 x 300); the story's
// pictures are placed on top of it. Everything here moves a little (clouds,
// leaves, butterflies, stars), so the stage never looks like a photo.

function Flower({ x, y, color }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g>
        <path d="M0 0 L0 14" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
        {[0, 72, 144, 216, 288].map((a) => (
          <circle key={a} cx="0" cy="-5" r="3.6" fill={color} transform={`rotate(${a})`} />
        ))}
        <circle r="2.6" fill="#fde047" />
        <animateTransform attributeName="transform" type="rotate" values="-8 0 14;8 0 14;-8 0 14" dur={`${2.6 + (x % 5) * 0.3}s`} repeatCount="indefinite" />
      </g>
    </g>
  )
}

function Cloud({ x, y, scale = 1, seconds = 50, opacity = 0.9 }) {
  return (
    <g opacity={opacity}>
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <path d="M0 26 Q-18 26 -16 12 Q-14 0 0 0 Q4 -16 24 -14 Q40 -14 46 0 Q64 -4 68 12 Q70 26 54 26 Z" fill="#fff" />
      </g>
      <animateTransform attributeName="transform" type="translate" from="-120 0" to="460 0" dur={`${seconds}s`} begin={`-${(x / 400) * seconds}s`} repeatCount="indefinite" />
    </g>
  )
}

// A butterfly that flutters along a looping path.
function Butterfly({ path, color, seconds = 9, delay = 0 }) {
  return (
    <g>
      <g>
        <ellipse cx="-5" cy="0" rx="6" ry="8" fill={color} />
        <ellipse cx="5" cy="0" rx="6" ry="8" fill={color} />
        <rect x="-1.2" y="-6" width="2.4" height="12" rx="1.2" fill="#3b2f2f" />
        <animateTransform attributeName="transform" type="scale" values="1 1;0.25 1;1 1" dur="0.3s" repeatCount="indefinite" />
      </g>
      <animateMotion path={path} dur={`${seconds}s`} begin={`-${delay}s`} repeatCount="indefinite" />
    </g>
  )
}

// A far-away bird: just a flapping "v".
function FarBird({ path, seconds = 16 }) {
  return (
    <g fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round">
      <path d="M-10 0 q5 -5 10 0 q5 -5 10 0">
        <animate attributeName="d" values="M-10 0 q5 -5 10 0 q5 -5 10 0;M-10 0 q5 3 10 0 q5 3 10 0;M-10 0 q5 -5 10 0 q5 -5 10 0" dur="0.6s" repeatCount="indefinite" />
      </path>
      <animateMotion path={path} dur={`${seconds}s`} repeatCount="indefinite" />
    </g>
  )
}

function Twinkle({ x, y, r = 2, delay = 0 }) {
  return (
    <circle cx={x} cy={y} r={r} fill="#fff">
      <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
    </circle>
  )
}

function Garden() {
  return (
    <>
      <rect width="400" height="300" fill="#bfe6ff" />
      <Cloud x={40} y={34} />
      <Cloud x={200} y={14} scale={0.7} seconds={64} opacity={0.75} />
      <FarBird path="M-30 60 C100 30 200 80 430 40" seconds={18} />
      <path d="M0 170 Q100 120 210 160 T400 150 L400 300 L0 300 Z" fill="#a7e08a" />
      <path d="M0 196 Q120 168 240 190 T400 184 L400 300 L0 300 Z" fill="#7cc95a" />
      {/* tree, its top moving in the breeze */}
      <rect x="286" y="96" width="20" height="96" rx="6" fill="#a16207" />
      <g>
        <circle cx="296" cy="74" r="50" fill="#4ade80" />
        <circle cx="262" cy="96" r="30" fill="#22c55e" />
        <circle cx="330" cy="98" r="32" fill="#22c55e" />
        <circle cx="280" cy="58" r="6" fill="#ef4444" />
        <circle cx="320" cy="86" r="6" fill="#ef4444" />
        <circle cx="262" cy="100" r="5" fill="#ef4444" />
        <animateTransform attributeName="transform" type="rotate" values="-1.5 296 190;1.5 296 190;-1.5 296 190" dur="4s" repeatCount="indefinite" />
      </g>
      {/* fence */}
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={8 + i * 26} y="150" width="12" height="44" rx="5" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
      ))}
      <rect x="4" y="164" width="232" height="7" rx="3" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
      <Flower x={30} y={270} color="#f472b6" />
      <Flower x={150} y={282} color="#fb923c" />
      <Flower x={250} y={266} color="#a78bfa" />
      <Flower x={370} y={278} color="#f472b6" />
      <Butterfly color="#f9a8d4" path="M60 120 C120 60 180 180 240 110 S340 60 380 130 S200 200 60 120 Z" seconds={14} />
      <Butterfly color="#fde047" path="M340 210 C280 150 220 240 160 190 S60 150 40 220 S240 260 340 210 Z" seconds={17} delay={5} />
    </>
  )
}

function Room({ night = false }) {
  return (
    <>
      <rect width="400" height="300" fill={night ? '#4c5fa8' : '#fde9c9'} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={i * 50 + 22} y="0" width="6" height="200" fill="#fff" opacity={night ? 0.06 : 0.35} />
      ))}
      <rect y="196" width="400" height="104" fill={night ? '#6b4f3a' : '#d9a066'} />
      <rect y="196" width="400" height="8" fill={night ? '#4a3626' : '#b9824c'} />
      {/* window */}
      <rect x="150" y="34" width="100" height="84" rx="8" fill="#fff" />
      <rect x="158" y="42" width="84" height="68" rx="4" fill={night ? '#1e2a5a' : '#8fd3ff'} />
      {night ? (
        <>
          <path d="M214 56 A16 16 0 1 0 228 84 A13 13 0 1 1 214 56 Z" fill="#fde68a" />
          <Twinkle x={176} y={60} />
          <Twinkle x={190} y={88} r={1.6} delay={0.7} />
          <Twinkle x={170} y={98} r={1.4} delay={1.3} />
          <Twinkle x={234} y={100} r={1.6} delay={0.4} />
        </>
      ) : (
        <g>
          <ellipse cx="190" cy="92" rx="24" ry="8" fill="#fff" opacity="0.9" />
          <animateTransform attributeName="transform" type="translate" values="-12 0;14 0;-12 0" dur="12s" repeatCount="indefinite" />
        </g>
      )}
      <path d="M200 42 L200 110 M158 76 L242 76" stroke="#fff" strokeWidth="5" />
      {/* curtains, gently moving */}
      {[[146, 1], [254, -1]].map(([x, side]) => (
        <path key={x} d={`M${x} 26 Q${x - 14 * side} 76 ${x + 2 * side} 128 L${x - 18 * side} 128 Q${x - 26 * side} 76 ${x - 18 * side} 26 Z`} fill={night ? '#7c5fb0' : '#f9a8d4'}>
          <animateTransform attributeName="transform" type="skewX" values="0;2;0;-1;0" dur="5s" repeatCount="indefinite" />
        </path>
      ))}
      <rect x="120" y="22" width="160" height="7" rx="3" fill={night ? '#4a3626' : '#b9824c'} />
      {night && (
        <circle cx="200" cy="76" r="70" fill="#fde68a" opacity="0.12">
          <animate attributeName="opacity" values="0.06;0.18;0.06" dur="4s" repeatCount="indefinite" />
        </circle>
      )}
      {/* rug */}
      <ellipse cx="200" cy="262" rx="150" ry="28" fill={night ? '#7c5fb0' : '#f9a8d4'} />
      <ellipse cx="200" cy="262" rx="118" ry="19" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="4 9" opacity="0.7" />
    </>
  )
}

function Hill() {
  return (
    <>
      <rect width="400" height="300" fill="#bfe6ff" />
      <Cloud x={20} y={40} seconds={56} />
      <Cloud x={180} y={74} scale={0.6} seconds={70} opacity={0.7} />
      <FarBird path="M-30 100 C100 70 220 120 430 80" />
      <path d="M-20 300 Q200 60 420 300 Z" fill="#8fd16a" />
      <path d="M-20 300 Q60 190 170 300 Z" fill="#7cc95a" />
      <path d="M250 300 Q340 200 420 300 Z" fill="#7cc95a" />
      {/* picnic blanket */}
      <g transform="translate(200 240)">
        <path d="M-150 -18 L150 -18 L176 46 L-176 46 Z" fill="#fff" />
        {[-120, -60, 0, 60, 120].map((x) => (
          <path key={x} d={`M${x - 15} -18 L${x + 15} -18 L${(x + 15) * 1.17} 46 L${(x - 15) * 1.17} 46 Z`} fill="#f87171" opacity="0.75" />
        ))}
        <path d="M-158 2 L158 2 L163 14 L-163 14 Z M-169 30 L169 30 L174 42 L-174 42 Z" fill="#f87171" opacity="0.45" />
      </g>
      <Flower x={34} y={236} color="#fde047" />
      <Flower x={64} y={262} color="#f472b6" />
      <Flower x={372} y={232} color="#f472b6" />
      <Flower x={340} y={262} color="#a78bfa" />
      <Butterfly color="#fde047" path="M40 200 C100 150 160 230 230 180 S330 150 370 200 S200 240 40 200 Z" seconds={15} />
    </>
  )
}

function Party() {
  const flags = ['#f87171', '#fbbf24', '#4ade80', '#60a5fa', '#c084fc', '#f472b6', '#fb923c', '#34d399']
  return (
    <>
      <rect width="400" height="300" fill="#e9defc" />
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={i} cx={(i * 67) % 400} cy={40 + ((i * 53) % 150)} r="4" fill={flags[i % flags.length]} opacity="0.35">
          <animate attributeName="opacity" values="0.15;0.6;0.15" dur="1.8s" begin={`${(i % 6) * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <rect y="206" width="400" height="94" fill="#c9a4f5" />
      <rect y="206" width="400" height="8" fill="#a67ee0" />
      {/* bunting, fluttering */}
      <path d="M0 22 Q200 74 400 22" fill="none" stroke="#7c5fb0" strokeWidth="2.5" />
      {flags.map((color, i) => {
        const t = (i + 0.5) / flags.length
        const x = t * 400
        const y = 22 + 52 * (1 - (2 * t - 1) ** 2)
        return (
          <path key={color} d={`M${x - 15} ${y - 2} L${x + 15} ${y - 2} L${x} ${y + 30} Z`} fill={color}>
            <animateTransform attributeName="transform" type="rotate" values={`-7 ${x} ${y};7 ${x} ${y};-7 ${x} ${y}`} dur={`${1.6 + (i % 3) * 0.3}s`} repeatCount="indefinite" />
          </path>
        )
      })}
      {/* balloons, bobbing */}
      {[
        [34, 120, '#f87171'],
        [66, 100, '#60a5fa'],
        [352, 104, '#fbbf24'],
        [380, 128, '#4ade80'],
      ].map(([x, y, color], i) => (
        <g key={x}>
          <path d={`M${x} ${y + 24} Q${x - 8} ${y + 60} ${x + 4} ${y + 96}`} fill="none" stroke="#7c5fb0" strokeWidth="1.5" />
          <ellipse cx={x} cy={y} rx="19" ry="24" fill={color} />
          <ellipse cx={x - 6} cy={y - 8} rx="4" ry="7" fill="#fff" opacity="0.5" />
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -9;0 0" dur={`${2.2 + i * 0.4}s`} repeatCount="indefinite" />
        </g>
      ))}
    </>
  )
}

const SCENES = { garden: Garden, room: Room, night: () => <Room night />, hill: Hill, party: Party }

export default function Scene({ name, className = '' }) {
  const Backdrop = SCENES[name] || Garden
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <Backdrop />
    </svg>
  )
}
