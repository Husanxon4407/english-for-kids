import { useEffect, useMemo, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import Mascot from '../components/Mascot.jsx'
import ItemArt from '../components/ItemArt.jsx'
import AudioButton from '../components/AudioButton.jsx'
import StarCounter from '../components/StarCounter.jsx'
import StarPop from '../components/StarPop.jsx'
import GameComplete from '../components/GameComplete.jsx'
import { StarIcon } from '../components/Icons.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import { useProgress } from '../lib/progress.jsx'
import { getDifficulty } from '../lib/settings.js'
import { chime, pop } from '../lib/sfx.js'
import { praise, shuffle } from '../lib/random.js'
import { pickRoundItems } from '../lib/review.js'
import { SCRIPT, correctLines } from '../data/script.js'

const COLORS = ['#f43f5e', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7']

// One question: the word Bobo says, and the balloons floating up with pictures.
function buildQuestions(targets, items, count) {
  return targets.map((target) => {
    const others = shuffle(items.filter((i) => i.id !== target.id)).slice(0, count - 1)
    return { target, balloons: shuffle([target, ...others]) }
  })
}

/**
 * Pop the balloon: balloons bob in the sky, each carrying a picture. Bobo
 * says a word and the child pops the balloon with that picture. A wrong
 * balloon just wobbles — nothing is lost and Bobo says the word again.
 */
export default function BalloonGame({ world, onBack, onHome }) {
  const { progress, addStars, recordAnswer, recordActivity } = useProgress()
  const { balloons: count } = getDifficulty(progress.settings.difficulty)
  const [round, setRound] = useState(0)
  const questions = useMemo(
    () => buildQuestions(pickRoundItems(world.items, progress.words), world.items, count),
    [world, count, round],
  )
  const [qIndex, setQIndex] = useState(0)
  const [popped, setPopped] = useState(null)
  const [shakeId, setShakeId] = useState(null)
  const [missed, setMissed] = useState(false)
  const [done, setDone] = useState(false)
  const { speaking, speak } = useSpeaker()

  const { target, balloons } = questions[qIndex]
  const ask = () => speak(target.prompt)

  useEffect(() => {
    setMissed(false)
    speak(qIndex === 0 ? [...SCRIPT.balloonIntro, target.prompt] : target.prompt)
  }, [qIndex, round])

  async function tap(item) {
    if (popped) return
    if (item.id !== target.id) {
      setMissed(true)
      setShakeId(item.id)
      speak([...SCRIPT.tryAgain, target.prompt])
      return
    }
    setPopped(item.id)
    pop()
    chime()
    addStars(1)
    recordAnswer(target.id, !missed)
    await speak(correctLines(target, praise()))
    setPopped(null)
    if (qIndex === questions.length - 1) {
      recordActivity(`${world.id}:balloon`)
      setDone(true)
    } else {
      setQIndex((i) => i + 1)
    }
  }

  function playAgain() {
    setRound((r) => r + 1)
    setQIndex(0)
    setDone(false)
  }

  if (done) return <GameComplete stars={questions.length} onAgain={playAgain} onBack={onBack} />

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome}>
        <StarCounter />
        <Mascot size="sm" talking={speaking} onClick={ask} />
      </TopBar>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-5 px-4 pb-6 short:flex-row short:pb-4">
        <AudioButton size="lg" onClick={ask} playing={speaking && !popped} label="Hear it again" />

        {/* A balloon is about one and a half squares tall, so the row's width is capped by the room left. */}
        <div
          className="grid w-full gap-3 max-w-[min(60rem,calc((var(--room)-15rem)*var(--n)*0.62))] sm:gap-6 sm:max-w-[min(60rem,calc((var(--room)-18rem)*var(--n)*0.62))] short:min-w-0 short:flex-1 short:max-w-[calc((var(--room)-3rem)*var(--n)*0.62)]"
          style={{ gridTemplateColumns: `repeat(${balloons.length}, 1fr)`, '--n': balloons.length }}
        >
          {balloons.map((item, i) => {
            const isPopped = popped === item.id
            return (
              <div key={`${round}-${qIndex}-${item.id}`} className="animate-bounce-in">
                <button
                  type="button"
                  aria-label={item.word}
                  onClick={() => tap(item)}
                  onAnimationEnd={(e) => e.animationName === 'wl-shake' && setShakeId(null)}
                  className={`relative block w-full transition-all duration-300 ${popped && !isPopped ? 'opacity-40' : ''} ${shakeId === item.id ? 'animate-shake' : ''}`}
                  style={shakeId === item.id ? undefined : { animation: `wl-bob ${2.4 + (i % 3) * 0.5}s ease-in-out ${i * 0.3}s infinite` }}
                >
                  {isPopped && <StarPop />}
                  <svg viewBox="0 0 100 150" className={`w-full drop-shadow-md transition-transform duration-200 ${isPopped ? 'scale-0' : ''}`} aria-hidden="true">
                    <path d="M50 108 Q42 124 52 134 Q60 142 50 150" fill="none" stroke="#3b2f2f" strokeWidth="2" />
                    <path d="M50 4 C20 4 6 30 8 54 C10 82 36 104 50 108 C64 104 90 82 92 54 C94 30 80 4 50 4 Z" fill={COLORS[i % COLORS.length]} stroke="#3b2f2f" strokeWidth="3" />
                    <path d="M44 108 L56 108 L53 116 L47 116 Z" fill={COLORS[i % COLORS.length]} stroke="#3b2f2f" strokeWidth="2" />
                    <ellipse cx="28" cy="30" rx="6" ry="12" transform="rotate(25 28 30)" fill="#fff" opacity="0.55" />
                  </svg>
                  {/* The picture rides on the balloon. */}
                  <span className={`absolute left-[19%] top-[11%] block w-[62%] rounded-[22%] bg-white p-[3%] shadow transition-transform duration-200 ${isPopped ? 'scale-125' : ''}`}>
                    <span className="block aspect-square rounded-[18%]" style={{ backgroundColor: item.color }}>
                      <ItemArt id={item.id} className="h-full w-full" />
                    </span>
                  </span>
                </button>
              </div>
            )
          })}
        </div>

        <div className="flex gap-1 short:flex-col" aria-hidden="true">
          {questions.map((q, i) => (
            <StarIcon key={i} className={`h-7 w-7 transition-all ${i < qIndex || (i === qIndex && popped) ? '' : 'opacity-25 grayscale'}`} />
          ))}
        </div>
      </main>
    </div>
  )
}
