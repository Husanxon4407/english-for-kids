import { useEffect, useMemo, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import Mascot from '../components/Mascot.jsx'
import PictureTile from '../components/PictureTile.jsx'
import StarCounter from '../components/StarCounter.jsx'
import StarPop from '../components/StarPop.jsx'
import GameComplete from '../components/GameComplete.jsx'
import { StarIcon } from '../components/Icons.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import { useProgress } from '../lib/progress.jsx'
import { getDifficulty } from '../lib/settings.js'
import { chime, pop } from '../lib/sfx.js'
import { praise, shuffle } from '../lib/random.js'
import { SCRIPT } from '../data/script.js'
import { useUzbek } from '../lib/uzbek.js'

const PUZZLES_PER_GAME = 3

// order[position] = which piece sits there. Never starts already solved.
function scramble(count) {
  const solved = Array.from({ length: count }, (_, i) => i)
  let order = shuffle(solved)
  while (order.every((piece, position) => piece === position)) order = shuffle(solved)
  return order
}

/**
 * Magic puzzle: the picture is cut into squares and mixed up. Tap two pieces
 * to swap them. Pieces in the right place glow green, so there is always a
 * clue. When the picture is whole, Bobo says what it is.
 */
export default function PuzzleGame({ world, onBack, onHome }) {
  const { progress, addStars, markSeen, recordActivity } = useProgress()
  const { puzzleGrid: grid } = getDifficulty(progress.settings.difficulty)
  const [round, setRound] = useState(0)
  const items = useMemo(() => shuffle(world.items).slice(0, PUZZLES_PER_GAME), [world, round])
  const [index, setIndex] = useState(0)
  const [order, setOrder] = useState(() => scramble(grid * grid))
  const [selected, setSelected] = useState(null)
  const [solved, setSolved] = useState(false)
  const [done, setDone] = useState(false)
  const { speaking, speak } = useSpeaker()

  const item = items[index]
  const uz = useUzbek()
  const hint = index === 0 ? [...SCRIPT.puzzleIntro, ...uz.line('puzzle'), SCRIPT.whatsThis] : SCRIPT.whatsThis

  useEffect(() => {
    speak(hint)
  }, [index, round])

  async function tap(position) {
    if (solved) return
    pop()
    if (selected === null) return setSelected(position)
    if (selected === position) return setSelected(null)

    const next = [...order]
    ;[next[selected], next[position]] = [next[position], next[selected]]
    setOrder(next)
    setSelected(null)
    if (!next.every((piece, at) => piece === at)) return

    setSolved(true)
    chime()
    addStars(1)
    markSeen(item.id)
    await speak([praise(), item.phrase])
    if (index === items.length - 1) {
      recordActivity(`${world.id}:puzzle`)
      setDone(true)
    } else {
      setOrder(scramble(grid * grid))
      setSolved(false)
      setIndex((i) => i + 1)
    }
  }

  function playAgain() {
    setRound((r) => r + 1)
    setIndex(0)
    setOrder(scramble(grid * grid))
    setSelected(null)
    setSolved(false)
    setDone(false)
  }

  if (done) return <GameComplete stars={items.length} onAgain={playAgain} onBack={onBack} />

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome}>
        <StarCounter />
        <Mascot size="sm" talking={speaking} onClick={() => speak(hint)} />
      </TopBar>

      <main className="mx-auto flex w-full flex-1 flex-col items-center justify-center gap-6 px-4 pb-6">
        <div
          key={`${round}-${index}`}
          className={`animate-bounce-in relative grid w-full max-w-[min(28rem,58dvh)] rounded-[2rem] bg-white shadow-xl transition-all duration-500 ${
            solved ? 'p-3 ring-8 ring-lime-400' : 'p-3'
          }`}
          style={{ gridTemplateColumns: `repeat(${grid}, 1fr)`, gap: solved ? 0 : '0.5rem' }}
        >
          {solved && <StarPop />}
          {order.map((piece, position) => {
            const inPlace = piece === position
            return (
              <button
                key={piece}
                type="button"
                aria-label={`piece ${piece + 1}`}
                onClick={() => tap(position)}
                className={`transition-all duration-300 ${solved ? '' : 'rounded-2xl'} overflow-hidden ${
                  selected === position
                    ? 'z-10 scale-105 ring-8 ring-sky-400'
                    : !solved && inPlace
                      ? 'ring-4 ring-lime-400'
                      : ''
                }`}
              >
                <PictureTile item={item} grid={grid} index={piece} />
              </button>
            )
          })}
        </div>

        <div className="flex gap-1" aria-hidden="true">
          {items.map((it, i) => (
            <StarIcon key={it.id} className={`h-7 w-7 ${i < index || (i === index && solved) ? '' : 'opacity-25 grayscale'}`} />
          ))}
        </div>
      </main>
    </div>
  )
}
