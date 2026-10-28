import { useEffect, useMemo, useRef, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import Mascot from '../components/Mascot.jsx'
import ItemArt from '../components/ItemArt.jsx'
import AudioButton from '../components/AudioButton.jsx'
import StarCounter from '../components/StarCounter.jsx'
import StarPop from '../components/StarPop.jsx'
import GameComplete from '../components/GameComplete.jsx'
import { StarIcon } from '../components/Icons.jsx'
import { Door } from '../components/GameArt.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import { useProgress } from '../lib/progress.jsx'
import { useUzbek } from '../lib/uzbek.js'
import { getDifficulty } from '../lib/settings.js'
import { chime, flip, knock } from '../lib/sfx.js'
import { praise, shuffle } from '../lib/random.js'
import { pickRoundItems } from '../lib/review.js'
import { SCRIPT, correctLines } from '../data/script.js'

// Four doors for explorers, six for super explorers.
const doorCount = (difficulty) => (getDifficulty(difficulty).choices > 2 ? 6 : 4)

function buildQuestions(targets, items, count) {
  return targets.map((target) => {
    const others = shuffle(items.filter((i) => i.id !== target.id)).slice(0, count - 1)
    return { target, hidden: shuffle([target, ...others]) }
  })
}

/**
 * Peekaboo: pictures hide behind doors. Bobo asks for one ("Where is the
 * cat?") and the child opens doors to find it. Behind a wrong door Bobo says
 * what is there — more listening, never a mistake — and the door closes.
 */
export default function PeekabooGame({ world, onBack, onHome }) {
  const { progress, addStars, recordAnswer, recordActivity } = useProgress()
  const count = doorCount(progress.settings.difficulty)
  const uz = useUzbek()
  const [round, setRound] = useState(0)
  const questions = useMemo(
    () => buildQuestions(pickRoundItems(world.items, progress.words), world.items, count),
    [world, count, round],
  )
  const [qIndex, setQIndex] = useState(0)
  const [open, setOpen] = useState([]) // ids behind open doors
  const [found, setFound] = useState(false)
  const [busy, setBusy] = useState(false)
  const [missed, setMissed] = useState(false)
  const [done, setDone] = useState(false)
  const { speaking, speak } = useSpeaker()
  // False once the child has left the game, so a late line is not spoken on the next screen.
  const here = useRef(true)
  useEffect(() => {
    here.current = true
    return () => {
      here.current = false
    }
  }, [])

  const { target, hidden } = questions[qIndex]
  const ask = () => speak(target.prompt)

  useEffect(() => {
    setOpen([])
    setFound(false)
    setMissed(false)
    knock()
    speak(qIndex === 0 ? [...SCRIPT.peekabooIntro, ...uz.line('peekaboo'), target.prompt] : target.prompt)
  }, [qIndex, round])

  async function peek(item) {
    if (busy || found || open.includes(item.id)) return
    flip()
    setOpen((ids) => [...ids, item.id])
    if (item.id === target.id) {
      setFound(true)
      chime()
      addStars(1)
      recordAnswer(target.id, !missed)
      await speak([SCRIPT.peekabooFound, ...correctLines(target, praise())])
      if (qIndex === questions.length - 1) {
        recordActivity(`${world.id}:peekaboo`)
        setDone(true)
      } else {
        setQIndex((i) => i + 1)
      }
      return
    }
    // Not this one: say what it is, close the door, ask again.
    setMissed(true)
    setBusy(true)
    await speak(SCRIPT.word(item))
    if (!here.current) return
    setOpen((ids) => ids.filter((id) => id !== item.id))
    setBusy(false)
    speak(target.prompt)
  }

  function playAgain() {
    setRound((r) => r + 1)
    setQIndex(0)
    setDone(false)
  }

  if (done) return <GameComplete stars={questions.length} onAgain={playAgain} onBack={onBack} />

  const columns = count > 4 ? 3 : 2

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome}>
        <StarCounter />
        <Mascot size="sm" talking={speaking} onClick={ask} />
      </TopBar>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-5 px-4 pb-6 low:gap-3 low:pb-3 short:flex-row short:pb-3">
        <AudioButton size="lg" onClick={ask} playing={speaking && !found} label="Hear it again" />

        {/* Square doors in two rows: the width is capped by the room left. */}
        <div
          className="grid w-full gap-3 sm:gap-5 max-w-[min(40rem,calc((var(--room)-11rem)*var(--c)/2))] sm:max-w-[min(40rem,calc((var(--room)-15rem)*var(--c)/2))] short:max-w-[calc((var(--room)-1rem)*var(--c)/2)]"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, '--c': columns }}
        >
          {hidden.map((item, i) => {
            const isOpen = open.includes(item.id)
            const isFound = found && item.id === target.id
            return (
              <button
                key={`${round}-${qIndex}-${item.id}`}
                type="button"
                aria-label={isOpen ? item.word : 'door'}
                onClick={() => peek(item)}
                className="animate-bounce-in relative aspect-square rounded-[1.5rem] bg-white p-2 shadow-lg"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                {isFound && <StarPop />}
                <span className={`block h-full w-full rounded-[1rem] ${isFound ? 'animate-bounce-in' : ''}`} style={{ backgroundColor: item.color }}>
                  <ItemArt id={item.id} className="h-full w-full" />
                </span>
                {/* The door swings open on its left hinge. */}
                <span
                  className="absolute inset-0 origin-left transition-transform duration-500 ease-out"
                  style={{ transform: isOpen ? 'perspective(500px) rotateY(-105deg)' : 'perspective(500px) rotateY(0deg)' }}
                >
                  <Door index={i} className="h-full w-full drop-shadow-md" />
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex gap-1 short:flex-col" aria-hidden="true">
          {questions.map((q, i) => (
            <StarIcon key={i} className={`h-7 w-7 transition-all ${i < qIndex || (i === qIndex && found) ? '' : 'opacity-25 grayscale'}`} />
          ))}
        </div>
      </main>
    </div>
  )
}
