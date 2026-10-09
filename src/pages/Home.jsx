import { useState } from 'react'
import Mascot from '../components/Mascot.jsx'
import RoundButton from '../components/RoundButton.jsx'
import { PlayIcon } from '../components/Icons.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import StarCounter from '../components/StarCounter.jsx'
import { SCRIPT } from '../data/script.js'
import ItemArt from '../components/ItemArt.jsx'
import { useProgress } from '../lib/progress.jsx'

export default function Home({ onPlay, onGrownUps }) {
  const { speaking, speak } = useSpeaker()
  const { profiles, activeProfile } = useProgress()
  const [greeted, setGreeted] = useState(false)

  function greet() {
    setGreeted(true)
    speak(SCRIPT.homeGreeting)
  }

  async function play() {
    await speak(SCRIPT.letsPlay)
    onPlay()
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-8 sm:gap-10">
      <div className="absolute right-4 top-4 flex items-center gap-3 sm:right-6 sm:top-6">
        {/* Whose turn it is — their own picture, so no reading is needed. */}
        {profiles.length > 1 && (
          <span
            className="h-14 w-14 rounded-full bg-white p-1 shadow-md ring-4 ring-amber-300 sm:h-16 sm:w-16"
            aria-label={`Playing: ${activeProfile.label}`}
          >
            <ItemArt id={activeProfile.avatar} className="h-full w-full" />
          </span>
        )}
        <StarCounter />
      </div>
      <h1 className="text-5xl font-extrabold tracking-tight text-sky-700 drop-shadow-sm sm:text-7xl">
        Word<span className="text-orange-500">Land</span>
      </h1>

      <Mascot
        size="lg"
        talking={speaking}
        waving={!greeted || speaking}
        bubble={greeted ? SCRIPT.homeBubble : null}
        onClick={greet}
      />

      <RoundButton label="Play" color="green" size="lg" onClick={play} className="animate-bounce-in">
        <PlayIcon className="ml-2 h-16 w-16 sm:h-20 sm:w-20" />
      </RoundButton>

      {/* Small and quiet on purpose: this is for adults, and it's protected by a reading check. */}
      <button
        type="button"
        onClick={onGrownUps}
        className="absolute bottom-4 right-4 rounded-full bg-white/70 px-4 py-2 text-sm font-bold text-slate-500 shadow-sm sm:bottom-6 sm:right-6"
      >
        Grown-ups
      </button>
    </main>
  )
}
