// Moving backdrops for Song Time: every song has its own place. Each fills
// the stage (viewBox 400 x 240) behind Bobo and the pictures.

function Cloud({ x, y, scale = 1, seconds = 40, opacity = 0.9 }) {
  return (
    <g opacity={opacity}>
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <path d="M0 26 Q-18 26 -16 12 Q-14 0 0 0 Q4 -16 24 -14 Q40 -14 46 0 Q64 -4 68 12 Q70 26 54 26 Z" fill="#fff" />
      </g>
      <animateTransform attributeName="transform" type="translate" from="-120 0" to="460 0" dur={`${seconds}s`} begin={`-${(x / 400) * seconds}s`} repeatCount="indefinite" />
    </g>
  )
}

function Twinkle({ x, y, r = 3, delay = 0, color = '#fff' }) {
  return (
    <path d={`M${x} ${y - r * 2} L${x + r * 0.6} ${y - r * 0.6} L${x + r * 2} ${y} L${x + r * 0.6} ${y + r * 0.6} L${x} ${y + r * 2} L${x - r * 0.6} ${y + r * 0.6} L${x - r * 2} ${y} L${x - r * 0.6} ${y - r * 0.6} Z`} fill={color}>
      <animate attributeName="opacity" values="0.2;1;0.2" dur="2.4s" begin={`${delay}s`} repeatCount="indefinite" />
    </path>
  )
}

// Something small that floats up the stage again and again (bubbles, balloons, notes).
function Riser({ x, seconds = 9, delay = 0, children }) {
  return (
    <g>
      <g transform={`translate(${x} 0)`}>{children}</g>
      <animateTransform attributeName="transform" type="translate" from="0 270" to="0 -40" dur={`${seconds}s`} begin={`-${delay}s`} repeatCount="indefinite" />
    </g>
  )
}

function Sun({ x = 340, y = 46 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g>
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d="M0 -40 L6 -26 L-6 -26 Z" fill="#fdba74" transform={`rotate(${i * 36})`} />
        ))}
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="24s" repeatCount="indefinite" />
      </g>
      <circle r="24" fill="#fde047" />
    </g>
  )
}

function Hills({ back = '#a7e08a', front = '#7cc95a' }) {
  return (
    <>
      <path d="M0 160 Q90 110 200 150 T400 140 L400 240 L0 240 Z" fill={back} />
      <path d="M0 190 Q120 160 240 184 T400 178 L400 240 L0 240 Z" fill={front} />
    </>
  )
}

function Night() {
  const stars = [[30, 30, 3], [84, 70, 2], [140, 24, 3.5], [200, 56, 2.5], [250, 22, 2], [300, 74, 3], [366, 40, 2.5], [56, 118, 2], [330, 128, 2], [180, 108, 2]]
  return (
    <>
      <rect width="400" height="240" fill="#312e81" />
      <rect width="400" height="240" fill="url(#night-glow)" />
      <defs>
        <radialGradient id="night-glow" cx="0.82" cy="0.2" r="0.6">
          <stop offset="0" stopColor="#818cf8" stopOpacity="0.7" />
          <stop offset="1" stopColor="#312e81" stopOpacity="0" />
        </radialGradient>
      </defs>
      {stars.map(([x, y, r], i) => (
        <Twinkle key={x} x={x} y={y} r={r} delay={(i * 0.37) % 2.4} color={i % 3 ? '#fff' : '#fde68a'} />
      ))}
      <path d="M338 26 A28 28 0 1 0 362 76 A22 22 0 1 1 338 26 Z" fill="#fde68a" />
      <path d="M0 190 Q100 150 210 186 T400 176 L400 240 L0 240 Z" fill="#3730a3" />
      <path d="M0 214 Q140 186 260 210 T400 204 L400 240 L0 240 Z" fill="#4338ca" />
    </>
  )
}

function Farm() {
  return (
    <>
      <rect width="400" height="240" fill="#bfe6ff" />
      <Sun />
      <Cloud x={40} y={30} seconds={46} />
      <Cloud x={230} y={54} scale={0.7} seconds={60} opacity={0.75} />
      <Hills />
      {/* barn */}
      <g transform="translate(36 96)">
        <path d="M0 40 L0 84 L74 84 L74 40 L37 8 Z" fill="#ef4444" />
        <path d="M-6 42 L37 4 L80 42" fill="none" stroke="#fff" strokeWidth="6" strokeLinejoin="round" />
        <rect x="24" y="48" width="26" height="36" fill="#fff" />
        <path d="M24 48 L50 84 M50 48 L24 84" stroke="#ef4444" strokeWidth="3" />
      </g>
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={186 + i * 28} y="150" width="10" height="34" rx="4" fill="#fff" />
      ))}
      <rect x="180" y="160" width="224" height="6" rx="3" fill="#fff" />
    </>
  )
}

function Orchard() {
  const trees = [[60, '#ef4444'], [200, '#fb923c'], [340, '#f472b6']]
  return (
    <>
      <rect width="400" height="240" fill="#fef3c7" />
      <Cloud x={120} y={24} seconds={52} />
      <Cloud x={320} y={46} scale={0.7} seconds={66} opacity={0.8} />
      <Hills back="#bbf7d0" front="#86efac" />
      {trees.map(([x, fruit]) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <rect x="-8" y="120" width="16" height="70" rx="5" fill="#a16207" />
          <g>
            <circle cy="96" r="44" fill="#4ade80" />
            <circle cx="-30" cy="112" r="24" fill="#22c55e" />
            <circle cx="30" cy="112" r="24" fill="#22c55e" />
            {[[-20, 84], [14, 74], [24, 108], [-12, 116]].map(([fx, fy]) => (
              <circle key={fx} cx={fx} cy={fy} r="7" fill={fruit} />
            ))}
            <animateTransform attributeName="transform" type="rotate" values="-2 0 190;2 0 190;-2 0 190" dur="4s" repeatCount="indefinite" />
          </g>
        </g>
      ))}
    </>
  )
}

function Balloons() {
  const colors = ['#f87171', '#fbbf24', '#4ade80', '#60a5fa', '#c084fc', '#f472b6']
  return (
    <>
      <rect width="400" height="240" fill="#ffedd5" />
      <Sun x={56} y={44} />
      <Hills back="#fdba74" front="#fb923c" />
      {colors.map((color, i) => (
        <Riser key={color} x={30 + i * 66} seconds={10 + (i % 3) * 3} delay={i * 2.3}>
          <path d="M0 22 Q-5 40 2 58" fill="none" stroke="#9a3412" strokeWidth="1.5" />
          <ellipse rx="15" ry="20" fill={color} />
          <ellipse cx="-5" cy="-7" rx="3" ry="6" fill="#fff" opacity="0.5" />
        </Riser>
      ))}
    </>
  )
}

// Turning rays with rising bubbles: letters for the alphabet song, stars (`stars`) for a party.
function Sunburst({ stars = false }) {
  return (
    <>
      <rect width="400" height="240" fill="#fecaca" />
      <g transform="translate(200 250)">
        <g>
          {Array.from({ length: 18 }, (_, i) => (
            <path key={i} d="M0 0 L-28 -420 L28 -420 Z" fill={i % 2 ? '#fda4af' : '#fef08a'} opacity="0.75" transform={`rotate(${i * 20})`} />
          ))}
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="60s" repeatCount="indefinite" />
        </g>
      </g>
      {['A', 'B', 'C'].map((letter, i) => (
        <Riser key={letter} x={50 + i * 150} seconds={11 + i * 2} delay={i * 3.5}>
          <circle r="16" fill="#fff" opacity="0.85" />
          {stars ? (
            <path d="M0 -11 L3 -4 L11 -4 L5 1 L7 9 L0 4 L-7 9 L-5 1 L-11 -4 L-3 -4 Z" fill={['#f59e0b', '#ec4899', '#22c55e'][i]} />
          ) : (
            <text y="7" textAnchor="middle" fontSize="20" fontWeight="800" fill={['#ef4444', '#3b82f6', '#22c55e'][i]}>
              {letter}
            </text>
          )}
        </Riser>
      ))}
    </>
  )
}

function Castle() {
  const shapes = [
    [40, <circle key="c" r="12" fill="none" stroke="#fff" strokeWidth="4" />],
    [120, <rect key="s" x="-11" y="-11" width="22" height="22" rx="3" fill="none" stroke="#fde68a" strokeWidth="4" />],
    [210, <path key="t" d="M0 -13 L13 11 L-13 11 Z" fill="none" stroke="#f9a8d4" strokeWidth="4" strokeLinejoin="round" />],
    [290, <path key="d" d="M0 -14 L12 0 L0 14 L-12 0 Z" fill="none" stroke="#a5f3fc" strokeWidth="4" strokeLinejoin="round" />],
    [360, <circle key="c2" r="9" fill="none" stroke="#bbf7d0" strokeWidth="4" />],
  ]
  return (
    <>
      <rect width="400" height="240" fill="#c4b5fd" />
      {shapes.map(([x, shape], i) => (
        <Riser key={x} x={x} seconds={12 + (i % 3) * 3} delay={i * 2.7}>
          {shape}
        </Riser>
      ))}
      {/* castle */}
      <g fill="#7c3aed">
        <rect x="120" y="150" width="160" height="90" />
        <rect x="100" y="120" width="40" height="120" />
        <rect x="260" y="120" width="40" height="120" />
        <rect x="180" y="100" width="40" height="60" />
        <path d="M94 120 L120 84 L146 120 Z M254 120 L280 84 L306 120 Z M174 100 L200 62 L226 100 Z" fill="#f472b6" />
      </g>
      <path d="M186 240 L186 204 Q200 186 214 204 L214 240 Z" fill="#4c1d95" />
      <rect y="228" width="400" height="12" fill="#a78bfa" />
    </>
  )
}

function Rainbow() {
  const bands = ['#ef4444', '#fb923c', '#fde047', '#4ade80', '#38bdf8', '#a78bfa']
  return (
    <>
      <rect width="400" height="240" fill="#bae6fd" />
      {bands.map((color, i) => (
        <path key={color} d={`M${40 + i * 14} 250 A${160 - i * 14} ${160 - i * 14} 0 0 1 ${360 - i * 14} 250`} fill="none" stroke={color} strokeWidth="14" />
      ))}
      <Cloud x={20} y={170} scale={1.3} seconds={70} />
      <Cloud x={250} y={186} scale={1.5} seconds={90} />
      <Cloud x={160} y={22} scale={0.8} seconds={48} opacity={0.8} />
      <Sun x={350} y={42} />
    </>
  )
}

function Windy() {
  return (
    <>
      <rect width="400" height="240" fill="#a5d8ff" />
      <Cloud x={30} y={26} seconds={18} />
      <Cloud x={200} y={60} scale={0.8} seconds={24} opacity={0.85} />
      <Cloud x={330} y={18} scale={0.6} seconds={15} opacity={0.7} />
      {[70, 120, 96].map((y, i) => (
        <g key={y}>
          <path d={`M0 ${y} q30 -14 60 0 q16 8 8 18 q-8 8 -16 0`} fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
          <animateTransform attributeName="transform" type="translate" from="-90 0" to="420 0" dur={`${7 + i * 2}s`} begin={`-${i * 2.5}s`} repeatCount="indefinite" />
        </g>
      ))}
      <Hills back="#86efac" front="#4ade80" />
    </>
  )
}

function Kitchen() {
  return (
    <>
      <rect width="400" height="240" fill="#fef3c7" />
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={i * 40 + 16} width="8" height="170" fill="#fde68a" />
      ))}
      {/* window */}
      <rect x="150" y="26" width="100" height="74" rx="8" fill="#fff" />
      <rect x="158" y="34" width="84" height="58" rx="4" fill="#312e81" />
      <Twinkle x={180} y={52} r={3} />
      <Twinkle x={222} y={70} r={2.5} delay={1.1} color="#fde68a" />
      <path d="M200 34 L200 92 M158 63 L242 63" stroke="#fff" strokeWidth="5" />
      {/* shelves with pots that wobble */}
      <rect x="20" y="78" width="100" height="8" rx="3" fill="#b45309" />
      <rect x="280" y="78" width="100" height="8" rx="3" fill="#b45309" />
      {[[36, '#f87171'], [72, '#60a5fa'], [296, '#4ade80'], [336, '#f472b6']].map(([x, color], i) => (
        <g key={x}>
          <path d={`M${x} 78 L${x + 4} 52 L${x + 26} 52 L${x + 30} 78 Z`} fill={color} />
          <animateTransform attributeName="transform" type="rotate" values={`-4 ${x + 15} 78;4 ${x + 15} 78;-4 ${x + 15} 78`} dur="1.2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
        </g>
      ))}
      {/* checked floor */}
      <rect y="170" width="400" height="70" fill="#fff" />
      {Array.from({ length: 20 }, (_, i) => {
        const row = Math.floor(i / 10)
        return <rect key={i} x={(i % 10) * 40 + row * 20} y={170 + row * 35} width="20" height="35" fill="#fda4af" opacity="0.8" />
      })}
      <rect y="166" width="400" height="6" fill="#b45309" />
    </>
  )
}

function Dots() {
  const colors = ['#f9a8d4', '#fde047', '#a5f3fc', '#bbf7d0', '#ddd6fe']
  return (
    <>
      <rect width="400" height="240" fill="#fbcfe8" />
      {Array.from({ length: 24 }, (_, i) => {
        const x = (i * 97) % 400
        const y = (i * 61) % 240
        return (
          <circle key={i} cx={x} cy={y} r={8 + (i % 4) * 4} fill={colors[i % colors.length]} opacity="0.75">
            <animate attributeName="r" values={`${8 + (i % 4) * 4};${12 + (i % 4) * 4};${8 + (i % 4) * 4}`} dur="1.1s" begin={`${(i % 5) * 0.22}s`} repeatCount="indefinite" />
          </circle>
        )
      })}
    </>
  )
}

// The Wheels on the Bus: a town road whose stripes roll by.
function Road() {
  return (
    <>
      <rect width="400" height="240" fill="#bae6fd" />
      <Sun x={60} y={44} />
      <Cloud x={160} y={30} seconds={30} />
      <Cloud x={300} y={58} scale={0.7} seconds={40} opacity={0.8} />
      {[[200, 90, '#fca5a5'], [250, 70, '#fde68a'], [300, 100, '#a5b4fc'], [345, 80, '#86efac']].map(([x, h, c]) => (
        <g key={x}>
          <rect x={x} y={170 - h} width="40" height={h} rx="4" fill={c} />
          {[0, 1, 2].map((r) => (
            <rect key={r} x={x + 8} y={170 - h + 10 + r * 22} width="9" height="10" rx="2" fill="#fff" opacity={r * 22 + 20 < h ? 0.9 : 0} />
          ))}
        </g>
      ))}
      <rect y="168" width="400" height="72" fill="#64748b" />
      <rect y="166" width="400" height="6" fill="#94a3b8" />
      <g>
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={i * 60} y="202" width="34" height="6" rx="3" fill="#fef9c3" />
        ))}
        <animateTransform attributeName="transform" type="translate" from="0 0" to="-60 0" dur="0.9s" repeatCount="indefinite" />
      </g>
    </>
  )
}

// I'm a Water Baby: deep blue water with rising bubbles and swaying weed.
function Underwater() {
  return (
    <>
      <rect width="400" height="240" fill="#0ea5e9" />
      <rect y="120" width="400" height="120" fill="#0284c7" opacity="0.6" />
      <path d="M0 14 Q50 0 100 14 T200 14 T300 14 T400 14 L400 0 L0 0 Z" fill="#bae6fd" opacity="0.7">
        <animateTransform attributeName="transform" type="translate" values="0 0;-25 3;0 0" dur="4s" repeatCount="indefinite" />
      </path>
      <path d="M0 220 Q60 200 120 214 T240 210 T400 214 L400 240 L0 240 Z" fill="#fde68a" />
      {[30, 90, 300, 360].map((x, i) => (
        <path key={x} d={`M${x} 226 q-10 -24 0 -46 q10 -22 0 -44`} fill="none" stroke="#22c55e" strokeWidth="7" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values={`-5 ${x} 226;5 ${x} 226;-5 ${x} 226`} dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
        </path>
      ))}
      {[50, 140, 210, 270, 340].map((x, i) => (
        <Riser key={x} x={x} seconds={6 + (i % 3) * 2} delay={i * 1.3}>
          <circle r={4 + (i % 3) * 3} fill="none" stroke="#e0f2fe" strokeWidth="2.5" />
        </Riser>
      ))}
    </>
  )
}

// Rockin' with the Dinosaurs: a jungle with ferns and a smoking volcano.
function Jungle() {
  return (
    <>
      <rect width="400" height="240" fill="#fde68a" />
      <rect y="0" width="400" height="120" fill="#fcd34d" opacity="0.5" />
      <path d="M220 170 L280 70 L320 70 L380 170 Z" fill="#a16207" />
      <path d="M280 70 L320 70 L312 84 Q300 76 288 84 Z" fill="#ef4444" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="300" cy="56" r="12" fill="#94a3b8" opacity="0.8">
          <animate attributeName="cy" values="60;10" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
          <animate attributeName="r" values="8;22" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <Hills back="#65a30d" front="#4d7c0f" />
      {[40, 150].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 200 Q${x - 4} 150 ${x + 6} 110`} fill="none" stroke="#92400e" strokeWidth="8" strokeLinecap="round" />
          <g>
            {[-60, -20, 20, 60, 100].map((a) => (
              <path key={a} d={`M${x + 6} 110 q${Math.cos((a * Math.PI) / 180) * 30} ${-Math.sin((a * Math.PI) / 180) * 30 - 6} ${Math.cos((a * Math.PI) / 180) * 50} ${-Math.sin((a * Math.PI) / 180) * 50 + 14}`} fill="none" stroke="#16a34a" strokeWidth="7" strokeLinecap="round" />
            ))}
            <animateTransform attributeName="transform" type="rotate" values={`-3 ${x + 6} 110;3 ${x + 6} 110;-3 ${x + 6} 110`} dur={`${2.6 + i}s`} repeatCount="indefinite" />
          </g>
        </g>
      ))}
    </>
  )
}

// Ants: a garden of flowers swaying in the grass.
function Garden() {
  const petals = ['#f472b6', '#facc15', '#a78bfa', '#fb923c']
  return (
    <>
      <rect width="400" height="240" fill="#dcfce7" />
      <Sun />
      <Cloud x={60} y={36} seconds={50} />
      <Hills back="#86efac" front="#4ade80" />
      {[30, 90, 160, 230, 290, 360].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 236 L${x} ${176 - (i % 3) * 12}`} stroke="#15803d" strokeWidth="4" />
          <g transform={`translate(${x} ${176 - (i % 3) * 12})`}>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="0" cy="-9" rx="6" ry="10" fill={petals[i % petals.length]} transform={`rotate(${a})`} />
            ))}
            <circle r="5" fill="#fde047" />
            <animateTransform attributeName="transform" type="rotate" values="-8;8;-8" dur={`${2 + (i % 3) * 0.5}s`} additive="sum" repeatCount="indefinite" />
          </g>
        </g>
      ))}
    </>
  )
}

const STAGES = {
  road: Road,
  underwater: Underwater,
  jungle: Jungle,
  garden: Garden,
  night: Night,
  farm: Farm,
  orchard: Orchard,
  balloons: Balloons,
  sunburst: Sunburst,
  party: () => <Sunburst stars />,
  castle: Castle,
  rainbow: Rainbow,
  windy: Windy,
  kitchen: Kitchen,
  dots: Dots,
}

export default function SongStage({ name, className = '' }) {
  const Backdrop = STAGES[name] || Dots
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <Backdrop />
    </svg>
  )
}
