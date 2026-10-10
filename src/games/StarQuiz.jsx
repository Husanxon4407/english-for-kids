import { useEffect, useMemo, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import Mascot from '../components/Mascot.jsx'
import ItemArt from '../components/ItemArt.jsx'
import AudioButton from '../components/AudioButton.jsx'
import StarCounter from '../components/StarCounter.jsx'
import StarPop from '../components/StarPop.jsx'
import Medal from '../components/Medal.jsx'
import RoundButton from '../components/RoundButton.jsx'
import { BackIcon, CheckIcon, RepeatIcon } from '../components/Icons.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import { useProgress } from '../lib/progress.jsx'
import { getDifficulty, medalFor } from '../lib/settings.js'
import { chime, fanfare } from '../lib/sfx.js'
import { praise, shuffle } from '../lib/random.js'
import { SCRIPT } from '../data/script.js'
import { useUzbek } from '../lib/uzbek.js'

function buildQuestions(items, choices) {
  return shuffle(items).map((target) => {
    const others = shuffle(items.filter((i) => i.id !== target.id)).slice(0, choices - 1)
    return { target, options: shuffle([target, ...others]) }
  })
}

// One dot per question: green when known, soft blue when Bobo helped. Never red.
function ResultDots({ results, total, className = 'h-5 w-5' }) {
  return (
    <div className="flex gap-2" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`${className} rounded-full border-4 border-white shadow transition-colors ${
            results[i] === true ? 'bg-lime-400' : results[i] === false ? 'bg-sky-200' : 'bg-white/60'
          }`}
        />
      ))}
    </div>
  )
}

function QuizResult({ medal, results, onAgain, onBack }) {
  const { speaking, speak } = useSpeaker()
  const lines = [SCRIPT.hooray, SCRIPT.medal[medal]]

  useEffect(() => {
    fanfare()
    speak(lines)
  }, [])

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 px-4 py-8">
      <div className="flex items-end gap-2">
        <Mascot size="lg" talking={speaking} waving onClick={() => speak(lines)} />
        <Medal kind={medal} className="animate-bounce-in h-36 w-32 drop-shadow-lg sm:h-56 sm:w-48" />
      </div>
      <ResultDots results={results} total={results.length} className="h-7 w-7" />
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

/**
 * Star challenge: a gentle check of every word in a world. One try per word;
 * if the tap is wrong, Bobo simply shows the right picture and moves on.
 * Every result earns a medal, and only the best one is kept.
 */
export default function StarQuiz({ world, onBack, onHome }) {
  const { progress, addStars, recordAnswer, recordActivity, recordMedal } = useProgress()
  const { quizChoices } = getDifficulty(progress.settings.difficulty)
  const [round, setRound] = useState(0)
  const questions = useMemo(() => buildQuestions(world.items, quizChoices), [world, quizChoices, round])
  const [qIndex, setQIndex] = useState(0)
  const [results, setResults] = useState([])
  const [picked, setPicked] = useState(null)
  const [medal, setMedal] = useState(null)
  const { speaking, speak } = useSpeaker()

  const { target, options } = questions[qIndex]
  const ask = () => speak(target.prompt)
  const uz = useUzbek()

  useEffect(() => {
    speak(qIndex === 0 ? [...SCRIPT.quizIntro, ...uz.line('quiz'), target.prompt] : target.prompt)
  }, [qIndex, round])

  async function choose(option) {
    if (picked) return
    const correct = option.id === target.id
    const nowResults = [...results, correct]
    setPicked(option.id)
    setResults(nowResults)
    recordAnswer(target.id, correct)
    if (correct) {
      chime()
      addStars(1)
      await speak(praise())
    } else {
      await speak([SCRIPT.quizLook, target.phrase])
    }

    if (qIndex === questions.length - 1) {
      const earned = medalFor(nowResults.filter(Boolean).length, nowResults.length)
      recordMedal(world.id, earned)
      recordActivity(`${world.id}:quiz`)
      setMedal(earned)
    } else {
      setPicked(null)
      setQIndex((i) => i + 1)
    }
  }

  function playAgain() {
    setRound((r) => r + 1)
    setQIndex(0)
    setResults([])
    setPicked(null)
    setMedal(null)
  }

  if (medal) return <QuizResult medal={medal} results={results} onAgain={playAgain} onBack={onBack} />

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome}>
        <StarCounter />
        <Mascot size="sm" talking={speaking} onClick={ask} />
      </TopBar>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-5 px-4 pb-6 sm:gap-7">
        <AudioButton size="lg" onClick={ask} playing={speaking && !picked} label="Hear it again" />

        <div className={`grid w-full gap-3 sm:gap-6 ${options.length === 3 ? 'max-w-4xl grid-cols-3' : 'max-w-2xl grid-cols-2 lg:max-w-5xl lg:grid-cols-4'}`}>
          {options.map((option) => {
            const isTarget = option.id === target.id
            const reveal = picked && isTarget
            const faded = picked && !isTarget
            return (
              <div key={`${round}-${qIndex}-${option.id}`} className="animate-bounce-in">
                <button
                  type="button"
                  aria-label={option.word}
                  onClick={() => choose(option)}
                  className={`relative w-full rounded-[2rem] bg-white p-2 shadow-lg transition-all duration-300 sm:p-4 ${
                    reveal ? `scale-105 ring-8 ${picked === target.id ? 'ring-lime-400' : 'ring-sky-300'}` : ''
                  } ${faded ? 'scale-95 opacity-40' : ''}`}
                >
                  {reveal && picked === target.id && <StarPop />}
                  <div className="aspect-square rounded-3xl p-2" style={{ backgroundColor: option.color }}>
                    <ItemArt id={option.id} className="h-full w-full" />
                  </div>
                  {reveal && picked === target.id && (
                    <span className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-lime-500 text-white shadow-md">
                      <CheckIcon className="h-8 w-8" />
                    </span>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        <ResultDots results={results} total={questions.length} />
      </main>
    </div>
  )
}
