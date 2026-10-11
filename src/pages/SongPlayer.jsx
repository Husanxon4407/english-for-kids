import { useEffect, useRef, useState } from 'react'
import TopBar from '../components/TopBar.jsx'
import { Bobo } from '../components/Mascot.jsx'
import ItemArt from '../components/ItemArt.jsx'
import StarCounter from '../components/StarCounter.jsx'
import SongStage from '../components/SongStage.jsx'
import GameComplete from '../components/GameComplete.jsx'
import RoundButton from '../components/RoundButton.jsx'
import { NoteIcon, PauseIcon, PlayIcon, StarIcon } from '../components/Icons.jsx'
import { useProgress } from '../lib/progress.jsx'
import { isMuted, stop as stopSpeaking } from '../lib/audio.js'
import { pop } from '../lib/sfx.js'
import { songItem } from '../data/songs.js'

const SONG_STARS = 2

// The pictures on screen at `time`: the last cue that has started.
function picturesAt(cues, time) {
  let current = cues[0]
  for (const cue of cues) {
    if (cue[0] <= time) current = cue
    else break
  }
  return current[1]
}

// A ring of little stars that flies out from a picture when it is tapped.
function Burst() {
  return Array.from({ length: 8 }, (_, i) => {
    const angle = (Math.PI / 4) * i
    return (
      <span
        key={i}
        className="pointer-events-none absolute left-1/2 top-1/2 z-10"
        style={{ '--dx': `${Math.cos(angle) * 70}px`, '--dy': `${Math.sin(angle) * 70}px`, animation: 'wl-burst 0.7s ease-out forwards' }}
      >
        <StarIcon className="h-6 w-6" />
      </span>
    )
  })
}

// The word in big letters that hop one after another, like a wave.
function BouncyWord({ word, playing }) {
  return (
    <p className="flex justify-center text-3xl font-extrabold text-white drop-shadow-[0_2px_0_rgb(0_0_0/0.35)] sm:text-5xl low:text-2xl short:text-2xl" aria-hidden="true">
      {word.split('').map((letter, i) => (
        <span
          key={i}
          className="inline-block whitespace-pre"
          style={playing ? { animation: `wl-letter 0.9s ease-in-out ${i * 0.09}s infinite` } : undefined}
        >
          {letter}
        </span>
      ))}
    </p>
  )
}

/**
 * Plays a recorded, sung song. As the words are sung their pictures appear
 * and dance, and Bobo dances along. One big button pauses and plays.
 */
export default function SongPlayer({ song, onBack, onHome }) {
  const { addStars, recordActivity } = useProgress()
  const audioRef = useRef(null)
  const [round, setRound] = useState(0)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [tapped, setTapped] = useState(null) // { id, n }: the picture that was just tapped
  const [done, setDone] = useState(false)

  useEffect(() => {
    stopSpeaking()
    const audio = new Audio(import.meta.env.BASE_URL + song.file)
    audio.preload = 'auto'
    audio.muted = isMuted()
    audioRef.current = audio

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onMeta = () => setDuration(audio.duration || 0)
    const onEnd = () => {
      addStars(SONG_STARS)
      recordActivity(`song:${song.id}`)
      setDone(true)
    }
    audio.addEventListener('playing', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('waiting', onPause)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    // If the browser refuses to start on its own, the big button is waiting.
    audio.play().catch(() => setPlaying(false))
    const clock = setInterval(() => setTime(audio.currentTime), 120)

    return () => {
      clearInterval(clock)
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
    }
  }, [song, round])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
  }

  function again() {
    setTime(0)
    setDone(false)
    setRound((r) => r + 1)
  }

  if (done) return <GameComplete stars={SONG_STARS} onAgain={again} onBack={onBack} />

  const ids = picturesAt(song.cues, time)
  const many = ids.length > 3
  // One picture: show its word too. So does a letter with its picture ("A is for apple").
  const label = ids.length === 1 || (ids.length === 2 && ids[0].startsWith('letter-')) ? songItem(ids[ids.length - 1]).word : null
  const dance = playing ? { animation: 'wl-dance 0.9s ease-in-out infinite' } : undefined

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar onBack={onBack} onHome={onHome}>
        <StarCounter />
      </TopBar>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-4 px-4 pb-6 sm:gap-5 low:gap-3 low:pb-3 short:gap-3 short:pb-3">
        <div className="stage-motion relative flex min-h-[15rem] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[2.5rem] border-8 border-white px-3 pb-4 pt-9 shadow-xl sm:min-h-[21rem] sm:flex-row sm:gap-6 sm:px-6 sm:pt-10 low:min-h-[13rem] low:pt-7 short:min-h-0 short:flex-1 short:flex-row short:gap-4 short:border-4 short:py-2">
          <SongStage name={song.stage} className="absolute inset-0 h-full w-full" />
          {[6, 28, 70, 90].map((left, i) => (
            <span
              key={left}
              className="pointer-events-none absolute text-white/80 drop-shadow"
              style={{
                left: `${left}%`,
                top: `${4 + (i % 2) * 7}%`,
                animation: playing ? `wl-float ${2.4 + i * 0.5}s ease-in-out ${i * 0.3}s infinite` : undefined,
              }}
            >
              <NoteIcon className="h-7 w-7 sm:h-9 sm:w-9" />
            </span>
          ))}

          <div className="relative w-24 shrink-0 sm:w-40 low:w-16 short:w-20" style={dance}>
            <Bobo talking={playing} waving className="h-auto w-full drop-shadow-lg" />
          </div>

          {/* The pictures for the words being sung right now: they fly in, then dance. */}
          <div className="relative flex w-full min-w-0 flex-col items-center gap-2 sm:w-auto short:w-auto">
            <div key={ids.join('-')} className={`flex w-full flex-wrap items-center justify-center ${many ? 'gap-2' : 'gap-3 sm:gap-4'}`}>
              {ids.map((id, i) => {
                const item = songItem(id)
                return (
                  <button
                    key={id}
                    type="button"
                    aria-label={item.word}
                    onClick={() => {
                      pop()
                      setTapped((t) => ({ id, n: (t?.n || 0) + 1 }))
                    }}
                    className={`relative rounded-3xl bg-white p-1.5 shadow-lg sm:p-2 ${
                      ids.length === 1 ? 'w-40 sm:w-60 low:w-24 short:w-28' : many ? `${ids.length > 6 ? 'w-[16%]' : 'w-[22%] low:w-[16%]'} sm:w-24 lg:w-32 short:w-16` : 'w-[28%] max-w-24 sm:w-40 sm:max-w-none short:w-24'
                    }`}
                    style={{ animation: `${i % 2 ? 'wl-fly-down' : 'wl-fly-up'} 0.6s ease-out ${i * 0.08}s both` }}
                  >
                    {tapped?.id === id && <Burst key={`burst-${tapped.n}`} />}
                    <div
                      key={tapped?.id === id ? tapped.n : 0}
                      className={`aspect-square rounded-2xl p-1 ${tapped?.id === id ? 'animate-wiggle' : ''}`}
                      style={{ backgroundColor: item.color }}
                    >
                      <ItemArt id={id} className="h-full w-full" style={dance && { ...dance, animationDelay: `${i * 0.12}s` }} />
                    </div>
                  </button>
                )
              })}
            </div>
            {label && <BouncyWord key={`word-${label}`} word={label} playing={playing} />}
          </div>
        </div>

        <div className="flex w-full max-w-xl items-center gap-4">
          <RoundButton label={playing ? 'Pause' : 'Play'} color="green" size="md" onClick={toggle} pulsing={!playing} className="low:h-16 low:w-16">
            {playing ? <PauseIcon className="h-10 w-10 sm:h-12 sm:w-12" /> : <PlayIcon className="ml-1 h-10 w-10 sm:h-12 sm:w-12" />}
          </RoundButton>
          <div className="h-5 flex-1 overflow-hidden rounded-full border-4 border-white bg-white/60 shadow-inner" aria-hidden="true">
            <div
              className="h-full rounded-full transition-[width] duration-200"
              style={{ width: `${duration ? Math.min(100, (time / duration) * 100) : 0}%`, backgroundColor: song.color }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
