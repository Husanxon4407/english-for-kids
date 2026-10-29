import { useEffect } from 'react'
import TopBar from '../components/TopBar.jsx'
import Mascot from '../components/Mascot.jsx'
import ItemArt from '../components/ItemArt.jsx'
import StarCounter from '../components/StarCounter.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import { useProgress } from '../lib/progress.jsx'
import { SCRIPT } from '../data/script.js'

/**
 * A shelf of stories or songs to choose from. `entries` need an id, a title,
 * a color and a cover picture; `kind` ("story" or "song") is used to show
 * which ones have been finished. `badge` is the little icon on every cover.
 */
export default function Shelf({ entries, kind, prompt, badge, onBack, onHome, onOpen }) {
  const { speaking, speak } = useSpeaker()
  const { progress } = useProgress()

  useEffect(() => {
    speak(prompt)
  }, [])

  const cols = entries.length > 6 ? 5 : 3
  // More than two rows can't fit on a laptop screen at any useful size, so a
  // long shelf scrolls instead.
  const fits = entries.length <= cols * 2

  async function open(entry) {
    await speak(SCRIPT.title(entry))
    onOpen(entry.id)
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome}>
        <StarCounter />
        <Mascot size="sm" talking={speaking} onClick={() => speak(prompt)} />
      </TopBar>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center p-4 sm:p-6 low:py-2 short:px-4 short:py-2">
        {/* Three across on a tablet or laptop (five when the shelf is full), sized
            so that every row fits on the screen when there are only two rows. A
            long shelf scrolls, five across on a tablet and six on a laptop. */}
        <div
          className={`mx-auto flex w-full flex-wrap justify-center gap-4 sm:gap-6 short:max-w-none short:gap-4 ${
            fits
              ? 'sm:max-w-[min(60rem,calc(((var(--room)-1.5rem)/var(--rows)-8.5rem)*var(--cols)+(var(--cols)-1)*1.5rem))]'
              : '[--cols:5] sm:max-w-[60rem] lg:max-w-[72rem] lg:[--cols:6]'
          }`}
          style={fits ? { '--cols': cols, '--rows': Math.ceil(entries.length / cols) } : undefined}
        >
          {entries.map((entry, i) => (
            <button
              key={entry.id}
              type="button"
              aria-label={entry.title}
              onClick={() => open(entry)}
              className="animate-bounce-in relative flex w-[calc(50%-0.5rem)] flex-col items-center gap-2 rounded-[2rem] bg-white p-3 shadow-lg transition-transform active:scale-95 sm:w-[calc((100%-(var(--cols)-1)*1.5rem)/var(--cols))] sm:p-4 short:w-36 short:gap-1 short:p-2"
              style={{ borderBottom: `8px solid ${entry.color}`, animationDelay: `${i * 90}ms` }}
            >
              <div className="relative aspect-square w-full rounded-3xl p-3" style={{ backgroundColor: `${entry.color}33` }}>
                <ItemArt id={entry.cover} className="h-full w-full" />
                <span
                  className="absolute -bottom-2 -right-2 flex h-11 w-11 items-center justify-center rounded-full text-white shadow sm:h-14 sm:w-14"
                  style={{ backgroundColor: entry.color }}
                >
                  {badge}
                </span>
              </div>
              <span className="text-base font-bold text-slate-700 sm:text-xl">{entry.title}</span>
              {progress.activities[`${kind}:${entry.id}`] > 0 && (
                <span className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-lg font-extrabold text-white shadow" aria-hidden="true">
                  ★
                </span>
              )}
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
