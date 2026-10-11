import { useEffect } from 'react'
import Mascot from './Mascot.jsx'
import RoundButton from './RoundButton.jsx'
import { BackIcon, RepeatIcon, StarIcon } from './Icons.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import { fanfare } from '../lib/sfx.js'
import { SCRIPT } from '../data/script.js'

/** End-of-game celebration: Bobo cheers, the earned stars appear, play again or go back. */
export default function GameComplete({ stars, onAgain, onBack }) {
  const { speaking, speak } = useSpeaker()
  const lines = [SCRIPT.hooray, SCRIPT.starsEarned(stars)]

  useEffect(() => {
    fanfare()
    speak(lines)
  }, [])

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-8 low:gap-4 low:py-4 short:gap-2 short:py-3">
      <Mascot size="lg" talking={speaking} waving onClick={() => speak(lines)} />
      <div className="flex flex-wrap justify-center gap-1" aria-label={`${stars} stars`}>
        {Array.from({ length: stars }, (_, i) => (
          <span key={i} className="animate-bounce-in" style={{ animationDelay: `${300 + i * 150}ms` }}>
            <StarIcon className="h-12 w-12 sm:h-16 sm:w-16 short:h-10 short:w-10" />
          </span>
        ))}
      </div>
      <div className="flex items-center gap-6">
        <RoundButton label="Back" size="md" onClick={onBack}>
          <BackIcon className="h-10 w-10" />
        </RoundButton>
        <RoundButton label="Play again" color="green" size="lg" onClick={onAgain}>
          <RepeatIcon className="h-14 w-14 sm:h-16 sm:w-16" />
        </RoundButton>
      </div>
    </main>
  )
}
