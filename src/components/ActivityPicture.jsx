import ItemArt from './ItemArt.jsx'
import PictureTile from './PictureTile.jsx'
import Medal from './Medal.jsx'
import { NoteIcon, SpeakerIcon, StarIcon } from './Icons.jsx'

// A pointing hand, used to show "tap here" without any words.
export function Hand({ className = '', style }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <path
        d="M38 92 Q22 78 18 60 Q16 50 26 50 Q32 50 36 58 L36 16 Q36 6 45 6 Q54 6 54 16 L54 44 Q56 36 64 37 Q71 38 71 46 Q73 40 80 41 Q87 43 87 51 L86 70 Q84 86 72 92 Z"
        fill="#fcd9b8"
        stroke="#3b2f2f"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const Tile = ({ id, className = '', style, variant }) => (
  <ItemArt id={id} variant={variant} className={`rounded-[18%] bg-white p-[4%] shadow ${className}`} style={style} />
)

/**
 * The picture on an activity card: a tiny moving cartoon of what you do
 * there, so a child who cannot read still knows what the card is for.
 */
export default function ActivityPicture({ id, items, matchStyle, medal }) {
  const [a, b, c, d, e] = items
  switch (id) {
    // Learn: a picture that "speaks".
    case 'learn':
      return (
        <div className="relative h-full w-full">
          <ItemArt id={a.id} className="h-full w-full" />
          <span className="absolute -right-[4%] -top-[4%] flex h-[42%] w-[42%] items-center justify-center rounded-full bg-sky-500 text-white shadow" style={{ animation: 'wl-shine 1.2s ease-in-out infinite' }}>
            <SpeakerIcon className="h-[70%] w-[70%]" />
          </span>
        </div>
      )
    // Listen and tap: two pictures, and a hand that taps one.
    case 'listen':
      return (
        <div className="relative flex h-full w-full items-start justify-center gap-[8%] pt-[6%]">
          <Tile id={b.id} className="w-[46%]" />
          <Tile id={c.id} className="w-[46%] ring-4 ring-lime-400" />
          <Hand className="absolute bottom-0 right-[6%] w-[44%]" style={{ animation: 'wl-tap 1.3s ease-in-out infinite' }} />
        </div>
      )
    // Match: a picture slides onto its shadow (or a paint onto its star).
    case 'match':
      return (
        <div className="relative h-full w-full">
          {matchStyle === 'color' ? (
            <ItemArt id={d.id} variant="target" className="absolute right-0 top-1/2 w-[54%] -translate-y-1/2" />
          ) : (
            <ItemArt id={d.id} className="absolute right-0 top-1/2 w-[54%] -translate-y-1/2" style={{ filter: 'brightness(0)', opacity: 0.22 }} />
          )}
          <div className="absolute left-0 top-1/2 w-[54%] -translate-y-1/2" style={{ animation: 'wl-slide 2s ease-in-out infinite' }}>
            <ItemArt id={d.id} className="w-full drop-shadow" />
          </div>
        </div>
      )
    // Memory: two cards, one turning over.
    case 'memory':
      return (
        <div className="flex h-full w-full items-center justify-center gap-[8%] [perspective:400px]">
          <Tile id={e.id} className="w-[46%]" />
          <div className="relative aspect-square w-[46%] [transform-style:preserve-3d]" style={{ animation: 'wl-flip 2.4s ease-in-out infinite' }}>
            <span className="absolute inset-0 flex items-center justify-center rounded-[18%] border-2 border-white bg-violet-400 shadow [backface-visibility:hidden]">
              <StarIcon className="h-2/3 w-2/3" />
            </span>
            <Tile id={e.id} className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)]" />
          </div>
        </div>
      )
    // Puzzle: four pieces, the last one sliding into place.
    case 'puzzle':
      return (
        <div className="grid h-full w-full grid-cols-2 gap-[4%]">
          {[0, 1, 2, 3].map((piece) => (
            <div key={piece} style={piece === 3 ? { animation: 'wl-piece 2s ease-in-out infinite' } : undefined}>
              <PictureTile item={a} grid={2} index={piece} className="rounded-lg shadow-sm" />
            </div>
          ))}
        </div>
      )
    // Balloons: a balloon carries a picture up.
    case 'balloon':
      return (
        <div className="relative h-full w-full overflow-hidden">
          <div className="absolute left-0 top-[2%] w-[74%]" style={{ animation: 'wl-bob 2.2s ease-in-out infinite' }}>
            <ItemArt id="balloon" className="w-full" />
            <Tile id={b.id} className="absolute left-[27%] top-[12%] w-[46%]" />
          </div>
          <StarIcon className="absolute right-0 top-[4%] h-[30%] w-[30%]" />
          <Hand className="absolute bottom-0 right-[4%] w-[40%]" style={{ animation: 'wl-tap 1.3s ease-in-out infinite' }} />
        </div>
      )
    // Star challenge: the medal you can win (or the one already won).
    case 'quiz':
      return (
        <div className="h-full w-full" style={{ animation: 'wl-shine 1.6s ease-in-out infinite' }}>
          <Medal kind={medal || 'gold'} className="h-full w-full" />
        </div>
      )
    // Song: a note that bounces.
    case 'song':
      return (
        <div className="relative h-full w-full">
          <span className="absolute inset-[6%] flex items-center justify-center rounded-full bg-pink-500 text-white shadow" style={{ animation: 'wl-hop 0.8s ease-in-out infinite' }}>
            <NoteIcon className="h-2/3 w-2/3" />
          </span>
          <Tile id={a.id} className="absolute -bottom-[2%] -right-[2%] w-[44%]" />
        </div>
      )
    default:
      return null
  }
}
