import { useEffect } from 'react'
import TopBar from '../components/TopBar.jsx'
import Mascot from '../components/Mascot.jsx'
import WorldCard from '../components/WorldCard.jsx'
import { worlds } from '../data/worlds.js'
import { useSpeaker } from '../lib/useSpeaker.js'
import StarCounter from '../components/StarCounter.jsx'
import { SCRIPT } from '../data/script.js'
import { Bobo } from '../components/Mascot.jsx'
import { RepeatIcon } from '../components/Icons.jsx'
import { useProgress } from '../lib/progress.jsx'
import { canPractice } from '../lib/review.js'
import { useUzbek } from '../lib/uzbek.js'
import { preload } from '../lib/audio.js'

// Two places that are not word worlds: they mix words from all of them.
const SPECIAL = [
  { id: 'stories', name: 'Story Time', color: '#f59e0b' },
  { id: 'songs', name: 'Song Time', color: '#ec4899' },
]

export default function WorldMap({ onHome, onOpenWorld, onPractice, onStories, onSongs }) {
  const { speaking, speak } = useSpeaker()
  const { progress } = useProgress()
  const showPractice = canPractice(progress.words)
  const uz = useUzbek()
  const prompt = [SCRIPT.mapPrompt, ...uz.line('map')]

  useEffect(() => {
    speak(prompt)
  }, [speak])

  // Fetch what Bobo says when a card is tapped and in the first moment of each
  // world, so he is not late on a slow connection.
  useEffect(() => {
    preload([SCRIPT.storyTime, SCRIPT.songTime, SCRIPT.practice, ...worlds.flatMap((w) => [`${w.name}!`, w.intro])])
  }, [])

  async function practice() {
    await speak(SCRIPT.practice)
    onPractice()
  }

  async function open(world) {
    if (world.id === 'stories' || world.id === 'songs') {
      await speak(world.id === 'stories' ? SCRIPT.storyTime : SCRIPT.songTime)
      if (world.id === 'stories') onStories()
      else onSongs()
    } else if (world.items) {
      await speak(`${world.name}!`)
      onOpenWorld(world.id)
    } else {
      // Not punitive: just a friendly "soon" — no locks, no error sounds.
      speak(SCRIPT.comingSoon(world.name))
    }
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onHome={onHome}>
        {showPractice && (
          // Review of words from every world that need practice.
          <button
            type="button"
            aria-label="Practice"
            onClick={practice}
            className="animate-bounce-in mr-auto flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-1.5 shadow-lg transition-transform active:scale-95 sm:gap-3 sm:pr-6"
            style={{ borderBottom: '6px solid #2ec4b6' }}
          >
            <Bobo className="hidden h-14 w-14 sm:block" />
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-400 text-white sm:h-14 sm:w-14">
              <RepeatIcon className="h-8 w-8" />
            </span>
            <span className="hidden text-2xl font-extrabold text-teal-700 sm:inline">Practice</span>
          </button>
        )}
        <StarCounter />
        <Mascot size="sm" talking={speaking} onClick={() => speak(prompt)} />
      </TopBar>
      {/* Two cards a row on a phone, three on a tablet, four on a laptop; a short
          last row sits in the middle. With this many worlds the map scrolls,
          like a picture book. */}
      <main className="mx-auto w-full max-w-5xl flex-1 p-4 sm:p-6">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 short:gap-4">
          {[...worlds.filter((w) => w.items), ...SPECIAL, ...worlds.filter((w) => !w.items)].map((world) => (
            <WorldCard
              key={world.id}
              world={world}
              available={Boolean(world.items) || SPECIAL.includes(world)}
              onClick={() => open(world)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
