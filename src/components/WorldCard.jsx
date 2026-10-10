import ItemArt from './ItemArt.jsx'

// Pictures for worlds that are not built yet.
const SOON = {
  island: (
    <>
      <ellipse cx="60" cy="86" rx="50" ry="10" fill="#7dd3fc" />
      <ellipse cx="60" cy="80" rx="30" ry="9" fill="#fde68a" />
      <path d="M62 80 Q58 50 66 30" stroke="#92400e" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M66 30 Q46 22 36 36 M66 30 Q86 20 96 34 M66 30 Q60 14 48 14 M66 30 Q76 14 88 18" stroke="#16a34a" strokeWidth="6" fill="none" strokeLinecap="round" />
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
      className={`group flex flex-col items-center gap-2 rounded-[2rem] p-3 shadow-lg transition-transform active:scale-95 sm:p-4 ${
        available ? 'bg-white' : 'bg-white/60'
      }`}
      style={{ borderBottom: `8px solid ${world.color}` }}
    >
      <div
        className={`aspect-[6/5] w-full overflow-hidden rounded-3xl p-3 sm:aspect-[3/2] ${available ? '' : 'opacity-45 saturate-50'}`}
        style={{ backgroundColor: `${world.color}33` }}
      >
        <WorldPicture world={world} />
      </div>
      <span className={`text-base font-bold sm:text-xl ${available ? 'text-slate-700' : 'text-slate-400'}`}>
        {world.name}
      </span>
    </button>
  )
}
