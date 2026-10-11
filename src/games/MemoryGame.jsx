import { useEffect, useMemo, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import Mascot from '../components/Mascot.jsx'
import ItemArt from '../components/ItemArt.jsx'
import StarCounter from '../components/StarCounter.jsx'
import StarPop from '../components/StarPop.jsx'
import GameComplete from '../components/GameComplete.jsx'
import { StarIcon } from '../components/Icons.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import { useProgress } from '../lib/progress.jsx'
import { getDifficulty } from '../lib/settings.js'
import { chime, flip } from '../lib/sfx.js'
import { praise, shuffle } from '../lib/random.js'
import { SCRIPT } from '../data/script.js'
import { useUzbek } from '../lib/uzbek.js'
import { pickRoundItems } from '../lib/review.js'

// How long two different cards stay open before they turn back over.
const LOOK_TIME = 900

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function buildCards(items, pairs) {
  const chosen = shuffle(items).slice(0, pairs)
  return shuffle(chosen.flatMap((item) => [{ key: `${item.id}-a`, item }, { key: `${item.id}-b`, item }]))
}

/**
 * Memory cards: turn two over and find the pairs. Every card says its word
 * when it turns, so each look is another listen. No turn limit, no timer.
 */
export default function MemoryGame({ world, onBack, onHome }) {
  const { progress, addStars, markSeen, recordActivity } = useProgress()
  const { memoryPairs } = getDifficulty(progress.settings.difficulty)
  const pairs = Math.min(memoryPairs, world.items.length)
  const [round, setRound] = useState(0)
  const cards = useMemo(() => buildCards(pickRoundItems(world.items, progress.words, pairs), pairs), [world, pairs, round])
  const [open, setOpen] = useState([]) // keys of the (up to two) cards being looked at
  const [matched, setMatched] = useState([]) // item ids already paired
  const [justMatched, setJustMatched] = useState(null)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const { speaking, speak } = useSpeaker()
  const uz = useUzbek()
  const intro = [...SCRIPT.memoryIntro, ...uz.line('memory')]

  useEffect(() => {
    speak(intro)
  }, [round])

  async function turn(card) {
    if (busy || open.includes(card.key) || matched.includes(card.item.id)) return
    flip()
    if (open.length === 0) {
      setOpen([card.key])
      speak(SCRIPT.word(card.item))
      return
    }

    setBusy(true)
    setOpen([open[0], card.key])
    const first = cards.find((c) => c.key === open[0])
    if (first.item.id === card.item.id) {
      const nowMatched = [...matched, card.item.id]
      setMatched(nowMatched)
      setJustMatched(card.item.id)
      chime()
      addStars(1)
      // Finding a pair is visual, so it counts as practice, not as recognizing the spoken word.
      markSeen(card.item.id)
      await speak([praise(), card.item.phrase])
      setJustMatched(null)
      setOpen([])
      if (nowMatched.length === pairs) {
        recordActivity(`${world.id}:memory`)
        setDone(true)
      }
    } else {
      await speak(SCRIPT.word(card.item))
      await wait(LOOK_TIME)
      setOpen([])
    }
    setBusy(false)
  }

  function playAgain() {
    setRound((r) => r + 1)
    setOpen([])
    setMatched([])
    setDone(false)
  }

  if (done) return <GameComplete stars={pairs} onAgain={playAgain} onBack={onBack} />

  // Six cards sit in a 3 x 2 block; twelve are 3 x 4 on a phone, then 4 x 3,
  // then 6 x 2. The width is capped by the room under the top bar so every
  // card stays on screen.
  const layout =
    cards.length <= 6
      ? 'grid-cols-3 max-w-[min(36rem,calc((var(--room)-6rem)*1.5))] short:max-w-[calc((var(--room)-2rem)*1.5)]'
      : 'grid-cols-3 max-w-[min(36rem,calc((var(--room)-7rem)*0.75+1.5rem))] sm:grid-cols-4 sm:max-w-[min(42rem,calc((var(--room)-7.5rem)*1.33))] lg:grid-cols-6 lg:max-w-[min(64rem,calc((var(--room)-6.5rem)*3))] short:grid-cols-6 short:max-w-[calc((var(--room)-2rem)*3)]'

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome}>
        <StarCounter />
        <Mascot size="sm" talking={speaking} onClick={() => speak(intro)} />
      </TopBar>

      <main className="mx-auto flex w-full flex-1 flex-col items-center justify-center gap-6 px-4 pb-6 short:pb-3">
        <div className={`grid w-full gap-3 sm:gap-4 short:gap-3 ${layout}`}>
          {cards.map((card, i) => {
            const isMatched = matched.includes(card.item.id)
            const faceUp = isMatched || open.includes(card.key)
            return (
              <div key={`${round}-${card.key}`} className="animate-bounce-in [perspective:900px]" style={{ animationDelay: `${i * 50}ms` }}>
                <button
                  type="button"
                  aria-label={faceUp ? card.item.word : 'card'}
                  onClick={() => turn(card)}
                  className={`relative block aspect-square w-full transition-transform duration-500 [transform-style:preserve-3d] ${
                    faceUp ? '[transform:rotateY(180deg)]' : 'active:scale-95'
                  }`}
                >
                  {/* Back of the card */}
                  <span
                    className="absolute inset-0 flex items-center justify-center rounded-3xl border-4 border-white shadow-lg [backface-visibility:hidden]"
                    style={{ background: `linear-gradient(135deg, ${world.color}, ${world.color}aa)` }}
                  >
                    <StarIcon className="h-1/2 w-1/2 opacity-90 drop-shadow" />
                  </span>
                  {/* Picture side */}
                  <span
                    className={`absolute inset-0 rounded-3xl bg-white p-2 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] ${
                      isMatched ? 'ring-4 ring-lime-400 sm:ring-8' : ''
                    }`}
                  >
                    {justMatched === card.item.id && <StarPop />}
                    <span className="block h-full w-full rounded-2xl p-1" style={{ backgroundColor: card.item.color }}>
                      <ItemArt id={card.item.id} className="h-full w-full" />
                    </span>
                  </span>
                </button>
              </div>
            )
          })}
        </div>

        <div className="flex gap-1 short:hidden" aria-hidden="true">
          {Array.from({ length: pairs }, (_, i) => (
            <StarIcon key={i} className={`h-7 w-7 ${i < matched.length ? '' : 'opacity-25 grayscale'}`} />
          ))}
        </div>
      </main>
    </div>
  )
}
