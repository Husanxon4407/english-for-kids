import { useEffect } from 'react'
import TopBar from '../components/TopBar.jsx'
import Mascot from '../components/Mascot.jsx'
import ItemArt from '../components/ItemArt.jsx'
import StarCounter from '../components/StarCounter.jsx'
import PictureTile from '../components/PictureTile.jsx'
import Medal from '../components/Medal.jsx'
import { EarIcon, SpeakerIcon, StarIcon } from '../components/Icons.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import { useProgress } from '../lib/progress.jsx'
import { SCRIPT } from '../data/script.js'

// The three activities in each world. Pictures (not text) tell children what
// each one is, and tapping says its name before starting.
const ACTIVITIES = [
  { id: 'learn', name: SCRIPT.activities.learn, color: '#38bdf8' },
  { id: 'listen', name: SCRIPT.activities.listen, color: '#fb923c' },
  { id: 'match', name: SCRIPT.activities.match, color: '#f472b6' },
  { id: 'memory', name: SCRIPT.activities.memory, color: '#a78bfa' },
  { id: 'puzzle', name: SCRIPT.activities.puzzle, color: '#34d399' },
  { id: 'quiz', name: SCRIPT.activities.quiz, color: '#fbbf24' },
]

function ActivityPicture({ id, items, matchStyle, medal }) {
  const [a, b] = items
  if (id === 'learn') {
    return (
      <div className="relative h-full w-full">
        <ItemArt id={a.id} className="h-full w-full" />
        <span className="absolute -bottom-1 -right-1 rounded-full bg-sky-500 p-1 text-white shadow sm:p-1.5">
          <SpeakerIcon className="h-4 w-4 sm:h-6 sm:w-6" />
        </span>
      </div>
    )
  }
  if (id === 'listen') {
    return (
      <div className="flex h-full w-full flex-col items-center justify-between">
        <span className="flex h-[46%] items-center rounded-full bg-orange-400 p-[6%] text-white shadow">
          <EarIcon className="h-full w-auto" />
        </span>
        <div className="flex h-[46%] w-full justify-center gap-[6%]">
          <ItemArt id={b.id} className="h-full w-auto rounded-lg bg-white p-0.5" />
          <ItemArt id={items[2].id} className="h-full w-auto rounded-lg bg-white p-0.5" />
        </div>
      </div>
    )
  }
  if (id === 'memory') {
    return (
      <div className="flex h-full w-full items-center justify-center gap-[6%]">
        <span className="flex aspect-square w-[44%] -rotate-6 items-center justify-center rounded-xl border-2 border-white bg-violet-400 shadow">
          <StarIcon className="h-2/3 w-2/3" />
        </span>
        <ItemArt id={items[3].id} className="w-[44%] rotate-6 rounded-xl bg-white p-0.5 shadow" />
      </div>
    )
  }
  if (id === 'puzzle') {
    return (
      <div className="grid h-full w-full grid-cols-2 gap-[5%]">
        {[0, 3, 2, 1].map((piece) => (
          <PictureTile key={piece} item={items[4]} grid={2} index={piece} className="rounded-lg shadow-sm" />
        ))}
      </div>
    )
  }
  if (id === 'quiz') return <Medal kind={medal || 'gold'} className={`h-full w-full ${medal ? '' : 'opacity-90'}`} />
  const last = items[items.length - 1]
  return (
    <div className="flex h-full w-full items-center justify-center gap-1">
      <ItemArt id={last.id} className="w-1/2" />
      {matchStyle === 'color' ? (
        <ItemArt id={last.id} variant="target" className="w-1/2" />
      ) : (
        <ItemArt id={last.id} className="w-1/2" style={{ filter: 'brightness(0)', opacity: 0.22 }} />
      )}
    </div>
  )
}

export default function World({ world, onBack, onHome, onLearn, onPlay, welcome }) {
  const { speaking, speak } = useSpeaker()
  const { progress } = useProgress()
  const intro = welcome ? [...world.learnDone, SCRIPT.learnFinished] : [world.intro]

  useEffect(() => {
    speak(intro)
  }, [])

  async function openActivity(activity) {
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

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-6 p-4 sm:gap-8 sm:p-6 lg:max-w-6xl">
        <section className="grid grid-cols-3 gap-3 sm:gap-5 lg:grid-cols-6">
          {ACTIVITIES.map((activity, i) => {
            const plays = progress.activities[`${world.id}:${activity.id}`] || 0
            const medal = activity.id === 'quiz' ? progress.medals[world.id] : null
            return (
              <button
                key={activity.id}
                type="button"
                aria-label={activity.name}
                onClick={() => openActivity(activity)}
                className="animate-bounce-in relative rounded-[2rem] bg-white p-3 shadow-lg transition-transform active:scale-95 sm:p-4"
                style={{ borderBottom: `8px solid ${activity.color}`, animationDelay: `${i * 90}ms` }}
              >
                <div className="aspect-square rounded-3xl p-2 sm:p-3" style={{ backgroundColor: `${activity.color}26` }}>
                  <ActivityPicture id={activity.id} items={world.items} matchStyle={world.matchStyle} medal={medal} />
                </div>
                {plays > 0 && !medal && (
                  <span className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-lg font-extrabold text-white shadow" aria-hidden="true">
                    ★
                  </span>
                )}
              </button>
            )
          })}
        </section>

        {/* Free exploration: tap any animal to learn it. */}
        <section className="mx-auto grid w-full max-w-3xl grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
          {world.items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.word}
              onClick={() => onLearn(index)}
              className="animate-bounce-in rounded-3xl bg-white p-2 shadow-md transition-transform active:scale-95"
              style={{ animationDelay: `${300 + index * 60}ms` }}
            >
              <div className="aspect-square rounded-2xl p-1" style={{ backgroundColor: item.color }}>
                <ItemArt id={item.id} className="h-full w-full" />
              </div>
            </button>
          ))}
        </section>
      </main>
    </div>
  )
}
