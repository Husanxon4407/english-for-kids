import { useEffect, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import Mascot from '../components/Mascot.jsx'
import ItemArt from '../components/ItemArt.jsx'
import StarCounter from '../components/StarCounter.jsx'
import ActivityPicture, { Hand } from '../components/ActivityPicture.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import { useProgress } from '../lib/progress.jsx'
import { SCRIPT } from '../data/script.js'
import { songForWorld } from '../data/songs.js'
import { preload } from '../lib/audio.js'
import { useUzbek } from '../lib/uzbek.js'

// The activities in each world (the song only where the world has one).
// Moving pictures (not text) tell children what each one is, and tapping
// says its name before starting.
const ACTIVITIES = [
  { id: 'learn', name: SCRIPT.activities.learn, color: '#38bdf8' },
  { id: 'listen', name: SCRIPT.activities.listen, color: '#fb923c' },
  { id: 'match', name: SCRIPT.activities.match, color: '#f472b6' },
  { id: 'memory', name: SCRIPT.activities.memory, color: '#a78bfa' },
  { id: 'puzzle', name: SCRIPT.activities.puzzle, color: '#34d399' },
  { id: 'balloon', name: SCRIPT.activities.balloon, color: '#f43f5e' },
  { id: 'feed', name: SCRIPT.activities.feed, color: '#2ec4b6' },
  { id: 'peekaboo', name: SCRIPT.activities.peekaboo, color: '#f97316' },
  { id: 'parrot', name: SCRIPT.activities.parrot, color: '#22c55e' },
  { id: 'quiz', name: SCRIPT.activities.quiz, color: '#fbbf24' },
  { id: 'song', name: SCRIPT.songTime, color: '#ec4899' },
]

// How long a child may look at the screen before a hand shows where to start.
const HINT_AFTER = 7000

export default function World({ world, onBack, onHome, onLearn, onPlay, welcome }) {
  const { speaking, speak } = useSpeaker()
  const { progress } = useProgress()
  const [hint, setHint] = useState(false)
  const activities = songForWorld(world.id) ? ACTIVITIES : ACTIVITIES.filter((a) => a.id !== 'song')
  const intro = welcome ? [...world.learnDone, SCRIPT.learnFinished] : [world.intro]
  // The hand points at the next thing to try: learning first, then a game.
  const hintId = progress.activities[`${world.id}:learn`] ? 'listen' : 'learn'

  const uz = useUzbek()

  useEffect(() => {
    speak(intro)
    const timer = setTimeout(() => setHint(true), HINT_AFTER)
    return () => clearTimeout(timer)
  }, [])

  // Fetch everything this world's activities say while the child is still
  // choosing, so no word starts late on a slow connection.
  useEffect(() => {
    preload([
      ...activities.map((a) => a.name),
      SCRIPT.whatsThis,
      ...world.items.flatMap((item) => [
        SCRIPT.word(item),
        item.phrase,
        SCRIPT.canYouSay(item),
        item.prompt,
        item.sound && SCRIPT.says(item),
        item.sound,
        ...uz.word(item),
      ]),
    ])
  }, [world, uz])

  async function openActivity(activity) {
    setHint(false)
    await speak(activity.name)
    if (activity.id === 'learn') onLearn(0)
    else onPlay(activity.id)
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome}>
        <StarCounter />
        <Mascot size="sm" talking={speaking} waving={welcome} onClick={() => speak(intro)} />
      </TopBar>

      {/* The activity cards (three rows of four on a phone, two rows of six on a
          tablet or a phone held sideways), then the world's words.
          Everything is made of squares, so the width is capped by the room
          under the top bar. */}
      <main className="mx-auto flex w-full max-w-[max(16rem,min(48rem,calc((var(--room)-2.5rem)*0.85)))] flex-1 flex-col justify-center gap-5 p-4 sm:max-w-[min(62rem,calc((var(--room)-4.5rem)*2.1))] sm:gap-7 sm:p-6 short:max-w-[calc((var(--room)-3rem)*2.3)] short:gap-3 short:px-4 short:py-2">
        <section className="grid grid-cols-4 gap-3 sm:grid-cols-6 sm:gap-5 short:grid-cols-6 short:gap-2">
          {activities.map((activity, i) => {
            const plays = progress.activities[`${world.id}:${activity.id}`] || 0
            const medal = activity.id === 'quiz' ? progress.medals[world.id] : null
            return (
              <button
                key={activity.id}
                type="button"
                aria-label={activity.name}
                onClick={() => openActivity(activity)}
                className="animate-bounce-in relative rounded-3xl bg-white p-2 shadow-lg transition-transform active:scale-95 sm:rounded-[2rem] sm:p-4 short:rounded-2xl short:p-1.5"
                style={{ borderBottom: `8px solid ${activity.color}`, animationDelay: `${i * 80}ms` }}
              >
                <div className="aspect-square rounded-2xl p-1.5 sm:rounded-3xl sm:p-3 short:rounded-xl short:p-1" style={{ backgroundColor: `${activity.color}26` }}>
                  <ActivityPicture id={activity.id} items={world.items} matchStyle={world.matchStyle} medal={medal} />
                </div>
                {plays > 0 && !medal && (
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-sm font-extrabold text-white shadow sm:h-9 sm:w-9 sm:text-lg" aria-hidden="true">
                    ★
                  </span>
                )}
                {hint && activity.id === hintId && (
                  <Hand className="pointer-events-none absolute -bottom-3 right-0 z-10 w-1/2 drop-shadow-lg" style={{ animation: 'wl-tap 1.1s ease-in-out infinite' }} />
                )}
              </button>
            )
          })}
        </section>

        {/* Free exploration: tap any picture to learn its word. */}
        <section className="grid grid-cols-5 gap-2 sm:grid-cols-10 sm:gap-3 short:grid-cols-10 short:gap-2">
          {world.items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.word}
              onClick={() => onLearn(index)}
              className="animate-bounce-in rounded-2xl bg-white p-1.5 shadow-md transition-transform active:scale-95 sm:p-2"
              style={{ animationDelay: `${300 + index * 50}ms` }}
            >
              <div className="aspect-square rounded-xl p-0.5" style={{ backgroundColor: item.color }}>
                <ItemArt id={item.id} className="h-full w-full" />
              </div>
            </button>
          ))}
        </section>
      </main>
    </div>
  )
}
