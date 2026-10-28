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

// The seaside: sand in front, the sea rolling behind (the sea's actors stand in the water).
function Beach() {
  return (
    <>
      <rect width="400" height="300" fill="#bae6fd" />
      <Cloud x={60} y={30} />
      <Cloud x={250} y={50} scale={0.7} seconds={60} opacity={0.8} />
      <circle cx="340" cy="54" r="26" fill="#fde047" />
      <rect y="120" width="400" height="110" fill="#38bdf8" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M-40 ${132 + i * 30} q25 -10 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0`} fill="none" stroke="#e0f2fe" strokeWidth="4" strokeLinecap="round" opacity="0.8">
          <animateTransform attributeName="transform" type="translate" values={`0 0;${i % 2 ? -50 : 50} 0;0 0`} dur={`${5 + i}s`} repeatCount="indefinite" />
        </path>
      ))}
      <path d="M0 220 Q100 206 200 216 T400 210 L400 300 L0 300 Z" fill="#fde68a" />
      <path d="M0 226 Q100 214 200 222 T400 218" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.7">
        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
      </path>
      <circle cx="40" cy="276" r="5" fill="#fb923c" />
      <circle cx="360" cy="284" r="4" fill="#f472b6" />
    </>
  )
}

// A town street with houses and a bus stop.
function Street() {
  return (
    <>
      <rect width="400" height="300" fill="#bfe6ff" />
      <Cloud x={30} y={30} />
      <Cloud x={220} y={20} scale={0.8} seconds={56} opacity={0.8} />
      {[[10, 110, '#fca5a5'], [100, 90, '#fde68a'], [190, 120, '#a5b4fc'], [290, 100, '#86efac']].map(([x, h, c]) => (
        <g key={x}>
          <rect x={x} y={200 - h} width="80" height={h} fill={c} />
          <path d={`M${x - 6} ${200 - h} L${x + 40} ${170 - h} L${x + 86} ${200 - h} Z`} fill="#b45309" />
          <rect x={x + 14} y={220 - h} width="18" height="18" rx="2" fill="#fff" />
          <rect x={x + 48} y={220 - h} width="18" height="18" rx="2" fill="#fff" />
        </g>
      ))}
      <rect y="200" width="400" height="20" fill="#cbd5e1" />
      <rect y="220" width="400" height="80" fill="#64748b" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={10 + i * 60} y="258" width="34" height="6" rx="3" fill="#fef9c3" />
      ))}
      {/* the bus stop */}
      <rect x="352" y="140" width="6" height="64" fill="#475569" />
      <circle cx="355" cy="134" r="14" fill="#facc15" stroke="#475569" strokeWidth="3" />
      <text x="355" y="139" textAnchor="middle" fontSize="13" fontWeight="900" fill="#475569" fontFamily="sans-serif">
        B
      </text>
    </>
  )
}

// A jungle with palm trees and a smoking volcano (Dino Valley).
function Jungle() {
  return (
    <>
      <rect width="400" height="300" fill="#fef3c7" />
      <path d="M220 200 L290 70 L330 70 L400 200 Z" fill="#a16207" />
      <path d="M290 70 L330 70 L322 86 Q310 78 298 86 Z" fill="#ef4444" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="310" cy="60" r="10" fill="#94a3b8" opacity="0.8">
          <animate attributeName="cy" values="64;8" dur="3.5s" begin={`${i * 1.2}s`} repeatCount="indefinite" />
          <animate attributeName="r" values="8;24" dur="3.5s" begin={`${i * 1.2}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="3.5s" begin={`${i * 1.2}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <path d="M0 180 Q100 150 200 176 T400 170 L400 300 L0 300 Z" fill="#84cc16" />
      <path d="M0 210 Q120 186 240 206 T400 200 L400 300 L0 300 Z" fill="#65a30d" />
      {[30, 180].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 230 Q${x - 6} 170 ${x + 8} 120`} fill="none" stroke="#92400e" strokeWidth="10" strokeLinecap="round" />
          <g>
            {[-50, -10, 30, 70, 110].map((a) => (
              <path key={a} d={`M${x + 8} 120 q${Math.cos((a * Math.PI) / 180) * 34} ${-Math.sin((a * Math.PI) / 180) * 34 - 8} ${Math.cos((a * Math.PI) / 180) * 58} ${-Math.sin((a * Math.PI) / 180) * 58 + 16}`} fill="none" stroke="#16a34a" strokeWidth="9" strokeLinecap="round" />
            ))}
            <animateTransform attributeName="transform" type="rotate" values={`-2 ${x + 8} 120;2 ${x + 8} 120;-2 ${x + 8} 120`} dur={`${3 + i}s`} repeatCount="indefinite" />
          </g>
        </g>
      ))}
    </>
  )
}

// A classroom: a board, a window and the floor.
function Classroom() {
  return (
    <>
      <rect width="400" height="300" fill="#e0f2fe" />
      <rect x="30" y="40" width="170" height="100" rx="6" fill="#166534" stroke="#a16207" strokeWidth="8" />
      <text x="115" y="84" textAnchor="middle" fontSize="26" fontWeight="800" fill="#fff" fontFamily="sans-serif" opacity="0.9">
        A B C
      </text>
      <text x="115" y="118" textAnchor="middle" fontSize="22" fontWeight="800" fill="#fde047" fontFamily="sans-serif" opacity="0.9">
        1 2 3
      </text>
      <rect x="250" y="40" width="110" height="90" rx="6" fill="#bae6fd" stroke="#fff" strokeWidth="8" />
      <path d="M305 40 L305 130 M250 85 L360 85" stroke="#fff" strokeWidth="6" />
      <Cloud x={250} y={56} scale={0.4} seconds={30} />
      {['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7'].map((c, i) => (
        <path key={c} d={`M${20 + i * 80} 18 L${60 + i * 80} 18 L${40 + i * 80} 34 Z`} fill={c} opacity="0.8" />
      ))}
      <rect y="196" width="400" height="104" fill="#fcd34d" />
      <rect y="196" width="400" height="8" fill="#d97706" />
    </>
  )
}

// A snowy day outside, with snow falling.
function Snow() {
  return (
    <>
      <rect width="400" height="300" fill="#dbeafe" />
      <path d="M0 170 Q100 140 210 166 T400 160 L400 300 L0 300 Z" fill="#fff" />
      <path d="M0 200 Q120 180 240 196 T400 192 L400 300 L0 300 Z" fill="#f1f5f9" />
      <path d="M300 170 L330 110 L360 170 Z" fill="#15803d" />
      <path d="M306 140 L330 92 L354 140 Z" fill="#16a34a" />
      <path d="M318 112 L330 86 L342 112 Z" fill="#fff" />
      {Array.from({ length: 28 }, (_, i) => (
        <circle key={i} cx={(i * 53) % 400} cy="-10" r={2 + (i % 3)} fill="#fff">
          <animate attributeName="cy" values="-10;310" dur={`${5 + (i % 5)}s`} begin={`-${(i * 0.7) % 6}s`} repeatCount="indefinite" />
          <animate attributeName="cx" values={`${(i * 53) % 400};${((i * 53) % 400) + 14};${(i * 53) % 400}`} dur="3s" repeatCount="indefinite" />
        </circle>
      ))}
    </>
  )
}

const SCENES = {
  garden: Garden,
  room: Room,
  night: () => <Room night />,
  hill: Hill,
  party: Party,
  beach: Beach,
  street: Street,
  jungle: Jungle,
  classroom: Classroom,
  snow: Snow,
}

export default function Scene({ name, className = '' }) {
  const Backdrop = SCENES[name] || Garden
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <Backdrop />
    </svg>
  )
}
