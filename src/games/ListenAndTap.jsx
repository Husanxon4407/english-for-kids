import { useEffect, useMemo, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import Mascot from '../components/Mascot.jsx'
import ItemArt from '../components/ItemArt.jsx'
import AudioButton from '../components/AudioButton.jsx'
import StarCounter from '../components/StarCounter.jsx'
import StarPop from '../components/StarPop.jsx'
import GameComplete from '../components/GameComplete.jsx'
import { CheckIcon, StarIcon } from '../components/Icons.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import { useProgress } from '../lib/progress.jsx'
import { getDifficulty } from '../lib/settings.js'
import { chime } from '../lib/sfx.js'
import { praise, shuffle } from '../lib/random.js'
import { SCRIPT, correctLines } from '../data/script.js'
import { planTargets } from '../lib/review.js'

// Each target becomes one question. The correct picture lands in a random
// position so children learn the word, not the spot. Wrong choices come from
// the target's own world (so "Touch red!" never shows a red apple too).
function buildQuestions(targets, choices, poolFor) {
  return targets.map((target) => {
    const others = shuffle(poolFor(target).filter((i) => i.id !== target.id)).slice(0, choices - 1)
    return { target, options: shuffle([target, ...others]) }
  })
}

export default function ListenAndTap({ world, onBack, onHome }) {
  const { progress, addStars, recordAnswer, recordActivity } = useProgress()
  const { choices } = getDifficulty(progress.settings.difficulty)
  const [round, setRound] = useState(0)
  // Planned once per round from the child's progress at the start of the round.
  const questions = useMemo(() => {
    const targets = world.isReview ? world.items : planTargets(world.items, progress.words)
    return buildQuestions(targets, choices, world.poolFor || (() => world.items))
  }, [world, choices, round])
  const [qIndex, setQIndex] = useState(0)
  const [status, setStatus] = useState('asking') // asking | correct | done
  const [shakeId, setShakeId] = useState(null)
  const [hint, setHint] = useState(false)
  const [missed, setMissed] = useState(false) // a wrong tap happened on this question
  const { speaking, speak } = useSpeaker()

  const question = questions[qIndex]
  const target = question?.target
  const ask = () => speak(target.prompt)

  useEffect(() => {
    if (status !== 'asking') return
    setHint(false)
    setMissed(false)
    speak(qIndex === 0 ? [world.introLine || SCRIPT.listenIntro, target.prompt] : target.prompt)
    // Ask once when each new question appears.
  }, [qIndex, round])

  async function choose(option) {
    if (status !== 'asking') return
    if (option.id === target.id) {
      setStatus('correct')
      chime()
      addStars(1)
      recordAnswer(target.id, !missed)
      await speak(correctLines(target, praise()))
      if (qIndex === questions.length - 1) {
        recordActivity(`${world.id}:listen`)
        setStatus('done')
      } else {
        setQIndex((i) => i + 1)
        setStatus('asking')
      }
    } else {
      // Gentle retry: no buzzer, no lost stars — just listen again.
      setMissed(true)
      setShakeId(option.id)
      setHint(true)
      speak([...SCRIPT.tryAgain, target.prompt])
    }
  }

  function playAgain() {
    setRound((r) => r + 1)
    setQIndex(0)
    setStatus('asking')
  }

  if (status === 'done') {
    return <GameComplete stars={questions.length} onAgain={playAgain} onBack={onBack} />
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome}>
        <StarCounter />
        <Mascot size="sm" talking={speaking} onClick={ask} />
      </TopBar>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-6 px-4 pb-6 sm:gap-8">
        <AudioButton size="lg" onClick={ask} playing={speaking || hint} label="Hear it again" />

        <div
          className={`grid w-full gap-4 sm:gap-6 ${
            question.options.length === 2 ? 'max-w-2xl grid-cols-2' : question.options.length === 3 ? 'max-w-4xl grid-cols-3' : 'max-w-2xl grid-cols-2 lg:max-w-5xl lg:grid-cols-4'
          }`}
        >
          {question.options.map((option) => {
            const isRight = status === 'correct' && option.id === target.id
            const faded = status === 'correct' && option.id !== target.id
            return (
              <div key={`${qIndex}-${round}-${option.id}`} className="animate-bounce-in">
              <button
                type="button"
                aria-label={option.word}
                onClick={() => choose(option)}
                className={`relative w-full rounded-[2rem] bg-white p-3 shadow-lg transition-all duration-300 sm:p-4 ${
                  isRight ? 'scale-105 ring-8 ring-lime-400' : ''
                } ${faded ? 'scale-95 opacity-40' : ''} ${shakeId === option.id ? 'animate-shake' : ''}`}
                onAnimationEnd={(e) => e.animationName === 'wl-shake' && setShakeId(null)}
              >
                {isRight && <StarPop />}
                <div className="aspect-square rounded-3xl p-2" style={{ backgroundColor: option.color }}>
                  <ItemArt id={option.id} className="h-full w-full" />
                </div>
                {isRight && (
                  <span className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-lime-500 text-white shadow-md">
                    <CheckIcon className="h-8 w-8" />
                  </span>
                )}
              </button>
              </div>
            )
          })}
        </div>

        <div className="flex gap-1" aria-hidden="true">
          {questions.map((q, i) => (
            <StarIcon
              key={i}
              className={`h-7 w-7 transition-all ${i < qIndex || (i === qIndex && status === 'correct') ? '' : 'opacity-25 grayscale'}`}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
