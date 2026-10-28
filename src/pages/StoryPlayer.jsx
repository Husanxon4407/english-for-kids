import { useEffect, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import StoryStage from '../components/StoryStage.jsx'
import StarCounter from '../components/StarCounter.jsx'
import GameComplete from '../components/GameComplete.jsx'
import RoundButton from '../components/RoundButton.jsx'
import { PauseIcon, PlayIcon } from '../components/Icons.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import { useProgress } from '../lib/progress.jsx'
import { useUzbek } from '../lib/uzbek.js'
import { stop as stopSpeaking } from '../lib/audio.js'
import * as sfx from '../lib/sfx.js'
import { SCRIPT } from '../data/script.js'

const STORY_STARS = 2
// A breath between sentences, and when a beat's sound plays (after the actors have moved).
const PAUSE = 900
const SFX_AT = 1100

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// How long a sentence stays on screen at the very least. With the sound
// switched off nothing is spoken, so this is what paces the story.
const readingTime = (line) => 2200 + line.length * 55

// Each beat can leave out what has not changed since the beat before.
function sceneAt(beats, index) {
  for (let i = index; i >= 0; i--) if (beats[i].scene) return beats[i].scene
  return 'garden'
}

/**
 * A told story. Bobo says one sentence at a time and the stage acts it out:
 * the child only watches and listens. One button pauses and plays.
 */
export default function StoryPlayer({ story, onBack, onHome }) {
  const { addStars, recordActivity } = useProgress()
  const uz = useUzbek()
  const [round, setRound] = useState(0)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [done, setDone] = useState(false)
  const { speaking, speak } = useSpeaker()

  const beats = story.beats
  const beat = beats[index]

  useEffect(() => {
    if (paused || done) return
    let cancelled = false
    const started = Date.now()
    const lines = [...(index === 0 ? [SCRIPT.title(story), ...uz.text(story.uz)] : []), beat.line, ...uz.text(beat.uz)]
    // `sfx` is one sound name (played at `sfxAt`), or a list of [name, milliseconds].
    const sounds = typeof beat.sfx === 'string' ? [[beat.sfx, beat.sfxAt || SFX_AT]] : beat.sfx || []
    const timers = sounds.map(([name, at]) => setTimeout(() => sfx[name]?.(), at))

    speak(lines).then(async () => {
      await wait(Math.max(PAUSE, readingTime(beat.line) - (Date.now() - started)))
      if (cancelled) return
      if (index < beats.length - 1) {
        setIndex(index + 1)
      } else {
        addStars(STORY_STARS)
        recordActivity(`story:${story.id}`)
        setDone(true)
      }
    })
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [index, round, paused, done])

  function toggle() {
    // Pausing stops Bobo mid-sentence; playing again says that sentence from its start.
    if (!paused) stopSpeaking()
    setPaused(!paused)
  }

  function again() {
    setRound((r) => r + 1)
    setIndex(0)
    setPaused(false)
    setDone(false)
  }

  if (done) return <GameComplete stars={STORY_STARS} onAgain={again} onBack={onBack} />

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome} music={false}>
        <StarCounter />
      </TopBar>

      <main className="mx-auto flex w-full flex-1 flex-col items-center justify-center gap-4 px-3 pb-5 sm:gap-5 sm:px-6 short:flex-row short:pb-3">
        <div className="relative aspect-[4/3] w-full max-w-[min(56rem,calc((var(--room)-9.5rem)*4/3))] overflow-hidden rounded-[2rem] border-8 border-white bg-white shadow-xl short:max-w-[calc((var(--room)-1.5rem)*4/3)] short:border-4">
          <StoryStage key={round} scene={sceneAt(beats, index)} actors={beat.actors} fx={beat.fx} camera={beat.camera} talking={speaking} />
          {/* How far the story has got. */}
          <div className="absolute inset-x-0 bottom-0 z-[300] h-2 bg-white/50" aria-hidden="true">
            <div
              className="h-full rounded-r-full transition-[width] duration-700"
              style={{ width: `${((index + 1) / beats.length) * 100}%`, backgroundColor: story.color }}
            />
          </div>
        </div>

        <div className="flex w-full max-w-3xl items-center gap-4 short:w-auto">
          <RoundButton label={paused ? 'Play' : 'Pause'} color="green" size="md" onClick={toggle} pulsing={paused}>
            {paused ? <PlayIcon className="ml-1 h-10 w-10 sm:h-12 sm:w-12 short:h-9 short:w-9" /> : <PauseIcon className="h-10 w-10 sm:h-12 sm:w-12 short:h-9 short:w-9" />}
          </RoundButton>
          {/* The sentence in writing, for grown-ups and early readers. */}
          <p className="min-w-0 flex-1 rounded-3xl bg-white/85 px-4 py-2 text-center text-base font-bold leading-snug text-slate-700 shadow-sm sm:text-2xl short:hidden">
            {beat.line}
          </p>
        </div>
      </main>
    </div>
  )
}
