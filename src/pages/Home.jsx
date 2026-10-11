import { useState } from 'react'
import Mascot from '../components/Mascot.jsx'
import RoundButton from '../components/RoundButton.jsx'
import { PlayIcon } from '../components/Icons.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import StarCounter from '../components/StarCounter.jsx'
import { SCRIPT } from '../data/script.js'
import ItemArt from '../components/ItemArt.jsx'
import { useProgress } from '../lib/progress.jsx'
import { UZBEK_AVAILABLE, useUzbek } from '../lib/uzbek.js'
import { say } from '../lib/audio.js'
import { UZ_LINES } from '../data/uzbek.js'
import uzManifest from '../data/voice-manifest-uz.json'
import { Hand } from '../components/ActivityPicture.jsx'

export default function Home({ onPlay, onGrownUps }) {
  const { speaking, speak } = useSpeaker()
  const { profiles, activeProfile, setSetting } = useProgress()
  const uz = useUzbek()
  const [greeted, setGreeted] = useState(false)

  function greet() {
    setGreeted(true)
    speak([...SCRIPT.homeGreeting, ...uz.line('home')])
  }

  // Turning the helper on answers in Uzbek straight away, so it is obvious what the switch does.
  function toggleUzbek() {
    setSetting('helper', uz.on ? 'off' : 'uz')
    const file = uzManifest.lines?.[UZ_LINES.home]
    if (!uz.on && file) say('', { src: import.meta.env.BASE_URL + file })
  }

  async function play() {
    await speak(SCRIPT.letsPlay)
    onPlay()
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-8 sm:gap-10 low:gap-4 low:py-4 short:flex-row short:gap-8">
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
      <h1 className="text-5xl font-extrabold tracking-tight text-sky-700 drop-shadow-sm sm:text-7xl short:text-5xl">
        Word<span className="text-orange-500">Land</span>
      </h1>

      <Mascot
        size="lg"
        talking={speaking}
        waving={!greeted || speaking}
        bubble={greeted ? SCRIPT.homeBubble : null}
        onClick={greet}
      />

      <div className="relative">
        <RoundButton label="Play" color="green" size="lg" onClick={play} className="animate-bounce-in">
          <PlayIcon className="ml-2 h-16 w-16 sm:h-20 sm:w-20 short:ml-1 short:h-12 short:w-12" />
        </RoundButton>
        {/* No reading needed: a hand shows where to tap. */}
        <Hand className="pointer-events-none absolute -bottom-4 -right-6 w-14 drop-shadow-lg sm:w-16" style={{ animation: 'wl-tap 1.1s ease-in-out infinite' }} />
      </div>

      {UZBEK_AVAILABLE && (
      <button
        type="button"
        onClick={toggleUzbek}
        aria-pressed={uz.on}
        aria-label="O‘zbekcha yordam"
        className={`absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-sm transition-colors sm:bottom-6 sm:left-6 ${
          uz.on ? 'bg-sky-500 text-white' : 'bg-white/70 text-slate-500'
        }`}
      >
        <span className={`h-3 w-3 rounded-full ${uz.on ? 'bg-lime-300' : 'bg-slate-300'}`} />
        O‘zbekcha
      </button>
      )}

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
