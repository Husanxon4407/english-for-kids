import { useEffect, useMemo, useRef, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import Mascot, { Bobo } from '../components/Mascot.jsx'
import ItemArt from '../components/ItemArt.jsx'
import AudioButton from '../components/AudioButton.jsx'
import StarCounter from '../components/StarCounter.jsx'
import StarPop from '../components/StarPop.jsx'
import GameComplete from '../components/GameComplete.jsx'
import { StarIcon } from '../components/Icons.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import { useProgress } from '../lib/progress.jsx'
import { useUzbek } from '../lib/uzbek.js'
import { getDifficulty } from '../lib/settings.js'
import { chime, munch, pop } from '../lib/sfx.js'
import { praise, shuffle } from '../lib/random.js'
import { pickRoundItems } from '../lib/review.js'
import { SCRIPT, correctLines } from '../data/script.js'

// Worlds whose words Bobo can really eat; everything else he hugs.
const FOOD_WORLDS = ['fruits', 'veggies']
// A tap that moves less than this is a tap, not a drag.
const DRAG_START = 10

function buildQuestions(targets, items, count) {
  return targets.map((target) => {
    const others = shuffle(items.filter((i) => i.id !== target.id)).slice(0, count - 1)
    return { target, choices: shuffle([target, ...others]) }
  })
}

/**
 * Feed Bobo: Bobo asks for a picture ("Find the apple!") and the child drags
 * it to him — or simply taps it. He munches food and hugs everything else. A
 * wrong picture makes him shake his head; nothing is lost.
 */
export default function FeedGame({ world, onBack, onHome }) {
  const { progress, addStars, recordAnswer, recordActivity } = useProgress()
  const { balloons: count } = getDifficulty(progress.settings.difficulty)
  const uz = useUzbek()
  const [round, setRound] = useState(0)
  const questions = useMemo(
    () => buildQuestions(pickRoundItems(world.items, progress.words), world.items, count),
    [world, count, round],
  )
  const [qIndex, setQIndex] = useState(0)
  const [given, setGiven] = useState(null) // the picture Bobo is eating or hugging
  const [refused, setRefused] = useState(0) // bumps to replay the head shake
  const [shakeId, setShakeId] = useState(null)
  const [missed, setMissed] = useState(false)
  const [drag, setDrag] = useState(null) // { item, x, y, moved }
  const [done, setDone] = useState(false)
  const boboRef = useRef(null)
  const dragRef = useRef(null)
  const { speaking, speak } = useSpeaker()

  const food = FOOD_WORLDS.includes(world.id)
  const { target, choices } = questions[qIndex]
  const ask = () => speak(target.prompt)

  useEffect(() => {
    setMissed(false)
    speak(qIndex === 0 ? [...SCRIPT.feedIntro, ...uz.line('feed'), target.prompt] : target.prompt)
  }, [qIndex, round])

  async function give(item) {
    if (given) return
    if (item.id !== target.id) {
      setMissed(true)
      setShakeId(item.id)
      setRefused((n) => n + 1)
      speak([SCRIPT.feedNo, target.prompt])
      return
    }
    setGiven(item)
    pop()
    if (food) munch()
    else chime()
    addStars(1)
    recordAnswer(target.id, !missed)
    await speak([food ? SCRIPT.feedYum : SCRIPT.feedHug, ...correctLines(target, praise())])
    setGiven(null)
    if (qIndex === questions.length - 1) {
      recordActivity(`${world.id}:feed`)
      setDone(true)
    } else {
      setQIndex((i) => i + 1)
    }
  }

  // Dragging: follow the finger; let go over Bobo to give it to him. The
  // listeners are added the moment the finger touches, so even the quickest tap
  // is caught.
  const giveRef = useRef(give)
  giveRef.current = give
  useEffect(() => () => dragRef.current?.cleanup(), [])

  function startDrag(event, item) {
    if (given || dragRef.current) return
    event.preventDefault()
    function move(e) {
      const d = dragRef.current
      if (!d) return
      d.moved = d.moved || Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > DRAG_START
      setDrag({ item, x: e.clientX, y: e.clientY, moved: d.moved })
    }
    function up(e) {
      const d = dragRef.current
      if (!d) return
      d.cleanup()
      if (!d.moved) return giveRef.current(item) // a tap
      const box = boboRef.current?.getBoundingClientRect()
      const margin = 30
      if (box && e.clientX > box.left - margin && e.clientX < box.right + margin && e.clientY > box.top - margin && e.clientY < box.bottom + margin) {
        giveRef.current(item)
      }
    }
    function cleanup() {
      dragRef.current = null
      setDrag(null)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
    dragRef.current = { startX: event.clientX, startY: event.clientY, moved: false, cleanup }
    setDrag({ item, x: event.clientX, y: event.clientY, moved: false })
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
  }

  function playAgain() {
    setRound((r) => r + 1)
    setQIndex(0)
    setDone(false)
  }

  if (done) return <GameComplete stars={questions.length} onAgain={playAgain} onBack={onBack} />

  // Four pictures (Super Explorer) make two rows: Bobo and the pictures shrink a little on phones.
  const many = choices.length > 3
  const eating = given && food
  const hugging = given && !food

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome}>
        <StarCounter />
        <Mascot size="sm" talking={speaking} onClick={ask} />
      </TopBar>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-4 px-4 pb-6 sm:flex-row sm:gap-10 low:gap-2 low:pb-3 short:flex-row short:gap-6 short:pb-3">
        {/* Bobo, waiting with his mouth open — the place to drop the picture. */}
        <div className="flex flex-col items-center gap-2">
          <div
            ref={boboRef}
            key={refused}
            className={`relative ${many ? 'w-[min(11rem,calc(var(--room)*0.27))]' : 'w-[min(13rem,calc(var(--room)*0.34))]'} sm:w-[min(17rem,calc(var(--room)*0.5))] short:w-[calc(var(--room)*0.62)] ${drag?.moved ? 'scale-105' : ''} transition-transform`}
            style={refused && !given ? { animation: 'wl-no 0.9s ease-in-out' } : given ? { animation: 'wl-joy 0.7s ease-in-out 2' } : undefined}
          >
            <Bobo
              talking={speaking && !given}
              mood={eating ? 'eat' : drag?.moved ? 'wow' : 'happy'}
              arms={hugging ? 'clap' : drag?.moved ? 'up' : undefined}
              className="h-auto w-full drop-shadow-lg"
            />
            {given && (
              <div
                className={`pointer-events-none absolute left-1/2 w-[38%] -translate-x-1/2 ${eating ? 'top-[42%]' : 'top-[52%]'}`}
                style={{ animation: eating ? 'wl-gulp 1s ease-in forwards' : 'wl-hug 0.5s ease-out forwards' }}
              >
                <ItemArt id={given.id} className="h-auto w-full drop-shadow" />
              </div>
            )}
            {given && <StarPop />}
          </div>
          <AudioButton size="md" onClick={ask} playing={speaking && !given} label="Hear it again" />
        </div>

        <div className="flex flex-col items-center gap-4 low:gap-2">
          <div className={`grid gap-3 sm:gap-5 ${choices.length > 3 ? 'grid-cols-2' : 'grid-cols-3'} short:grid-cols-4`}>
            {choices.map((item) => {
              const isGiven = given?.id === item.id
              const isDragged = drag?.moved && drag.item.id === item.id
              return (
                <button
                  key={`${round}-${qIndex}-${item.id}`}
                  type="button"
                  aria-label={item.word}
                  onPointerDown={(e) => startDrag(e, item)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && give(item)}
                  onAnimationEnd={(e) => e.animationName === 'wl-shake' && setShakeId(null)}
                  className={`animate-bounce-in ${many ? 'w-[min(7rem,calc(var(--room)*0.17))]' : 'w-[min(7.5rem,calc(var(--room)*0.2))]'} touch-none rounded-[1.75rem] bg-white p-2 shadow-lg transition-opacity sm:w-[min(9rem,calc(var(--room)*0.24))] short:w-[calc(var(--room)*0.3)] ${
                    isGiven || isDragged ? 'opacity-25' : ''
                  } ${shakeId === item.id ? 'animate-shake' : ''}`}
                >
                  <span className="block aspect-square rounded-[1.25rem]" style={{ backgroundColor: item.color }}>
                    <ItemArt id={item.id} className="h-full w-full" />
                  </span>
                </button>
              )
            })}
          </div>
          <div className="flex gap-1" aria-hidden="true">
            {questions.map((q, i) => (
              <StarIcon key={i} className={`h-7 w-7 transition-all ${i < qIndex || (i === qIndex && given) ? '' : 'opacity-25 grayscale'}`} />
            ))}
          </div>
        </div>
      </main>

      {/* The picture under the finger while it is dragged. */}
      {drag?.moved && (
        <div className="pointer-events-none fixed z-50 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] bg-white p-2 shadow-2xl sm:w-32" style={{ left: drag.x, top: drag.y }}>
          <span className="block aspect-square rounded-2xl" style={{ backgroundColor: drag.item.color }}>
            <ItemArt id={drag.item.id} className="h-full w-full" />
          </span>
        </div>
      )}
    </div>
  )
}
