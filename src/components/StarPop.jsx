import { StarIcon } from './Icons.jsx'

/** A star that floats up from a correct answer. Place inside a `relative` box. */
export default function StarPop() {
  return (
    <span className="animate-star-pop pointer-events-none absolute left-1/2 top-0 z-10">
      <StarIcon className="h-14 w-14 drop-shadow-md" />
    </span>
  )
}
