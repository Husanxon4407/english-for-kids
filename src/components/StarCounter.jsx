import { StarIcon } from './Icons.jsx'
import { useProgress } from '../lib/progress.jsx'

/** Small reward indicator. It bumps whenever the number of stars changes. */
export default function StarCounter() {
  const { progress } = useProgress()
  return (
    <div
      key={progress.stars}
      className="animate-bump flex shrink-0 items-center gap-1.5 rounded-full bg-white/90 py-1.5 pl-2 pr-4 shadow-md phone:gap-1 phone:pr-3 tiny:pl-1.5 tiny:pr-2.5"
      aria-label={`${progress.stars} stars`}
    >
      <StarIcon className="h-8 w-8 phone:h-7 phone:w-7 tiny:h-6 tiny:w-6 sm:h-9 sm:w-9" />
      <span className="text-2xl font-extrabold text-amber-600 phone:text-xl tiny:text-lg sm:text-3xl">{progress.stars}</span>
    </div>
  )
}
