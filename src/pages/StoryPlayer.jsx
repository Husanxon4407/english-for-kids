import { useEffect, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import Mascot from '../components/Mascot.jsx'
import ItemArt from '../components/ItemArt.jsx'
import Scene from '../components/Scenes.jsx'
import AudioButton from '../components/AudioButton.jsx'
import StarCounter from '../components/StarCounter.jsx'
import StarPop from '../components/StarPop.jsx'
import GameComplete from '../components/GameComplete.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import { useProgress } from '../lib/progress.jsx'
import { useUzbek } from '../lib/uzbek.js'
import { chime } from '../lib/sfx.js'
import { SCRIPT } from '../data/script.js'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * A short picture story. In each scene Bobo tells a line or two and asks the
 * child to find something; the last scene just says goodbye. Words learned
 * in the worlds come back here in a new place, which is how they stick.
 */
export default function StoryPlayer({ story, onBack, onHome }) {
  const { addStars, recordAnswer, recordActivity } = useProgress()
  const uz = useUzbek()
  const [round, setRound] = useState(0)
  const [index, setIndex] = useState(0)
  const [found, setFound] = useState(false)
  const [missed, setMissed] = useState(false)
  const [shakeId, setShakeId] = useState(null)
  const [done, setDone] = useState(false)
  const { speaking, speak } = useSpeaker()

  const isEnding = index === story.scenes.length
  const scene = isEnding ? story.ending : story.scenes[index]

  const tell = () =>
    speak([
      ...(index === 0 ? [SCRIPT.title(story), ...uz.text(story.uz)] : []),
      ...scene.lines,
      ...uz.text(scene.uz),
      ...(scene.prompt ? [scene.prompt] : []),
    ])

  useEffect(() => {
    setFound(false)
    setMissed(false)
    let cancelled = false
    tell().then(async () => {
      if (!isEnding || cancelled) return
      await wait(700)
      if (cancelled) return
      recordActivity(`story:${story.id}`)
      setDone(true)
    })
    return () => {
      cancelled = true
    }
  }, [index, round])

  async function tap(item) {
    if (found || isEnding) return
    if (item.id !== scene.target) {
      setMissed(true)
      setShakeId(item.id)
      speak([...SCRIPT.tryAgain, scene.prompt])
      return
    }
    setFound(true)
    chime()
    addStars(1)
    recordAnswer(scene.target, !missed)
    await speak(scene.reward)
    setIndex((i) => i + 1)
  }

  function again() {
    setRound((r) => r + 1)
    setIndex(0)
    setDone(false)
  }

  if (done) return <GameComplete stars={story.scenes.length} onAgain={again} onBack={onBack} />

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome}>
        <StarCounter />
        <Mascot size="sm" talking={speaking} onClick={tell} />
      </TopBar>

      <main className="mx-auto flex w-full flex-1 flex-col items-center justify-center gap-4 px-3 pb-5 sm:gap-5 sm:px-6">
        <div
          key={`${round}-${index}`}
          className="animate-bounce-in relative aspect-[4/3] w-full max-w-[min(56rem,calc((100dvh-17rem)*4/3))] overflow-hidden rounded-[2rem] border-8 border-white bg-white shadow-xl"
        >
          <Scene name={scene.scene} className="absolute inset-0 h-full w-full" />
          {scene.items.map((item) => {
            const isTarget = item.id === scene.target
            return (
              <button
                key={item.id}
                type="button"
                aria-label={item.id}
                disabled={isEnding}
                onClick={() => tap(item)}
                onAnimationEnd={(e) => e.animationName === 'wl-shake' && setShakeId(null)}
                className={`absolute aspect-square rounded-full transition-all duration-300 ${
                  found && isTarget ? 'z-10 scale-125' : ''
                } ${found && !isTarget ? 'opacity-50' : ''} ${shakeId === item.id ? 'animate-shake' : ''} ${
                  isEnding ? 'animate-float' : 'active:scale-95'
                }`}
                style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.size}%` }}
              >
                {found && isTarget && <StarPop />}
                <ItemArt id={item.id} className="h-full w-full drop-shadow-md" />
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-5">
          <AudioButton onClick={tell} playing={speaking} label="Hear it again" />
          <div className="flex gap-2" aria-hidden="true">
            {[...story.scenes, story.ending].map((s, i) => (
              <span
                key={i}
                className={`h-4 rounded-full border-2 border-white shadow-sm transition-all ${
                  i === index ? 'w-10 bg-amber-400' : i < index ? 'w-4 bg-lime-400' : 'w-4 bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
