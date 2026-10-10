import ItemArt from './ItemArt.jsx'

/** One square piece of an item's picture, cut from a `grid` x `grid` puzzle. */
export default function PictureTile({ item, grid, index, className = '' }) {
  const row = Math.floor(index / grid)
  const col = index % grid
  return (
    <div className={`relative aspect-square overflow-hidden ${className}`} style={{ backgroundColor: item.color }}>
      <ItemArt
        id={item.id}
        className="pointer-events-none absolute max-w-none"
        style={{ width: `${grid * 100}%`, height: `${grid * 100}%`, left: `${-col * 100}%`, top: `${-row * 100}%` }}
      />
    </div>
  )
}
