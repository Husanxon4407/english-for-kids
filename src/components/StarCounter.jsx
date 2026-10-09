import { StarIcon } from './Icons.jsx'
import { useProgress } from '../lib/progress.jsx'

/** Small reward indicator. It bumps whenever the number of stars changes. */
export default function StarCounter() {
  const { progress } = useProgress()
  return (
    <div
      key={progress.stars}
      className="animate-bump flex items-center gap-1.5 rounded-full bg-white/90 py-1.5 pl-2 pr-4 shadow-md"
      aria-label={`${progress.stars} stars`}
    >
      <StarIcon className="h-8 w-8 sm:h-9 sm:w-9" />
      <span className="text-2xl font-extrabold text-amber-600 sm:text-3xl">{progress.stars}</span>
    </div>
  )
}
