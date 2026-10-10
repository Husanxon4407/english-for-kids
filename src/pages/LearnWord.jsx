import { useEffect, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import Mascot from '../components/Mascot.jsx'
import ItemArt from '../components/ItemArt.jsx'
import AudioButton from '../components/AudioButton.jsx'
import RoundButton from '../components/RoundButton.jsx'
import { BackIcon, CheckIcon, MouthIcon, NextIcon, NoteIcon } from '../components/Icons.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import { useProgress } from '../lib/progress.jsx'
import StarCounter from '../components/StarCounter.jsx'
import { SCRIPT } from '../data/script.js'
import { useUzbek } from '../lib/uzbek.js'

/**
 * "Learn a word": one big picture, the spoken word, replay, the item's
 * sound (if it has one), and a gentle "say it" invitation. The written word is secondary.
 */
export default function LearnWord({ world, startIndex = 0, onBack, onHome, onFinish }) {
  const items = world.items
  const [index, setIndex] = useState(startIndex)
  const [wiggle, setWiggle] = useState(0)
  const { speaking, speak } = useSpeaker()
  const { markSeen, addStars, recordActivity } = useProgress()
  const item = items[index]
  const uz = useUzbek()
  const isLast = index === items.length - 1

  const sayWord = () => speak(SCRIPT.word(item))

  // Introduce each new word: "What's this?", the word, then a short phrase.
  useEffect(() => {
    markSeen(item.id)
    speak([SCRIPT.whatsThis, SCRIPT.word(item), ...uz.word(item), item.phrase])
  }, [item, speak, markSeen])

  function makeSound() {
    setWiggle((n) => n + 1)
    speak([SCRIPT.says(item), item.sound])
  }

  function invite() {
    // An invitation only — nothing is recorded or checked.
    speak([SCRIPT.canYouSay(item), SCRIPT.word(item), SCRIPT.great], { gap: 900 })
  }

  function next() {
    if (isLast) {
      // A star for finishing the whole set — effort counts, not just right answers.
      addStars(1)
      recordActivity(`${world.id}:learn`)
      onFinish()
    }
    else setIndex(index + 1)
  }

  const prevButton = (
    <RoundButton label="Previous" size="md" onClick={() => setIndex(index - 1)} disabled={index === 0}>
      <BackIcon className="h-10 w-10" />
    </RoundButton>
  )
  const nextButton = (
    <RoundButton label={isLast ? 'Finish' : 'Next'} color={isLast ? 'green' : 'white'} size="md" onClick={next}>
      {isLast ? <CheckIcon className="h-10 w-10" /> : <NextIcon className="h-10 w-10" />}
    </RoundButton>
  )

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome}>
        <StarCounter />
        <Mascot size="sm" talking={speaking} />
      </TopBar>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-5 px-4 pb-6 sm:gap-7">
        <div className="flex w-full items-center justify-center gap-3 sm:gap-6">
          <div className="hidden sm:block">{prevButton}</div>

          <button
            key={item.id}
            type="button"
            onClick={sayWord}
            aria-label={item.word}
            className="animate-bounce-in w-full max-w-[min(26rem,60vh)] rounded-[2.5rem] bg-white p-4 shadow-xl transition-transform active:scale-[0.98]"
          >
            <div className="aspect-square rounded-[2rem] p-4" style={{ backgroundColor: item.color }}>
              <ItemArt key={wiggle} id={item.id} className={`h-full w-full ${wiggle ? 'animate-wiggle' : ''}`} />
            </div>
            <p className="mt-2 text-3xl font-extrabold text-slate-600 sm:text-4xl">{item.word}</p>
          </button>

          <div className="hidden sm:block">{nextButton}</div>
        </div>

        <div className="flex items-center gap-5 sm:gap-8">
          <AudioButton onClick={sayWord} playing={speaking} />
          {item.sound && (
            <RoundButton label="Sound" color="orange" size="md" onClick={makeSound}>
              <NoteIcon className="h-10 w-10 sm:h-12 sm:w-12" />
            </RoundButton>
          )}
          <RoundButton label="Say it" color="pink" size="md" onClick={invite}>
            <MouthIcon className="h-11 w-11 sm:h-12 sm:w-12" />
          </RoundButton>
        </div>

        {/* On phones the arrows sit below the picture so it can use the full width. */}
        <div className="flex items-center gap-4">
          <div className="sm:hidden">{prevButton}</div>
          <div className="flex gap-2" aria-hidden="true">
            {items.map((it, i) => (
              <span
                key={it.id}
                className={`h-3 rounded-full transition-all ${i === index ? 'w-8 bg-sky-500' : 'w-3 bg-sky-200'}`}
              />
            ))}
          </div>
          <div className="sm:hidden">{nextButton}</div>
        </div>
      </main>
    </div>
  )
}
