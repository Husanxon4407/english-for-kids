// Story backdrops. Each fills a 4:3 stage (viewBox 400 x 300); the story's
// pictures are placed on top of it.

function Flower({ x, y, color }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0 L0 14" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
      {[0, 72, 144, 216, 288].map((a) => (
        <circle key={a} cx="0" cy="-5" r="3.6" fill={color} transform={`rotate(${a})`} />
      ))}
      <circle r="2.6" fill="#fde047" />
    </g>
  )
}

function Garden() {
  return (
    <>
      <rect width="400" height="300" fill="#bfe6ff" />
      <ellipse cx="80" cy="60" rx="46" ry="14" fill="#fff" opacity="0.85" />
      <ellipse cx="190" cy="36" rx="34" ry="10" fill="#fff" opacity="0.7" />
      <path d="M0 170 Q100 120 210 160 T400 150 L400 300 L0 300 Z" fill="#a7e08a" />
      <path d="M0 196 Q120 168 240 190 T400 184 L400 300 L0 300 Z" fill="#7cc95a" />
      {/* tree */}
      <rect x="286" y="96" width="20" height="96" rx="6" fill="#a16207" />
      <circle cx="296" cy="74" r="50" fill="#4ade80" />
      <circle cx="262" cy="96" r="30" fill="#22c55e" />
      <circle cx="330" cy="98" r="32" fill="#22c55e" />
      {/* fence */}
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={8 + i * 26} y="150" width="12" height="44" rx="5" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
      ))}
      <rect x="4" y="164" width="232" height="7" rx="3" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
      <Flower x={30} y={270} color="#f472b6" />
      <Flower x={150} y={282} color="#fb923c" />
      <Flower x={250} y={266} color="#a78bfa" />
      <Flower x={370} y={278} color="#f472b6" />
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
          <circle cx="176" cy="60" r="2" fill="#fff" />
          <circle cx="190" cy="88" r="1.6" fill="#fff" />
          <circle cx="170" cy="96" r="1.4" fill="#fff" />
        </>
      ) : (
        <ellipse cx="190" cy="92" rx="24" ry="8" fill="#fff" opacity="0.9" />
      )}
      <path d="M200 42 L200 110 M158 76 L242 76" stroke="#fff" strokeWidth="5" />
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
      <Flower x={372} y={232} color="#f472b6" />
    </>
  )
}

function Party() {
  const flags = ['#f87171', '#fbbf24', '#4ade80', '#60a5fa', '#c084fc', '#f472b6', '#fb923c', '#34d399']
  return (
    <>
      <rect width="400" height="300" fill="#e9defc" />
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={i} cx={(i * 67) % 400} cy={40 + ((i * 53) % 150)} r="4" fill={flags[i % flags.length]} opacity="0.35" />
      ))}
      <rect y="206" width="400" height="94" fill="#c9a4f5" />
      <rect y="206" width="400" height="8" fill="#a67ee0" />
      {/* bunting */}
      <path d="M0 22 Q200 74 400 22" fill="none" stroke="#7c5fb0" strokeWidth="2.5" />
      {flags.map((color, i) => {
        const t = (i + 0.5) / flags.length
        const x = t * 400
        const y = 22 + 52 * (1 - (2 * t - 1) ** 2)
        return <path key={color} d={`M${x - 15} ${y - 2} L${x + 15} ${y - 2} L${x} ${y + 30} Z`} fill={color} />
      })}
      {/* balloons */}
      {[
        [34, 120, '#f87171'],
        [66, 100, '#60a5fa'],
        [352, 104, '#fbbf24'],
        [380, 128, '#4ade80'],
      ].map(([x, y, color]) => (
        <g key={x}>
          <path d={`M${x} ${y + 24} Q${x - 8} ${y + 60} ${x + 4} ${y + 96}`} fill="none" stroke="#7c5fb0" strokeWidth="1.5" />
          <ellipse cx={x} cy={y} rx="19" ry="24" fill={color} />
          <ellipse cx={x - 6} cy={y - 8} rx="4" ry="7" fill="#fff" opacity="0.5" />
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
