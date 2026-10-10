import { useEffect, useMemo, useRef, useState } from 'react'
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
import { chime, pop } from '../lib/sfx.js'
import { chunk, praise, shuffle } from '../lib/random.js'
import { SCRIPT } from '../data/script.js'
import { useUzbek } from '../lib/uzbek.js'

// How far the finger must move before a press counts as a drag, not a tap.
const DRAG_THRESHOLD = 12

function buildBoards(items, pairs) {
  return chunk(shuffle(items), pairs).map((board) => ({
    shadows: shuffle(board),
    pieces: shuffle(board),
  }))
}

/**
 * Matching game: put each picture on its shadow (or, in Rainbow Land,
 * each paint on the star of the same color). Children can drag a
 * picture, or — if dragging is hard — tap the animal, then tap the shadow.
 */
export default function MatchGame({ world, onBack, onHome }) {
  const { progress, addStars, markSeen, recordActivity } = useProgress()
  const { pairs } = getDifficulty(progress.settings.difficulty)
  const [round, setRound] = useState(0)
  const boards = useMemo(() => buildBoards(world.items, pairs), [world, pairs, round])
  const [boardIndex, setBoardIndex] = useState(0)
  const [matched, setMatched] = useState([])
  const [selected, setSelected] = useState(null)
  const [justMatched, setJustMatched] = useState(null)
  const [shakeId, setShakeId] = useState(null)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [drag, setDrag] = useState(null) // { id, x, y } while a piece follows the finger
  const press = useRef(null)
  const { speaking, speak } = useSpeaker()

  const board = boards[boardIndex]
  const style = world.matchStyle || 'shadow'
  const uz = useUzbek()
  const intro = [...SCRIPT.matchIntro[style], ...uz.line(style === 'color' ? 'matchColor' : 'matchShadow')]
  const totalPairs = world.items.length
  const matchedSoFar = boardIndex * pairs + matched.length
  // Two pairs per board sit in two wider columns; three in three.
  const cols = board.pieces.length === 2 ? 'mx-auto w-full max-w-xl grid-cols-2' : 'grid-cols-3'

  useEffect(() => {
    speak(boardIndex === 0 ? intro : SCRIPT.matchMore)
    // Speak when each new board appears.
  }, [boardIndex, round])

  function selectPiece(item) {
    if (busy) return
    pop()
    setSelected(item.id)
    speak(SCRIPT.word(item))
  }

  async function tryMatch(pieceId, slotId) {
    if (busy || matched.includes(slotId)) return
    const item = world.items.find((i) => i.id === pieceId)
    if (pieceId !== slotId) {
      setShakeId(pieceId)
      speak(SCRIPT.matchWrong)
      return
    }
    setBusy(true)
    setSelected(null)
    setJustMatched(pieceId)
    const nowMatched = [...matched, pieceId]
    setMatched(nowMatched)
    chime()
    addStars(1)
    // Shadow matching is visual, so it counts as practice, not as recognizing the spoken word.
    markSeen(pieceId)
    await speak([praise(), item.phrase])
    setJustMatched(null)
    setBusy(false)

    if (nowMatched.length === board.pieces.length) {
      if (boardIndex === boards.length - 1) {
        recordActivity(`${world.id}:match`)
        setDone(true)
      } else {
        setMatched([])
        setBoardIndex((b) => b + 1)
      }
    }
  }

  function tapShadow(slotId) {
    if (matched.includes(slotId)) return
    if (selected) tryMatch(selected, slotId)
    else speak(SCRIPT.matchTapFirst[style])
  }

  // --- drag with pointer events (mouse, touch and pen) -------------------
  function onPointerDown(e, item) {
    if (busy) return
    press.current = { id: item.id, x: e.clientX, y: e.clientY, moved: false }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e) {
    const p = press.current
    if (!p) return
    if (!p.moved && Math.hypot(e.clientX - p.x, e.clientY - p.y) > DRAG_THRESHOLD) {
      p.moved = true
      setSelected(p.id)
      pop()
    }
    if (p.moved) setDrag({ id: p.id, x: e.clientX, y: e.clientY })
  }

  function onPointerUp(e, item) {
    const p = press.current
    press.current = null
    setDrag(null)
    if (!p) return
    if (!p.moved) {
      selectPiece(item)
      return
    }
    const slot = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-slot]')
    if (slot) tryMatch(p.id, slot.dataset.slot)
    else setSelected(null)
  }

  function onPointerCancel() {
    press.current = null
    setDrag(null)
  }

  function playAgain() {
    setRound((r) => r + 1)
    setBoardIndex(0)
    setMatched([])
    setSelected(null)
    setDone(false)
  }

  if (done) return <GameComplete stars={totalPairs} onAgain={playAgain} onBack={onBack} />

  const dragged = drag && world.items.find((i) => i.id === drag.id)

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome}>
        <StarCounter />
        <Mascot size="sm" talking={speaking} onClick={() => speak(intro)} />
      </TopBar>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center gap-6 px-4 pb-6 sm:gap-10">
        {/* Shadows */}
        <div className={`grid gap-3 sm:gap-6 ${cols}`}>
          {board.shadows.map((item) => {
            const isMatched = matched.includes(item.id)
            return (
              <button
                key={`${round}-${boardIndex}-${item.id}`}
                type="button"
                data-slot={item.id}
                aria-label={isMatched ? item.word : style === 'color' ? 'star' : 'shadow'}
                onClick={() => tapShadow(item.id)}
                className={`relative aspect-square rounded-[2rem] border-4 border-dashed p-2 transition-all sm:p-4 ${
                  isMatched ? 'border-transparent bg-white shadow-lg' : 'border-sky-300 bg-white/50'
                } ${selected && !isMatched ? 'border-sky-500 bg-white/80' : ''}`}
              >
                {justMatched === item.id && <StarPop />}
                <div
                  className="h-full w-full rounded-3xl"
                  style={{ backgroundColor: isMatched ? item.color : 'transparent' }}
                >
                  {style === 'color' ? (
                    // Rainbow Land: a dashed star in each color, painted in when matched.
                    <ItemArt
                      id={item.id}
                      variant={isMatched ? 'target-filled' : 'target'}
                      className={`h-full w-full ${isMatched ? 'animate-bounce-in' : ''}`}
                    />
                  ) : (
                    <ItemArt
                      id={item.id}
                      className={`h-full w-full transition-all duration-500 ${isMatched ? 'animate-bounce-in' : ''}`}
                      // A grey silhouette until matched.
                      style={isMatched ? undefined : { filter: 'brightness(0)', opacity: 0.22 }}
                    />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Pieces to drag or tap */}
        <div className={`grid min-h-28 gap-3 sm:min-h-40 sm:gap-6 ${cols}`}>
          {board.pieces.map((item) =>
            matched.includes(item.id) ? (
              <div key={`${round}-${boardIndex}-${item.id}`} />
            ) : (
              <div key={`${round}-${boardIndex}-${item.id}`} className="animate-bounce-in">
                <button
                  type="button"
                  aria-label={item.word}
                  onPointerDown={(e) => onPointerDown(e, item)}
                  onPointerMove={onPointerMove}
                  onPointerUp={(e) => onPointerUp(e, item)}
                  onPointerCancel={onPointerCancel}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && selectPiece(item)}
                  onAnimationEnd={(e) => e.animationName === 'wl-shake' && setShakeId(null)}
                  style={{ touchAction: 'none' }}
                  className={`w-full rounded-[2rem] bg-white p-2 shadow-lg transition-all sm:p-3 ${
                    selected === item.id ? '-translate-y-2 ring-8 ring-sky-400' : ''
                  } ${drag?.id === item.id ? 'opacity-30' : ''} ${shakeId === item.id ? 'animate-shake' : ''}`}
                >
                  <div className="aspect-square rounded-3xl p-1" style={{ backgroundColor: item.color }}>
                    <ItemArt id={item.id} className="pointer-events-none h-full w-full" />
                  </div>
                </button>
              </div>
            ),
          )}
        </div>

        <div className="flex justify-center gap-1" aria-hidden="true">
          {Array.from({ length: totalPairs }, (_, i) => (
            <StarIcon key={i} className={`h-7 w-7 ${i < matchedSoFar ? '' : 'opacity-25 grayscale'}`} />
          ))}
        </div>
      </main>

      {dragged && (
        <div
          className="pointer-events-none fixed z-50 w-28 -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] bg-white p-2 shadow-2xl sm:w-36"
          style={{ left: drag.x, top: drag.y }}
        >
          <div className="aspect-square rounded-2xl p-1" style={{ backgroundColor: dragged.color }}>
            <ItemArt id={dragged.id} className="h-full w-full" />
          </div>
        </div>
      )}
    </div>
  )
}
