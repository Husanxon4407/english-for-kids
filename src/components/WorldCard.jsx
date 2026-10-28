import ItemArt from './ItemArt.jsx'

// Pictures for the two special places (and any world that is not built yet).
const SOON = {
  stories: (
    <>
      <path d="M60 30 C44 18 24 16 10 20 L10 82 C24 78 44 80 60 92 Z" fill="#fff" stroke="#b45309" strokeWidth="4" strokeLinejoin="round" />
      <path d="M60 30 C76 18 96 16 110 20 L110 82 C96 78 76 80 60 92 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="4" strokeLinejoin="round" />
      <path d="M22 36 Q36 34 48 40 M22 50 Q36 48 48 54 M22 64 Q36 62 48 68" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
      <path d="M85 36 l4.5 9.5 10.5 1.2 -7.8 7 2.2 10.3 -9.4 -5.3 -9.4 5.3 2.2 -10.3 -7.8 -7 10.5 -1.2 z" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" strokeLinejoin="round" />
    </>
  ),
  songs: (
    <>
      <path d="M44 74 L44 26 L92 16 L92 64" fill="none" stroke="#be185d" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44 40 L92 30" stroke="#be185d" strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="33" cy="76" rx="14" ry="11" fill="#ec4899" stroke="#be185d" strokeWidth="4" />
      <ellipse cx="81" cy="66" rx="14" ry="11" fill="#ec4899" stroke="#be185d" strokeWidth="4" />
      <path d="M14 24 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z M106 78 l2.4 5.6 5.6 2.4 -5.6 2.4 -2.4 5.6 -2.4 -5.6 -5.6 -2.4 5.6 -2.4 z" fill="#fbbf24" />
    </>
  ),
}

function WorldPicture({ world }) {
  if (world.items) {
    const [a, b, c] = world.items
    return (
      <div className="relative h-full w-full">
        <ItemArt id={c.id} className="absolute left-1/2 top-0 h-[70%] -translate-x-1/2" />
        <ItemArt id={a.id} className="absolute bottom-0 left-0 h-[55%]" />
        <ItemArt id={b.id} className="absolute bottom-0 right-0 h-[55%]" />
      </div>
    )
  }
  return (
    <svg viewBox="0 0 120 100" className="h-full w-full" aria-hidden="true">
      {SOON[world.id]}
    </svg>
  )
}

export default function WorldCard({ world, available, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={world.name}
      // Two, three or four a row (the map's gaps are 1rem, 1.5rem and 1.5rem).
      className={`group flex w-[calc(50%-0.5rem)] flex-col items-center gap-2 rounded-[2rem] p-3 shadow-lg transition-transform active:scale-95 sm:w-[calc(33.333%-1rem)] sm:p-4 lg:w-[calc(25%-1.125rem)] short:w-[calc(25%-0.75rem)] ${
        available ? 'bg-white' : 'bg-white/60'
      }`}
      style={{ borderBottom: `8px solid ${world.color}` }}
    >
      <div
        className={`aspect-[6/5] w-full overflow-hidden rounded-3xl p-3 sm:aspect-[3/2] lg:aspect-square lg:p-5 short:aspect-[3/2] ${available ? '' : 'opacity-45 saturate-50'}`}
        style={{ backgroundColor: `${world.color}33` }}
      >
        <WorldPicture world={world} />
      </div>
      <span className={`text-base font-bold leading-tight sm:text-xl lg:text-lg xl:text-xl ${available ? 'text-slate-700' : 'text-slate-400'}`}>
        {world.name}
      </span>
    </button>
  )
}
