import { useEffect, useMemo, useRef, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import Mascot from '../components/Mascot.jsx'
import ItemArt from '../components/ItemArt.jsx'
import AudioButton from '../components/AudioButton.jsx'
import StarCounter from '../components/StarCounter.jsx'
import StarPop from '../components/StarPop.jsx'
import GameComplete from '../components/GameComplete.jsx'
import { MicIcon, StarIcon } from '../components/Icons.jsx'
import { Parrot } from '../components/GameArt.jsx'
import { useSpeaker } from '../lib/useSpeaker.js'
import { useProgress } from '../lib/progress.jsx'
import { useUzbek } from '../lib/uzbek.js'
import { clipSrc, isMuted, stop as stopSpeaking } from '../lib/audio.js'
import { listenOnce, listeningMode, saidWord } from '../lib/speech.js'
import { chime } from '../lib/sfx.js'
import { praise } from '../lib/random.js'
import { pickRoundItems } from '../lib/review.js'
import { SCRIPT } from '../data/script.js'

const WORDS = 5
// After this many "let's try again"s the child always hears "Good try!".
const TRIES = 2
// Without speech recognition, the parrot records this long and repeats it.
const RECORD_MS = 2500

// Play a sound like a parrot would: faster and higher.
function squawk(src) {
  return new Promise((resolve) => {
    if (!src || isMuted()) return resolve()
    const audio = new Audio(src)
    audio.preservesPitch = false
    audio.webkitPreservesPitch = false
    audio.playbackRate = 1.35
    audio.onended = resolve
    audio.onerror = resolve
    audio.play().catch(resolve)
  })
}

// Record the child for a moment (when the browser cannot recognise speech).
async function recordChild() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const recorder = new MediaRecorder(stream)
  const chunks = []
  recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data)
  const stopped = new Promise((resolve) => (recorder.onstop = resolve))
  recorder.start()
  await new Promise((resolve) => setTimeout(resolve, RECORD_MS))
  recorder.stop()
  await stopped
  stream.getTracks().forEach((track) => track.stop())
  return URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType }))
}

/**
 * Parrot: Bobo says a word, the child taps the microphone and says it. Where
 * the browser can recognise speech (on the device, or online if the grown-ups
 * allow it), a word that is close enough earns "Great job!"; otherwise "Almost!
 * Let's try again!" — at most twice, then always "Good try!". Without
 * recognition the parrot records the child and squawks it back. Every try
 * earns a star: this game is about daring to speak.
 */
export default function ParrotGame({ world, onBack, onHome }) {
  const { progress, addStars, recordActivity } = useProgress()
  const uz = useUzbek()
  const [round, setRound] = useState(0)
  const words = useMemo(() => pickRoundItems(world.items, progress.words).slice(0, WORDS), [world, round])
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('ready') // ready | listening | again | good
  const [tries, setTries] = useState(0)
  const [mode, setMode] = useState(undefined) // 'device' | 'online' | 'record' | 'none'
  const [done, setDone] = useState(false)
  const { speaking, speak } = useSpeaker()
  const here = useRef(true)
  useEffect(() => {
    here.current = true
    return () => {
      here.current = false
    }
  }, [])

  const item = words[index]
  const model = () => speak([SCRIPT.word(item), SCRIPT.canYouSay(item)])

  // How we can hear the child on this device.
  useEffect(() => {
    listeningMode({ allowOnline: progress.settings.speechOnline !== false }).then((found) => {
      if (found) setMode(found)
      else setMode(navigator.mediaDevices?.getUserMedia && window.MediaRecorder ? 'record' : 'none')
    })
  }, [])

  useEffect(() => {
    setPhase('ready')
    setTries(0)
    speak(index === 0 ? [...SCRIPT.parrotIntro, ...uz.line('parrot'), SCRIPT.word(item), SCRIPT.canYouSay(item)] : [SCRIPT.word(item), SCRIPT.canYouSay(item)])
  }, [index, round])

  async function next(lines) {
    setPhase('good')
    chime()
    addStars(1)
    await speak(lines)
    if (!here.current) return
    if (index === words.length - 1) {
      recordActivity(`${world.id}:parrot`)
      setDone(true)
    } else {
      setIndex((i) => i + 1)
    }
  }

  async function noMicrophone() {
    setMode('none')
    setPhase('ready')
    await speak(SCRIPT.parrotNeedMic)
  }

  async function tapMic() {
    if (phase !== 'ready' || mode === undefined) return
    stopSpeaking()
    setPhase('listening')

    if (mode === 'device' || mode === 'online') {
      // Started straight from the tap: some browsers only listen after a touch.
      const { heard, error } = await listenOnce({ mode })
      if (!here.current) return
      if (error === 'not-allowed' || error === 'service-not-allowed' || error === 'audio-capture') return noMicrophone()
      if (error === 'network' || error === 'start-failed') {
        // The online service is out of reach: from now on — and for this very
        // tap — the parrot just repeats what it hears.
        const fallback = navigator.mediaDevices?.getUserMedia && window.MediaRecorder ? 'record' : 'none'
        setMode(fallback)
        return repeatChild(fallback)
      }
      if (saidWord(heard, item.word)) {
        await squawk(clipSrc(SCRIPT.word(item)))
        return next([praise()])
      }
      if (tries + 1 >= TRIES) {
        await squawk(clipSrc(SCRIPT.word(item)))
        return next([SCRIPT.parrotGoodTry])
      }
      setTries((t) => t + 1)
      setPhase('again')
      await speak([...SCRIPT.parrotAgain, SCRIPT.word(item)])
      if (here.current) setPhase('ready')
      return
    }

    repeatChild(mode)
  }

  // Without speech recognition: record the child and squawk it back (or, with
  // no microphone at all, a moment of "listening"), then cheer.
  async function repeatChild(how) {
    if (how === 'record') {
      let recording
      try {
        recording = await recordChild()
      } catch {
        if (here.current) noMicrophone()
        return
      }
      if (!here.current) return
      setPhase('good')
      await squawk(recording)
      URL.revokeObjectURL(recording)
      return next([praise()])
    }
    await new Promise((resolve) => setTimeout(resolve, 1800))
    if (here.current) next([praise()])
  }

  function playAgain() {
    setRound((r) => r + 1)
    setIndex(0)
    setDone(false)
  }

  if (done) return <GameComplete stars={words.length} onAgain={playAgain} onBack={onBack} />

  const parrotMood = phase === 'listening' ? 'listen' : phase === 'good' ? 'happy' : phase === 'again' ? 'think' : speaking ? 'talk' : 'idle'

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome}>
        <StarCounter />
        <Mascot size="sm" talking={speaking} onClick={model} />
      </TopBar>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-4 px-4 pb-6 sm:gap-6 low:gap-2 low:pb-3 short:flex-row short:gap-6 short:pb-3">
        <div className="flex items-end justify-center gap-3 sm:gap-8">
          {/* The word to say, big. */}
          <button
            key={`${round}-${index}`}
            type="button"
            aria-label={item.word}
            onClick={model}
            className="animate-bounce-in relative w-[min(12rem,calc(var(--room)*0.3))] rounded-[2rem] bg-white p-2.5 shadow-xl sm:w-[min(16rem,calc(var(--room)*0.36))] short:w-[calc(var(--room)*0.55)]"
          >
            {phase === 'good' && <StarPop />}
            <span className="block aspect-square rounded-[1.5rem]" style={{ backgroundColor: item.color }}>
              <ItemArt id={item.id} className="h-full w-full" />
            </span>
          </button>
          <Parrot
            mood={parrotMood}
            className="w-[min(8rem,calc(var(--room)*0.2))] sm:w-[min(11rem,calc(var(--room)*0.26))] short:w-[calc(var(--room)*0.4)]"
            style={phase === 'good' ? { animation: 'wl-joy 0.7s ease-in-out 2' } : undefined}
          />
        </div>

        <div className="flex flex-col items-center gap-4 low:gap-2">
          <div className="flex items-center gap-5">
            <AudioButton size="md" onClick={model} playing={speaking && phase === 'ready'} label="Hear it again" />
            {/* The microphone: tap, then say the word. */}
            <button
              type="button"
              aria-label="Say it"
              onClick={tapMic}
              disabled={mode === undefined}
              className={`flex h-24 w-24 items-center justify-center rounded-full text-white shadow-[0_6px_0_#991b1b] transition-all active:translate-y-1 active:shadow-[0_2px_0_#991b1b] disabled:opacity-50 sm:h-28 sm:w-28 low:h-20 low:w-20 short:h-20 short:w-20 ${
                phase === 'listening' ? 'scale-110 bg-red-500' : 'bg-red-400'
              }`}
              style={phase === 'listening' ? { animation: 'wl-listen 1.1s ease-out infinite' } : phase === 'ready' && !speaking ? { animation: 'wl-hop 1.4s ease-in-out infinite' } : undefined}
            >
              <MicIcon className="h-14 w-14 sm:h-16 sm:w-16 low:h-11 low:w-11 short:h-11 short:w-11" />
            </button>
          </div>
          <div className="flex gap-1" aria-hidden="true">
            {words.map((w, i) => (
              <StarIcon key={w.id} className={`h-7 w-7 transition-all ${i < index || (i === index && phase === 'good') ? '' : 'opacity-25 grayscale'}`} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
