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

  // Smaller under the picture on an upright phone, bigger beside it everywhere else.
  const prevButton = (size) => (
    <RoundButton label="Previous" size={size} onClick={() => setIndex(index - 1)} disabled={index === 0}>
      <BackIcon className="h-8 w-8 sm:h-10 sm:w-10" />
    </RoundButton>
  )
  const nextButton = (size) => (
    <RoundButton label={isLast ? 'Finish' : 'Next'} color={isLast ? 'green' : 'white'} size={size} onClick={next}>
      {isLast ? <CheckIcon className="h-8 w-8 sm:h-10 sm:w-10" /> : <NextIcon className="h-8 w-8 sm:h-10 sm:w-10" />}
    </RoundButton>
  )

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome}>
        <StarCounter />
        <Mascot size="sm" talking={speaking} />
      </TopBar>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-4 px-4 pb-6 sm:gap-7 low:gap-3 low:pb-3 short:flex-row short:gap-4 short:pb-3">
        {/* Sideways phone: one row — arrow, picture, the sound buttons, arrow. */}
        <div className="flex w-full items-center justify-center gap-3 sm:gap-6 short:contents">
          <div className="hidden sm:block short:order-1 short:block">{prevButton('md')}</div>

          <button
            key={item.id}
            type="button"
            onClick={sayWord}
            aria-label={item.word}
            className="animate-bounce-in w-full max-w-[min(26rem,calc(var(--room)-16rem))] rounded-[2.5rem] bg-white p-4 shadow-xl transition-transform active:scale-[0.98] sm:max-w-[min(26rem,calc(var(--room)-17rem))] low:max-w-[calc(var(--room)-13.5rem)] short:order-2 short:max-w-[calc(var(--room)-4rem)] short:rounded-[2rem] short:p-2"
          >
            <div className="aspect-square rounded-[2rem] p-4 short:rounded-3xl short:p-2" style={{ backgroundColor: item.color }}>
              <ItemArt key={wiggle} id={item.id} className={`h-full w-full ${wiggle ? 'animate-wiggle' : ''}`} />
            </div>
            <p className="mt-2 text-3xl font-extrabold text-slate-600 sm:text-4xl short:mt-1 short:text-2xl">{item.word}</p>
          </button>

          <div className="hidden sm:block short:order-4 short:block">{nextButton('md')}</div>
        </div>

        <div className="flex items-center gap-5 sm:gap-8 short:order-3 short:flex-col short:gap-3">
          <AudioButton onClick={sayWord} playing={speaking} className="low:h-16 low:w-16" />
          {item.sound && (
            <RoundButton label="Sound" color="orange" size="md" onClick={makeSound} className="low:h-16 low:w-16">
              <NoteIcon className="h-10 w-10 sm:h-12 sm:w-12 short:h-9 short:w-9" />
            </RoundButton>
          )}
          <RoundButton label="Say it" color="pink" size="md" onClick={invite} className="low:h-16 low:w-16">
            <MouthIcon className="h-11 w-11 sm:h-12 sm:w-12 short:h-9 short:w-9" />
          </RoundButton>
        </div>

        {/* On phones the arrows sit below the picture so it can use the full width. */}
        <div className="flex items-center gap-4 short:hidden">
          <div className="sm:hidden">{prevButton('sm')}</div>
          <div className="flex gap-1 sm:gap-2" aria-hidden="true">
            {items.map((it, i) => (
              <span
                key={it.id}
                className={`h-2.5 rounded-full transition-all sm:h-3 ${i === index ? 'w-5 bg-sky-500 sm:w-8' : 'w-2.5 bg-sky-200 sm:w-3'}`}
              />
            ))}
          </div>
          <div className="sm:hidden">{nextButton('sm')}</div>
        </div>
      </main>
    </div>
  )
}
